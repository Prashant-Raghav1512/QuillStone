// Cloudflare Pages Function: POST /api/queries -> Neon (see server/handleQuery.ts).
// Set DATABASE_URL (and ALLOWED_ORIGIN if the site lives on another domain)
// under Settings -> Environment variables in the Pages project.
import { respondToQuery, type QueryEnv } from '../../server/http.js';

type Context = { request: Request; env: QueryEnv };

export const onRequestPost = ({ request, env }: Context) => respondToQuery(request, env);
export const onRequestOptions = ({ request, env }: Context) => respondToQuery(request, env);
