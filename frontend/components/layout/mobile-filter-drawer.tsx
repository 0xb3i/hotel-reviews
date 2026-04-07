"use client";

import { type MouseEvent } from "react";
import { FilterPanel } from "@/components/filters/filter-panel";
import { ActiveFilters } from "@/components/filters/active-filters";
import { type CommentFilters } from "@/lib/domain/comment-query";

interface MobileFilterDrawerProps {
  open: boolean;
  filters: CommentFilters;
  onChange: (next: CommentFilters) => void;
  onReset: () => void;
  onClose: () => void;
}

export function MobileFilterDrawer({
  open,
  filters,
  onChange,
  onReset,
  onClose
}: MobileFilterDrawerProps) {
  if (!open) {
    return null;
  }

  function stopPropagation(event: MouseEvent<HTMLDivElement>): void {
    event.stopPropagation();
  }

  return (
    <div className="drawer-mask" onClick={onClose}>
      <div
        className="drawer-card"
        role="dialog"
        aria-modal="true"
        aria-label="移动端筛选抽屉"
        onClick={stopPropagation}
      >
        <div className="drawer-head">
          <h2>筛选条件</h2>
          <button className="btn" type="button" onClick={onClose}>
            关闭筛选
          </button>
        </div>
        <FilterPanel filters={filters} onChange={onChange} />
        <ActiveFilters filters={filters} onReset={onReset} />
      </div>
    </div>
  );
}
