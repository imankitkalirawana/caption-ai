'use client';

import { Card, CardBody, Tab, Tabs } from '@heroui/react';
import { Icon } from '@iconify/react/dist/iconify.js';
import React from 'react';
import { usePathname } from 'next/navigation';
import { CaptionProvider } from '@/components/caption/context';

export default function Layout({ children }: { children: React.ReactNode }) {
  let pathname = usePathname();

  const tabs = [
    {
      href: '/caption/instagram',
      title: 'Instagram',
      icon: 'skill-icons:instagram'
    },
    {
      href: '/caption/linkedin',
      title: 'LinkedIn',
      icon: 'skill-icons:linkedin'
    },
    {
      href: '/caption/twitter',
      title: 'Twitter',
      icon: 'skill-icons:twitter'
    }
  ];

  return (
    <div className="relative flex h-screen w-full items-center justify-center px-4">
      <div className="absolute inset-0 left-[30%] top-[40%] size-64 bg-green-400 bg-[size:20px_20px] opacity-50 blur-[100px]"></div>
      <div className="absolute inset-0 left-[50%] top-1/2 size-64 bg-fuchsia-400 bg-[size:20px_20px] opacity-50 blur-[100px]"></div>

      <Card className="w-full max-w-lg bg-default-200/40 shadow-none backdrop-blur-lg">
        <CardBody className="p-2">
          <CaptionProvider>
            <Tabs
              aria-label="Options"
              classNames={{
                panel: 'p-0 shadow-none',
                tabList: 'p-0 gap-[1px] bg-transparent rounded-none',
                cursor:
                  'rounded-b-none rounded-t-xl border-b border-default-300/40 shadow-none',
                tab: 'rounded-b-none data-[selected=true]:border-none data-[selected=true]:bg-transparent bg-default-200/40 rounded-t-xl backdrop-blur-lg'
              }}
              size="lg"
              selectedKey={pathname}
              items={tabs}
            >
              {(tab) => (
                <Tab
                  href={tab.href}
                  key={tab.href}
                  title={
                    <div className="flex items-center space-x-2">
                      <Icon icon={tab.icon} />
                      <span>{tab.title}</span>
                    </div>
                  }
                >
                  <div className="min-h-36 rounded-b-xl rounded-tr-xl bg-gradient-to-b from-background to-background/30 p-4 backdrop-blur-lg">
                    {children}
                  </div>
                </Tab>
              )}
            </Tabs>
          </CaptionProvider>
        </CardBody>
      </Card>
    </div>
  );
}
