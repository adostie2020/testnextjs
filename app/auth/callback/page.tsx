'use client';

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSupabaseClient, useSessionContext } from '@supabase/auth-helpers-react';

function AuthCallbackContent() {
  const router = useRouter();
  const supabase = useSupabaseClient();
  const { isLoading, session } = useSessionContext();
  const searchParams = useSearchParams();
  const nextPath = searchParams.get('next') || '/';

  // Exchange any auth params (?code=..., type=...) for a session. Works in fresh tabs.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.has('code')) {
      supabase.auth.exchangeCodeForSession(params.toString()).then(({ data, error }) => {
        if (data?.session && !error) {
          router.replace(nextPath);
        }
      }).catch(() => {/* ignore - listener will still handle */});
    }
  }, [supabase, nextPath]);

  // When session becomes available, go to protected area
  useEffect(() => {
    if (session) {
      router.replace(nextPath);
    }
  }, [session, router, nextPath]);

  // Also listen for auth state changes in case it arrives after first render
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      if (newSession) router.replace(nextPath);
    });
    return () => subscription.unsubscribe();
  }, [supabase, router, nextPath]);

  return (
    <Suspense fallback={<Loading />}>
      <main className="flex items-center justify-center h-screen p-6">
        <p className="text-lg">Finishing sign-in…</p>
      </main>
    </Suspense>
  );
} 
}

export default function AuthCallback() {
  return (
    <Suspense fallback={
      <main className="flex items-center justify-center h-screen p-6">
        <p className="text-lg">Loading...</p>
      </main>
    }>
      <AuthCallbackContent />
    </Suspense>
  );
} 
