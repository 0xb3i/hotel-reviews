# Implementation Plan: 花园酒店评论浏览网页

**Branch**: `001-hotel-review-browser` | **Date**: 2026-04-05 | **Spec**: `/specs/001-hotel-review-browser/spec.md`
**Input**: Feature specification from `/specs/001-hotel-review-browser/spec.md`
**文档语言**: 本计划及其产出文档必须使用简体中文；代码标识符与命令可保留英文原文。

## Summary

构建一个面向花园酒店住客评论数据的浏览网页，支持条件筛选、关键词搜索、图片查看与美观展示。技术方案采用 Next.js 前端 + Insforge 后端，完成 CSV 全字段入库并补充 category1/category2/category3 与 star 两类派生字段，确保 json/date 类型正确和检索性能可达标。

## Technical Context

**Language/Version**: TypeScript 5.x（前端），SQL（Insforge/PostgreSQL 方言）  
**Primary Dependencies**: Next.js App Router、React、Insforge SDK/SQL 能力  
**Storage**: Insforge 数据库（comments 表）  
**Testing**: 单元测试（查询参数与映射逻辑）、集成测试（筛选/搜索/分页链路）、契约测试（comments 查询接口）  
**Target Platform**: 现代桌面与移动浏览器，Insforge 云端后端
**Project Type**: web-application（frontend + insforge backend）  
**Performance Goals**: 95% 场景下筛选/搜索响应 <= 2 秒；95% 场景下首屏可浏览内容 <= 3 秒  
**Constraints**: 必须导入 CSV 全字段；images/categories 为 json；publish_date 为 date；新增 category1/2/3 与 star；文档全中文  
**Scale/Scope**: 当前数据规模约 2542 行；方案需支持后续扩展至更大数据量且不重构核心查询路径

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Phase 0 前 Gate 评估

- [x] 代码质量门禁：已定义代码规范、静态检查与评审阻断策略，后续任务必须包含质量门禁执行项。
- [x] 测试门禁：已明确单元/集成/契约三层测试要求，覆盖筛选、搜索、图片查看与导入映射关键路径。
- [x] 体验一致性门禁：已定义统一筛选交互、空态/错态反馈、桌面与移动一致性要求。
- [x] 性能门禁：已定义 2 秒查询响应和 3 秒首屏目标，并在 quickstart 中加入验证步骤。
- [x] 文档门禁：spec 与本计划已使用简体中文，后续 research/data-model/contracts/quickstart/tasks 均要求中文。

### Phase 1 后复核

- [x] 研究产物已完成：`research.md` 明确数据类型、派生字段与索引策略，无未决澄清项。
- [x] 设计产物已完成：`data-model.md`、`contracts/`、`quickstart.md` 全部落地并与宪章一致。
- [x] 无宪章违规项，无需申请复杂度豁免。

## Project Structure

### Documentation (this feature)

```text
specs/001-hotel-review-browser/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   ├── comments-api.yaml
│   └── comments-import-contract.md
└── tasks.md
```

### Source Code (repository root)

```text
frontend/
├── app/
├── components/
├── lib/
├── styles/
└── tests/
    ├── unit/
    ├── integration/
    └── contract/

insforge/
├── migrations/
├── sql/
├── seeds/
└── functions/

public/
└── enriched_comments.csv
```

**Structure Decision**: 采用 Web 应用双层结构（Next.js 前端 + Insforge 后端资源目录）。前端负责浏览体验与交互，Insforge 负责数据导入、存储与查询能力，契合“前后端职责清晰 + 可独立演进”的目标。

## Complexity Tracking

当前不存在宪章违规项，不需要复杂度豁免记录。
