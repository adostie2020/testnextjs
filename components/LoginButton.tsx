'use client'
import Link from './Link'
import { useAuth } from '@/lib/auth-context'

export default function LoginButton({
  redirectTo = '/login',
  children = 'Log in',
}: {
  redirectTo?: string
  children?: React.ReactNode
}) {
  const { session, isLoading } = useAuth()
  if (isLoading || session) return null

  return (
    <Link
      href={redirectTo}
      className="hover:text-primary-500 dark:hover:text-primary-400 m-1 font-medium text-gray-900 dark:text-gray-100"
    >
      {children}
    </Link>
  )
}
