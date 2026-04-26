/**
 * api/server.js — LinkedInCity
 * Express app — works both as HF Spaces Docker API and local dev server.
 *
 * Auth strategy (cross-origin safe):
 *   - After OAuth callback, token is passed in redirect URL (?token=xxx)
 *   - Frontend stores it in sessionStorage and sends as: Authorization: Bearer xxx
 *   - Cookie is also set as fallback for same-origin / local dev
 *
 * Routes:
 *   GET  /api/linkedin/login    → redirect to LinkedIn OAuth
 *   GET  /api/linkedin/callback → exchange code, set session, redirect with token
 *   GET  /api/linkedin/me       → return authenticated profile
 *   GET  /api/linkedin/city     → return normalized city data
 *   POST /api/linkedin/logout   → clear session
 *   GET  /api/health            → health check
 */

import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { createHmac, randomBytes } from 'crypto';
import { buildAuthUrl, exchangeCode, fetchUserInfo, normalizeCityData } from './linkedinAuth.js';

const app = express();

// ── Middleware ─────────────────────────────────────────────────────────────────
app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: (origin, cb) => {
    if (!origin) return cb(null, true);                          // curl / server-to-server
    if (/\.vercel\.app$/.test(origin)) return cb(null, true);   // Vercel previews & prod
    if (/\.hf\.space$/.test(origin)) return cb(null, true);     // Hugging Face Spaces
    const allowed = (process.env.FRONTEND_URL || 'http://localhost:3000').split(',').map(s => s.trim());
    if (allowed.includes(origin)) return cb(null, true);
    cb(new Error(`CORS: origin ${origin} not allowed`));
  },
  credentials: true,
}));

// ── Token / session helpers ────────────────────────────────────────────────────
const COOKIE_NAME = 'li_session';

function cookieOpts() {
  const isProd = process.env.NODE_ENV === 'production';
  return {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? 'none' : 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: '/',
  };
}

/** Sign payload into a compact HMAC token. */
function signPayload(payload) {
  const secret = process.env.SESSION_SECRET || 'change-me-in-production';
  const body = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const sig = createHmac('sha256', secret).update(body).digest('base64url');
  return `${body}.${sig}`;
}

/** Verify token — returns payload or null. */
function verifyToken(token) {
  try {
    const [body, sig] = token.split('.');
    if (!body || !sig) return null;
    const secret = process.env.SESSION_SECRET || 'change-me-in-production';
    const expected = createHmac('sha256', secret).update(body).digest('base64url');
    if (sig !== expected) return null;
    return JSON.parse(Buffer.from(body, 'base64url').toString('utf8'));
  } catch {
    return null;
  }
}

/**
 * Extract session payload from request.
 * Priority: Bearer token (cross-origin production) → Cookie (local dev / same-origin)
 */
function getSession(req) {
  const auth = req.headers.authorization;
  if (auth?.startsWith('Bearer ')) {
    return verifyToken(auth.slice(7));
  }
  const cookie = req.cookies?.[COOKIE_NAME];
  if (cookie) return verifyToken(cookie);
  return null;
}

// ── Route: GET /api/linkedin/login ─────────────────────────────────────────────
app.get('/api/linkedin/login', (req, res) => {
  const state = randomBytes(16).toString('hex');
  res.cookie('li_oauth_state', state, {
    httpOnly: true,
    maxAge: 10 * 60 * 1000,
    path: '/',
    sameSite: 'lax',
  });
  return res.redirect(buildAuthUrl(state));
});

// ── Route: GET /api/linkedin/callback ─────────────────────────────────────────
app.get('/api/linkedin/callback', async (req, res) => {
  const { code, state, error } = req.query;
  const savedState = req.cookies.li_oauth_state;
  const frontendBase = process.env.FRONTEND_URL || 'http://localhost:3000';

  res.clearCookie('li_oauth_state', { path: '/' });

  if (error) {
    console.error('[callback] OAuth error:', error);
    return res.redirect(`${frontendBase}/?auth=error`);
  }
  if (!code || !state || state !== savedState) {
    console.error('[callback] State mismatch or missing code');
    return res.redirect(`${frontendBase}/?auth=error`);
  }

  try {
    const tokenData = await exchangeCode(code);
    const profile = await fetchUserInfo(tokenData.access_token);

    const sessionToken = signPayload({ profile, issuedAt: Date.now() });

    // Set cookie for same-origin / local dev fallback
    res.cookie(COOKIE_NAME, sessionToken, cookieOpts());

    // Pass token in URL for cross-origin (Vercel frontend ↔ HF backend)
    return res.redirect(`${frontendBase}/?auth=1&token=${encodeURIComponent(sessionToken)}`);
  } catch (err) {
    console.error('[callback] Error:', err.message);
    return res.redirect(`${frontendBase}/?auth=error`);
  }
});

// ── Route: GET /api/linkedin/me ────────────────────────────────────────────────
app.get('/api/linkedin/me', (req, res) => {
  const payload = getSession(req);
  if (!payload?.profile) {
    res.clearCookie(COOKIE_NAME, { path: '/' });
    return res.json({ authenticated: false });
  }
  return res.json({ authenticated: true, profile: payload.profile });
});

// ── Route: GET /api/linkedin/city ──────────────────────────────────────────────
app.get('/api/linkedin/city', (req, res) => {
  const payload = getSession(req);
  if (!payload?.profile) {
    res.clearCookie(COOKIE_NAME, { path: '/' });
    return res.status(401).json({ error: 'Not authenticated' });
  }
  const cityData = normalizeCityData(payload.profile);
  return res.json(cityData);
});

// ── Route: POST /api/linkedin/logout ───────────────────────────────────────────
app.post('/api/linkedin/logout', (req, res) => {
  res.clearCookie(COOKIE_NAME, {
    path: '/',
    httpOnly: true,
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    secure: process.env.NODE_ENV === 'production',
  });
  return res.json({ ok: true });
});

// ── Health check ───────────────────────────────────────────────────────────────
app.get('/api/health', (_req, res) =>
  res.json({ status: 'ok', service: 'linkedincity-api', env: process.env.NODE_ENV })
);

export default app;
