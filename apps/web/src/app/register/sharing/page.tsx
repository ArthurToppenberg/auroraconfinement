import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import { contactEmail } from '@/content/site';
import { pageMetadata } from '@/lib/metadata';
import { sharingStatement } from '@/lib/loi/letter';

export const metadata: Metadata = pageMetadata({
  title: 'Sharing details',
  description: 'How confidential sharing of your Letter of Interest works.',
  path: '/register/sharing/',
});

export default function Page() {
  return (
    <>
      <PageHero
        field="deep"
        title="Sharing details"
        intro="How confidential sharing of your Letter of Interest works."
        compact
      />
      <section className="section field-night">
        <div className="shell prose">
          <h2>What you permit</h2>
          <p>{sharingStatement}</p>
          <p>
            This covers the letter's stated application, requirements and any
            other answers included in the preview, as well as your selected
            capacity. Your email address and phone number are excluded from
            shared copies.
          </p>
          <h2>Who may receive the letter and why</h2>
          <p>
            With your permission, prospective investors and grant providers may
            receive the letter confidentially for fundraising and due diligence,
            as evidence of potential demand. It remains a non-binding statement,
            not an order or commitment.
          </p>
          <h2>Permission when submitting an LOI</h2>
          <p>
            The single required checkbox confirms the letter and permits
            confidential sharing for fundraising and due diligence. It starts
            unchecked. If you prefer a private enquiry, use our{' '}
            <Link href="/contact/">contact page</Link> instead; this does not
            create an investor-shareable LOI.
          </p>
          <p>
            Existing letters submitted without sharing permission remain
            internal-only, with only anonymised aggregate figures reported
            externally. This change does not grant permission for earlier
            letters.
          </p>
          <h2>Changing or withdrawing permission</h2>
          <p>
            Email <a href={`mailto:${contactEmail}`}>{contactEmail}</a> to
            change or withdraw permission, quoting your letter reference if
            available. The change applies to future sharing. Copies already
            lawfully shared may not be recallable.
          </p>
          <h2>Outside this permission</h2>
          <p>
            This permission does not cover public publication, public
            testimonials, use of your organisation's logo or marketing updates.
            Those require separate permission.
          </p>
          <p>
            Read our <Link href="/privacy/">Privacy Notice</Link> for
            information about handling personal data.
          </p>
        </div>
      </section>
    </>
  );
}
