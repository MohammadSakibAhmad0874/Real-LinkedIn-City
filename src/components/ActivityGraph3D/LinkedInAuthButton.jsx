/**
 * LinkedInAuthButton.jsx — LinkedInCity
 * Small "Sign in with LinkedIn" button that initiates the OAuth flow.
 * Renders in the LinkedInConnect landing card, above the username input.
 * Preserves existing UI/UX — this is an additive element only.
 */

const API_BASE = import.meta.env?.VITE_API_URL || '';

export function LinkedInAuthButton({ theme }) {
  return (
    <a
      href={`${API_BASE}/api/linkedin/login`}
      id="linkedin-auth-btn"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.55rem',
        width: '100%',
        padding: '0.78rem',
        background: '#0A66C2',
        border: '1px solid #0056a0',
        borderRadius: 8,
        color: '#ffffff',
        fontSize: '0.78rem',
        fontFamily: "'Courier New', monospace",
        fontWeight: 700,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        textDecoration: 'none',
        cursor: 'pointer',
        transition: 'background 0.18s, box-shadow 0.18s',
        boxSizing: 'border-box',
        userSelect: 'none',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = '#004e9a';
        e.currentTarget.style.boxShadow = '0 0 20px #0A66C250';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = '#0A66C2';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* LinkedIn "in" logo */}
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
      Sign in with LinkedIn
    </a>
  );
}
