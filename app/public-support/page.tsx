import {
  ArrowRight,
  Building2,
  CircleHelp,
  FileText,
  HeartHandshake,
  LifeBuoy,
  LockKeyhole,
  Mail,
  MessageSquareText,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import Link from "next/link";

export default function PublicSupportPage() {
  return (
    <main className="min-h-screen bg-[#f7f8fa]">
      {/* HERO */}
      <section className="border-b border-[#e2e6eb] bg-white">
        <div className="mx-auto max-w-375 px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_460px]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#dfe3e8] bg-[#fafbfc] px-3 py-1.5 text-xs font-semibold text-[#475467]">
                <LifeBuoy className="h-4 w-4" />
                National Migration Monitor Support
              </div>

              <h1 className="mt-6 max-w-4xl text-4xl font-bold tracking-tighter text-[#202124] sm:text-5xl lg:text-6xl">
                Migration support,
                guidance and assistance
                in one place.
              </h1>

              <p className="mt-6 max-w-3xl text-base leading-8 text-[#667085] sm:text-lg">
                Find guidance for migration applications, employment
                processing, humanitarian support, documentation and
                account access. Registered individuals and employers
                can securely communicate with the technical support
                team through their portal.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/staff-login"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-[#181818] px-6 text-sm font-semibold text-white transition hover:bg-black"
                >
                  <span className="text-white">Sign In to Your Portal</span>
                  <ArrowRight className="h-4 w-4 text-white" />
                </Link>

                <Link
                  href="/register"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-[#d8dde5] bg-white px-6 text-sm font-semibold text-[#202124] transition hover:bg-[#fafbfc]"
                >
                  Create an Account
                </Link>
              </div>
            </div>

            <div className="rounded-2xl border border-[#e2e6eb] bg-[#181818] p-7 text-white shadow-sm sm:p-8">
              <ShieldCheck className="h-7 w-7" />

              <h2 className="mt-6 text-2xl font-bold">
                Already have an active case?
              </h2>

              <p className="mt-3 text-sm leading-7 text-white/65">
                Sign in to view your application status, respond to
                requests for more information, and continue an existing
                support conversation.
              </p>

              <Link
                href="/staff-login"
                className="mt-7 inline-flex h-11 w-full items-center justify-center gap-2 rounded-md bg-white px-5 text-sm font-semibold text-[#181818]"
              >
                <span className="text-black">Continue to Secure Login</span>
                <ArrowRight className="h-4 w-4 text-black" />
              </Link>

              <div className="mt-6 border-t border-white/10 pt-6">
                <div className="flex items-start gap-3">
                  <LockKeyhole className="mt-0.5 h-4 w-4 shrink-0 text-white/70" />

                  <p className="text-xs leading-6 text-white/55">
                    Personal application details and support conversations
                    are available only after authenticated sign-in.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SUPPORT PATHS */}
      <section className="mx-auto max-w-375 px-4 py-14 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#667085]">
            Choose the right support channel
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-[-0.04em] text-[#202124]">
            How can we help?
          </h2>

          <p className="mt-3 text-sm leading-7 text-[#667085]">
            Select the category closest to your situation. Registered
            users should sign in before submitting case-specific questions.
          </p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <SupportCard
            icon={UserRound}
            title="Individual & Migrant Support"
            description="Application status, migration documents, employment concerns, identity records and personal assistance."
            href="/staff-login"
            action="Sign In as Individual"
          />

          <SupportCard
            icon={Building2}
            title="Employer Support"
            description="Worker submissions, bulk uploads, organization registration, compliance issues and workforce applications."
            href="/staff-login"
            action="Sign In as Employer"
          />

          <SupportCard
            icon={HeartHandshake}
            title="Humanitarian Assistance"
            description="Refugee protection, shelter, medical, legal and other humanitarian support services."
            href="/staff-login"
            action="Access Support Portal"
          />

          <SupportCard
            icon={FileText}
            title="Application Guidance"
            description="Understand application types, required information, review stages and processing outcomes."
            href="/register"
            action="Start Registration"
          />
        </div>
      </section>

      {/* PROCESS */}
      <section className="border-y border-[#e2e6eb] bg-white">
        <div className="mx-auto max-w-375 px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[380px_minmax(0,1fr)]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#667085]">
                Support process
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-[-0.04em]">
                What happens after you request help?
              </h2>

              <p className="mt-4 text-sm leading-7 text-[#667085]">
                Your request is routed to the appropriate technical
                team and remains visible inside your secure portal.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <ProcessStep
                number="01"
                title="Sign in"
                text="Access your secure individual or employer portal."
              />

              <ProcessStep
                number="02"
                title="Submit your request"
                text="Choose the support category and explain the issue."
              />

              <ProcessStep
                number="03"
                title="Technical review"
                text="The technical team reviews the request and may ask for additional information."
              />

              <ProcessStep
                number="04"
                title="Continue the conversation"
                text="Reply directly from your portal until the issue is resolved."
              />
            </div>
          </div>
        </div>
      </section>

      {/* COMMON HELP */}
      <section className="mx-auto max-w-375 px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_420px]">
          <section>
            <div className="flex items-center gap-3">
              <CircleHelp className="h-5 w-5" />

              <h2 className="text-2xl font-bold">
                Common Support Topics
              </h2>
            </div>

            <div className="mt-6 overflow-hidden rounded-xl border border-[#e2e6eb] bg-white">
              <HelpRow
                title="I submitted an application. How do I check the status?"
                text="Sign in to your individual or employer portal and open My Applications or Worker Applications."
              />

              <HelpRow
                title="The government requested more information."
                text="Open the application from your portal and review the government feedback before providing the requested information."
              />

              <HelpRow
                title="My employer submitted my application."
                text="Your employer can track the worker application through its organization portal."
              />

              <HelpRow
                title="I have an employment, legal or humanitarian concern."
                text="Registered individuals can submit a support request and communicate directly with the technical support team."
              />

              <HelpRow
                title="I cannot access my account."
                text="Use the secure login page first. Account-access issues can then be escalated through the appropriate support channel."
                last
              />
            </div>
          </section>

          <aside className="space-y-5">
            <section className="rounded-xl border border-[#e2e6eb] bg-white p-6">
              <MessageSquareText className="h-5 w-5" />

              <h2 className="mt-4 text-lg font-bold">
                Need case-specific assistance?
              </h2>

              <p className="mt-3 text-sm leading-7 text-[#667085]">
                For security and privacy, application-specific support
                is handled only through authenticated user accounts.
              </p>

              <Link
                href="/staff-login"
                className="mt-6 inline-flex h-11 w-full items-center justify-center gap-2 rounded-md bg-[#181818] text-sm font-semibold text-white"
              >
                <span className="text-white">Sign In & Contact Support</span>
                <ArrowRight className="h-4 w-4 text-white" />
              </Link>
            </section>

            <section className="rounded-xl border border-[#e2e6eb] bg-white p-6">
              <Mail className="h-5 w-5" />

              <h2 className="mt-4 text-lg font-bold">
                General Information
              </h2>

              <p className="mt-3 text-sm leading-7 text-[#667085]">
                For general information about registration or using the
                National Migration Monitor, review the registration and
                portal guidance before opening a support case.
              </p>

              <Link
                href="/register"
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold"
              >
                View Registration Options
                <ArrowRight className="h-4 w-4" />
              </Link>
            </section>
          </aside>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-[#181818]">
        <div className="mx-auto flex max-w-375 flex-col justify-between gap-7 px-4 py-12 text-white sm:px-6 md:flex-row md:items-center lg:px-8">
          <div>
            <h2 className="text-2xl font-bold">
              Ready to access your migration services?
            </h2>

            <p className="mt-2 text-sm text-white/60">
              Sign in to track applications, respond to government
              requests and contact technical support securely.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/staff-login"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-white px-5 text-sm font-semibold text-[#181818]"
            >
              Secure Login
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/register"
              className="inline-flex h-11 items-center justify-center rounded-md border border-white/20 px-5 text-sm font-semibold text-white"
            >
              Register
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function SupportCard({
  icon: Icon,
  title,
  description,
  href,
  action,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  href: string;
  action: string;
}) {
  return (
    <article className="flex min-h-72.5 flex-col rounded-xl border border-[#e2e6eb] bg-white p-6 shadow-[0_2px_8px_rgba(16,24,40,0.03)]">
      <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#f1f2f4]">
        <Icon className="h-5 w-5" />
      </span>

      <h3 className="mt-5 text-lg font-bold">
        {title}
      </h3>

      <p className="mt-3 flex-1 text-sm leading-7 text-[#667085]">
        {description}
      </p>

      <Link
        href={href}
        className="mt-6 inline-flex items-center gap-2 text-sm font-semibold"
      >
        {action}
        <ArrowRight className="h-4 w-4" />
      </Link>
    </article>
  );
}

function ProcessStep({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <article className="rounded-xl border border-[#e2e6eb] bg-[#fafbfc] p-5">
      <span className="text-xs font-bold text-[#667085]">
        {number}
      </span>

      <h3 className="mt-3 font-bold">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-[#667085]">
        {text}
      </p>
    </article>
  );
}

function HelpRow({
  title,
  text,
  last = false,
}: {
  title: string;
  text: string;
  last?: boolean;
}) {
  return (
    <div
      className={`px-6 py-5 ${
        last
          ? ""
          : "border-b border-[#edf0f3]"
      }`}
    >
      <p className="text-sm font-bold">
        {title}
      </p>

      <p className="mt-2 text-sm leading-6 text-[#667085]">
        {text}
      </p>
    </div>
  );
}