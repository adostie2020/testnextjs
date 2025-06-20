'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';

export default function Protected({ children }: { children: ReactNode }) {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') router.replace('/signup');
  }, [status, router]);

  if (status === 'loading') return <p className="p-4">Loading…</p>;
  if (status === 'unauthenticated') return null;   // just in case
  return <>{children}</>;
}
