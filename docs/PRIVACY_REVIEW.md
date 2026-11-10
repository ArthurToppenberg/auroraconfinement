# Privacy notice: evidence and completion register

Prepared 6 November 2026. The rewritten /privacy page describes the implemented LOI flow. It is a draft requiring the factual and legal decisions below, not a certification of GDPR/ePrivacy compliance. No live data was accessed and no production deployment was performed.

## Update from the controller: 10 November 2026

User-supplied facts, not a production infrastructure audit:

| Item                    | Confirmed information                                                                                                                                                                                                           | Remaining check                                                                                                                                                                                      |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Controller              | Etienne alone determines the purposes; based in Denmark. Name, contact email and Denmark remain confirmed. Home address removed from the public notice at the controller’s request.                                                                                                                            | Confirm current legal entity if incorporation changes the controller.                                                                                                                                |
| Website origin          | Contabo, Germany. Cloudflare remains delivery/domain/email-routing provider.                                                                                                                                                    | Account contracting entity, service-specific DPA and any support/subprocessor access.                                                                                                                |
| LOI database            | Prisma Postgres project in eu-central-1, Frankfurt, Germany, according to project settings.                                                                                                                                     | Region does not establish every support/account-processing location. Confirm plan and provider-managed snapshots.                                                                                    |
| Email                   | Cloudflare forwards contact@ to Etienne's personal Gmail mailbox.                                                                                                                                                               | Confirm outgoing replies and applicable consumer Gmail terms; do not assume Workspace terms or an EEA-only storage region. Do not publish the private mailbox address.                               |
| Website analytics       | User now expressly instructs deactivation, replacing the previous keep-running instruction. Umami script and CSP script/connect allowances removed in this working tree.                                                        | Deploy before claiming production collection has stopped. Historical records have not been accessed or erased; ask the former operator to confirm retention/deletion.                                |
| Own backups/access logs | User reports no backups and no logs. Public wording is limited to no own separate backups/routine website access logs.                                                                                                          | This does not remove LOI audit events, temporary IP counters or provider technical records. Prisma documents automatic daily snapshots on Starter/Pro/Business; confirm actual plan and Backups tab. |
| Access                  | Etienne handles LOIs/enquiries in Denmark. Etienne administers Cloudflare/mail; Arthur administers server/database under direct instructions. Both access from Denmark. Provider DPA acceptance is unknown after clarification. | Prisma Free plan and internal team role are confirmed. Check provider-specific account holders, terms and DPA coverage; none were independently verified.                                            |

Follow-up questions about Arthur's role and Prisma plan have been answered below; outgoing Gmail and provider-specific terms remain to be checked. The required combined sharing choice and operational retention implementation still need resolution; the notice remains a draft. No production deployment, historical analytics deletion, mailbox access or live LOI inspection was performed.

Sources checked 10 November 2026:

- Prisma Postgres region FAQ: https://www.prisma.io/docs/postgres/faq
- Prisma Postgres backups: https://www.prisma.io/docs/postgres/database/backups (daily active-day snapshots; paid-plan retention is plan dependent, not inferred for this account).
- Contabo DPA control-panel workflow: https://docs.contabo.com/docs/dpa/dpa/ (account-specific agreement must be checked).
- Google transfer framework information: https://policies.google.com/privacy/frameworks (generic provider information is not verification of this personal mailbox's contracting arrangements).

## Work completed in the earlier follow-up

- Restored LinkedIn embeds behind explicit Accept/Decline controls, blocked by default. Original links remain when declined. A footer Cookie settings control allows withdrawal; removing consent unmounts the frames. Choice/version/timestamps are stored locally for 180 days, without a visitor identifier. The inline panel is specific to LinkedIn; analytics was unchanged at that stage; see the 10 November update.
- Minimized investor exports: email, phone, acquisition source and internal follow-up are omitted.
- Prepared PRIVACY_OPERATIONS.md covering withdrawal, rights, deletion, the 24-month policy, recipient handling, backup restoration and a draft internal legitimate-interest assessment.
- Created a blank disclosure-register CSV. Completed copies must stay out of Git.
- Located current Cloudflare customer DPA and verified vendor self-hosted Umami retention guidance. Neither proves an account's accepted terms or actual configuration.
- Historical note: analytics was originally kept running at the user's request. That instruction was superseded on 10 November; the script is now removed from source. Historical retention remains a factual question.
- No live database/mailbox was inspected, no deletion was executed, no contracts were accepted and no changes were deployed.

## Required decisions before finalisation

1. Controller confirmed by the user: Etienne Gras, contact@auroraconfinement.com, Denmark. The user subsequently requested removal of the home address from the public notice on 10 November 2026; the name and contact email remain visible. No deployment has been performed. Do not substitute a future ApS or a university. Assess any actual joint-controller relationship or applicable DPO requirement.
2. Confirm website/server operator, Cloudflare arrangements, database/email/backup providers, Umami operator and locations, subprocessors, Article 28 agreements, third-country access and applicable Chapter V safeguards. A .dk hostname does not establish processing location.
3. Adopt purpose-specific bases. The proposed Article 6(1)(f) bases for professional enquiries, internal LOI administration and security require necessity/balancing records. Do not assume Article 6(1)(b) applies to an employee speaking for an institution.
4. Assess the required combined confirmation/sharing choice against GDPR Articles 4(11), 7(2), 7(4) and EDPB Guidelines 05/2020. A private email link does not automatically establish a genuinely equivalent alternative or freely given, granular consent. A page rewrite cannot resolve this. Keep the user's requested behavior pending this decision; do not silently make sharing optional or invent a different lawful basis. A lower-risk design separates letter confirmation from optional identifying disclosure (an optional selector can preserve one checkbox); confidential anonymised demand evidence can be reported separately.
5. User selected 24 months for inactive LOIs and enquiries, measured in this notice from last meaningful contact. Implement this across correspondence, LOI records, associated notes and exported copies; no automatic deletion currently exists. Withdrawn consent does not automatically justify another 24 months. Any minimal accountability/claims evidence needs its own justified period. Technical logs, analytics and backups still need confirmed, purpose-specific periods rather than inheriting 24 months. Document any longer exception and review/end date.
6. Review production Umami data fields, session identifiers, URL/referrer handling, IP/browser processing and its deployed version. Vendor "cookieless" claims do not prove anonymity or exemption from Danish terminal-device rules. Form answers must never enter analytics URLs or events.
7. Implemented: LinkedIn-specific consent panel over the Team-page placeholder cards, equal Accept/Decline choices, frames blocked before consent, original links as an alternative, persistent settings/withdrawal control. Verify the deployed LinkedIn cookie inventory and transfer arrangements; this is not a universal cookie compliance certification. Historical LinkedIn processing/cookies are not erased by withdrawal.
8. Establish an operational rights/withdrawal process: proportionate verification, one-month response workflow, correcting/superseding snapshots without treating immutability as an erasure exemption, deleting live data and exported copies where required, notifying recipients under Article 19, handling backups and documenting any justified retention.
9. Implemented: investor exports now omit internal follow-up and source as well as dedicated email/phone fields. Free-text review remains necessary. A blank recipient-register template and rights/retention runbook have been prepared; actual disclosures still need to be recorded by the operator. Audit scope alone is not a recipient register.
10. Finalise the notice only after the above facts are supplied. Update the dated notice and inform existing contacts as required. A notice update cannot retroactively create consent.

## Provider facts confirmed during this review

- User originally reported Cloudflare and PostgreSQL; the 10 November answers identify Contabo in Germany and Prisma Postgres in Frankfurt. Deployment documentation still needs reconciliation if it describes a colocated database.
- Public DNS checked 6 November 2026: MX records route1.mx.cloudflare.net, route2.mx.cloudflare.net and route3.mx.cloudflare.net; SPF references \_spf.mx.cloudflare.net. This supports Cloudflare incoming email routing, not a claim about the destination mailbox or outgoing mail provider. A Google site-verification TXT record is not proof of Google email hosting.
- The removed analytics code used self-hosted Umami at stats.arthurtoppenberg.dk. Do not infer the historical operator, cloud service or location from the hostname.
- Unknown providers and locations remain marked; user permission to choose wording is not evidence of which services actually process data.

## Implementation evidence

| Surface                   | Confirmed behavior                                                                                                                                                                       |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| /register                 | One required combined checkbox sets confirmed + sharing; both start false. Server rejects either false. No email verification, autosave, email receipt or server-generated PDF delivery. |
| schema.ts + handler.ts    | Required identity/capacity/product/use/timing; optional phone/department/procurement/budget/reach/requirements; source allowlist; validated payload; server-built immutable letter.      |
| LetterOfInterest + events | Answers, contact details, reference, versions, time, sharing, status, follow-up, notes and export/change history.                                                                        |
| investor CSV              | Only CONFIRMED + sharingPermitted. Dedicated email/phone blank. Snapshot retained after withdrawal; status change is not erasure.                                                        |
| /contact                  | Email-only enquiries; no automatic LOI or investor permission.                                                                                                                           |
| rate limiter              | IP-based counters in process memory, ten-minute window; stale keys may remain until cleanup/restart. No exact ten-minute deletion guarantee.                                             |
| layout.tsx                | Umami script removed on 10 November; proxy CSP no longer permits that script/connect origin.                                                                                             |
| CommunityPosts.tsx        | LinkedIn frames blocked until explicit acceptance; links remain; settings allow withdrawal.                                                                                              |
| deployment docs           | Shared Docker server + Caddy, domain proxied by Cloudflare; provider legal identities/locations not established.                                                                         |
| admin session             | admin_session cookie, eight hours.                                                                                                                                                       |

## Authoritative sources reviewed

- GDPR, especially Articles 5, 6, 7, 12-14, 15-22, 28 and 44-49: https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32016R0679
- EDPB Guidelines 05/2020 on consent, especially conditionality and granularity: https://www.edpb.europa.eu/system/files/documents/files/file1/edpb_guidelines_202005_consent_en.pdf
- EDPB lawful-processing guide: https://www.edpb.europa.eu/sme/be-compliant/process-personal-data-lawfully_en
- Datatilsynet, rights and information duties: https://www.datatilsynet.dk/Media/C/0/Registreredes%20rettigheder.pdf
- Datatilsynet complaints: https://www.datatilsynet.dk/borger/klage/saadan-klager-du
- Cloudflare current customer DPA (account applicability still to be verified): https://www.cloudflare.com/cloudflare-customer-dpa/
- Umami documentation (vendor description, not verification of the deployed service): https://docs.umami.is/docs/faq

## Consent panel placement

The LinkedIn consent panel overlays the group of three local, blurred, post-sized placeholders, not the page viewport. No LinkedIn frame is mounted merely to create a blurred preview. It does not auto-scroll visitors on their first Team-page visit. Placeholder/settings buttons scroll and focus that panel. Cookie settings from another page opens the Team settings in a separate tab; cross-tab preference updates preserve in-progress LOI answers. Existing 180-day choices and pre-consent frame blocking remain in force.

## Further controller answers on 10 November 2026

- Arthur is an Aurora team member under Etienne's direct instructions. Both access services from Denmark. Arthur administers the Contabo server and Prisma database; Etienne administers Cloudflare and the mailbox and alone uses the LOI administration interface. Do not equate exclusive application use with technical inability to read database contents. Privileged technical access needs confidentiality, least privilege and documented instructions.
- Prisma plan is Free. The user reports no separate backups/access logs; paid-plan automatic snapshot examples are not asserted for this project. Provider operational/recovery records and deletion arrangements still need checking; no infrastructure audit was performed.
- The earlier statement that DPAs were accepted is now clarified as unknown. Do not record acceptance as established. Prepare an internal confidentiality/access instruction for Arthur and Etienne; it does not replace Contabo, Prisma, Cloudflare or Google's applicable provider arrangements.
- Outgoing Gmail configuration, service-specific account holders/agreements, provider transfer safeguards and provider technical retention remain unresolved. No additional question about Arthur's role is needed.
- Internal access agreement draft prepared in the shared PITCH v2 workspace. It has not been signed; acceptance and actual security settings are not implied by drafting it.

Provider follow-up: Google explicitly states that consumer Gmail has no DPA. Determine the mailbox product before relying on Workspace terms; an internal agreement does not resolve this. Source: https://support.google.com/policies/answer/9581826?hl=en. Prisma's current terms incorporate a DPA where Prisma processes on the customer's behalf; verify the actual customer's applicable terms rather than requiring an invented replacement agreement. Source: https://www.prisma.io/legal/terms.

Home-address publication: removed the residential postal-address paragraph from /privacy at the controller's request on 10 November 2026. No public PDF containing it was created. This change concerns GDPR notice content; it does not determine any separate business-registration or trading-disclosure obligations if the initiative starts trading or incorporates.
