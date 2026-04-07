"use client";

import { type SortBy, type SortOrder } from "@/lib/domain/comment-query";

interface ListControlsProps {
  sortBy: SortBy;
  sortOrder: SortOrder;
  pageSize: number;
  onSortByChange: (sortBy: SortBy) => void;
  onSortOrderChange: (sortOrder: SortOrder) => void;
  onPageSizeChange: (pageSize: number) => void;
}

export function ListControls({
  sortBy,
  sortOrder,
  pageSize,
  onSortByChange,
  onSortOrderChange,
  onPageSizeChange
}: ListControlsProps) {
  return (
    <section className="controls" aria-label="排序与分页控制">
      <div className="controls-head">
        <h2 className="controls-title">排序与浏览节奏</h2>
        <p className="controls-note">排序规则会直接影响比较结论，请优先按你关心的维度查看。</p>
      </div>

      <div className="controls-grid">
        <div className="field inline">
          <label>排序字段</label>
          <select
            className="input"
            value={sortBy}
            onChange={(event) => onSortByChange(event.target.value as SortBy)}
          >
            <option value="publish_date">发布时间</option>
            <option value="score">评分</option>
            <option value="useful_count">有用数</option>
            <option value="review_count">历史评论数</option>
          </select>
        </div>

        <div className="field inline">
          <label>排序方向</label>
          <select
            className="input"
            value={sortOrder}
            onChange={(event) => onSortOrderChange(event.target.value as SortOrder)}
          >
            <option value="desc">降序</option>
            <option value="asc">升序</option>
          </select>
        </div>

        <div className="field inline">
          <label>每页条数</label>
          <select
            className="input"
            value={pageSize}
            onChange={(event) => onPageSizeChange(Number(event.target.value))}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>
    </section>
  );
}
