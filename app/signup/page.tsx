'use client'
import { useState, Suspense } from 'react'
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

function SignupContent() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState('')
  const router = useRouter()
  const searchParams = useSearchParams()
  const nextPath = searchParams.get('next') || '/'

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const supabase = createClient()
    // Supabase email/password sign-up — confirmation required
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback?next=${encodeURIComponent(nextPath)}`,
      },
    })

    if (error) {
      setErr(error.message)
      return
    }

    // If confirm-emails are ON, data.session will be null.
    if (!data.session) {
      router.push('/check-email')
      return
    }

    // If confirmation step is disabled we already have a session
    router.push(nextPath)
  }

  return (
    <main className="mx-auto max-w-sm p-4">
      <h1 className="mb-4 text-2xl font-bold">Create Your Account</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3" autoComplete="off">
        <input
          type="email"
          name="signup_email"
          placeholder="Email"
          required
          autoComplete="email"
          className="input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="signup_password"
          placeholder="Password"
          required
          autoComplete="new-password"
          className="input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {err && <p className="text-red-500">{err}</p>}
        <button className="btn-primary">Sign up</button>
      </form>
    </main>
  )
}

export default function Signup() {
  return (
    <Suspense
      fallback={
        <main className="mx-auto max-w-sm p-4">
          <h1 className="mb-4 text-2xl font-bold">Create Your Account</h1>
          <p>Loading...</p>
        </main>
      }
    >
      <SignupContent />
    </Suspense>
  )
}
