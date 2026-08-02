// src/components/profile/PersonalInformation.tsx

import type { ProfileDetail } from "@/data/profile";
import { Globe2, UserRound } from "lucide-react";

type PersonalInformationProps = {
  personalInformation: ProfileDetail[];
  migrationInformation: ProfileDetail[];
};

function DetailsList({ details }: { details: ProfileDetail[] }) {
  return (
    <dl>
      {details.map((detail) => (
        <div
          key={detail.label}
          className="grid grid-cols-[minmax(110px,0.8fr)_minmax(0,1.2fr)] gap-4 border-b border-[#e8ebef] py-3 last:border-b-0"
        >
          <dt className="text-[10px] font-semibold uppercase tracking-wider text-[#667085]">
            {detail.label}
          </dt>

          <dd className="text-right text-xs font-medium text-[#202124]">
            {detail.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export default function PersonalInformation({
  personalInformation,
  migrationInformation,
}: PersonalInformationProps) {
  return (
    <section className="grid gap-8 lg:grid-cols-2">
      <article>
        <div className="flex items-center gap-2 border-b border-[#dfe3e8] pb-4">
          <UserRound className="h-4 w-4" />

          <h2 className="text-sm font-bold text-[#202124]">
            Personal Identification
          </h2>
        </div>

        <DetailsList details={personalInformation} />
      </article>

      <article>
        <div className="flex items-center gap-2 border-b border-[#dfe3e8] pb-4">
          <Globe2 className="h-4 w-4" />

          <h2 className="text-sm font-bold text-[#202124]">
            Migration Status
          </h2>
        </div>

        <DetailsList details={migrationInformation} />
      </article>
    </section>
  );
}