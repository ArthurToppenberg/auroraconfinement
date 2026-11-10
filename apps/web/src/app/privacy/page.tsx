import type { Metadata } from 'next';
import Link from 'next/link';
import { pageMetadata } from '@/lib/metadata';
import PageHero from '@/components/PageHero';
import { contactEmail } from '@/content/site';

export const metadata: Metadata = pageMetadata({
  title: 'Privacy notice',
  description:
    'How Aurora Confinement handles Letters of Interest, enquiries, website information and your data protection rights.',
  path: '/privacy/',
});

export default function Page() {
  return (
    <>
      <PageHero
        field="deep"
        title="Privacy notice"
        intro="How we handle your information, share Letters of Interest and respect your choices."
        compact
      />
      <section className="section field-night">
        <div className="shell prose">
          <p>
            Last updated: <time dateTime="2026-11-10">10 November 2026</time>
          </p>
          <p className="notice">
            <strong>Notice being finalised.</strong> Provider agreement and
            transfer details, legal-basis assessments and provider-managed
            retention arrangements still need confirmation. The sections below
            describe the current website and LOI flow; this is not yet a
            complete final notice for production reliance.
          </p>

          <h2 id="controller">Who is responsible</h2>
          <p>
            Aurora Confinement is a student-led initiative in formation, not yet
            an incorporated company. University affiliations do not make DTU or
            the University of Copenhagen responsible for this website.
          </p>
          <p>
            <strong>Data controller: Etienne Gras</strong>, operating the Aurora
            Confinement initiative.
          </p>
          <p>
            Email for privacy questions and rights requests:{' '}
            <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
          </p>

          <h2 id="information">Information we collect</h2>
          <h3>Letters of Interest</h3>
          <p>
            When you use <Link href="/register/">Register interest</Link>, you
            provide your name, work email, role, organisation, country and
            capacity to make the statement. You select a product and type of
            interest, and give the intended application, primary use and
            indicative timing for each selected product.
          </p>
          <p>
            You may also provide a phone number, department, procurement role,
            explanation of usefulness, preferred date or event, quantities,
            expected audience or reach, budget information, conditions and
            product-specific requirements. Those fields are optional. Please do
            not include sensitive personal information, other people's
            unnecessary details, or confidential or patent-sensitive material.
          </p>
          <p>
            We store the submitted answers and confirmed letter in our database,
            together with its reference, confirmation date, template and wording
            versions, sharing permission, and source category (Register interest
            or the Nordic Fusion Forum link). We may add relevant follow-up
            notes, status and authority-review information. An audit history
            records creation, permission changes, withdrawal, follow-up and
            exports.
          </p>
          <p>
            The draft updates in your browser while you type. The form sends its
            answers to our registration endpoint when you submit; the form does
            not autosave draft answers to the LOI database. Your email is not
            verified. Confirmation records your statement, not proof of
            identity, institutional authority or an order. After saving, you can
            print or save the letter as a PDF using your browser; the website
            does not email a receipt or PDF.
          </p>
          <h3>Email enquiries</h3>
          <p>
            If you email us, we receive your email address, message, attachments
            and other information you choose to include.{' '}
            <Link href="/contact/">Contact enquiries</Link> do not create an LOI
            or grant permission to show your message to investors.
          </p>
          <h3>Website and security information</h3>
          <p>
            Our servers and delivery providers receive connection information
            such as IP address, request details and browser information. The
            registration endpoint uses the client IP address in temporary,
            in-memory rate-limit counters to limit abuse. Its time window is ten
            minutes; inactive counter entries may remain in memory until cleanup
            or a server restart. The LOI record does not contain an IP-address
            field. We do not operate routine website access logs or separate
            backups. This does not include the LOI audit history described above
            or technical records and recovery copies that providers may keep
            under their own service arrangements.
          </p>

          <h2 id="purposes">Why we use information and the legal bases</h2>
          <p>
            We use LOIs to record the statement you requested, understand
            institutional requirements, manage relevant follow-up, and prepare
            evidence of potential demand. This is separate from newsletters,
            public testimonials or logo permissions.
          </p>
          <ul>
            <li>
              <strong>LOI administration and requested enquiries:</strong> the
              proposed basis is legitimate interests under GDPR Article 6(1)(f),
              specifically managing professional correspondence, product
              requirements and accurate records of requested statements. The
              controller must complete the necessity and balancing assessment
              before adopting this basis.
            </li>
            <li>
              <strong>Identifiable investor or grant-provider sharing:</strong>{' '}
              the proposed basis is your consent under Article 6(1)(a), limited
              to the confidential fundraising and due-diligence use explained
              below. The current combined, required confirmation needs
              assessment against Article 7's requirements for freely given,
              specific consent. Making a checkbox mandatory does not itself
              establish valid consent.
            </li>
            <li>
              <strong>Security and abuse prevention:</strong> the proposed basis
              is legitimate interests under Article 6(1)(f), specifically
              protecting the website, its users and records. Provider logging
              and any terminal-device access need their own documented
              assessment, including applicable Danish cookie rules.
            </li>
            <li>
              <strong>Legal obligations or claims:</strong> where applicable,
              specific processing may be required by a legal obligation (Article
              6(1)(c)) or justified by a documented legitimate interest in
              establishing, exercising or defending a legal claim (Article
              6(1)(f)). These are not reasons to retain every record
              indefinitely.
            </li>
          </ul>
          <p>
            Submitting an LOI is voluntary and is not required by law or a
            purchase contract. Without its required fields and confirmation, the
            current form cannot create a completed LOI. Optional answers may be
            left blank. A private email enquiry remains available. No purchase,
            payment, supply or participation commitment is created.
          </p>

          <h2 id="sharing">Sharing with investors and grant providers</h2>
          <p>
            The current single checkbox confirms the letter and permits
            confidential sharing with prospective investors and grant providers
            for fundraising and due diligence. The letter can include your name,
            role, organisation, capacity, application and other answers you
            chose to put in it. Your dedicated email and phone fields are
            excluded from investor exports and the letter. Anything you put into
            free-text answers may still appear in a shared copy.
          </p>
          <p>
            Investor exports also omit internal follow-up status and
            acquisition-source fields. Exported letter answers must be reviewed
            for unnecessary personal information before disclosure.
          </p>
          <p>
            This permission does not authorise public publication, public
            testimonials, use of your organisation's logo, or marketing updates.
            Older letters without sharing permission are not made shareable by a
            later wording change. The investor export selects only confirmed
            letters with sharing currently permitted.
          </p>
          <p>
            You can withdraw sharing permission or ask us to withdraw the LOI by
            emailing <a href={`mailto:${contactEmail}`}>{contactEmail}</a>,
            quoting the reference if available. Withdrawal does not affect
            processing lawfully carried out before withdrawal. We will stop
            future consent-based sharing and assess whether the data must be
            erased or whether a separate lawful reason requires limited
            retention. Existing copies are not automatically recalled; where
            applicable, GDPR requires us to communicate corrections, erasure or
            restrictions to recipients, subject to its exceptions. We can
            explain the recipients relevant to your record.
          </p>
          <p>
            See <Link href="/register/sharing/">sharing details</Link>. No
            public testimonial, logo licence or newsletter subscription is
            included in an LOI.
          </p>

          <h2 id="providers">Who else receives information</h2>
          <p>
            Etienne Gras, based in Denmark, administers LOIs and enquiries and
            decides how the information is used. Authorised technical
            administrators and service providers may process information as
            needed to operate the website, database, email and security
            services. Arthur Toppenberg administers the server and database from
            Denmark as a team member under Etienne's instructions. Etienne alone
            uses the LOI administration interface and manages Cloudflare and the
            contact mailbox. Database administration may nevertheless provide
            technical access to stored LOI information; such access must be
            limited to necessary technical work on instructions.
          </p>
          <ul>
            <li>
              <strong>Contabo:</strong> hosts the website's origin server in
              Germany, behind Cloudflare.
            </li>
            <li>
              <strong>Prisma Postgres:</strong> hosts the LOI database. The
              project's selected database region is eu-central-1, Frankfurt,
              Germany, on the Free plan. This database-region setting is not a
              guarantee that all provider support, account or technical
              processing stays there.
            </li>
            <li>
              <strong>Cloudflare:</strong> provides domain and website
              delivery/proxy services and routes incoming email.
            </li>
            <li>
              <strong>Google Gmail:</strong> receives incoming enquiries
              forwarded through Cloudflare to the controller's personal Gmail
              mailbox. A specific email storage region has not been confirmed.
            </li>
          </ul>
          <p>
            These services can receive connection/request information as well as
            the information needed to provide their respective services.
            Provider-managed technical records and recovery copies may exist
            even where we have not enabled our own access logs or backups.
            Applicable contracting entities, processing agreements, support
            access and transfer arrangements are being checked. A hosting or
            database region does not establish EEA-only processing. Where a
            recipient acts as an independent controller, it is responsible for
            its own subsequent processing and notices.
          </p>
          <h3>Website analytics</h3>
          <p>
            This version of the website does not load the previously used Umami
            analytics script or send website analytics requests to that service.
            Disabling the script does not erase historical analytics records;
            their deletion or remaining retention must be confirmed with the
            former service operator.
          </p>
          <h3>LinkedIn content</h3>
          <p>
            The Team page offers embedded LinkedIn posts. They are blocked by
            default and only load after you select Accept LinkedIn in the
            consent panel over the blurred post placeholders. Decline LinkedIn
            leaves the original-post links available and does not block the rest
            of this website. The panel controls LinkedIn content only; it does
            not enable website analytics.
          </p>
          <p>
            When you allow embeds, LinkedIn receives your IP address and browser
            information and may use cookies or similar technologies for
            recognition, analytics and advertising. Processing may take place
            outside the EEA. See{' '}
            <a href="https://www.linkedin.com/legal/privacy-policy">
              LinkedIn's privacy policy
            </a>{' '}
            and{' '}
            <a href="https://www.linkedin.com/legal/cookie-policy">
              cookie policy
            </a>
            . The provider's actual cookie/transfer arrangements still need to
            be verified; this notice does not certify them.
          </p>
          <p>
            Use Cookie settings in the footer to change your choice in the Team
            page’s post section. From other pages, settings open in a separate
            tab so form answers are preserved. Declining removes the frames and
            stops further embed loads from this site. It cannot erase cookies or
            data already held by LinkedIn; those are managed through LinkedIn
            and your browser's settings.
          </p>
          <h3>Cookies and browser storage</h3>
          <p>
            We store your LinkedIn preference, its version and decision/expiry
            timestamps in local browser storage under{' '}
            <code>aurora.linkedin-consent.v1</code> for 180 days. It contains no
            visitor identifier, and both accepting and declining are remembered
            for the same period. If storage is unavailable, the choice applies
            for the current visit. Expired or unrecognised choices require a new
            decision. The registration form does not use cookies or persistent
            browser storage to save answers. Administrators who sign in receive
            a necessary <code>admin_session</code> cookie with an eight-hour
            expiry; it is not used to track ordinary visitors. The presence and
            settings of Cloudflare, LinkedIn or other provider cookies must be
            checked against the deployed site.
          </p>

          <h2 id="transfers">Transfers outside the EEA</h2>
          <p>
            Our website origin server and selected LOI database region are in
            Germany. Cloudflare, Google, Prisma and LinkedIn may nevertheless
            involve processing or access outside the European Economic Area. The
            database-region setting does not cover every provider activity. Our
            service-specific destination and safeguard inventory is still being
            completed; we cannot claim that all information stays in the EEA.
          </p>
          <p>
            Before a restricted international transfer, the applicable
            destination and protection must be established, such as a relevant
            adequacy decision or appropriate contractual safeguards and any
            necessary supplementary measures. A general provider policy or
            acceptance of a data-processing agreement alone does not identify
            the safeguard for every transfer. Contact us for information about
            the arrangements relevant to your data. Ordinary LOI sharing
            permission is not an international-transfer safeguard. See also{' '}
            <a href="https://policies.google.com/privacy/frameworks">
              Google's transfer framework information
            </a>
            .
          </p>

          <h2 id="retention">How long information is kept</h2>
          <p>
            <strong>
              LOIs and enquiries: up to 24 months after the last meaningful
              contact.
            </strong>{' '}
            This covers inactive letters, their associated follow-up records and
            ordinary email correspondence. Meaningful contact means a
            substantive discussion about the relevant enquiry, product, pilot or
            collaboration; an automated message or website visit does not
            restart the period.
          </p>
          <p>
            Information must be erased or anonymised earlier if it is no longer
            needed or a valid erasure request requires it. Withdrawing consent
            stops future consent-based sharing; it does not automatically
            justify keeping the complete letter for another 24 months. Minimal
            evidence of permission or withdrawal may be retained only for a
            separately justified purpose and period.
          </p>
          <p>
            Longer retention is possible only where a specific continuing
            purpose or legal requirement justifies it, for example a live
            project or an actual legal claim. The reason, scope and review/end
            date must be documented. This is not permission to retain all
            letters indefinitely for possible future fundraising.
          </p>
          <p>
            <strong>Implementation status:</strong> the 24-month period is the
            controller's selected policy. The application does not yet enforce
            automatic expiry. Marking a letter withdrawn or superseded restricts
            investor export eligibility but does not erase it; the operational
            review and deletion procedure must implement this policy across the
            database, emails and exported copies.
          </p>
          <p>
            <strong>Technical records and recovery copies:</strong> we do not
            operate routine website access logs or separate backups.
            Provider-managed logs, recovery snapshots and their actual retention
            remain to be confirmed. The 24-month LOI policy does not determine
            their overwrite periods. If a recovery copy is restored, applicable
            erasures must be reapplied. Historical analytics retention and
            deletion must be addressed separately with the former operator; this
            website no longer loads its analytics script.
          </p>

          <h2 id="rights">Your rights and how to use them</h2>
          <p>
            Depending on the processing and applicable conditions, you may
            request access, correction, erasure or restriction, object to
            processing based on legitimate interests, and receive portable data
            where consent or contract and automated processing make that right
            applicable. You may withdraw consent at any time. We do not use the
            LOI flow to make solely automated decisions producing legal or
            similarly significant effects about you.
          </p>
          <p>
            Email <a href={`mailto:${contactEmail}`}>{contactEmail}</a>. A
            reference number helps but is not mandatory. If we reasonably doubt
            your identity, we may request proportionate information to verify a
            rights request. The normal response deadline is one month; where a
            lawful extension is necessary because of complexity or number of
            requests, we must explain it within that month. Requests are
            normally free; GDPR contains limited exceptions for manifestly
            unfounded or excessive requests.
          </p>
          <p>
            You may complain to the Danish supervisory authority,{' '}
            <a href="https://www.datatilsynet.dk/borger/klage/saadan-klager-du">
              Datatilsynet
            </a>
            , or to a competent supervisory authority in the country of your
            habitual residence, workplace or an alleged infringement. You do not
            need our permission to complain.
          </p>

          <h2 id="changes">Changes to this notice</h2>
          <p>
            We will update the date when this notice changes. A revised notice
            does not expand an earlier LOI's sharing permission. If we propose a
            new purpose, we must provide the required information and establish
            the appropriate legal basis before using the information for that
            purpose.
          </p>
        </div>
      </section>
    </>
  );
}
