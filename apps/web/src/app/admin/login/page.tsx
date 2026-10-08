import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/metadata';
import PageHero from '@/components/PageHero';
import AdminLoginError from '@/components/AdminLoginError';
import { login } from '@/lib/admin/actions';

export const metadata: Metadata = pageMetadata({
  title: 'Admin sign in',
  description: 'Restricted area.',
  path: '/admin/login/',
  noindex: true,
});

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Admin"
        title="Restricted area."
        intro="Enter the admin password to continue."
        compact
      />
      <section className="section">
        <div className="shell-narrow">
          <form action={login} autoComplete="off">
            <div className="field">
              <label htmlFor="admin-password">Password</label>
              <input
                id="admin-password"
                name="password"
                type="password"
                required
                maxLength={256}
                autoComplete="current-password"
                aria-describedby="admin-password-error"
              />
              <AdminLoginError />
            </div>
            <div className="button-row">
              <button className="button primary" type="submit">
                Sign in
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
