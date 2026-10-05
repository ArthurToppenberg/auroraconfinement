import Link from 'next/link';
import { contactEmail, contactHrefs } from '@/content/site';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <a
            className="brand footer-brand"
            href="/"
            aria-label="Aurora Confinement, home"
          >
            <img
              src="/images/logo-symbol.png"
              alt=""
              width="48"
              height="48"
              loading="lazy"
            />
            <span>
              Aurora <strong>Confinement</strong>
            </span>
          </a>
          <p>
            A 13-person student-led project developing physical tools for
            stellarator research and communication.
          </p>
          <p className="muted">
            No DTU endorsement or institutional partnership is implied.
          </p>
        </div>
        <nav aria-label="Footer">
          <h2>Explore</h2>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/products">Products</a>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <Link href={contactHrefs.generalEnquiry}>Contact</Link>
            </li>
          </ul>
        </nav>
        <div className="footer-contact">
          <h2>Contact</h2>
          <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
        </div>
        <nav className="footer-legal" aria-label="Legal">
          <h2>Legal</h2>
          <ul>
            <li>
              <Link href="/privacy">Privacy Notice</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="shell footer-base">
        <p>&copy; {new Date().getFullYear()} Aurora Confinement</p>
        <p>Early-stage · Student-led · In development</p>
      </div>
    </footer>
  );
}
