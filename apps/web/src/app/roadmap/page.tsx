import type { Metadata } from 'next';
import Link from 'next/link';
import { pageMetadata } from '@/lib/metadata';
import { homeHero } from '@/content/site';

export const metadata: Metadata = pageMetadata({
  title: 'Roadmap',
  description:
    'Exhibition model calendar targets for January–June 2027 and a longer-term research programme measured from a separately funded project start.',
  path: '/roadmap/',
});

interface Phase {
  timing: string;
  title: string;
  actions: readonly string[];
  outcome: string;
  checkpoint?: boolean;
}

const exhibitionPhases: readonly Phase[] = [
  {
    timing: 'January–February 2027',
    title: 'Define and test',
    actions: [
      'Clarify institutional requirements, suppliers and preliminary design.',
      'Build a linear test unit.',
      'Test the RF plasma source, vacuum system and argon operating pressure.',
    ],
    outcome: 'A tested basis for the torus design.',
  },
  {
    timing: 'March–April 2027',
    title: 'Build and integrate',
    actions: [
      'Finalise magnet holders and compare measured fields with simulations.',
      'Order the custom glass torus.',
      'Integrate the torus, vacuum, RF source, magnets and enclosure.',
    ],
    outcome: 'First controlled tests of the integrated prototype.',
  },
  {
    timing: 'May–June 2027',
    title: 'Validate and demonstrate',
    actions: [
      'Test repeatable operation, heat and transport.',
      'Complete a safety review and operating procedure.',
      'Aim for up to three demonstrations, subject to readiness and safety.',
    ],
    outcome: 'User feedback and a decision on readiness for a paid pilot.',
    checkpoint: true,
  },
];

const researchPhases: readonly Phase[] = [
  {
    timing: 'Months 1–3',
    title: 'Design and requirements',
    actions: [
      'Define the experimental requirements and simulation baseline.',
      'Develop chamber, magnetic-system and support CAD.',
      'Advance the bill of materials, procurement plan and safety review.',
    ],
    outcome: 'A defined engineering baseline.',
  },
  {
    timing: 'Months 4–7',
    title: 'Core hardware assembly',
    actions: [
      'Procure and assemble vacuum infrastructure.',
      'Assemble magnetic components, supports and cooling.',
      'Establish data acquisition.',
    ],
    outcome: 'An assembled system ready for subsystem testing.',
  },
  {
    timing: 'Months 8–9',
    title: 'Subsystem validation',
    actions: [
      'Test vacuum integrity and operating pressure.',
      'Map magnetic fields with Hall probes.',
      'Compare measurements with simulations and resolve discrepancies.',
    ],
    outcome: 'Validate the subsystems before progressing to plasma operation.',
    checkpoint: true,
  },
  {
    timing: 'Months 10–11',
    title: 'Plasma-system integration',
    actions: [
      'Integrate controlled gas handling.',
      'Install plasma heating and initial diagnostics.',
      'Prepare operating procedures and controlled commissioning.',
    ],
    outcome: 'An integrated setup ready for first-plasma attempts.',
  },
  {
    timing: 'Months 12–18+',
    title: 'First plasma and characterisation',
    actions: [
      'Attempt first plasma and establish repeatable operation.',
      'Measure plasma behaviour and compare results with the design.',
      'Refine the magnetic configuration and evaluate research applications.',
    ],
    outcome:
      'Measured performance to guide further development and partner evaluation.',
  },
];

function Milestones({
  phases,
  horizontal = false,
}: {
  phases: readonly Phase[];
  horizontal?: boolean;
}) {
  return (
    <ol
      className={`roadmap-milestones${horizontal ? ' roadmap-milestones-wide' : ''}`}
    >
      {phases.map((phase, index) => (
        <li
          className={`roadmap-milestone${phase.checkpoint ? ' roadmap-checkpoint' : ''}`}
          key={phase.title}
        >
          <div className="roadmap-phase-meta">
            <span className="roadmap-phase-number">Phase {index + 1}</span>
            <p>{phase.timing}</p>
          </div>
          <div className="roadmap-phase-body">
            <h3>{phase.title}</h3>
            <ul>
              {phase.actions.map((action) => (
                <li key={action}>{action}</li>
              ))}
            </ul>
            <p className="roadmap-outcome">
              <strong>
                {phase.checkpoint ? 'Decision checkpoint' : 'Target outcome'}
              </strong>
              {phase.outcome}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}

export default function Page() {
  return (
    <div className="roadmap-page">
      <section className="roadmap-intro chapter field-ice">
        <div className="shell">
          <h1>
            From simulation to demonstration.
            <br />
            Then toward research.
          </h1>
          <p className="roadmap-intro-copy">
            Our immediate focus is a real-plasma exhibition and teaching model.
            A future research platform builds on that experience through a
            separately funded development programme.
          </p>
          <div className="roadmap-current-work">
            <h2>Current work</h2>
            <ul>
              <li>Magnetic-field simulations</li>
              <li>Virtual models</li>
              <li>Institutional requirements</li>
              <li>Funding applications</li>
            </ul>
          </div>
        </div>
      </section>

      <section
        className="section field-ice roadmap-track"
        aria-labelledby="exhibition-track-heading"
      >
        <div className="shell">
          <header className="roadmap-track-heading">
            <p className="roadmap-track-status">
              Planned · Near-term development
            </p>
            <h2 id="exhibition-track-heading">Exhibition model</h2>
            <p>
              A real-plasma model for introductory teaching, exhibitions and
              outreach.
            </p>
            <p className="roadmap-time-scale">
              <strong>Calendar targets</strong>Planned prototype programme:
              January–June 2027
            </p>
          </header>
          <Milestones phases={exhibitionPhases} horizontal />
          <div className="roadmap-continuation">
            <p className="roadmap-phase-number">Conditional continuation</p>
            <p>From H2 2027, subject to validation</p>
            <h3>First pilots and customers</h3>
            <ul>
              <li>Work toward paid institutional pilots and initial sales.</li>
              <li>
                Confirm pricing, delivery, training and support requirements.
              </li>
              <li>Refine the model using customer feedback.</li>
            </ul>
            <p className="roadmap-outcome">
              <strong>Decision checkpoint</strong>Proceed when performance,
              safety, customer requirements and delivery economics support it.
            </p>
          </div>
          <p className="roadmap-future">
            <strong>Small-series improvement · 2028–2029</strong>A possible next
            step, subject to validation and resources.
          </p>
          <p className="roadmap-note">
            Dates are targets and depend on funding, supplier lead times and
            test results.
          </p>
          <details className="roadmap-technical">
            <summary>Prototype approach</summary>
            <p>
              The prototype uses a vacuum system and controlled argon supply. A
              hermetically sealed torus is a later option to investigate, not a
              prerequisite or completed feature.
            </p>
          </details>
        </div>
      </section>

      <section
        className="section field-deep roadmap-track"
        aria-labelledby="research-track-heading"
      >
        <div className="shell">
          <header className="roadmap-track-heading">
            <p className="roadmap-track-status">
              Long-term · Separately funded programme
            </p>
            <h2 id="research-track-heading">Research platform</h2>
            <p>
              A staged programme toward a configurable experimental plasma
              platform.
            </p>
            <p className="roadmap-time-scale">
              <strong>Relative project months</strong>Indicative duration:
              12–18+ months from a separately funded project start.
            </p>
            <p>
              Requires a research use case, partner requirements, dedicated
              funding and engineering resources.
            </p>
          </header>
          <Milestones phases={researchPhases} />
          <p className="roadmap-note">
            Scoping may begin from 2028 if resources permit. No calendar start
            or delivery date is established; all outcomes shown are development
            targets.
          </p>
        </div>
      </section>

      <section className="section tight field-ice roadmap-bridge">
        <div className="shell">
          <h2>How the tracks connect.</h2>
          <p>
            Experience from the exhibition model can inform vacuum systems, RF
            integration, magnetic-field measurement, controls and safe
            operation. Research capability requires additional engineering and
            separate validation.
          </p>
        </div>
      </section>

      <section className="home-closing chapter field-magenta">
        <div className="shell home-closing-inner">
          <div>
            <h2>Help shape the exhibition model.</h2>
            <p>
              Tell us how your institution would use it and what you would need.
            </p>
          </div>
          <div className="roadmap-closing-links">
            <Link className="button primary" href={homeHero.primaryHref}>
              Register interest
            </Link>
            <Link href="/research-platform/">
              Explore the research platform
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
