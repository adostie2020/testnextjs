'use client'
import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Link from '@/components/Link'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState('')

  const router = useRouter()
  const searchParams = useSearchParams()
  const nextPath = searchParams.get('next') || '/'
  const errorParam = searchParams.get('error')

  // Handle auth callback errors
  useEffect(() => {
    if (errorParam === 'auth_callback_error') {
      setErr('Authentication failed. Please try logging in again.')
    }
  }, [errorParam])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const supabase = createClient()
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setErr(error.message)
      return
    }

    if (data.session) {
      router.push(nextPath)
    }
  }

  return (
    <main className="mx-auto max-w-sm p-4">
      <h1 className="mb-4 text-2xl font-bold">Log In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3" autoComplete="off">
        <input
          type="email"
          name="login_email"
          placeholder="Email"
          required
          autoComplete="email"
          className="input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="login_password"
          placeholder="Password"
          required
          autoComplete="current-password"
          className="input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {err && <p className="text-red-500">{err}</p>}
        <button className="btn-primary">Log in</button>
      </form>
      <p className="mt-4 text-center text-sm">
        Don't have an account?{' '}
        <Link
          href={`/signup?next=${encodeURIComponent(nextPath)}`}
          className="text-primary-600 dark:text-primary-400 underline"
        >
          Sign up
        </Link>
      </p>
    </main>
  )
}
