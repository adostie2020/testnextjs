'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient()

  // Type-casting here for convenience
  // In practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const next = (formData.get('next') as string) || '/'

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect(`/login?error=${encodeURIComponent(error.message)}&next=${encodeURIComponent(next)}`)
  }

  revalidatePath('/', 'layout')
  redirect(next)
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  // Type-casting here for convenience
  // In practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const next = (formData.get('next') as string) || '/'

  const { error } = await supabase.auth.signUp({
    ...data,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/auth/callback?next=${encodeURIComponent(next)}`,
    },
  })

  if (error) {
    redirect(`/signup?error=${encodeURIComponent(error.message)}&next=${encodeURIComponent(next)}`)
  }

  revalidatePath('/', 'layout')
  redirect('/check-email')
}

export async function logout() {
  const supabase = await createClient()

  const { error } = await supabase.auth.signOut()

  if (error) {
    console.error('Error logging out:', error)
  }

  revalidatePath('/', 'layout')
  redirect('/')
}
