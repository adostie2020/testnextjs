// app/login/page.tsx
import { Suspense } from 'react'
import Link from '@/components/Link'
import { login } from './actions'

function Loading() {
  return <h2>🌀 Loading login page...</h2>
}

function LoginForm({ searchParams }: { searchParams: { error?: string; next?: string } }) {
  return (
    <main className="mx-auto max-w-sm p-4">
      <h1 className="mb-4 text-2xl font-bold">Log In</h1>
      <form className="flex flex-col gap-3" autoComplete="off">
        <input type="hidden" name="next" value={searchParams.next || '/'} />
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          required
          autoComplete="email"
          className="input"
        />
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          required
          autoComplete="current-password"
          className="input"
        />
        {searchParams.error && <p className="text-red-500">{searchParams.error}</p>}
        <button formAction={login} className="btn-primary">
          Log in
        </button>
      </form>
      <p className="mt-4 text-center text-sm">
        Don't have an account?{' '}
        <Link
          href={`/signup${searchParams.next ? `?next=${encodeURIComponent(searchParams.next)}` : ''}`}
          className="text-primary-600 dark:text-primary-400 underline"
        >
          Sign up
        </Link>
      </p>
    </main>
  )
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string }>
}) {
  const resolvedSearchParams = await searchParams

  return (
    <Suspense fallback={<Loading />}>
      <LoginForm searchParams={resolvedSearchParams} />
    </Suspense>
  )
}
