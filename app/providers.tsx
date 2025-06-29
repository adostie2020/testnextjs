'use client';

import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs';
import { ThemeProvider } from 'next-themes';
import siteMetadata from '@/data/siteMetadata';
import { ReactNode, useState } from 'react';

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  const [supabaseClient] = useState(() =>
    createPagesBrowserClient({
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
      supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    })
  );

  return (
    <SessionContextProvider supabaseClient={supabaseClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme={siteMetadata.theme}
        enableSystem
      >
        {children}
      </ThemeProvider>
    </SessionContextProvider>
  );
}
