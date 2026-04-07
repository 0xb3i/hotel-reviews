# onlineReview

花园酒店评论浏览项目，采用 Next.js 前端与既有数据契约进行评论检索与展示。

## 项目结构

- frontend: 前端应用（搜索、筛选、分页、图片查看、UI 重构）
- insforge: 既有后端 SQL 与契约参考（本次前端重构不改后端契约）
- public: 示例数据文件
- specs: Speckit 规格、计划、任务与验收文档

## 本地开发

在 frontend 目录执行：

- npm install
- npm run dev

## 质量检查

在 frontend 目录执行：

- npm test
- npm run lint
- npm run build

## 当前重构目标（002-ota-frontend-refactor）

在不修改现有 API 契约与业务行为的前提下，将评论列表页重构为 OTA 风格目录体验，重点包括：

- Swiss Modernism 2.0 信息层级与设计令牌
- 更清晰的搜索筛选交互
- review-first 卡片与信任信号
- 桌面与移动端一致的响应式体验
- 价格比较清晰度提示（当前契约无价格字段）
