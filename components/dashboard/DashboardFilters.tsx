// src/components/dashboard/DashboardFilters.tsx

"use client";

import { Filter, Search } from "lucide-react";

export type DashboardFilterValues = {
  search: string;
  nationality: string;
  destination: string;
  employer: string;
  visaStatus: string;
};

type DashboardFiltersProps = {
  filters: DashboardFilterValues;
  onChange: (filters: DashboardFilterValues) => void;
  nationalityOptions: string[];
  destinationOptions: string[];
  employerOptions: string[];
};

export default function DashboardFilters({
  filters,
  onChange,
  nationalityOptions,
  destinationOptions,
  employerOptions,
}: DashboardFiltersProps) {
  function updateFilter(
    key: keyof DashboardFilterValues,
    value: string
  ) {
    onChange({
      ...filters,
      [key]: value,
    });
  }

  return (
    <section className="grid gap-4 rounded-lg bg-white p-4 shadow-[0_2px_7px_rgba(16,24,40,0.03)] md:grid-cols-2 xl:grid-cols-[1.35fr_repeat(4,1fr)_auto]">
      <label className="block">
        <span className="mb-2 block text-[10px] font-bold uppercase text-[#667085]">
          Global Search
        </span>

        <span className="relative block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#667085]" />

          <input
            type="search"
            value={filters.search}
            onChange={(event) =>
              updateFilter("search", event.target.value)
            }
            placeholder="Search by name, passport or ID..."
            className="h-10 w-full rounded-md border border-[#d9dee6] pl-10 pr-3 text-sm outline-none focus:border-[#202124]"
          />
        </span>
      </label>

      <FilterSelect
        label="Nationality"
        value={filters.nationality}
        options={nationalityOptions}
        onChange={(value) =>
          updateFilter("nationality", value)
        }
      />

      <FilterSelect
        label="Destination"
        value={filters.destination}
        options={destinationOptions}
        onChange={(value) =>
          updateFilter("destination", value)
        }
      />

      <FilterSelect
        label="Employer"
        value={filters.employer}
        options={employerOptions}
        onChange={(value) =>
          updateFilter("employer", value)
        }
      />

      <FilterSelect
        label="Visa Status"
        value={filters.visaStatus}
        options={[
          "Approved",
          "Under Review",
          "Flagged",
          "Completed",
        ]}
        onChange={(value) =>
          updateFilter("visaStatus", value)
        }
      />

      <div className="flex items-end">
        <button
          type="button"
          onClick={() =>
            onChange({
              search: "",
              nationality: "All",
              destination: "All",
              employer: "All",
              visaStatus: "All",
            })
          }
          className="flex h-10 w-full items-center justify-center gap-2 rounded-md border border-[#d9dee6] bg-[#f7f8fa] px-4 text-sm font-medium xl:w-auto"
        >
          <Filter className="h-4 w-4" />
          Clear Filters
        </button>
      </div>
    </section>
  );
}

type FilterSelectProps = {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
};

function FilterSelect({
  label,
  value,
  options,
  onChange,
}: FilterSelectProps) {
  return (
    <label className="block">
      <span className="mb-2 block text-[10px] font-bold uppercase text-[#667085]">
        {label}
      </span>

      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-10 w-full rounded-md border border-[#d9dee6] bg-white px-3 text-sm text-[#202124] outline-none focus:border-[#202124]"
      >
        <option value="All">All</option>

        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}