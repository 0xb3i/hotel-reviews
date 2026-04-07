"use client";

import { type CommentFilters } from "@/lib/domain/comment-query";
import { getActiveFilterEntries } from "@/lib/filters/filter-schema";

interface ActiveFiltersProps {
  filters: CommentFilters;
  onReset: () => void;
}

export function ActiveFilters({ filters, onReset }: ActiveFiltersProps) {
  const entries = getActiveFilterEntries(filters);
  const summary =
    entries.length === 0
      ? "未设置筛选条件"
      : `${entries
          .slice(0, 4)
          .map(([name, value]) => `${name}${value}`)
          .join(" · ")}${entries.length > 4 ? ` · 等 ${entries.length} 项` : ""}`;

  return (
    <section className="active-filters" aria-label="当前筛选">
      <div className="active-summary">
        <p className="active-label">当前筛选</p>
        <p className="active-text">{summary}</p>
      </div>
      <button className="btn" type="button" onClick={onReset}>
        清空筛选
      </button>
    </section>
  );
}
