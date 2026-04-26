/**
 * src/utils/apiClient.js — LinkedInCity
 * Shared API client utility.
 *
 * In production (Vercel frontend + HF backend):
 *   - API_BASE = VITE_API_URL env var (e.g. https://user-space.hf.space)
 *   - Token stored in sessionStorage, sent as Authorization: Bearer
 *
 * In local dev:
 *   - API_BASE = '' (Vite proxy forwards /api/* to localhost:4000)
 *   - Cookie-based auth still works
 */

export const API_BASE = import.meta.env.VITE_API_URL?.replace(/\/$/, '') || '';

const TOKEN_KEY = 'li_token';

export function getToken() {
  try { return sessionStorage.getItem(TOKEN_KEY); } catch { return null; }
}

export function setToken(token) {
  try { sessionStorage.setItem(TOKEN_KEY, token); } catch {}
}

export function clearToken() {
  try { sessionStorage.removeItem(TOKEN_KEY); } catch {}
}

/** Returns headers object with Authorization if a token exists. */
export function authHeaders() {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

/** Convenience wrapper for authenticated fetch calls. */
export function apiFetch(path, opts = {}) {
  return fetch(`${API_BASE}${path}`, {
    credentials: 'include',
    ...opts,
    headers: {
      ...authHeaders(),
      ...(opts.headers || {}),
    },
  });
}
