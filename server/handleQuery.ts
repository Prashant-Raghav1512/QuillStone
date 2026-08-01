import { neon } from '@neondatabase/serverless';

const INTERESTS = new Set(['Publishing', 'Marketing', 'General']);

export type QueryBody = {
  name?: unknown;
  email?: unknown;
  interest?: unknown;
  message?: unknown;
};

export async function handleQuery(body: QueryBody, databaseUrl: string | undefined) {
  const { name, email, interest, message } = body;

  if (
    typeof name !== 'string' || !name.trim() ||
    typeof email !== 'string' || !email.trim() ||
    typeof message !== 'string' || !message.trim() ||
    typeof interest !== 'string' || !INTERESTS.has(interest)
  ) {
    return { status: 400, json: { error: 'Missing or invalid fields' } };
  }

  if (!databaseUrl) {
    return { status: 500, json: { error: 'Server is missing DATABASE_URL' } };
  }

  try {
    const sql = neon(databaseUrl);
    await sql`
      INSERT INTO queries (name, email, interest, message)
      VALUES (${name.trim()}, ${email.trim()}, ${interest}, ${message.trim()})
    `;
    return { status: 201, json: { ok: true } };
  } catch (err) {
    console.error('queries insert failed', err);
    return { status: 500, json: { error: 'Failed to save query' } };
  }
}
