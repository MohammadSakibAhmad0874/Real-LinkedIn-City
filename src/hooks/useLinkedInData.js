/**
 * useLinkedInData.js — LinkedInCity
 * Generates deterministic LinkedIn activity data based on username (demo mode).
 * Also provides fetchRealData() for authenticated LinkedIn sessions (real mode).
 */

import { useState, useCallback } from "react";
import { normaliseContributions } from "../utils/dataUtils";
import { pickType } from "../constants/activityTypes";
import { apiFetch } from "../utils/apiClient";

// ─── Demo mode: deterministic seeded generator ───────────────────────────────

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

function generateLinkedInActivity(username) {
  const rand = seededRng(username);
  const days = [];
  const now = new Date();
  const start = new Date(now);
  start.setFullYear(start.getFullYear() - 1);
  start.setDate(start.getDate() - start.getDay());

  const activityLevel = 0.3 + rand() * 0.5;
  const weekdayBias = 0.6 + rand() * 0.3;
  const consistencyFactor = 0.4 + rand() * 0.4;
  const burstiness = rand() * 0.6;
  const peakMonths = [
    Math.floor(rand() * 3),
    3 + Math.floor(rand() * 3),
  ];

  for (let d = new Date(start); d <= now; d.setDate(d.getDate() + 1)) {
    const dateStr = d.toISOString().slice(0, 10);
    const dow = d.getDay();
    const month = d.getMonth();
    const weekOfYear = Math.floor((d - start) / (7 * 86400000));

    let prob = activityLevel;
    if (dow >= 1 && dow <= 5) prob *= (1 + weekdayBias * 0.5);
    else prob *= (1 - weekdayBias * 0.4);
    const monthFactor = peakMonths.includes(month) ? 1.4 : 0.85;
    prob *= monthFactor;
    const waveFactor = 0.7 + Math.sin(weekOfYear * 0.3 + rand() * Math.PI) * 0.3 * consistencyFactor;
    prob *= waveFactor;
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
  return days;
}

function generateProfile(username) {
  const rand = seededRng(username + "_profile");
  const titles = [
    "Software Engineer", "Product Manager", "Data Scientist",
    "UX Designer", "Marketing Director", "CTO",
    "Full Stack Developer", "Business Analyst", "VP Engineering",
    "DevOps Engineer", "AI Researcher", "Growth Lead",
  ];
  const companies = [
    "Tech Corp", "InnovateCo", "DataDriven Inc", "CloudFirst",
    "DigitalEdge", "NextGen Labs", "SmartSolutions", "FutureStack",
  ];
  return {
    name: username,
    title: titles[Math.floor(rand() * titles.length)],
    company: companies[Math.floor(rand() * companies.length)],
    connections: Math.floor(200 + rand() * 4800),
    followers: Math.floor(50 + rand() * 9950),
    source: "demo",
  };
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useLinkedInData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /** Demo mode — seeded by username string. */
  const fetchData = useCallback(async (username) => {
    if (!username) return;
    setLoading(true);
    setError(null);
    try {
      await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 600));
      const rawDays = generateLinkedInActivity(username);
      const { cells, stats } = normaliseContributions(rawDays);
      const profile = generateProfile(username);
      setData({ cells, stats, profile, username, source: "demo" });
    } catch (err) {
      setError(err.message || "Failed to generate activity data");
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Real mode — fetches city data from the authenticated LinkedIn session.
   * Uses apiFetch → sends Authorization: Bearer token for cross-origin (Vercel + HF).
   */
  const fetchRealData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiFetch("/api/linkedin/city", {
        signal: AbortSignal.timeout(10000),
      });

      if (!res.ok) {
        if (res.status === 401) throw new Error("LinkedIn session expired — please reconnect.");
        throw new Error(`Server error (${res.status})`);
      }

      const cityData = await res.json();
      const { cells, stats } = normaliseContributions(cityData.days);

      setData({
        cells,
        stats,
        profile: cityData.profile,
        username: cityData.username,
        source: "linkedin",
      });
    } catch (err) {
      setError(err.message || "Failed to load LinkedIn data");
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, fetchData, fetchRealData };
}
