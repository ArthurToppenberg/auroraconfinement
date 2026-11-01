import type { Metadata } from 'next';
import Link from 'next/link';
import { pageMetadata } from '@/lib/metadata';
import PageHero from '@/components/PageHero';
import { contactHrefs, projectStatus } from '@/content/site';

export const metadata: Metadata = pageMetadata({
  title: 'Roadmap',
  description:
    'Planned development timeline for Aurora Confinement: the exhibition stellarator model from January to August 2027, and a container-sized research platform from around March 2027 to August 2028.',
  path: '/roadmap/',
});

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
] as const;

export default function Page() {
  return (
    <>
      <PageHero
        field="ice"
        title="The road ahead."
        intro="Two development tracks between January 2027 and August 2028. Dates are current plans, not guarantees."
      />

      <section className="section field-night" id="timeline">
        <div className="shell">
          <div className="section-heading">
            <h2>Two tracks, side by side.</h2>
            <p>
              The exhibition model starts first. Work on the research platform
              begins while the model is still in development, so the two run
              side by side from around March to August 2027.
            </p>
          </div>

          {/* Decorative: the stage list below carries the same dates in text. */}
          <div className="gantt" aria-hidden="true">
            <div className="gantt-year y27">2027</div>
            <div className="gantt-year y28">2028</div>
            {months.map((month, index) => (
              <div
                key={index}
                className={`gantt-month ${index < 12 ? 'y27' : 'y28'}`}
              >
                {month}
              </div>
            ))}
            <div className="gantt-bar exhibition">
              <strong>Exhibition model</strong>
              <span>1 Jan – 1 Aug 2027</span>
            </div>
            <div className="gantt-bar research">
              <strong>Research platform</strong>
              <span>Around 1 Mar 2027 – 1 Aug 2028</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section field-ice" id="stages">
        <div className="shell">
          <ol className="stage-list">
            <li className="stage">
              <p className="stage-when">
                1&nbsp;January – 1&nbsp;August&nbsp;2027
              </p>
              <div className="stage-body">
                <h2>Exhibition model development.</h2>
                <p>
                  Developing the first exhibition stellarator model, intended
                  for fusion conferences and exhibitions, science centres and
                  museums, public engagement, and introductory teaching.
                </p>
                <p className="stage-note">
                  <span className="status-label">Planned</span>
                  The model is in development and is not available to order.
                </p>
              </div>
            </li>
            <li className="stage">
              <p className="stage-when">
                Around 1&nbsp;March&nbsp;2027 – 1&nbsp;August&nbsp;2028
              </p>
              <div className="stage-body">
                <h2>A container-sized research platform.</h2>
                <p>
                  Exploring an experimental stellarator system at roughly
                  container scale, intended to widen practical access to
                  stellarator research for universities, startups, and other
                  R&amp;D organisations.
                </p>
                <p className="stage-note">
                  <span className="status-label">Exploring</span>
                  Early-stage. Scope and timing are not fixed.
                </p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      <section className="section tight field-cyan">
        <div className="shell callout">
          <h2>Follow the build.</h2>
          <p>
            {projectStatus} Dates describe current intentions and may change. No
            completed product, customer relationship, funding, or institutional
            partnership is claimed.
          </p>
          <Link className="button primary" href={contactHrefs.generalEnquiry}>
            Talk with the team
          </Link>
        </div>
      </section>
    </>
  );
}
