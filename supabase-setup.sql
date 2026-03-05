-- Run this in Supabase SQL Editor: supabase.com → Your Project → SQL Editor

CREATE TABLE IF NOT EXISTS contact_messages (
  id          BIGSERIAL PRIMARY KEY,
  name        TEXT NOT NULL,
  email       TEXT NOT NULL,
  subject     TEXT NOT NULL,
  message     TEXT NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS subscribers (
  id              BIGSERIAL PRIMARY KEY,
  email           TEXT UNIQUE NOT NULL,
  subscribed_at   TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS project_views (
  id          BIGSERIAL PRIMARY KEY,
  project_id  INT NOT NULL,
  viewed_at   TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_views ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public insert contact" ON contact_messages FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "public insert subscribers" ON subscribers FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "public insert views" ON project_views FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "public select views" ON project_views FOR SELECT TO anon USING (true);
