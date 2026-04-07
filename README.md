# onlineReview

onlineReview 是一个酒店评论浏览与筛选系统，面向“评论检索、结构化筛选、图文查看、信任信息展示”场景。

## 目录

- 项目简介
- 功能概览
- 技术栈
- 目录结构
- 快速开始
- 环境变量
- 数据与导入
- 质量保障

## 项目简介

本项目以前端体验为核心，围绕酒店评论数据提供以下能力：

- 关键词搜索与多维筛选
- 排序与分页
- 评论卡片与图片预览
- 评分与信任信号展示

在不改变既有后端契约的前提下，已完成 OTA 风格界面重构。

## 功能概览

- 评论列表检索：支持关键词、筛选条件和排序组合
- 评论详情体验：支持图片展示、信息摘要与辅助元信息
- 响应式布局：兼容桌面与移动端
- 稳定性保障：包含契约测试、集成测试与基础构建校验

## 技术栈

- 前端：Next.js App Router + React + TypeScript
- 测试：Vitest + Testing Library
- 代码质量：ESLint
- 数据侧：InsForge（SQL 与数据导入脚本）

## 目录结构

```text
frontend/    前端应用代码（页面、组件、样式、测试）
insforge/    数据库迁移与 SQL 脚本
public/      数据样本与静态资源
```

## 快速开始

### 1. 安装依赖

```bash
cd frontend
npm install
```

### 2. 启动开发环境

```bash
npm run dev
```

默认访问地址：`http://localhost:3000`

## 环境变量

1. 复制示例文件：

```bash
cp frontend/.env.example frontend/.env
```

2. 按需填写实际配置（例如 InsForge 连接相关变量）。

## 数据与导入

- 原始数据：`public/enriched_comments.csv`
- 迁移脚本：`insforge/migrations/`
- 查询与导入脚本：`insforge/sql/`

如需重新导入数据，建议按“建表/索引 -> 分片导入 -> 校验”顺序执行。

## 质量保障

在 `frontend` 目录执行：

```bash
npm test
npm run lint
npm run build
```
