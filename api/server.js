/**
 * api/server.js — LinkedInCity
 * Express app deployed as a Vercel serverless function.
 * Also used by server/dev.js for local development (node server/dev.js).
 *
 * Routes:
 *   GET  /api/linkedin/login    → redirect to LinkedIn OAuth
 *   GET  /api/linkedin/callback → exchange code, set session cookie
 *   GET  /api/linkedin/me       → return authenticated profile (or {authenticated:false})
 *   GET  /api/linkedin/city     → return normalized city data from real profile
 *   POST /api/linkedin/logout   → clear session cookie
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

const ALLOWED_ORIGINS = [
  process.env.FRONTEND_URL || 'http://localhost:3000',
  // Allow any Vercel preview/production URL for this project
];

app.use(cors({
  origin: (origin, cb) => {
    if (!origin) return cb(null, true);                     // server-to-server / curl
    if (ALLOWED_ORIGINS.includes(origin)) return cb(null, true);
    if (/\.vercel\.app$/.test(origin)) return cb(null, true); // Vercel previews
    cb(new Error(`CORS: origin ${origin} not allowed`));
  },
  credentials: true,
}));

// ── Session cookie helpers ─────────────────────────────────────────────────────
const COOKIE_NAME = 'li_session';

function cookieOpts() {
  const isProd = process.env.NODE_ENV === 'production';
  return {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? 'none' : 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    path: '/',
  };
}

/** Sign a payload into a simple HMAC-based token (avoids the jsonwebtoken ESM issue). */
function signPayload(payload) {
  const secret = process.env.SESSION_SECRET || 'change-me-in-production';
  const body = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const sig = createHmac('sha256', secret).update(body).digest('base64url');
  return `${body}.${sig}`;
}

/** Verify and decode a token. Returns null if invalid. */
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

// ── Route: GET /api/linkedin/login ─────────────────────────────────────────────
app.get('/api/linkedin/login', (req, res) => {
  const state = randomBytes(16).toString('hex');
  // Store state in short-lived cookie to verify on callback
  res.cookie('li_oauth_state', state, {
    httpOnly: true,
    maxAge: 10 * 60 * 1000, // 10 minutes
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
    console.error('[LinkedIn callback] OAuth error:', error);
    return res.redirect(`${frontendBase}/?auth=error`);
  }

  if (!code || !state || state !== savedState) {
    console.error('[LinkedIn callback] State mismatch or missing code');
    return res.redirect(`${frontendBase}/?auth=error`);
  }

  try {
    const tokenData = await exchangeCode(code);
    const profile = await fetchUserInfo(tokenData.access_token);

    // Store profile in signed cookie (access token NOT stored client-side)
    const sessionToken = signPayload({ profile, issuedAt: Date.now() });
    res.cookie(COOKIE_NAME, sessionToken, cookieOpts());

    return res.redirect(`${frontendBase}/?auth=1`);
  } catch (err) {
    console.error('[LinkedIn callback] Error:', err.message);
    return res.redirect(`${frontendBase}/?auth=error`);
  }
});

// ── Route: GET /api/linkedin/me ────────────────────────────────────────────────
app.get('/api/linkedin/me', (req, res) => {
  const token = req.cookies?.[COOKIE_NAME];
  if (!token) return res.json({ authenticated: false });

  const payload = verifyToken(token);
  if (!payload?.profile) {
    res.clearCookie(COOKIE_NAME, { path: '/' });
    return res.json({ authenticated: false });
  }

  return res.json({ authenticated: true, profile: payload.profile });
});

// ── Route: GET /api/linkedin/city ──────────────────────────────────────────────
app.get('/api/linkedin/city', (req, res) => {
  const token = req.cookies?.[COOKIE_NAME];
  if (!token) return res.status(401).json({ error: 'Not authenticated' });

  const payload = verifyToken(token);
  if (!payload?.profile) {
    res.clearCookie(COOKIE_NAME, { path: '/' });
    return res.status(401).json({ error: 'Session invalid or expired' });
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
app.get('/api/health', (_req, res) => res.json({ status: 'ok', service: 'linkedincity-api' }));

export default app;
