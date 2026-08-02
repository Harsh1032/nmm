"use client";

import { login, type LoginState } from "@/app/staff-login/actions";
import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  Check,
  Eye,
  EyeOff,
  Fingerprint,
  Globe2,
  IdCard,
  Info,
  LockKeyhole,
  Scale,
  ShieldCheck,
  UserRound,
  Users,
  type LucideIcon,
} from "lucide-react";
import { useActionState, useState } from "react";

type RoleId =
  | "ministry"
  | "admin"
  | "agency"
  | "ngo"
  | "police"
  | "employer"
  | "public";

type PortalRole = {
  id: RoleId;
  name: string;
  description: string;
  icon: LucideIcon;
};

const roles: PortalRole[] = [
  {
    id: "ministry",
    name: "Ministry of Labour",
    description: "Policy, monitoring & worker records",
    icon: Building2,
  },
  {
    id: "admin",
    name: "Admin",
    description: "System configuration & user management",
    icon: ShieldCheck,
  },
  {
    id: "agency",
    name: "UN / Agency",
    description: "International refugee support & coordination",
    icon: Globe2,
  },
  {
    id: "ngo",
    name: "NGO Partner",
    description: "Field services & humanitarian aid tracking",
    icon: Users,
  },
  {
    id: "police",
    name: "Police / Border",
    description: "Identity verification & enforcement",
    icon: Scale,
  },
  {
    id: "employer",
    name: "Employer",
    description: "Migrant worker management & reporting",
    icon: BriefcaseBusiness,
  },
  {
    id: "public",
    name: "Citizen / Public",
    description: "Resource access & personal inquiries",
    icon: IdCard,
  },
];

const initialState: LoginState = {};

export default function StaffLoginForm() {
  const [selectedRole, setSelectedRole] =
    useState<RoleId>("ministry");

  const [showPassword, setShowPassword] = useState(false);

  const [state, formAction, pending] = useActionState(
    login,
    initialState
  );

  return (
    <section className="mx-auto w-full max-w-167.5 overflow-hidden rounded-xl border border-black/10 bg-white shadow-[0_12px_35px_rgba(16,24,40,0.08)] lg:mx-0">
      <div className="border-b border-black/10 px-6 py-6 sm:px-8">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-[#202124]">
              Portal Sign In
            </h2>

            <p className="mt-1 text-sm text-[#667085]">
              Select your designated role to access the monitoring dashboard.
            </p>
          </div>

          <span className="shrink-0 text-[10px] font-semibold uppercase text-[#8a919e]">
            Secure Server: US-EST-04
          </span>
        </div>
      </div>

      <form action={formAction}>
        <input
          type="hidden"
          name="selectedRole"
          value={selectedRole}
        />

        <div className="px-6 py-7 sm:px-8">
          <fieldset>
            <legend className="text-xs font-bold uppercase tracking-wide text-[#596273]">
              Select your official role
            </legend>

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {roles.map((role) => {
                const Icon = role.icon;
                const isSelected = selectedRole === role.id;

                return (
                  <button
                    key={role.id}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => setSelectedRole(role.id)}
                    className={`relative min-h-38.75 rounded-lg border p-4 text-left transition ${
                      isSelected
                        ? "border-[#202124] bg-[#f3f3f2] shadow-[inset_0_0_0_1px_#202124]"
                        : "border-[#dce0e6] bg-white hover:border-[#9aa1ab] hover:bg-[#fafafa]"
                    }`}
                  >
                    {isSelected && (
                      <span className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-[#202124] text-white">
                        <Check className="h-3 w-3" />
                      </span>
                    )}

                    <span
                      className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                        isSelected
                          ? "bg-[#202124] text-white"
                          : "bg-[#f2f3f5] text-[#667085]"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </span>

                    <span className="mt-4 block text-base font-bold leading-5 text-[#202124]">
                      {role.name}
                    </span>

                    <span className="mt-1.5 block text-xs leading-4 text-[#667085]">
                      {role.description}
                    </span>
                  </button>
                );
              })}
            </div>
          </fieldset>

          <div className="my-8 flex items-center gap-3">
            <div className="h-px flex-1 bg-[#d7dce2]" />

            <span className="text-xs font-medium uppercase text-[#667085]">
              Authentication details
            </span>

            <div className="h-px flex-1 bg-[#d7dce2]" />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="flex items-center gap-2 text-sm font-medium text-[#202124]">
                <UserRound className="h-4 w-4 text-[#667085]" />
                Government ID / Email
              </span>

              <input
                type="text"
                name="email"
                autoComplete="username"
                placeholder="e.g. A1234567-MOF"
                required
                className="mt-2 h-12 w-full rounded-md border border-[#d7dce2] bg-white px-4 text-sm text-[#202124] outline-none transition placeholder:text-[#98a0ae] focus:border-[#202124] focus:ring-2 focus:ring-black/10"
              />
            </label>

            <label className="block">
              <span className="flex items-center gap-2 text-sm font-medium text-[#202124]">
                <LockKeyhole className="h-4 w-4 text-[#667085]" />
                Security Password
              </span>

              <span className="relative mt-2 block">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  autoComplete="current-password"
                  placeholder="Enter security password"
                  required
                  className="h-12 w-full rounded-md border border-[#d7dce2] bg-white px-4 pr-12 text-sm text-[#202124] outline-none transition placeholder:text-[#98a0ae] focus:border-[#202124] focus:ring-2 focus:ring-black/10"
                />

                <button
                  type="button"
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                  onClick={() =>
                    setShowPassword((current) => !current)
                  }
                  className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center justify-center rounded p-1 text-[#667085] hover:bg-black/5 hover:text-[#202124]"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </span>
            </label>
          </div>

          {state.error && (
            <div
              role="alert"
              className="mt-5 flex items-start gap-2 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              <Info className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{state.error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={pending}
            className="mt-7 flex min-h-12 w-full items-center justify-center gap-3 rounded-md bg-[#181818] px-5 py-3 text-base font-bold text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
          >
            {pending
              ? "Authenticating..."
              : "Authenticate & Enter System"}

            {!pending && <ArrowRight className="h-5 w-5" />}
          </button>

          <button
            type="button"
            disabled
            className="mt-3 flex min-h-12 w-full items-center justify-center gap-3 rounded-md border border-[#cdd2d9] bg-white px-5 py-3 text-sm font-medium text-[#202124] opacity-50"
          >
            <Fingerprint className="h-5 w-5" />
            Continue with Gov-ID Single Sign-On
          </button>
        </div>
      </form>
    </section>
  );
}