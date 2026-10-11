import { neon } from '@neondatabase/serverless';

/**
 * Stores an enquiry from any of the site's forms (contact, manuscript
 * submission, free quote) in the Neon `queries` table (db/schema.sql).
 *
 * Runtime-agnostic: called by the `vite dev` middleware (vite.config.ts), the
 * Vercel function (api/queries.ts) and the Cloudflare Pages Function
 * (functions/api/queries.ts), via server/http.ts.
 */

const SOURCES = new Set(['contact', 'manuscript', 'quote']);

/** Must match HONEYPOT in src/lib/sendEnquiry.ts. */
const HONEYPOT = 'website_url';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type QueryBody = Record<string, unknown>;

/** A trimmed, non-empty string no longer than `max`, or null. */
const required = (v: unknown, max: number) =>
  typeof v === 'string' && v.trim() && v.length <= max ? v.trim() : null;

/** '' when absent, the trimmed string when valid, or null when invalid. */
const optional = (v: unknown, max: number) =>
  v === undefined || v === null || v === '' ? '' : required(v, max);

export async function handleQuery(body: QueryBody, databaseUrl: string | undefined) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return { status: 400, json: { error: 'Missing or invalid fields' } };
  }

  // a bot filled the hidden field: report success and store nothing
  const trap = body[HONEYPOT];
  if (typeof trap === 'string' && trap.trim()) {
    return { status: 201, json: { ok: true } };
  }

  const name = required(body.name, 200);
  const interest = required(body.interest, 200);
  const message = required(body.message, 5000);
  const email = optional(body.email, 320);
  const phone = optional(body.phone, 40);
  const role = optional(body.role, 60);
  const source = typeof body.source === 'string' && SOURCES.has(body.source) ? body.source : 'contact';

  if (
    !name || !interest || !message ||
    email === null || phone === null || role === null ||
    (!email && !phone) ||
    (email && !EMAIL.test(email))
  ) {
    return { status: 400, json: { error: 'Missing or invalid fields' } };
  }

  if (!databaseUrl) {
    return { status: 500, json: { error: 'Server is missing DATABASE_URL' } };
  }

  try {
    const sql = neon(databaseUrl);
    await sql`
      INSERT INTO queries (name, email, phone, role, source, interest, message)
      VALUES (${name}, ${email || null}, ${phone || null}, ${role || null}, ${source}, ${interest}, ${message})
    `;
    return { status: 201, json: { ok: true } };
  } catch (err) {
    console.error('queries insert failed', err);
    return { status: 500, json: { error: 'Failed to save query' } };
  }
}
