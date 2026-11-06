'use client';

import { createContext, useContext, useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';

const storageKey = 'aurora.linkedin-consent.v1';
const preferenceDays = 180;
const Context = createContext({
  allowed: false,
  visible: false,
  focusRequested: false,
  openSettings: () => {},
  decide: (_allowed: boolean) => {},
});

function storedChoice(): boolean | null {
  try {
    const raw = localStorage.getItem(storageKey);
    if (!raw) return null;
    const value: unknown = JSON.parse(raw);
    if (!value || typeof value !== 'object') return null;
    const choice = value as Record<string, unknown>;
    return choice['version'] === 1 &&
      typeof choice['allowed'] === 'boolean' &&
      typeof choice['expiresAt'] === 'number' &&
      choice['expiresAt'] > Date.now()
      ? choice['allowed']
      : null;
  } catch {
    return null;
  }
}

export const useLinkedInConsent = () => useContext(Context);

export function CookieSettingsButton() {
  const { openSettings } = useLinkedInConsent();
  const onTeam = /^\/about\/?$/.test(usePathname());
  return (
    <button
      className="cookie-settings-button"
      type="button"
      onClick={openSettings}
    >
      Cookie settings
      {!onTeam && <span className="sr-only"> (opens in a new tab)</span>}
    </button>
  );
}

export function LinkedInConsentPanel() {
  const { visible, focusRequested, decide } = useLinkedInConsent();
  const panel = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (visible && focusRequested) {
      panel.current?.scrollIntoView({ block: 'start' });
      panel.current?.focus({ preventScroll: true });
    }
  }, [visible, focusRequested]);
  if (!visible) return null;
  return (
    <div
      ref={panel}
      id="linkedin-settings"
      className="linkedin-consent field-ice"
      role="region"
      aria-labelledby="linkedin-consent-title"
      tabIndex={-1}
    >
      <h3 id="linkedin-consent-title">Allow LinkedIn posts?</h3>
      <p>
        Embedded posts connect to LinkedIn, which receives your IP address and
        browser information and may use cookies for recognition, analytics and
        advertising. Data may be processed outside the EEA. You can decline and
        still use this website.
      </p>
      <div className="linkedin-consent-actions">
        <button type="button" onClick={() => decide(true)}>
          Accept LinkedIn
        </button>
        <button type="button" onClick={() => decide(false)}>
          Decline LinkedIn
        </button>
      </div>
      <p className="linkedin-consent-details">
        This choice applies only to LinkedIn content. We remember it on this
        device for 180 days. Change it at any time using Cookie settings. See
        our <a href="/privacy/#providers">Privacy Notice</a> and{' '}
        <a
          href="https://www.linkedin.com/legal/cookie-policy"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn cookie policy
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
        .
      </p>
    </div>
  );
}

export default function LinkedInConsent({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [choice, setChoice] = useState<boolean | null>(null);
  const [ready, setReady] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const returnFocus = useRef<HTMLElement | null>(null);
  const about = /^\/about\/?$/.test(pathname);
  const visible = ready && about && (settingsOpen || choice === null);

  useEffect(() => {
    const sync = () => {
      setChoice(storedChoice());
      setReady(true);
    };
    sync();
    if (
      new URLSearchParams(window.location.search).get('privacy') === 'linkedin'
    )
      setSettingsOpen(true);
    const onStorage = (event: StorageEvent) => {
      if (event.key === storageKey || event.key === null) sync();
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const openSettings = () => {
    if (!about) {
      // Keep any in-progress form in this tab intact.
      window.open(
        '/about/?privacy=linkedin#linkedin-settings',
        '_blank',
        'noopener,noreferrer',
      );
      return;
    }
    returnFocus.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    setSettingsOpen(true);
    requestAnimationFrame(() => {
      const panel = document.getElementById('linkedin-settings');
      panel?.scrollIntoView({ block: 'start' });
      panel?.focus({ preventScroll: true });
    });
  };

  const decide = (allowed: boolean) => {
    const decidedAt = Date.now();
    try {
      localStorage.setItem(
        storageKey,
        JSON.stringify({
          version: 1,
          allowed,
          decidedAt,
          expiresAt: decidedAt + preferenceDays * 24 * 60 * 60 * 1000,
        }),
      );
    } catch {
      /* The choice still applies for this visit if storage is unavailable. */
    }
    setChoice(allowed);
    setSettingsOpen(false);
    const previous = returnFocus.current;
    requestAnimationFrame(() => {
      if (previous?.isConnected) previous.focus({ preventScroll: true });
      else
        document
          .getElementById('community-posts-heading')
          ?.focus({ preventScroll: true });
    });
  };

  return (
    <Context.Provider
      value={{
        allowed: ready && choice === true,
        visible,
        focusRequested: settingsOpen,
        openSettings,
        decide,
      }}
    >
      {children}
    </Context.Provider>
  );
}
