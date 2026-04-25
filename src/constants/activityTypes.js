/**
 * activityTypes.js — LinkedInCity
 * Defines LinkedIn activity categories used for city building filters.
 * Each day with activity is assigned one dominant type via seeded RNG.
 */

export const ACTIVITY_TYPES = [
  {
    key: 'all',
    label: 'All Activity',
    icon: '🏙️',
    color: null,          // null = use theme default
    weight: 0,            // not used in distribution
  },
  {
    key: 'post_text',
    label: 'Posts',
    icon: '📝',
    color: '#4fc3f7',     // sky blue
    weight: 0.28,
  },
  {
    key: 'post_video',
    label: 'Videos',
    icon: '🎥',
    color: '#ff7043',     // deep orange
    weight: 0.14,
  },
  {
    key: 'post_photo',
    label: 'Photos',
    icon: '📷',
    color: '#ce93d8',     // light purple
    weight: 0.14,
  },
  {
    key: 'comment',
    label: 'Comments',
    icon: '💬',
    color: '#66bb6a',     // green
    weight: 0.22,
  },
  {
    key: 'experience',
    label: 'Experience',
    icon: '💼',
    color: '#ffa726',     // amber
    weight: 0.11,
  },
  {
    key: 'job',
    label: 'Jobs',
    icon: '🎯',
    color: '#ef5350',     // red
    weight: 0.07,
  },
  {
    key: 'internship',
    label: 'Internships',
    icon: '🎓',
    color: '#26c6da',     // teal
    weight: 0.04,
  },
];

/** All non-"all" type keys */
export const TYPE_KEYS = ACTIVITY_TYPES.slice(1).map(t => t.key);

/** Map from key → type object for O(1) lookup */
export const TYPE_MAP = Object.fromEntries(ACTIVITY_TYPES.map(t => [t.key, t]));

/**
 * Assign an activity type to a day using a seeded random value [0,1).
 * Uses cumulative weight distribution to pick a type.
 */
export function pickType(rand01) {
  const types = ACTIVITY_TYPES.slice(1); // skip 'all'
  let cumulative = 0;
  for (const t of types) {
    cumulative += t.weight;
    if (rand01 < cumulative) return t.key;
  }
  return types[types.length - 1].key;
}
