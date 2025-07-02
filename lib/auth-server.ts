import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function getCurrentUser() {
  const supabase = await createClient()

  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser()

    // AuthSessionMissingError is expected when no session exists
    if (error && error.message === 'Auth session missing!') {
      return null
    }

    if (error) {
      console.error('Error getting user:', error)
      return null
    }

    return user
  } catch (error) {
    console.error('Error in getCurrentUser:', error)
    return null
  }
}

export async function requireAuth(redirectTo = '/login') {
  const user = await getCurrentUser()

  if (!user) {
    redirect(redirectTo)
  }

  return user
}
