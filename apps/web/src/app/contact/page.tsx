import { Suspense } from 'react';
import ContactIntroduction from '@/components/ContactIntroduction';
import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/metadata';
import InterestForm from '@/components/InterestForm';

export const metadata: Metadata = pageMetadata({
  title: 'Contact',
  description:
    "Register non-binding interest in Aurora Confinement's exhibition stellarator models, experimental research platforms, or potential collaboration.",
  path: '/contact/',
});

export default function Page() {
  return (
    <section className="contact-page chapter field-deep" id="contact-form">
      <div className="shell contact-page-grid">
        <Suspense
          fallback={
            <div className="contact-intro">
              <h1>Contact Aurora Confinement</h1>
            </div>
          }
        >
          <ContactIntroduction />
        </Suspense>
        <div className="contact-form-column">
          <div className="contact-form-heading">
            <h2>Your details</h2>
          </div>
          <InterestForm />
        </div>
      </div>
    </section>
  );
}
