import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/metadata';
import InterestForm from '@/components/InterestForm';

export const metadata: Metadata = pageMetadata({
  title: 'Contact',
  description:
    "Register non-binding interest in Aurora Confinement's tabletop models, experimental research platforms, or potential collaboration.",
  path: '/contact/',
});

export default function Page() {
  return (
    <section className="contact-page chapter field-deep" id="contact-form">
      <div className="shell contact-page-grid">
        <div className="contact-intro">
          <h1>Tell us what you are exploring.</h1>
          <p className="contact-lead">
            Register your interest in one of our products, discuss a
            collaboration or send us a general enquiry.
          </p>
          <div className="contact-categories" aria-label="Conversation topics">
            <div>
              <span>Tabletop exhibition models</span>
            </div>
            <div>
              <span>Experimental research platforms</span>
            </div>
            <div>
              <span>Research, investment or strategic collaboration</span>
            </div>
          </div>
        </div>
        <div className="contact-form-column">
          <div className="contact-form-heading">
            <h2>Register your interest.</h2>
            <p>
              Tell us how one of our products could be relevant to your
              organisation.
            </p>
          </div>
          <InterestForm />
        </div>
      </div>
    </section>
  );
}
