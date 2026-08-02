// src/components/dashboard/DashboardFooter.tsx

export default function DashboardFooter() {
  return (
    <footer className="border-t border-[#dfe3e8] bg-white px-5 py-5">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-3 text-[10px] font-medium uppercase tracking-[0.12em] text-[#7b8494] md:flex-row md:items-center md:justify-between">
        <p>© 2026 Ministry of Internal Affairs &amp; Labour</p>

        <div className="flex flex-wrap gap-x-7 gap-y-2">
          <span>Privacy Policy</span>
          <span>Data Protection Act Compliance</span>
          <span>V2.4.0-Build</span>
        </div>
      </div>
    </footer>
  );
}