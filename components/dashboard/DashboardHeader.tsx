// src/components/dashboard/DashboardHeader.tsx

"use client";

import {
  ChevronDown,
  Globe2,
  LogOut,
  Menu,
  Search,
} from "lucide-react";
import Link from "next/link";
import type { AuthenticatedProfile } from "./DashboardShell";
import { logout } from "@/app/(authenticated)/actions";

type DashboardHeaderProps = {
  onOpenSidebar: () => void;
  profile: AuthenticatedProfile;
};

export default function DashboardHeader({
  onOpenSidebar,
  profile,
}: DashboardHeaderProps) {
  const initials = profile.full_name
    .split(" ")
    .filter(Boolean)
    .slice(-2)
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase();

  return (
    <header className="sticky top-0 z-40 h-17 border-b border-[#dfe3e8] bg-white">
      <div className="flex h-full items-center justify-between gap-4 px-4 sm:px-6">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <button
            type="button"
            onClick={onOpenSidebar}
            aria-label="Open dashboard menu"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-[#dfe3e8] lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>

          <label className="relative hidden w-full max-w-97.5 sm:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#667085]" />

            <input
              type="search"
              placeholder="Search records, IDs, or employers..."
              className="h-10 w-full rounded-md border border-[#d8dde5] bg-white pl-10 pr-4 text-sm outline-none transition placeholder:text-[#7b8494] focus:border-[#202124] focus:ring-2 focus:ring-black/5"
            />
          </label>
        </div>

        <div className="flex shrink-0 items-center gap-3 sm:gap-4">
          <button
            type="button"
            className="hidden h-10 items-center gap-2 rounded-md border border-[#e3e6eb] px-4 text-sm sm:flex"
          >
            <Globe2 className="h-4 w-4" />
            English
            <ChevronDown className="h-3.5 w-3.5" />
          </button>

          <div className="hidden h-10 border-l border-[#dfe3e8] md:block" />

          <Link
            href="/profile"
            aria-label="Open user profile"
            className="group hidden items-center gap-3 rounded-lg px-2 py-1.5 transition hover:bg-[#f5f6f7] md:flex"
          >
            <div className="text-right">
              <p className="text-sm font-medium text-[#202124]">
                {profile.full_name}
              </p>

              <p className="text-[11px] font-medium uppercase tracking-[0.11em] text-[#667085]">
                {profile.ministry ?? "Ministry of Labour"}
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d8dde5] bg-[#f3f4f5] text-xs font-bold transition group-hover:border-[#aeb4bd]">
              {initials || "MO"}
            </div>
          </Link>

          {/* Mobile profile button */}
          <Link
            href="/profile"
            aria-label="Open user profile"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d8dde5] bg-[#f3f4f5] text-xs font-bold md:hidden"
          >
            {initials || "MO"}
          </Link>

          {/* Real Supabase logout */}
          <form action={logout}>
            <button
              type="submit"
              aria-label="Sign out"
              className="flex h-10 w-10 items-center justify-center rounded-md text-[#475467] transition hover:bg-[#f2f4f7]"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}