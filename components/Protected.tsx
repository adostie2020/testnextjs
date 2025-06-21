'use client';
import { useSessionContext } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';

export default function Protected({ children }: { children: ReactNode }) {
  const { session, isLoading } = useSessionContext();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !session) {
      const current = window.location.pathname + window.location.search;
      router.replace(`/signup?next=${encodeURIComponent(current)}`);
    }
  }, [session, isLoading, router]);

  if (isLoading) return <p className="p-4">Loading…</p>;
  if (!session) return null; // just in case
  return <>{children}</>;
}
