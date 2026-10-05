import type { Metadata } from 'next';
import Link from 'next/link';
import { pageMetadata } from '@/lib/metadata';
import PageHero from '@/components/PageHero';
import { contactHrefs } from '@/content/site';

export const metadata: Metadata = pageMetadata({
  title: 'Vision',
  description:
    'Why Aurora Confinement is developing physical tools for stellarator communication, research, and advanced teaching.',
  path: '/vision/',
});

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Vision"
        title="Broaden access. Build understanding."
        intro="Physical tools can make stellarator technology more tangible to communicate, explore, and investigate."
      />

      <section className="section">
        <div className="shell grid-3">
          <article className="card">
            <p className="card-index">01 / Learn</p>
            <h2 className="card-heading">From abstraction to intuition</h2>
            <p>
              Fusion concepts are often encountered through equations,
              simulations, and distant facilities. Physical models can help
              exhibition visitors, stakeholders, and students engage with the
              subject.
            </p>
          </article>
          <article className="card violet">
            <p className="card-index">02 / Experiment</p>
            <h2 className="card-heading">More routes to practical work</h2>
            <p>
              Access to experimental stellarator hardware is limited. Compact
              research systems may support hands-on research, advanced teaching,
              and carefully scoped investigations.
            </p>
          </article>
          <article className="card magenta">
            <p className="card-index">03 / Collaborate</p>
            <h2 className="card-heading">Shared questions, earlier</h2>
            <p>
              Researchers, educators, and industry teams can identify useful
              requirements together before technology and product assumptions
              harden.
            </p>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="shell split-section">
          <div>
            <p className="eyebrow">The access gap</p>
            <h2>Important science can be difficult to encounter directly.</h2>
          </div>
          <div className="split-copy">
            <p>
              Stellarator research draws on specialised facilities,
              multidisciplinary expertise, and complex three-dimensional
              engineering. Those realities limit who can gain hands-on
              experience and how easily ideas can be communicated outside
              specialist teams.
            </p>
            <p>
              We believe more accessible tools could complement, not replace,
              large research facilities by supporting technical communication,
              workforce development, early experiments, and collaboration.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell split-section">
          <div className="split-copy">
            <p className="eyebrow">Current focus 01</p>
            <h2>Communicate with tangible models.</h2>
            <p>
              We are developing tabletop stellarator models for exhibitions,
              visitor facilities, public engagement, and technical
              communication. They can also serve as visual aids in introductory
              university lectures.
            </p>
          </div>
          <div className="split-copy">
            <p className="eyebrow">Current focus 02</p>
            <h2>Develop experimental research platforms.</h2>
            <p>
              We are also developing compact experimental stellarator platforms
              for universities, startups, and research teams seeking more
              accessible hands-on research and advanced teaching.
            </p>
            <p>
              This direction is at an earlier stage of technical maturity. No
              performance, readiness, or delivery claims are made.
            </p>
          </div>
        </div>
      </section>

      <section className="section tight">
        <div className="shell callout">
          <p className="eyebrow">Work with us</p>
          <h2>Good access starts with real requirements.</h2>
          <p>
            We welcome conversations about exhibition and communication needs,
            experimental research, responsible engineering, and potential
            collaboration.
          </p>
          <Link className="button primary" href={contactHrefs.collaboration}>
            Discuss the vision
          </Link>
        </div>
      </section>
    </>
  );
}
