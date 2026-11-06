import { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import RegisterFlow from '@/components/RegisterFlow';
import { contactEmail } from '@/content/site';
import { pageMetadata } from '@/lib/metadata';

export const metadata: Metadata = pageMetadata({
  title: 'Register interest',
  description:
    'Create a non-binding Letter of Interest for the Aurora Confinement exhibition model or research platform.',
  path: '/register/',
});

export default function Page() {
  return (
    <>
      <section className="register-top chapter field-deep">
        <div className="shell register-top-grid">
          <div>
            <h1>Register interest</h1>
            <p className="register-subtitle">
              Create a non-binding Letter of Interest.
            </p>
          </div>
          <div className="register-top-copy">
            <p>
              Tell us how you or your organisation could use Aurora
              Confinement’s technology. Your personalised letter appears beside
              the form as you write, so you see exactly what you are confirming.
              With your permission, we may share it confidentially with
              prospective investors and grant providers as evidence of potential
              demand.
            </p>
            <p>
              Registration is free. This is not an order, reservation or
              commitment to purchase. Our products are in development;
              specifications, pricing and availability are subject to
              development and validation.
            </p>
            <p>
              <Link href="/contact/">Just have a question? Contact us.</Link>{' '}
              <span className="registration-privacy">
                How we handle your data:{' '}
                <Link href="/privacy/">Privacy Notice</Link>.
              </span>
            </p>
          </div>
        </div>
      </section>
      <section className="register-page chapter field-ice">
        <div className="shell">
          <Suspense fallback={null}>
            <RegisterFlow contactEmail={contactEmail} />
          </Suspense>
        </div>
      </section>
    </>
  );
}
