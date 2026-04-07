import {
  DEFAULT_QUERY,
  type CommentListResponse,
  type CommentQuery,
  type CommentRecord
} from "@/lib/domain/comment-query";
import {
  sanitizeDate,
  sanitizeInteger,
  sanitizeKeyword,
  sanitizeSortBy,
  sanitizeSortOrder
} from "@/lib/security/query-sanitizer";
import { createInsforgeClient, type InsforgeClient } from "@/lib/insforge/client";

export function buildCommentsQueryParams(query: CommentQuery): URLSearchParams {
  const params = new URLSearchParams();

  const keyword = sanitizeKeyword(query.keyword);
  const dateFrom = sanitizeDate(query.dateFrom);
  const dateTo = sanitizeDate(query.dateTo);
  const star = query.star ? sanitizeInteger(query.star, 1, 5, query.star) : undefined;
  const page = sanitizeInteger(query.page, 1, 100000, DEFAULT_QUERY.page);
  const pageSize = sanitizeInteger(query.pageSize, 1, 100, DEFAULT_QUERY.pageSize);

  if (keyword) params.set("keyword", keyword);
  if (dateFrom) params.set("date_from", dateFrom);
  if (dateTo) params.set("date_to", dateTo);
  if (star) params.set("star", String(star));
  if (query.travelType?.trim()) params.set("travel_type", query.travelType.trim());
  if (query.fuzzyRoomType?.trim()) params.set("fuzzy_room_type", query.fuzzyRoomType.trim());
  if (query.category?.trim()) params.set("category", query.category.trim());

  params.set("sort_by", sanitizeSortBy(query.sortBy));
  params.set("sort_order", sanitizeSortOrder(query.sortOrder));
  params.set("page", String(page));
  params.set("page_size", String(pageSize));

  return params;
}

export class CommentsRepository {
  constructor(
    private readonly client: InsforgeClient,
    private readonly basePath = "/api"
  ) {}

  list(query: CommentQuery): Promise<CommentListResponse> {
    const params = buildCommentsQueryParams(query);
    return this.client.request<CommentListResponse>(`${this.basePath}/comments?${params.toString()}`);
  }

  getById(id: string): Promise<CommentRecord> {
    return this.client.request<CommentRecord>(`${this.basePath}/comments/${encodeURIComponent(id)}`);
  }
}

export function createCommentsRepository(): CommentsRepository {
  return new CommentsRepository(createInsforgeClient());
}
