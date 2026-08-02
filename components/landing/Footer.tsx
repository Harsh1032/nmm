// src/components/landing/Footer.tsx

import Link from "next/link";
import { ShieldCheck } from "lucide-react";

const resourceLinks = [
  { label: "Public Reports", href: "/reports" },
  { label: "Support Center", href: "/public-support" },
  { label: "NGO Guidelines", href: "/guidelines/ngo" },
];

const legalLinks = [
  { label: "Data Privacy", href: "/legal/privacy" },
  { label: "Terms of Service", href: "/legal/terms" },
  { label: "Security Standards", href: "/legal/security" },
];

export default function Footer() {
  return (
    <footer className="border-t border-black/[0.07] bg-[#f3f4f6]">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:grid-cols-2 sm:px-8 lg:grid-cols-4 lg:px-12">
        <div>
          <Link href="/" className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-[#181818] text-white">
              <ShieldCheck className="h-5 w-5" />
            </span>

            <span className="font-bold text-[#202124]">
              National Migration Monitor
            </span>
          </Link>

          <p className="mt-5 max-w-xs text-sm leading-6 text-[#667085]">
            Protecting national borders while ensuring the safety and dignity
            of every migrant and refugee.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-bold text-[#202124]">Resources</h2>

          <ul className="mt-5 space-y-3">
            {resourceLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-sm text-[#667085] transition hover:text-[#202124]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-bold text-[#202124]">Legal</h2>

          <ul className="mt-5 space-y-3">
            {legalLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-sm text-[#667085] transition hover:text-[#202124]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-bold text-[#202124]">Contact</h2>

          <address className="mt-5 not-italic text-sm leading-6 text-[#667085]">
            Ministry of Labour &amp; Internal Affairs
            <br />
            Government Plaza, Central District
            <br />
            Emergency Hotline: 112
          </address>
        </div>
      </div>

      <div className="border-t border-black/[0.07]">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-5 text-xs text-[#667085] sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
          <p>
            © {new Date().getFullYear()} National Migration Monitor. All rights
            reserved.
          </p>

          <p>Official government information system</p>
        </div>
      </div>
    </footer>
  );
}