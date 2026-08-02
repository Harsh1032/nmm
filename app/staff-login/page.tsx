// src/app/staff-login/page.tsx

import StaffLoginForm from "@/components/auth/StaffLoginForm";
import SystemFooter from "@/components/auth/SystemFooter";
import Navbar from "@/components/landing/Navbar";
import { LockKeyhole, ShieldCheck } from "lucide-react";

const securityItems = [
  {
    title: "Secure Environment",
    description: "Compliant with National Data Protection Act 2023",
    icon: ShieldCheck,
  },
  {
    title: "Role-Based Access",
    description: "Granular permissions ensure data integrity",
    icon: LockKeyhole,
  },
];

export default function StaffLoginPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#f8f9fa]">
      <Navbar />

      <main className="flex-1">
        <div className="mx-auto grid w-full max-w-7xl gap-12 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[0.78fr_1.22fr] lg:items-center lg:gap-16 lg:px-12 lg:py-20">
          {/* Left content */}
          <section className="mx-auto w-full max-w-xl lg:mx-0">
            <span className="inline-flex rounded-full border border-black/20 bg-white px-4 py-2 text-xs font-semibold text-[#252525]">
              Official Government Portal
            </span>

            <h1 className="mt-6 max-w-lg text-4xl font-bold leading-[1.12] tracking-[-0.045em] text-[#202124] sm:text-5xl lg:text-[3.5rem]">
              Secure Access to National Migration Data
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-[#667085]">
              Empowering authorized personnel with real-time tracking,
              reporting, and management tools for a safer migration framework.
            </p>

            <div className="mt-10 space-y-4">
              {securityItems.map((item) => {
                const Icon = item.icon;

                return (
                  <article
                    key={item.title}
                    className="flex items-start gap-5 rounded-lg border border-black/[0.07] bg-white px-5 py-5"
                  >
                    <Icon className="mt-0.5 h-6 w-6 shrink-0 text-[#202124]" />

                    <div>
                      <h2 className="text-sm font-bold text-[#202124]">
                        {item.title}
                      </h2>

                      <p className="mt-1 text-sm leading-5 text-[#667085]">
                        {item.description}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          {/* Right login card */}
          <StaffLoginForm />
        </div>
      </main>

      <SystemFooter />
    </div>
  );
}