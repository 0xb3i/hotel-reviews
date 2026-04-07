-- 在结构化筛选基础上追加关键词检索与排序分页
-- sort_by 和 sort_order 建议在应用层做白名单映射，避免注入风险
select *
from comments
where
  ($1::date is null or publish_date >= $1::date)
  and ($2::date is null or publish_date <= $2::date)
  and ($3::int is null or star = $3::int)
  and ($4::text is null or travel_type = $4::text)
  and ($5::text is null or fuzzy_room_type = $5::text)
  and (
    $6::text is null
    or category1 = $6::text
    or category2 = $6::text
    or category3 = $6::text
  )
  and (
    $7::text is null
    or to_tsvector('simple', coalesce(comment, '')) @@ plainto_tsquery('simple', $7::text)
  );
