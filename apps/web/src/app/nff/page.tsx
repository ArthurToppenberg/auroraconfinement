import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/metadata';
import PageHero from '@/components/PageHero';
import InterestForm from '@/components/InterestForm';

export const metadata: Metadata = pageMetadata({
  title: 'Nordic Fusion Forum 2026',
  description:
    'Meet Aurora Confinement at Nordic Fusion Forum 2026 and register non-binding institutional interest in accessible stellarator research platforms.',
  path: '/nff/',
});

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="NORDIC FUSION FORUM 2026"
        title="Stellarator research should be within reach."
        intro="Aurora Confinement is developing compact experimental platforms designed to reduce the cost and infrastructure required for hands-on stellarator research."
      />

      <section className="section tight">
        <div className="shell nff-summary">
          <div>
            <p className="eyebrow">Meet us at Nordic Fusion Forum 2026</p>
            <h2>Continue the conversation.</h2>
            <p>
              Aurora Confinement is attending the event independently. No formal
              partnership, sponsorship, or organiser affiliation is implied.
            </p>
          </div>
          <ul className="card check-list">
            <li>Designed for universities, startups, and research teams</li>
            <li>
              Focused on experimentation, training, and early-stage research
            </li>
            <li>Developed to lower infrastructure and acquisition barriers</li>
            <li>Supported by physical models for communication and teaching</li>
          </ul>
          <div className="button-row">
            <a className="button primary" href="#interest">
              Register institutional interest
            </a>
            <a className="button" href="/products">
              Explore our products
            </a>
          </div>
        </div>
      </section>

      <section className="section" id="interest">
        <div className="shell nff-form-wrap">
          <div>
            <p className="eyebrow">Follow up</p>
            <h2>Register institutional interest.</h2>
            <p>
              Tell us what your organisation would like to explore. This local
              version demonstrates the form without sending or storing personal
              information.
            </p>
          </div>
          <InterestForm variant="nff" />
        </div>
      </section>
    </>
  );
}
