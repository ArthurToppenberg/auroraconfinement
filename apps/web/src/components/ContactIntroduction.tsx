'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { contactHrefs, homeHero } from '@/content/site';

export default function ContactIntroduction() {
  const searchParams = useSearchParams();
  const isModelInterest =
    searchParams.get('intent') === 'product-interest' &&
    searchParams.get('interest') === 'exhibition-model';

  if (isModelInterest) {
    return (
      <div className="contact-intro model-registration-intro">
        <h1>Register interest</h1>
        <h2>Tell us what your institution needs.</h2>
        <p>
          Would you use a real-plasma model for teaching, exhibitions or
          outreach? Share your intended application and requirements.
        </p>
        <p className="registration-reassurance">
          {homeHero.invitation} This is not an order, payment commitment or
          obligation to purchase.
        </p>
        <Link href={contactHrefs.generalEnquiry}>Have a general enquiry?</Link>
      </div>
    );
  }

  return (
    <div className="contact-intro">
      <h1>Tell us what you are exploring.</h1>
      <p className="contact-lead">
        Register your interest in one of our products, discuss a collaboration
        or send us a general enquiry.
      </p>
      <div className="contact-categories" aria-label="Conversation topics">
        <div>
          <span>Exhibition and educational models</span>
        </div>
        <div>
          <span>Long-term research platforms</span>
        </div>
        <div>
          <span>Research, investment or strategic collaboration</span>
        </div>
      </div>
    </div>
  );
}
