'use client';
import { Button, Chip, Link } from '@heroui/react';
import { Icon } from '@iconify/react/dist/iconify.js';
import React from 'react';

export default function Page() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="relative">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl space-y-8 py-16 pt-24 text-center md:py-24">
            <Button
              as={Link}
              href="https://store.divinely.dev"
              target="_blank"
              className="inline-flex items-center gap-2 rounded-full bg-default-100 px-4 py-1.5 pl-1.5 text-sm transition-colors hover:bg-default-200"
            >
              <Chip color="primary">New</Chip>
              <span className="flex items-center gap-2">
                <span className="hidden sm:block">
                  Introducing Divinely Store: One stop to for all your design &
                  development needs.
                </span>
                <span className="block sm:hidden">Divinely Store</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-foreground"
                >
                  <path
                    d="M6 12L10 8L6 4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </Button>

            <div className="space-y-6">
              <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
                Caption AI
                <br />
                by{' '}
                <a
                  href="https://divinely.dev"
                  className="transition-all hover:text-primary"
                  target="_blank"
                >
                  divinely
                  <span className="text-primary">.dev</span>
                </a>
              </h1>
              <p className="text-lg text-default-500">
                Generate captions for your images in seconds.
              </p>
              <div className="flex justify-center gap-2">
                <Button
                  color="primary"
                  as={Link}
                  href="/caption/instagram"
                  radius="full"
                >
                  Get Started
                </Button>
                <Button
                  variant="flat"
                  as={Link}
                  href="https://github.com/imankitkalirawana/caption-ai"
                  target="_blank"
                  radius="full"
                  isIconOnly
                >
                  <Icon icon="mdi:github" width={20} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
