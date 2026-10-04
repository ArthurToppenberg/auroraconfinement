import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/metadata';
import PageHero from '@/components/PageHero';
import { projectStatus } from '@/content/site';

export const metadata: Metadata = pageMetadata({
  title: 'About',
  description:
    'Aurora Confinement is a 13-person student-led DTU initiative developing physical tools for stellarator research, communication, and teaching.',
  path: '/about/',
});

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="A multidisciplinary team focused on access."
        intro="Aurora Confinement is a team of 13 DTU students working to make stellarator technology more accessible for communication, education, and experimental research."
      />

      <section className="section">
        <div className="shell split-section">
          <div>
            <p className="eyebrow">Mission</p>
            <h2>Lower the barrier to practical engagement.</h2>
          </div>
          <div className="split-copy">
            <p>
              Hands-on stellarator research can require substantial capital,
              specialist infrastructure, and engineering resources. Aurora
              Confinement is developing compact experimental platforms intended
              to reduce those barriers.
            </p>
            <p>
              Alongside this research direction, the team is developing tabletop
              models for exhibition and communication, with introductory
              teaching as an additional application.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-heading">
            <div>
              <p className="eyebrow">The team</p>
              <h2>Multidisciplinary by necessity.</h2>
            </div>
            <p>
              The team spans physics, mechanical and electrical engineering,
              product development, operations, and communication. Individual
              profiles will be published only when permissions and details are
              confirmed.
            </p>
          </div>
          <div className="fact-strip">
            <div>
              <strong>13 students</strong>
              <span>Multidisciplinary team</span>
            </div>
            <div>
              <strong>DTU students</strong>
              <span>No institutional endorsement implied</span>
            </div>
            <div>
              <strong>Two product directions</strong>
              <span>Research and communication</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section tight">
        <div className="shell callout">
          <p className="eyebrow">Current stage</p>
          <h2>Early-stage and actively developing.</h2>
          <p>
            {projectStatus} Both product directions are current priorities at
            different levels of technical maturity. No completed product,
            customer relationship, formal institutional partnership, or
            regulatory approval is claimed.
          </p>
          <a className="button primary" href="/contact">
            Talk with the team
          </a>
        </div>
      </section>
    </>
  );
}
