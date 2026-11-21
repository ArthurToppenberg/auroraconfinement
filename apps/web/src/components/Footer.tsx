import Link from 'next/link';
import { CookieSettingsButton } from '@/components/LinkedInConsent';
import LinkedInIcon from '@/components/LinkedInIcon';
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
              <LinkedInIcon />
              LinkedIn
            </a>
          </div>
        </div>
        <div className="footer-utility">
          <p>&copy; {new Date().getFullYear()} Aurora Confinement</p>
          <div className="footer-privacy-links">
            <Link href="/privacy">Privacy Notice</Link>
            <CookieSettingsButton />
          </div>
        </div>
      </div>
    </footer>
  );
}
