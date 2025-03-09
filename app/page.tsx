'use client';
import { Button, Link } from '@heroui/react';
import React from 'react';

export default function Page() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <header className="border-b border-white/10">
        <div className="container mx-auto">
          <nav className="flex h-16 items-center justify-between px-6">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-white/10">
                <span className="font-medium">D</span>
              </div>
              <span className="font-medium">Doly</span>
            </Link>

            {/* Navigation Links */}
            <div className="hidden items-center gap-8 md:flex">
              <Link
                href="/"
                className="hover:glow text-sm text-white/80 transition-colors hover:text-white"
              >
                Home
              </Link>
              <Link
                href="/solutions"
                className="hover:glow text-sm text-white/80 transition-colors hover:text-white"
              >
                Solutions
              </Link>
              <Link
                href="/pricing"
                className="hover:glow text-sm text-white/80 transition-colors hover:text-white"
              >
                Pricing
              </Link>
              <Link
                href="/resources"
                className="hover:glow text-sm text-white/80 transition-colors hover:text-white"
              >
                Resources
              </Link>
            </div>

            <Button className="rounded-full bg-primary px-6 text-sm font-medium text-black hover:bg-primary/90">
              Get Started
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative">
        <div
          className="absolute inset-0 -z-10"
          style={{
            backgroundImage:
              'url("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-30%20at%2011.13.42%20AM-7iNXJBsE61P0bXhGM8nrEl2tT6HuP5.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl space-y-8 py-16 text-center md:py-24">
            {/* New badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm">
              <span className="rounded-full bg-primary px-2 py-0.5 text-xs text-black">
                New
              </span>
              <span className="flex items-center gap-2">
                Introducing hosting: Our new, most advanced Web3 hosting
                solution
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-white"
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
            </div>

            {/* Hero content */}
            <div className="space-y-6">
              <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
                Web3 Hosting
                <br />
                Made Simple
              </h1>
              <p className="text-lg text-gray-400">
                No more complicated setups. Just fast, secure Web3 hosting.
              </p>
              <Button className="rounded-full bg-primary px-8 text-black hover:bg-primary/90">
                Get Started
              </Button>
            </div>
          </div>
        </div>
        <style jsx>{`
          @keyframes glow {
            0% {
              text-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
            }
            50% {
              text-shadow:
                0 0 10px rgba(255, 255, 255, 0.7),
                0 0 15px rgba(255, 255, 255, 0.5);
            }
            100% {
              text-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
            }
          }

          .hover\\:glow:hover {
            animation: glow 1.5s ease-in-out infinite;
          }
        `}</style>
      </main>
    </div>
  );
}
