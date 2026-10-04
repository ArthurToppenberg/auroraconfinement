import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/metadata';
import PageHero from '@/components/PageHero';

export const metadata: Metadata = pageMetadata({
  title: 'Join',
  description:
    'How to start an informal conversation about contributing to the student-led Aurora Confinement initiative.',
  path: '/join/',
});

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Join the conversation"
        title="Complex work needs different ways of thinking."
        intro="Aurora Confinement is student-led, multidisciplinary, and pre-funding. We are open to informal conversations, but no specific paid roles are being advertised."
      />

      <section className="section">
        <div className="shell">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Capabilities</p>
              <h2>Where future contributions may fit.</h2>
            </div>
            <p>
              These are areas relevant to the project, not open-job listings.
              Scope, supervision, time commitment, location, and compensation
              would need to be agreed before any role exists.
            </p>
          </div>
          <div className="grid-3">
            <article className="card">
              <h3>Physics and computation</h3>
              <p>
                Plasma physics, magnetic-confinement concepts, numerical
                methods, and careful technical communication.
              </p>
            </article>
            <article className="card violet">
              <h3>Engineering and prototyping</h3>
              <p>
                Mechanical, electrical, controls, manufacturing, systems,
                testing, safety, and design-for-use thinking.
              </p>
            </article>
            <article className="card magenta">
              <h3>Product and operations</h3>
              <p>
                Exhibition design, technical communication, user research,
                partnerships, project coordination, and responsible
                communications.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell split-section">
          <div>
            <p className="eyebrow">Before you enquire</p>
            <h2>Know what is, and is not, on offer.</h2>
          </div>
          <div className="split-copy">
            <ul className="check-list">
              <li>
                The initiative is currently led by students and is pre-funding.
              </li>
              <li>
                Do not assume that conversations, project work, or future roles
                are paid.
              </li>
              <li>
                No specific vacancies, thesis projects, or internships are
                confirmed on this site.
              </li>
              <li>Location and time expectations have not been finalised.</li>
              <li>
                We are not accepting CVs through the site until an applicant
                privacy and retention process is in place.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section tight">
        <div className="shell callout">
          <p className="eyebrow">Informal conversation</p>
          <h2>Tell us what you are curious about.</h2>
          <p>
            Please send a short, non-confidential note rather than a CV or
            detailed application. We will only present opportunities publicly
            once their status is confirmed.
          </p>
          <a
            className="button primary"
            href="/contact?interest=other-partnership"
          >
            Request a conversation
          </a>
        </div>
      </section>
    </>
  );
}
