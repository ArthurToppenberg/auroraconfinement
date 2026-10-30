import type { Metadata } from 'next';
import Link from 'next/link';
import { pageMetadata } from '@/lib/metadata';
import PageHero from '@/components/PageHero';
import ProductFigure from '@/components/ProductFigure';
import { contactHrefs } from '@/content/site';

export const metadata: Metadata = pageMetadata({
  title: 'Technology',
  description:
    "An accessible overview of stellarators and Aurora Confinement's two current product directions.",
  path: '/technology/',
});

export default function Page() {
  return (
    <>
      <PageHero
        field="deep"
        title="Physical tools for stellarators."
        intro="We are developing exhibition stellarator models for communication and teaching, alongside experimental platforms for hands-on research and advanced teaching."
      />

      <section className="section field-night">
        <div className="shell split-section">
          <h2>Confinement without a simple ring.</h2>
          <div className="split-copy">
            <p>
              A stellarator is a magnetic-confinement concept designed to hold
              hot plasma in a twisted, three-dimensional magnetic field. Its
              geometry can support steady-state operation in principle, but it
              also makes stellarators challenging to understand, design,
              manufacture, and study.
            </p>
            <p>
              Physical systems can help turn abstract field geometry and
              engineering trade-offs into something people can see, discuss, and
              investigate. Our public materials stay at that high level while
              the team’s IP position is reviewed.
            </p>
          </div>
        </div>
      </section>

      <section className="section field-ice" id="tabletop">
        <div className="shell split-section">
          <ProductFigure kind="tabletop" eager />
          <div className="split-copy">
            <h2>Exhibition stellarator models</h2>
            <span className="status-label">Current focus: in development</span>
            <p>
              Physical models designed to help fusion companies, research
              institutions, and universities communicate stellarator technology
              at exhibitions, visitor facilities, conferences, science centres,
              and introductory lectures.
            </p>
            <h3>Intended applications</h3>
            <ul>
              <li>Fusion conferences and industry exhibitions</li>
              <li>Visitor facilities and public engagement</li>
              <li>Science-centre and museum interpretation</li>
              <li>Visual teaching aids for introductory university lectures</li>
            </ul>
            <p className="notice">
              No completed model is currently offered for immediate sale.
              Pricing discussions are indicative and non-binding.
            </p>
            <Link className="button primary" href={contactHrefs.collaboration}>
              Discuss an exhibition model
            </Link>
          </div>
        </div>
      </section>

      <section className="section field-night" id="research">
        <div className="shell split-section reverse">
          <ProductFigure kind="research" />
          <div className="split-copy">
            <h2>Experimental stellarator platforms</h2>
            <span className="status-label">
              Current focus: early-stage development
            </span>
            <p>
              Compact experimental systems being developed for universities,
              startups, and research teams seeking more accessible hands-on
              stellarator research.
            </p>
            <h3>Intended applications</h3>
            <ul>
              <li>Hands-on stellarator research and experimentation</li>
              <li>University research and advanced teaching</li>
              <li>Research training and workforce development</li>
              <li>Collaborative investigation with fusion specialists</li>
            </ul>
            <p className="notice">
              This direction is in early-stage development. No performance,
              readiness, regulatory, or delivery claims are made.
            </p>
            <Link className="button primary" href={contactHrefs.collaboration}>
              Discuss a research partnership
            </Link>
          </div>
        </div>
      </section>

      <section className="section tight field-magenta">
        <div className="shell callout">
          <h2>Help shape the useful questions.</h2>
          <p>
            Researchers and industry specialists can help us understand
            requirements, communication needs, experimental use cases, safety
            expectations, and where each physical tool could be genuinely
            valuable.
          </p>
          <Link className="button" href={contactHrefs.generalEnquiry}>
            Start a conversation
          </Link>
        </div>
      </section>
    </>
  );
}
