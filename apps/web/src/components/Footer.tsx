import Link from 'next/link';
import { contactEmail, homeHero } from '@/content/site';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="footer-groups">
          <div className="footer-brand-group">
            <Link className="footer-brand" href="/">
              <img
                src="/images/logo-symbol.png"
                alt=""
                width="48"
                height="48"
              />
              <span>
                Aurora <strong>Confinement</strong>
              </span>
            </Link>
            <p>
              Making plasma and fusion tangible through teaching, exhibitions
              and outreach.
            </p>
          </div>
          <nav className="footer-explore" aria-label="Footer">
            <h2>Explore</h2>
            <ul>
              <li>
                <Link href="/model/">Exhibition model</Link>
              </li>
              <li>
                <Link href="/research-platform/">Research platform</Link>
              </li>
              <li>
                <Link href="/about/">Team</Link>
              </li>
              <li>
                <Link href="/roadmap/">Roadmap</Link>
              </li>
              <li>
                <Link href={homeHero.primaryHref}>Register interest</Link>
              </li>
            </ul>
          </nav>
          <div className="footer-contact">
            <h2>Contact</h2>
            <a className="footer-contact-email" href={`mailto:${contactEmail}`}>
              {contactEmail}
            </a>
            <a
              className="footer-linkedin"
              href="https://www.linkedin.com/company/auroraconfinement"
            >
              <svg
                aria-hidden="true"
                focusable="false"
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="currentColor"
              >
                <path d="M20.45 2H3.55C2.69 2 2 2.68 2 3.52v16.96c0 .84.69 1.52 1.55 1.52h16.9c.86 0 1.55-.68 1.55-1.52V3.52c0-.84-.69-1.52-1.55-1.52ZM7.93 18.75H4.98V9.2h2.95v9.55ZM6.45 7.9a1.71 1.71 0 1 1 0-3.42 1.71 1.71 0 0 1 0 3.42Zm12.3 10.85H15.8V14.1c0-1.11-.02-2.54-1.55-2.54-1.55 0-1.79 1.21-1.79 2.46v4.73H9.51V9.2h2.83v1.3h.04c.4-.75 1.36-1.55 2.79-1.55 2.98 0 3.58 1.96 3.58 4.51v5.29Z" />
              </svg>
              LinkedIn
            </a>
          </div>
        </div>
        <div className="footer-utility">
          <p>&copy; {new Date().getFullYear()} Aurora Confinement</p>
          <Link href="/privacy">Privacy Notice</Link>
        </div>
      </div>
    </footer>
  );
}
