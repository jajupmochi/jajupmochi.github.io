# 部署清单

> **Language:** [English](README.md) | 中文

把 `master` 推到 GitHub Pages 之前，按顺序完成下面每一项。每一节都链到对应详细指南。`index_en.html` 中标记为 `PASTE_...` 的占位符常量**必须**替换，否则相应功能会静默失效。

## Master TOC

- [操作顺序](#操作顺序)
- [`index_en.html` 中需要替换的占位符](#index_enhtml-中需要替换的占位符)
- [冒烟测试（推荐 — 每次部署后跑一次）](#冒烟测试推荐--每次部署后跑一次)
- [仓库内置钩子与脚本](#仓库内置钩子与脚本)
- [出问题时](#出问题时)
- [本清单的联系方式](#本清单的联系方式)

交叉引用：

- 所有手动 setup 项的路线图：[`../PLAN.md`](../PLAN.md) Horizon `H2.M1`。
- 每次改动的审计日志：[`../UPDATES.md`](../UPDATES.md)。
- 本目录的详细指南：
    - [`form-backend-google-sheets.md`](form-backend-google-sheets.md) — welcome form 后端。
    - [`analytics-clarity.md`](analytics-clarity.md) — 无 cookie Clarity。
    - [`analytics-backup.md`](analytics-backup.md) — 通过 GH Actions 每周备份 Clarity。
    - [`security-headers.md`](security-headers.md) — CSP 与相关 meta 标签。

## 操作顺序

| # | 任务 | 时间 | 阻塞 | 详细 |
|---|------|------|------|------|
| 1 | 创建 Google Sheet + Apps Script Web App，粘贴 URL | ~10 分钟 | welcome form | [form-backend-google-sheets.md](form-backend-google-sheets.md) |
| 2 | 创建 Clarity 项目，粘贴 project id，启用无 cookie 模式 | ~5 分钟 | analytics | [analytics-clarity.md](analytics-clarity.md) |
| 3 | 启用 `.githooks/pre-commit`（每个 clone 一次） | 10 秒 | i18n 安全 | `git config core.hooksPath .githooks`（见 CLAUDE.md） |
| 4 | 加 `CLARITY_API_TOKEN` 仓库 secret + 开启 Actions 写权限 | ~5 分钟 | 每周备份 | [analytics-backup.md](analytics-backup.md) |
| 5 | 浏览 CSP directive；后续接入新服务时把 CDN 源加入白名单 | — | 任何新第三方 | [security-headers.md](security-headers.md) |

## `index_en.html` 中需要替换的占位符

在文件中搜索以下字面量：

| 占位符 | 替换为 | 来源 |
|--------|--------|------|
| `PASTE_YOUR_APPS_SCRIPT_WEB_APP_URL_HERE` | GAS Web App URL（形如 `https://script.google.com/macros/s/.../exec`） | 步骤 1 |
| `PASTE_CLARITY_PROJECT_ID` | 10 字符的 Clarity project id | 步骤 2 |

可选（仅当启用每周备份 workflow 时）：

- GitHub 仓库 → **Settings → Secrets and variables → Actions** → 添加 `CLARITY_API_TOKEN`，值取自 Clarity 仪表盘。

## 冒烟测试（推荐 — 每次部署后跑一次）

1. 打开线上站，DevTools **Console** — 没有 `Refused to …` CSP 错误，没有 Clarity 400（前提是步骤 2 已完成）。
2. 清掉 `localStorage.hasVisitedBefore` → 刷新 → 填明信片 → 提交 → 数秒内你的 Google Sheet 会出现新行。
3. 缩到 375 px 宽 → 出现汉堡图标 → 点击展开抽屉。
4. 循环 4 个主题（AI / Academic / Industrial / Fancy） — welcome 明信片在每个主题下都自适应。
5. 切换语言（EN/中/FR/DE） — 所有字符串都更新，非英文 locale 下不会有可见的英文残留。

## 仓库内置钩子与脚本

| 文件 | 用途 |
|------|------|
| `.githooks/pre-commit` | 任何 `locales/*.json` 进入暂存时跑 `scripts/check_i18n_parity.py`；key 不一致就 block 提交。 |
| `scripts/check_i18n_parity.py` | EN 是基线；zh/fr/de 必须有相同的 key 树。 |
| `scripts/welcome-form-backend.gs` | Apps Script 模板（粘贴到 Sheets → Extensions → Apps Script）。 |
| `scripts/fetch_clarity.py` | 由每周 GH Actions workflow 调用 — 无需手动运行。 |
| `.github/workflows/backup-analytics.yml` | 每周 cron，把 Clarity 快照提交到 `data/analytics/`。 |

## 出问题时

- **表单提交了但 Sheet 没行** → Apps Script 部署被缓存；进 **Deploy → Manage deployments → New version**。
- **Console 报 CSP 错误** → 把肇事来源加入 `index_en.html` 顶部 `<meta http-equiv="Content-Security-Policy">` 中匹配的 directive。详见 [security-headers.md](security-headers.md)。
- **`git push` 失败** → 你大概漏了 `core.hooksPath .githooks`，导致之前某次 commit 的 pre-commit 钩子没触发；重新启用 `git config core.hooksPath .githooks`。

## 本清单的联系方式

如果上述某一步与实际仪表盘（Clarity、Apps Script、GitHub UI）不再对得上 — 这些服务每隔几个月就重排 UI — 直接更新 `setup/` 下对应文件并提交即可。
