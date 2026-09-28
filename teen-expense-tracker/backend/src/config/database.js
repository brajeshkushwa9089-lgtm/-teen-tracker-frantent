import { createClient } from '@supabase/supabase-js';
import { env } from './env.js';

if (!env.supabaseUrl || !env.supabaseSecretKey) {
  throw new Error('Supabase server credentials are not configured. Check backend/.env.');
}

// This server-side client must never be imported by the React app.
// Controllers will use it only after verifying the TeenSpend JWT.
export const supabase = createClient(env.supabaseUrl, env.supabaseSecretKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
    detectSessionInUrl: false
  }
});
