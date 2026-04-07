# Tasks: 花园酒店评论浏览网页

**Input**: Design documents from `/specs/001-hotel-review-browser/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: 对新增或变更行为，测试任务是必需项；所有故事均包含契约/集成测试任务。

**Organization**: 任务按用户故事分组，确保每个故事可独立实现、独立测试与独立验收。

## Format: `[ID] [P?] [Story] Description`

- **[P]**: 可并行执行（不同文件、无未完成依赖）
- **[Story]**: 任务所属用户故事（US1/US2/US3）
- 每个任务描述包含明确文件路径

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: 初始化前端与 Insforge 工程骨架，建立统一开发基线。

- [X] T001 初始化前端工程与脚本配置 in frontend/package.json
- [X] T002 创建 Next.js 应用入口骨架 in frontend/app/page.tsx
- [X] T003 创建 Insforge 目录与说明文档 in insforge/sql/README.md
- [X] T004 [P] 配置 ESLint/Prettier 规则 in frontend/eslint.config.mjs
- [X] T005 [P] 配置 Vitest 运行环境 in frontend/vitest.config.ts
- [X] T006 [P] 创建前端环境变量模板 in frontend/.env.example

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: 完成全部故事共享的数据导入、查询基础与契约基线。

**⚠️ CRITICAL**: 此阶段完成前不得开始任何用户故事实现。

- [X] T007 创建 comments 表结构迁移（含全字段与派生字段） in insforge/migrations/001_create_comments_table.sql
- [X] T008 [P] 创建 comments 查询索引与文本检索索引 in insforge/migrations/002_comments_indexes.sql
- [X] T009 [P] 实现 categories 到 category1/2/3 与 star 映射规则 in insforge/sql/001_comments_transform.sql
- [X] T010 实现 CSV 全字段导入脚本 in insforge/sql/002_import_comments.sql
- [X] T011 [P] 固化分类字典与校验逻辑 in insforge/sql/003_category_dictionary.sql
- [X] T012 创建导入作业日志表结构 in insforge/migrations/003_import_jobs_table.sql
- [X] T013 [P] 建立 Insforge 客户端封装 in frontend/lib/insforge/client.ts
- [X] T014 [P] 建立评论查询仓储基础能力 in frontend/lib/insforge/comments-repository.ts
- [X] T015 创建统一查询参数与错误模型 in frontend/lib/domain/comment-query.ts
- [X] T016 [P] 编写导入契约验证测试 in frontend/tests/contract/import-contract.test.ts
- [X] T017 [P] 编写 comments API 基线契约测试 in frontend/tests/contract/comments-api-base.contract.test.ts

**Checkpoint**: 数据模型、导入流程、查询基础与契约基线已就绪。

---

## Phase 3: User Story 1 - 快速筛选并浏览评论 (Priority: P1) 🎯 MVP

**Goal**: 用户可通过结构化条件组合筛选并浏览评论列表。

**Independent Test**: 同时应用任意两种筛选条件后，结果列表与计数正确变化；清空后恢复默认状态。

### Tests for User Story 1 (MANDATORY)

- [X] T018 [P] [US1] 编写多条件筛选集成测试 in frontend/tests/integration/us1-filter-combination.test.tsx
- [X] T019 [P] [US1] 编写筛选重置集成测试 in frontend/tests/integration/us1-filter-reset.test.tsx
- [X] T020 [P] [US1] 编写 /comments 筛选参数契约测试 in frontend/tests/contract/us1-filter-params.contract.test.ts

### Implementation for User Story 1

- [X] T021 [P] [US1] 实现后端筛选查询 SQL in insforge/sql/010_comments_filter_query.sql
- [X] T022 [P] [US1] 实现筛选参数 schema 与转换器 in frontend/lib/filters/filter-schema.ts
- [X] T023 [P] [US1] 实现评论列表查询服务 in frontend/lib/services/comments-list-service.ts
- [X] T024 [US1] 实现筛选面板组件 in frontend/components/filters/filter-panel.tsx
- [X] T025 [US1] 实现激活条件展示与一键重置组件 in frontend/components/filters/active-filters.tsx
- [X] T026 [US1] 实现评论列表与分页展示组件 in frontend/components/comments/comment-list.tsx
- [X] T027 [US1] 集成 P1 浏览主页面流程 in frontend/app/page.tsx
- [X] T028 [US1] 实现筛选空态/错态反馈组件 in frontend/components/state/query-feedback.tsx

**Checkpoint**: US1 可独立上线并提供可用的筛选浏览能力。

---

## Phase 4: User Story 2 - 关键词定位目标评论 (Priority: P2)

**Goal**: 用户可在筛选基础上进行关键词检索、排序与分页。

**Independent Test**: 输入关键词后仅返回命中记录；无结果时出现明确提示；清空关键词后恢复筛选结果。

### Tests for User Story 2 (MANDATORY)

- [X] T029 [P] [US2] 编写关键词命中集成测试 in frontend/tests/integration/us2-keyword-hit.test.tsx
- [X] T030 [P] [US2] 编写关键词无结果集成测试 in frontend/tests/integration/us2-keyword-empty.test.tsx
- [X] T031 [P] [US2] 编写 keyword/sort/page 契约测试 in frontend/tests/contract/us2-search-pagination.contract.test.ts

### Implementation for User Story 2

- [X] T032 [P] [US2] 扩展后端关键词检索 SQL in insforge/sql/011_comments_keyword_query.sql
- [X] T033 [P] [US2] 实现关键词规范化与防抖逻辑 in frontend/lib/search/keyword-normalizer.ts
- [X] T034 [US2] 实现关键词搜索栏组件 in frontend/components/search/search-bar.tsx
- [X] T035 [US2] 实现排序与分页控制组件 in frontend/components/comments/list-controls.tsx
- [X] T036 [US2] 扩展评论查询服务支持关键词与排序分页 in frontend/lib/services/comments-list-service.ts
- [X] T037 [US2] 在主页面集成搜索流程与结果计数 in frontend/app/page.tsx

**Checkpoint**: US2 在不依赖 US3 的情况下可独立验收关键词检索能力。

---

## Phase 5: User Story 3 - 查看评论配图与美观展示 (Priority: P3)

**Goal**: 用户可查看评论图片大图，并在桌面与移动端获得统一且美观的体验。

**Independent Test**: 含图评论可预览与放大，无图/坏链可友好降级，页面在桌面和移动端均可用。

### Tests for User Story 3 (MANDATORY)

- [X] T038 [P] [US3] 编写图片预览交互集成测试 in frontend/tests/integration/us3-image-preview.test.tsx
- [X] T039 [P] [US3] 编写无图与坏链降级集成测试 in frontend/tests/integration/us3-image-fallback.test.tsx
- [X] T040 [P] [US3] 编写桌面/移动布局一致性测试 in frontend/tests/integration/us3-responsive-layout.test.tsx

### Implementation for User Story 3

- [X] T041 [P] [US3] 实现图片画廊与弹层组件 in frontend/components/comments/image-gallery.tsx
- [X] T042 [P] [US3] 实现图片加载失败降级组件 in frontend/components/comments/image-fallback.tsx
- [X] T043 [P] [US3] 建立页面视觉主题变量与排版系统 in frontend/styles/theme.css
- [X] T044 [US3] 实现评论卡片视觉样式与动效 in frontend/components/comments/comment-card.tsx
- [X] T045 [US3] 优化全局样式与移动端断点 in frontend/app/globals.css
- [X] T046 [US3] 在主页面集成图片查看流程与键盘可访问性 in frontend/app/page.tsx

**Checkpoint**: US3 完成后，产品达到“可筛选、可搜索、可看图且美观”的完整体验。

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: 跨故事质量收敛、性能达标与中文文档闭环。

- [X] T047 [P] 更新中文交付与运维说明 in specs/001-hotel-review-browser/quickstart.md
- [X] T048 执行并修复静态检查与格式问题 in frontend/package.json
- [X] T049 执行并修复所有自动化测试失败项 in frontend/tests/
- [X] T050 记录性能预算验证结果（p95 查询与首屏） in specs/001-hotel-review-browser/perf-report.md
- [X] T051 [P] 实现查询输入安全清洗与边界处理 in frontend/lib/security/query-sanitizer.ts
- [X] T052 运行 quickstart 全链路验收并回写结果 in specs/001-hotel-review-browser/quickstart.md

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: 无依赖，可立即开始。
- **Foundational (Phase 2)**: 依赖 Phase 1 完成，阻塞所有用户故事。
- **User Stories (Phase 3-5)**: 均依赖 Phase 2 完成。
- **Polish (Phase 6)**: 依赖目标用户故事完成后执行。

### User Story Dependencies

- **US1 (P1)**: 仅依赖 Foundational，MVP 首发范围。
- **US2 (P2)**: 依赖 Foundational，可复用 US1 页面框架但保持独立可测。
- **US3 (P3)**: 依赖 Foundational，可复用 US1/US2 列表结果但保持独立可测。

### Within Each User Story

- 先写测试并确保失败，再进入实现。
- 先完成后端查询/数据层，再完成前端组件集成。
- 每个故事结束后需完成一次独立验收。

### Parallel Opportunities

- Setup 中 T004-T006 可并行。
- Foundational 中 T008/T009/T011/T013/T014/T016/T017 可并行。
- US1 中 T018-T020 与 T021-T023 可并行。
- US2 中 T029-T031 与 T032-T033 可并行。
- US3 中 T038-T040 与 T041-T043 可并行。
- Polish 中 T047 与 T051 可并行。

---

## Parallel Example: User Story 1

```bash
# 并行执行 US1 测试任务
Task: "T018 [US1] 多条件筛选集成测试 in frontend/tests/integration/us1-filter-combination.test.tsx"
Task: "T019 [US1] 筛选重置集成测试 in frontend/tests/integration/us1-filter-reset.test.tsx"
Task: "T020 [US1] 筛选参数契约测试 in frontend/tests/contract/us1-filter-params.contract.test.ts"

# 并行执行 US1 核心实现准备
Task: "T021 [US1] 后端筛选查询 SQL in insforge/sql/010_comments_filter_query.sql"
Task: "T022 [US1] 筛选 schema in frontend/lib/filters/filter-schema.ts"
Task: "T023 [US1] 评论列表服务 in frontend/lib/services/comments-list-service.ts"
```

## Parallel Example: User Story 2

```bash
# 并行执行 US2 测试任务
Task: "T029 [US2] 关键词命中集成测试 in frontend/tests/integration/us2-keyword-hit.test.tsx"
Task: "T030 [US2] 关键词无结果集成测试 in frontend/tests/integration/us2-keyword-empty.test.tsx"
Task: "T031 [US2] 搜索分页契约测试 in frontend/tests/contract/us2-search-pagination.contract.test.ts"

# 并行执行 US2 后端与算法准备
Task: "T032 [US2] 关键词检索 SQL in insforge/sql/011_comments_keyword_query.sql"
Task: "T033 [US2] 关键词规范化逻辑 in frontend/lib/search/keyword-normalizer.ts"
```

## Parallel Example: User Story 3

```bash
# 并行执行 US3 测试任务
Task: "T038 [US3] 图片预览测试 in frontend/tests/integration/us3-image-preview.test.tsx"
Task: "T039 [US3] 图片降级测试 in frontend/tests/integration/us3-image-fallback.test.tsx"
Task: "T040 [US3] 响应式一致性测试 in frontend/tests/integration/us3-responsive-layout.test.tsx"

# 并行执行 US3 核心组件任务
Task: "T041 [US3] 图片画廊组件 in frontend/components/comments/image-gallery.tsx"
Task: "T042 [US3] 图片降级组件 in frontend/components/comments/image-fallback.tsx"
Task: "T043 [US3] 视觉主题变量 in frontend/styles/theme.css"
```

---

## Implementation Strategy

### MVP First (US1 Only)

1. 完成 Phase 1 与 Phase 2。
2. 交付 Phase 3（US1）全部任务。
3. 独立验收筛选浏览能力后再推进下一故事。

### Incremental Delivery

1. US1：交付筛选浏览 MVP。
2. US2：增量交付关键词搜索、排序、分页。
3. US3：增量交付图片查看与美观体验。
4. Phase 6：统一做质量、性能与文档收敛。

### Parallel Team Strategy

1. 团队共同完成 Phase 1-2。
2. Phase 2 完成后：
   - 开发 A 负责 US1。
   - 开发 B 负责 US2。
   - 开发 C 负责 US3。
3. 各故事按契约与测试先行策略独立推进，最后统一进入 Phase 6。

---

## Notes

- 所有任务遵循 `- [ ] Txxx [P?] [US?] 描述 + 文件路径` 格式。
- 用户故事阶段任务均带 [USx] 标签，便于追踪与验收。
- [P] 仅用于不同文件且无未完成依赖的任务。
- 所有文档与验收记录保持简体中文。
