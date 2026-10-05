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
        eyebrow="Technology"
        title="Physical tools for stellarator communication and research."
        intro="We are developing tabletop models for exhibition and communication, alongside experimental platforms for hands-on stellarator research and advanced teaching."
      />

      <section className="section">
        <div className="shell split-section">
          <div>
            <p className="eyebrow">Stellarators, briefly</p>
            <h2>Magnetic confinement without a single simple ring.</h2>
          </div>
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

      <section className="section" id="tabletop">
        <div className="shell split-section">
          <ProductFigure kind="tabletop" eager />
          <div className="split-copy">
            <span className="status-label">Current focus · In development</span>
            <p className="eyebrow">Direction 01</p>
            <h2>Tabletop stellarator models</h2>
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

      <section className="section" id="research">
        <div className="shell split-section reverse">
          <ProductFigure kind="research" />
          <div className="split-copy">
            <span className="status-label">
              Current focus · Early-stage development
            </span>
            <p className="eyebrow">Direction 02</p>
            <h2>Experimental stellarator platforms</h2>
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

      <section className="section tight">
        <div className="shell callout">
          <p className="eyebrow">Responsible technical dialogue</p>
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
