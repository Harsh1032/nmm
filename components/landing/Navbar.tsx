// src/components/landing/Navbar.tsx

import Link from "next/link";
import { Globe2, Menu, ShieldCheck } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-2.5"
          aria-label="National Migration Monitor homepage"
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#181818] text-white">
            <ShieldCheck className="h-5 w-5" />
          </span>

          <span className="truncate text-sm font-bold text-[#202124] sm:text-lg">
            National Migration Monitor
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-md border border-black/10 px-3 py-2 text-sm text-[#252525] transition hover:bg-black/3"
          >
            <Globe2 className="h-4 w-4" />
            English
          </button>

          <Link
            href="/public-support"
            className="text-sm font-medium text-[#252525] hover:text-black"
          >
            Public Support
          </Link>

          <Link
            href="/staff-login"
            className="rounded-md bg-[#181818] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-black"
          >
            <span className="text-white">Staff Login</span>
          </Link>
        </nav>

        <button
          type="button"
          aria-label="Open navigation menu"
          className="flex h-10 w-10 items-center justify-center rounded-md border border-black/10 md:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
}