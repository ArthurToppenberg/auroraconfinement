# Privacy operations

Owner: Etienne Gras, contact@auroraconfinement.com. Operational instructions prepared 6 November 2026; they do not assert that the historic backlog, infrastructure configuration or provider agreements have already been reviewed. Analytics remains running at the user's explicit instruction.

## Rights requests and withdrawal

1. Record receipt, request category and the one-month response deadline. Read only the data needed to handle the request. Use the existing email thread/reference; ask for proportionate additional identity evidence only where reasonable doubt exists. Do not routinely ask for a passport.
2. For withdrawal, promptly disable sharing and, if requested, mark the LOI withdrawn in the existing admin interface. This removes investor-export eligibility. It is not deletion and must not be described as such. Do not ask the person to justify withdrawing consent.
3. For access, gather the person's letter, contact fields, notes, status and audit history; review third-party data and send through an appropriately protected channel. Explain purposes, recipients, retention and rights. Do not send another person's record.
4. For correction, rectify inaccurate operational data and create a corrected/reconfirmed letter where appropriate. Preserve an earlier version only if a separately justified purpose requires it. An immutable snapshot is not an exemption from erasure.
5. For erasure, identify any specific obligation or active claim requiring limited retention; otherwise remove the applicable record and associated copies. A database administrator must execute a reviewed deletion; no production deletion was run by this work. The LOI-event foreign key cascades on parent deletion. Review superseding versions, emails, attachments and exports as well.
6. Identify actual recipients using the disclosure register. Communicate rectification, erasure or restriction where Article 19 requires, documenting any relevant exception. An EXPORTED audit event proves an export, not delivery to a named recipient.
7. Check backups with the operator. Erase where technically possible; otherwise limit access until the approved overwrite point and ensure restorations reapply deletions. Record the actual cycle rather than promising immediate deletion from all backups.
8. Respond within one month. If a lawful extension is needed, explain the reason within the original month. Close the request with an outcome and, where appropriate, reasons, complaint route and judicial-remedy information. Keep only minimal justified request-handling evidence.

## 24-month policy

- LOIs and ordinary enquiry correspondence: up to 24 months from last meaningful substantive contact, with earlier erasure where required. Automated emails, website visits, exports and internal note edits do not reset that clock.
- Etienne should run a monthly review before records reach expiry, rather than add an extra month after the deadline. Until a scheduler and a reliable last-meaningful-contact field exist, use a controlled register to track each record's deadline. Never infer substantive contact merely from the latest audit event.
- Document any necessary longer exception with its purpose, restricted data set, basis and review/end date. Possible future fundraising alone is not an indefinite exception.
- Withdrawn consent does not automatically justify keeping the whole letter for another 24 months. Assess minimal evidence separately.
- Logs, backups and analytics need operator-confirmed, purpose-specific periods. Suggested settings to discuss: 30 days for routine technical logs/backups, 12 months for analytics. These are recommendations, not assertions of deployed settings or universal legal limits.
- Self-hosted Umami documentation describes retention as indefinite unless deletion is configured. Ask its operator what is actually scheduled; do not assume the site's 24-month policy controls another database.

## Disclosure register

Use PRIVACY_DISCLOSURES_TEMPLATE.csv in restricted internal storage, with one row per actual recipient and disclosed version. It is a blank template, not a register of past deliveries. Do not commit completed registers to Git. Review letter free text for personal contact details and other people's information before sending. Investor CSV omits dedicated contact fields, internal follow-up and source, but does not automatically scrub text.

## Internal legitimate-interest assessment: prepared for controller adoption

Purposes: requested professional correspondence, accurate LOI administration, product requirements and protecting the service against abuse. These are separate from identifiable investor disclosure; this assessment does not establish a basis for that disclosure.

Necessity: a professional name/contact and the submitted use case are needed to attribute and follow up a requested statement. Phone, budget, reach, department and technical requirements stay optional; unknown answers are not inferred. Temporary IP-based rate limits address abuse without persisting IPs in the LOI record. Provider log necessity remains unverified.

Balancing: contributors actively contact the project in a professional context, receive a preview, have a private enquiry route and can request access, correction, objection and erasure. Risks include false attribution, sensitive free text, unwanted disclosure and excessive retention. Mitigations are explicit capacity, non-binding wording, no claims of verified identity, restricted admin access, server validation, permission-aware exports, LinkedIn embeds blocked until explicit acceptance, a bounded retention policy and recipient review. Residual risks: shared admin password rather than per-person accountability, incomplete provider/transfer facts, unimplemented deletion automation, and mandatory bundled sharing. Controller adoption must address these limitations; this is not a signed legal opinion or a retrospective assessment of all processing.

## Contracts and transfers

Obtain a provider/service/location/subprocessor inventory and the actual applicable Article 28 terms. Cloudflare publishes a customer DPA including transfer provisions, but the account holder must confirm the applicable contracting entity, services and accepted terms. Do not infer adequacy or an SCC module from a generic certification or a .dk hostname. Check the actual recipient and transfer before disclosure; ordinary investor-sharing permission is not a Chapter V transfer mechanism.

Cloudflare DPA: https://www.cloudflare.com/cloudflare-customer-dpa/
Umami retention description: https://docs.umami.is/docs/faq
Datatilsynet deletion: https://www.datatilsynet.dk/regler-og-vejledning/behandlingssikkerhed/sletning
