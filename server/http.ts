import { handleQuery } from './handleQuery.js';

/**
 * Web-standard (Request -> Response) wrapper around handleQuery, shared by the
 * Vercel and Cloudflare adapters.
 *
 * ALLOWED_ORIGIN (optional, comma-separated) lets a site on another origin
 * post here, e.g. the GitHub Pages site at https://<user>.github.io posting
 * to an API on Vercel. Leave it unset when the site and API share a domain.
 */
export interface QueryEnv {
  DATABASE_URL?: string;
  ALLOWED_ORIGIN?: string;
}

function corsHeaders(request: Request, env: QueryEnv): Record<string, string> {
  const origin = request.headers.get('Origin');
  const allowed = (env.ALLOWED_ORIGIN ?? '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  if (!origin || !allowed.includes(origin)) return {};
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Accept',
    'Access-Control-Max-Age': '86400',
    Vary: 'Origin',
  };
}

export async function respondToQuery(request: Request, env: QueryEnv): Promise<Response> {
  const cors = corsHeaders(request, env);
  if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });

  const reply = (status: number, json: unknown) =>
    new Response(JSON.stringify(json), {
      status,
      headers: { 'Content-Type': 'application/json', ...cors },
    });

  if (request.method !== 'POST') return reply(405, { error: 'Method not allowed' });

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return reply(400, { error: 'Invalid JSON' });
  }
  const result = await handleQuery(body as Record<string, unknown>, env.DATABASE_URL);
  return reply(result.status, result.json);
}
