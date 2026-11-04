const benefits = [
  {
    title: 'Show real plasma',
    text: 'Give audiences a visible starting point for understanding fusion science.',
    path: 'M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z',
  },
  {
    title: 'Explain magnetic confinement',
    text: 'Connect shaped magnetic fields to introductory confinement concepts.',
    path: 'M5 3v9a7 7 0 0 0 14 0V3h-5v9a2 2 0 0 1-4 0V3H5Z M5 7h5 M14 7h5',
  },
  {
    title: 'Support teaching and outreach',
    text: 'Bring a physical demonstration into lessons, exhibitions and public events.',
    path: 'm2 9 10-5 10 5-10 5L2 9Z M6 11v6c4 3 8 3 12 0v-6 M22 9v8',
  },
  {
    title: 'Enable informed conversations',
    text: 'Help audiences ask questions about fusion’s potential and challenges.',
    path: 'M14 14H7l-4 4V4h14v7 M10 17v3h7l4 3V10h-4',
  },
] as const;

const applications = [
  {
    title: 'University teaching',
    text: 'Introduce plasma and magnetic confinement concepts with a physical reference for lectures and demonstrations.',
    path: benefits[2].path,
  },
  {
    title: 'Museums and science centres',
    text: 'Give visitors a visible starting point for exploring plasma and fusion.',
    path: benefits[0].path,
  },
  {
    title: 'Industry outreach',
    text: 'Support explanations and questions at open days, visitor centres and public events.',
    path: benefits[3].path,
  },
  {
    title: 'Policy and fusion events',
    text: 'Provide a focal point for informed conversations about fusion’s science, potential and challenges.',
    path: benefits[1].path,
  },
] as const;

export default function HeroBenefits({
  applications: showApplications = false,
}: {
  applications?: boolean;
}) {
  const items = showApplications ? applications : benefits;
  const Heading = showApplications ? 'h3' : 'h2';
  return (
    <ul
      className={
        showApplications ? 'hero-benefits model-applications' : 'hero-benefits'
      }
      aria-label={
        showApplications
          ? 'Intended applications'
          : 'Intended uses and benefits'
      }
    >
      {items.map((benefit) => (
        <li key={benefit.title}>
          <svg
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            focusable="false"
          >
            <path d={benefit.path} />
          </svg>
          <div>
            <Heading>{benefit.title}</Heading>
            <p>{benefit.text}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
