'use client';
import { Button, Link } from '@heroui/react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const DISABLED_ROUTES = ['/auth'];

  const isDisabled = DISABLED_ROUTES.some((path) => pathname.startsWith(path));

  if (isDisabled) return null;

  return (
    <header className="fixed top-0 z-50 w-full border-b border-foreground/10">
      <div className="container mx-auto">
        <nav className="flex h-16 items-center justify-between px-6">
          <Link href="/" className="flex items-center text-foreground">
            Caption AI
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            <Link href="/" className="text-foreground">
              Home
            </Link>
            <Link href="/caption/instagram" className="text-foreground">
              Instagram
            </Link>
          </div>

          <Button
            color="primary"
            as={Link}
            href="/caption/instagram"
            radius="full"
          >
            Get Started
          </Button>
        </nav>
      </div>
    </header>
  );
}
