/**
 * App.jsx — LinkedInCity
 * Root component handling auth flow, routing, SEO, and theme state.
 * LinkedIn OAuth integration: checks session on mount, routes to real/demo mode.
 */

import { useState, useEffect, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { THEMES, DEFAULT_THEME } from "./constants/themes";
import { useLinkedInData } from "./hooks/useLinkedInData";
import { useLinkedInAuth } from "./hooks/useLinkedInAuth";
import { LinkedInConnect } from "./components/ActivityGraph3D/LinkedInConnect";
import { ActivityGraph3D } from "./components/ActivityGraph3D/ActivityGraph3D";

function parseURL() {
  const path = window.location.pathname.replace(/^\/+|\/+$/g, "");
  const parts = path.split("/");
  if (parts.length >= 1 && parts[0] && parts[0] !== "") {
    const username = parts[0];
    const viewHint = parts[1] || null;
    return { username, viewHint };
  }
  return { username: null, viewHint: null };
}

export default function App() {
  const [themeKey, setThemeKey] = useState(() => {
    try { return localStorage.getItem("li_theme") || DEFAULT_THEME; } catch { return DEFAULT_THEME; }
  });
  const theme = useMemo(() => THEMES[themeKey] || THEMES[DEFAULT_THEME], [themeKey]);

  const { data, loading, error, fetchData, fetchRealData } = useLinkedInData();
  const { isAuthenticated, profile: authProfile, authLoading, logout: authLogout } = useLinkedInAuth();

  const [urlParsed, setUrlParsed] = useState(false);

  /**
   * After auth check resolves, figure out what data to load:
   * 1. ?auth=1  + authenticated   → real LinkedIn data
   * 2. ?auth=error                → stay on connect screen (show error later if needed)
   * 3. /:username present         → existing demo mode (username takes priority)
   * 4. Already authenticated      → real LinkedIn data (returning visitor)
   * 5. Saved username in storage  → existing demo mode
   * 6. Nothing                    → show connect screen
   */
  useEffect(() => {
    if (authLoading) return; // wait for session check

    const params = new URLSearchParams(window.location.search);
    const authResult = params.get("auth");

    // Clean up the ?auth query param without reloading
    if (authResult) {
      window.history.replaceState(null, "", window.location.pathname);
    }

    // Coming back from LinkedIn OAuth
    if (authResult === "1" && isAuthenticated) {
      fetchRealData();
      setUrlParsed(true);
      return;
    }

    // /:username route takes priority — keeps demo mode working
    const { username } = parseURL();
    if (username) {
      fetchData(username);
      setUrlParsed(true);
      return;
    }

    // Returning visitor with a valid session → show real city
    if (isAuthenticated) {
      fetchRealData();
      setUrlParsed(true);
      return;
    }

    // Demo mode: check localStorage for a saved username
    try {
      const saved = localStorage.getItem("li_username");
      if (saved) { fetchData(saved); }
    } catch (_) { }

    setUrlParsed(true);
  }, [authLoading, isAuthenticated]); // eslint-disable-line react-hooks/exhaustive-deps

  // Username-input connect handler (demo mode — unchanged)
  function handleConnect(username) {
    window.history.pushState(null, "", `/${username}`);
    fetchData(username);
  }

  // Logout: clear LinkedIn session + demo storage
  async function handleLogout() {
    await authLogout();
    try { localStorage.removeItem("li_username"); } catch (_) { }
    window.history.pushState(null, "", "/");
    window.location.reload();
  }

  function handleThemeChange(key) {
    setThemeKey(key);
    try { localStorage.setItem("li_theme", key); } catch (_) { }
  }

  // Wait for both URL parsing and auth check before deciding what to show
  const showGraph = data && !loading;
  const username = data?.username || "";

  return (
    <>
      <Helmet>
        <title>{username ? `${username}'s LinkedInCity` : "LinkedInCity — Your LinkedIn Activity as a 3D City"}</title>
        <meta name="description" content={username ? `Explore ${username}'s LinkedIn professional activity visualized as a stunning 3D city skyline.` : "Transform your LinkedIn professional activity into a living 3D city with buildings, traffic, and weather."} />
        {username && <link rel="canonical" href={`https://linkedincity.app/${username}`} />}
      </Helmet>

      {!urlParsed ? null : showGraph ? (
        <ActivityGraph3D
          cells={data.cells}
          stats={data.stats}
          profile={data.profile}
          theme={theme}
          themeKey={themeKey}
          onThemeChange={handleThemeChange}
          onLogout={handleLogout}
          isAuthenticated={isAuthenticated}
          dataSource={data.source}
        />
      ) : (
        <LinkedInConnect
          onConnect={handleConnect}
          loading={loading || authLoading}
          error={error}
          theme={theme}
        />
      )}
    </>
  );
}
