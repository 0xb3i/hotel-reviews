-- 按 Insforge 环境调整来源语句，该脚本关注字段映射约束
-- 假设已经将 CSV 暂存至 staging_comments_raw 表（文本列）

insert into comments (
  _id,
  comment,
  images,
  score,
  publish_date,
  room_type,
  fuzzy_room_type,
  travel_type,
  comment_len,
  log_comment_len,
  useful_count,
  log_useful_count,
  review_count,
  log_review_count,
  quality_score,
  categories,
  category1,
  category2,
  category3,
  star
)
select
  _id,
  comment,
  images::jsonb,
  score::numeric(2,1),
  publish_date::date,
  room_type,
  fuzzy_room_type,
  travel_type,
  comment_len::integer,
  log_comment_len::numeric(10,6),
  useful_count::integer,
  log_useful_count::numeric(10,6),
  review_count::integer,
  log_review_count::numeric(10,6),
  quality_score::integer,
  categories::jsonb,
  case when jsonb_array_length(categories::jsonb) >= 1 then categories::jsonb ->> 0 else null end,
  case when jsonb_array_length(categories::jsonb) >= 2 then categories::jsonb ->> 1 else null end,
  case when jsonb_array_length(categories::jsonb) >= 3 then categories::jsonb ->> 2 else null end,
  greatest(1, least(5, floor(score::numeric)::int))
from staging_comments_raw;
