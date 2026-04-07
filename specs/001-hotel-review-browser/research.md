# 研究记录：花园酒店评论浏览网页

## 决策 1：前端采用 Next.js App Router，后端采用 Insforge 托管数据能力
- Decision: 使用 Next.js 负责页面渲染与交互，使用 Insforge 作为评论数据存储与查询后端。
- Rationale: 满足用户明确指定的技术栈；Next.js 适合构建搜索筛选与图片查看页面；Insforge 适合结构化查询与后续扩展权限策略。
- Alternatives considered:
  - 纯静态前端直接读取 CSV：实现快，但在多条件筛选、排序和分页下扩展性差。
  - 自建 Node/Express 后端：灵活但运维与开发成本更高，不符合已指定 Insforge 方案。

## 决策 2：CSV 全字段入库，数组列使用 json，日期列使用 date
- Decision: 将 enriched_comments.csv 的 16 个原始字段全部导入 comments 表；images 与 categories 使用 json 类型；publish_date 使用 date 类型。
- Rationale: 对齐明确的数据导入要求，并保留原始信息完整性；json 字段支持数组查询与前端展示；date 字段便于时间过滤与排序。
- Alternatives considered:
  - 将数组字段拆为字符串：实现简单，但会损失结构化检索能力。
  - 日期保留为文本：导入容易，但时间范围查询与索引性能较差。

## 决策 3：新增 category1/category2/category3 三列用于小类扁平化检索
- Decision: 从 categories 数组中按顺序提取前 3 个元素，分别写入 category1、category2、category3（字符串类型）。
- Rationale: 数据集中 categories 最大长度为 3，扁平化后可直接进行等值筛选与索引优化；同时保留 categories 原 json 以支持未来弹性扩展。
- Alternatives considered:
  - 仅保留 categories json：灵活但查询表达式复杂、索引与统计成本更高。
  - 建立 comments_categories 关联表：规范性更强，但当前查询需求以快速筛选为主，复杂度偏高。

## 决策 4：新增 star 整数字段，按 score 向下取整映射并做边界保护
- Decision: star = floor(score)，并将结果约束到 1-5 区间（小于 1 记为 1，大于 5 记为 5）。
- Rationale: 完全匹配用户给定映射规则，便于前端做星级筛选与聚合统计。
- Alternatives considered:
  - 四舍五入映射：更贴近视觉感知，但不符合显式规则。
  - 保留 score 浮点直接筛选：可行但对常见 1-5 星筛选交互不友好。

## 决策 5：按“筛选优先 + 关键词搜索 + 排序分页”统一查询流程
- Decision: 查询流程统一为：结构化筛选 -> 关键词匹配 -> 排序 -> 分页返回。
- Rationale: 与用户任务路径一致，能够稳定控制响应时延；对于 2542 条数据量可稳定满足交互体验。
- Alternatives considered:
  - 仅关键词搜索无结构化筛选：无法满足核心浏览目标。
  - 前端全量加载后本地筛选：短期可行，但数据扩张后性能与首屏体验下降明显。

## 决策 6：建立与筛选路径一致的索引策略，保证性能预算
- Decision: 对 publish_date、star、travel_type、fuzzy_room_type、category1/2/3 建立常用筛选索引，并为关键词搜索配置文本检索能力。
- Rationale: 需求包含多条件筛选与关键词检索，索引可保障 p95 响应时间目标。
- Alternatives considered:
  - 无索引先上线：初期可运行，但难以满足“2 秒内返回结果”的性能目标。
  - 全字段建索引：写入与维护成本高，收益不成比例。

## 决策 7：分类体系按既定业务语义固化为校验字典
- Decision: 使用以下分类体系作为导入校验与前端筛选字典来源：
  - 设施类：房间设施、公共设施、餐饮设施
  - 服务类：前台服务、客房服务、退房/入住效率
  - 位置类：交通便利性、周边配套、景观/朝向
  - 价格类：性价比、价格合理性
  - 体验类：整体满意度、安静程度、卫生状况
- Rationale: 用户已给出明确分类体系，固化为字典可保证检索口径一致并减少脏数据扩散。
- Alternatives considered:
  - 完全依赖数据中自由文本分类：灵活但会产生同义词与口径漂移问题。
  - 仅按大类存储：会损失小类检索精度，不满足后续检索目标。

## 事实取证摘要
- 数据文件：public/enriched_comments.csv
- 总行数：2542
- 原始字段数：16（_id、comment、images、score、publish_date、room_type、fuzzy_room_type、travel_type、comment_len、log_comment_len、useful_count、log_useful_count、review_count、log_review_count、quality_score、categories）
- 数组字段：images、categories
- 日期字段格式：publish_date 为 YYYY-MM-DD
- categories 唯一小类数量：14（与给定分类体系一致）
- categories 长度分布：0/1/2/3 分别为 9/209/485/1839
