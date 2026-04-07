# Tasks: OTA 风格前端重构

**Input**: Design documents from `/specs/002-ota-frontend-refactor/`
**Prerequisites**: plan.md (required), spec.md (required)

## Phase 1: Setup

- [X] T001 创建项目说明文档 in README.md
- [X] T002 定义 Swiss Modernism 2.0 设计令牌 in frontend/styles/theme.css
- [X] T003 [P] 新建布局组件目录与基础骨架 in frontend/components/layout/

## Phase 2: Tests (TDD)

- [X] T004 [P] 新增比价清晰度提示测试 in frontend/tests/integration/ota-price-clarity.test.tsx
- [X] T005 [P] 新增移动端筛选抽屉测试 in frontend/tests/integration/ota-mobile-filter-drawer.test.tsx
- [X] T006 [P] 新增信任信号展示测试 in frontend/tests/integration/ota-trust-signals.test.tsx

## Phase 3: Core

- [X] T007 实现信任信号条组件 in frontend/components/layout/trust-strip.tsx
- [X] T008 实现比价清晰度提示组件 in frontend/components/layout/comparison-hint.tsx
- [X] T009 实现移动端筛选抽屉组件 in frontend/components/layout/mobile-filter-drawer.tsx
- [X] T010 重构评论卡片为 review-first 信息层级 in frontend/components/comments/comment-card.tsx

## Phase 4: Integration

- [X] T011 组装 OTA 目录页骨架并保持既有行为 in frontend/app/page.tsx
- [X] T012 调整全局样式为目录双栏与移动抽屉布局 in frontend/app/globals.css
- [X] T013 优化搜索、筛选、控制区的信息层级 in frontend/components/search/search-bar.tsx
- [X] T014 对齐排序分页区域的目录语义呈现 in frontend/components/comments/list-controls.tsx

## Phase 5: Polish

- [X] T015 运行并修复测试 in frontend/
- [X] T016 运行并修复 lint in frontend/
- [X] T017 运行并修复 build in frontend/
- [X] T018 回写任务完成状态 in specs/002-ota-frontend-refactor/tasks.md
