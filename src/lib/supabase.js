import { createClient } from '@supabase/supabase-js'
import { SUPABASE_URL, SUPABASE_ANON_KEY, isSupabaseConfigured } from './env'

// O site funciona mesmo sem Supabase configurado (usa os dados-semente).
// Ao preencher as variáveis em .env, o cardápio passa a vir do banco.
export { isSupabaseConfigured }

export const supabase = isSupabaseConfigured
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: { persistSession: true, autoRefreshToken: true }
    })
  : null

export const STORAGE_BUCKET = 'images'
