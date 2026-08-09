import PortalShell, {
  type PortalNavigationItem,
} from "@/components/portal/PortalShell";
import { requireRole } from "@/lib/auth/requireRole";

const navigation: PortalNavigationItem[] = [
  {
    label: "Overview",
    href: "/agency/dashboard",
    icon: "dashboard",
  },
  {
    label: "Shared Records",
    href: "/agency/records",
    icon: "records",
  },
  {
    label: "Border Alerts",
    href: "/agency/alerts",
    icon: "alerts",
  },
  {
    label: "Identity Checks",
    href: "/agency/verification",
    icon: "security",
  },
];

export const dynamic = "force-dynamic";

export default async function AgencyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireRole(["agency", "police"]);

  return (
    <PortalShell
      portalName="Inter-Agency Portal"
      userName="National Police"
      userSubtitle="Read-Only Government Access"
      initials="NP"
      navigation={navigation}
    >
      {children}
    </PortalShell>
  );
}