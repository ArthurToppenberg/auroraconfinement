import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/metadata';
import PageHero from '@/components/PageHero';
import { contactEmail } from '@/content/site';

export const metadata: Metadata = pageMetadata({
  title: 'Accessibility statement',
  description:
    "Aurora Confinement's initial accessibility target, testing status, and reporting route.",
  path: '/accessibility/',
});

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Accessibility"
        title="Access is part of the work."
        intro="We are designing this website toward WCAG 2.2 Level AA, but we do not yet claim complete conformance."
        compact
      />
      <section className="section">
        <div className="shell-narrow prose">
          <p className="notice">
            <strong>Status:</strong> This is an initial statement for a
            pre-release local website. A formal assessment date is still
            required.
          </p>
          <h2>Our target</h2>
          <p>
            The site is intended to support keyboard navigation, visible focus,
            semantic structure, sufficient contrast, useful alternative text,
            labelled forms, responsive reflow, browser zoom, reduced motion, and
            understandable validation messages.
          </p>
          <h2>Testing completed for this version</h2>
          <p>
            The local release is checked with automated build and type tools,
            automated accessibility analysis, keyboard navigation,
            reduced-motion settings, and visual review at the specified mobile,
            tablet, and desktop sizes. These checks reduce risk but do not prove
            full conformance.
          </p>
          <h2>Known limitations</h2>
          <ul>
            <li>
              A dated audit with assistive-technology users has not yet been
              completed.
            </li>
          </ul>
          <h2>Report a problem</h2>
          <p>
            If you encounter a barrier, email{' '}
            <a href={`mailto:${contactEmail}`}>{contactEmail}</a>. Include the
            page, what you were trying to do, your browser or assistive
            technology if you are comfortable sharing it, and the format you
            need.
          </p>
          <h2>Assessment details</h2>
          <p>
            <strong>Assessment date:</strong> to be confirmed after pre-launch
            review.
            <br />
            <strong>Method:</strong> automated and manual review; final scope to
            be documented.
            <br />
            <strong>Next review:</strong> to be scheduled before public launch.
          </p>
        </div>
      </section>
    </>
  );
}
