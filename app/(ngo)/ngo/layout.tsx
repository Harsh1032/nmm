import PortalShell, {
  type PortalNavigationItem,
} from "@/components/portal/PortalShell";
import { requireRole } from "@/lib/auth/requireRole";

const navigation: PortalNavigationItem[] = [
  {
    label: "Dashboard",
    href: "/ngo/dashboard",
    icon: "dashboard",
  },
  {
    label: "Assigned Cases",
    href: "/ngo/cases",
    icon: "workers",
  },
  {
    label: "Support Services",
    href: "/ngo/services",
    icon: "support",
  },
  {
    label: "Reports",
    href: "/ngo/reports",
    icon: "applications",
  },
];

export const dynamic = "force-dynamic";

export default async function NgoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { profile } = await requireRole(["ngo"]);

  const displayName: string =
    profile.organization_name ||
    profile.full_name ||
    "Humanitarian Partner";

  const initials = displayName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part: string) => part.charAt(0))
    .join("")
    .toUpperCase();

  return (
    <PortalShell
      portalName="Civil Society Portal"
      userName={displayName}
      userSubtitle="Humanitarian Partner"
      initials={initials || "NG"}
      navigation={navigation}
    >
      {children}
    </PortalShell>
  );
}