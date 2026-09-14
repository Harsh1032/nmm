"use client";

import Link from "next/link";
import {
  Globe2,
  Menu,
  ShieldCheck,
  X,
} from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  function closeMenu() {
    setOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-white/95 backdrop-blur">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            onClick={closeMenu}
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

          {/* Desktop navigation */}
          <nav className="hidden items-center gap-6 md:flex">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-md border border-black/10 px-3 py-2 text-sm text-[#252525] transition hover:bg-black/3"
            >
              <Globe2 className="h-4 w-4" />
              English
            </button>

            <Link
              href="/jobs"
              className="inline-flex h-11 items-center justify-center rounded-md border border-[#d8dde5] bg-white px-5 text-sm font-semibold transition hover:bg-[#f7f8fa]"
            >
              Apply for Jobs
            </Link>

            <Link
              href="/public-support"
              className="text-sm font-medium text-[#252525] transition hover:text-black"
            >
              Public Support
            </Link>

            <Link
              href="/staff-login"
              className="rounded-md bg-[#181818] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-black"
            >
              Staff Login
            </Link>
          </nav>

          {/* Mobile toggle */}
          <button
            type="button"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={open}
            onClick={() => setOpen((current) => !current)}
            className="flex h-10 w-10 items-center justify-center rounded-md border border-black/10 bg-white transition hover:bg-[#f7f8fa] md:hidden"
          >
            {open ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="border-t border-black/10 py-4 md:hidden">
            <nav className="flex flex-col gap-2">
              <button
                type="button"
                className="inline-flex h-11 w-full items-center gap-2 rounded-lg border border-[#e2e6eb] bg-white px-4 text-left text-sm font-medium text-[#252525]"
              >
                <Globe2 className="h-4 w-4" />
                English
              </button>

              <Link
                href="/jobs"
                onClick={closeMenu}
                className="flex h-11 w-full items-center rounded-lg border border-[#e2e6eb] bg-white px-4 text-sm font-semibold text-[#202124] transition hover:bg-[#f7f8fa]"
              >
                Apply for Jobs
              </Link>

              <Link
                href="/public-support"
                onClick={closeMenu}
                className="flex h-11 w-full items-center rounded-lg px-4 text-sm font-medium text-[#252525] transition hover:bg-[#f7f8fa]"
              >
                Public Support
              </Link>

              <Link
                href="/staff-login"
                onClick={closeMenu}
                className="mt-1 flex h-11 w-full items-center justify-center rounded-lg bg-[#181818] px-4 text-sm font-semibold text-white transition hover:bg-black"
              >
                Staff Login
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}