import { BASE } from '@/lib/assets';
import { SITE } from '@/config/site';
import { track } from '@/lib/analytics';

/** Which form an enquiry came from. Stored with it, and used to label emails. */
export type EnquirySource = 'contact' | 'manuscript' | 'quote';

export interface Enquiry {
  source: EnquirySource;
  name: string;
  /** at least one of email / phone is required */
  email?: string;
  phone?: string;
  /** Author, Publisher or Educator (quote form) */
  role?: string;
  /** the topic or service, used in the email subject */
  interest: string;
  message: string;
  /** the honeypot field's value. People never see it, so anything here came from a bot. */
  honeypot?: string;
}

export type SendResult = { status: 'sent' } | { status: 'failed'; mailto: string };

/**
 * Name of the hidden honeypot input (see <Honeypot/> in components/FormParts.tsx).
 * server/handleQuery.ts checks the same name.
 */
export const HONEYPOT = 'website_url';

export const readHoneypot = (form: HTMLFormElement) =>
  String(new FormData(form).get(HONEYPOT) ?? '').trim();

const WEB3FORMS = 'https://api.web3forms.com/submit';
const ENDPOINT = (import.meta.env.VITE_FORM_ENDPOINT ?? '').trim();
const ACCESS_KEY = (import.meta.env.VITE_FORM_ACCESS_KEY ?? '').trim();

/**
 * Where enquiries are POSTed, in order of preference:
 *
 * 1. VITE_FORM_ENDPOINT, e.g. https://formspree.io/f/abcdwxyz, or `api/queries`
 *    for the Neon handler deployed on Vercel / Cloudflare (see server/).
 * 2. Web3Forms, when VITE_FORM_ACCESS_KEY is set.
 * 3. The local Neon API served by `vite dev`.
 *
 * Full URLs are used as they are. A path without a leading slash resolves
 * against the site's base (/QuillStone/ on GitHub Pages), and one with a
 * leading slash resolves against the domain root.
 */
function endpointUrl(): URL | null {
  const raw = ENDPOINT || (ACCESS_KEY ? WEB3FORMS : import.meta.env.DEV ? 'api/queries' : '');
  if (!raw) return null;
  try {
    return new URL(raw, location.origin + BASE);
  } catch {
    return null;
  }
}

const SOURCE_LABEL: Record<EnquirySource, string> = {
  contact: 'Enquiry',
  manuscript: 'Manuscript submission',
  quote: 'Quote request',
};

const subjectOf = (e: Enquiry) => `${SOURCE_LABEL[e.source]}: ${e.interest}`;

/** The fields every endpoint gets, minus blanks. */
function fieldsOf(e: Enquiry) {
  const fields: Record<string, string> = {
    source: e.source,
    name: e.name,
    email: e.email ?? '',
    phone: e.phone ?? '',
    role: e.role ?? '',
    interest: e.interest,
    message: e.message,
  };
  return Object.fromEntries(Object.entries(fields).filter(([, v]) => v));
}

/** Hosted form services each have a few fields of their own on top of ours. */
function payloadFor(url: URL, e: Enquiry) {
  const fields = fieldsOf(e);
  if (url.hostname.endsWith('web3forms.com')) {
    return { access_key: ACCESS_KEY, subject: subjectOf(e), from_name: `${SITE.name} website`, ...fields };
  }
  if (url.hostname.endsWith('formspree.io')) {
    return { _subject: subjectOf(e), ...(e.email ? { _replyto: e.email } : {}), ...fields };
  }
  return fields; // our own API: server/handleQuery.ts
}

/** A pre-filled email to fall back on when the form can't reach any endpoint. */
function mailtoFor(e: Enquiry) {
  const lines = [
    'Name: ' + e.name,
    e.email ? 'Email: ' + e.email : null,
    e.phone ? 'Phone / WhatsApp: ' + e.phone : null,
    e.role ? 'I am: ' + e.role : null,
    'Topic: ' + e.interest,
    '',
    e.message,
  ].filter((l): l is string => typeof l === 'string');
  return (
    `mailto:${SITE.email}?subject=${encodeURIComponent(subjectOf(e))}` +
    `&body=${encodeURIComponent(lines.join('\n'))}`
  );
}

/**
 * Sends an enquiry to the configured endpoint (see endpointUrl above).
 *
 * Resolves to 'sent' once the endpoint accepts it. If there is no endpoint, or
 * the request fails, it resolves to 'failed' with a pre-filled mailto: link,
 * which the form shows as a last resort. It never navigates away by itself, so
 * what the visitor typed stays on screen.
 */
export async function sendEnquiry(enquiry: Enquiry): Promise<SendResult> {
  // a bot filled the hidden field: report success and send nothing
  if (enquiry.honeypot) return { status: 'sent' };

  const url = endpointUrl();
  if (url) {
    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), 15000);
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payloadFor(url, enquiry)),
        signal: controller.signal,
      });
      const data: unknown = await res.json().catch(() => null);
      // Web3Forms reports some failures as { success: false }
      const refused = !!data && typeof data === 'object' && (data as { success?: unknown }).success === false;
      if (res.ok && !refused) {
        track('form_submit', { form: enquiry.source });
        return { status: 'sent' };
      }
      console.warn('Enquiry was not accepted', res.status, data);
    } catch (err) {
      console.warn('Enquiry could not be sent', err);
    } finally {
      clearTimeout(timer);
    }
  } else {
    console.warn('No form endpoint configured. Set VITE_FORM_ENDPOINT or VITE_FORM_ACCESS_KEY.');
  }

  track('form_submit_failed', { form: enquiry.source });
  return { status: 'failed', mailto: mailtoFor(enquiry) };
}
