import { createClient } from "@supabase/supabase-js";
const VITE_PUBLIC_SUPABASE_URL = import.meta.env.VITE_PUBLIC_SUPABASE_URL;
const VITE_PUBLIC_SUPABASE_PUBLISHABLE_KEY = import.meta.env
  .VITE_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

export const supabase = createClient(
  VITE_PUBLIC_SUPABASE_URL,
  VITE_PUBLIC_SUPABASE_PUBLISHABLE_KEY
);
