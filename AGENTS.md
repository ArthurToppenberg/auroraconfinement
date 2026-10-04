# Instructions for Codex

## Project objective

Build and maintain the public Aurora Confinement website described in `docs/PROJECT_BRIEF.md`. Read that brief before planning or changing the site.

The first release is an event-ready, static website for Nordic Fusion Forum on 19 October 2026. It must be credible to researchers, industry leaders, potential customers, partners, advisers, and early-stage investors while remaining honest about the project's early stage.

## Working method

1. Inspect the repository and `docs/PROJECT_BRIEF.md` before making changes.
2. Explain the proposed change in beginner-friendly language.
3. Keep tasks small and reviewable.
4. Preserve unrelated user work.
5. Use Git checkpoints for substantial milestones when Git is available.
6. Run the relevant formatters, type checks, tests, build, and accessibility checks after changes.
7. Report exactly what changed, what was tested, and anything still requiring human confirmation.
8. Do not declare the site legally compliant or production-ready merely because automated checks pass.

## Technology constraints

- Use Next.js (App Router) with strict TypeScript and React. The site is a static export (`output: 'export'`, written to `apps/web/dist/`); do not add server-only features such as API routes, middleware, or runtime image optimisation.
- Keep pages as server components. Add `'use client'` only for components that genuinely need interactivity (the header menu, forms, and print button) and keep them small.
- Use pnpm (pinned in `package.json`) with the Turborepo workspace; do not reintroduce npm lockfiles. The site lives in `apps/web`.
- Prefer static generation.
- The Content Security Policy forbids `'unsafe-inline'`. Next.js inlines small scripts, so `pnpm build` allows exactly those by SHA-256 hash in `apps/web/dist/_headers` (`apps/web/scripts/write-csp-hashes.mjs`). Do not add inline `<style>`/`style=` attributes or loosen the CSP to work around this.
- Use semantic HTML and locally compiled CSS.
- Do not load Tailwind from a CDN.
- Minimise client-side JavaScript.
- Do not introduce a CMS, database, accounts, authentication, payments, or ecommerce functionality without explicit approval.
- Do not add a dependency without explaining its purpose, maintenance implications, privacy impact, and security impact.
- Pin dependencies through the lockfile and keep the dependency set small.

## Brand assets

Use only these approved initial logo files:

- `logowithtext.png` for the full logo where the wordmark is legible.
- `logonotext.png` for compact navigation, icons, mobile layouts, or placement beside an HTML text wordmark.

Do not use `pnglogo.png` unless explicitly approved later.

Preserve logo proportions and transparency. Do not recolour, distort, redraw, crop through, or apply heavy effects. Test contrast: the full logo contains dark lettering and may need a light or controlled background.

If the site source is placed in a subdirectory, copy the chosen logo assets into an appropriate version-controlled public asset directory while retaining the original files. Do not hotlink local filesystem paths.

The approved initial product illustrations are:

- `assets/images/tabletop-stellarator-concept.png` — use for the exhibition-model product direction.
- `assets/images/research-stellarator-concept.png` — use for the research-platform product direction.

The tabletop concept intentionally shows a purple plasma volume for educational clarity. The research concept intentionally hides the plasma inside an opaque vessel/shell. Preserve this distinction in future revisions.

Always place this exact visible caption directly beneath each occurrence of either illustration:

> Concept illustration — not the actual product or final design. The magnetic-field configuration shown is illustrative and does not represent Aurora Confinement's technology.

Do not hide this disclaimer in alt text, a tooltip, metadata, or a modal. Do not present the images as photographs, CAD produced by the engineering team, final designs, actual magnetic-field geometry, existing prototypes, or evidence of technical performance. Use the alternative text specified in `docs/PROJECT_BRIEF.md`.

## Visual direction

- Dark, cinematic, scientific, and technically serious.
- Use the logo's cyan, violet, blue, and magenta colours sparingly as accents.
- Prefer strong typography, generous spacing, clear hierarchy, and subtle magnetic/auroral motifs.
- Avoid generic sci-fi dashboards, excessive glow, decorative clutter, and unrelated fusion stock imagery.
- Keep all essential content readable without animation.
- Respect `prefers-reduced-motion`.

The supplied DANTE HTML is visual inspiration only. Do not copy its code, content, assets, branding, analytics, external scripts, or distinctive composition.

## Content and claims

- Use the correct spelling `stellarator`.
- Describe Aurora Confinement as a 13-person, student-led DTU initiative in formation unless the brief is formally updated.
- Do not imply incorporation, funding, customers, sales, regulatory approval, completed products, DTU endorsement, DTU Skylab incubation, or institutional partnerships without written evidence supplied by the user.
- Use accurate qualifiers such as `in development`, `early-stage`, `intended`, and `exploring` where appropriate.
- Prefer `research-scale platform`, `experimental stellarator system`, or `research system` over `research reactor` until terminology is explicitly approved.
- Never invent technical specifications, performance claims, market statistics, customer interest, partners, quotations, team biographies, news, awards, or milestones.
- Do not include confidential, enabling, patent-sensitive, or unpublished technical information.
- Flag potentially novel technical disclosures for human IP review.
- Do not use `Buy now` unless the user explicitly establishes a real purchasable product and asks for a compliant ordering flow.
- Expressions of interest must be clearly labelled non-binding and must not be described as orders or customers.

## Advisers and affiliations

Do not include Søren Bang Korsholm in the initial release.

Do not publish any adviser name, title, biography, photograph, quotation, logo, or affiliation without explicit written approval for the exact material. Do not imply that an adviser's employer or affiliated institution endorses Aurora Confinement.

## Required routes

Implement or maintain:

- `/` — Home.
- `/technology` — Product directions and accessible technical overview.
- `/vision` — Mission and long-term purpose.
- `/about` — Project story and team.
- `/news` — Markdown-based news index and articles.
- `/join` — Opportunities with transparent status.
- `/contact` — General contact and interest form.
- `/nff` — Nordic Fusion Forum follow-up page.
- `/privacy` — Privacy notice with items requiring legal confirmation clearly marked.
- `/accessibility` — Accessibility statement with honest status.

Navigation and routes may be refined for usability, but do not remove required information without approval.

## Contact and interest forms

- Request only necessary information.
- Validate and normalise inputs on the server.
- Apply reasonable length limits and allowlist structured choices.
- Use rate limiting and a privacy-conscious honeypot or similarly proportionate spam control.
- Do not put secrets in client code.
- Do not save messages in an application database for the initial release.
- Do not send sensitive form contents to analytics or logs.
- Provide clear success, validation, and failure states.
- Make all fields and messages accessible.
- State that expressions of interest are non-binding and no payment is taken.
- Associate the `/nff` form with the source value `nff2026` without adding cross-site tracking.
- Do not add reCAPTCHA or another third-party challenge unless abuse demonstrates a need and the user approves the privacy tradeoff.

## Analytics and privacy

- Do not add Google Analytics, Google Tag Manager, advertising pixels, session replay, fingerprinting, cross-site tracking, marketing cookies, or visitor profiles.
- Prefer no cookies.
- If measurement is implemented, limit it to first-party aggregate page and call-to-action counts.
- Do not persist full IP addresses, detailed user-agent strings, or stable visitor identifiers for analytics.
- Keep contact details separate from aggregate metrics.
- Do not load external fonts, social feeds, videos, maps, icons, or scripts by default.
- Document every processor, external request, cookie, storage mechanism, log, and retention period introduced by the implementation.

## Security baseline

- Follow relevant OWASP ASVS 5.0 Level 1 controls for the implemented surface.
- Escape output and validate untrusted input server-side.
- Use safe framework APIs and avoid unsafe HTML injection.
- Define restrictive security headers, including an appropriate Content Security Policy.
- Use HTTPS in production.
- Never commit credentials, tokens, private keys, `.env` files, personal data exports, or production submissions.
- Provide `.env.example` with placeholder names only when environment variables are required.
- Add automated dependency and secret scanning when a CI workflow is introduced.
- Keep production logs minimal and free of message bodies, credentials, and unnecessary personal data.
- Document the deployment and rollback process.

## Accessibility baseline

Target WCAG 2.2 AA:

- Use semantic landmarks and a logical heading hierarchy.
- Provide keyboard-accessible navigation and controls.
- Provide visible focus states.
- Maintain sufficient text and interactive-element contrast.
- Label form controls and connect error messages programmatically.
- Provide useful alternative text; use empty alt text for purely decorative images.
- Do not rely on colour alone.
- Avoid flashing content and unnecessary motion.
- Support zoom, reflow, mobile layouts, reduced motion, and high-contrast use.
- Test with automated accessibility tooling and manual keyboard navigation.

## Performance and quality

- Optimise images and provide appropriate dimensions and responsive variants.
- Avoid layout shifts and unnecessary network requests.
- Ensure essential content works without client-side JavaScript wherever practical.
- Provide descriptive titles, metadata, canonical configuration, Open Graph metadata, a sitemap, and robots configuration once the production domain is known.
- Maintain clear empty states and clearly labelled content placeholders.
- Do not ship fake news posts, fake testimonials, fake partners, or fake metrics.

## Definition of done for the event release

- All required routes build successfully.
- The homepage and `/nff` page communicate the project within seconds.
- Calls to action lead to functioning, accessible contact flows.
- The site is usable at common mobile and desktop widths.
- Keyboard navigation and reduced-motion behaviour are verified.
- Automated tests, type checks, build, and accessibility checks pass.
- External network requests are reviewed and justified; the intended baseline is none beyond the site's own origin and approved form infrastructure.
- Privacy, project-status, affiliation, and non-binding-interest wording is present.
- No adviser is listed.
- No patent-sensitive or unapproved institutional claims are present.
- Every product concept illustration has the required visible non-final-design and magnetic-field disclaimer directly beneath it.
- The `/nff` URL and QR-code destination are tested on multiple phones before 19 October 2026.

<!-- BEGIN:turborepo-agent-rules -->

# This is NOT the Turborepo you know

Turborepo configuration, task behavior, and CLI commands can vary between installed versions and may differ from your training data. Resolve the `turbo` package from this file's directory or relevant workspace; in monorepos, it may not be visible from the repository root. For example, run `node -p "require.resolve('turbo/package.json')"` from a workspace that depends on `turbo`.

Read `docs/README.md` inside that installed package first, then read the relevant pages from its `docs/` directory before changing Turborepo configuration or commands. Heed deprecation notices. These bundled docs match the installed package version and are available without network access.

This block is written and re-added by `turbo` before repository-scoped commands when an AI agent is detected. In the Turborepo source repository, its template is defined in `crates/turborepo-cli/src/cli/agent_guidance.rs`. Removing the managed block while updates are enabled means a later qualifying invocation will add it again. Set `"agentGuidance": false` in the root `turbo.json` or `turbo.jsonc` to opt out; this does not remove an existing block. Keep the block committed with your work to avoid an uncommitted change on the next agent invocation.
<!-- END:turborepo-agent-rules -->
