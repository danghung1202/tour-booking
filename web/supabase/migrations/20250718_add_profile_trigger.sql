-- This script creates a trigger to automatically create a profile for a new user.

-- 1. Create a function that inserts a new row into app.profiles
create function app.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = app
as $$
begin
  -- When a new user signs up in auth.users, insert a corresponding profile
  -- into app.profiles with the default role of 'tourist'.
  insert into app.profiles (id, role)
  values (new.id, 'tourist');
  return new;
end;
$$;

-- 2. Create a trigger that calls the function whenever a new user is created
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure app.handle_new_user(); 