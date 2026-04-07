import { NextRequest, NextResponse } from "next/server";
import { queryComments } from "@/lib/server/comments-data";
import {
  sanitizeCategory,
  sanitizeSortBy,
  sanitizeSortOrder
} from "@/lib/security/query-sanitizer";

export async function GET(request: NextRequest): Promise<NextResponse> {
  const params = request.nextUrl.searchParams;

  const result = queryComments({
    keyword: params.get("keyword") ?? undefined,
    dateFrom: params.get("date_from") ?? undefined,
    dateTo: params.get("date_to") ?? undefined,
    star: params.get("star") ? Number(params.get("star")) : undefined,
    travelType: params.get("travel_type") ?? undefined,
    fuzzyRoomType: params.get("fuzzy_room_type") ?? undefined,
    category: sanitizeCategory(params.get("category") ?? undefined),
    sortBy: sanitizeSortBy(params.get("sort_by") ?? undefined),
    sortOrder: sanitizeSortOrder(params.get("sort_order") ?? undefined),
    page: params.get("page") ? Number(params.get("page")) : undefined,
    pageSize: params.get("page_size") ? Number(params.get("page_size")) : undefined
  });

  return NextResponse.json(result);
}
