'use client';
import Link from './Link';
import { useSessionContext } from '@supabase/auth-helpers-react';

export default function LoginButton({ redirectTo = '/login', children = 'Log in' }: { redirectTo?: string; children?: React.ReactNode }) {
  const { session, isLoading } = useSessionContext();
  if (isLoading || session) return null;

  return (
    <Link
      href={redirectTo}
      className="hover:text-primary-500 dark:hover:text-primary-400 m-1 font-medium text-gray-900 dark:text-gray-100"
    >
      {children}
    </Link>
  );
} 