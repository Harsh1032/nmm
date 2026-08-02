import type { KnowledgeArticle } from "@/data/support";
import { BookOpen, ChevronRight } from "lucide-react";

type KnowledgeBaseProps = {
  articles: KnowledgeArticle[];
};

export default function KnowledgeBase({
  articles,
}: KnowledgeBaseProps) {
  return (
    <section>
      <div className="flex items-center gap-3">
        <BookOpen className="h-5 w-5 text-[#202124]" />

        <h2 className="text-2xl font-bold tracking-[-0.03em] text-[#202124]">
          Knowledge Base
        </h2>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {articles.map((article) => {
          const Icon = article.icon;

          return (
            <button
              key={article.id}
              type="button"
              className="group flex min-h-28 items-start gap-4 rounded-lg border border-[#d8dde5] bg-white p-5 text-left transition hover:border-[#aeb5bf] hover:bg-[#fafbfc]"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[#f4f5f6]">
                <Icon className="h-5 w-5 text-[#667085]" />
              </span>

              <span className="min-w-0 flex-1">
                <span className="flex items-start justify-between gap-3">
                  <span className="text-base font-medium text-[#202124]">
                    {article.title}
                  </span>

                  <span className="shrink-0 rounded-md bg-[#f0f1f3] px-2 py-1 text-[10px] text-[#667085]">
                    {article.articleCount} Articles
                  </span>
                </span>

                <span className="mt-2 block text-xs leading-5 text-[#667085]">
                  {article.description}
                </span>
              </span>

              <ChevronRight className="mt-2 h-4 w-4 shrink-0 text-[#98a0ae] transition group-hover:translate-x-1" />
            </button>
          );
        })}
      </div>
    </section>
  );
}