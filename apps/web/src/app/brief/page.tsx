import type { Metadata } from 'next';
import PrintButton from '@/components/PrintButton';
import { pageMetadata } from '@/lib/metadata';
import { contactEmail } from '@/content/site';

export const metadata: Metadata = pageMetadata({
  title: 'One-page overview',
  description:
    "A concise, print-friendly overview of Aurora Confinement's purpose, product directions, stage, and collaboration interests.",
  path: '/brief/',
});

export default function Page() {
  return (
    <>
      <article className="brief shell">
        <header className="brief-header">
          <img src="/images/logo-symbol.png" alt="" width="84" height="84" />
          <div>
            <p className="eyebrow">One-page overview · October 2026</p>
            <h1>Aurora Confinement</h1>
            <p className="lede">
              Making stellarator technology tangible and accessible.
            </p>
          </div>
        </header>
        <section>
          <h2>The problem</h2>
          <p>
            Stellarator technology is complex, and access to physical models and
            experimental systems is limited. This can make technical
            communication, workforce development, and hands-on investigation
            harder.
          </p>
        </section>
        <section className="brief-grid">
          <div>
            <h2>Tabletop stellarator models</h2>
            <p>
              <strong>Current focus, in development.</strong> Physical models
              designed for fusion companies, research institutions, and
              universities to use at exhibitions, visitor facilities,
              conferences, public engagement, and introductory lectures.
            </p>
          </div>
          <div>
            <h2>Experimental stellarator platforms</h2>
            <p>
              <strong>Current focus, early-stage development.</strong> Compact
              experimental systems being developed for universities, startups,
              and research teams seeking more accessible hands-on stellarator
              research.
            </p>
          </div>
        </section>
        <section>
          <h2>Intended users</h2>
          <p>
            Fusion companies, research institutions, universities, startups,
            conferences, visitor facilities, science centres, and other
            organisations interested in communication, experimentation, or
            collaboration.
          </p>
        </section>
        <section className="brief-grid">
          <div>
            <h2>Current stage</h2>
            <p>
              Pre-incorporation, pre-funding, and in formation. Both product
              directions are current priorities at different stages of
              development. No completed product, performance, customer,
              partnership, or regulatory claims are made.
            </p>
          </div>
          <div>
            <h2>The team</h2>
            <p>
              A multidisciplinary, student-led initiative formed by 13 students
              at the Technical University of Denmark and based in Kongens
              Lyngby. No DTU endorsement is implied.
            </p>
          </div>
        </section>
        <section className="brief-grid">
          <div>
            <h2>Near-term objectives</h2>
            <ul>
              <li>Refine exhibition and communication use cases</li>
              <li>Understand experimental research requirements</li>
              <li>Continue responsible development of both directions</li>
              <li>Prepare approved technical and product claims</li>
            </ul>
          </div>
          <div>
            <h2>What we are seeking</h2>
            <ul>
              <li>Exhibition and research conversations</li>
              <li>Early, non-binding institutional interest</li>
              <li>Requirements and technical feedback</li>
              <li>Potential collaboration and investment dialogue</li>
            </ul>
          </div>
        </section>
        <section className="brief-contact">
          <h2>Continue the conversation</h2>
          <p>
            <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
          </p>
          <p>Expressions of interest are non-binding. No payment is taken.</p>
        </section>
        <p className="no-print">
          <PrintButton />
          <a className="button" href="/contact">
            Contact us
          </a>
        </p>
      </article>
    </>
  );
}
