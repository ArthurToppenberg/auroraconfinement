// Concept scenes share a symbolic model, not an engineering representation.
function PlasmaModel({
  x,
  y,
  scale = 0.65,
}: {
  x: number;
  y: number;
  scale?: number;
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <path d="M-48 20v9h96v-9Z M-38 29v7 M38 29v7" />
      <ellipse cx="0" cy="0" rx="43" ry="23" />
      <path
        className="application-plasma"
        fillRule="evenodd"
        d="M-28 0a28 12 0 1 0 56 0 28 12 0 1 0-56 0ZM-15 0a15 5 0 1 0 30 0 15 5 0 1 0-30 0Z"
      />
      <path d="M-34-14q-10 14 0 29 M-17-21q-10 21 0 42 M17-21q10 21 0 42 M34-14q10 14 0 29" />
    </g>
  );
}

function StandingPerson({
  x,
  y,
  scale = 1,
}: {
  x: number;
  y: number;
  scale?: number;
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <circle r="11" />
      <path d="M-7 16h14q14 2 16 19l3 25 M-7 16q-14 2-16 19l-3 25 M-15 34v43h30V34 M-10 77l-3 36 M10 77l3 36" />
    </g>
  );
}

function SeatedPerson({
  x,
  y,
  back = false,
}: {
  x: number;
  y: number;
  back?: boolean;
}) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r="11" />
      <path d="M-7 17q-19 1-20 20v18 M7 17q19 1 20 20v18" />
      {back ? (
        <path d="M-23 33h46v31h-46Z M-18 64v10 M18 64v10" />
      ) : (
        <>
          <path d="M-17 31v29h34V31 M-17 60l-8 16 M17 60l8 16" />
          <path
            className="application-accent"
            d="m-6 18 6 16 6-16 M-4 34h8v9h-8Z"
          />
        </>
      )}
    </g>
  );
}

const applications = [
  {
    scene: 'teaching',
    title: 'University teaching',
    text: 'Give students a physical reference for introductory plasma and magnetic confinement concepts.',
  },
  {
    scene: 'museum',
    title: 'Museums and science centres',
    text: 'Turn unfamiliar science into something visitors can see, question and explore.',
  },
  {
    scene: 'industry',
    title: 'Industry outreach',
    text: 'Give visitors and prospective recruits a focal point for discovering the science behind fusion.',
  },
  {
    scene: 'policy',
    title: 'Policy and fusion events',
    text: 'Bring a tangible scientific reference into conversations about fusion’s potential and challenges.',
  },
] as const;

type Scene = (typeof applications)[number]['scene'];

function ApplicationScene({ scene }: { scene: Scene }) {
  return (
    <svg
      className="application-scene"
      viewBox="18 10 370 178"
      width="370"
      height="178"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {scene === 'teaching' && (
        <>
          <path d="M26 18h159v86H26Z M38 104v16 M173 104v16" />
          <g className="application-accent">
            <ellipse cx="106" cy="60" rx="48" ry="19" />
            <ellipse cx="106" cy="60" rx="29" ry="10" />
            <path d="m66 48 9-1-3 8 M145 73l-9 1 3-8" />
          </g>
          <StandingPerson x={226} y={51} scale={0.9} />
          <path d="m204 81-19-7-24-26 M161 48l-16-13" />
          <PlasmaModel x={316} y={91} />
          <path d="M271 115h90 M280 115v54 M352 115v54" />
          <SeatedPerson x={82} y={112} back />
          <SeatedPerson x={155} y={112} back />
        </>
      )}
      {scene === 'museum' && (
        <>
          {/* The enclosure and plinth indicate an exhibit setting, not product features. */}
          <path d="M193 20h115v94H193Z M193 114h115v64H193Z M204 178h93" />
          <path className="application-accent" d="m201 29 13 13 M201 43l7 7" />
          <PlasmaModel x={250} y={83} scale={0.85} />
          <StandingPerson x={65} y={64} />
          <StandingPerson x={124} y={103} scale={0.65} />
          <path d="m331 119 41 13-12 18-41-13Z M344 145v33 M329 178h30" />
        </>
      )}
      {scene === 'industry' && (
        <>
          <path d="M30 17h64v149H30Z M23 174h78 M39 166v8 M85 166v8" />
          <g className="application-accent">
            <path d="m42 126 9-22 9 8 10-35 12-29 M70 53l12-5 1 13" />
          </g>
          <StandingPerson x={149} y={54} />
          <StandingPerson x={359} y={63} scale={0.9} />
          <path d="m173 91 16 8 17-8 M335 96l-15 8" />
          <path d="m200 124 26-15h91l-26 15H200v49h91v-49 M291 173l26-15v-49" />
          <PlasmaModel x={254} y={87} />
        </>
      )}
      {scene === 'policy' && (
        <>
          <SeatedPerson x={109} y={47} />
          <SeatedPerson x={202} y={31} />
          <SeatedPerson x={295} y={47} />
          <path d="M66 126c0-45 269-45 269 0v17c0 43-269 43-269 0Z M66 126c0 43 269 43 269 0 M89 158v22 M312 158v22" />
          <PlasmaModel x={202} y={101} />
          <path
            className="application-accent"
            d="m101 114 7-10h23l7 10Z M271 114l7-10h23l7 10Z"
          />
          <path d="M368 174V88q0-12-14-17 M351 67l10 6 M355 174h26" />
        </>
      )}
    </svg>
  );
}

export default function ModelApplications({
  descriptions,
}: {
  descriptions?: readonly string[];
}) {
  return (
    <ul className="application-cards" aria-label="Illustrative applications">
      {applications.map((application, index) => (
        <li className="application-card" key={application.scene}>
          <ApplicationScene scene={application.scene} />
          <div className="application-card-copy">
            <h3>{application.title}</h3>
            <p>{descriptions?.[index] ?? application.text}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
