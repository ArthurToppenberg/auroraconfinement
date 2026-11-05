import InterestDisclaimer from '@/components/InterestDisclaimer';
import type { Metadata } from 'next';
import Link from 'next/link';
import { pageMetadata } from '@/lib/metadata';
import TeamGrid from '@/components/TeamGrid';
import EventFigure from '@/components/EventFigure';
import CommunityPosts from '@/components/CommunityPosts';
import TeamMotivation from '@/components/TeamMotivation';
import { homeHero } from '@/content/site';

export const metadata: Metadata = pageMetadata({
  title: 'Team',
  description:
    'Meet the physics and engineering students behind Aurora Confinement, working together to make plasma and fusion tangible.',
  path: '/about/',
});

export default function Page() {
  return (
    <div className="team-page">
      <section className="team-introduction chapter field-ice">
        <div className="shell">
          <h1>Meet the team</h1>
          <p>
            Physics and engineering students from DTU and the University of
            Copenhagen, working together to make plasma and fusion tangible.
          </p>
        </div>
      </section>

      <section
        className="section field-ice team-section"
        id="team"
        aria-labelledby="team-members-heading"
      >
        <div className="shell">
          <h2 className="sr-only" id="team-members-heading">
            Team members
          </h2>
          <TeamGrid label="Team" />
        </div>
      </section>

      <section className="section field-ice">
        <div className="shell">
          <div className="section-heading">
            <h2>What the team has done so far:</h2>
            <p>
              Developing the concept, bringing people together and learning from
              the fusion community.
            </p>
          </div>
          <div className="event-pair">
            <article className="event-item">
              <EventFigure
                name="lecture-hall"
                height={1200}
                sizes="(min-width: 52rem) 46vw, 100vw"
                alt="A full university auditorium during a fusion lunch lecture, with a presentation slide visible on the screens."
                caption="Fusion lunch lecture at Technical University of Denmark, organised and promoted by Aurora Confinement."
              />
              <h3>120 registrations in 48 hours.</h3>
              <p>
                Aurora Confinement organised and promoted a fusion lunch lecture
                at <a href="https://www.dtu.dk/">DTU</a> with Søren Bang
                Korsholm and{' '}
                <a href="https://www.novatronfusion.com/">Novatron</a>. The
                event attracted 120 registrations within 48 hours, with another
                20 people joining the waiting list.
              </p>
            </article>
            <article className="event-item">
              <EventFigure
                name="nff-team-2"
                height={1200}
                sizes="(min-width: 52rem) 46vw, 100vw"
                alt="Aurora Confinement members wearing Nordic Fusion Forum 2026 lanyards, standing together in front of the event screen."
                caption="Aurora Confinement at Nordic Fusion Forum 2026, Copenhagen."
              />
              <h3>Connecting with the fusion community.</h3>
              <p>
                At{' '}
                <a href="https://nordic-fusion-forum-2026.confetti.events/#speakers--1498456">
                  Nordic Fusion Forum 2026
                </a>{' '}
                in Copenhagen, team members met researchers, fusion companies
                and funders to discuss workforce needs, public engagement and
                potential applications for our models.
              </p>
            </article>
          </div>
        </div>
      </section>

      <CommunityPosts />

      <section className="section field-ice team-current-focus">
        <div className="shell">
          <h2>Our focus now:</h2>
          <ul className="team-focus-bullets">
            <li>
              Gather free, non-binding interest to support grant funding for a
              physical prototype.
            </li>
            <li>
              Refine the <Link href="/model/">exhibition model</Link> through
              simulations and virtual modelling.
            </li>
            <li>
              Understand what institutions need for teaching and outreach.
            </li>
            <li>
              Explore the{' '}
              <Link href="/research-platform/">research platform</Link> as a
              longer-term direction.
            </li>
          </ul>
          <Link className="button" href="/roadmap/">
            See the roadmap
          </Link>
          <p className="team-status-note">
            Aurora Confinement is an early-stage, student-led initiative,
            currently pre-incorporation. University affiliations describe team
            members’ studies and do not imply institutional endorsement.
          </p>
        </div>
      </section>

      <TeamMotivation>
        <div className="team-closing-inner">
          <div>
            <h2>Interested in using the model?</h2>
            <InterestDisclaimer />
          </div>
          <div className="button-row">
            <Link className="button primary" href={homeHero.primaryHref}>
              Register interest
            </Link>
          </div>
        </div>
      </TeamMotivation>
    </div>
  );
}
