import { Suspense } from 'react'
import Link from '@/components/Link'
import { signup } from '../login/actions'

function SignupForm({ searchParams }: { searchParams: { error?: string; next?: string } }) {
  return (
    <main className="mx-auto max-w-sm p-4">
      <h1 className="mb-4 text-2xl font-bold">Create Your Account</h1>

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
          autoComplete="new-password"
          className="input"
        />
        {searchParams.error && <p className="text-red-500">{searchParams.error}</p>}
        <button formAction={signup} className="btn-primary">
          Sign up
        </button>
      </form>

      <p className="mt-4 text-center text-sm">
        Already have an account?{' '}
        <Link
          href={`/login${searchParams.next ? `?next=${encodeURIComponent(searchParams.next)}` : ''}`}
          className="text-primary-600 dark:text-primary-400 underline"
        >
          Log in
        </Link>
      </p>
    </main>
  )
}

export default async function Signup({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string }>
}) {
  const resolvedSearchParams = await searchParams

  return (
    <Suspense
      fallback={
        <main className="mx-auto max-w-sm p-4">
          <h1 className="mb-4 text-2xl font-bold">Create Your Account</h1>
          <p>Loading...</p>
        </main>
      }
    >
      <SignupForm searchParams={resolvedSearchParams} />
    </Suspense>
  )
}
