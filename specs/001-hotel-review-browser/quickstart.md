# 快速开始：花园酒店评论浏览网页

## 1. 前置条件
- 已准备 Next.js 运行环境。
- 已准备 Insforge 项目与可写数据库连接。
- 仓库中已存在数据文件 public/enriched_comments.csv。

## 2. 创建 comments 数据表
1. 根据 contracts/comments-import-contract.md 定义创建 comments 表。
2. 确认以下字段类型：
   - images 为 json。
   - categories 为 json。
   - publish_date 为 date。
   - category1、category2、category3 为 string。
   - star 为 integer。
3. 为常用筛选字段建立索引：publish_date、star、travel_type、fuzzy_room_type、category1、category2、category3。

## 3. 执行 CSV 导入
1. 读取 public/enriched_comments.csv。
2. 将 16 个原始字段按契约写入 comments。
3. 同步生成派生字段：
   - category1/2/3 从 categories 数组按顺序提取。
   - star 按 floor(score) 映射到 1-5。
4. 导入完成后执行验收：
   - 行数一致。
   - 日期字段可过滤。
   - JSON 字段可解析。
   - star 值均在 1-5。

## 4. 启动评论浏览网页
1. 启动 Next.js 前端。
2. 配置 Insforge 连接参数。
3. 打开浏览页并验证核心能力：
   - 条件筛选。
   - 关键词搜索。
   - 图片查看。
   - 空状态与错误状态提示。

## 5. 验收建议
- 功能验收：按 spec.md 的用户故事与验收场景逐条验证。
- 性能验收：筛选与搜索操作 95% 场景小于 2 秒。
- 体验验收：桌面与移动端布局一致，交互路径一致。
- 文档验收：规格、计划、任务、发布说明保持中文一致。

## 6. 本轮实现验收记录（2026-04-05）

已执行并通过的命令：

- `cd frontend && npm run test`（12 个测试文件、13 个测试用例全部通过）
- `cd frontend && npm run lint`（无错误）
- `cd frontend && npm run build`（构建成功，包含 `/api/comments` 与 `/api/comments/[id]` 路由）

性能记录：

- 见 `specs/001-hotel-review-browser/perf-report.md`
