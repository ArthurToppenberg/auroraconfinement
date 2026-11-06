// Letters of Interest are created only on /register. Everything else (questions,
// collaboration, investment) goes to the email-only /contact page.
export const contactHrefs = {
  productInterest: '/register/',
  collaboration: '/contact/',
  generalEnquiry: '/contact/',
} as const;

export const registerHrefs = {
  exhibitionModel: '/register/?product=exhibition-model',
  researchPlatform: '/register/?product=research-platform',
  nff: '/register/?source=nff2026',
} as const;

export const homeHero = {
  headline: ['Make plasma visible.', 'Bring fusion closer to people.'],
  supporting:
    'We’re developing a tabletop real-plasma model with shaped magnetic fields to support introductory teaching, public engagement and informed conversations about fusion.',
  primaryLabel: 'Register interest',
  primaryHref: '/register/?product=exhibition-model',
  invitation:
    'Registering interest is free + non-binding, and supports us in getting softfunding, to get started building.',
} as const;

export const projectStatus =
  'Aurora Confinement is a student-led research initiative bringing together talent from Technical University of Denmark and University of Copenhagen. The project is pre-incorporation and at an early stage of development.';

export const conceptCaption =
  'Concept illustration - not the actual product or final design. The magnetic-field configuration shown is illustrative and does not represent Aurora Confinement’s technology.';

// Read at build time on the server; these pages are statically exported.
export const siteName = 'Aurora Confinement';

export const siteOrigin = process.env['PUBLIC_SITE_URL']?.replace(/\/$/, '');

export const socialImage = process.env['PUBLIC_SOCIAL_IMAGE'];

export const contactEmail =
  process.env['PUBLIC_CONTACT_EMAIL'] || 'contact@auroraconfinement.com';

export const universityResearch = {
  metric: '13 of 72',
  description:
    'European institutions in our review had identified on-campus equipment for physical magnetic-confinement experiments.',
  attribution: 'Aurora Confinement desk research, October 2026',
  summary: 'About this research',
  paragraphs: [
    'We reviewed 72 European institutions across 22 countries using FuseNet, EUROfusion and institution-specific sources. We identified on-campus physical magnetic-confinement equipment at 13 of them.',
    'The review covers toroidal and linear magnetic-confinement devices. It is not exhaustive: equipment not identified in public sources is not confirmed absent. Institutions may also conduct research through partner laboratories, remote access or simulations. The review does not establish student access or teaching use.',
  ],
} as const;
