export const CATEGORY_OPTIONS = [
  "房间设施",
  "公共设施",
  "餐饮设施",
  "前台服务",
  "客房服务",
  "退房/入住效率",
  "交通便利性",
  "周边配套",
  "景观/朝向",
  "性价比",
  "价格合理性",
  "整体满意度",
  "安静程度",
  "卫生状况"
] as const;

export type CategoryName = (typeof CATEGORY_OPTIONS)[number];

export type SortBy = "publish_date" | "score" | "useful_count" | "review_count";
export type SortOrder = "asc" | "desc";

export interface CommentFilters {
  dateFrom?: string;
  dateTo?: string;
  star?: number;
  travelType?: string;
  fuzzyRoomType?: string;
  category?: CategoryName;
}

export interface CommentQuery extends CommentFilters {
  keyword?: string;
  sortBy?: SortBy;
  sortOrder?: SortOrder;
  page?: number;
  pageSize?: number;
}

export interface CommentRecord {
  _id: string;
  comment: string;
  images: string[];
  score: number;
  publish_date: string;
  room_type: string;
  fuzzy_room_type: string;
  travel_type: string;
  comment_len: number;
  log_comment_len: number;
  useful_count: number;
  log_useful_count: number;
  review_count: number;
  log_review_count: number;
  quality_score: number;
  categories: string[];
  category1?: string;
  category2?: string;
  category3?: string;
  star: number;
}

export interface CommentListResponse {
  total: number;
  page: number;
  page_size: number;
  items: CommentRecord[];
}

export const DEFAULT_QUERY: Required<
  Pick<CommentQuery, "sortBy" | "sortOrder" | "page" | "pageSize">
> = {
  sortBy: "publish_date",
  sortOrder: "desc",
  page: 1,
  pageSize: 20
};
