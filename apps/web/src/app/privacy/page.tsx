import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/metadata';
import PageHero from '@/components/PageHero';
import { contactEmail } from '@/content/site';

export const metadata: Metadata = pageMetadata({
  title: 'Privacy notice',
  description:
    'Initial privacy information for Aurora Confinement website enquiries, with unconfirmed details clearly marked.',
  path: '/privacy/',
});

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Privacy"
        title="An honest initial privacy notice."
        intro="This notice describes the intended handling of enquiries. Several operational facts must be confirmed before a production form is connected."
        compact
      />
      <section className="section">
        <div className="shell-narrow prose">
          <p className="notice">
            <strong>Draft status:</strong> This notice requires organisational
            and legal review before any production form collection is enabled.
            It does not claim certified GDPR compliance.
          </p>
          <h2>Controller information</h2>
          <p>
            <strong>REQUIRES CONFIRMATION: DATA CONTROLLER IDENTITY</strong>
            <br />
            <strong>REQUIRES CONFIRMATION: CONTROLLER CONTACT ADDRESS</strong>
            <br />A real person or legal entity responsible for processing must
            be named here before production form collection is enabled.
          </p>
          <h2>Personal data collected</h2>
          <p>
            The general contact form covers name, work email, optional
            organisation and role, area of interest, and message. The Nordic
            Fusion Forum institutional-interest form also covers intended
            application, approximate timeframe, and the fixed source value
            <code>nordic-fusion-forum-2026</code>. Please do not submit
            sensitive, confidential, or patent-sensitive information.
          </p>
          <h2>Purposes</h2>
          <p>
            General enquiries would be processed to respond to the specific
            request and manage any resulting conversation.
            Institutional-interest submissions would be processed to respond,
            understand potential product or collaboration needs, and produce
            non-personal aggregate measures of interest. Submissions are not
            orders, purchases, reservations, commitments, or Letters of Intent.
          </p>
          <h2>Legal basis</h2>
          <p>
            <strong>REQUIRES CONFIRMATION: LEGAL BASIS</strong>
            <br />A qualified reviewer must confirm and document the appropriate
            legal basis for responding to enquiries, evaluating institutional
            interest, and any later relationship management before collection
            begins.
          </p>
          <h2>Recipients and processors</h2>
          <p>
            Access should be limited to authorised Aurora Confinement personnel
            who need the information to respond or manage a relevant
            conversation. Personal data must not be sold, published, or placed
            in analytics.
          </p>
          <ul>
            <li>
              <strong>REQUIRES CONFIRMATION: HOSTING PROVIDER</strong>
            </li>
            <li>
              <strong>REQUIRES CONFIRMATION: FORM PROCESSOR</strong>
            </li>
            <li>
              <strong>
                REQUIRES CONFIRMATION: INTERNATIONAL TRANSFER MECHANISM
              </strong>
            </li>
          </ul>
          <h2>Retention</h2>
          <p>
            <strong>REQUIRES CONFIRMATION: RETENTION PERIOD</strong>
          </p>
          <p>
            Provisional recommendation for legal review: delete or anonymise
            unqualified enquiries and inactive expressions of interest 12 months
            after the last meaningful contact. Retain active commercial or
            research discussions only while the relationship remains active,
            then apply the approved retention policy. This recommendation is not
            a final policy.
          </p>
          <h2>Security</h2>
          <p>
            Production processing should use access controls, encrypted
            transport, data minimisation, input validation, rate limiting,
            restricted logs, and documented deletion procedures. Security
            controls reduce risk but cannot guarantee absolute security.
          </p>
          <h2>Marketing communication</h2>
          <p>
            A form submission permits a response to the specific enquiry only.
            The website does not currently request consent for newsletters or
            recurring promotional email. If recurring updates are introduced,
            they must use a separate optional and unchecked consent control with
            withdrawal records.
          </p>
          <h2>Your rights</h2>
          <p>
            Depending on the applicable law and circumstances, you may have
            rights to access, correct, erase, restrict, or object to processing
            of your personal information. Where processing relies on consent,
            you may also withdraw that consent. You may complain to
            Datatilsynet.
          </p>
          <h2>Privacy requests</h2>
          <p>
            Email privacy requests to{' '}
            <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
          </p>
        </div>
      </section>
    </>
  );
}
