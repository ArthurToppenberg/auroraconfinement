import type { Metadata } from 'next';
import Link from 'next/link';
import { contactEmail } from '@/content/site';
import { pageMetadata } from '@/lib/metadata';

export const metadata: Metadata = pageMetadata({
  title: 'Contact',
  description:
    'Email Aurora Confinement with questions, collaboration or investment enquiries.',
  path: '/contact/',
});

export default function Page() {
  return (
    <section className="contact-page chapter field-deep">
      <div className="shell contact-intro">
        <h1>Contact Aurora Confinement</h1>
        <p className="contact-lead">
          Questions, collaboration and investment enquiries are all welcome.
          Email us and we will reply by email.
        </p>
        <p className="button-row">
          <a className="button primary" href={`mailto:${contactEmail}`}>
            {contactEmail}
          </a>
        </p>
        <p>
          Sending an email does not create a Letter of Interest. To describe how
          you could use the exhibition model or research platform, and to review
          and confirm a non-binding letter,{' '}
          <Link href="/register/">register interest</Link>.
        </p>
        <p className="registration-privacy">
          How we handle your data: <Link href="/privacy/">Privacy Notice</Link>.
        </p>
      </div>
    </section>
  );
}
