/**
 * useLinkedInAuth.js — LinkedInCity
 * React hook to check if the user is authenticated with LinkedIn.
 * Calls GET /api/linkedin/me on mount and exposes auth state to the app.
 *
 * Returns:
 *   isAuthenticated {boolean}
 *   profile         {object|null}  LinkedIn profile from OpenID Connect
 *   authLoading     {boolean}
 *   checkAuth       {()=>void}     Re-check session (e.g. after redirect back)
 *   logout          {()=>Promise}  POST /api/linkedin/logout then reset state
 */

import { useState, useEffect, useCallback } from 'react';

// In Vercel production the frontend and API are on the same origin, so no base needed.
// VITE_API_URL can override for custom setups.
const API_BASE = typeof import.meta !== 'undefined'
  ? (import.meta.env?.VITE_API_URL || '')
  : '';

export function useLinkedInAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [profile, setProfile] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  const checkAuth = useCallback(async () => {
    setAuthLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/linkedin/me`, {
        credentials: 'include',
        signal: AbortSignal.timeout(6000),
      });
      if (!res.ok) throw new Error('API unreachable');
      const data = await res.json();
      if (data.authenticated && data.profile) {
        setIsAuthenticated(true);
        setProfile(data.profile);
      } else {
        setIsAuthenticated(false);
        setProfile(null);
      }
    } catch {
      // Backend not running or network error → silently stay in demo mode
      setIsAuthenticated(false);
      setProfile(null);
    } finally {
      setAuthLoading(false);
    }
  }, []);

  // Check auth on mount
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const logout = useCallback(async () => {
    try {
      await fetch(`${API_BASE}/api/linkedin/logout`, {
        method: 'POST',
        credentials: 'include',
        signal: AbortSignal.timeout(5000),
      });
    } catch { /* noop — clear state regardless */ }
    setIsAuthenticated(false);
    setProfile(null);
  }, []);

  return { isAuthenticated, profile, authLoading, checkAuth, logout };
}
