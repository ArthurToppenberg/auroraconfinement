'use client';

import { useEffect, useState } from 'react';

const messages: Record<string, string> = {
  '1': 'That password was not accepted.',
  rate: 'Too many attempts. Wait a few minutes and try again.',
  unavailable: 'Admin access is not configured on this server.',
};

/** Shows the server's login failure reason, passed back as ?error=<code>. */
export default function AdminLoginError() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('error');
    setMessage((code && messages[code]) || '');
  }, []);

  return (
    <p className="field-error" id="admin-password-error" role="alert">
      {message}
    </p>
  );
}
