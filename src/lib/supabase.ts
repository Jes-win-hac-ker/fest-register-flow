import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database Types
export interface Registration {
  id?: string
  name: string
  email: string
  city: string
  tickets: number
  created_at?: string
  updated_at?: string
}

// Database Functions
export const insertRegistration = async (registration: Omit<Registration, 'id' | 'created_at' | 'updated_at'>) => {
  const { data, error } = await supabase
    .from('registrations')
    .insert([registration])
    .select()

  if (error) {
    console.error('Supabase error:', error)
    throw error
  }

  return data[0]
}

export const getAllRegistrations = async () => {
  const { data, error } = await supabase
    .from('registrations')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Supabase error:', error)
    throw error
  }

  return data
}