create table if not exists category_dictionary (
  category_group text not null,
  category_name text primary key
);

insert into category_dictionary (category_group, category_name) values
  ('设施类', '房间设施'),
  ('设施类', '公共设施'),
  ('设施类', '餐饮设施'),
  ('服务类', '前台服务'),
  ('服务类', '客房服务'),
  ('服务类', '退房/入住效率'),
  ('位置类', '交通便利性'),
  ('位置类', '周边配套'),
  ('位置类', '景观/朝向'),
  ('价格类', '性价比'),
  ('价格类', '价格合理性'),
  ('体验类', '整体满意度'),
  ('体验类', '安静程度'),
  ('体验类', '卫生状况')
on conflict (category_name) do nothing;
