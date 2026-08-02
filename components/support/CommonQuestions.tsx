"use client";

import type { FAQItem } from "@/data/support";
import {
  ChevronDown,
  CircleHelp,
} from "lucide-react";
import { useState } from "react";

type CommonQuestionsProps = {
  questions: FAQItem[];
};

export default function CommonQuestions({
  questions,
}: CommonQuestionsProps) {
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);

  return (
    <section>
      <div className="flex items-center gap-3 border-b border-[#dfe3e8] pb-4">
        <CircleHelp className="h-5 w-5 text-[#667085]" />

        <h2 className="text-xl font-bold text-[#202124]">
          Common Inquiries
        </h2>
      </div>

      <div className="mt-4 overflow-hidden rounded-lg border border-[#d8dde5] bg-white">
        {questions.map((item) => {
          const isOpen = openQuestion === item.id;

          return (
            <article
              key={item.id}
              className="border-b border-[#d8dde5] last:border-b-0"
            >
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() =>
                  setOpenQuestion((current) =>
                    current === item.id ? null : item.id
                  )
                }
                className="flex min-h-14 w-full items-center justify-between gap-4 px-5 text-left text-sm font-medium text-[#202124] transition hover:bg-[#fafbfc]"
              >
                {item.question}

                <ChevronDown
                  className={`h-4 w-4 shrink-0 transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isOpen && (
                <div className="border-t border-[#edf0f3] bg-[#fafbfc] px-5 py-4 text-sm leading-6 text-[#667085]">
                  {item.answer}
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}