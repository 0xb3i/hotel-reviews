import { readFileSync } from "node:fs";
import path from "node:path";
import { parse as parseCsv } from "csv-parse/sync";
import {
  DEFAULT_QUERY,
  type CommentListResponse,
  type CommentQuery,
  type CommentRecord,
  type SortBy
} from "@/lib/domain/comment-query";
import {
  sanitizeCategory,
  sanitizeDate,
  sanitizeInteger,
  sanitizeKeyword,
  sanitizeSortBy,
  sanitizeSortOrder
} from "@/lib/security/query-sanitizer";
import { matchesKeyword } from "@/lib/search/keyword-normalizer";

let cache: CommentRecord[] | null = null;

function parseArrayLike(raw: string): string[] {
  const value = raw.trim();
  if (!value || value === "[]") {
    return [];
  }

  try {
    const parsed = JSON.parse(value) as unknown;
    return Array.isArray(parsed) ? parsed.map((item) => String(item)) : [];
  } catch {
    const body = value.replace(/^\[/, "").replace(/\]$/, "").trim();
    if (!body) {
      return [];
    }

    return body
      .split(",")
      .map((item) => item.trim().replace(/^['"]/, "").replace(/['"]$/, ""))
      .filter(Boolean);
  }
}

function mapScoreToStar(score: number): number {
  return Math.max(1, Math.min(5, Math.floor(score)));
}

function parseNumber(value: string, fallback = 0): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function parseRow(row: Record<string, string>): CommentRecord {
  const categories = parseArrayLike(row.categories || "[]");
  const score = parseNumber(row.score);

  return {
    _id: row._id,
    comment: row.comment,
    images: parseArrayLike(row.images || "[]"),
    score,
    publish_date: row.publish_date,
    room_type: row.room_type || "",
    fuzzy_room_type: row.fuzzy_room_type || "",
    travel_type: row.travel_type || "",
    comment_len: parseNumber(row.comment_len),
    log_comment_len: parseNumber(row.log_comment_len),
    useful_count: parseNumber(row.useful_count),
    log_useful_count: parseNumber(row.log_useful_count),
    review_count: parseNumber(row.review_count),
    log_review_count: parseNumber(row.log_review_count),
    quality_score: parseNumber(row.quality_score),
    categories,
    category1: categories[0],
    category2: categories[1],
    category3: categories[2],
    star: mapScoreToStar(score)
  };
}

function compareBy(sortBy: SortBy, a: CommentRecord, b: CommentRecord): number {
  switch (sortBy) {
    case "score":
      return a.score - b.score;
    case "useful_count":
      return a.useful_count - b.useful_count;
    case "review_count":
      return a.review_count - b.review_count;
    case "publish_date":
    default:
      return new Date(a.publish_date).getTime() - new Date(b.publish_date).getTime();
  }
}

export function loadComments(): CommentRecord[] {
  if (cache) {
    return cache;
  }

  const filePath = path.resolve(process.cwd(), "../public/enriched_comments.csv");
  const csvContent = readFileSync(filePath, "utf-8");

  const rows = parseCsv(csvContent, {
    columns: true,
    skip_empty_lines: true,
    trim: true
  }) as Record<string, string>[];

  cache = rows.map(parseRow);
  return cache;
}

export function queryComments(query: CommentQuery): CommentListResponse {
  const all = loadComments();
  const keyword = sanitizeKeyword(query.keyword);
  const dateFrom = sanitizeDate(query.dateFrom);
  const dateTo = sanitizeDate(query.dateTo);
  const category = sanitizeCategory(query.category);
  const star = query.star ? sanitizeInteger(query.star, 1, 5, query.star) : undefined;
  const page = sanitizeInteger(query.page, 1, 100000, DEFAULT_QUERY.page);
  const pageSize = sanitizeInteger(query.pageSize, 1, 100, DEFAULT_QUERY.pageSize);
  const sortBy = sanitizeSortBy(query.sortBy);
  const sortOrder = sanitizeSortOrder(query.sortOrder);

  const filtered = all
    .filter((item) => (keyword ? matchesKeyword(item.comment, keyword) : true))
    .filter((item) => (dateFrom ? item.publish_date >= dateFrom : true))
    .filter((item) => (dateTo ? item.publish_date <= dateTo : true))
    .filter((item) => (star ? item.star === star : true))
    .filter((item) =>
      query.travelType ? item.travel_type === query.travelType : true
    )
    .filter((item) =>
      query.fuzzyRoomType ? item.fuzzy_room_type === query.fuzzyRoomType : true
    )
    .filter((item) => {
      if (!category) {
        return true;
      }

      return (
        item.category1 === category || item.category2 === category || item.category3 === category
      );
    })
    .sort((a, b) => {
      const result = compareBy(sortBy, a, b);
      return sortOrder === "asc" ? result : -result;
    });

  const start = (page - 1) * pageSize;
  const items = filtered.slice(start, start + pageSize);

  return {
    total: filtered.length,
    page,
    page_size: pageSize,
    items
  };
}

export function findCommentById(id: string): CommentRecord | null {
  return loadComments().find((item) => item._id === id) ?? null;
}
