import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export type AppRole =
  | "ministry"
  | "admin"
  | "agency"
  | "police"
  | "employer"
  | "employee"
  | "ngo";

export async function requireRole(
  allowedRoles: AppRole[]
) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/staff-login");
  }

  const { data: profile, error } = await supabase
    .from("profiles")
    .select(`
      id,
      email,
      full_name,
      title,
      ministry,
      role,
      avatar_url,
      active,
      clearance_level,
      department,
      organization_name,
      employer_id,
      migration_record_id
    `)
    .eq("id", user.id)
    .single();

  if (
    error ||
    !profile ||
    !profile.active ||
    !allowedRoles.includes(profile.role as AppRole)
  ) {
    await supabase.auth.signOut();
    redirect("/staff-login");
  }

  return {
    user,
    profile,
  };
}