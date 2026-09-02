import PortalShell, {
  type PortalNavigationItem,
} from "@/components/portal/PortalShell";
import { requireRole } from "@/lib/auth/requireRole";

const navigation: PortalNavigationItem[] = [
  {
    label: "Dashboard",
    href: "/employer/dashboard",
    icon: "dashboard",
  },
  {
    label: "New Application",
    href: "/employer/applications/new",
    icon: "new-application",
  },
  {
    label: "Applications",
    href: "/employer/applications",
    icon: "applications",
  },
  {
    label: "Workers",
    href: "/employer/workers",
    icon: "workers",
  },
    {
    label: "Organization Profile",
    href: "/employer/profile",
    icon: "profile",
  },
  {
    label: "Support",
    href: "/employer/support",
    icon: "support",
  },
];

export const dynamic = "force-dynamic";

export default async function EmployerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { profile } = await requireRole(["employer"]);

  const displayName: string =
    profile.organization_name ||
    profile.full_name ||
    "Registered Employer";

  const initials = displayName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part: string) => part.charAt(0))
    .join("")
    .toUpperCase();

  return (
    <PortalShell
      portalName="Employer Portal"
      userName={displayName}
      userSubtitle="Registered Employer"
      initials={initials || "ER"}
      navigation={navigation}
    >
      {children}
    </PortalShell>
  );
}