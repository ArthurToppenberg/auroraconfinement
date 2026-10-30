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
        field="magenta"
        title="Broaden access. Build understanding."
        intro="Physical tools can make stellarator technology more tangible to communicate, explore, and investigate."
      />

      <section className="section field-night">
        <div className="shell grid-3">
          <article className="card">
            <h2 className="card-heading">From abstraction to intuition</h2>
            <p>
              Fusion concepts are often encountered through equations,
              simulations, and distant facilities. Physical models can help
              exhibition visitors, stakeholders, and students engage with the
              subject.
            </p>
          </article>
          <article className="card cyan">
            <h2 className="card-heading">More routes to practical work</h2>
            <p>
              Access to experimental stellarator hardware is limited. Compact
              research systems may support hands-on research, advanced teaching,
              and carefully scoped investigations.
            </p>
          </article>
          <article className="card magenta">
            <h2 className="card-heading">Shared questions, earlier</h2>
            <p>
              Researchers, educators, and industry teams can identify useful
              requirements together before technology and product assumptions
              harden.
            </p>
          </article>
        </div>
      </section>

      <section className="section field-ice">
        <div className="shell split-section">
          <h2>Science can be hard to reach directly.</h2>
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

      <section className="section field-deep">
        <div className="shell split-section">
          <div className="split-copy">
            <h2>Communicate with tangible models.</h2>
            <p>
              We are developing tabletop stellarator models for exhibitions,
              visitor facilities, public engagement, and technical
              communication. They can also serve as visual aids in introductory
              university lectures.
            </p>
          </div>
          <div className="split-copy">
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

      <section className="section tight field-cyan">
        <div className="shell callout">
          <h2>Access starts with real requirements.</h2>
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
