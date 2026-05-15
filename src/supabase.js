import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Initialize the Supabase client only if keys are present
export const supabase = (supabaseUrl && supabaseUrl !== 'your_supabase_url_here') 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;
