'use client';

import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';
import siteMetadata from '@/data/siteMetadata';
import { ReactNode } from 'react';

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme={siteMetadata.theme}
        enableSystem
      >
        {children}
      </ThemeProvider>
    </SessionProvider>
  );
}
