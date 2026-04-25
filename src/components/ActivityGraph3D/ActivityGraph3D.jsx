/**
 * ActivityGraph3D.jsx — LinkedInCity
 * Main controller managing views, time filters, activity type filters,
 * theme switching, and tooltips.
 */

import { useState, useCallback, useMemo } from "react";
import { useContributionData } from "../../hooks/useContributionData";
import { useMountAnimation } from "../../hooks/useMountAnimation";
import { useMousePosition } from "../../hooks/useMousePosition";
import { filterByType } from "../../utils/dataUtils";
import { ACTIVITY_TYPES } from "../../constants/activityTypes";
import { IsometricGrid } from "./IsometricGrid";
import { BirdsEyeGrid } from "./BirdsEyeGrid";
import { CitySimulation } from "./CitySimulation";
import { Tooltip } from "./Tooltip";
import { StatsBar } from "./StatsBar";
import { ThemePicker } from "./ThemePicker";
import { ViewToggle } from "./ViewToggle";
import { GraphLegend } from "./GraphLegend";
import { ActivityTypeFilter } from "./ActivityTypeFilter";

const TIME_RANGES = [
  { key: "all", label: "All Time" },
  { key: "1y",  label: "1 Year"   },
  { key: "6m",  label: "6 Months" },
  { key: "3m",  label: "3 Months" },
  { key: "1m",  label: "1 Month"  },
  { key: "1w",  label: "1 Week"   },
];

export function ActivityGraph3D({ cells, stats: rawStats, profile, theme, themeKey, onThemeChange, onLogout, isAuthenticated, dataSource }) {
  const [view, setView]           = useState("isometric");
  const [range, setRange]         = useState("all");
  const [hoveredCell, setHoveredCell] = useState(null);
  const [activeType, setActiveType]   = useState("all");

  const { sortedCells, stats, monthLabels } = useContributionData(cells, range);

  // Apply activity-type filter: dims non-matching buildings, keeps grid shape
  const filteredCells = useMemo(
    () => filterByType(sortedCells, activeType),
    [sortedCells, activeType]
  );

  // Count how many active days belong to each type (from un-filtered cells)
  const typeCounts = useMemo(() => {
    const counts = {};
    sortedCells.forEach(c => {
      if (c.count > 0 && c.type) counts[c.type] = (counts[c.type] || 0) + 1;
    });
    return counts;
  }, [sortedCells]);

  const mounted   = useMountAnimation([sortedCells]);
  const mousePos  = useMousePosition();

  const handleHover = useCallback((cell) => setHoveredCell(cell), []);

  // Active type meta for footer label
  const activeTypeMeta = ACTIVITY_TYPES.find(t => t.key === activeType);

  const username = profile?.name || "";

  return (
    <div style={{
      width: "100%", height: "100vh",
      display: "flex", flexDirection: "column",
      background: theme.bg,
      fontFamily: "'Courier New', monospace",
      color: theme.text,
      overflow: "hidden",
    }}>
      {/* ── HEADER ── */}
      <div style={{
        padding: "0.75rem 1.25rem",
        borderBottom: `1px solid ${theme.border}`,
        display: "flex", alignItems: "center", gap: "1rem",
        flexWrap: "wrap",
        background: `${theme.surface}80`,
        backdropFilter: "blur(8px)",
        zIndex: 30,
      }}>
        {/* Title */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginRight: "auto" }}>
          <span style={{ fontSize: "1.2rem" }}>🏙️</span>
          <div>
            <div style={{ fontSize: "0.65rem", color: theme.accent, letterSpacing: "0.15em", fontWeight: 700 }}>
              LINKEDINCITY
            </div>
            {username && (
              <div style={{ fontSize: "0.72rem", color: theme.text, fontWeight: 600 }}>
                <span style={{ color: theme.muted }}>@</span>{username}
              </div>
            )}
          </div>

          {/* LIVE badge */}
          {isAuthenticated && dataSource === "linkedin" && (
            <span title="Real LinkedIn data" style={{
              display: "flex", alignItems: "center", gap: "0.22rem",
              fontSize: "0.48rem", color: "#00cc77",
              letterSpacing: "0.1em", fontWeight: 700,
              background: "#00cc7715", border: "1px solid #00cc7730",
              borderRadius: 4, padding: "0.12rem 0.35rem",
            }}>
              <span style={{ fontSize: "0.4rem" }}>●</span>
              LIVE
            </span>
          )}

          <button onClick={onLogout} style={{
            background: "transparent", border: `1px solid ${theme.border}`,
            borderRadius: 4, color: theme.muted, fontSize: "0.55rem",
            fontFamily: "inherit", padding: "0.15rem 0.45rem",
            cursor: "pointer", marginLeft: "0.25rem",
          }}>
            ✕
          </button>
        </div>

        {/* View toggle */}
        <ViewToggle current={view} onChange={setView} theme={theme} />

        {/* Time range filter */}
        <div style={{ display: "flex", gap: "0.2rem", flexWrap: "wrap" }}>
          {TIME_RANGES.map(({ key, label }) => {
            const active = range === key;
            return (
              <button key={key} onClick={() => setRange(key)} style={{
                background: active ? `${theme.accent}20` : "transparent",
                border: `1px solid ${active ? theme.accent : theme.border}`,
                borderRadius: 4, padding: "0.2rem 0.45rem",
                color: active ? theme.accent : theme.muted,
                fontSize: "0.55rem", fontFamily: "inherit",
                cursor: "pointer", fontWeight: active ? 700 : 400,
                transition: "all 0.15s",
              }}>
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── STATS BAR ── */}
      {view !== "simulation" && (
        <div style={{ padding: "0.65rem 1.25rem 0" }}>
          <StatsBar stats={stats} theme={theme} />
        </div>
      )}

      {/* ── ACTIVE FILTER BANNER ── */}
      {view !== "simulation" && activeType !== "all" && (
        <div style={{
          padding: "0.3rem 1.25rem",
          display: "flex", alignItems: "center", gap: "0.5rem",
          background: `${activeTypeMeta?.color || theme.accent}10`,
          borderBottom: `1px solid ${activeTypeMeta?.color || theme.accent}25`,
          fontSize: "0.52rem",
          color: activeTypeMeta?.color || theme.accent,
          fontWeight: 600,
        }}>
          <span>{activeTypeMeta?.icon}</span>
          Showing: {activeTypeMeta?.label}
          <span style={{ color: theme.muted, fontWeight: 400 }}>
            — {typeCounts[activeType] || 0} active days
          </span>
          <button
            onClick={() => setActiveType("all")}
            style={{
              marginLeft: "auto", background: "transparent",
              border: `1px solid ${activeTypeMeta?.color || theme.accent}55`,
              borderRadius: 4, color: activeTypeMeta?.color || theme.accent,
              fontSize: "0.5rem", cursor: "pointer", fontFamily: "inherit",
              padding: "0.1rem 0.4rem",
            }}
          >
            ✕ Clear
          </button>
        </div>
      )}

      {/* ── MAIN VIEW ── */}
      <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
        {view === "isometric" && (
          <IsometricGrid
            sortedCells={filteredCells}
            stats={stats}
            monthLabels={monthLabels}
            theme={theme}
            mounted={mounted}
            hoveredDate={hoveredCell?.date}
            onHover={handleHover}
            activeType={activeType}
          />
        )}
        {view === "birdseye" && (
          <BirdsEyeGrid
            sortedCells={filteredCells}
            stats={stats}
            theme={theme}
            mounted={mounted}
            hoveredDate={hoveredCell?.date}
            onHover={handleHover}
            activeType={activeType}
          />
        )}
        {view === "simulation" && (
          <CitySimulation
            cells={sortedCells}
            stats={stats}
            theme={theme}
            profile={profile}
          />
        )}
      </div>

      {/* ── FOOTER ── */}
      {view !== "simulation" && (
        <div style={{
          padding: "0.5rem 1.25rem 0.65rem",
          borderTop: `1px solid ${theme.border}`,
          display: "flex", alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap", gap: "0.5rem",
          background: `${theme.surface}60`,
        }}>
          {/* LEFT: Activity Type Filter */}
          <ActivityTypeFilter
            activeType={activeType}
            onChange={setActiveType}
            theme={theme}
            typeCounts={typeCounts}
          />

          {/* RIGHT: Theme + Legend */}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
            <ThemePicker current={themeKey} onChange={onThemeChange} theme={theme} />
            <GraphLegend theme={theme} />
          </div>
        </div>
      )}

      {/* ── TOOLTIP ── */}
      {view !== "simulation" && hoveredCell && (
        <Tooltip cell={hoveredCell} x={mousePos.x} y={mousePos.y} theme={theme} />
      )}
    </div>
  );
}
