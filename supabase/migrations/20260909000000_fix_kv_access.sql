-- Fix kv_store access: disable RLS and grant full access to anon/authenticated roles
-- This allows the admin panel to write directly to the database

ALTER TABLE IF EXISTS kv_store_9255bd65 DISABLE ROW LEVEL SECURITY;

GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE kv_store_9255bd65 TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE kv_store_9255bd65 TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE kv_store_9255bd65 TO service_role;
