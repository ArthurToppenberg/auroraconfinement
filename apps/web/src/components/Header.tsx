'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { contactHrefs } from '@/content/site';

const links = [
  { href: '/products', label: 'Products' },
  { href: '/about', label: 'About' },
  { href: '/privacy', label: 'Privacy' },
] as const;

export default function Header() {
  const path = (usePathname() ?? '/').replace(/(.)\/$/, '$1');
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLElement>(null);
  const wasOpen = useRef(false);

  function isCurrent(href: string) {
    return path === href || path.startsWith(`${href}/`);
  }

  useEffect(() => {
    if (open && !wasOpen.current) menuRef.current?.querySelector('a')?.focus();
    wasOpen.current = open;
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKeydown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }
    document.addEventListener('keydown', onKeydown);
    return () => document.removeEventListener('keydown', onKeydown);
  }, [open]);

  return (
    <header
      className="site-header"
      data-site-header
      {...(open && { 'data-menu-open': '' })}
    >
      <div className="shell header-inner">
        <a className="brand" href="/" aria-label="Aurora Confinement, home">
          <img src="/images/logo-symbol.png" alt="" width="48" height="48" />
          <span>
            Aurora <strong>Confinement</strong>
          </span>
        </a>
        <button
          ref={buttonRef}
          className="menu-button"
          type="button"
          aria-expanded={open}
          aria-controls="primary-navigation"
          data-menu-button
          onClick={() => setOpen((current) => !current)}
        >
          <span className="sr-only">
            {open ? 'Close navigation' : 'Open navigation'}
          </span>
          <span aria-hidden="true" className="menu-icon"></span>
        </button>
        <nav
          ref={menuRef}
          id="primary-navigation"
          className="primary-nav"
          aria-label="Primary"
          data-menu
          onClick={(event) => {
            if ((event.target as Element).closest('a')) setOpen(false);
          }}
        >
          <ul>
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={isCurrent(link.href) ? 'page' : undefined}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <Link
                href={contactHrefs.generalEnquiry}
                className="nav-cta"
                aria-current={path === '/contact' ? 'page' : undefined}
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
