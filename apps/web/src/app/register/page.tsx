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
              Tell us how you would use our technology, then review and save
              your letter. Free to register, with no purchase commitment.
            </p>
            <p className="register-top-links">
              <Link href="/contact/">Contact us</Link>
              <span className="registration-privacy">
                <Link href="/privacy/">Privacy Notice</Link>
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
