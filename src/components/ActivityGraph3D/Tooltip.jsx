/**
 * Tooltip.jsx — LinkedInCity
 * Flips left/right and up/down based on available viewport space.
 * Shows activity type label and themed dot when type is present.
 */

import { TYPE_MAP } from "../../constants/activityTypes";

export function Tooltip({ cell, x, y, theme }) {
  if (!cell) return null;

  const { count, date, type, _originalCount } = cell;
  const displayCount = _originalCount ?? count;  // show original count even if dimmed

  const formattedDate = new Date(date + "T12:00:00").toLocaleDateString("en-US", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });

  const typeInfo = type ? TYPE_MAP[type] : null;
  const dotColor = typeInfo?.color || theme.accent;

  const TW = 190, TH = 155, GAP = 14;
  const vw = window.innerWidth;
  const flipX = x + GAP + TW > vw - 8;
  const flipY = y - TH < 8;
  const left = flipX ? x - TW - GAP : x + GAP;
  const top  = flipY ? y + GAP : y - TH;

  return (
    <div style={{ position: "fixed", top, left, pointerEvents: "none", zIndex: 9999 }}>
      <div style={{
        background: theme.surface,
        border: `1px solid ${dotColor}80`,
        borderRadius: "10px",
        padding: "0.75rem 1rem",
        boxShadow: `0 16px 40px rgba(0,0,0,0.7), 0 0 20px ${dotColor}20`,
        minWidth: 165, maxWidth: TW,
      }}>
        {/* Accent top line — coloured by type */}
        <div style={{
          height: "2px", marginBottom: "0.55rem",
          background: `linear-gradient(90deg, ${dotColor}00, ${dotColor}, ${dotColor}00)`,
          borderRadius: "1px",
        }} />

        {/* Activity type badge */}
        {typeInfo && (
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "0.25rem",
            background: `${typeInfo.color}18`,
            border: `1px solid ${typeInfo.color}40`,
            borderRadius: "999px",
            padding: "0.1rem 0.45rem",
            fontSize: "0.5rem", fontWeight: 700,
            color: typeInfo.color,
            letterSpacing: "0.06em",
            marginBottom: "0.4rem",
          }}>
            <span style={{ fontSize: "0.65rem" }}>{typeInfo.icon}</span>
            {typeInfo.label.toUpperCase()}
          </div>
        )}

        {/* Count */}
        <div style={{
          color: dotColor, fontWeight: 900,
          fontSize: "1.25rem", lineHeight: 1,
          textShadow: `0 0 10px ${dotColor}60`,
        }}>
          {displayCount} activit{displayCount !== 1 ? "ies" : "y"}
        </div>

        {/* Date */}
        <div style={{
          color: theme.text, fontSize: "0.72rem",
          marginTop: "0.3rem", lineHeight: 1.4, opacity: 0.9,
        }}>
          {formattedDate}
        </div>

        {/* Dot visualisation */}
        {displayCount > 0 && (
          <div style={{ display: "flex", gap: 3, flexWrap: "wrap", marginTop: "0.5rem", maxWidth: 150 }}>
            {Array.from({ length: Math.min(displayCount, 20) }).map((_, i) => (
              <div key={i} style={{
                width: 6, height: 6, borderRadius: 1,
                background: dotColor, opacity: 0.8,
              }} />
            ))}
            {displayCount > 20 && (
              <span style={{ color: theme.muted, fontSize: "0.62rem", alignSelf: "center" }}>
                +{displayCount - 20}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
