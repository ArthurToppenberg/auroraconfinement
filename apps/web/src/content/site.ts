export const homeHero = {
  eyebrow: 'FOUNDED BY DTU STUDENTS · FUSION TECHNOLOGY · COPENHAGEN',
  headline: 'Stellarator research should be within reach.',
  supporting:
    'Aurora Confinement is developing compact experimental platforms designed to reduce the cost and infrastructure required for hands-on stellarator research, together with physical models that make the technology easier to communicate and teach.',
  primaryLabel: 'Register institutional interest',
  primaryHref: '/nff#interest',
  secondaryLabel: 'Explore our products',
  secondaryHref: '/products',
} as const;

export const projectStatus =
  'Aurora Confinement is a student-led initiative formed by 13 students at the Technical University of Denmark. The project is pre-incorporation and at an early stage of development.';

export const conceptCaption =
  'Concept illustration. Not the actual product or final design. The depicted magnetic-field configuration does not represent Aurora Confinement’s technology.';

// Read at build time on the server; these pages are statically exported.
export const siteName = 'Aurora Confinement';

export const siteOrigin = process.env['PUBLIC_SITE_URL']?.replace(/\/$/, '');

export const socialImage = process.env['PUBLIC_SOCIAL_IMAGE'];

export const contactEmail =
  process.env['PUBLIC_CONTACT_EMAIL'] || 'auroraconfinement@gmail.com';
