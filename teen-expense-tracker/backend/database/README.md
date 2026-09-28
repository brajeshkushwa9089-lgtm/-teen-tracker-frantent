# Supabase setup

1. Create a Supabase project and open **SQL Editor**.
2. Run `schema.sql` once in a new project.
3. Copy the project URL, anon key, and service-role key into `backend/.env`.

The API uses a server-only Supabase service-role client in later phases. Never put the service-role key in `frontend/.env`.

The RLS policies are a second protective layer for direct Supabase access. TeenSpend's Express controllers will always identify data from the verified API JWT, never from a client-provided `user_id`.
