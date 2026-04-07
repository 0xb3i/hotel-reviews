import { CATEGORY_OPTIONS, type CategoryName, type SortBy, type SortOrder } from "@/lib/domain/comment-query";

const SORT_BY_ALLOWLIST: ReadonlySet<SortBy> = new Set([
  "publish_date",
  "score",
  "useful_count",
  "review_count"
]);

const SORT_ORDER_ALLOWLIST: ReadonlySet<SortOrder> = new Set(["asc", "desc"]);

export function sanitizeKeyword(keyword?: string): string | undefined {
  if (!keyword) {
    return undefined;
  }

  const trimmed = [...keyword]
    .filter((char) => {
      const code = char.charCodeAt(0);
      return code >= 32 && code !== 127;
    })
    .join("")
    .trim();

  if (!trimmed) {
    return undefined;
  }

  return trimmed.slice(0, 80);
}

export function sanitizeInteger(
  raw: unknown,
  min: number,
  max: number,
  fallback: number
): number {
  const value = Number(raw);
  if (!Number.isFinite(value)) {
    return fallback;
  }

  return Math.min(max, Math.max(min, Math.floor(value)));
}

export function sanitizeDate(raw?: string): string | undefined {
  if (!raw) {
    return undefined;
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(raw)) {
    return undefined;
  }

  return raw;
}

export function sanitizeSortBy(raw?: string): SortBy {
  if (raw && SORT_BY_ALLOWLIST.has(raw as SortBy)) {
    return raw as SortBy;
  }

  return "publish_date";
}

export function sanitizeSortOrder(raw?: string): SortOrder {
  if (raw && SORT_ORDER_ALLOWLIST.has(raw as SortOrder)) {
    return raw as SortOrder;
  }

  return "desc";
}

export function sanitizeCategory(raw?: string): CategoryName | undefined {
  if (!raw) {
    return undefined;
  }

  return CATEGORY_OPTIONS.includes(raw as CategoryName)
    ? (raw as CategoryName)
    : undefined;
}
