import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/metadata';
import PageHero from '@/components/PageHero';
import ProductFigure from '@/components/ProductFigure';

export const metadata: Metadata = pageMetadata({
  title: 'Products',
  description:
    'Tabletop stellarator models for exhibition and communication, and compact experimental stellarator platforms for more accessible hands-on research.',
  path: '/products/',
});

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Products"
        title="Physical tools for stellarator research and communication."
        intro="Aurora Confinement is developing two product directions for organisations that need to investigate, communicate, exhibit, or teach stellarator technology."
      />

      <section className="section" id="tabletop">
        <div className="shell split-section product-detail">
          <ProductFigure kind="tabletop" eager />
          <div className="split-copy">
            <span className="status-label">Current focus · In development</span>
            <p className="eyebrow">01 / Exhibition and communication</p>
            <h2>Tabletop stellarator models</h2>
            <p>
              Physical models designed to help fusion companies, research
              institutions, and universities communicate stellarator technology
              at exhibitions, visitor facilities, and introductory lectures.
            </p>
            <h3>Who it is for</h3>
            <p>
              Fusion companies, research institutions, universities,
              conferences, visitor facilities, and public-engagement teams.
            </p>
            <h3>Problem addressed</h3>
            <p>
              Stellarator geometry is difficult to communicate through flat
              media alone. A physical model can make technical conversations and
              public engagement more tangible, with introductory teaching as a
              secondary application.
            </p>
            <a
              className="button cta-button"
              href="/contact?interest=exhibition-model"
            >
              Discuss an exhibition model
            </a>
          </div>
        </div>
      </section>

      <section className="section" id="research">
        <div className="shell split-section reverse product-detail">
          <ProductFigure kind="research" />
          <div className="split-copy">
            <span className="status-label">
              Current focus · Early-stage development
            </span>
            <p className="eyebrow">02 / Experimental research</p>
            <h2>Experimental stellarator platforms</h2>
            <p>
              Compact experimental systems designed to lower the cost and
              infrastructure barriers to hands-on stellarator research.
            </p>
            <h3>Who it is for</h3>
            <p>
              Universities, startups, and research teams seeking a more
              accessible route into experimental work.
            </p>
            <h3>Problem addressed</h3>
            <p>
              Hands-on stellarator research can require substantial capital,
              specialist infrastructure, and engineering resources. The platform
              is being developed to reduce those barriers and may also support
              laboratory courses, student projects, and researcher training.
            </p>
            <a
              className="button cta-button"
              href="/contact?interest=research-collaboration"
            >
              Discuss a research partnership
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
