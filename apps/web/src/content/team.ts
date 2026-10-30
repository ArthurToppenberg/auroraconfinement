export type TeamGroup = 'core' | 'extended';

export interface TeamMember {
  slug: string;
  name: string;
  discipline: string;
  role?: string;
  group: TeamGroup;
}

// Names, disciplines and roles follow the team's own working document.
// Portraits live in public/images/team/<slug>-{320,640}.webp (4:5, greyscale).
// Roles are working focus areas inside a project in formation, not job titles.
export const teamMembers: readonly TeamMember[] = [
  {
    slug: 'etienne',
    name: 'Etienne Rasmus Gras',
    discipline: 'Mechanical Engineering',
    role: 'Commercial lead, operations and project coordination',
    group: 'core',
  },
  {
    slug: 'malik',
    name: 'Malik Zaabalawi',
    discipline: 'Physics Engineering',
    role: 'Technology, theory and outreach',
    group: 'core',
  },
  {
    slug: 'stig',
    name: 'Stig Kvistgaard Jensen',
    discipline: 'Physics Engineering',
    role: 'Modelling, programming and core technology',
    group: 'core',
  },
  {
    slug: 'tobias-elholm',
    name: 'Tobias Peter Elholm',
    discipline: 'Physics Engineering',
    role: 'Plasma parameters, machine requirements and market validation',
    group: 'core',
  },
  {
    slug: 'robin',
    name: 'Robin William Brandt',
    discipline: 'Physics Engineering',
    role: 'Core physics, concept development and exhibition models',
    group: 'core',
  },
  {
    slug: 'fie',
    name: 'Fie London',
    discipline: 'Electrical Engineering',
    group: 'extended',
  },
  {
    slug: 'simon',
    name: 'Simon Allermann Møller',
    discipline: 'Electrical Engineering',
    group: 'extended',
  },
  {
    slug: 'elisabeth',
    name: 'Elisabeth Astrup Christensen',
    discipline: 'Physics Engineering',
    group: 'extended',
  },
  {
    slug: 'emily',
    name: 'Emily Bak Torp',
    discipline: 'Physics Engineering',
    group: 'extended',
  },
  {
    slug: 'tobias-tops',
    name: 'Tobias Sejling Tops',
    discipline: 'Physics Engineering',
    group: 'extended',
  },
  {
    slug: 'frederik',
    name: 'Frederik Bjerre Dansbo',
    discipline: 'Physics Engineering',
    group: 'extended',
  },
];
