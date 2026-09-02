import PortalShell, {
  type PortalNavigationItem,
} from "@/components/portal/PortalShell";
import { requireRole } from "@/lib/auth/requireRole";

const navigation: PortalNavigationItem[] = [
  {
    label: "Overview",
    href: "/technical/dashboard",
    icon: "dashboard",
  },
  {
    label: "Applications",
    href: "/technical/applications",
    icon: "applications",
  },
  {
    label: "Support Requests",
    href: "/technical/support",
    icon: "support",
  },
  // {
  //   label: "Data Quality",
  //   href: "/technical/data-quality",
  //   icon: "database",
  // },
  // {
  //   label: "Audit Logs",
  //   href: "/technical/audit",
  //   icon: "audit",
  // },
  // {
  //   label: "Security",
  //   href: "/technical/security",
  //   icon: "security",
  // },
];

export const dynamic = "force-dynamic";

export default async function TechnicalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { profile } = await requireRole(["admin"]);

  const displayName: string =
    profile.full_name ||
    profile.department ||
    "NMM Technical Team";

  const initials = displayName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part: string) => part.charAt(0))
    .join("")
    .toUpperCase();

  return (
    <PortalShell
      portalName="Government Technical Portal"
      userName={displayName}
      userSubtitle="Full System Clearance"
      initials={initials || "TT"}
      navigation={navigation}
    >
      {children}
    </PortalShell>
  );
}