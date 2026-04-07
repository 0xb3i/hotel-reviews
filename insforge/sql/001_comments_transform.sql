-- categories 数组转 category1/2/3，score 转 star
update comments
set
  category1 = case when jsonb_array_length(categories) >= 1 then categories ->> 0 else null end,
  category2 = case when jsonb_array_length(categories) >= 2 then categories ->> 1 else null end,
  category3 = case when jsonb_array_length(categories) >= 3 then categories ->> 2 else null end,
  star = greatest(1, least(5, floor(score)::int));
