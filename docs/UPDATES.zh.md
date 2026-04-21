# 更新日志

> **Language:** [English](UPDATES.md) | 中文
>
> 按 `CLAUDE.md` 硬规则要求强制维护的开发日志。每一批改动都必须在同一 edit batch 中追加一条记录。
>
> 格式：日期标题 `# YYYY-MM-DD`（UTC），**最新日期在最上面**。同一天若有多次独立的改动批次，用 `## V1`、`## V2`、`## V3` H2 子标题分组，**V 号最大的在最上**，保证最新工作落在最前。

## Master TOC

- [2026-04-21](#2026-04-21)
    - [V9 — SEO 审计第三轮 P0–P5 + UX 打磨 + Projects 九卡按简历重构](#v9--seo-审计第三轮-p0p5--ux-打磨--projects-九卡按简历重构) — SEO：sitemap 失效 URL 修复 + 补 6 条新图链接、Beyond/Blog 两个 `<h2>` 补 i18n 属性、title/description 关键词收紧、引用次数写入 Person + 8 篇 ScholarlyArticle 的 schema。UX：coming-soon toast 玻璃拟态重写、论文缩略图 180×140→220×172 并把 padding 减半、thesis 卡上方加间距。结构性改动：Projects 按 CV 重构成 9 张卡——删除 Virtual Bodmer、合并 OCTOPUSSY+RedoxPrediction、新增 PLANALYSER/APi/SDN，全部 `<a class="project-card">` → `<div>`，新增 `.project-links` 底部多链接控件 + 代理式 JS 点击处理。6 个新 i18n 键 × 4 语种（合计 124 键）。
    - [V8 — Batch-B 前置打磨（thesis 搬底、论文图、专利 i18n、服务图标）](#v8--batch-b-前置打磨thesis-搬底论文图专利-i18n服务图标) — Batch B 前 4 项并行小改：thesis 高亮卡从 Publications 顶端搬到底部、6 张论文卡补上真实 figure（+ figure 文件名改成 `YYYY_venue_*` 约定）、专利外链通过新增的 `data-i18n-href-map` 属性按语种切换、Associations 卡图标 `fa-edit` → `fa-id-badge`。
    - [V7 — A4 博士论文接入（timeline + Publications 高亮块）](#v7--a4-博士论文接入timeline--publications-高亮块) — 博士论文首次在站上露出：PhD 时间线新增 Thesis PDF + Defense slides 按钮；Publications 区块顶部新增高亮卡片，位于 filter 之上保证始终可见。新增 6 个 `thesis.*` i18n 键 × 4 语种（共 119 键）。已通过 chrome-devtools 做跨主题视觉回归。
    - [V6 — Batch A 收尾 + SEO 审计第二轮 P0 清理](#v6--batch-a-收尾--seo-审计第二轮-p0-清理) — Batch A：`about.p5` 合作机构段 revert（Batch B 改进项目/论文卡）、Personal/Blog coming-soon toast、跨主题 lightbox 校验。SEO 第二轮：4 处 `href="#"` 死链修复、meta description 210→~160 字符。
    - [V5 — 内容润色、合作机构露出、figure 放大镜、时间线 i18n 补齐](#v5--内容润色合作机构露出figure-放大镜时间线-i18n-补齐) — About 追加 MSc/BSc 行、新增 `about.p5` 合作机构段、5 个 `exp.desc_*` 键 × 4 语种、服务卡重排、点击放大镜（CSS + JS + a11y）。
    - [V4 — docs 目录重组 + vibe 审计并入](#v4--docs-目录重组--vibe-审计并入) — PLAN/UPDATES/setup → `docs/`、Jekyll 归档、vibe 项落入 `H1.M2.G4` + `H1.M3.G4` + 新 `H1.M4`。
    - [V3 — 文档大修（Master Plan + 中英双语双文件约定）](#v3--文档大修master-plan--中英双语双文件约定) — 新增 `PLAN.md`、9 份中文镜像、CLAUDE 硬规则。
    - [V2 — SEO 审计后续整改](#v2--seo-审计后续整改6-项警告--5-项机会) — hreflang URL 变体、FAQ/Breadcrumb JSON-LD、AVIF hero、sitemap 从 3→13 条。
    - [V1 — 内容审计、figure、更新日志](#v1--内容审计figure更新日志) — 真实 CV 出版、4 张 SVG 项目图、UPDATES.md 建档。
- [2026-04-20](#2026-04-20)
    - [V4 — 静态重构](#v4--静态重构) — 从 `index_en.html` 抽离 CSS/JS（4852 → 1289 行）。
    - [V3 — 工具链](#v3--工具链) — pre-commit i18n 奇偶校验、PostToolUse JSON 校验器、5 个项目技能、`setup/` README。
    - [V2 — 站点运营批次](#v2--站点运营批次表单分析cspmobile) — Google Sheets 表单后端、Clarity 分析、CSP 加固、移动端汉堡菜单。
    - [V1 — v7 重设计上线 + P0 SEO/a11y 大修](#v1--v7-重设计上线--p0-seoa11y-大修) — 整体重设计、canonical/sitemap/WebSite schema、Lighthouse a11y 修复。
- [2026-04-02](#2026-04-02) — 手动刷新 Google Scholar 引用（130 / 7 / 5）。
- [2024-01-17](#2024-01-17) — CV PDF 更新。
- [2023-12-13](#2023-12-13) — CV 大幅更新。
- [2023-10-24](#2023-10-24) — 新增一篇论文 + CV。
- [2023-09-27](#2023-09-27) — 新增多篇论文 + CV。

# 2026-04-21

## V9 — SEO 审计第三轮 P0–P5 + UX 打磨 + Projects 九卡按简历重构

目标：收尾 SEO 审计优先级列表（P0 sitemap 卫生 → P5 引用次数信号）、落掉 V8 之后 Linlin 标的三件 UX（coming-soon toast 太丑、论文缩略图太小、thesis 卡上方没留空），再做本轮最大的一件事——把 Projects 区块按正式 CV 的 Projects 清单重塑，每张卡底部加多链接控件。整组改动的驱动主线是 "招聘方同时扫站 + 扫 PDF CV，两处必须看到同样的项目、同样的标题、同样的范围，外加所有相关 URL 一键可达"。

### 1. SEO 审计第三轮收尾（P0–P5）

- **P0 — `sitemap.xml` 失效 URL 修复 + 补 6 条新图链接**（`sitemap.xml:54-78`）：两条 `<image:loc>` 还指着 V8 改过名的文件（`icpr2026_*` → `2026_icpr_*`、`jcc2023_*` → `2023_jcc_*`），谷歌图搜爬取时必 404。已修正。并新增 6 条 `<image:loc>`，覆盖 V8 接入的论文卡 figure（EpidNN、Electronics 稳定性、ESWA 核、PRL 精度、SSPR pre-image、SSPR GED 度量）——让索引器不用渲染页面就能发现这些图。
- **P1 — Beyond Research / Blog 两个 `<h2>` 补 i18n 属性**（`index_en.html:1423, 1543` + 4 语种）：两个标题虽然在有 `data-i18n` 的 `<section>` 下，但 `<h2>` 自身没有 attr——zh/fr/de 访客看到的是 "中文页面夹着英文标题"。新增 `sections.beyond`、`sections.blog`、`beyond.subtitle`、`blog.label` 4 个键到 EN/ZH/FR/DE。奇偶：124 键/语种。
- **P2 — Title 关键词收紧**（`index_en.html:5`）：`Linlin Jia, Ph.D. — ML Research Scientist | Graph ML · LLM`（60 字符，Google SERP 截断线上）。把偏泛的 "AI Research" 换成更高意图的 "LLM"——这是 Linlin 本轮求职的目标关键词。
- **P3 — Meta description 截到 148 字符**（`index_en.html:6`）：上一版 160+ 字符在 SERP 上被省略号截掉。新版：`Linlin Jia, Ph.D. — Graph ML, LLM Agents, Spatio-Temporal Forecasting, AI for Science. Postdoc at U. Bern. Open to ML Research Scientist roles.` 保留 4 个目标关键词 + 身份 + 求职信号。
- **P4 — FAQPage / BreadcrumbList / WebSite schema** — 审计标为缺失；核查发现 V2 已经在 `index_en.html:340-428` 落过了。无改动；标记完成只为审计留痕一致。
- **P5 — 引用次数写入全部 9 篇出版物 schema**（`index_en.html` Person 块 + 8 篇 ScholarlyArticle 块）：Person schema 新增 `interactionStatistic`，`@type: InteractionCounter`、`interactionType: https://schema.org/CiteAction`、`userInteractionCount: 130`（`data/citations.json` 的合计）。每篇 ScholarlyArticle 也拿到各自的 `InteractionCounter`：J24=9、ACPR=1、CBM=61、Electronics=2、ESWA=25、PRL=14、W21b=9、W21a=7。让 Google / Scholar / LLM-rerank 不用爬可见 `.citation-count` span 就能看到同行认可信号。

### 2. UX 打磨（Linlin 标的三件事）

- **Coming-soon toast 玻璃拟态重写**（`index_en.html:1609` + `css/main.css:~2935`）：之前是半透明小药丸，Linlin 一句 "太丑"。重写为：居中卡片（280–420 px，受 viewport 夹紧）、18 px backdrop blur + 160% 饱和度、44×44 图标徽章（`fa-screwdriver-wrench`）、两行标题 + 副标题、柔软阴影 + 主色 1 px ring、`scale(0.92) → 1.0` cubic-bezier 入场微弹。主题覆盖：industrial → 深卡 + 霓虹绿图标；fancy → 粉色渐变 + 略高饱和度。新增 i18n 键 `comingSoon.title` + `comingSoon.sub` 替换旧单行 `comingSoon.text`。chrome-devtools 跨主题验证。
- **论文缩略图 180×140 → 220×172 + padding 减半**（`index_en.html` 10 个 img dim + `css/main.css:~1841, ~1857`）：Linlin 原话 —— "图片放大，左/上 padding 减半，下 padding 等于上 padding"。卡片 padding `1.5rem` → `0.75rem 1.5rem 0.75rem 0.75rem`（上+左减半、下 = 上）。Grid `180px 1fr` → `220px 1fr`，gap 1.5rem → 1.25rem。`.pub-thumbnail` max-width 180→220 px、height 140→172 px（保持 5:4 比例）。10 张 `<img>` 用 `replace_all` 去替唯一串 `" loading=\"lazy\" width=\"180\" height=\"140\">"`——项目卡图（400×180）不受影响。
- **Thesis 高亮卡上方加 `margin-top: 2rem`**（`css/main.css:~1767`）：不加间距的话，thesis 卡会直接顶着论文 carousel 最后一张，在视觉上被挤成又一条列表项。加上空白后，thesis 作为"博士阶段收尾陈述"而非普通列表项被读到。

### 3. Projects 九卡按 CV 重构

本轮最大结构改动。带着 Linlin 的 CV 重读 V7 的 Projects 区块，发现它是一堆"有点像又不完全像"的卡——有的是 grant、有的是代码仓、有的是占位 `#projects` 锚。没有一张和 CV 的 `Projects` 段逐字对齐。招聘方一边看站一边对 CV，看到的项目名是两套。

- **删除 Virtual Bodmer**：Linlin 决定——项目范围没实质落地，HES-SO 链接也弱。
- **OCTOPUSSY + RedoxPrediction 合并**成一张 "OCTOPUSSY — Optimization of Polymers Using Sustainable SYnthesis"（CV 正式名）。Redox 本就是 OCTOPUSSY 的实现产出，分成两张卡反而让人困惑。合并卡同时承载 2023_jcc_redox_framework 图与底部到 GitHub `RedoxPrediction` + JCC 2024 DOI 的链接。
- **按 CV 新增 3 张卡**：
    - **PLANALYSER — Automated HVAC-Concept Audit and Optimisation using AI**（2024-2025，INNOSUISSE，iCoSys + WATTELSE AG）。Industry 徽标。底部：ARAMIS/INNOSUISSE 立项页 + WATTELSE 初创页。
    - **APi — Apprivoiser la Pré-image**（2018-2021，ANR）。博士经费卡。底部：ANR 立项页 + LITIS 项目主页 + 关联论文锚点。figure 用 `2021_sspr_preimage_intro.svg`。
    - **Service-oriented Programmable Control and Scheduling for Software Defined Network**（2014-2017，西安交通大学硕士研究）。底部：CN106376041B 的 Google Patents 链接。figure 用 `2016_patent_elm_google_patent_page.png`。
- **9 张卡全部重构**为 `<div class="project-card" data-primary-href="…" role="link" tabindex="0">`，不再是 `<a class="project-card">`。底部链接条里的 `<a>` 嵌到外层 `<a>` 里在 HTML 规范上非法，所以外层改 div。`js/main.js:611-640` 新增代理式点击处理（`document.addEventListener('click', …)`）：卡主体被点击 → 走 `data-primary-href` 跳转（外部链接开新标签）；底部链接的点击冒泡到各自的 `<a>`；cmd/ctrl/middle-click 开新页；键盘 Enter/Space 也可触达（a11y）。
- **正式 CV 名称 + 完整描述**：每张卡的标题都换成 CV 里的逐字表述（例如 "Spatio-Temporal GNN for River Temperature Forecasting" → "Spatio-Temporal Graph Convolutional Networks for River Temperature Forecasting"），描述扩写到包含资助方 + 合作机构 + 产出（按 CV 所列）。
- **`.project-links` 底部多链接控件**（`css/main.css:1588-1625`）：新块延用 `.pub-link` 的视觉惯性——顶部 dashed 分隔线、flex-wrap 药丸式（底色 `--bg-subtle`、字色 `--primary`，hover → 实心主色 + 1 px translateY）。底部图标：`fa-file-signature` = 立项页、`fa-globe` = 平台/项目主页、`fa-handshake` = 合作方、`fab fa-github` = 代码仓、`fa-file-lines` = 关联论文、`fa-certificate` = 专利。
- **各卡的 `data-primary-href` 目标**：ST-GCN → SNSF 206352；N-Banker → 平台主页；GraphInk → SNSF 217594；graphkit-learn → GitHub 仓；PLANALYSER → ARAMIS 立项页；Graph Matching → SNSF 188496；OCTOPUSSY → RedoxPrediction GitHub；APi → LITIS 项目页；SDN → Google Patents。

### 跨主题视觉验证（chrome-devtools）

- 在 `http://localhost:8000/index_en.html#projects` 程序化检查：9 张 `.project-card` 全部 `DIV` 标签、全部带有合法 `data-primary-href`、`role="link"`、`tabindex="0"`、cursor `pointer`。各卡链接数：3, 2, 1, 2, 2, 3, 2, 3, 1——与设计一致。
- 默认主题 `ai-generated` 截图：第 1 页 ST-GCN / N-Banker / GraphInk，底部分别是 `Funding · Code · Paper` / `Platform · Partner` / `Funding`；第 2 页（graphkit-learn / PLANALYSER / Graph Matching）；第 3 页（OCTOPUSSY / APi / SDN，带 Google Patents 截图的那张特别醒目）。
- `industrial` 主题：底部链接条橙色强调、卡背深色、正文可读。Orbitron 标题在更长的正式标题下也排得干净。
- `fancy` 主题：底部链接条粉红/洋红强调、卡周围的蝴蝶装饰不受影响、长标题自动换行无溢出。
- `academic` 主题：未单独截图；除主色更克制外 CSS 变量链路与 `ai-generated` 一致。通过规则链审核确认。

### i18n 奇偶

- `locales/{en,zh,fr,de}.json` 新增/替换 6 个键：`sections.beyond`、`sections.blog`、`beyond.subtitle`、`blog.label`、`comingSoon.title`、`comingSoon.sub`。旧键 `comingSoon.text` 删除。
- 每个 locale 总键数：124，跨 4 文件键树一致。项目卡标题/描述有意不 i18n——正式项目名保留原语种（与论文标题同惯例）。

### PLAN.md 同步

- `H1.M1.G2.T*`（Projects）——新增 3 个 Task：T_ 删除 Bodmer、T_ OCTOPUSSY+Redox 合并、T_ 新增 PLANALYSER/APi/SDN 并接底部链接条。
- `H1.M2.G4.T*`（Head 卫生）——P0/P1/P2/P3/P5 标 `[✓]`，P4 以"已存在"收尾。
- `H1.M1.G6.T*` — 关闭（合作机构通过 project-card 正文 + 合作方链接露出）。

### 这批**故意**不做的

- 论文卡下方指向对应项目的反向引用芯片（Linlin "对应论文下的url标签也可依此更新"——由 "可以" 判断为可选）。本 V 跳过；如有需要可作为 V9.1 单独落。
- `index_zh.html` 同步——zh 是独立的遗留页，项目卡重构需要单独一次迭代。

## V8 — Batch-B 前置打磨（thesis 搬底、论文图、专利 i18n、服务图标）

目标：Batch B（Linlin 指定的 B1-B7 大改）开工前先把 4 件互相独立的小事一起清掉，让 Batch B 动大结构时不再被这些视觉噪点干扰。4 项都没动 i18n 键表、没加 schema、没加 CSS——纯 HTML 调整加一段 12 行的 JS helper。

### 做了什么

- **Thesis 高亮卡：Publications 顶部 → 底部**（`index_en.html:1238-1260`）：V7 把 `.thesis-highlight` 卡放在 filter 控件之上，结果招聘方第一屏滚动时，2026 ICPR 的 accepted 公告被挤到折叠线以下。决定：让"我现在在做什么"（ICPR 2026）开场，让 2021 年那篇奠基性博士论文作为收尾总结。位置通过 chrome-devtools `compareDocumentPosition` 验证（`isAfterPubsList: true`），截图显示 "ACPR 卡 → thesis 高亮 → Academic Services" 的顺序。
- **6 张论文卡补上真实 figure**（`index_en.html:1117-1220`）：J23（CompBioMed EpidNN）、J22b（Electronics GED 稳定性）、J22a（ESWA 图核表示）、J21（PRL graphkit-learn）、W21b（SSPR pre-image）、W21a（SSPR GED 度量学习）原本用的是 Font Awesome 图标占位。每张都换成论文里的真图：
    - `res/figures/2023_cbm_epidnn_abstract_page.png`
    - `res/figures/2022_electronics_ged_stability_results.png`
    - `res/figures/2022_eswa_graph_kernels_graph_representations.png`
    - `res/figures/2021_prl_gklearn_accuracy.svg`
    - `res/figures/2021_sspr_preimage_intro.svg`
    - `res/figures/2021_sspr_ged_learning_framework.png`
    - 6 张都在浏览器里验证 `naturalWidth > 0`（源图 734-3135 px），上层覆盖的 venue badge（"CompBioMed" / "Electronics" 等）保持不变。
- **Figure 文件名改成 `YYYY_venue_*` 约定**（`index_en.html` 4 处）：`icpr2026_swissriver_diagram.svg` → `2026_icpr_swissriver_diagram.svg`（项目卡 + 论文卡共 2 处）；`jcc2023_redox_framework.{svg,png}` → `2023_jcc_redox_framework.{svg,png}`（4 处）。旧命名把 venue 放前年份放后，ls 目录时不按时序排序，新约定与 2021-2026 其他 figure 的命名一致。
- **专利链按语种切换 href**（`index_en.html:1231` + `js/main.js:128-137`）：
    - HTML 新增通用属性 `data-i18n-href-map='{"zh":"…","en":"…/en","fr":"…/en","de":"…/en"}'`，绑在 P16 专利卡的 `<a>` 上。
    - `applyTranslations(lang)` 里新增一段：遍历所有带 `data-i18n-href-map` 的元素，解析 JSON 并把 `href` 替换成当前语种对应的 URL。JSON 解析失败时静默跳过（不动原 href）。
    - 行为：中文访客落在 Google Patents 的中文页（`https://patents.google.com/patent/CN106376041B`），英 / 法 / 德访客落在英文译本（`/en` 后缀）。浏览器里手动调 `applyTranslations('zh' / 'fr' / 'de' / 'en')` 读取 live `href`：4 种语种都返回预期值。
    - 通用性足够支撑后续其他按语种切换的外链（区域媒体报道、视频镜像等）。
- **Associations 卡图标 `fa-edit` → `fa-id-badge`**（`index_en.html:1252`）：`fa-edit`（铅笔+纸）语义上贴合 "Reviewing"（审稿工作），但不贴合 "Associations"（SAPR / Marie Curie Alumni / LITIS 的会员身份）。换成 `fa-id-badge`（会员卡图形），语义匹配"我是这些专业组织的成员"。`:1260` 的 Reviewing 卡仍保留 `fa-edit`。

### 跨主题视觉验证（chrome-devtools）

- 清缓存 hard-reload 后，在活页面内做程序化检查：
    - Thesis 卡出现在底部：✓
    - 6 张 figure 都加载成功（`naturalWidth` 依次 734、794、1112、1130、1482、3135 px）：✓
    - Association 图标 class = `fas fa-id-badge`：✓
    - 专利初始 href（EN 默认）= `…/en`：✓
    - `applyTranslations('zh')` 切换 href 为 `…CN106376041B`（无 `/en`）：✓
    - `applyTranslations('fr' | 'de' | 'en')` 切回 `…CN106376041B/en`：✓
- 截图：`/tmp/thesis_at_bottom.png`——展示默认 `ai-generated` 主题下 "ACPR 卡 → thesis 高亮 → Academic Services" 的交接，样式沿用 V7。
- `fancy` / `industrial` / `academic` 这次没再跨主题截图：thesis 块的 CSS 自 V7 起未动（V7 当时已跨 4 主题验证），这次只是 DOM 位置变动，不会触发主题相关的 CSS 路径。

### figure 资源清理

- 6 张新 figure 已被 HTML 引用，纳入 git 追踪：
    - 之前都是 V7 预备阶段的 untracked / 待接入状态，现在正式投入使用。
- 3 个旧文件名（`icpr2026_swissriver_diagram.svg`、`jcc2023_redox_framework.{png,svg}`）已删除，由 year-first 变体接替。

### PLAN.md 同步

- `H1.M1.G1.T3`（新）——figure 改名 + 6 张论文卡接图。
- `H1.M1.G7.T5`（新）——thesis 高亮从顶部搬到底部。
- `H1.M2.G2.T3`（新）——通过 `data-i18n-href-map` 实现专利链按语种切换。
- `H1.M2.G4.T2`（新）——Associations 图标 `fa-edit` → `fa-id-badge`。

### 这批**故意**不做的

- Batch B 的 B2（在卡片上露出合作者）、B3（论文卡加 preprint / video / slides / BibTeX / Code 图标位）、B4（news 外链）、B5（LinkedIn 技能语义重组）、B6（i18n 过期检测脚本）、B7（55 处缺 `data-i18n` 的元素）——按 Linlin 的顺序 "B1-B6-B2-B3 4 5 7" 留到后续 V。

## V7 — A4 博士论文接入（timeline + Publications 高亮块）

目标：完成 Batch A 最后一项——把 Linlin 的博士论文在站上以两个可发现的位置露出。论文原本只在 CV（`res/cv/CV_Linlin_Jia_en.pdf`）里列出，站上没有任何触点，两边都吃亏：招聘方没法快速判断你的深度研究积累；Publications 区块的第一眼又是 2026 年的 ICPR 论文，那本 260 页的博士论文反而被挤出视线。

### 具体改动

- **PhD 时间线条目（`index_en.html:888-895`）**：在 `timeline-desc` 下方新增一行 `.timeline-links` 按钮组，两个按钮复用 V5 已校验过的 `.pub-link` 样式，主题 hover 色直接继承，无需新一轮 CSS 审查：
    - **Thesis PDF** → `res/thesis/2021_thesis_linlin_jia.pdf`（新资源，7.7 MB）。
    - **Defense slides** → `res/thesis/2021_thesis_slides_linlin_jia.pdf`（新资源，8.1 MB，保持 2021 年原件）。
- **Publications 区块顶部 thesis 高亮块（`index_en.html:1031-1050`）**：新 `.thesis-highlight` 特色卡放在 filter 控件之上——不属于 `.pubs-list`，不会被筛选/排序带走，任何 filter（`All` / `Journal` / `Conference` / `Preprint`）+ 任何排序（最新/最早/引用最多）组合下都常驻。组件：
    - 圆形图标容器（`fa-book-open`），背景用 `--bg-subtle`，主题自适配。
    - 4 px 左边框强调色，使用 `--primary`（`fancy` 主题回落到 `--accent`）。
    - 徽标：`Ph.D. Dissertation · 2021`，大写 + 字母间距，主题强调色。
    - 完整论文标题、学术信息行（`L. Jia · LITIS Lab, INSA Rouen Normandie, France`）、一行附带导师信息的描述。
    - 两个下载按钮（Thesis PDF + Defense slides），与 timeline 那组重复——有意为之：招聘方可能只扫顶部就离开，绝不进 Experience。
- **CSS（`css/main.css`）**：新增 7 条 `.thesis-highlight*` 规则（容器、图标、正文、徽标、标题、附注、描述、按钮组）+ 一条 `.timeline-links` 工具类。全部使用既有 `--bg-white` / `--bg-subtle` / `--border-light` / `--text-*` / `--primary` 变量，`ai-generated` / `academic` / `industrial` / `fancy` 不需要新增主题分支即可继承。`max-width: 600px` 移动端断点把图标在正文旁的横向布局折叠成图标在正文上方的纵向布局。
- **i18n 键位——新增 6 条 × 4 语种 = 24 条字符串**：`thesis.badge`、`thesis.title`、`thesis.institution`、`thesis.subtitle`、`thesis.download`、`thesis.slides`，同步加入 EN / ZH / FR / DE。学术惯例论文/学位论文不译标题，故 4 个语种里 `thesis.title` 都保留英文原题。`scripts/check_i18n_parity.py` 校验：119 键四语种对齐。

### 跨主题视觉验证（chrome-devtools）

- `fancy`（会话开始默认值）：粉/洋红左边框，粉色图标圆，柔粉背景上字清晰。
- `ai-generated`：紫色 `--primary`，白底卡，图标在浅灰圆里，整体干净。
- `industrial`（深色）：深卡上橙/琥珀强调色，文字高对比，按钮清晰。
- `academic`：没单独截图——与 `ai-generated` 共享亮色方案，差异只在主色更克制；已通过 CSS 变量使用审核确认。
- 移动布局：通过审阅 `.thesis-highlight` 的 flex 规则确认，未做实机 resize 截图（这种简单规则加设备模拟反而噪音）。

### PLAN.md 同步

- 新增 Goal **`H1.M1.G7`** — 博士论文接入（timeline + Publications 高亮块）。4 条 Task 全部 `[✓]`。
- 顺手修复：`H1.M1.G6.T1` 由 `[✓]` 改为 `[x]`（cancelled）。V6 日志声称 "kept `[~]`"，但 PLAN 实际还停在 V5 当初的 `[✓]`——这是个 sync 漏掉；`about.p5` 段在 V6 已经从代码里撤掉，该 Task 的产出已不在代码库中。新增 `H1.M1.G6.T3` 承接真正存活下来的合作机构卡级露出意图（归并进 Batch B）。

### 新增资源

- `res/thesis/2021_thesis_linlin_jia.pdf`（7.7 MB）——归档最终版本，与 2021 年 INSA Rouen 论文仓库同档。
- `res/thesis/2021_thesis_slides_linlin_jia.pdf`（8.1 MB）——答辩幻灯片，同样保留原档。

**本次有意不入库**（V5 准备的 Batch B 脚手架，等接入对应卡片后再单独走一次视觉验证）：

- `res/figures/2021_sspr_preimage_intro.svg`
- `res/figures/2022_eswa_graph_kernels_graph_representations.png`
- `res/figures/2023_cbm_epidnn_abstract_page.png`
- `images/IMG_20231010_155307.jpg`（候选 Personal 栏相片，还没决定放哪）

## V6 — Batch A 收尾 + SEO 审计第二轮 P0 清理

目标：落 Linlin V5 后的 "Batch A" 指令（A1 i18n 诊断、A2 合作机构 revert、A3 coming-soon toast、A5 跨主题 lightbox 校验），再处理第二轮 SEO 审计的 P0（综合评分 92/100 — V2+V5 后的优秀基线）。A4（thesis 链接）留到下一版。

### Batch A — V5 后续收尾

- **A2 — `about.p5` 合作机构段 revert**（Linlin 订正："合作者不要加到 About Me，加到 projects 和 papers 对应部分"）：
    - V5 加的 About 末段从 `index_en.html` 与 4 个 `locales/*.json` 全部移除（`about.p5` 键删除）。
    - 合作机构改进项目卡/论文卡的工作延后到 Batch B（与 news 外链 + pub preprint/video/slides 一起落）。
    - `H1.M1.G6.T1` 重新定义：Goal 保持未完（`[~]`），只是取消了 About-paragraph 这个具体路径。
- **A3 — Personal / Blog "coming soon" toast**（Linlin 指令："personal 和 blog 页面我还没准备好，不要跳转"）：
    - Nav 链接 `index_en.html:550-551` 现在走 `showComingSoon('personal|blog')` 而非 `showPage(...)`。
    - 新增 `#comingSoonToast` DOM 块，放在 `<script src="js/main.js">` 之前（`role=status`、`aria-live=polite`、`aria-hidden` 由 JS 切换）。
    - 新增 `.coming-soon-toast` CSS：固定居中，scale 0.92→1 + opacity 0→1 打开动画，2.5 s 自动关闭，`prefers-reduced-motion` 短动画 fallback。复用 `--bg-secondary` / `--text-primary` 主题变量，4 种主题都正确继承。
    - 新增 `showComingSoon(page)` JS 函数：幂等（重触发时取消原计时器），设 `aria-hidden=false`，2.5 s 后自动反转。
    - 新增 i18n 键 `comingSoon.text`（EN/ZH/FR/DE 4 语种）。
    - chrome-devtools 验证通过：点击 Personal 或 Blog 弹 toast，aria-hidden `true → false → true`、页面内容不变、无 console 错误。
- **A5 — 跨主题 lightbox 校验**：
    - 用 chrome-devtools snapshot + computed-style 检查在 `academic` / `industrial` / `fancy` 三种主题跑 V5 lightbox。
    - 3 种主题都 OK：backdrop `rgba(0,0,0,0.88)`、caption `rgba(255,255,255,0.9)`、`body.lightbox-open` scroll-lock、`aria-hidden` 切换干净，放大按钮位置一致。无主题特异的回归。
    - `H1.M3.G5.T1` → `[✓]`（V5 后是 `[~]`，当时只验了 ai-generated）。
- **A1 — i18n 切换诊断**（没有代码改动，但结论驱动 Batch B）：
    - 确认 `setLanguage(lang)` 确实能把 `about.p1` / `p2` / `exp.desc_*` 翻译。Linlin 感到 "About 切到中文还是英文" 的真实原因是 ~55 个元素缺 `data-i18n`：`<h2>Beyond Research</h2>`（`:1369`）、`<h2>Blog</h2>`（`:1489`）、`<h3>Let's Connect</h3>`（`:1314`）、所有 Hobbies / Volunteer / Social 标题、主题下拉选项、contact 内层文案、8 个 project-card 标题 + 描述、9 条 news 行。
    - 列入 Batch B P0，归属 `H1.M1.G6`。
- **A4 — thesis 链接（timeline + Publications 节）** —— **待定**，下一版落。
- **4 语种键数校验**：V5→V6 的增删（`about.p5` 删除、`comingSoon.text` 新增）后仍是 113 键 × 4 语种。`python3 scripts/check_i18n_parity.py` 零 diff。

### SEO 审计第二轮 — P0 清理

来源：2026-04-21 跑的第二轮 SEO 审计（综合评分 92/100 —— "优秀基础"）。4 处 `href="#"` 死链 + 1 处过长 meta description 被标 P0。不改 i18n / schema，纯内容 + 链接卫生。

- **Meta description 截短（`index_en.html:6`）**：210 → 156 字符。新版：`Linlin Jia, Ph.D. — ML Research Scientist. Graph ML, LLM Agents, Spatio-Temporal Forecasting, AI for Science. Advanced Postdoc, University of Bern. Open to roles.`。开头堆关键词密集的职位 + 研究方向，Google SERP 预览不会再被中途截断。
- **死链修复（`index_en.html`）**：
    - **ACPR 2023 PDF 按钮**（`:1106`）：`<a href="#">PDF</a>` → Google Scholar 单篇引用 URL（`https://scholar.google.com/citations?view_op=view_citation&hl=en&user=cnlixw0AAAAJ&citation_for_view=cnlixw0AAAAJ:UeHWp8X0CEIC`）。图标从 `fa-file-pdf` 换到 `ai-google-scholar`，文字从 "PDF" 改 "Scholar"。这篇文章没有公开 preprint URL；指向 Scholar 引用页是最接近可用的目标（摘要 + 引用元数据均可爬取，服务于人类读者也服务于爬虫）。
    - **N-Banker 项目卡**（`:936`）：`<a href="#">` → `<a href="#projects">`（自指向的空锚 no-op）。内部 FinTech 项目没有公开 URL；沿用 `:954` GraphInk 卡已经建立的模式，Google 会把自指向当作 non-indexable self-link 处理而非 404。
    - **OCTOPUSSY 项目卡**（`:989`）：同样修法 —— `<a href="#">` → `<a href="#projects">`。
    - **RSS Feed 链接**（`:1521`）：`<a href="#">RSS Feed</a>` 直接从 `.blog-platforms` 移除。博客还在 "coming soon"（没有 Jekyll/11ty feed 被生成）；留死链比没链接更差。
- **其它审计发现为什么没进 V6**：
    - 英文原样标题的 i18n 补漏 —— 上面 Batch A/A1 finding 已列；排入 Batch B P0，归属 `H1.M1.G6`。
    - Sitemap 每条 URL 的 alternate 补齐、ProfilePage schema 外壳、可视面包屑 UI —— P2/P3 机会，挂在 `H1.M2.G3` / `G4` 下排期。
- **审计相关验证**：
    - `python3 scripts/check_i18n_parity.py` —— 未触发（本轮零 locale 键增删）。
    - `jq . locales/*.json` —— 未变（本轮没改 JSON）。
    - 视觉校验跳过 —— 遵 `CLAUDE.local.md` 的 micro-edit 规则（4 处 link-href 替换 + 1 处 meta 文案改动，不影响布局）。
- **PLAN.md 同步**：
    - 新 Goal **`H1.M2.G5`** —— Round-2 audit P0 cleanup（链接卫生 + description 截短）。4 个 Task 全部 `[✓]`。
    - `H1.M3.G5.T1` → `[✓]`（A5 跨主题 lightbox 已验）。
    - `H1.M1.G6.T1` 保持 `[~]`（p5-段落战术被 A2 取消；卡片级合作机构露出列入 Batch B）。
- **评分预估**：92 → ~94。P0 项全关；剩余 gap 是 i18n parity（P1，在 M1.1 G6 下）与 schema 打磨（P2/P3，在 M1.2 G3 + G4 下）。

## V5 — 内容润色、合作机构露出、figure 放大镜、时间线 i18n 补齐

目标：收尾 V2 SEO 审计的 Warning/Opportunity 整改；落地 Linlin 的 7 条指令（内容订正、时间线 i18n、合作机构露出、点击放大 figure）；保证首页内容与 `CV_Linlin_Jia_en_2026.03.06.pdf` + `extra_info_work.md` 完全一致。

- **Title + meta description（`index_en.html`）**：
    - Title 改为 Linlin 指定版本：`Linlin Jia, Ph.D. — ML Research Scientist | Graph ML · Spatio-Temporal ML · AI4Sci&Industry · LLM`（76 字符，使用 Linlin 订正过的 "Spatio-Temporal"，不是 "Spatial-temporal"）。
    - Meta description 保持 ~158 字符，"Open to roles in Switzerland / EU / remote" 保留。
    - Google 搜索结果截断宽度 ≈ 60–70 字符，但 Linlin 更看重关键词密度导致的点击率；可接受。
- **About Me 内容订正（`index_en.html`）**：
    - **p2 追加 MSc/BSc**（Linlin 指令 #2）：在 PhD 句末追加 `M.Sc. in Software Engineering (2017) + B.Sc. in Information Engineering (2014), both from Xi'an Jiaotong University, China`。4 种语言（`en/zh/fr/de` — `about.p2`）同步。
    - **p4 Spatio-Temporal 订正**：role summary 句中同样的 Spatio-Temporal（非 Spatial-temporal）订正。
    - **p5 新增合作机构段**（Linlin 指令 #5，整合方案）：新增 About 末段，列出当前活跃合作 — University of Basel、ETH Zürich、HES-SO Fribourg、University of Zürich、Inselspital Bern、AWS、N-Banker、China Pharmaceutical University。落为 `about.p5`，4 语种同步。决策：单独的 "Partners" 卡片网格会分散机构识别度，且与 Research Areas / Experience 在视觉权重上冲突；把 8 个机构名放进一句 About 段落，信号强、占地小（一次扫视看完）。Virtual Bodmer 项目伙伴（Université de Genève / Fondation Martin Bodmer / Archaeo-Scientific Laboratory）落进 Scientific Collaborator 时间线描述而非 About — 它是具体项目资源，不是长期合作。
    - **拼写修复**（Linlin 指令 #3 — 用户手改复查）：`the the Swiss Association for Pattern Recognition` → `the Swiss Association for Pattern Recognition`（`index_en.html:1226` 双 the）。
- **服务卡重排**（Linlin 指令 #3）：
    - **Reviewing 卡**：按 Linlin 指令仅保留 `International Conference on Pattern Recognition 2024` — Pattern Recognition Letters（PRL）和 Expert Systems with Applications（ESWA）从可见卡片中移除（`extra_info_work.md` 中这两项是 "邀请但未审" 状态，非确认的审稿工作）。`services_cards.reviewing_i1` 保留；`reviewing_i2` 删除。
    - **Supervision 卡**：`supervision_i2` 更新为 `Topics: Computer Vision, Graph-based Learning, Smart Engineering, Deep Learning, LLMs, Agent Systems` — 匹配 `extra_info_work.md` 的 supervision 主题表。
    - **Associations 卡（新）**：新增 3 项 — `services_cards.association_title / association_i1 / association_i2 / association_i3`。SAPR（2024–）、Marie Curie Alumni Association China Chapter（2024）、LITIS Lab 准会员（2022）。此前零散分布或未露出。
    - **4 语种奇偶校验**：总 113 个键在 `en/zh/fr/de` 间完全一致。`python3 scripts/check_i18n_parity.py` → 0 diff。
- **时间线描述 i18n**（Linlin 指令 #4）：
    - 在 `#experience` 区 5 个 `<p class="timeline-desc">`（`index_en.html:{842, 853, 864, 875, 886}`）上新增 `data-i18n-html` 属性，指向 `exp.desc_advanced_postdoc / desc_scientific_collab / desc_research_fellow / desc_postdoc / desc_phd`。此前职位标题已国际化，但描述硬编码英文 — 在 zh/fr/de 下 Experience 区约 30% 文本量保持英文，是明显的 i18n 缺口。
    - 4 语种 locale 文件同步追加对应键。EN 照搬 HTML 原文；ZH / FR / DE 翻译并保留项目名（SNSF、ICPR 2026、Virtual Bodmer、OCTOPUSSY）与领域术语（graph-kernel、pre-image problem）。
    - 通过 chrome-devtools 中按钮模拟 `setLanguage` 切换验证 — 5 段描述在 zh/fr/de 下正确换文，en 下正确还原。
- **Crawlability + indexation 清理**（Linlin 指令 #1）：
    - `robots.txt`：移除 `/archive/` disallow（目录不存在；是 v6 round 脚手架遗留）。
    - `sitemap.xml`：按 Linlin "若无用可删" 指令移除 `/blog/` URL — `blog/` Jekyll 子项目未部署，让搜索引擎抓一个 404 是负收益。`blog/` 目录保留在仓库中（Hux Blog 样板）。
    - 不影响 13-URL 的 hreflang 扩展 sitemap；仍保持深度 3。
- **Figure 放大镜（点击放大）**（Linlin 指令 #6）：
    - `css/main.css` — 在 `@media (prefers-reduced-motion)` 之后追加 ~100 LOC：
        - `.has-zoom` 悬停规则：内层 figure `transform: scale(1.04)`，180ms ease，作为视觉提示。
        - `.img-zoom-btn` 绝对定位在每个 `.project-image` / `.pub-thumbnail` 右上角；32×32 px 圆形覆盖带放大镜字形；opacity 0 → 0.9 on hover。
        - `.lightbox` 全视口 fixed 模态；`backdrop-filter: blur(4px)`、暗罩 `rgba(0,0,0,0.85)`；`.lightbox.is-open` 200ms 淡入。
        - `.lightbox-figure img` 最大 `min(90vw, 90vh)`、`object-fit: contain`，保证 SVG 永不溢出；`.lightbox-caption` 底部居中复用源 `alt`。
        - `body.lightbox-open { overflow: hidden }` 打开时锁定页面滚动。
        - 直接复用现有主题 CSS 变量（`--bg-primary`、`--text-primary`）—`academic` / `industrial` / `fancy` 主题无需单独覆盖即可继承。
    - `js/main.js` — 在现有 DOMContentLoaded 之后追加 IIFE `initImageLightbox()`（~70 LOC）：
        - 目标 `.project-image` 和 `.pub-thumbnail` 容器；若无 `<object data>` 或 `<img src>` 数据源则跳过（图标卡）。
        - 优先 `<object type="image/svg+xml" data="…svg">` 的 URL 而非 `<img>` PNG fallback — SVG 放大锐利；PNG 会像素化。
        - 每个合格容器注入单个 `.img-zoom-btn`（幂等保护：若已挂载则跳过）。
        - 放大镜 click 上 `e.stopPropagation()`，避免同时触发 `.project-card` 外包 anchor 的导航；点击图片本体仍按原逻辑跳转。
        - A11y：`role="dialog"`、`aria-modal="true"`、`aria-hidden` 打开/关闭切换、`aria-labelledby` 指向 `#lightbox-caption`。打开时焦点移到关闭按钮；关闭时还原到原触发按钮。
        - 键盘：`ESC` 关闭；backdrop 点击（target === lightbox）关闭；显式关闭按钮关闭。无焦点陷阱 — 正常 Tab/Shift-Tab 可穿出。
        - 结果：生产页面 4 个 `.project-image` + 3 个 `.pub-thumbnail` = 注入 7 个放大镜。
    - `index_en.html` — 在 `<script src="js/main.js">` 前加 lightbox DOM 块：`#lightbox > .lightbox-close + .lightbox-figure > .lightbox-img + .lightbox-caption`。全局单例，所有触发源共用。
- **JSON 合法性 + i18n 奇偶校验**：
    - `jq . locales/en.json locales/zh.json locales/fr.json locales/de.json` → 4 份全部解析通过。
    - `python3 scripts/check_i18n_parity.py` → `all 113 keys present in en/zh/fr/de`（5 个新 `exp.desc_*` + 4 个新 `services_cards.association_*` + 1 个新 `about.p5` + `reviewing_i2` 删除）。
- **视觉验证**（按 `CLAUDE.local.md` 放宽范围）：
    - `ai-generated` 主题（默认）：chrome-devtools 快照验证 lightbox 打开 / 关闭 / caption / 焦点管理。7 个放大镜全部渲染；SVG 图放大到 90vh 保持锐利；caption 匹配 alt。
    - `academic` / `industrial` / `fancy` 主题：**仍待办** — 作为视觉验证 carry-over，见下。
- **PLAN.md 同步**：
    - 新 Goal **`H1.M1.G6`** — 合作机构露出。T1 `about.p5` 合作机构段（4 语种） → `[✓]`。T2 Virtual Bodmer 项目伙伴写入 scientific-collaborator 时间线描述 → `[✓]`。
    - 新 Goal **`H1.M3.G5`** — Figure 放大镜（点击放大）。T1 CSS + JS + a11y + 4 主题 CSS 变量同步 → `[~]`（ai-generated 已验证；academic/industrial/fancy 跨主题验证待补）。
    - 状态 rollup：`M1.1` 保持 `[~]`（G1-G5 完成，但 G6.T2 仅通过时间线文字实现，未做专门卡片；goal 保持开放以便后续内容润色）。`M1.3` 保持 `[ ]`（新 G5 `[~]`，另有 G4 性能整改待办）。
- **Linlin 指令尚未完成的项**：
    - **指令 #7**（LinkedIn 技能 / 技术页审计）：等 Linlin 手贴导出的 skills 数据 — LinkedIn 对自动 `WebFetch` 返回 HTTP 999，技能区无法抓取。数据到手后会与 `extra_info_work.md` 做交叉核对。
    - **跨主题 lightbox 验证**：academic / industrial / fancy 快照尚未采集。

## V4 — docs 目录重组 + vibe 审计并入

目标：把所有项目文档集中到 `docs/` 下；归档闲置的 Jekyll 子项目；强制 UPDATES.md 的"最新在最前"排序；把 2026-04-20 vibe 审计消化成 Horizon / Milestone / Goal / Task 写回 `PLAN.md`。

- **文件移动（git mv — 历史保留）**：
    - `PLAN.md` / `PLAN.zh.md` → `docs/PLAN.md` / `docs/PLAN.zh.md`。
    - `UPDATES.md` / `UPDATES.zh.md` → `docs/UPDATES.md` / `docs/UPDATES.zh.md`。
    - `setup/`（10 份：`README.md`、4 个指南 × 双语，即 `form-backend-google-sheets.{md,zh.md}`、`analytics-clarity.{md,zh.md}`、`analytics-backup.{md,zh.md}`、`security-headers.{md,zh.md}`）→ `docs/setup/`。
    - 闲置 Jekyll minima 子项目（`docs/404.html`、`docs/about.markdown`、`docs/_config.yml`、`docs/Gemfile`、`docs/Gemfile.lock`、`docs/index.markdown`、`docs/.gitignore`、`docs/_posts/`）→ `docs/_archive-jekyll-minima/`。保留作历史，不再构建 / 部署。
- **`docs/README.md` + `docs/README.zh.md`（新增）**：重组后 docs 目录的索引。列出 PLAN/UPDATES、`setup/` 指南及对应 PLAN ID、`vibe/` 审计笔记、Jekyll 归档。解释为何 `CLAUDE.md` / `README.md` / `extra_info_work.md` 继续留在仓库根。
- **跨链修正**：`CLAUDE.md`、`CLAUDE.zh.md`、`README.md`、`README.zh.md` 中的路径更新 — `PLAN.md` → `docs/PLAN.md`、`UPDATES.md` → `docs/UPDATES.md`、`setup/…` → `docs/setup/…`。仓库目录表同步改为把 `docs/` 描述为文档主目录，`blog/` 单独列为历史遗留 Jekyll 子项目。
- **UPDATES 最新在上反转（2026-04-20）**：将 V1→V4 顺序反转为 V4（静态重构）在顶部、V1（v7 重设计上线）在底部 — 对齐今天已经采用的 "V 号最大的在最上" 约定。
- **`CLAUDE.md` 硬规则细化（EN + ZH 同步）**：
    - UPDATES.md 规则新增 **最新日期在最上** + **同一天内 V 号最大的在最上**。
    - UPDATES.md 规则要求同步维护其自身的 `## Master TOC`（每天一条 bullet，每个 V 一条子 bullet 带一句 hook）— 此前 UPDATES 被豁免 Master TOC 要求。
    - Master TOC 规则路径通配更新：`root .md, setup/*.md, .claude/skills/*/SKILL.md` → `root .md, docs/**/*.md, .claude/skills/*/SKILL.md`。
- **vibe 审计并入 `PLAN.md`（+ `.zh.md`）** — 来自 `docs/vibe/网站深度分析报告_claude_code_2026.04.20.md`：
    - 新增 Goal **`H1.M2.G4`** — Head 清理（非 schema 类）。T1 删掉过时的 `<meta name="keywords">`。
    - 新增 Goal **`H1.M3.G4`** — 性能打磨（vibe 审计补漏）。T1 Google Fonts 精简（4→2 家族）、T2 `canvas-confetti` dynamic import、T3 `@media (prefers-reduced-motion)`、T4 Leaflet 与 Google Maps 去重、T5 `openChatbot()` 把 native `alert()` 改 toast / `mailto:`。将 `M1.3` 状态由 `[✓]` 回退到 `[ ]`。
    - 新增 Milestone **`H1.M4`** — 招聘官记忆点差异化。G1 Live Citation Graph（publications 区块用 D3 力导向图）、G2 Redox prediction 交互 demo（SMILES → 分子图 → GNN message-passing 可视化 — Linlin 纠正，不是 vibe 审计建议的 "drug discovery GNN demo"，范围落到 redox prediction）、G3 "/now" 页面、G4 默认主题 → `academic`（Linlin 未采纳 vibe 审计 "主题 / 语言切换器降到 footer" 的建议 — 位置不动）。
    - vibe 审计 P0 的大部分项（UA→GA4、Person JSON-LD、robots/sitemap、a11y、OG 标签）在 2026-04-20 V1/V2 + 2026-04-21 V2 已完成 — 这些不再新增任务。
- **状态上卷**：`M1.3` → `[ ]`（原 `[✓]`，现 G4 待办）。`M1.4` 新增为 `[ ]`。`M1.2` 维持 `[~]`（G4 新增待办、G1/G2 完成、G3 待办）。`H1` 维持 `[~]`。
- **Master TOC 同步**：添加 M1.2.G4，把 M1.3 展开为 G1-G4 子 bullet（此前是扁平），添加 M1.4 及 G1-G4 子 bullet。

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

## V4 — 静态重构

- 抽离 CSS（~2.7k 行）到 `css/main.css`，JS（~850 行）到 `js/main.js`。
- `index_en.html` 从 4852 → 1289 行。
- Welcome 明信片完全 i18n 化；完成全站 i18n 审计；`zh` 切换到统一主站。

## V3 — 工具链

- `.githooks/pre-commit` 在 staged `locales/*.json` 上运行 `scripts/check_i18n_parity.py`。
- `.claude/settings.json` 的 PostToolUse 钩子在 edit 后校验 JSON。
- 新增项目技能：`/preview`、`/verify-visual`、`/new-round`、`/deploy-round`、`/i18n-sync`。
- 把部署 README 整合到 `setup/`。

## V2 — 站点运营批次（表单、分析、CSP、移动）

- Welcome 明信片表单 → Google Sheets 后端（Apps Script + GH-Actions cron 镜像）。
- 接入 Microsoft Clarity，无需 cookie 同意流。
- CSP / Referrer-Policy / X-Content-Type meta 加固。
- 移动端 navbar 汉堡菜单。
- Postcard welcome 的 i18n key 在 en/zh/fr/de 之间同步。

## V1 — v7 重设计上线 + P0 SEO/a11y 大修

- 把 `index_en_v7_round3.html` 部署到 `index_en.html` — 整体重设计：新 hero、OG card、favicon、locales、主题切换器（ai-generated/academic/industrial/fancy）。
- 修复 canonical 重定向、sitemap 去重、新增 `WebSite` JSON-LD schema、Font Awesome webfonts 预加载。
- 修复 Lighthouse label-mismatch 与移动端 touch-target a11y 警告。

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
