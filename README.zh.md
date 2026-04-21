# jajupmochi.github.io

> **Language:** [English](README.md) | 中文

Linlin Jia 博士的个人学术主页 — ML Research Scientist / University of Bern Advanced Postdoc。托管于 GitHub Pages。

在线站点：<https://jajupmochi.github.io/index_en.html>

## Master TOC

- [面向访客（招聘方、合作者）](#面向访客招聘方合作者)
- [面向维护者（Linlin / 未来的自己）](#面向维护者linlin--未来的自己)
    - [快捷操作](#快捷操作)
    - [手动一次性配置清单](#手动一次性配置清单)
    - [仓库目录结构](#仓库目录结构)
    - [每项功能的文档位置](#每项功能的文档位置)
    - [如何 …](#如何-)
- [面向 AI agent（Claude Code 等）](#面向-ai-agentclaude-code-等)
    - [入口文件](#入口文件)
    - [路线图 + 变更日志](#路线图--变更日志)
    - [项目技能](#项目技能)
- [Open Graph 社交卡片](#open-graph-社交卡片)
- [主题](#主题)
- [部署](#部署)
- [给贡献者 / 未来自己的注意事项](#给贡献者--未来自己的注意事项)

---

## 面向访客（招聘方、合作者）

你大概从在线站点过来。权威入口：

- **主页：** <https://jajupmochi.github.io/index_en.html>
- **CV（英文）：** [`res/cv/CV_Linlin_Jia_en.pdf`](res/cv/CV_Linlin_Jia_en.pdf)
- **联系方式：** 主页 hero 区有邮箱；[Google Scholar](https://scholar.google.com/citations?user=RBjUTooAAAAJ)。

本仓库其余部分都不是给访客看的 — 以下全部是工程 / 维护相关内容。

---

## 面向维护者（Linlin / 未来的自己）

### 快捷操作

| 想做… | 这样做 |
|-------|--------|
| 本地预览站点 | `python3 -m http.server 8000` → <http://localhost:8000/index_en.html> |
| 小的文案 / CSS 改动 | 直接改 `index_en.html` / `css/main.css`，commit。 |
| 大型重设计 | `/new-round` → 在 `index_en_v{N}_round{M}.html` 上迭代 → `/deploy-round` |
| 在真实浏览器里验证 UI 改动 | `/verify-visual`（走 chrome-devtools MCP） |
| 检查 i18n key 对齐 | `/i18n-sync` |
| 看路线图 | [`PLAN.md`](PLAN.md) / [`PLAN.zh.md`](PLAN.zh.md) |
| 看近期变更 | [`UPDATES.md`](UPDATES.md) / [`UPDATES.zh.md`](UPDATES.zh.md) |

### 手动一次性配置清单

以下步骤在**仓库之外**（dashboard、token）完成。不做的话，对应功能在线上会静默失效。详细说明在 `setup/` 目录。

- [ ] **Welcome 表单后端** → `setup/form-backend-google-sheets.md` — 创建 Google Sheet + Apps Script；把 `index_en.html` 里的 `PASTE_YOUR_APPS_SCRIPT_WEB_APP_URL_HERE` 替换掉。*(PLAN.md: `H2.M1.G1`)*
- [ ] **Microsoft Clarity 分析** → `setup/analytics-clarity.md` — 创建 Clarity 项目；替换 `index_en.html` 里的 `PASTE_CLARITY_PROJECT_ID`；dashboard 里开启 cookie-less 模式。*(PLAN.md: `H2.M1.G2`)*
- [ ] **pre-commit 钩子** → **每个 clone 跑一次**：`git config core.hooksPath .githooks`。*(PLAN.md: `H2.M1.G3`)*
- [ ] **Clarity 每周备份** → `setup/analytics-backup.md` — 生成 Clarity API token；以 `CLARITY_API_TOKEN` 加为 GH 仓库 secret；开启 GH Actions 写权限。*(PLAN.md: `H2.M1.G4`)*

每做完一项，把 `PLAN.md` 里对应条目从 `[?]` 改成 `[✓]`。

### 仓库目录结构

| 路径 | 用途 |
|------|------|
| `index_en.html` | 部署的英文站（访客看的就是这个）。 |
| `index_zh.html` | 历史遗留中文页面（样式独立）。 |
| `css/main.css`, `js/main.js` | 抽离的样式表与 JS（由 `index_en.html` 加载）。 |
| `locales/{en,zh,fr,de}.json` | i18n 翻译。四份 key 树必须完全一致。 |
| `data/citations.json` | Google Scholar 引用数据（手工维护）。 |
| `data/analytics/` | cron 工作流 commit 的 Clarity 每周快照。 |
| `res/cv/CV_Linlin_Jia_{en,zh}.pdf` | 站点可下载 CV。 |
| `res/figures/` | 研究示意图（SVG + PNG fallback），嵌入项目卡与论文卡。 |
| `images/` | 照片、favicon、OG 社交卡、AVIF / WebP / JPEG 三格式 hero 照。 |
| `scripts/` | 本地工具 — OG 卡生成、i18n 校验、Clarity 抓取、Apps Script 模板。 |
| `setup/` | 手动一次性配置说明（见下方）。 |
| `sitemap.xml`, `robots.txt` | SEO 爬虫控制。 |
| `blog/`, `docs/` | 独立 Jekyll 子项目（Hux Blog / minima）。较旧，与主站无关。 |
| `archive/` | 已被取代的历史 redesign round。 |
| `index_en_v{N}_round{M}.html` | 进行中的 redesign 工作副本；`v{N}_round3` 是该代定稿。不要删。 |
| `index_en_backup.html` | 重设计前的快照。不要动。 |
| `extra_info_work.md` | Linlin 扩展职业信息 — CV PDF 之外的内容权威来源。 |

### 每项功能的文档位置

| 功能 | 文档 | 读者 |
|------|------|------|
| 总体维护流程 | [`CLAUDE.md`](CLAUDE.md)（硬规则、技能、钩子） | 维护者 + AI |
| 路线图 / 待办 | [`PLAN.md`](PLAN.md)（Horizon / Milestone / Goal / Task） | 维护者 + AI |
| 逐次变更审计 | [`UPDATES.md`](UPDATES.md)（按日期，V1/V2/… 子标题） | 维护者 + AI |
| Welcome 表单后端（Google Sheets + Apps Script） | [`setup/form-backend-google-sheets.md`](setup/form-backend-google-sheets.md) | 维护者（一次性） |
| Microsoft Clarity 分析（无 cookie） | [`setup/analytics-clarity.md`](setup/analytics-clarity.md) | 维护者（一次性） |
| Clarity 每周备份（GitHub Actions cron） | [`setup/analytics-backup.md`](setup/analytics-backup.md) | 维护者（一次性） |
| CSP / Referrer-Policy / X-Content-Type meta | [`setup/security-headers.md`](setup/security-headers.md) | 维护者（新增 CDN 时） |
| 部署清单索引 | [`setup/README.md`](setup/README.md) | 维护者 |
| OG 卡重新生成 | 本文件 [Open Graph 社交卡片](#open-graph-社交卡片)一节 | 维护者（文案变时） |
| i18n key 对齐 | [`CLAUDE.md`](CLAUDE.md#hard-rules) + `/i18n-sync` 技能 | 维护者 + AI |
| 重设计流程 | [`CLAUDE.md`](CLAUDE.md#iterative-workflow-mixed-mode) + `/new-round`、`/deploy-round` 技能 | 维护者 + AI |
| pre-commit 钩子（i18n 校验） | `.githooks/pre-commit` + [`setup/README.md`](setup/README.md) | 维护者（一次性） |
| PostToolUse JSON 校验钩子 | `.claude/settings.json` + [`CLAUDE.md`](CLAUDE.md#subagents--skills--hooks) | AI |
| 内容权威来源 | `res/cv/CV_Linlin_Jia_en.pdf` + `extra_info_work.md` | 维护者 + AI |

### 如何 …

- **新增一个项目卡：** 修改 `index_en.html` 里的 `#projectsTrack` carousel。项目有研究图的话，把 SVG + PNG 放进 `res/figures/`，用 `<object type="image/svg+xml">` 嵌入并以 PNG 做 `<img>` fallback。如果项目有公开仓库，在 Person → SoftwareSourceCode JSON-LD 里也补一项。（TODO：抽成 `setup/add-project-card.md` — 见 PLAN.md `H4.M2.G2.T1`。）
- **新增一篇论文：** 修改 `index_en.html` 里的 publications 区块，并在 `<head>` 加对应的 ScholarlyArticle JSON-LD 块。同时更新统计数字。
- **新增一种 locale（例如 ja）：** 复制 `locales/en.json` → `locales/ja.json`，翻译值，保持 key 树一致。在 `js/main.js` 的语言列表里加 `ja`。`sitemap.xml` 加一条 `?lang=ja`。跑 `/i18n-sync`。（TODO：抽成 `setup/add-locale.md` — PLAN.md `H4.M2.G2.T2`。）
- **扩展 CSP 给新的第三方 CDN：** 修改 `index_en.html` 里的 `<meta http-equiv="Content-Security-Policy">`。把新 origin 加进 `script-src` 和 `connect-src`。DevTools Console 里验证 — CSP 错误都以 `Refused to …` 开头。详情见 [`setup/security-headers.md`](setup/security-headers.md)。

---

## 面向 AI agent（Claude Code 等）

### 入口文件

1. [`CLAUDE.md`](CLAUDE.md) — 硬规则、约定、技能。
2. [`PLAN.md`](PLAN.md) — 带 Horizon / Milestone / Goal / Task ID 与状态符号的完整路线图。
3. [`UPDATES.md`](UPDATES.md) — 时间序列变更日志；从文件顶部读即可拿到最近上下文。
4. [`extra_info_work.md`](extra_info_work.md) — Linlin 的扩展职业信息（CV PDF 之外的内容权威来源）。

### 路线图 + 变更日志

`PLAN.md` 的 Horizon / Milestone / Goal / Task 层级用稳定的数字 ID（`H1.M2.G3.T4`）。开工前先定位对应 Task ID。完成后在同一批 edit 里更新状态符号（`[ ]`→`[~]`→`[✓]`），并在 `UPDATES.md` 加一条 bullet。详见 [`CLAUDE.md#documentation-conventions`](CLAUDE.md#documentation-conventions)。

### 项目技能

位于 `.claude/skills/`，每个有独立 SKILL.md。

| 技能 | 用途 |
|------|------|
| `/preview` | 后台起 `python3 -m http.server 8000`。 |
| `/verify-visual` | 驱动 chrome-devtools MCP 验证 UI 改动。 |
| `/new-round` | 创建下一个 `index_en_v{N}_round{M}.html` 工作副本。 |
| `/deploy-round` | 把定稿的 round 文件覆盖到 `index_en.html`。 |
| `/i18n-sync` | 检查 `en/zh/fr/de` 四份 locale 的 key 对齐。 |

---

## Open Graph 社交卡片

当有人把站点 URL 分享到 Slack、LinkedIn、X、WhatsApp 等，抓取 preview 用的是 `images/og-card.jpg`。该图是**预渲染的，不会在请求时动态生成** — GitHub Pages 无构建步骤。身份 / 角色 / 研究文案改变时，重新生成是一次性手工操作。

**产出文件：**

| 文件 | 作用 |
|------|------|
| `images/og-card.jpg` | **默认** — 白底，被 `<meta property="og:image">` 引用。 |
| `images/og-card-blue.jpg` | 深蓝渐变备用变体（可选轮换用）。 |
| `images/og-card_purple.jpg` | AI-generated / v7 变体。 |

**重新生成：**

```bash
bash scripts/generate-og-card.sh
```

需要 ImageMagick v6（Debian/Ubuntu：`sudo apt install imagemagick`）。脚本以 `images/photo.jpg` 为原始头像、裁成圆形，在所选背景上合成姓名 / 角色 / 所属 / 研究关键词 / "Open to …" pill / 网址+邮箱。要改文案或布局就改脚本顶部。

**在多个变体之间轮换（可选）：**

```bash
bash scripts/rotate-og-card.sh
```

把 `og-card.jpg` 以随机变体覆盖。没有任何地方自动调这个脚本 — 手动跑，或启用 `.github/workflows/rotate-og-card.yml` 的周一 cron（见 PLAN.md `H2.M2.G3.T1`）。

---

## 主题

顶栏有控件循环 4 个主题，存在 `localStorage`：

- `ai-generated`（默认）— 紫 / 靛
- `academic` — 浅色极简蓝
- `industrial` — 深色石板，Orbitron 显示字体
- `fancy` — 童话粉色带动画

主题状态以 `data-theme="…"` 写在 `<body>` 上。改 CSS 时 4 个都要验证 — `ai-generated` 下对的改动可能打挂 `fancy`。

---

## 部署

push 到 `master` 就会走 GitHub Pages 自动部署，无构建步骤。

push 前照 [`setup/README.md`](setup/README.md) 的 checklist 走一遍 — 它覆盖 PASTE_ 占位符替换、CSP directive、以及一次烟囱测试。

---

## 给贡献者 / 未来自己的注意事项

- `locales/*.json` 和 `data/*.json` 必须保持合法 JSON — 语法错误会打挂线上站点。改完跑 `jq . <file>`。
- `locales/{en,zh,fr,de}.json` 四份必须 key 树一致；缺 key 会以英文 default 裸露。
- 重设计流程（`index_en_v{N}_round{M}.html`）以及其他项目约定在 [`CLAUDE.md`](CLAUDE.md)。
- 路线图在 [`PLAN.md`](PLAN.md)。每次改动都要在 [`UPDATES.md`](UPDATES.md) 的当日日期下加一条 bullet。
