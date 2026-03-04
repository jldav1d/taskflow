'use client';

import Link from 'next/link';
import { ThemeToggle } from './theme/theme-toggle';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

export function Header() {
  return (
    <header className="border-b bg-white/80 backdrop-blur-xs">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-blue_munsell-500 text-2xl font-bold">
              TaskFlow
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Link href="/dashboard" className="hover:text-accent">
              Dashboard
            </Link>
            <Link href="/projects" className="hover:text-accent">
              Projects
            </Link>

            {/* only display if the user is unauthenticated */}
            <SignedOut>
              <Link href="/sign-in" className="hover:text-accent">
                Sign In
              </Link>
              <Link href="/sign-up" className="rounded-lg px-4 py-2 text-white">
                Get Started
              </Link>
            </SignedOut>

            {/* display user profile button when signed in */}
            <SignedIn>
              <UserButton></UserButton>
            </SignedIn>
          </div>
        </div>
      </div>
    </header>
  );
}
