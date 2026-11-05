import type { Metadata } from 'next';
import Link from 'next/link';
import { pageMetadata } from '@/lib/metadata';
import HeroVisual from '@/components/HeroVisual';
import FusionVision from '@/components/FusionVision';
import HeroBenefits from '@/components/HeroBenefits';
import ModelApplications from '@/components/ModelApplications';
import EventFigure from '@/components/EventFigure';
import CountUp from '@/components/CountUp';
import { homeHero, projectStatus, universityResearch } from '@/content/site';
import AnimatedNumbers from '@/components/AnimatedNumbers';

export const metadata: Metadata = pageMetadata({
  title: 'Aurora Confinement',
  description:
    'Aurora Confinement is developing a tabletop real-plasma model with shaped magnetic fields for introductory teaching, exhibitions and fusion outreach.',
  path: '/',
});

export default function Page() {
  return (
    <div className="home-page">
      <section className="home-hero chapter field-cyan">
        <div className="shell home-hero-grid">
          <div className="hero-copy">
            <h1 className="hero-benefit-title">
              {homeHero.headline.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </h1>
            <p className="hero-supporting">{homeHero.supporting}</p>
            <HeroBenefits />
            <div className="hero-enquiry">
              <Link className="button primary" href={homeHero.primaryHref}>
                {homeHero.primaryLabel}
              </Link>
              <p>{homeHero.invitation}</p>
              <p className="hero-privacy">
                How we handle your data:{' '}
                <Link href="/privacy">Privacy Notice</Link>.
              </p>
            </div>
          </div>
          <HeroVisual />
        </div>
      </section>

      <section
        className="section field-night team-motivation home-fusion-vision"
        aria-labelledby="home-vision-heading"
      >
        <div className="shell">
          <div className="home-vision-intro">
            <h2 id="home-vision-heading">The future we want to help build.</h2>
            <p>
              We’re students. We want a future to look forward to - and we’re
              ready to work for it.
            </p>
          </div>
          <FusionVision compact />
          <div className="home-vision-support">
            <div className="home-vision-sdg-group">
              <div className="home-sdg-teaser">
                <ul aria-label="Sustainable Development Goals">
                  {[4, 7, 9, 13].map((goal) => (
                    <li key={goal}>
                      <a
                        href={`https://sdgs.un.org/goals/goal${goal}`}
                        aria-label={`United Nations Sustainable Development Goal ${goal}`}
                      >
                        <img
                          src={`/images/sdg/goal-${String(goal).padStart(2, '0')}.jpg`}
                          width="44"
                          height="44"
                          alt=""
                          loading="lazy"
                          decoding="async"
                        />
                      </a>
                    </li>
                  ))}
                </ul>
                <Link href="/about/#team-motivation">
                  Our motivation and goals
                </Link>
              </div>
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
        </div>
      </section>

      <section
        className="section tight field-ice home-model-bridge"
        aria-labelledby="model-bridge-heading"
      >
        <div className="shell">
          <div className="home-model-bridge-copy">
            <h2 id="model-bridge-heading">
              That future starts with people who understand the science.
            </h2>
            <p>
              Our real-plasma model gives educators and organisations a tangible
              way to introduce plasma, explain magnetic confinement and start
              conversations about fusion.
            </p>
          </div>
          <dl className="home-evidence-strip">
            <div>
              <dt>
                <CountUp as="span" value={100000} grouped />
              </dt>
              <dd>
                New fusion engineers needed, according to an industry estimate
                cited by Tobias Petrini, Business Finland, at Nordic Fusion
                Forum 2026.
              </dd>
            </div>
            <div>
              <dt>
                <CountUp as="span" value={19} suffix="%" />
              </dt>
              <dd>
                Of UK adults said they knew a fair amount or a lot about fusion.
              </dd>
              <dd className="home-evidence-source">
                <a href="https://www.gov.uk/government/statistics/desnz-public-attitudes-tracker-spring-2026/desnz-public-attitudes-tracker-energy-infrastructure-and-energy-security-spring-2026-uk">
                  DESNZ Public Attitudes Tracker, spring 2026
                </a>
              </dd>
            </div>
            <div>
              <dt>
                <AnimatedNumbers text={universityResearch.metric} />
              </dt>
              <dd>{universityResearch.description}</dd>
              <dd className="home-evidence-source">
                {universityResearch.attribution}
              </dd>
              <dd>
                <details className="home-evidence-methodology">
                  <summary>{universityResearch.summary}</summary>
                  {universityResearch.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </details>
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="section field-ice home-applications">
        <div className="shell">
          <hr className="home-applications-divider" />
          <div className="section-heading">
            <h2>Where could you use the model?</h2>
            <p>
              Bring real plasma into teaching, exhibitions and conversations
              about fusion.
            </p>
          </div>
          <ModelApplications />
          <p className="application-development-note">
            Applications shown are illustrative. The model is in development.
          </p>
          <div className="applications-cta">
            <Link className="button primary" href={homeHero.primaryHref}>
              {homeHero.primaryLabel}
            </Link>
            <p>Tell us where your institution would use the model.</p>
          </div>
        </div>
      </section>

      <section className="section field-night home-outreach">
        <div className="shell">
          <div className="section-heading">
            <h2>Fusion outreach: a full lecture in 48 hours.</h2>
          </div>
          <div className="proof-grid">
            <EventFigure
              name="packed-lecture"
              height={1200}
              sizes="(min-width: 64rem) 56vw, 100vw"
              alt="A full university auditorium during a fusion lunch lecture, with a presentation slide visible on the screens."
              caption="Fusion lunch lecture in collaboration with the Technical University of Denmark and Novatron Fusion Group AB, organised and promoted by Aurora Confinement."
            />
            <div className="proof-copy">
              <ul className="stat-row stat-column">
                <li>
                  <CountUp value={120} />
                  <span>registrations within 48 hours</span>
                </li>
                <li>
                  <CountUp value={20} prefix="+" />
                  <span>more on the waiting list</span>
                </li>
              </ul>
              <p>
                This lecture reflects the team’s outreach activity and audience
                interest in fusion education. It is not evidence of
                institutional purchase demand or the model’s performance.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section tight field-deep home-team">
        <div className="shell split-section">
          <div className="split-copy">
            <h2>A multidisciplinary student team.</h2>
            <p>
              {projectStatus} No university endorsement or institutional
              partnership is implied.
            </p>
            <a className="button cta-button team-cta" href="/about/">
              Meet the team
            </a>
          </div>
          <EventFigure
            name="nff-team-2"
            height={1200}
            sizes="(min-width: 52rem) 46vw, 100vw"
            alt="Five Aurora Confinement team members standing together in front of the Nordic Fusion Forum 2026 event screen."
            caption={
              <>
                Aurora Confinement team at{' '}
                <a href="https://nordic-fusion-forum-2026.confetti.events/#speakers--1498456">
                  Nordic Fusion Forum 2026
                </a>
                , Copenhagen.
              </>
            }
          />
        </div>
      </section>

      <section className="home-closing chapter field-magenta">
        <div className="shell home-closing-inner">
          <div>
            <h2>Bring plasma to your institution.</h2>
            <p>
              Registering interest is completely free + non-binding, and helps
              us validate demand for softfunding, to get started building.
            </p>
          </div>
          <Link className="button primary" href={homeHero.primaryHref}>
            {homeHero.primaryLabel}
          </Link>
        </div>
      </section>
    </div>
  );
}
