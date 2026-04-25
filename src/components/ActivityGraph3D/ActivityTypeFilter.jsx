/**
 * ActivityTypeFilter.jsx — LinkedInCity
 * Pill/chip filter bar for filtering city buildings by LinkedIn activity type.
 * Sits at the bottom of the screen above the legend.
 */

import { ACTIVITY_TYPES, TYPE_MAP } from '../../constants/activityTypes';

export function ActivityTypeFilter({ activeType, onChange, theme, typeCounts }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '0.35rem',
      flexWrap: 'wrap',
    }}>
      {/* Label */}
      <span style={{
        fontSize: '0.5rem',
        color: theme.muted,
        letterSpacing: '0.12em',
        fontWeight: 600,
        textTransform: 'uppercase',
        marginRight: '0.1rem',
        whiteSpace: 'nowrap',
      }}>
        Filter
      </span>

      {ACTIVITY_TYPES.map(({ key, label, icon, color }) => {
        const isActive = activeType === key;
        const chipColor = key === 'all' ? theme.accent : color;
        const count = key === 'all' ? null : (typeCounts?.[key] ?? null);

        return (
          <button
            key={key}
            onClick={() => onChange(key)}
            title={`Filter by: ${label}${count != null ? ` (${count} days)` : ''}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
              padding: '0.18rem 0.5rem',
              borderRadius: '999px',
              border: `1px solid ${isActive ? chipColor : `${chipColor}44`}`,
              background: isActive
                ? `${chipColor}22`
                : `${theme.surface}80`,
              color: isActive ? chipColor : theme.muted,
              fontSize: '0.52rem',
              fontFamily: 'inherit',
              fontWeight: isActive ? 700 : 400,
              cursor: 'pointer',
              letterSpacing: '0.05em',
              transition: 'all 0.18s ease',
              whiteSpace: 'nowrap',
              boxShadow: isActive ? `0 0 8px ${chipColor}33` : 'none',
            }}
            onMouseEnter={e => {
              if (!isActive) {
                e.currentTarget.style.background = `${chipColor}14`;
                e.currentTarget.style.color = chipColor;
                e.currentTarget.style.borderColor = `${chipColor}88`;
              }
            }}
            onMouseLeave={e => {
              if (!isActive) {
                e.currentTarget.style.background = `${theme.surface}80`;
                e.currentTarget.style.color = theme.muted;
                e.currentTarget.style.borderColor = `${chipColor}44`;
              }
            }}
          >
            <span style={{ fontSize: '0.65rem', lineHeight: 1 }}>{icon}</span>
            {label}
            {count != null && (
              <span style={{
                fontSize: '0.44rem',
                opacity: 0.75,
                background: isActive ? `${chipColor}30` : 'transparent',
                borderRadius: '999px',
                padding: '0.05rem 0.25rem',
                marginLeft: '0.1rem',
              }}>
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
