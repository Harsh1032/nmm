import PortalShell, {
  type PortalNavigationItem,
} from "@/components/portal/PortalShell";
import { requireRole } from "@/lib/auth/requireRole";

const navigation: PortalNavigationItem[] = [
  {
    label: "Dashboard",
    href: "/employee/dashboard",
    icon: "dashboard",
  },
  {
    label: "New Application",
    href: "/employee/applications/new",
    icon: "new-application",
  },
  {
    label: "My Applications",
    href: "/employee/applications",
    icon: "applications",
  },
  {
    label: "My Profile",
    href: "/employee/profile",
    icon: "profile",
  },
  {
    label: "Support",
    href: "/employee/support",
    icon: "support",
  },
];

export const dynamic = "force-dynamic";

export default async function EmployeeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { profile } = await requireRole(["employee"]);

  const displayName: string =
    profile.full_name || "Registered Individual";

  const initials = displayName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part: string) => part.charAt(0))
    .join("")
    .toUpperCase();

  return (
    <PortalShell
      portalName="Individual Portal"
      userName={displayName}
      userSubtitle="Registered Individual"
      initials={initials || "IN"}
      navigation={navigation}
    >
      {children}
    </PortalShell>
  );
}