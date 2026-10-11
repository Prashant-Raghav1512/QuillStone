-- Run this once against your Neon database (SQL Editor in the Neon
-- console, or `psql "$DATABASE_URL" -f db/schema.sql`). It is safe to run
-- again, and upgrades a table created from the earlier version of this file.

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS queries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text,
  phone text,
  -- Author / Publisher / Educator, from the free-quote form
  role text,
  -- which form sent it: contact, manuscript or quote
  source text NOT NULL DEFAULT 'contact',
  interest text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now(),
  CONSTRAINT queries_has_contact CHECK (email IS NOT NULL OR phone IS NOT NULL)
);

-- Upgrade path for tables created before the quote form existed: the quote
-- form accepts a WhatsApp number instead of an email.
ALTER TABLE queries ALTER COLUMN email DROP NOT NULL;
ALTER TABLE queries ADD COLUMN IF NOT EXISTS phone text;
ALTER TABLE queries ADD COLUMN IF NOT EXISTS role text;
ALTER TABLE queries ADD COLUMN IF NOT EXISTS source text NOT NULL DEFAULT 'contact';
