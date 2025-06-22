'use client';

import { useSupabaseClient, useSessionContext } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';

export default function LogoutButton({
  redirectTo = '/',
  children = 'Log out',
}: {
  redirectTo?: string;
  children?: React.ReactNode;
}) {
  const supabase = useSupabaseClient();
  const { session, isLoading } = useSessionContext();
  const router = useRouter();

  async function handleClick() {
    await supabase.auth.signOut();
    router.replace(redirectTo);
  }

  if (isLoading || !session) return null;

  return (
    <button
      onClick={handleClick}
      className="hover:text-primary-500 dark:hover:text-primary-400 m-1 font-medium text-gray-900 dark:text-gray-100"
    >
      {children}
    </button>
  );
} 