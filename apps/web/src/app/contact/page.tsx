import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/metadata';
import PageHero from '@/components/PageHero';
import InterestForm from '@/components/InterestForm';

export const metadata: Metadata = pageMetadata({
  title: 'Contact',
  description:
    "Register non-binding interest in Aurora Confinement's tabletop models, experimental research platforms, or potential collaboration.",
  path: '/contact/',
});

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Start with what you need."
        intro="Register non-binding interest in a product or collaboration. Please keep your message concise and non-confidential."
        compact
      />
      <section className="section" id="contact-form">
        <div className="shell contact-layout">
          <aside>
            <p className="eyebrow">Useful starting points</p>
            <h2>What should we discuss?</h2>
            <ul className="check-list">
              <li>Tabletop exhibition model</li>
              <li>Experimental research platform</li>
              <li>Research collaboration</li>
              <li>Investment or strategic partnership</li>
            </ul>
            <p className="notice">
              The form is not connected to a delivery provider. In local
              demonstration mode, nothing is retained or transmitted.
            </p>
          </aside>
          <InterestForm />
        </div>
      </section>
    </>
  );
}
