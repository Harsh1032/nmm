// src/components/profile/ProfileTabs.tsx

"use client";

import { useState } from "react";

const tabs = [
  "Overview",
  "Documents",
  "Medical & Support",
  "Case History",
];

export default function ProfileTabs() {
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <div className="overflow-x-auto rounded-lg border border-[#dfe3e8] bg-[#f6f7f8] p-1">
      <div className="flex min-w-142.5">
        {tabs.map((tab) => {
          const active = activeTab === tab;

          return (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`h-10 flex-1 rounded-md px-5 text-xs font-medium transition ${
                active
                  ? "bg-white text-[#202124] shadow-sm"
                  : "text-[#667085] hover:text-[#202124]"
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>
    </div>
  );
}