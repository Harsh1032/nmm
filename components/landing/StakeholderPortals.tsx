// src/components/landing/StakeholderPortals.tsx

import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  CircleUserRound,
  Globe2,
  ShieldAlert,
  Users,
  type LucideIcon,
} from "lucide-react";

type Stakeholder = {
  title: string;
  category: string;
  description: string;
  href: string;
  icon: LucideIcon;
};

const stakeholders: Stakeholder[] = [
  {
    title: "Ministry of Labour",
    category: "Government",
    description:
      "Policy oversight, nationwide labor statistics and employer compliance monitoring.",
    href: "/portals/ministry-of-labour",
    icon: Building2,
  },
  {
    title: "UN Agencies",
    category: "International",
    description:
      "Refugee assistance coordination, vulnerability assessments and protection tracking.",
    href: "/portals/un-agencies",
    icon: Globe2,
  },
  {
    title: "NGO Partners",
    category: "Support",
    description:
      "Service delivery logging, health support records and shelter allocation management.",
    href: "/portals/ngo-partners",
    icon: Users,
  },
  {
    title: "National Police",
    category: "Security",
    description:
      "Incident response coordination, border check verifications and urgent alert management.",
    href: "/portals/national-police",
    icon: ShieldAlert,
  },
  {
    title: "Authorized Employers",
    category: "Industry",
    description:
      "Worker visa verification, contract reporting and labor standard compliance.",
    href: "/portals/employers",
    icon: BriefcaseBusiness,
  },
  {
    title: "Public Services",
    category: "Citizen",
    description:
      "Self-registration tools, community reporting and rights information portal.",
    href: "/public-services",
    icon: CircleUserRound,
  },
];

export default function StakeholderPortals() {
  return (
    <section className="bg-white py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <h2 className="mt-4 text-3xl font-bold tracking-[-0.035em] text-[#202124] sm:text-4xl">
              Portal Access by Stakeholder
            </h2>

            <p className="mt-4 max-w-2xl text-base leading-7 text-[#667085]">
              Access your specialized monitoring dashboard and operational
              tools based on your institutional affiliation.
            </p>
          </div>

          <Link
            href="/role-guide"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#202124] hover:underline"
          >
            Unsure of your role? View Guide
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {stakeholders.map((stakeholder) => {
            const Icon = stakeholder.icon;

            return (
              <article
                key={stakeholder.title}
                className="group flex min-h-65 flex-col rounded-lg border border-black/[0.07] bg-white p-7 shadow-[0_2px_8px_rgba(16,24,40,0.04)] transition duration-300 hover:-translate-y-1 hover:border-black/15 hover:shadow-[0_15px_35px_rgba(16,24,40,0.08)]"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#f3f4f5] text-[#202124]">
                  <Icon className="h-5 w-5" />
                </div>

                <span className="mt-5 w-fit rounded-full bg-[#f1f2f4] px-3 py-1 text-[10px] font-semibold text-[#30343b]">
                  {stakeholder.category}
                </span>

                <h3 className="mt-3 text-xl font-bold tracking-[-0.02em] text-[#202124]">
                  {stakeholder.title}
                </h3>

                <p className="mt-3 flex-1 text-sm leading-6 text-[#667085]">
                  {stakeholder.description}
                </p>

                <Link
                  href={stakeholder.href}
                  className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#202124]"
                >
                  Access Portal
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}