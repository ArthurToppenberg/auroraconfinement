export interface TeamMember {
  slug: string;
  name: string;
  discipline: string;
  focus?: readonly string[];
  linkedInUrl?: string;
}

// Names, disciplines and focus areas follow material supplied by the team.
// Portraits live in public/images/team/<slug>-{320,640}.webp (4:5, greyscale).
// Focus areas describe contributions, not formal appointments.
export const teamMembers: readonly TeamMember[] = [
  {
    slug: 'etienne',
    name: 'Etienne Gras',
    linkedInUrl: 'https://www.linkedin.com/in/etiennegras1/',
    discipline: 'BSc Mechanical Engineering, DTU',
    focus: [
      'Director - Company strategy',
      'Commercial development',
      'Operations',
    ],
  },
  {
    slug: 'malik',
    name: 'Malik Zaabalawi',
    linkedInUrl: 'https://www.linkedin.com/in/malik-zaabalawi/',
    discipline: 'MSc Engineering Physics, DTU',
    focus: [
      'Head of Research Device',
      'Magnets, coils and structural materials',
      'Commercial outreach',
    ],
  },
  {
    slug: 'stig',
    name: 'Stig Kvistgaard Jensen',
    linkedInUrl:
      'https://www.linkedin.com/in/stig-kvistgaard-jensen-0a0ba52a3/?locale=en',
    discipline: 'MSc Engineering Physics, DTU',
    focus: [
      'Head of Modelling and Optimization',
      'Numerical studies',
      'Programming',
    ],
  },
  {
    slug: 'tobias-elholm',
    name: 'Tobias Peter Elholm',
    linkedInUrl: 'https://www.linkedin.com/in/tobias-peter-elholm-72145b3a3/',
    discipline: 'MSc Engineering Physics, DTU',
    focus: [
      'Head of Plasma Diagnostics',
      'Plasma parameters',
      'Engineering requirements',
    ],
  },
  {
    slug: 'robin',
    name: 'Robin William Brandt',
    linkedInUrl: 'https://www.linkedin.com/in/robin-brandt-4a8092372/',
    discipline: 'MSc Engineering Physics, DTU',
    focus: [
      'Head of Exhibition Model',
      'Plasma heating',
      'Concept development',
    ],
  },
  {
    slug: 'fie',
    name: 'Fie London',
    linkedInUrl: 'https://www.linkedin.com/in/fie-london-2035ab445/',
    discipline: 'MSc Electrical Engineering, DTU',
    focus: ['Electrical engineering', 'Governance', 'Budgeting'],
  },
  {
    slug: 'simon',
    name: 'Simon Allermann Møller',
    discipline: 'MSc Electrical Engineering, DTU',
    focus: [
      'Electrical system design',
      'Power systems',
      'Instrumentation and controls',
    ],
  },
  {
    slug: 'elisabeth',
    name: 'Elisabeth Astrup Christensen',
    linkedInUrl:
      'https://www.linkedin.com/in/elisabeth-astrup-christensen-17b920320/',
    discipline: 'MSc Engineering Physics, DTU',
    focus: [
      'JT-60SA plasma diagnostics feasibility studies',
      'Computational plasma physics',
      'Co-authored a paper on grad-B drift measurements',
    ],
  },
  {
    slug: 'emily',
    name: 'Emily Bak Torp',
    discipline: 'MSc Engineering Physics, DTU',
    focus: [
      'Fusion plasma physics',
      'Charged-particle drift',
      'Magnetic confinement analysis',
    ],
  },
  {
    slug: 'tobias-tops',
    name: 'Tobias Sejling Tops',
    discipline: 'MSc Engineering Physics, DTU',
    focus: [
      'Fusion plasma physics',
      'Charged-particle drift',
      'Magnetic confinement analysis',
    ],
  },
  {
    slug: 'frederik',
    name: 'Frederik Bjerre Dansbo',
    discipline: 'MSc Engineering Physics, DTU',
    focus: [
      'Hall-effect sensor development',
      'Contactless current measurement',
      'Thermal drift analysis',
    ],
  },
  {
    slug: 'elias',
    name: 'Elias Dansbo',
    discipline: 'MSc Engineering Physics, DTU',
    focus: ['Materials physics', 'Physical magnets', 'Magnetohydrodynamics'],
  },
  {
    slug: 'arthur',
    name: 'Arthur Toppenberg',
    linkedInUrl: 'https://www.linkedin.com/in/arthur-toppenberg-52b15126a/',
    discipline: 'BSc Mechanical Engineering, DTU',
    focus: ['Professional Software Engineer', 'Mechanical prototyping', 'DJ'],
  },
  {
    slug: 'manon',
    name: 'Manon Johansson Chatel',
    linkedInUrl: 'https://www.linkedin.com/in/hanna-manon-johansson-chatel/',
    discipline: 'MSc Quantum Physics, KU',
    focus: ['Particle physics', 'Risk & Model Validation', 'Governance'],
  },
];
