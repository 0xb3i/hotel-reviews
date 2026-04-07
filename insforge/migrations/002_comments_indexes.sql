-- comments 常用筛选与排序索引
create index if not exists idx_comments_publish_date on comments (publish_date desc);
create index if not exists idx_comments_star on comments (star);
create index if not exists idx_comments_travel_type on comments (travel_type);
create index if not exists idx_comments_fuzzy_room_type on comments (fuzzy_room_type);
create index if not exists idx_comments_category1 on comments (category1);
create index if not exists idx_comments_category2 on comments (category2);
create index if not exists idx_comments_category3 on comments (category3);

-- 关键词检索索引
create index if not exists idx_comments_comment_fts
on comments using gin (to_tsvector('simple', coalesce(comment, '')));
