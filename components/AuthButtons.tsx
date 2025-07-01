import { getCurrentUser } from '@/lib/auth-server'
import { logout } from '../app/login/actions'
import Link from './Link'

export default async function AuthButtons() {
  const user = await getCurrentUser()

  if (user) {
    // User is logged in - show logout button
    return (
      <form action={logout} className="inline">
        <button
          type="submit"
          className="hover:text-primary-500 dark:hover:text-primary-400 m-1 font-medium text-gray-900 dark:text-gray-100"
        >
          Log out
        </button>
      </form>
    )
  }

  // User is not logged in - show login button
  return (
    <Link
      href="/login"
      className="hover:text-primary-500 dark:hover:text-primary-400 m-1 font-medium text-gray-900 dark:text-gray-100"
    >
      Log in
    </Link>
  )
}
