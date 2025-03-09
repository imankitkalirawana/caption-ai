'use client';

import { HeroUIProvider, ToastProvider } from '@heroui/react';
import React from 'react';
import { SessionProvider } from 'next-auth/react';
import { useRouter } from 'next/navigation';

declare module '@react-types/shared' {
  interface RouterConfig {
    routerOptions: NonNullable<
      Parameters<ReturnType<typeof useRouter>['push']>[1]
    >;
  }
}

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  return (
    <HeroUIProvider navigate={router.push}>
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
