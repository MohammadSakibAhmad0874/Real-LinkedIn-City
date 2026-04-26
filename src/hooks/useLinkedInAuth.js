/**
 * useLinkedInAuth.js — LinkedInCity
 * Manages LinkedIn OAuth session state.
 *
 * Token flow (cross-origin production):
 *   1. After OAuth callback, backend redirects to /?auth=1&token=xxx
 *   2. This hook reads ?token from the URL on mount and stores in sessionStorage
 *   3. All subsequent API calls use Authorization: Bearer <token>
 */

import { useState, useEffect, useCallback } from 'react';
import { apiFetch, setToken, clearToken } from '../utils/apiClient';

export function useLinkedInAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [profile, setProfile] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  const checkAuth = useCallback(async () => {
    setAuthLoading(true);
    try {
      const res = await apiFetch('/api/linkedin/me', {
        signal: AbortSignal.timeout(8000),
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
      setIsAuthenticated(false);
      setProfile(null);
    } finally {
      setAuthLoading(false);
    }
  }, []);

  // On mount — capture token from URL if redirected back from OAuth
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    if (token) {
      setToken(token);
      // Clean token from URL without reload
      const clean = new URL(window.location.href);
      clean.searchParams.delete('token');
      window.history.replaceState({}, '', clean.toString());
    }
    checkAuth();
  }, [checkAuth]);

  const logout = useCallback(async () => {
    try {
      await apiFetch('/api/linkedin/logout', {
        method: 'POST',
        signal: AbortSignal.timeout(5000),
      });
    } catch { /* clear state regardless */ }
    clearToken();
    setIsAuthenticated(false);
    setProfile(null);
  }, []);

  return { isAuthenticated, profile, authLoading, checkAuth, logout };
}
