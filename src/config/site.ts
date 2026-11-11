/**
 * Single source of truth for personal details shown across the site.
 * Placeholder values — replace with real ones before publishing.
 */
export const site = {
  name: 'Patrick Oliver',
  shortName: 'P.Oliver',
  role: 'Independent designer & developer',
  tagline: 'Web design, motion and AI automation',
  location: 'Berlin, Germany',
  since: '2016',
  available: true,
  email: 'hello@example.com',
  socials: [
    { label: 'LinkedIn', handle: '/in/your-handle', href: '#' },
    { label: 'Instagram', handle: '@your.handle', href: '#' },
    { label: 'Twitter (X)', handle: '@yourhandle', href: '#' },
  ],
  services: ['Web design', 'Motion & interaction', 'AI automation workflows'],
} as const;
