// src/components/landing/DataSovereigntySection.tsx

import {
  Cloud,
  Database,
  Fingerprint,
  LockKeyhole,
  ShieldCheck,
} from "lucide-react";

const securityFeatures = [
  {
    title: "Military-Grade Encryption",
    description:
      "End-to-end security for sensitive migrant and employer records.",
    icon: LockKeyhole,
  },
  {
    title: "Sovereign Cloud Hosting",
    description:
      "All databases hosted within national jurisdictional boundaries.",
    icon: Database,
  },
  {
    title: "Multi-Factor Authentication",
    description:
      "Strict role-based access control for all authorized personnel.",
    icon: Fingerprint,
  },
];

export default function DataSovereigntySection() {
  return (
    <section className="border-y border-black/[0.07] bg-[#f7f8f9] py-20 sm:py-24 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[0.95fr_1.15fr] lg:items-center lg:px-12">
        <div>
          <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-[#e3e4e6] text-[#202124]">
            <ShieldCheck className="h-7 w-7" />
          </div>

          <h2 className="mt-7 max-w-md text-4xl font-bold leading-[1.05] tracking-[-0.045em] text-[#202124] sm:text-5xl">
            Absolute Data Sovereignty
          </h2>

          <p className="mt-6 max-w-xl text-base leading-7 text-[#667085]">
            NMM operates under the strictest national security protocols. All
            data is encrypted at rest and in transit, complying with the
            National Data Protection Act and International Humanitarian Privacy
            Standards.
          </p>

          <div className="mt-9 space-y-6">
            {securityFeatures.map((feature) => {
              const Icon = feature.icon;

              return (
                <div key={feature.title} className="flex items-start gap-4">
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#e0e2e4]">
                    <Icon className="h-4 w-4 text-[#202124]" />
                  </span>

                  <div>
                    <h3 className="text-sm font-bold text-[#202124]">
                      {feature.title}
                    </h3>

                    <p className="mt-1 text-sm leading-5 text-[#667085]">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex min-h-60 flex-col justify-end rounded-lg border border-black/10 bg-white p-8 shadow-sm">
            <span className="text-4xl font-bold tracking-[-0.04em] text-[#202124] sm:text-5xl">
              99.9%
            </span>

            <span className="mt-3 text-xs font-bold uppercase tracking-[0.16em] text-[#667085]">
              Uptime Guarantee
            </span>
          </div>

          <div className="flex min-h-60 flex-col justify-end rounded-lg bg-[#f0f1f2] p-8">
            <span className="text-4xl font-bold tracking-[-0.04em] text-[#202124] sm:text-5xl">
              ISO
            </span>

            <span className="mt-3 text-xs font-bold uppercase tracking-[0.16em] text-[#667085]">
              27001 Certified
            </span>
          </div>

          <div className="flex min-h-60 flex-col justify-end rounded-lg bg-[#181818] p-8 text-white shadow-xl">
            <ShieldCheck className="mb-6 h-10 w-10 text-white/35" />

            <h3 className="max-w-47.5 text-xl font-bold leading-tight">
              Certified Compliance Standards
            </h3>
          </div>

          <div className="flex min-h-60 flex-col justify-end rounded-lg border border-black/10 bg-white p-8 shadow-sm">
            <Cloud className="mb-auto h-8 w-8 text-[#202124]/35" />

            <span className="text-4xl font-bold tracking-[-0.04em] text-[#202124] sm:text-5xl">
              128
            </span>

            <span className="mt-3 text-xs font-bold uppercase tracking-[0.16em] text-[#667085]">
              Protected Border Points
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}