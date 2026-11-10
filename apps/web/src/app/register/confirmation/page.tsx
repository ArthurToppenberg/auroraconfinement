import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import { contactEmail } from '@/content/site';
import { pageMetadata } from '@/lib/metadata';
import { confirmationStatement } from '@/lib/loi/letter';

export const metadata: Metadata = pageMetadata({
  title: 'About this confirmation',
  description: 'What confirming your non-binding Letter of Interest means.',
  path: '/register/confirmation/',
});

export default function Page() {
  return (
    <>
      <PageHero
        field="deep"
        title="About this confirmation"
        intro="What confirming your non-binding Letter of Interest means."
        compact
      />
      <section className="section field-night">
        <div className="shell prose">
          <h2>Your statement</h2>
          <p>{confirmationStatement}</p>
          <p>
            Your letter records your answers and the capacity you selected:
            personal professional interest, authorised team or department
            interest, or authorised organisational interest. Your affiliation
            alone does not imply institutional endorsement. These choices do not
            establish purchasing authority or procurement approval.
          </p>
          <h2>Non-binding interest</h2>
          <p>
            The letter is not an order, reservation, purchase agreement or
            funding commitment. Products are in development; specifications,
            pricing and availability have not been established. Any future
            participation requires separate discussion and any necessary
            approvals and agreements.
          </p>
          <h2>How confirmation is recorded</h2>
          <p>
            Review the complete letter before confirming. We save your statement
            with your typed name, a confirmation date and a reference ID. Apart
            from that date and reference, the confirmed letter matches the
            preview.
          </p>
          <p>
            Typed-name confirmation records your stated interest. It is not a
            qualified electronic signature or proof of identity or institutional
            authority. Your email address is not verified; no email code or
            verification link is required.
          </p>
          <p>
            If your organisation requires its own approval or signature process,
            contact <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
          </p>
          <p>
            Submitting this LOI includes your permission for confidential
            sharing with prospective investors and grant providers for
            fundraising and due diligence. See{' '}
            <Link href="/register/sharing/">sharing details</Link> and our{' '}
            <Link href="/privacy/">Privacy Notice</Link>.
          </p>
        </div>
      </section>
    </>
  );
}
