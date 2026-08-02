import type { AutomatedReport } from "@/data/reports";
import {
  CalendarDays,
  ChevronRight,
  Clock3,
  Download,
  FileText,
  Share2,
} from "lucide-react";

type AutomatedTasksProps = {
  tasks: AutomatedReport[];
};

export default function AutomatedTasks({
  tasks,
}: AutomatedTasksProps) {
  return (
    <aside className="space-y-5">
      <section className="overflow-hidden rounded-xl border border-[#edf0f3] bg-white shadow-sm">
        <div className="border-b border-[#dfe3e8] p-6">
          <div className="flex items-center gap-3">
            <CalendarDays className="h-5 w-5 text-[#202124]" />

            <h2 className="text-xl font-bold tracking-tight text-[#202124]">
              Automated Tasks
            </h2>
          </div>

          <p className="mt-2 text-sm leading-6 text-[#667085]">
            Recurring report generation and distribution schedules.
          </p>
        </div>

        <div className="divide-y divide-[#dfe3e8] px-5">
          {tasks.map((task) => (
            <article key={task.id} className="py-5">
              <h3 className="text-sm font-medium leading-5 text-[#202124]">
                {task.title}
              </h3>

              <p className="mt-2 flex items-center gap-2 text-[10px] text-[#667085]">
                <Clock3 className="h-3.5 w-3.5" />
                {task.schedule} • Next: {task.nextRun}
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                {task.recipients.map((recipient) => (
                  <span
                    key={recipient}
                    className="rounded-full border border-[#d8dde5] bg-[#fafafa] px-2 py-1 text-[9px] font-medium text-[#202124]"
                  >
                    {recipient}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="border-t border-[#dfe3e8] p-5">
          <button
            type="button"
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-md border border-dashed border-[#aeb5bf] bg-white text-xs font-medium text-[#202124] hover:bg-[#f7f8fa]"
          >
            <Share2 className="h-4 w-4" />
            Manage Sharing Permissions
          </button>
        </div>
      </section>

      <section className="relative overflow-hidden rounded-xl bg-[#181818] p-6 text-white shadow-lg">
        <ChevronRight className="absolute right-5 top-4 h-24 w-24 rotate-90 text-white/8" />

        <div className="relative">
          <div className="flex items-start gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-white/15">
              <FileText className="h-5 w-5" />
            </span>

            <h2 className="text-xl font-bold leading-tight">
              National
              <br />
              Summary PDF
            </h2>
          </div>

          <p className="mt-6 text-sm leading-6 text-white/70">
            Download the comprehensive 45-page executive summary for the
            Ministry Board Meeting.
          </p>

          <button
            type="button"
            className="mt-8 inline-flex h-11 w-full items-center justify-center gap-2 rounded-md bg-white px-4 text-sm font-semibold text-[#202124] hover:bg-[#eeeeec]"
          >
            <Download className="h-4 w-4" />
            Download Full Report
          </button>
        </div>
      </section>
    </aside>
  );
}