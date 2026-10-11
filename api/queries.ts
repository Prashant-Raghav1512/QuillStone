// Vercel Function: POST /api/queries -> Neon (see server/handleQuery.ts).
// Set DATABASE_URL (and ALLOWED_ORIGIN if the site lives on another domain)
// in the Vercel project's environment variables.
import { respondToQuery } from '../server/http.js';

const handle = (request: Request) =>
  respondToQuery(request, {
    DATABASE_URL: process.env.DATABASE_URL,
    ALLOWED_ORIGIN: process.env.ALLOWED_ORIGIN,
  });

export const POST = handle;
export const OPTIONS = handle;
