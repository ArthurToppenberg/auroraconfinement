export interface TeamMember {
  slug: string;
  name: string;
  discipline: string;
  role?: string;
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
  },
  {
    slug: 'malik',
    name: 'Malik Zaabalawi',
    discipline: 'Physics Engineering',
    role: 'Technology, theory and outreach',
  },
  {
    slug: 'stig',
    name: 'Stig Kvistgaard Jensen',
    discipline: 'Physics Engineering',
    role: 'Modelling, programming and core technology',
  },
  {
    slug: 'tobias-elholm',
    name: 'Tobias Peter Elholm',
    discipline: 'Physics Engineering',
    role: 'Plasma parameters, machine requirements and market validation',
  },
  {
    slug: 'robin',
    name: 'Robin William Brandt',
    discipline: 'Physics Engineering',
    role: 'Core physics, concept development and exhibition models',
  },
  {
    slug: 'fie',
    name: 'Fie London',
    discipline: 'Electrical Engineering',
  },
  {
    slug: 'simon',
    name: 'Simon Allermann Møller',
    discipline: 'Electrical Engineering',
  },
  {
    slug: 'elisabeth',
    name: 'Elisabeth Astrup Christensen',
    discipline: 'Physics Engineering',
  },
  {
    slug: 'emily',
    name: 'Emily Bak Torp',
    discipline: 'Physics Engineering',
  },
  {
    slug: 'tobias-tops',
    name: 'Tobias Sejling Tops',
    discipline: 'Physics Engineering',
  },
  {
    slug: 'frederik',
    name: 'Frederik Bjerre Dansbo',
    discipline: 'Physics Engineering',
  },
];
