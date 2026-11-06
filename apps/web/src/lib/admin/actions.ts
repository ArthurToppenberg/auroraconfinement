'use server';

import { cookies, headers } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { prisma, setFollowUp, setSharing, setStatus } from '@aurora/db';
import {
  adminConfigured,
  createSession,
  passwordMatches,
  sessionCookie,
  sessionSeconds,
  verifySession,
} from '@/lib/admin/session';

// Failed-login throttle: 5 attempts per 15 minutes per client address (in memory).
const failures = new Map<string, number[]>();
const failureWindow = 15 * 60 * 1000;
const maxFailures = 5;

function recentFailures(key: string): number[] {
  const now = Date.now();
  const kept = (failures.get(key) ?? []).filter((t) => now - t < failureWindow);
  if (kept.length) failures.set(key, kept);
  else failures.delete(key);
  return kept;
}

const cookieOptions = {
  path: '/admin',
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
} as const;

/** Server-side password check; only the signed session cookie reaches the browser. */
export async function login(formData: FormData): Promise<void> {
  if (!adminConfigured()) redirect('/admin/login/?error=unavailable');
  const requestHeaders = await headers();
  const key =
    requestHeaders.get('cf-connecting-ip') ??
    requestHeaders.get('x-forwarded-for')?.split(',').pop()?.trim() ??
    'unknown';
  if (recentFailures(key).length >= maxFailures)
    redirect('/admin/login/?error=rate');

  const attempt = formData.get('password');
  if (typeof attempt !== 'string' || !passwordMatches(attempt.slice(0, 256))) {
    failures.set(key, [...recentFailures(key), Date.now()]);
    redirect('/admin/login/?error=1');
  }
  failures.delete(key);
  (await cookies()).set(sessionCookie, createSession(), {
    ...cookieOptions,
    maxAge: sessionSeconds,
  });
  redirect('/admin/');
}

export async function logout(): Promise<void> {
  (await cookies()).set(sessionCookie, '', { ...cookieOptions, maxAge: 0 });
  redirect('/admin/login/');
}

// ------------------------------------------------------------ LOI changes
// Server actions are public endpoints, so each one re-checks the admin session.

async function requireAdmin(): Promise<void> {
  if (!verifySession((await cookies()).get(sessionCookie)?.value))
    redirect('/admin/login/');
}

function loiId(formData: FormData): string {
  const id = formData.get('id');
  if (typeof id !== 'string' || !/^[a-z0-9]{10,40}$/i.test(id))
    redirect('/admin/loi/');
  return id;
}

export async function updateLoiFollowUp(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = loiId(formData);
  const followUp = String(formData.get('followUp') ?? '');
  const notes = String(formData.get('notes') ?? '').trim();
  try {
    await setFollowUp(prisma, id, followUp, notes);
  } catch (error) {
    console.error(
      'admin follow-up failed:',
      error instanceof Error ? error.name : 'unknown',
    );
  }
  revalidatePath(`/admin/loi/${id}`);
  redirect(`/admin/loi/${id}/`);
}

export async function changeLoiSharing(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = loiId(formData);
  try {
    await setSharing(prisma, id, formData.get('permitted') === 'yes');
  } catch (error) {
    console.error(
      'admin sharing failed:',
      error instanceof Error ? error.name : 'unknown',
    );
  }
  revalidatePath(`/admin/loi/${id}`);
  redirect(`/admin/loi/${id}/`);
}

export async function withdrawLoi(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = loiId(formData);
  try {
    await setStatus(prisma, id, 'withdrawn');
  } catch (error) {
    console.error(
      'admin withdraw failed:',
      error instanceof Error ? error.name : 'unknown',
    );
  }
  revalidatePath(`/admin/loi/${id}`);
  redirect(`/admin/loi/${id}/`);
}
