'use client';

import { HeroUIProvider, ToastProvider } from '@heroui/react';
import React, { useEffect } from 'react';
import { SessionProvider } from 'next-auth/react';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <HeroUIProvider>
      <SessionProvider>
        <ToastProvider
          toastProps={{
            shouldShowTimeoutProgress: true
          }}
        />
        {children}
      </SessionProvider>
    </HeroUIProvider>
  );
}
