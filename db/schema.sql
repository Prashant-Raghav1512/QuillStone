-- Run this once against your Neon database (SQL Editor in the Neon
-- console, or `psql "$DATABASE_URL" -f db/schema.sql`).

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS queries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  interest text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);
