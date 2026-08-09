// src/components/dashboard/DashboardSidebar.tsx

"use client";

import {
  Bell,
  Grid2X2,
  Headphones,
  Map,
  ShieldCheck,
  X,
  FileBarChart,
  ClipboardList,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: Grid2X2,
  },
  {
    label: "Map View",
    href: "/map",
    icon: Map,
  },
  {
    label: "Alerts",
    href: "/alerts",
    icon: Bell,
  },
  {
    label: "Reports",
    href: "/reports",
    icon: FileBarChart,
  },
  {
    label: "Support",
    href: "/support",
    icon: Headphones,
  },
  {
    label: "Applications",
    href: "/applications",
    icon: ClipboardList,
  },
];

type DashboardSidebarProps = {
  open: boolean;
  onClose: () => void;
};

export default function DashboardSidebar({
  open,
  onClose,
}: DashboardSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {open && (
        <button
          type="button"
          aria-label="Close sidebar overlay"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/35 lg:hidden"
        />
      )}

      <aside
        className={`fixed bottom-0 left-0 top-0 z-50 flex w-65 flex-col border-r border-[#dde2e8] bg-white transition-transform duration-300 lg:top-17 lg:z-30 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-17 items-center justify-between border-b border-[#e4e7ec] px-5 lg:hidden">
          <span className="font-bold">Navigation</span>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation"
            className="flex h-9 w-9 items-center justify-center rounded-md"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex items-center gap-2.5 px-6 pb-5 pt-6">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-[#181818] text-white">
            <ShieldCheck className="h-5 w-5" />
          </span>

          <span className="font-bold tracking-[-0.02em] text-[#202124]">
            National Migration Monitor
          </span>
        </div>

        <nav className="space-y-1 px-4">
          {navigation.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex h-11 items-center gap-3 rounded-md px-3 text-sm font-medium transition ${
                  active
                    ? "bg-[#f0f1f3] text-[#202124]"
                    : "text-[#667085] hover:bg-[#f7f8fa] hover:text-[#202124]"
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
            <p className="text-xs font-bold text-[#202124]">System Status</p>

            <div className="mt-2 flex items-center gap-2 text-xs text-[#667085]">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Live Monitoring Active
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
