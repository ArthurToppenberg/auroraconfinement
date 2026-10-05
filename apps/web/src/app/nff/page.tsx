import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { pageMetadata } from '@/lib/metadata';
import InterestForm from '@/components/InterestForm';

type IconName =
  | 'experiment'
  | 'access'
  | 'collaboration'
  | 'visibility'
  | 'communication'
  | 'education';

function ProductIcon({ name }: { name: IconName }) {
  const paths = {
    experiment: (
      <>
        <path d="M9 3v4.5l-4 7A3 3 0 0 0 7.6 19h8.8a3 3 0 0 0 2.6-4.5l-4-7V3" />
        <path d="M8 12h8M8 3h8" />
      </>
    ),
    access: (
      <>
        <path d="M4 12h16M8 8l-4 4 4 4M16 8l4 4-4 4" />
      </>
    ),
    collaboration: (
      <>
        <circle cx="6" cy="12" r="2" />
        <circle cx="18" cy="6" r="2" />
        <circle cx="18" cy="18" r="2" />
        <path d="m8 11 8-4M8 13l8 4" />
      </>
    ),
    visibility: (
      <>
        <path d="M2.5 12s3.5-5 9.5-5 9.5 5 9.5 5-3.5 5-9.5 5-9.5-5-9.5-5Z" />
        <circle cx="12" cy="12" r="2.5" />
      </>
    ),
    communication: (
      <>
        <path d="M4 5h16v11H9l-5 4V5Z" />
        <path d="M8 9h8M8 12h5" />
      </>
    ),
    education: (
      <>
        <path d="m3 8 9-4 9 4-9 4-9-4Z" />
        <path d="M7 10.5V15c2.5 2 7.5 2 10 0v-4.5M21 8v6" />
      </>
    ),
  } satisfies Record<IconName, ReactNode>;

  return (
    <svg
      aria-hidden="true"
      className="nff-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
}

export const metadata: Metadata = pageMetadata({
  title: 'Nordic Fusion Forum 2026',
  description:
    'Continue your conversation with Aurora Confinement after Nordic Fusion Forum 2026 and register non-binding institutional interest.',
  path: '/nff/',
});

export default function Page() {
  return (
    <>
      <section className="nff-top">
        <div className="nff-shell nff-top-grid">
          <div className="nff-intro-copy">
            <p className="eyebrow">NORDIC FUSION FORUM 2026</p>
            <h1>Thank you for the conversation.</h1>
            <p className="nff-intro-lead">
              It was a pleasure meeting you at Nordic Fusion Forum 2026. Aurora
              Confinement is developing more accessible stellarator research
              platforms, together with physical models that make the technology
              easier to communicate and teach.
            </p>
            <p>
              If one of these directions could be relevant to your organisation,
              we would be glad to continue the conversation.
            </p>
          </div>
          <div className="nff-form-column" id="interest">
            <div className="nff-form-heading">
              <p className="eyebrow">REGISTER INTEREST</p>
              <h2>Continue the conversation</h2>
              <p>
                Tell us how our work could be relevant to your organisation.
              </p>
            </div>
            <InterestForm variant="nff" />
          </div>
        </div>
      </section>

      <section className="nff-products" aria-labelledby="nff-products-title">
        <div className="nff-shell">
          <h2 id="nff-products-title">What we are building</h2>
          <div className="nff-product-grid">
            <article className="card nff-product-card">
              <div className="nff-card-label">
                <ProductIcon name="experiment" />
                <p className="eyebrow">EXPERIMENTAL RESEARCH</p>
              </div>
              <h3>Accessible stellarator research platforms</h3>
              <p className="nff-card-intro">
                Compact experimental systems designed for more accessible
                hands-on stellarator research.
              </p>
              <ul className="nff-benefits">
                <li>
                  <ProductIcon name="access" />
                  <span>
                    Designed to reduce infrastructure and acquisition barriers
                  </span>
                </li>
                <li>
                  <ProductIcon name="experiment" />
                  <span>
                    Intended for experiments, training and student research
                  </span>
                </li>
                <li>
                  <ProductIcon name="collaboration" />
                  <span>
                    Developed for universities, startups and research teams
                  </span>
                </li>
              </ul>
              <p className="nff-card-status">
                Current stage: early-stage development through research
                collaboration
              </p>
            </article>
            <article className="card nff-product-card">
              <div className="nff-card-label">
                <ProductIcon name="visibility" />
                <p className="eyebrow">EXHIBITION AND COMMUNICATION</p>
              </div>
              <h3>Tabletop stellarator models</h3>
              <p className="nff-card-intro">
                Physical models that make complex stellarator technology easier
                to see and explain.
              </p>
              <ul className="nff-benefits">
                <li>
                  <ProductIcon name="visibility" />
                  <span>
                    Create a focal point at exhibitions and conferences
                  </span>
                </li>
                <li>
                  <ProductIcon name="communication" />
                  <span>
                    Support public engagement and technical communication
                  </span>
                </li>
                <li>
                  <ProductIcon name="education" />
                  <span>
                    Provide a visual aid for introductory university teaching
                  </span>
                </li>
              </ul>
              <p className="nff-card-status">
                Purpose: communication and teaching, not experimental research
              </p>
            </article>
          </div>
          <div className="nff-products-cta">
            <a className="button" href="/products">
              Explore our products
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
