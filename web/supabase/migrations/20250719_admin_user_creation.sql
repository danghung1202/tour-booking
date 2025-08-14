-- This migration file is designed to be used once to set up an initial admin user.
-- SECURITY WARNING: This grants full administrative privileges to the specified user.

-- Replace 'USER_EMAIL_HERE' with the actual email of the registered user to be promoted to admin
UPDATE app.profiles
SET role = 'admin'
WHERE id = (
  SELECT id 
  FROM auth.users 
  WHERE email = 'USER_EMAIL_HERE'
);

-- Alternatively, you can directly use the user's UUID if known
-- UPDATE app.profiles
-- SET role = 'admin'
-- WHERE id = 'USER_UUID_HERE'; 