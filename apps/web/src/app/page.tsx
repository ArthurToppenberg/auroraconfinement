import type { Metadata } from 'next';
import Link from 'next/link';
import { pageMetadata } from '@/lib/metadata';
import HeroVisual from '@/components/HeroVisual';
import HeroBenefits from '@/components/HeroBenefits';
import ModelApplications from '@/components/ModelApplications';
import EventFigure from '@/components/EventFigure';
import { homeHero, projectStatus } from '@/content/site';

export const metadata: Metadata = pageMetadata({
  title: 'Aurora Confinement',
  description:
    'Aurora Confinement is developing a tabletop real-plasma model with shaped magnetic fields for introductory teaching, exhibitions and fusion outreach.',
  path: '/',
});

export default function Page() {
  return (
    <>
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

      <section className="section tight field-night home-evidence">
        <div className="shell">
          <h2>
            Fusion needs talent.
            <br />
            And public confidence.
          </h2>
          <p className="evidence-intro">
            Billions are backing fusion’s development. Building its future also
            means introducing students, engaging the public and helping
            decision-makers understand the science.
          </p>
          <div className="evidence-rows">
            <div className="evidence-row">
              <p className="evidence-highlight evidence-number">$14.2bn</p>
              <div className="evidence-copy">
                <h3>
                  Serious investment. A growing need to explain the science.
                </h3>
                <p>
                  The 56 fusion companies surveyed by the Fusion Industry
                  Association in 2026 reported $14.24 billion in cumulative
                  funding. Teaching and outreach can help bring this developing
                  field to more people.
                </p>
                <p className="evidence-source">
                  <a href="https://www.fusionindustryassociation.org/fusion-industry-attracts-record-annual-funding-of-4-48bn-raising-total-to-14-24bn/">
                    Fusion Industry Association, 2026
                  </a>
                </p>
              </div>
            </div>
            <div className="evidence-row">
              <p className="evidence-highlight evidence-number">100,000</p>
              <div className="evidence-copy">
                <h3>A new generation of fusion engineers.</h3>
                <p>
                  An industry estimate cited at Nordic Fusion Forum 2026 puts
                  the need at 100,000 new fusion engineers. Introducing students
                  to plasma and magnetic confinement is a place to start.
                </p>
                <p className="evidence-source">
                  Industry estimate cited by Tobias Petrini, Business Finland,
                  Nordic Fusion Forum 2026.
                </p>
              </div>
            </div>
            <div className="evidence-row">
              <p className="evidence-highlight evidence-number">19%</p>
              <div className="evidence-copy">
                <h3>Public understanding of fusion is low.</h3>
                <p>
                  65% of UK adults had heard of fusion, but just 19% said they
                  knew a fair amount or a lot about it. Educators and outreach
                  teams have an opportunity to make the science more accessible.
                </p>
                <p className="evidence-source">
                  <a href="https://www.gov.uk/government/statistics/desnz-public-attitudes-tracker-spring-2026/desnz-public-attitudes-tracker-energy-infrastructure-and-energy-security-spring-2026-uk">
                    DESNZ Public Attitudes Tracker, UK, spring 2026
                  </a>
                </p>
              </div>
            </div>
            <div className="evidence-row">
              <div>
                <p className="evidence-highlight evidence-number">13 of 72</p>
                <p className="evidence-number-label">
                  on-campus devices identified
                </p>
              </div>
              <div className="evidence-copy">
                <h3>Limited hands on teaching.</h3>
                <p>
                  In our review of European institutions offering fusion or
                  plasma degrees and courses, we identified on-campus
                  magnetic-confinement devices at only 13 of 72 institutions.
                </p>
                <p className="evidence-source">
                  Aurora Confinement desk research, October 2026
                </p>
                <details className="evidence-methodology">
                  <summary>About this research</summary>
                  <p>
                    Of the 72 institutions classified as offering fusion/plasma degrees
                    or courses, 13 had an identified on-campus toroidal or linear
                    magnetic-confinement device, four were classified as
                    partner-lab only, and 35 had no device identified in the
                    reviewed sources.
                  </p>
                  <p>
                    These counts concern identified magnetic-confinement
                    devices, not all plasma teaching equipment, and do not
                    establish student access or teaching use.
                  </p>
                </details>
              </div>
            </div>
          </div>
          <div className="evidence-invitation">
            <h3>Bring the science into the room.</h3>
            <p>
              We’re developing a tabletop real-plasma model with shaped magnetic
              fields to help universities introduce confinement concepts and
              give museums, fusion organisations and policy events a focal point
              for explaining the science.
            </p>
            <Link className="button primary" href={homeHero.primaryHref}>
              {homeHero.primaryLabel}
            </Link>
            <p className="evidence-source">
              Tell us how your institution would use the model. Registration is
              non-binding.
            </p>
          </div>
        </div>
      </section>

      <section className="section field-ice">
        <div className="shell">
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

      <section className="section field-night">
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
                  <strong>120</strong>
                  <span>registrations within 48 hours</span>
                </li>
                <li>
                  <strong>+20</strong>
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

      <section className="section tight field-deep">
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
            caption="Aurora Confinement team at Nordic Fusion Forum 2026, Copenhagen."
          />
        </div>
      </section>

      <section className="home-closing chapter field-magenta">
        <div className="shell home-closing-inner">
          <div>
            <h2>Bring plasma to your institution.</h2>
            <p>Registering interest is completely free + non-binding, and helps us validate demand for softfunding, to get started building.</p>
          </div>
          <Link className="button primary" href={homeHero.primaryHref}>
            {homeHero.primaryLabel}
          </Link>
        </div>
      </section>
    </>
  );
}
