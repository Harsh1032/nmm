import {
  MessageSquare,
  Phone,
} from "lucide-react";

export default function DirectAssistance() {
  return (
    <section>
      <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-[#667085]">
        Direct Assistance
      </h2>

      <div className="mt-4 space-y-4">
        <a
          href="tel:+256800123456"
          className="flex items-center gap-4 rounded-lg border border-[#d8dde5] bg-white p-5 transition hover:bg-[#fafbfc]"
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#f5f6f7]">
            <Phone className="h-5 w-5 text-[#202124]" />
          </span>

          <span>
            <span className="block text-xs uppercase text-[#667085]">
              National Hotline
            </span>

            <span className="mt-1 block text-sm font-bold text-[#202124]">
              +256 800 123 456
            </span>

            <span className="mt-1 block text-[10px] text-[#667085]">
              Available 24/7 for border emergencies
            </span>
          </span>
        </a>

        <button
          type="button"
          className="flex w-full items-center gap-4 rounded-lg border border-[#d8dde5] bg-white p-5 text-left transition hover:bg-[#fafbfc]"
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#f5f6f7]">
            <MessageSquare className="h-5 w-5 text-[#202124]" />
          </span>

          <span>
            <span className="block text-xs uppercase text-[#667085]">
              Secure Messenger
            </span>

            <span className="mt-1 block text-sm font-bold text-[#202124]">
              Start Live Chat
            </span>

            <span className="mt-1 block text-[10px] text-[#667085]">
              Typical wait time: 3 mins
            </span>
          </span>
        </button>
      </div>
    </section>
  );
}