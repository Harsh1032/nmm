"use client";

import { FileBarChart, Filter } from "lucide-react";

export type ReportFilters = {
  nationality: string;
  operationalStatus: string;
  employer: string;
  destination: string;
  health: boolean;
  legal: boolean;
  shelter: boolean;
};

type ReportCriteriaBuilderProps = {
  filters: ReportFilters;
  onChange: (filters: ReportFilters) => void;
  onRefresh: () => void;
};

export default function ReportCriteriaBuilder({
  filters,
  onChange,
  onRefresh,
}: ReportCriteriaBuilderProps) {
  function update<K extends keyof ReportFilters>(
    key: K,
    value: ReportFilters[K]
  ) {
    onChange({
      ...filters,
      [key]: value,
    });
  }

  return (
    <section className="rounded-xl border border-[#edf0f3] bg-white p-6 shadow-sm">
      <div className="flex items-start gap-3">
        <Filter className="mt-1 h-5 w-5 text-[#202124]" />

        <div>
          <h2 className="text-xl font-bold tracking-tight text-[#202124]">
            Report Criteria Builder
          </h2>

          <p className="mt-1 text-sm text-[#667085]">
            Configure dimensions and filters to generate targeted datasets.
          </p>
        </div>
      </div>

      <div className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        <label className="block">
          <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#667085]">
            Demographics
          </span>

          <select
            value={filters.nationality}
            onChange={(event) =>
              update("nationality", event.target.value)
            }
            className="h-11 w-full rounded-md border border-[#d8dde5] bg-white px-3 text-sm text-[#202124] outline-none focus:border-[#202124]"
          >
            <option value="All Nationalities">All Nationalities</option>
            <option value="Ugandan">Ugandan</option>
            <option value="Kenyan">Kenyan</option>
            <option value="Ethiopian">Ethiopian</option>
            <option value="Sudanese">Sudanese</option>
          </select>
        </label>

        <label className="block">
          <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#667085]">
            Operational Context
          </span>

          <select
            value={filters.operationalStatus}
            onChange={(event) =>
              update("operationalStatus", event.target.value)
            }
            className="h-11 w-full rounded-md border border-[#d8dde5] bg-white px-3 text-sm text-[#202124] outline-none focus:border-[#202124]"
          >
            <option value="Active (Verified)">Active (Verified)</option>
            <option value="Under Review">Under Review</option>
            <option value="Expired">Expired</option>
            <option value="Flagged">Flagged</option>
          </select>
        </label>

        <label className="block">
          <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#667085]">
            Employment
          </span>

          <input
            type="search"
            value={filters.employer}
            onChange={(event) => update("employer", event.target.value)}
            placeholder="Search Employer (e.g. Emaar)"
            className="h-11 w-full rounded-md border border-[#d8dde5] bg-white px-3 text-sm text-[#202124] outline-none placeholder:text-[#98a0ae] focus:border-[#202124]"
          />
        </label>

        <fieldset>
          <legend className="mb-3 text-xs font-bold uppercase tracking-wider text-[#667085]">
            Support Usage
          </legend>

          <div className="flex flex-wrap gap-5">
            <label className="inline-flex items-center gap-2 text-sm text-[#202124]">
              <input
                type="checkbox"
                checked={filters.health}
                onChange={(event) =>
                  update("health", event.target.checked)
                }
                className="h-4 w-4 accent-blue-600"
              />
              Health
            </label>

            <label className="inline-flex items-center gap-2 text-sm text-[#202124]">
              <input
                type="checkbox"
                checked={filters.legal}
                onChange={(event) =>
                  update("legal", event.target.checked)
                }
                className="h-4 w-4 accent-blue-600"
              />
              Legal
            </label>

            <label className="inline-flex items-center gap-2 text-sm text-[#202124]">
              <input
                type="checkbox"
                checked={filters.shelter}
                onChange={(event) =>
                  update("shelter", event.target.checked)
                }
                className="h-4 w-4 accent-blue-600"
              />
              Shelter
            </label>
          </div>
        </fieldset>

        <label className="block">
          <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#667085]">
            Destination
          </span>

          <select
            value={filters.destination}
            onChange={(event) =>
              update("destination", event.target.value)
            }
            className="h-11 w-full rounded-md border border-[#d8dde5] bg-white px-3 text-sm text-[#202124] outline-none focus:border-[#202124]"
          >
            <option value="GCC Countries">GCC Countries</option>
            <option value="United Arab Emirates">
              United Arab Emirates
            </option>
            <option value="Saudi Arabia">Saudi Arabia</option>
            <option value="Qatar">Qatar</option>
            <option value="Uganda">Uganda</option>
          </select>
        </label>

        <div className="flex items-end">
          <button
            type="button"
            onClick={onRefresh}
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-md bg-[#f0f1f3] px-4 text-sm font-medium text-[#202124] transition hover:bg-[#e5e7ea]"
          >
            <FileBarChart className="h-4 w-4" />
            Refresh Live Preview
          </button>
        </div>
      </div>
    </section>
  );
}