# docs/ — 项目文档

> **Language:** [English](README.md) | 中文
>
> `docs/` 目录下所有内容的索引。这里是 `jajupmochi.github.io` 的文档主目录 —
> 路线图、变更日志、一次性配置指南、审计笔记、归档子项目。根目录文件
>（`CLAUDE.md`、`README.md`）不放这里，因为工具链 / Claude Code 默认从仓库
> 根目录加载这些文件。

## Master TOC

- [这里有什么](#这里有什么)
    - [路线图与变更日志](#路线图与变更日志)
    - [`setup/` — 一次性配置指南](#setup--一次性配置指南)
    - [`vibe/` — 审计与研究笔记](#vibe--审计与研究笔记)
    - [`_archive-jekyll-minima/`](#_archive-jekyll-minima)
- [刻意不放这里的](#刻意不放这里的)
- [双语约定](#双语约定)

## 这里有什么

### 路线图与变更日志

| 文件 | 用途 |
|------|------|
| [`PLAN.md`](PLAN.md) / [`PLAN.zh.md`](PLAN.zh.md) | 路线图唯一来源。Horizon / Milestone / Goal / Task 层级，稳定 ID（`H1.M2.G3.T4`）与状态符号（`[ ]` / `[~]` / `[✓]` / `[!]` / `[?]` / `[x]`）。长期 + 中期规划唯一权威。 |
| [`UPDATES.md`](UPDATES.md) / [`UPDATES.zh.md`](UPDATES.zh.md) | 时间序列变更日志。最新日期在最上；同一天内 `V<n>` 号最大的在最上。每个 PR / commit 必须加一条（见 `CLAUDE.md` 硬规则）。 |

### `setup/` — 一次性配置指南

外部服务接线，必须每个 clone 或每次部署跑一遍。没做的话，对应功能在线上静默失效。

| 指南 | PLAN ID | 覆盖内容 |
|------|---------|----------|
| [`setup/README.md`](setup/README.md) / [`.zh.md`](setup/README.zh.md) | — | 索引 + 部署 checklist。 |
| [`setup/form-backend-google-sheets.md`](setup/form-backend-google-sheets.md) / [`.zh.md`](setup/form-backend-google-sheets.zh.md) | `H2.M1.G1` | Welcome postcard → Google Sheets（Apps Script）。 |
| [`setup/analytics-clarity.md`](setup/analytics-clarity.md) / [`.zh.md`](setup/analytics-clarity.zh.md) | `H2.M1.G2` | Microsoft Clarity 分析（cookie-less 模式）。 |
| [`setup/analytics-backup.md`](setup/analytics-backup.md) / [`.zh.md`](setup/analytics-backup.zh.md) | `H2.M1.G4`, `H2.M3.G1` | GitHub Actions 每周 Clarity API 备份。 |
| [`setup/security-headers.md`](setup/security-headers.md) / [`.zh.md`](setup/security-headers.zh.md) | `H1.M2`, `H2.M1.G1/G2` | CSP / Referrer-Policy / X-Content-Type meta 硬化。 |

### `vibe/` — 审计与研究笔记

深度分析与第三方审计报告。这些是**上下文**，不是权威 — 消化后以 Horizon / Milestone / Goal / Task 形式落入 `PLAN.md`，而不是直接执行。

当前内容：

- `网站深度分析报告_claude_code_2026.04.20.md` — 2026-04-20 网站审计（SEO、性能、a11y、招聘官记忆点）。已整合进 `PLAN.md`，落在 `H1.M2.G1.T5` + 新 `H1.M3.G4` + 新 `H1.M4` Milestone。

### `_archive-jekyll-minima/`

已被取代的 Jekyll 子项目（minima theme `_config.yml`、`Gemfile`、`_posts/…`）。保留作历史参考；不再构建或部署。当前线上站点是纯静态 HTML/CSS/JS，由 `index_en.html` 驱动。

## 刻意不放这里的

- `CLAUDE.md` / `CLAUDE.zh.md` — 留在仓库根目录，因为 Claude Code 默认从 `./CLAUDE.md` 加载。
- `README.md` / `README.zh.md` — 留在根目录，这样 GitHub 会以此渲染为仓库落地页。
- `CLAUDE.local.md` — 私有、gitignored 个人偏好。
- `extra_info_work.md` — Linlin 的职业素材原始文件；与 CV PDF 并列放在根目录方便访问。

## 双语约定

本目录下每份文档都有两个文件：`NAME.md`（英文，canonical） + `NAME.zh.md`（中文镜像）。代码、标识符、文件名、Horizon / Milestone / Goal / Task ID 在两版里都保持英文 — 只翻译散文。完整约定见 `CLAUDE.md` 硬规则。
