/**
 * server/dev.js — LinkedInCity
 * Local development entry point for the Express backend.
 *
 * Usage:
 *   cd LinkedIn-City-main
 *   node server/dev.js
 *
 * Requires a .env file at the project root with the variables in .env.example
 */

import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { createRequire } from 'module';

// ── Resolve project root ─────────────────────────────────────────────────────
const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, '..');

// ── Load .env using dotenv ───────────────────────────────────────────────────
const require = createRequire(import.meta.url);
try {
  const dotenv = require('dotenv');
  const result = dotenv.config({ path: resolve(projectRoot, '.env') });
  if (result.error) {
    console.warn('[dev] dotenv warning:', result.error.message);
  } else {
    console.log('[dev] ✅ Loaded .env from', resolve(projectRoot, '.env'));
  }
} catch (e) {
  console.warn('[dev] dotenv not available, falling back to manual parse:', e.message);
  // Manual fallback
  try {
    const { readFileSync } = await import('fs');
    const env = readFileSync(resolve(projectRoot, '.env'), 'utf8');
    for (const line of env.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eqIdx = trimmed.indexOf('=');
      if (eqIdx < 1) continue;
      const key = trimmed.slice(0, eqIdx).trim();
      const val = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, '');
      if (!(key in process.env)) process.env[key] = val;
    }
    console.log('[dev] ✅ Manually loaded .env');
  } catch {
    console.warn('[dev] ⚠️  No .env file found — using process environment variables');
  }
}

// ── Validate critical env vars ───────────────────────────────────────────────
const required = ['LINKEDIN_CLIENT_ID', 'LINKEDIN_CLIENT_SECRET', 'LINKEDIN_REDIRECT_URI'];
const missing = required.filter(k => !process.env[k]);
if (missing.length) {
  console.error('\n[dev] ❌ Missing required environment variables:', missing.join(', '));
  console.error('[dev]    Make sure your .env file exists and contains these values.\n');
  process.exit(1);
}

// ── Start Express ────────────────────────────────────────────────────────────
const { default: app } = await import('../api/server.js');

const PORT = Number(process.env.PORT) || 4000;

app.listen(PORT, () => {
  console.log('\n  ╔══════════════════════════════════════════════╗');
  console.log('  ║       LinkedInCity — API Server Running      ║');
  console.log('  ╚══════════════════════════════════════════════╝\n');
  console.log(`  → Health:    http://localhost:${PORT}/api/health`);
  console.log(`  → Login:     http://localhost:${PORT}/api/linkedin/login`);
  console.log(`  → Callback:  ${process.env.LINKEDIN_REDIRECT_URI}`);
  console.log(`  → Frontend:  ${process.env.FRONTEND_URL || 'http://localhost:3000'}`);
  console.log('\n  ✅ Client ID:', process.env.LINKEDIN_CLIENT_ID);
  console.log('  ✅ Secret:    [set]');
  console.log('\n  ⚠️  Make sure LinkedIn App Authorized Redirect URL is set to:');
  console.log(`     ${process.env.LINKEDIN_REDIRECT_URI}\n`);
});
