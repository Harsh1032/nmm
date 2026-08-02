"use client";

import { useState } from "react";
import DashboardFooter from "./DashboardFooter";
import DashboardHeader from "./DashboardHeader";
import DashboardSidebar from "./DashboardSidebar";

export type AuthenticatedProfile = {
  id: string;
  email: string | null;
  full_name: string;
  title: string | null;
  ministry: string | null;
  role: string;
  avatar_url: string | null;
  active: boolean;
};

export default function DashboardShell({
  children,
  profile,
}: {
  children: React.ReactNode;
  profile: AuthenticatedProfile;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f7f8fa]">
      <DashboardHeader
        profile={profile}
        onOpenSidebar={() => setSidebarOpen(true)}
      />

      <DashboardSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="min-h-[calc(100vh-68px)] lg:pl-65">
        <main>{children}</main>
        <DashboardFooter />
      </div>
    </div>
  );
}