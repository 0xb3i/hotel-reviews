"use client";

import { useEffect, useMemo, useState } from "react";
import { QueryFeedback } from "@/components/state/query-feedback";
import { CommentList } from "@/components/comments/comment-list";
import {
  CATEGORY_OPTIONS,
  DEFAULT_QUERY,
  type CategoryName,
  type CommentListResponse,
  type CommentQuery,
  type SortBy
} from "@/lib/domain/comment-query";
import { normalizeKeyword } from "@/lib/search/keyword-normalizer";
import { createCommentsListService } from "@/lib/services/comments-list-service";

type SortMode = "recent" | "score" | "useful" | "review";

const SORT_CONFIG: Record<SortMode, { label: string; sortBy: SortBy }> = {
  recent: { label: "最近入住", sortBy: "publish_date" },
  score: { label: "评分最高", sortBy: "score" },
  useful: { label: "有用数最多", sortBy: "useful_count" },
  review: { label: "点评数最多", sortBy: "review_count" }
};

function getRatingLabel(score: number): string {
  if (score >= 4.8) return "超棒";
  if (score >= 4.5) return "很好";
  if (score >= 4.0) return "不错";
  return "一般";
}


function toCategory(category: string | undefined): CategoryName | undefined {
  if (!category) return undefined;
  return CATEGORY_OPTIONS.includes(category as CategoryName) ? (category as CategoryName) : undefined;
}


function getProgressWidth(score: number): string {
  return `${(score / 5) * 100}%`;
}


export default function Home() {
  const service = useMemo(() => createCommentsListService(), []);

  const [response, setResponse] = useState<CommentListResponse>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>();

  const [page, setPage] = useState<number>(1);
  const [selectedSort, setSelectedSort] = useState<SortMode>("score");

  const [selectedRoomType, setSelectedRoomType] = useState<string>("");
  const [selectedTravelType, setSelectedTravelType] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();

  const [keywordInput, setKeywordInput] = useState<string>("");
  const [appliedKeyword, setAppliedKeyword] = useState<string>("");

  const query = useMemo<CommentQuery>(() => {
    const sortConfig = SORT_CONFIG[selectedSort];
    return {
      ...DEFAULT_QUERY,
      page,
      pageSize: 10,
      keyword: normalizeKeyword(appliedKeyword) || undefined,
      fuzzyRoomType: selectedRoomType || undefined,
      travelType: selectedTravelType || undefined,
      category: toCategory(selectedCategory),
      sortBy: sortConfig.sortBy,
      sortOrder: "desc"
    };
  }, [appliedKeyword, page, selectedCategory, selectedRoomType, selectedSort, selectedTravelType]);

  useEffect(() => {
    let cancelled = false;
    async function fetchComments() {
      setLoading(true);
      setError(undefined);
      try {
        const result = await service.list(query);
        if (!cancelled) setResponse(result);
      } catch {
        if (!cancelled) setError("评论查询失败，请检查网络或后端连接配置。");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    void fetchComments();
    return () => { cancelled = true; };
  }, [service, query]);

  function applyKeywordSearch(): void {
    setAppliedKeyword(keywordInput);
    setPage(1);
  }

  function handleRoomTypeChange(value: string): void {
    setSelectedRoomType(value);
    setPage(1);
  }

  function handleTravelTypeChange(value: string): void {
    setSelectedTravelType(value);
    setPage(1);
  }

  function handleSortChange(value: SortMode): void {
    setSelectedSort(value);
    setPage(1);
  }

  function handlePageChange(nextPage: number): void {
    setPage(nextPage);
  }

  const total = response?.total ?? 0;
  const currentPage = response?.page ?? query.page ?? 1;
  const pageSize = response?.page_size ?? query.pageSize ?? 10;
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const items = useMemo(() => response?.items ?? [], [response]);

  const [globalStats, setGlobalStats] = useState<any>(null);
  useEffect(() => {
    import("./actions").then(m => {
      m.fetchGlobalStats().then(setGlobalStats);
    });
  }, []);

  const globalTotal = globalStats?.total ?? total;
  const avgScore = globalStats?.avgScore ?? 4.8;
  const scoreLabel = getRatingLabel(avgScore);

  const dimensionItems = [
    { name: "卫生", score: globalStats?.hygieneScore ?? 4.8 },
    { name: "环境", score: globalStats?.environmentScore ?? 4.8 },
    { name: "设施", score: globalStats?.facilityScore ?? 4.8 },
    { name: "服务", score: globalStats?.serviceScore ?? 4.8 }
  ];

  const roomTypeOptions: string[] = globalStats?.roomTypeOptions ?? [];
  const travelTypeOptions: string[] = globalStats?.travelTypeOptions ?? [];
  const hotTags: { name: string; count: number }[] = globalStats?.hotTags ?? [];

  const allTagActive = !selectedCategory;


  return (
    <main className="ota-page">
      <div className="ota-container">
        
        {/* Summary Header matching screenshot exactly */}
        <section className="ota-summary" aria-label="酒店点评总览">
          <div className="ota-summary-left">
            <div className="ota-score-box">{avgScore.toFixed(1)}</div>
            <div>
              <h1 className="ota-score-title">{scoreLabel}</h1>
              <p className="ota-score-count">{globalTotal.toLocaleString()} 条评论</p>
            </div>
          </div>
          <div className="ota-dimension-grid" aria-label="分项评分">
            {dimensionItems.map(item => (
              <div className="ota-dimension-item" key={item.name}>
                <div className="ota-dimension-head">
                  <span>{item.name}</span>
                  <strong>{item.score.toFixed(1)}</strong>
                </div>
                <div className="ota-progress-track">
                  <span className="ota-progress-fill" style={{ width: getProgressWidth(item.score) }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Filter and Content Controls exactly as screenshot */}
        <section className="ota-control-wrapper" aria-label="筛选与排序">
          
          <div className="ota-search-row">
            <form className="ota-search-form" onSubmit={(e) => { e.preventDefault(); applyKeywordSearch(); }}>
              <input
                id="keyword-search"
                className="ota-search-input"
                aria-label="关键词检索栏"
                placeholder="搜索包含特定关键词的评论"
                value={keywordInput}
                onChange={e => setKeywordInput(e.target.value)}
              />
              <button type="submit" className="ota-search-btn">搜索</button>
            </form>
          </div>

          <div className="ota-filter-row">
            <span className="ota-filter-label">筛选：</span>
            <select
              className="ota-select"
              value={selectedRoomType}
              onChange={e => handleRoomTypeChange(e.target.value)}
            >
              <option value="">所有房型</option>
              {roomTypeOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            <select
              className="ota-select"
              value={selectedTravelType}
              onChange={e => handleTravelTypeChange(e.target.value)}
            >
              <option value="">所有出游类型</option>
              {travelTypeOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            <span className="ota-filter-label ota-filter-sort-label">排序方式：</span>
            <select
              className="ota-select"
              value={selectedSort}
              onChange={e => handleSortChange(e.target.value as SortMode)}
            >
              {Object.entries(SORT_CONFIG).map(([val, conf]) => (
                <option key={val} value={val}>{conf.label}</option>
              ))}
            </select>
          </div>
        </section>

        {/* Hot Tags matching Screenshot */}
        <section className="ota-hot" aria-label="热门提及">
          <h2 className="ota-hot-title">热门提及</h2>
          <div className="ota-hot-tags">
            <button
              type="button"
              className={`ota-tag ${allTagActive ? 'active' : ''}`}
              onClick={() => { setSelectedCategory(undefined); setPage(1); }}
            >
              所有点评({globalTotal.toLocaleString()})
            </button>
            {hotTags.map(tag => (
               <button
                 key={tag.name}
                 type="button"
                 className={`ota-tag ${selectedCategory === tag.name ? 'active' : ''}`}
                 onClick={() => { 
                   setSelectedCategory(selectedCategory === tag.name ? undefined : tag.name); 
                   setPage(1); 
                 }}
               >
                 {tag.name}({tag.count}) {selectedCategory === tag.name && <span aria-hidden="true" style={{fontSize: '14px', lineHeight: 1}}>×</span>}
               </button>
            ))}
          </div>
        </section>

        {/* Reviews matching exact screenshot card style */}
        <QueryFeedback
          loading={loading}
          error={error}
          hasData={items.length > 0}
          emptyText="未找到匹配评论，请调整筛选项或关键词后重试。"
        >
          <CommentList comments={items} />
        </QueryFeedback>

        <div className="pagination">
          <button className="btn" type="button" onClick={() => handlePageChange(Math.max(1, currentPage - 1))} disabled={currentPage <= 1}>
            上一页
          </button>
          <span className="ota-page-info">第 {currentPage}/{pageCount} 页</span>
          <button className="btn" type="button" onClick={() => handlePageChange(Math.min(pageCount, currentPage + 1))} disabled={currentPage >= pageCount}>
            下一页
          </button>
        </div>

      </div>
    </main>
  );
}