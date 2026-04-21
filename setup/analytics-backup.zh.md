# 分析数据备份 — 自动同步到 GitHub

> **Language:** [English](analytics-backup.md) | 中文

一个每周一次的 GitHub Actions cron 会拉取 Microsoft Clarity 的聚合数据，把快照 commit 到本仓库 `data/analytics/clarity-YYYY-MM-DD.json`。这能在 Clarity 哪天不复存在（可能性低）或未经通知改动免费档时保护你的数据，并且给你一份可 diff 的版本化历史。

**本备份故意**不包含 welcome 表单提交。**那些行存在一个私有 Google Sheet 里，可能含访客姓名 / 留言。本仓库公开，所以提交它们会泄漏个人数据。推荐做法见下方 "Submissions backup"。

## Master TOC

- [备份的是什么](#备份的是什么)
- [1. 生成 Clarity API token](#1-生成-clarity-api-token)
- [2. 把 token 加为 GitHub 仓库 secret](#2-把-token-加为-github-仓库-secret)
- [3. 开启 GitHub Actions 写权限（一次性）](#3-开启-github-actions-写权限一次性)
- [4. 首次运行](#4-首次运行)
- [保留 / 裁剪](#保留--裁剪)
- [提交数据备份（推荐做法）](#提交数据备份推荐做法)
- [故障排查](#故障排查)

PLAN.md 交叉引用：`H2.M1.G4`（secrets 设置）、`H2.M3.G1`（备份管线）、`H2.M3.G2`（提交数据备份）。

## 备份的是什么

仅**聚合**的 Clarity 指标 — 浏览器分布、国家分布以及默认的 "project live insights" 计数器。每个快照取滚动 3 天窗口，使每周多跑的 job 之间有重叠，一次失败不会丢数据。

## 1. 生成 Clarity API token

1. 登录 <https://clarity.microsoft.com/> → 打开项目仪表盘。
2. **Settings → Data Export → Generate new API token**。
3. 复制 token（只显示一次 — 当密码对待）。

## 2. 把 token 加为 GitHub 仓库 secret

1. 在 GitHub 打开仓库：<https://github.com/jajupmochi/jajupmochi.github.io>。
2. **Settings → Secrets and variables → Actions → New repository secret**。
3. Name：`CLARITY_API_TOKEN`。Value：粘 token。

## 3. 开启 GitHub Actions 写权限（一次性）

workflow 需要把快照 commit 回仓库，所以要写权限：

1. 仓库 **Settings → Actions → General**。
2. 在 **Workflow permissions** 选 **Read and write permissions**。
3. Save。

## 4. 首次运行

- **自动**：workflow 按 `.github/workflows/backup-analytics.yml` 里的 cron 于 `每周日 04:17 UTC` 触发。
- **手动**：到仓库 → **Actions → backup-analytics → Run workflow**（用 `workflow_dispatch`）。

首次运行成功后会看到 `github-actions[bot]` 提交的 `data/analytics/clarity-<date>.json`。

## 保留 / 裁剪

文件每年累积约 52 × ~10 KB ≈ 0.5 MB/年。很多年内都不用裁剪。真的要裁，手动删旧文件或给 workflow 加一个 cleanup step 即可。

## 提交数据备份（推荐做法）

由于本仓库公开，welcome 表单提交的更安全做法是：

1. **把 Google Sheet 本身当权威**。它已经是一份备份。
2. **同步到私有备份**：任选其一
   - 每月手动：Sheet 菜单 → **File → Download → CSV**，存到你私有的 Dropbox / Drive / 本地。
   - 自动化：建一个*私有*仓库（如 `linlin-site-submissions-backup`），在那边加一个 GH Actions workflow，每周拉 Sheet 的 published-CSV URL 并 commit。workflow 几乎和本仓库相同，只是 secret 换成 `SUBMISSIONS_SHEET_CSV_URL`，并且目标是那个私有仓库。

## 故障排查

| 现象 | 可能原因 | 修复 |
|------|----------|------|
| Workflow 401 | Token 过期 / 错误 | 重新生成，更新 secret |
| Workflow 429 | 触发每日 API 配额 | 第二天重跑；cron 每周一次一般不会命中 |
| workflow 里 `git push` 失败 | 未开启写权限 | 重做步骤 3 |
| Response 形状变了 | Clarity 更新了 API | 相应调整 `scripts/fetch_clarity.py` |
| 首次运行后无快照 | 流量低 → 返回空 | 新项目预期行为 |
