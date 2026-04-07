"use client";

import { CATEGORY_OPTIONS, type CommentFilters } from "@/lib/domain/comment-query";

interface FilterPanelProps {
  filters: CommentFilters;
  onChange: (next: CommentFilters) => void;
}

export function FilterPanel({ filters, onChange }: FilterPanelProps) {
  function update(patch: Partial<CommentFilters>): void {
    onChange({ ...filters, ...patch });
  }

  return (
    <section className="panel filter-panel" aria-label="筛选条件">
      <div className="filter-header">
        <p className="filter-kicker">FILTERS</p>
        <h2 className="filter-title">按决策重点缩小范围</h2>
      </div>

      <section className="filter-group" aria-label="核心偏好">
        <h3 className="filter-group-title">核心偏好</h3>

        <div className="field">
          <label htmlFor="filter-star">星级</label>
          <select
            id="filter-star"
            className="input"
            value={filters.star ?? ""}
            onChange={(event) =>
              update({
                star: event.target.value ? Number(event.target.value) : undefined
              })
            }
          >
            <option value="">全部星级</option>
            <option value="5">5 星</option>
            <option value="4">4 星</option>
            <option value="3">3 星</option>
            <option value="2">2 星</option>
            <option value="1">1 星</option>
          </select>
        </div>

        <div className="field">
          <label htmlFor="filter-category">分类小类</label>
          <select
            id="filter-category"
            className="input"
            value={filters.category ?? ""}
            onChange={(event) => update({ category: (event.target.value || undefined) as never })}
          >
            <option value="">全部分类</option>
            {CATEGORY_OPTIONS.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label htmlFor="filter-travel-type">出行类型</label>
          <input
            id="filter-travel-type"
            className="input"
            value={filters.travelType ?? ""}
            onChange={(event) => update({ travelType: event.target.value || undefined })}
            placeholder="例如：家庭亲子"
          />
        </div>
      </section>

      <section className="filter-group" aria-label="入住时间">
        <h3 className="filter-group-title">入住时间</h3>

        <div className="field-row">
          <div className="field">
            <label htmlFor="filter-date-from">开始日期</label>
            <input
              id="filter-date-from"
              className="input"
              type="date"
              value={filters.dateFrom ?? ""}
              onChange={(event) => update({ dateFrom: event.target.value || undefined })}
            />
          </div>

          <div className="field">
            <label htmlFor="filter-date-to">结束日期</label>
            <input
              id="filter-date-to"
              className="input"
              type="date"
              value={filters.dateTo ?? ""}
              onChange={(event) => update({ dateTo: event.target.value || undefined })}
            />
          </div>
        </div>
      </section>

      <details className="filter-group filter-group-more">
        <summary className="filter-summary">更多条件（可选）</summary>

        <div className="field">
          <label htmlFor="filter-fuzzy-room-type">归一化房型</label>
          <input
            id="filter-fuzzy-room-type"
            className="input"
            value={filters.fuzzyRoomType ?? ""}
            onChange={(event) => update({ fuzzyRoomType: event.target.value || undefined })}
            placeholder="例如：套房"
          />
        </div>
      </details>
    </section>
  );
}
