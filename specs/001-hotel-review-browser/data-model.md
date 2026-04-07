# 数据模型：花园酒店评论浏览

## 实体 1：Comment（评论主实体）

### 字段定义
| 字段名 | 类型 | 必填 | 说明 |
|---|---|---|---|
| _id | string | 是 | CSV 原始唯一标识，作为主键 |
| comment | text | 是 | 评论正文 |
| images | json | 是 | 评论图片数组，默认空数组 |
| score | decimal(2,1) | 是 | 原始评分，取值范围 0.0-5.0 |
| publish_date | date | 是 | 发布日期，来源于 CSV publish_date |
| room_type | string | 否 | 原始房型 |
| fuzzy_room_type | string | 否 | 归一化房型 |
| travel_type | string | 否 | 出行类型 |
| comment_len | integer | 是 | 评论长度 |
| log_comment_len | decimal(10,6) | 是 | 评论长度对数值 |
| useful_count | integer | 是 | 有用数 |
| log_useful_count | decimal(10,6) | 是 | 有用数对数值 |
| review_count | integer | 是 | 用户历史评论数 |
| log_review_count | decimal(10,6) | 是 | 历史评论数对数值 |
| quality_score | integer | 是 | 评论质量分 |
| categories | json | 是 | 评论分类小类数组，默认空数组 |
| category1 | string | 否 | categories 第 1 个小类 |
| category2 | string | 否 | categories 第 2 个小类 |
| category3 | string | 否 | categories 第 3 个小类 |
| star | integer | 是 | 由 score 映射得到的 1-5 星级 |

### 校验规则
- _id 必须唯一且不可为空。
- publish_date 必须可解析为 date。
- images 与 categories 必须为 JSON 数组。
- categories 长度允许 0-3；超出长度时仅保留前 3 个元素用于 category1-3。
- category1、category2、category3 必须与 categories 对应位置值一致。
- star 计算规则：star = floor(score)，并约束到 1-5 区间。
- score 若为空或非法，导入作业标记失败并记录错误行号。

### 索引建议
- 主键索引：_id
- 过滤索引：publish_date、star、travel_type、fuzzy_room_type、category1、category2、category3
- 排序辅助索引：publish_date desc、score desc
- 关键词检索索引：comment 文本检索索引

## 实体 2：CategoryDictionary（分类字典）

### 业务用途
用于前端筛选面板和导入校验，确保分类口径一致。

### 分类体系
- 设施类：房间设施、公共设施、餐饮设施
- 服务类：前台服务、客房服务、退房/入住效率
- 位置类：交通便利性、周边配套、景观/朝向
- 价格类：性价比、价格合理性
- 体验类：整体满意度、安静程度、卫生状况

### 校验规则
- categories 中出现的小类必须属于上述字典之一。
- 非字典值在导入时记录 warning，并可按策略选择拒绝导入或保留原值。

## 实体 3：ImportJob（导入作业）

### 字段定义
| 字段名 | 类型 | 必填 | 说明 |
|---|---|---|---|
| job_id | string | 是 | 导入任务唯一标识 |
| source_file | string | 是 | 数据源文件路径 |
| started_at | datetime | 是 | 开始时间 |
| ended_at | datetime | 否 | 结束时间 |
| total_rows | integer | 是 | 总处理行数 |
| success_rows | integer | 是 | 成功入库行数 |
| failed_rows | integer | 是 | 失败行数 |
| status | enum | 是 | pending/running/succeeded/failed |
| error_sample | json | 否 | 错误样例 |

### 状态流转
- pending -> running
- running -> succeeded
- running -> failed
- failed -> running（允许重试）

### 触发条件
- 用户触发首次导入。
- 数据源更新后触发全量重导或增量导入。
