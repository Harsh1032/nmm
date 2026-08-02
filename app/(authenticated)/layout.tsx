// src/app/(authenticated)/layout.tsx

import DashboardShell from "@/components/dashboard/DashboardShell";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/staff-login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select(
      `
        id,
        email,
        full_name,
        title,
        ministry,
        role,
        avatar_url,
        active
      `
    )
    .eq("id", user.id)
    .single();

  if (
    !profile ||
    !profile.active ||
    profile.role !== "ministry"
  ) {
    await supabase.auth.signOut();
    redirect("/staff-login");
  }

  return (
    <DashboardShell profile={profile}>
      {children}
    </DashboardShell>
  );
}