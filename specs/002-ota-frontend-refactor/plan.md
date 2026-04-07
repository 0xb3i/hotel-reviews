# Implementation Plan: OTA 风格前端重构

**Branch**: `002-ota-frontend-refactor` | **Date**: 2026-04-06 | **Spec**: `/specs/002-ota-frontend-refactor/spec.md`
**Input**: Feature specification from `/specs/002-ota-frontend-refactor/spec.md`
**文档语言**: 本计划及其产出文档必须使用简体中文；代码标识符与命令可保留英文原文。

## Summary

在保持现有技术栈、数据流、业务行为与 API 契约不变的前提下，对现有酒店评论前端进行生产级 OTA 风格重构。重构重点是组件结构重组、设计令牌统一、页面信息层级优化、搜索筛选交互优化、评论卡片与评分信任表达升级，以及桌面与移动端一致的响应式体验。

## Technical Context

**Language/Version**: TypeScript 5.x（前端）  
**Primary Dependencies**: Next.js App Router、React、Vitest、Testing Library、ESLint  
**Storage**: N/A（前端重构；继续消费现有 `/api/comments` 与 `/api/comments/{id}` 数据流）  
**Testing**: Vitest（单元/集成/契约回归）  
**Target Platform**: 现代桌面与移动浏览器  
**Project Type**: web-application（frontend-only refactor）  
**Performance Goals**: 95% 场景下搜索/筛选结果刷新 <= 2 秒；95% 场景下首屏可浏览内容 <= 3 秒  
**Constraints**: 不修改后端契约；不移除任何现有功能；不改变既有业务规则；保持中文文档完整同步  
**Scale/Scope**: 当前数据规模约 2542 条评论；覆盖信息架构、组件组织、视觉系统与响应式交互

## UI/UX 方案落地

### 1. 视觉与设计系统

- 设计方向：Swiss Modernism 2.0 + OTA Directory + Trust & Authority。
- 视觉原则：12 列网格、数学化间距、单一强调色、强对比、低装饰。
- 字体系统：Inter 单字体族（300/400/500/600/700），通过字重建立层级。
- 色彩令牌（建议）
    - `--color-primary`: #1E3A8A（信任蓝）
    - `--color-background`: #F8FAFC（浅灰背景）
    - `--color-surface`: #FFFFFF（卡片底）
    - `--color-text`: #0F172A（主文本）
    - `--color-border`: #BFDBFE（边框）
    - `--color-accent`: #A16207（唯一强调色，限关键 CTA/高价值标签）
    - `--color-danger`: #DC2626（异常/警示）
- 动效策略：过渡时长 150-250ms，避免炫技动画；遵循 `prefers-reduced-motion`。

### 2. 页面信息架构与层级

- 顶部层（全端一致）
    - 品牌与主搜索入口。
    - 全局可信说明（数据来源、更新频率、验证提示）。
- 主内容层（桌面双栏）
    - 左栏：筛选面板（可折叠分组、已选条件显式呈现）。
    - 右栏：结果工具栏（总数、排序、比较维度说明）+ 卡片列表。
- 移动层（单栏）
    - 筛选迁移为 Drawer/Bottom Sheet。
    - 顶部保留搜索与结果计数，卡片单列滚动。
- 状态层
    - 加载中、空结果、异常状态统一反馈样式，提供明确恢复动作。

### 3. 组件重组方案（不改业务行为）

- 页面骨架组件
    - `PageShell`: 统一网格、间距、断点与主题挂载。
    - `SearchHero`: 主搜索输入与快速提示。
    - `ResultsToolbar`: 总数、排序、比较维度说明。
- 筛选组件
    - `FilterRail`（桌面）与 `FilterDrawer`（移动）共享同一筛选 schema。
    - `ActiveFilterChips`: 当前条件可视化与一键清空。
- 列表与卡片组件
    - `ReviewFirstHotelCard`: 评分优先、评论摘要优先、信任信号可视化。
    - `TrustSignalStrip`: 评价上下文、时间、可用元信息。
    - `ImagePreview`: 缩略图查看与失败降级。
- 状态组件
    - `QueryStateFeedback`: loading/empty/error 三态统一。

### 4. 评分与信任信号表达

- 评分展示
    - 保持现有评分业务语义不变，增强视觉层级（主分值、辅助标签、排序依据说明）。
    - 结果卡片必须显式说明“当前排序依据”，降低误读。
- 信任信号
    - 显示可解释元信息：发布时间、有用数、历史评论数、分类标签。
    - 对缺失信息执行温和降级，禁止卡片结构塌陷。

### 5. 比价清晰度策略（契约不变约束）

- 当前数据契约无价格字段，本期不新增后端字段、不改 API。
- UI 保留“比较区域”交互位置，但使用现有可比较维度：评分、有用数、历史评论数、发布时间。
- 若呈现价格位，必须标记“价格数据未接入”，避免造成错误决策。

### 6. 响应式与可访问性基线

- 断点覆盖：375、768、1024、1440。
- 触控目标：关键按钮与可点击元素高度不低于 44px。
- 可访问性要求
    - 可见焦点态；键盘可达；标签语义完整。
    - 文本对比度满足 WCAG 4.5:1。
    - 粘性头部不得遮挡首屏内容，移动端避免 `100vh` 陷阱，使用 `min-h-dvh` 策略。

### 7. 反模式约束

- 禁止引入与当前方向冲突的高噪音装饰（如紫粉 AI 渐变、过重玻璃拟态）。
- 禁止将筛选、排序、结果状态混在同一区域导致主次不明。
- 禁止仅做视觉改动而破坏现有行为、URL 查询参数语义或接口兼容性。

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Phase 0 前 Gate 评估

- [x] 代码质量门禁：采用现有 lint/type-check/build 阻断策略，重构过程以组件拆分和语义命名为主，禁止无验证的大规模行为改动。
- [x] 测试门禁：保留并补充单元、集成、契约回归，重点覆盖搜索、筛选、分页、看图与状态反馈，确保行为不回归。
- [x] 体验一致性门禁：统一设计令牌、交互文案、状态反馈与可访问性基线，保证桌面与移动主路径一致。
- [x] 性能门禁：沿用既定预算（查询 2 秒、首屏 3 秒）并增加重构后体验基准比对，防止 UI 重构导致性能退化。
- [x] 文档门禁：spec 与本 plan 已为简体中文，后续 research/data-model/contracts/quickstart/tasks 均保持中文。

### Phase 1 后复核

- [x] 研究产物已覆盖：组件重组、设计令牌、OTA 信息层级、移动端交互与契约兼容策略均已明确，无未决澄清。
- [x] 设计产物已覆盖：`data-model.md`、`contracts/`、`quickstart.md` 均围绕“仅前端重构、行为与契约不变”落地。
- [x] 无宪章违规项，无需复杂度豁免。

## Project Structure

### Documentation (this feature)

```text
specs/002-ota-frontend-refactor/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   ├── api-compatibility-contract.md
│   └── ui-behavior-contract.md
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
└── (本次仅作为既有后端契约与数据流参考，不做改动)

public/
└── enriched_comments.csv
```

**Structure Decision**: 采用“前端重构优先”的 Web 应用结构，改动集中于 `frontend` 下的组件、样式、页面组织与测试，`insforge` 契约保持不变，仅用于兼容性对照与回归校验。

## Complexity Tracking

当前无宪章门禁冲突，不需要复杂度豁免记录。
