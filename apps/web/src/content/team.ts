export interface TeamMember {
  slug: string;
  name: string;
  discipline: string;
  focus?: readonly string[];
}

// Names, disciplines and focus areas follow material supplied by the team.
// Portraits live in public/images/team/<slug>-{320,640}.webp (4:5, greyscale).
// Focus areas describe contributions, not formal appointments.
export const teamMembers: readonly TeamMember[] = [
  {
    slug: 'etienne',
    name: 'Etienne Rasmus Gras',
    discipline: 'Mechanical Engineering',
    focus: ['Commercial development', 'Operations', 'Project coordination'],
  },
  {
    slug: 'malik',
    name: 'Malik Zaabalawi',
    discipline: 'Engineering Physics',
    focus: ['Technology and theory', 'Outreach'],
  },
  {
    slug: 'stig',
    name: 'Stig Kvistgaard Jensen',
    discipline: 'Engineering Physics',
    focus: ['Modelling and programming', 'Core technology development'],
  },
  {
    slug: 'tobias-elholm',
    name: 'Tobias Peter Elholm',
    discipline: 'Engineering Physics',
    focus: [
      'Plasma parameters',
      'Engineering requirements',
      'Market validation',
    ],
  },
  {
    slug: 'robin',
    name: 'Robin William Brandt',
    discipline: 'Engineering Physics',
    focus: ['Core physics', 'Concept development', 'Exhibition models'],
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
    discipline: 'Engineering Physics',
  },
  {
    slug: 'emily',
    name: 'Emily Bak Torp',
    discipline: 'Engineering Physics',
  },
  {
    slug: 'tobias-tops',
    name: 'Tobias Sejling Tops',
    discipline: 'Engineering Physics',
  },
  {
    slug: 'frederik',
    name: 'Frederik Bjerre Dansbo',
    discipline: 'Engineering Physics',
  },
  {
    slug: 'elias',
    name: 'Elias Dansbo',
    discipline: 'Engineering Physics',
  },
];
