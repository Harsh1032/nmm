// src/components/auth/SystemFooter.tsx

export default function SystemFooter() {
  return (
    <footer className="border-t-[5px] border-[#202124] bg-white">
      <div className="mx-auto flex max-w-375 flex-col gap-4 px-5 py-6 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#9aa1ad] sm:px-8 md:flex-row md:items-center md:justify-between lg:px-12">
        <p>© 2026 Republic of National Affairs • Ministry of Labour</p>

        <div className="flex flex-wrap gap-x-10 gap-y-2">
          <span>EN-US System Stable</span>
          <span>Latency: 24ms</span>
        </div>
      </div>
    </footer>
  );
}