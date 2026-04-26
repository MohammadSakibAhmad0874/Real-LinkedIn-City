/**
 * api/production.js — LinkedInCity
 * Production entry point for Hugging Face Spaces (Docker).
 * HF Spaces requires listening on 0.0.0.0:7860.
 */

import 'dotenv/config';
import app from './server.js';

const PORT = parseInt(process.env.PORT || '7860', 10);

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅  LinkedInCity API running on http://0.0.0.0:${PORT}`);
  console.log(`    NODE_ENV  : ${process.env.NODE_ENV || 'production'}`);
  console.log(`    FRONTEND  : ${process.env.FRONTEND_URL || '(not set)'}`);
});

server.on('error', (err) => {
  console.error('❌  Server error:', err.message);
  process.exit(1);
});
