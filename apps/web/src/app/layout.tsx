import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { siteName, siteOrigin } from '@/content/site';
import '@/styles/global.css';

export const viewport: Viewport = {
  width: 'device-width',
  themeColor: '#050914',
};

export const metadata: Metadata = {
  icons: { icon: { url: '/favicon.png', type: 'image/png' } },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="no-js">
      <body itemScope itemType="https://schema.org/WebSite">
        <meta itemProp="name" content={siteName} />
        {siteOrigin && <meta itemProp="url" content={siteOrigin} />}
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        <Header />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
