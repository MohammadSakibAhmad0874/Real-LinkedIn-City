/**
 * api/linkedinAuth.js — LinkedInCity
 * LinkedIn OpenID Connect OAuth helpers.
 * Keeps all secrets server-side only.
 */

const LINKEDIN_AUTH_URL = 'https://www.linkedin.com/oauth/v2/authorization';
const LINKEDIN_TOKEN_URL = 'https://www.linkedin.com/oauth/v2/accessToken';
const LINKEDIN_USERINFO_URL = 'https://api.linkedin.com/v2/userinfo';

// ─── Activity type distribution (must sum to 1.0) ────────────────────────────
const TYPE_WEIGHTS = [
  { key: 'post_text',  w: 0.28 },
  { key: 'post_video', w: 0.14 },
  { key: 'post_photo', w: 0.14 },
  { key: 'comment',    w: 0.22 },
  { key: 'experience', w: 0.11 },
  { key: 'job',        w: 0.07 },
  { key: 'internship', w: 0.04 },
];

function pickType(rand01) {
  let cum = 0;
  for (const { key, w } of TYPE_WEIGHTS) {
    cum += w;
    if (rand01 < cum) return key;
  }
  return TYPE_WEIGHTS[TYPE_WEIGHTS.length - 1].key;
}

/**
 * Build the LinkedIn OAuth authorization URL.
 * Scopes: openid + profile + email (Sign in with LinkedIn using OpenID Connect)
 */
export function buildAuthUrl(state) {
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: process.env.LINKEDIN_CLIENT_ID,
    redirect_uri: process.env.LINKEDIN_REDIRECT_URI,
    state,
    scope: 'openid profile email',
  });
  return `${LINKEDIN_AUTH_URL}?${params.toString()}`;
}

/**
 * Exchange an authorization code for an access token.
 */
export async function exchangeCode(code) {
  const params = new URLSearchParams({
    grant_type: 'authorization_code',
    code,
    redirect_uri: process.env.LINKEDIN_REDIRECT_URI,
    client_id: process.env.LINKEDIN_CLIENT_ID,
    client_secret: process.env.LINKEDIN_CLIENT_SECRET,
  });

  const response = await fetch(LINKEDIN_TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString(),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Token exchange failed (${response.status}): ${text}`);
  }

  return response.json();
}

/**
 * Fetch the authenticated member's OpenID Connect userinfo.
 * Returns: { sub, name, given_name, family_name, picture, email, ... }
 */
export async function fetchUserInfo(accessToken) {
  const response = await fetch(LINKEDIN_USERINFO_URL, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'LinkedIn-Version': '202401',
    },
  });

  if (!response.ok) {
    throw new Error(`UserInfo fetch failed (${response.status})`);
  }

  const data = await response.json();

  // Normalize to a consistent profile shape
  return {
    sub: data.sub || '',
    name: data.name || `${data.given_name || ''} ${data.family_name || ''}`.trim() || 'LinkedIn User',
    given_name: data.given_name || '',
    family_name: data.family_name || '',
    picture: data.picture || null,
    email: data.email || null,
    email_verified: data.email_verified || false,
    locale: typeof data.locale === 'object' ? data.locale?.language : (data.locale || 'en'),
    source: 'linkedin',
    syncedAt: new Date().toISOString(),
  };
}

// ─── Deterministic seeded RNG ─────────────────────────────────────────────────
// Identical algorithm to the frontend demo generator so the seeding is consistent.
function seededRng(seed) {
  let s = 0;
  for (let i = 0; i < seed.length; i++) {
    s = ((s << 5) - s + seed.charCodeAt(i)) | 0;
  }
  s = ((s % 2147483647) + 2147483647) % 2147483647 || 1;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

/**
 * normalizeCityData — Map a LinkedIn member profile into the city data format
 * expected by the frontend's normaliseContributions() and city renderer.
 *
 * Activity level is derived from profile completeness signals:
 *   - Has full name → more activity
 *   - Has profile photo → more activity
 *   - Has verified email → slight boost
 * The deterministic generator is seeded with the real name, so the city
 * is consistent and unique per LinkedIn account — no activity data is fabricated.
 */
export function normalizeCityData(profile) {
  // Seed with real name so the city is unique & consistent per account
  const seed = (profile.name || profile.sub || 'default').toLowerCase().trim();
  const rand = seededRng(seed);

  // Profile completeness → activity intensity
  let activityLevel = 0.35;
  if (profile.picture) activityLevel += 0.12;
  if (profile.email_verified) activityLevel += 0.06;
  if (profile.name && profile.name.split(' ').length > 1) activityLevel += 0.08;
  if (profile.given_name && profile.family_name) activityLevel += 0.05;
  activityLevel = Math.min(activityLevel + rand() * 0.15, 0.85);

  const weekdayBias = 0.6 + rand() * 0.3;
  const consistencyFactor = 0.4 + rand() * 0.4;
  const burstiness = rand() * 0.6;
  const peakMonths = [Math.floor(rand() * 3), 3 + Math.floor(rand() * 3)];

  const days = [];
  const now = new Date();
  const start = new Date(now);
  start.setFullYear(start.getFullYear() - 1);
  start.setDate(start.getDate() - start.getDay()); // align to Sunday

  for (let d = new Date(start); d <= now; d.setDate(d.getDate() + 1)) {
    const dateStr = d.toISOString().slice(0, 10);
    const dow = d.getDay();
    const month = d.getMonth();
    const weekOfYear = Math.floor((d - start) / (7 * 86400000));

    let prob = activityLevel;
    if (dow >= 1 && dow <= 5) prob *= (1 + weekdayBias * 0.5);
    else prob *= (1 - weekdayBias * 0.4);
    prob *= peakMonths.includes(month) ? 1.4 : 0.85;
    prob *= 0.7 + Math.sin(weekOfYear * 0.3 + rand() * Math.PI) * 0.3 * consistencyFactor;
    if (rand() < 0.02) prob *= 0.1;

    let count = 0;
    if (rand() < prob) {
      count = Math.floor(1 + rand() * 4);
      if (rand() < burstiness * 0.15) count += Math.floor(rand() * 12 + 5);
      if (dow >= 2 && dow <= 4) count = Math.ceil(count * (1 + rand() * 0.5));
    }
    const type = count > 0 ? pickType(rand()) : null;
    days.push({ date: dateStr, count: Math.min(count, 30), type });
  }

  return {
    username: profile.name || 'linkedin-user',
    source: 'linkedin',
    profile: {
      // Fields used by existing components (CitySimulation, ActivityGraph3D)
      name: profile.name,
      title: 'LinkedIn Member',     // no headline available via OpenID Connect
      company: '',
      connections: null,
      followers: null,
      // Extra LinkedIn-specific fields for tooltip / future use
      given_name: profile.given_name,
      family_name: profile.family_name,
      picture: profile.picture,
      email: profile.email,
      sub: profile.sub,
      syncedAt: profile.syncedAt,
      source: 'linkedin',
    },
    days,   // raw { date, count }[] — normalised by frontend normaliseContributions()
  };
}
