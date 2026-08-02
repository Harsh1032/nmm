// src/components/profile/ProfileSidebar.tsx

import type { RelatedContact } from "@/data/profile";
import {
  AlertTriangle,
  Building2,
  CircleAlert,
  Gavel,
  Home,
  Phone,
  Plus,
  ShieldAlert,
} from "lucide-react";

type ProfileSidebarProps = {
  relatedContacts: RelatedContact[];
};

const interventionActions = [
  {
    label: "Flag for Police Review",
    icon: ShieldAlert,
    danger: true,
  },
  {
    label: "Initiate Shelter Transfer",
    icon: Home,
  },
  {
    label: "Request Emergency Legal Aid",
    icon: Gavel,
  },
  {
    label: "Report Contract Violation",
    icon: AlertTriangle,
  },
];

export default function ProfileSidebar({
  relatedContacts,
}: ProfileSidebarProps) {
  return (
    <aside className="space-y-6">
      <section className="overflow-hidden rounded-lg border border-red-200 bg-red-50">
        <div className="flex items-center gap-2 bg-red-500 px-4 py-3 text-white">
          <CircleAlert className="h-4 w-4" />

          <h2 className="text-[10px] font-bold uppercase">
            Critical Interventions
          </h2>
        </div>

        <div className="p-4">
          <p className="text-[10px] leading-4 text-[#667085]">
            Authorized personnel only. Actions are logged and tracked by the
            Internal Affairs bureau.
          </p>

          <div className="mt-4 space-y-3">
            {interventionActions.map((action) => {
              const Icon = action.icon;

              return (
                <button
                  key={action.label}
                  type="button"
                  className={`flex min-h-11 w-full items-center gap-3 rounded-md border bg-white px-4 text-left text-[11px] font-medium transition hover:bg-[#fafafa] ${
                    action.danger
                      ? "border-red-200 text-[#202124]"
                      : "border-[#d8dde5] text-[#202124]"
                  }`}
                >
                  <Icon
                    className={`h-4 w-4 shrink-0 ${
                      action.danger ? "text-red-500" : "text-[#202124]"
                    }`}
                  />

                  {action.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="rounded-lg border border-[#edf0f3] bg-white p-5">
        <div className="flex items-center gap-2 border-b border-[#dfe3e8] pb-4">
          <Phone className="h-4 w-4" />

          <h2 className="text-sm font-bold text-[#202124]">
            Emergency &amp; Related Contacts
          </h2>
        </div>

        <div className="mt-5 space-y-5">
          {relatedContacts.map((contact) => (
            <article
              key={contact.name}
              className="flex items-start gap-3"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#e7e9ec] text-[10px] font-bold text-[#202124]">
                {contact.initials}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-start">
                  <div>
                    <p className="text-[11px] font-bold text-[#202124]">
                      {contact.name}
                    </p>

                    <p className="mt-1 text-[9px] text-[#667085]">
                      {contact.contact}
                    </p>
                  </div>

                  <span className="w-fit rounded-full border border-[#d8dde5] px-2 py-1 text-[8px] text-[#475467]">
                    {contact.category}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        <button
          type="button"
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-md py-2 text-[10px] font-medium text-[#667085] transition hover:bg-[#f5f6f7] hover:text-[#202124]"
        >
          <Plus className="h-3.5 w-3.5" />
          Add Related Person
        </button>
      </section>

      <section className="rounded-lg border border-[#dfe3e8] bg-white p-5">
        <div className="flex justify-between gap-4">
          <div>
            <p className="text-[9px] font-semibold uppercase text-[#667085]">
              Last System Access
            </p>

            <p className="mt-2 text-[10px] font-medium text-[#202124]">
              Audit Log Hash
            </p>
          </div>

          <div className="text-right">
            <p className="text-[9px] font-medium text-[#202124]">
              10 Minutes Ago
            </p>

            <p className="mt-2 text-[9px] text-[#667085]">8f2a...c019</p>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2 text-[9px] font-medium text-emerald-600">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          Records Encrypted &amp; Secure
        </div>
      </section>
    </aside>
  );
}