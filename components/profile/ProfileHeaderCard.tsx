// src/components/profile/ProfileHeaderCard.tsx

"use client";

import {
  CheckCircle2,
  Download,
  FileCheck2,
  MapPin,
  UserRound,
} from "lucide-react";

type ProfileHeaderCardProps = {
  name: string;
  nationality: string;
  profileId: string;
  passportNumber: string;
  status: string;
};

export default function ProfileHeaderCard({
  name,
  nationality,
  profileId,
  passportNumber,
  status,
}: ProfileHeaderCardProps) {
  return (
    <section className="rounded-xl border border-[#dfe3e8] bg-white p-5 shadow-[0_2px_8px_rgba(16,24,40,0.04)] sm:p-6">
      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
        <div className="flex min-w-0 flex-col gap-5 sm:flex-row sm:items-center">
          <div className="relative shrink-0">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-white bg-[#e6e8eb] text-xl font-bold text-[#202124] shadow-md">
              MO
            </div>

            <span className="absolute bottom-1 right-0 h-5 w-5 rounded-full border-2 border-white bg-emerald-500" />
          </div>

          <div className="min-w-0">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <h1 className="truncate text-2xl font-bold tracking-[-0.035em] text-[#202124]">
                {name}
              </h1>

              <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[10px] font-semibold text-emerald-700">
                <CheckCircle2 className="h-3 w-3" />
                {status}
              </span>
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[#667085]">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" />
                {nationality}
              </span>

              <span>•</span>

              <span>{profileId}</span>

              <span className="inline-flex items-center gap-1.5">
                <UserRound className="h-3.5 w-3.5" />
                Passport: {passportNumber}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-[#d8dde5] bg-white px-4 text-sm font-medium text-[#202124] transition hover:bg-[#f8f9fa]"
          >
            <Download className="h-4 w-4" />
            Export Dossier
          </button>

          <button
            type="button"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-[#181818] px-4 text-sm font-semibold text-white transition hover:bg-black"
          >
            <FileCheck2 className="h-4 w-4" />
            Approve Renewal
          </button>
        </div>
      </div>
    </section>
  );
}