# Register interest — all-in-one Letter of Interest workflow

Prepared for Aurora Confinement · 6 November 2026

## Objective

Make the Register interest page the single place where a prospective user can describe their interest, review a personalised Letter of Interest (LOI), confirm it, verify their email and receive the final PDF. Aurora should receive a structured database record and be able to download the confirmed letter for permitted investor and grant-provider use.

The workflow must capture an intentional, attributable, non-binding expression of interest. It must distinguish personal professional interest, team interest and authorised institutional interest. Generating a PDF must never silently turn an ordinary enquiry into an LOI.

The privacy-page rewrite is a separate task. Resolving the privacy notice, responsible controller, processing arrangements and sharing language remains a dependency before production collection and disclosure.

## Decision: preview before confirmation

**Yes: show the exact letter before the registrant confirms it. An embedded PDF viewer is optional.**

Use a readable, mobile-friendly HTML preview of the complete letter as the default. Generate the downloadable PDF from the same content and template version. Offer “Download draft PDF” as an optional secondary action if useful; watermark drafts “DRAFT — NOT CONFIRMED”.

The useful safeguard is that the person reviews the actual statement attributed to them. A PDF viewer is only a presentation choice and can add friction on mobile. The preview must show the letter's full wording, qualifications and selected sharing permissions, with a clear way to edit answers.

After confirmation, do not add stronger claims, quantities, permissions or institutional authority. The final PDF may add the confirmation timestamp, email-verification timestamp and reference ID, as explained beside the preview.

## Page positioning and opening copy

Page title: **Register interest**

Subtitle: **Create a non-binding Letter of Interest.**

Suggested introduction:

> Tell us how you or your organisation could use Aurora Confinement’s technology. Review and confirm your personalised Letter of Interest, then verify your work email to receive a PDF copy. With your permission, we may share the letter confidentially with prospective investors and grant providers as evidence of potential demand.
>
> Registration is free. This is not an order, reservation or commitment to purchase. Our products are in development; specifications, pricing and availability are subject to development and validation.

Keep the exhibition model and research platform clearly identified. Neither should be presented as a commercially available fusion power system. Reflect Aurora's actual pre-incorporation status rather than inventing a company identity.

Provide a secondary link: **Just have a question? Contact us.** General enquiries, investment enquiries and ordinary collaboration discussions must not automatically create LOIs.

## Registrant journey

1. **Describe your interest.** Complete identity, use-case and interest fields. Show product-specific questions only where relevant.
2. **Review your letter.** Show the complete personalised letter, sharing controls and confirmation statement. Provide “Edit details” without losing answers.
3. **Confirm and verify.** The registrant confirms the displayed statement and requests an email-verification link. Explain that the LOI becomes completed only after verification.
4. **Receive your LOI.** Verification completes the saved confirmation for that exact letter version. Show a success page with “Download your Letter of Interest” and send the registrant a copy or secure download link.

Suggested primary buttons: **Review my letter** → **Confirm letter and verify email** → **Download my Letter of Interest**.

Do not require an account, payment, printed signature or separate document exchange for the standard workflow. Provide a follow-up route for organisations that require their own approval process or signature procedure.

## Form fields

### 1. Your details

| Field | Requirement | Notes |
| --- | --- | --- |
| Full name | Required | Name attributed to the letter. |
| Work email | Required | Verify ownership before treating the LOI as completed. Offer a manual follow-up route if a legitimate prospect cannot use an institutional address. |
| Job title / role | Required | Use the registrant's own description. |
| Organisation / institution | Required | Institution name alone does not mean institutional endorsement. |
| Department / research group | Optional | Helps qualify and deduplicate institutional interest. |
| Country | Required | Country of the prospective use or institution; no street address needed. |
| Capacity in making this statement | Required | See choices below. |

Capacity choices:

- I am expressing my personal professional interest, with my affiliation provided for context.
- I am expressing interest on behalf of my team or department and am authorised to make this statement.
- I am authorised to express interest on behalf of my institution or organisation.

Explain: **These choices do not indicate purchasing authority or procurement approval.**

Optional procurement-role field: potential user / technical evaluator / recommender / budget holder / procurement / other. This must remain distinct from authority to make the statement.

### 2. Product and type of interest

| Field | Requirement | Choices / behaviour |
| --- | --- | --- |
| Product of interest | Required | Exhibition model / research platform / both. Preselect from the referring product page, but allow changes. |
| Type of interest | Required; multiple choices allowed | Demonstration / pilot or evaluation / rental or event use / potential purchase / research collaboration / exploratory discussion. |
| Primary use | Required | University teaching / museum or science centre / industry outreach / policy or fusion event / research / other. |
| Intended application | Required | Short free-text answer: “What would you use it for, and who would benefit?” |
| Why this would be useful | Optional | Capture the unmet need or current alternative without requiring a long essay. |

If “both” is selected, capture use, timing and conditions separately for each product. Do not treat interest in one as evidence of demand for the other.

### 3. Timing, scale and readiness

| Field | Requirement | Choices / behaviour |
| --- | --- | --- |
| Indicative timing | Required | When available / within 12 months / 1–3 years / longer term / not yet known. Explain that this is their preference, not Aurora's delivery commitment. |
| Preferred date or relevant event | Optional | Useful for exhibitions and pilots. |
| Indicative quantity | Optional | Positive number with unit, e.g. models or installations; include “not yet known”. Do not default to one. |
| Expected reach | Optional | Students per year, visitors, events or research users; store the unit and period. |
| Budget status | Optional | Available / requires internal approval / external funding needed / not explored / prefer not to say. |
| Indicative budget | Optional | Amount or range, currency, and basis: per unit / pilot / rental period / total project. Do not suggest an established Aurora price. |
| Conditions for proceeding | Optional | Performance, safety documentation, price, funding, institutional approvals, infrastructure, support, procurement or other conditions. |

No quantity, budget or purchasing commitment should be required to submit a useful LOI. Unknown answers must remain unknown in the letter and reporting.

### 4. Product-specific questions

**Exhibition model — optional:** portability; intended setting; who would operate it; expected demonstration frequency or duration; teaching materials; installation or support needs.

**Research platform — optional:** research question; essential diagnostics or measurements; available infrastructure; desired collaboration or access model; key technical requirements.

Use short prompts and progressive disclosure. Detailed specifications can be established in follow-up. Display: **Please do not include confidential, sensitive or patent-sensitive information.**

## Review and confirmation

Show the following above the final button:

> Please review the letter below. It records your stated interest and the capacity you selected. You can edit your answers before confirming.

Required, unchecked confirmation:

> I confirm that this letter accurately reflects my interest and my stated capacity to make this statement. I understand that it is non-binding and creates no obligation to purchase, pay, supply or participate.

Show the typed full name as **Confirmed by [name]**. Do not describe typed-name and email confirmation as a qualified electronic signature, proof of institutional authority or guarantee of legal effect. Final wording and legal treatment should be reviewed before launch.

### Sharing choices

Separate confirmation of the LOI from permission to share identifying information. Do not make named sharing a condition of registering interest.

Suggested optional, unchecked permission, subject to final privacy review:

> Aurora Confinement may share this letter, including my name, role, organisation and stated interest, confidentially with prospective investors and grant providers for fundraising and due diligence. My email address will be omitted from shared copies. This does not permit public publication or use of our organisation's logo.

Explain how to change or withdraw this permission and what that means for future sharing. Define recipient categories and handling in the final privacy notice. Do not promise that copies already lawfully disclosed can always be recalled.

Without this permission, retain the letter for the disclosed internal purpose and use only genuinely anonymised aggregate reporting externally. Redacting a name alone may not anonymise a distinctive organisation, role or project.

Public testimonials, logos, public naming and recurring marketing updates require separate choices or follow-up permission. Do not bundle them into this workflow.

## Letter template

**Non-binding Letter of Interest — [product]**

**To:** Aurora Confinement [actual initiative / entity identity at time of confirmation]

I, **[full name]**, **[role]** at **[organisation, department if supplied]**, express interest in exploring **[selected interest types]** relating to **[product]**.

**Capacity:** [exact selected capacity, phrased as a complete sentence].

**Intended application:** [registrant's answer].

**Indicative timing:** [answer].

**Potential scale:** [include only if supplied, with units and period].

**Budget context:** [include only if supplied, with currency, basis and approval status].

**Conditions and requirements:** [include supplied conditions and relevant product-specific answers].

I understand that the product is in development and that final specifications, pricing and availability have not been established. This letter records non-binding interest only. It is not an order, reservation, purchase agreement, funding commitment or institutional endorsement, and creates no obligation to purchase, pay, supply or participate. Any future participation would require separate discussion and any necessary approvals and agreements.

**Confirmed by:** [full name]

**Confirmation date:** [timestamp with timezone]

**Email verified:** [timestamp with timezone]

**Reference:** [unique LOI ID]

**Sharing permission:** [plain-language scope recorded at confirmation]

Footer: Aurora Confinement contact details; template version; page number where needed.

For both products, use clearly separated sections with their own applications and conditions. Preserve the registrant's wording. Use deterministic templates rather than automatically rewriting responses into stronger sales language.

## Database and audit record

Store structured fields plus an immutable snapshot of what the registrant confirmed:

- Unique LOI ID and separate organisation/contact identifiers.
- Product-specific answers, including unknown values and units.
- Exact letter content and template version.
- Confirmation wording/version and confirmation timestamp.
- Email-verification status and timestamp; link verification to the confirmed version.
- Sharing permission, wording/version, timestamp and later changes.
- Source page or campaign, where available, without inventing attribution.
- Current status and version history.
- PDF file reference and integrity checksum, if implemented.
- Internal qualification notes kept separate from the registrant's statement.

Suggested statuses: **Pending email verification → Confirmed → Superseded / Withdrawn**. Track commercial follow-up separately, e.g. new / contacted / qualified / pilot discussion / closed.

“Confirmed” means email-confirmed by the named person, not independently validated institutional authority. Keep any manual authority review as a separate field with its evidence.

Edits to a confirmed letter create a new version requiring fresh confirmation. Do not overwrite the original. Sharing-permission changes must take effect in future exports and access, with an audit record.

## PDF outputs and admin capabilities

Provide two controlled outputs from the same confirmed record:

1. **Registrant/internal copy:** complete confirmed letter, with contact details where appropriate and access restricted.
2. **Investor/grant-provider copy:** available only where permitted; omit email and unnecessary contact details, retain the confirmed statement, capacity, conditions and verification/reference information. Label any redactions.

PDF formatting: Aurora branding; selectable text; readable typography; no clipped answers; support long responses and page breaks. Do not add institution logos or a signature graphic automatically. Never label an unverified draft as a completed LOI.

Admin capabilities:

- Search and filter by product, institution, country, capacity, interest type, timing, budget readiness and status.
- View the exact confirmed statement and verification record.
- Download individual PDFs and permitted batches; export structured CSV data.
- See sharing restrictions before export; block exports that exceed permission.
- Deduplicate organisations without merging distinct departments or statements incorrectly.
- Record follow-up, corrections, withdrawal and permission changes.
- Restrict access to authorised team members; keep a record of exports or disclosures.

## Investor reporting

Report counts of people and unique organisations separately. Separate exhibition-model interest from research-platform interest, and personal interest from authorised organisational statements.

Distinguish exploratory interest, pilot interest, potential purchase interest, formal institutional letters and actual commercial agreements. Do not present LOIs as orders, contracted revenue or guaranteed pipeline. Do not multiply all submissions by an assumed price and describe the result as committed revenue.

Useful summary: “X email-confirmed non-binding expressions of interest from Y organisations, including Z interested in evaluating a pilot,” accompanied by date, product split and relevant qualifications.

## Implementation requirements

- Validate submissions on the server; protect against spam and repeated submissions.
- Save the exact pending letter before sending verification. Use expiring, single-use verification links; make repeat clicks safe and allow resend.
- Do not count pending records as completed LOIs. Expiry and cleanup periods must follow the approved retention policy.
- Save completed records durably before showing success. Queue email and PDF generation with retries; show honest status if either fails.
- Keep PDFs private; use authenticated access or time-limited download links. Do not expose letters at publicly enumerable URLs.
- Keep personal form content out of analytics, public logs and URLs.
- Support mobile layouts, accessible labels, keyboard use, field-level errors and back/edit navigation without losing answers.
- Apply the approved privacy, retention and deletion rules consistently to database records, PDFs and backups.

## Acceptance criteria

- A visitor can complete the LOI in one website workflow without a separate document exchange.
- The visitor sees the complete statement before confirming and can edit it.
- Final letter content matches the reviewed version, apart from disclosed completion metadata.
- Email ownership is verified before a record is counted as confirmed.
- Personal affiliation cannot silently become institutional endorsement or purchasing authority.
- Unknown budgets and quantities remain unknown.
- General enquiries never become LOIs automatically.
- An authorised Aurora team member can find the record and download the appropriate PDF.
- Investor exports respect current sharing permission and omit email addresses.
- Corrections create a reconfirmed version; withdrawals and permission changes affect future use.
- Long answers, both-product submissions, expired links, duplicate clicks and PDF/email failures are handled correctly.

## Recommended launch scope

Launch the full essential path: structured form, exact letter preview, explicit confirmation, work-email verification, database storage, permission-aware PDF generation and a basic admin export view.

Keep budgets, quantities and detailed technical requirements optional. Add a follow-up option for stronger prospects that need a letter on institutional letterhead or an authorised signature. This strengthens the same pipeline without making the initial registration cumbersome.
