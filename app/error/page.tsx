import Link from '@/components/Link'

export default function ErrorPage({ searchParams }: { searchParams: { error?: string } }) {
  return (
    <main className="mx-auto max-w-md p-4 text-center">
      <h1 className="mb-4 text-2xl font-bold text-red-600">Authentication Error</h1>

      <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/20">
        <p className="text-red-800 dark:text-red-200">
          {searchParams.error || 'An error occurred during authentication. Please try again.'}
        </p>
      </div>

      <div className="space-y-2">
        <p className="text-gray-600 dark:text-gray-400">Please try one of the following:</p>
        <ul className="mb-6 space-y-1 text-left text-sm text-gray-600 dark:text-gray-400">
          <li>• Check your email and password</li>
          <li>• Verify your email address if you just signed up</li>
          <li>• Try logging in again</li>
        </ul>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Link
          href="/login"
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          Try Login Again
        </Link>
        <Link
          href="/signup"
          className="rounded border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          Create Account
        </Link>
      </div>
    </main>
  )
}
