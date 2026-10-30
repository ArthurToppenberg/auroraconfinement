import type { Metadata } from 'next';
import Link from 'next/link';
import { pageMetadata } from '@/lib/metadata';
import PageHero from '@/components/PageHero';
import TeamGrid from '@/components/TeamGrid';
import EventFigure from '@/components/EventFigure';
import { contactHrefs, projectStatus } from '@/content/site';

export const metadata: Metadata = pageMetadata({
  title: 'Team',
  description:
    'Meet the student-led Aurora Confinement team: physics and engineering students from DTU and KU developing physical tools for stellarator research, communication, and teaching.',
  path: '/about/',
});

export default function Page() {
  return (
    <>
      <PageHero
        field="ice"
        title="Meet the team."
        intro="Aurora Confinement is a student-led research initiative bringing together talent from DTU (Technical University of Denmark) and KU (University of Copenhagen) to make stellarator technology more accessible for communication, education, and experimental research."
      />

      <section className="section field-deep team-section" id="team">
        <div className="shell">
          <div className="section-heading">
            <h2>Physics and engineering, side by side.</h2>
            <p>
              Physics and engineering students working across modelling, plasma
              physics, electronics, design, and operations. Roles are current
              focus areas inside a project in formation, not formal
              appointments.
            </p>
          </div>
          <h3 className="team-group-title">Core team</h3>
          <TeamGrid group="core" label="Core team" />
          <h3 className="team-group-title">Extended team</h3>
          <TeamGrid group="extended" label="Extended team" />
        </div>
      </section>

      <section className="section field-night">
        <div className="shell split-section">
          <h2>Lower the barrier to engagement.</h2>
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

      <section className="section field-ice">
        <div className="shell">
          <div className="section-heading">
            <h2>What the team has done so far.</h2>
            <p>
              Before any hardware exists, we have been building the audience and
              the conversations around it.
            </p>
          </div>
          <div className="event-pair">
            <article className="event-item">
              <EventFigure
                name="lecture-hall"
                height={1200}
                sizes="(min-width: 52rem) 46vw, 100vw"
                alt="A full university auditorium during a fusion lunch lecture, with a presentation slide visible on the screens."
                caption="Fusion lunch lecture at DTU, organised and promoted by Aurora Confinement."
              />
              <h3>A fusion lecture that sold out.</h3>
              <p>
                Aurora Confinement organised and promoted a fusion lunch lecture
                at DTU. It drew 120 registrations within 48 hours, with a
                further 20 people on the waiting list, and students from
                disciplines across the university.
              </p>
            </article>
            <article className="event-item">
              <EventFigure
                name="nff-team"
                height={781}
                sizes="(min-width: 52rem) 46vw, 100vw"
                alt="Aurora Confinement members wearing Nordic Fusion Forum 2026 lanyards, standing together in front of the event screen."
                caption="Aurora Confinement at Nordic Fusion Forum 2026, Copenhagen."
              />
              <h3>Nordic Fusion Forum 2026.</h3>
              <p>
                The team took part in Nordic Fusion Forum in Copenhagen on 19
                October 2026 and met researchers, fusion companies, and funders.
                Visitors can{' '}
                <Link href="/nff">continue the conversation here</Link>.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section tight field-cyan">
        <div className="shell callout">
          <h2>Early-stage and actively developing.</h2>
          <p>
            {projectStatus} Both product directions are current priorities at
            different levels of technical maturity. No completed product,
            customer relationship, formal institutional partnership, DTU or KU
            endorsement, or regulatory approval is claimed.
          </p>
          <Link className="button primary" href={contactHrefs.generalEnquiry}>
            Talk with the team
          </Link>
        </div>
      </section>
    </>
  );
}
