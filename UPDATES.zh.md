# 更新日志

> **Language:** [English](UPDATES.md) | 中文
>
> 按 `CLAUDE.md` 硬规则要求强制维护的开发日志。每一批改动都必须在同一 edit batch 中追加一条记录。
>
> 格式：日期标题用 `# YYYY-MM-DD`（UTC）。同一天若有多次独立的改动批次，每批在该日期下用 `## V1`、`## V2`、`## V3` H2 子标题分组。条目用短 bullet 列表 — `- <改了什么>`，可附 `<file>:<line>` 指针。

# 2026-04-21

## V3 — 文档大修（Master Plan + 中英双语双文件约定）

目标：让每一类读者（访客 / 维护者 / AI agent）都有尺寸刚好的入口，并让路线图 + 变更日志保持同步。把 H/M/G/T 层级贯穿全部项目文档，所有新增文档强制双语（`NAME.md` + `NAME.zh.md`）。落地 `PLAN.md` 的 `H4.M1.G1..G4` 与 `H4.M2.G1`。

- **`PLAN.md`（新增）** — Master 路线图，含状态符号表、ID 体系（`H<n>.M<n>.G<n>.T<n>`，永不复用编号）、层级约定（Horizon → Milestone → Goal → Task）、Master TOC，以及 5 个填充好的 Horizon：H1（求职资产）、H2（运营与维护，所有 `[?]` 项外露）、H3（内容扩展）、H4（文档 / AI 基础设施）、H5（职业外延）。底部有维护规程。
- **`PLAN.zh.md`（新增）** — 全文中文镜像，所有 H/M/G/T ID 保持英文，仅翻译散文。
- **`CLAUDE.md`** — 新增 4 条硬规则：`UPDATES.md` 强制按日记录（V1 已加，此处保留）；改动命中 PLAN.md 条目时必须在同批 edit 中同步状态；每份 markdown 必须在顶部带 Master TOC；所有仓库级文档强制双语双文件（`NAME.md` canonical + `NAME.zh.md` 镜像，顶部带语言切换器，代码 / ID 两版保持英文）。新增 "Documentation conventions" 章节，解释 Master TOC / PLAN.md / UPDATES.md / 层级与状态符号 / 双语规则。
- **`CLAUDE.zh.md`（新增）** — CLAUDE.md 全文中文镜像。
- **`README.md`** — 重写为按读者分区：「面向访客（招聘方、合作者）」（主页 / CV / 联系方式）、「面向维护者（Linlin / 未来的自己）」（快捷动作表、4 条手动一次性 setup checklist 映射到 PLAN.md ID、仓库布局、每个功能对应的文档位置、how-to 小菜谱）、「面向 AI agent（Claude Code 等）」（入口文件、路线图 + 变更日志、项目技能）。Open Graph 卡、主题、部署说明保留。
- **`README.zh.md`（新增）** — 全文中文镜像。
- **`UPDATES.md`** — 加语言切换器 + 本 V3 条目。
- **`UPDATES.zh.md`（新增）** — 全文中文镜像。
- **`setup/README.md`** — 加语言切换器 + Master TOC + 与 PLAN.md 的交叉引用（`H2.M1` 路线图）+ 每份详细指南链接。
- **`setup/README.zh.md`（新增）** — 全文中文镜像。
- **`setup/form-backend-google-sheets.md`** — 加语言切换器 + Master TOC + PLAN.md 交叉引用（`H2.M1.G1`、`H2.M2.G4`）。
- **`setup/form-backend-google-sheets.zh.md`（新增）** — 全文中文镜像。
- **`setup/analytics-clarity.md`** — 加语言切换器 + Master TOC + PLAN.md 交叉引用（`H2.M1.G2`、`H2.M1.G4`）。
- **`setup/analytics-clarity.zh.md`（新增）** — 全文中文镜像。
- **`setup/analytics-backup.md`** — 加语言切换器 + Master TOC + PLAN.md 交叉引用（`H2.M1.G4`、`H2.M3.G1`、`H2.M3.G2`）。
- **`setup/analytics-backup.zh.md`（新增）** — 全文中文镜像。
- **`setup/security-headers.md`** — 加语言切换器 + Master TOC + PLAN.md 交叉引用（`H1.M2` SEO schema 依赖、`H2.M1.G1/G2` Sheets / Clarity 来源）。
- **`setup/security-headers.zh.md`（新增）** — 全文中文镜像。
- **状态上卷（`PLAN.md` + `PLAN.zh.md` 同步）**：`H4.M1.G2.T1..T3` → `[✓]`；`H4.M1.G3.T1..T3` → `[✓]`；`H4.M2.G1.T1..T3` → `[✓]`。新增 `H4.M1.G4`（双语文档）Goal，T1/T2/T3 → `[✓]`，T4 → `[ ]`（未来的 pre-commit 双语奇偶校验）。`M4.1` → `[✓]`（所有 Goal 完成）；`M4.2` → `[ ]`（G1 完成，G2 how-to 待办）；H4 汇总 → `[ ]`（M4.2/M4.3 仍有待办）。

## V2 — SEO 审计后续整改（6 项警告 + 5 项机会）

- **Title + meta description（`index_en.html`）**：标题改写为 ~77 字符，含 `Ph.D. | ML Research Scientist · Graph ML / GNN / LLM · Postdoc @ Bern`；描述扩到 ~158 字符，包含 "Open to roles in Switzerland / EU / remote"。
- **hreflang → `?lang=` URL 变体（`index_en.html:34-38` + `sitemap.xml` + `js/main.js`）**：每个 locale 现在都有独立的可爬取入口（`?lang=en|zh|fr|de`）。`main.js` 优先读 URL 参数（> localStorage > navigator）并回写 localStorage，使切换具有粘性。
- **FAQPage JSON-LD（`index_en.html`）**：新增 5 条问答，覆盖研究方向、求职意向、graph ML 定义、开源库、联系方式 — 优化 ChatGPT/Perplexity/Claude 引用 + Google SGE。
- **BreadcrumbList JSON-LD（`index_en.html`）**：6 段面包屑（Home → About → Research → Projects → Publications → Contact），让 SERP 显示更丰富。
- **`rel="noopener noreferrer"` 一遍过（`index_en.html`）**：给 23 个 `target="_blank"` 外链加上属性（project-card ×4、pub-link ×13、social-link-personal ×4、hero CV 下载、Google Scholar 文字链、Zhihu 页脚链）。封堵 window.opener 泄漏，并带轻微 SEO 收益。
- **Publications pub-thumbnail `width`/`height` 属性（`index_en.html`）**：ICPR / JCC / ACPR 的 `<img>` 占位图加上显式 `180×140`，CSS 加载前防止 CLS。
- **Projects → SVG figure 嵌入（`index_en.html:916-970`）**：把 Spatio-Temporal GNN + RedoxPrediction 卡片的 FontAwesome-on-gradient 占位图替换为 `<object type="image/svg+xml">`（PNG 回退）。新增两张项目卡 — **GraphInk**（手写识别，SNSF 2024-，HES-SO + TU Dortmund）与 **Graph Matching Algorithms**（SNSF 2023-2024，PRG Bern）— 各自嵌入对应研究 figure。按 Task #48 的一对多映射，4 套 SVG 现在同时出现在 project 与 publication 卡片上。
- **Welcome popup heading（`index_en.html:438`）**：`<h2>Welcome</h2>` 改为 `<p class="welcome-heading" role="heading" aria-level="2">Welcome</p>`，让 DOM 顺序中唯一一个 H2-before-H1（在 modal 内）不再泄漏到 Googlebot 的标题层级分析。CSS 同步双选择器。
- **AVIF hero 照片（`images/photo.avif` 新增 + `index_en.html:556`）**：用 `ffmpeg libaom-av1` 生成 28 KB AVIF（对比 59 KB WebP、145 KB JPEG）。`<picture>` 现在按 AVIF → WebP → JPEG 顺序提供 source，给现代浏览器最佳 LCP。
- **Sitemap 深度（`sitemap.xml`）**：URL 数量从 3 → 13。新增 4 个 `?lang=` 变体、`/blog/`、4 张研究 figure SVG。在主页 canonical 入口上用 `xhtml:link` 声明 hreflang 备选。
- **CSS welcome-heading 规则（`css/main.css:956`）**：把 `.postcard-header h2` 的样式镜像到 `.postcard-header .welcome-heading`，使 `<p>` 替换前后像素一致。`.postcard-header p:not(.welcome-heading)` 取反保持副标题样式不变。

## V1 — 内容审计、figure、更新日志

- **CLAUDE.md**：新增强制硬规则 — 每次改动都必须更新 `UPDATES.md`。
- **UPDATES.md**（新增）：建立开发日志，回填 2026-04-20 的工作。
- **Publications（`index_en.html` + `data/citations.json` + JSON-LD）**：把 3 条幻觉条目（WL-Kernel/PR 2021、Pre-image/ICML 2020、GED Review/TCBB 2019）替换为 CV 中的真实出版 [J24, C23, J23, J22b, J22a, J21, W21b, W21a, P16] + ICPR 2026 接收论文。修正 [J24] 与 [C23] 的作者列表错误。
- **Projects（`index_en.html`）**：新增 Graph Matching Algorithms（2023-2024 SNSF）、GraphInk Handwriting（2024-，SNSF）、LIULIAN 平台（关键个人基础设施）、PLANALYSER（2024-2025 Innosuisse）、Local Confidential Translator（个人 MVP）。刷新 N-Banker、Spatio-Temporal GNN、OCTOPUSSY、Virtual Bodmer 文案以对齐 `extra_info_work.md`。
- **Figures（`res/figures/`）**：用 `<object type="image/svg+xml">` 把 4 套 SVG-with-PNG-fallback figure 对插入相应 project + publication 卡片（搜索引擎可索引 SVG XML 内容做 SEO）。映射：`2023_acpr_gecl` → C23 + Graph Matching project；`2025_graphink` → GraphInk project；`2026_icpr_swissriver` → Spatio-Temporal GNN project + ICPR 2026 pub；`jcc2023_redox` → J24 pub + RedoxPrediction project。
- **CSP（`index_en.html`）**：`object-src 'none'` 放宽为 `object-src 'self'`，允许同源 SVG 内联嵌入。
- **News（`index_en.html`）**：增加 2025 / 2024 条目，反映 GraphInk + LIULIAN + N-Banker 在 2026 InnoEx HK 的聊天机器人 demo。
- **Skills（`index_en.html`）**：新增 agent-skills（`python-backend-creator`、`project-adaptor`）和 vibe-coding 工具（Claude Code、Codex 等）标签。
- **Stats（`index_en.html`）**：发表数量从 9 → 10，反映 ICPR 2026 + 校正后的 publications。
- **i18n（`locales/{en,zh,fr,de}.json`）**：本次未引入新翻译 key；HTML 改动复用现有 key 加原始英/中（技术项目名）。
- **CSS（`css/main.css`）**：新增 `.project-image object`、`.pub-thumbnail object` 规则，让嵌入 SVG 用 `object-fit: cover` 填满容器。

# 2026-04-20

## V1 — v7 重设计上线 + P0 SEO/a11y 大修

- 把 `index_en_v7_round3.html` 部署到 `index_en.html` — 整体重设计：新 hero、OG card、favicon、locales、主题切换器（ai-generated/academic/industrial/fancy）。
- 修复 canonical 重定向、sitemap 去重、新增 `WebSite` JSON-LD schema、Font Awesome webfonts 预加载。
- 修复 Lighthouse label-mismatch 与移动端 touch-target a11y 警告。

## V2 — 站点运营批次（表单、分析、CSP、移动）

- Welcome 明信片表单 → Google Sheets 后端（Apps Script + GH-Actions cron 镜像）。
- 接入 Microsoft Clarity，无需 cookie 同意流。
- CSP / Referrer-Policy / X-Content-Type meta 加固。
- 移动端 navbar 汉堡菜单。
- Postcard welcome 的 i18n key 在 en/zh/fr/de 之间同步。

## V3 — 工具链

- `.githooks/pre-commit` 在 staged `locales/*.json` 上运行 `scripts/check_i18n_parity.py`。
- `.claude/settings.json` 的 PostToolUse 钩子在 edit 后校验 JSON。
- 新增项目技能：`/preview`、`/verify-visual`、`/new-round`、`/deploy-round`、`/i18n-sync`。
- 把部署 README 整合到 `setup/`。

## V4 — 静态重构

- 抽离 CSS（~2.7k 行）到 `css/main.css`，JS（~850 行）到 `js/main.js`。
- `index_en.html` 从 4852 → 1289 行。
- Welcome 明信片完全 i18n 化；完成全站 i18n 审计；`zh` 切换到统一主站。

# 2026-04-02

- 手动用最新 Google Scholar 指标刷新 `data/citations.json`（`total_citations: 130`、`h_index: 7`、`i10_index: 5`）。

# 2024-01-17

- `f64a27a` — 更新 CV PDF（`res/cv/CV_Linlin_Jia_{en,zh}.pdf`）。

# 2023-12-13

- `c9b8cd0` — CV 大幅更新。

# 2023-10-24

- `5329c74` — 新增一篇论文 + CV 更新。

# 2023-09-27

- `3383a4d` — 新增多篇论文 + CV 更新。
