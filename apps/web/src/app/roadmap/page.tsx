import type { Metadata } from 'next';
import Link from 'next/link';
import { pageMetadata } from '@/lib/metadata';
import { contactHrefs, homeHero } from '@/content/site';
import RoadmapScene from '@/components/RoadmapScene';
import RoadmapMotion from '@/components/RoadmapMotion';

export const metadata: Metadata = pageMetadata({
  title: 'Roadmap',
  description:
    'Two development tracks: exhibition-model prototype targets for January–June 2027 and an indicative, separately funded research-platform programme.',
  path: '/roadmap/',
});

const phases = [
  {
    number: 1,
    name: 'Define',
    exhibition: {
      timing: 'January–February 2027',
      title: 'Design and subsystem testing',
      description:
        'Confirm institutional requirements. Build a linear test unit and investigate RF, vacuum and argon operating conditions.',
    },
    research: {
      timing: 'Months 1–3',
      title: 'Requirements and engineering baseline',
      description:
        'Define the research use case, simulation baseline, CAD, bill of materials and safety requirements.',
    },
  },
  {
    number: 2,
    name: 'Build',
    exhibition: {
      timing: 'March–April 2027',
      title: 'Integrate the prototype',
      description:
        'Compare magnetic-field measurements with simulations. Assemble the torus, vacuum system, RF source, magnets and enclosure.',
    },
    research: {
      timing: 'Months 4–7',
      title: 'Assemble core hardware',
      description:
        'Integrate vacuum infrastructure, magnetic systems, cooling and initial data acquisition.',
    },
  },
  {
    number: 3,
    name: 'Validate',
    exhibition: {
      timing: 'May–June 2027',
      title: 'Test and demonstrate',
      description:
        'Test repeatable operation, transport and safety. Aim for up to three demonstrations, subject to readiness.',
    },
    research: {
      timing: 'Months 8–11',
      title: 'Validate systems and prepare plasma',
      description:
        'Leak-test the vacuum system, map magnetic fields and compare with simulations. Integrate gas handling, heating and diagnostics.',
      checkpoint: 'Subsystem validation before plasma commissioning.',
    },
  },
  {
    number: 4,
    name: 'Develop further',
    exhibition: {
      timing: 'From H2 2027, subject to validation',
      title: 'First pilots and customers',
      description:
        'Work toward paid institutional trials, refine delivery and support, and assess readiness for small-series production.',
    },
    research: {
      timing: 'Months 12–18+',
      title: 'First plasma and characterisation',
      description:
        'Attempt first plasma, measure performance and refine the configuration with research partners.',
      checkpoint: 'Target: first plasma',
    },
  },
] as const;

export default function Page() {
  return (
    <div className="roadmap-page field-ice">
      <header className="roadmap-intro shell">
        <h1>Two tracks. One direction.</h1>
        <p>
          Developing tangible tools for plasma education and experimental
          research.
        </p>
        <p className="roadmap-current">
          Current work: simulations, virtual models, institutional requirements
          and funding.
        </p>
      </header>
      <section
        className="roadmap-programme shell"
        aria-label="Development tracks and target milestones"
      >
        <RoadmapMotion>
          <div className="roadmap-track-headers">
            <span className="roadmap-phase-column" aria-hidden="true">
              Phase
            </span>
            <header>
              <h2>Exhibition model</h2>
              <p>Planned prototype programme: January–June 2027</p>
            </header>
            <header>
              <h2>Research platform</h2>
              <p>
                Indicative 12–18+ months from a separately funded project start
              </p>
            </header>
          </div>
          <p className="roadmap-timing-note">
            Aligned by development phase, not simultaneous calendar dates.
          </p>
          <ol className="roadmap-phase-list">
            {phases.map((phase) => (
              <li className="roadmap-phase-row" key={phase.number}>
                <h3 className="roadmap-phase-label">
                  <span>Phase {phase.number}</span>
                  {phase.name}
                </h3>
                {(['exhibition', 'research'] as const).map((track) => {
                  const milestone = phase[track];
                  return (
                    <article
                      className={`roadmap-step roadmap-step-${track}`}
                      key={track}
                    >
                      <RoadmapScene track={track} phase={phase.number} />
                      <div className="roadmap-step-copy">
                        <p className="roadmap-mobile-track">
                          {track === 'exhibition'
                            ? 'Exhibition model'
                            : 'Research platform'}
                        </p>
                        <p className="roadmap-step-timing">
                          {milestone.timing}
                        </p>
                        <h4>{milestone.title}</h4>
                        <p>{milestone.description}</p>
                        {'checkpoint' in milestone && (
                          <p className="roadmap-step-checkpoint">
                            {milestone.checkpoint}
                          </p>
                        )}
                      </div>
                    </article>
                  );
                })}
              </li>
            ))}
          </ol>
          <div className="roadmap-track-actions">
            <Link href={homeHero.primaryHref}>
              Register exhibition interest <span aria-hidden="true">↗</span>
            </Link>
            <Link href={contactHrefs.collaboration}>
              Discuss research or investment <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </RoadmapMotion>
        <p className="roadmap-final-note">
          Milestones are indicative and depend on funding, partners, supplier
          lead times and test results. Research-platform development requires a
          separate programme and budget.
        </p>
      </section>
    </div>
  );
}
