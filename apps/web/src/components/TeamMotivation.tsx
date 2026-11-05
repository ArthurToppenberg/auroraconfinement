import type { ReactNode } from 'react';
import FusionVision from '@/components/FusionVision';

const goals = [
  {
    number: 4,
    icon: '04',
    name: 'Quality Education',
    connection: 'Physical tools for plasma teaching and science engagement.',
  },
  {
    number: 7,
    icon: '07',
    name: 'Affordable and Clean Energy',
    connection: 'Building knowledge and capabilities for future fusion energy.',
  },
  {
    number: 9,
    icon: '09',
    name: 'Industry, Innovation and Infrastructure',
    connection:
      'Engineering experience through simulation, prototyping and validation.',
  },
  {
    number: 13,
    icon: '13',
    name: 'Climate Action',
    connection: 'Connecting education and outreach to a changing climate.',
  },
] as const;

export default function TeamMotivation({ children }: { children?: ReactNode }) {
  return (
    <>
      <section
        className="section field-night team-motivation"
        id="team-motivation"
        aria-labelledby="team-motivation-heading"
      >
        <div className="shell">
          <div className="team-motivation-statement">
            <h2 id="team-motivation-heading">
              The future we want to help build.
            </h2>
            <p className="team-motivation-lead">
              We’re students. We want a future to look forward to - and we’re
              ready to work for it.
            </p>
          </div>
          <FusionVision />
          <div className="team-sdg-alignment">
            <h3>The goals guiding our work.</h3>
            <p className="team-sdg-context">
              Areas of alignment and intended contribution to the Sustainable
              Development Goals.
            </p>
            <ul className="team-sdg-grid">
              {goals.map((goal) => (
                <li key={goal.number}>
                  <a href={`https://sdgs.un.org/goals/goal${goal.number}`}>
                    <img
                      src={`/images/sdg/goal-${goal.icon}.jpg`}
                      width="112"
                      height="112"
                      alt=""
                      loading="lazy"
                      decoding="async"
                    />
                    <h4>
                      SDG {goal.number} — {goal.name}
                    </h4>
                  </a>
                  <p>{goal.connection}</p>
                </li>
              ))}
            </ul>
            <details className="sdg-attribution">
              <summary>SDG icon attribution</summary>
              <p>
                Official icons:{' '}
                <a href="https://www.un.org/sustainabledevelopment">
                  United Nations Sustainable Development Goals
                </a>
                .{' '}
                <a href="https://www.un.org/sustainabledevelopment/wp-content/uploads/2023/09/E_SDG_Guidelines_Sep20238.pdf">
                  SDG asset-use guidelines
                </a>
                .
              </p>
              <p>
                The content of this publication has not been approved by the
                United Nations and does not reflect the views of the United
                Nations or its officials or Member States.
              </p>
            </details>
          </div>
        </div>
      </section>
      {children && (
        <section className="home-closing chapter field-magenta team-motivation-invitation">
          <div className="shell">{children}</div>
        </section>
      )}
    </>
  );
}
