// src/components/landing/HeroSection.tsx

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden bg-[#171719]">
      {/* Subtle background decoration */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 75% 35%, rgba(255,255,255,0.08), transparent 32%)",
        }}
      />

      <div className="relative mx-auto flex min-h-155 max-w-7xl items-center px-5 py-20 sm:px-8 lg:min-h-170 lg:px-12">
        <div className="max-w-3xl">
          <div className="mb-7 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white/80 backdrop-blur-sm">
            Official National Gateway
          </div>

          <h1 className="max-w-3xl text-4xl font-bold leading-[1.05] tracking-[-0.04em] text-[#f7f7f5] sm:text-5xl md:text-6xl lg:text-7xl">
            Securing Borders.
            <span className="block">Protecting Sovereignty.</span>
          </h1>

          <p className="mt-7 max-w-2xl text-base leading-7 text-white/65 sm:text-lg sm:leading-8">
            The National Migration Monitor provides integrated, real-time
            oversight of refugee flows and migrant workforce mobility.
            Ensuring safety, dignity, and compliance through advanced data
            governance.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/staff-login"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-white px-6 py-3 text-sm font-semibold text-[#171719] transition hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#171719]"
            >
              Authorized Staff Login
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/public-support"
              className="inline-flex min-h-12 items-center justify-center rounded-md border border-white bg-transparent px-6 py-3 text-sm font-semibold text-white transition hover:border-white/50 hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#171719]"
            >
              <span className="text-white">Public Inquiries &amp; Help</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}