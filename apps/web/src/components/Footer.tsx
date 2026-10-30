import Link from 'next/link';
import { contactEmail, contactHrefs } from '@/content/site';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-board">
        <div className="footer-tile footer-statement">
          <p>
            A student-led project bringing together talent from DTU and KU to
            develop physical tools for stellarator research and communication.
          </p>
          <p className="footer-small">
            No DTU or KU endorsement or institutional partnership is implied.
          </p>
          <p className="footer-small">
            &copy; {new Date().getFullYear()} Aurora Confinement. Early-stage,
            student-led, in development.
          </p>
        </div>
        <nav className="footer-tile footer-nav" aria-label="Footer">
          <h2>Explore</h2>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/products">Products</a>
            </li>
            <li>
              <a href="/about/">Team</a>
            </li>
            <li>
              <Link href={contactHrefs.generalEnquiry}>Contact</Link>
            </li>
          </ul>
        </nav>
        <nav className="footer-tile footer-legal" aria-label="Legal">
          <h2>Legal</h2>
          <ul>
            <li>
              <Link href="/privacy">Privacy Notice</Link>
            </li>
          </ul>
        </nav>
        <div className="footer-tile footer-email">
          <h2>Contact</h2>
          <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
        </div>
        <p className="footer-tile footer-name">Aurora Confinement</p>
        <Link
          className="footer-tile footer-invite"
          href={contactHrefs.generalEnquiry}
        >
          <span>Start a conversation</span>
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path d="M5 19 19 5M8 5h11v11" />
          </svg>
        </Link>
      </div>
    </footer>
  );
}
