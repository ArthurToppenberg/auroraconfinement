import type { Metadata } from 'next';
import Link from 'next/link';
import { pageMetadata } from '@/lib/metadata';
import HeroVisual from '@/components/HeroVisual';
import InterestDisclaimer from '@/components/InterestDisclaimer';
import EventFigure from '@/components/EventFigure';
import TeamGrid from '@/components/TeamGrid';
import { contactHrefs, homeHero, projectStatus } from '@/content/site';
import VoiceField from '@/components/VoiceField';
import { placeholder, voices } from '@/content/voices';

export const metadata: Metadata = pageMetadata({
  title: 'Aurora Confinement',
  description:
    'Aurora Confinement is developing compact experimental stellarator platforms for more accessible hands-on research, together with exhibition stellarator models for communication and teaching.',
  path: '/',
});

export default function Page() {
  return (
    <>
      <section className="home-hero chapter field-cyan">
        <HeroVisual />
        <div className="shell home-hero-grid">
          <h1 className="hero-name">
            <span className="line">
              <span>Aurora</span>
            </span>
            <span className="line">
              <span>Confinement</span>
            </span>
          </h1>
          <div className="hero-copy">
            <p className="lede">{homeHero.headline}</p>
            <p className="hero-supporting">{homeHero.supporting}</p>
            <div className="button-row">
              <Link className="button primary" href={homeHero.primaryHref}>
                {homeHero.primaryLabel}
              </Link>
            </div>
            <InterestDisclaimer />
          </div>
        </div>
      </section>

      <section className="section tight voices field-ice" id="voices">
        <div className="shell">
          <VoiceField voices={voices} placeholder={placeholder} />
        </div>
      </section>

      <section className="section tight field-night">
        <div className="shell">
          <div className="section-heading">
            <h2>Fusion is known, but not understood.</h2>
            <p>
              Awareness of fusion is broader than understanding. Physical,
              visible tools can help close that gap, without claiming to replace
              credible regulation, safety, and performance.
            </p>
          </div>
          <ul className="stat-row" aria-label="Public understanding of fusion">
            <li>
              <strong>65%</strong>
              <span>had heard of fusion</span>
            </li>
            <li>
              <strong>19%</strong>
              <span>knew a fair amount or a lot</span>
            </li>
            <li>
              <strong>5%</strong>
              <span>said they knew a lot</span>
            </li>
          </ul>
          <p className="status-copy">
            Representative UK government survey of about 3,400 people, spring
            2026:{' '}
            <a
              href="https://www.gov.uk/government/statistics/desnz-public-attitudes-tracker-spring-2026/desnz-public-attitudes-tracker-energy-infrastructure-and-energy-security-spring-2026-uk"
              rel="noopener noreferrer"
            >
              DESNZ Public Attitudes Tracker
            </a>
            .
          </p>
        </div>
      </section>

      <section className="section home-barrier field-ice">
        <div className="shell barrier-layout">
          <div className="barrier-copy">
            <h2>Hands-on research is resource-heavy.</h2>
            <ul className="barrier-list">
              <li>
                <h3>High capital cost</h3>
                <p>Heavy financial investment limits entry.</p>
              </li>
              <li>
                <h3>Specialist infrastructure</h3>
                <p>Demands complex, specialized facilities.</p>
              </li>
              <li>
                <h3>Restricted access</h3>
                <p>Limits hands-on research to a few large institutions.</p>
              </li>
            </ul>
            <p className="barrier-bridge">
              Aurora Confinement is developing compact platforms and physical
              models intended to lower these barriers.
            </p>
          </div>
          <EventFigure
            name="nff-team"
            height={781}
            sizes="(min-width: 52rem) 46vw, 100vw"
            alt="Aurora Confinement members wearing Nordic Fusion Forum 2026 lanyards, standing together in front of the event screen."
            caption="Aurora Confinement at Nordic Fusion Forum 2026, Copenhagen."
          />
        </div>
      </section>

      <section className="section field-night">
        <div className="shell">
          <div className="section-heading">
            <h2>A fusion lecture that sold out in 48 hours.</h2>
          </div>
          <div className="proof-grid">
            <EventFigure
              name="lecture-hall"
              height={1200}
              sizes="(min-width: 64rem) 56vw, 100vw"
              alt="A full university auditorium during a fusion lunch lecture, with a presentation slide visible on the screens."
              caption="Fusion lunch lecture at DTU, organised and promoted by Aurora Confinement."
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
                <li>
                  <strong>5</strong>
                  <span>
                    non-binding expressions of interest around Nordic Fusion
                    Forum 2026
                  </span>
                </li>
              </ul>
              <p>
                The turnout shows interest in fusion education. Expressions of
                interest are not letters of intent, orders, customers, or
                commitments.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section field-deep">
        <div className="shell">
          <div className="section-heading">
            <h2>A multidisciplinary student team.</h2>
            <p>
              {projectStatus} No DTU or KU endorsement or institutional
              partnership is implied.
            </p>
          </div>
          <TeamGrid label="Team" showRoles={false} />
          <a className="button cta-button team-cta" href="/about/">
            Meet the team
          </a>
        </div>
      </section>

      <section className="section field-magenta">
        <div className="shell callout">
          <h2>Where could a stellarator tool help?</h2>
          <p>
            We welcome non-binding conversations with research institutions,
            universities, fusion companies, collaborators, and strategic
            partners.
          </p>
          <Link className="button primary" href={contactHrefs.generalEnquiry}>
            Start a conversation
          </Link>
        </div>
      </section>
    </>
  );
}
