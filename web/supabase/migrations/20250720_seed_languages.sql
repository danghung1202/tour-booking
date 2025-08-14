-- Seed the languages table with initial data
INSERT INTO app.languages (name, code)
VALUES 
  ('English', 'en'),
  ('Vietnamese', 'vi'),
  ('French', 'fr'),
  ('Japanese', 'ja'),
  ('Spanish', 'es')
ON CONFLICT (code) DO NOTHING;

-- Add notification for successful seeding
DO $$
BEGIN
  RAISE NOTICE 'Languages seeded successfully';
END $$; 