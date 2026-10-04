import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/metadata';
import InterestForm from '@/components/InterestForm';
import TechnicalIcon from '@/components/TechnicalIcon';

export const metadata: Metadata = pageMetadata({
  title: 'Contact',
  description:
    "Register non-binding interest in Aurora Confinement's tabletop models, experimental research platforms, or potential collaboration.",
  path: '/contact/',
});

export default function Page() {
  return (
    <section className="contact-page" id="contact-form">
      <div className="focused-shell contact-page-grid">
        <div className="contact-intro">
          <p className="eyebrow">CONTACT</p>
          <h1>Tell us what you are exploring.</h1>
          <p className="contact-lead">
            Register your interest in one of our products, discuss a
            collaboration or send us a general enquiry.
          </p>
          <div className="contact-categories" aria-label="Conversation topics">
            <div>
              <TechnicalIcon name="model" />
              <span>Tabletop exhibition models</span>
            </div>
            <div>
              <TechnicalIcon name="experiment" />
              <span>Experimental research platforms</span>
            </div>
            <div>
              <TechnicalIcon name="investment" />
              <span>Research, investment or strategic collaboration</span>
            </div>
          </div>
        </div>
        <div className="contact-form-column">
          <div className="contact-form-heading">
            <p className="eyebrow">CONTINUE THE CONVERSATION</p>
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
