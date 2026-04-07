import { type CommentFilters } from "@/lib/domain/comment-query";
import { sanitizeCategory, sanitizeDate, sanitizeInteger } from "@/lib/security/query-sanitizer";

export function normalizeFilters(input: CommentFilters): CommentFilters {
  return {
    dateFrom: sanitizeDate(input.dateFrom),
    dateTo: sanitizeDate(input.dateTo),
    star: input.star ? sanitizeInteger(input.star, 1, 5, input.star) : undefined,
    travelType: input.travelType?.trim() || undefined,
    fuzzyRoomType: input.fuzzyRoomType?.trim() || undefined,
    category: sanitizeCategory(input.category)
  };
}

export function getActiveFilterEntries(filters: CommentFilters): Array<[string, string]> {
  const entries: Array<[string, string]> = [];

  if (filters.dateFrom) entries.push(["开始日期", filters.dateFrom]);
  if (filters.dateTo) entries.push(["结束日期", filters.dateTo]);
  if (filters.star) entries.push(["星级", `${filters.star} 星`]);
  if (filters.travelType) entries.push(["出行类型", filters.travelType]);
  if (filters.fuzzyRoomType) entries.push(["房型", filters.fuzzyRoomType]);
  if (filters.category) entries.push(["分类", filters.category]);

  return entries;
}
