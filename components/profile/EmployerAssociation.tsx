// src/components/profile/EmployerAssociation.tsx

import {
  Building2,
  CheckCircle2,
  ExternalLink,
  HeartHandshake,
} from "lucide-react";

type EmployerAssociationProps = {
  employer: {
    company: string;
    registration: string;
    position: string;
    skillLevel: string;
    location: string;
    emirates: string;
    verified: boolean;
  };
};

export default function EmployerAssociation({
  employer,
}: EmployerAssociationProps) {
  return (
    <section>
      <div className="flex items-center justify-between gap-4 border-b border-[#dfe3e8] pb-4">
        <div className="flex items-center gap-2">
          <Building2 className="h-4 w-4" />

          <h2 className="text-sm font-bold text-[#202124]">
            Employer Association
          </h2>
        </div>

        {employer.verified && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f2f3f5] px-3 py-1 text-[9px] font-medium text-[#475467]">
            <CheckCircle2 className="h-3 w-3" />
            Verified Association
          </span>
        )}
      </div>

      <div className="mt-5 grid gap-6 rounded-lg bg-[#fafbfc] p-5 sm:grid-cols-[56px_repeat(3,minmax(0,1fr))_auto]">
        <div className="flex h-14 w-14 items-center justify-center rounded-md border border-dashed border-[#cfd4dc] bg-white">
          <HeartHandshake className="h-7 w-7 text-[#98a0ae]" />
        </div>

        <div>
          <p className="text-[9px] font-semibold uppercase text-[#667085]">
            Company Entity
          </p>

          <p className="mt-2 text-xs font-bold text-[#202124]">
            {employer.company}
          </p>

          <p className="mt-1 text-[10px] text-[#667085]">
            Registration: {employer.registration}
          </p>
        </div>

        <div>
          <p className="text-[9px] font-semibold uppercase text-[#667085]">
            Position / Grade
          </p>

          <p className="mt-2 text-xs font-bold text-[#202124]">
            {employer.position}
          </p>

          <p className="mt-1 text-[10px] text-[#667085]">
            Skill Level: {employer.skillLevel}
          </p>
        </div>

        <div>
          <p className="text-[9px] font-semibold uppercase text-[#667085]">
            Location of Work
          </p>

          <p className="mt-2 text-xs font-bold text-[#202124]">
            {employer.location}
          </p>

          <p className="mt-1 text-[10px] text-[#667085]">
            {employer.emirates}
          </p>
        </div>

        <button
          type="button"
          aria-label="Open employer record"
          className="flex h-9 w-9 items-center justify-center rounded-md text-[#667085] hover:bg-[#eceff2] hover:text-[#202124]"
        >
          <ExternalLink className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
}