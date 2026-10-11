import { useState } from 'react';
import { provider, readConsent, saveConsent, type Consent } from '@/lib/analytics';

/**
 * Minimal consent banner, shown only when Google Analytics 4 is configured
 * (Plausible sets no cookies). GA4 doesn't load until the visitor accepts.
 */
export function CookieNotice() {
  const [open, setOpen] = useState(() => provider === 'ga4' && readConsent() === null);
  if (!open) return null;

  const choose = (consent: Consent) => {
    saveConsent(consent);
    setOpen(false);
  };

  return (
    <div className="cookie-notice" role="region" aria-label="Cookie notice">
      <p>
        We’d like to use Google Analytics cookies to see which pages help authors most. Nothing
        loads unless you accept.
      </p>
      <div className="cookie-notice-actions">
        <button type="button" className="pill" onClick={() => choose('granted')}>
          Accept
        </button>
        <button type="button" className="pill ghost" onClick={() => choose('denied')}>
          Decline
        </button>
      </div>
    </div>
  );
}
