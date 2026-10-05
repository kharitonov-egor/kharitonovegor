import type { SupabaseClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabaseConfigured = Boolean(url && anonKey)

let client: Promise<SupabaseClient> | null = null

export function getSupabase(): Promise<SupabaseClient> {
  if (!url || !anonKey) return Promise.reject(new Error('Supabase is not configured'))
  if (!client) {
    client = import('@supabase/supabase-js').then(({ createClient }) => createClient(url, anonKey))
  }
  return client
}
