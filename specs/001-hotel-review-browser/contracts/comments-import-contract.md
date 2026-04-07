# comments 表导入契约

## 目标
将 public/enriched_comments.csv 的所有字段导入 Insforge 数据库 comments 表，并补充 category1/category2/category3/star 派生字段。

## 原始字段映射
| CSV 字段 | 目标字段 | 目标类型 | 说明 |
|---|---|---|---|
| _id | _id | string | 主键 |
| comment | comment | text | 评论正文 |
| images | images | json | 数组字段，按 JSON 数组存储 |
| score | score | decimal | 原始评分 |
| publish_date | publish_date | date | 日期字段 |
| room_type | room_type | string | 房型 |
| fuzzy_room_type | fuzzy_room_type | string | 归一化房型 |
| travel_type | travel_type | string | 出行类型 |
| comment_len | comment_len | integer | 评论长度 |
| log_comment_len | log_comment_len | decimal | 评论长度对数 |
| useful_count | useful_count | integer | 有用数 |
| log_useful_count | log_useful_count | decimal | 有用数对数 |
| review_count | review_count | integer | 历史评论数 |
| log_review_count | log_review_count | decimal | 历史评论数对数 |
| quality_score | quality_score | integer | 质量分 |
| categories | categories | json | 数组字段，按 JSON 数组存储 |

## 派生字段规则
| 目标字段 | 类型 | 规则 |
|---|---|---|
| category1 | string | categories 第 1 个元素，不存在则为空 |
| category2 | string | categories 第 2 个元素，不存在则为空 |
| category3 | string | categories 第 3 个元素，不存在则为空 |
| star | integer | floor(score) 后限制在 1-5，低于 1 记为 1 |

## 分类校验字典
- 设施类：房间设施、公共设施、餐饮设施
- 服务类：前台服务、客房服务、退房/入住效率
- 位置类：交通便利性、周边配套、景观/朝向
- 价格类：性价比、价格合理性
- 体验类：整体满意度、安静程度、卫生状况

## 数据质量校验
- _id 为空或重复：拒绝该行并记录错误。
- publish_date 非法：拒绝该行并记录错误。
- images 或 categories 不是数组：拒绝该行并记录错误。
- score 为空或非法：拒绝该行并记录错误。
- categories 超过 3 个元素：保留前 3 个用于 category1-3，完整数组仍保留在 categories。

## 导入验收标准
- comments 表总行数与 CSV 有效行一致。
- images 与 categories 可被 JSON 解析。
- publish_date 字段可用于日期范围过滤。
- category1/2/3 与 categories 对应位置一致。
- star 值全部在 1-5 范围内。
