'use client';

import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';

export default function LogoutButton({
  redirectTo = '/',
  children = 'Log out',
}: {
  redirectTo?: string;
  children?: React.ReactNode;
}) {
  const supabase = useSupabaseClient();
  const router = useRouter();

  async function handleClick() {
    await supabase.auth.signOut();
    router.replace(redirectTo);
  }

  return (
    <button
      onClick={handleClick}
      className="hover:text-primary-500 dark:hover:text-primary-400 m-1 font-medium text-gray-900 dark:text-gray-100"
    >
      {children}
    </button>
  );
} 