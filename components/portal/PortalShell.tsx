"use client";

import {
  Activity,
  AlertTriangle,
  Bell,
  Database,
  FileSearch,
  FileText,
  Grid2X2,
  HeartHandshake,
  LogOut,
  Menu,
  PlusCircle,
  ScrollText,
  ShieldCheck,
  UserRound,
  Users,
  X,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export type PortalIconName =
  | "dashboard"
  | "applications"
  | "new-application"
  | "workers"
  | "notifications"
  | "profile"
  | "support"
  | "records"
  | "alerts"
  | "security"
  | "database"
  | "activity"
  | "audit";

export type PortalNavigationItem = {
  label: string;
  href: string;
  icon: PortalIconName;
};

type PortalShellProps = {
  portalName: string;
  userName: string;
  userSubtitle: string;
  initials: string;
  navigation: PortalNavigationItem[];
  children: React.ReactNode;
};

const iconMap: Record<PortalIconName, LucideIcon> = {
  dashboard: Grid2X2,
  applications: FileText,
  "new-application": PlusCircle,
  workers: Users,
  notifications: Bell,
  profile: UserRound,
  support: HeartHandshake,
  records: FileSearch,
  alerts: AlertTriangle,
  security: ShieldCheck,
  database: Database,
  activity: Activity,
  audit: ScrollText,
};

export default function PortalShell({
  portalName,
  userName,
  userSubtitle,
  initials,
  navigation,
  children,
}: PortalShellProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f7f8fa]">
      <header className="sticky top-0 z-40 h-17 border-b border-[#dfe3e8] bg-white">
        <div className="flex h-full items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-md border border-[#dfe3e8] lg:hidden"
              aria-label="Open navigation"
            >
              <Menu className="h-5 w-5" />
            </button>

            <span className="hidden text-sm text-[#667085] sm:block">
              National Migration Monitor
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold text-[#202124]">
                {userName}
              </p>

              <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-[#667085]">
                {userSubtitle}
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d8dde5] bg-[#f4f5f6] text-xs font-bold">
              {initials}
            </div>

            <Link
              href="/staff-login"
              className="flex h-10 w-10 items-center justify-center rounded-md hover:bg-[#f3f4f6]"
              aria-label="Sign out"
            >
              <LogOut className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
        />
      )}

      <aside
        className={`fixed bottom-0 left-0 top-0 z-50 flex w-65 flex-col border-r border-[#dfe3e8] bg-white transition-transform lg:top-17 lg:z-30 lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-17 items-center justify-between border-b border-[#dfe3e8] px-5 lg:hidden">
          <span className="font-semibold">Navigation</span>

          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            aria-label="Close navigation"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex items-center gap-3 px-5 py-6">
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-[#181818] text-white">
            <ShieldCheck className="h-5 w-5" />
          </span>

          <div>
            <p className="text-sm font-bold">
              National Migration Monitor
            </p>

            <p className="text-[10px] uppercase tracking-wider text-[#667085]">
              {portalName}
            </p>
          </div>
        </div>

        <nav className="space-y-1 px-4">
          {navigation.map((item) => {
            const Icon = iconMap[item.icon];

            const active =
              pathname === item.href ||
              pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex h-11 items-center gap-3 rounded-md px-3 text-sm font-medium ${
                  active
                    ? "bg-[#f0f1f3] text-[#202124]"
                    : "text-[#667085] hover:bg-[#f7f8fa]"
                }`}
              >
                <Icon className="h-4.5 w-4.5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto border-t border-[#e4e7ec] p-4">
          <div className="rounded-lg border border-[#edf0f3] bg-[#fafafa] p-4">
            <p className="text-xs font-bold">
              System Status
            </p>

            <p className="mt-2 flex items-center gap-2 text-xs text-[#667085]">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Secure Connection Active
            </p>
          </div>
        </div>
      </aside>

      <div className="lg:pl-65">
        {children}
      </div>
    </div>
  );
}