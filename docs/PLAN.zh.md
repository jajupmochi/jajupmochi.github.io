# PLAN — Master roadmap（中文）

> **Language:** [English](PLAN.md) | 中文
>
> `jajupmochi.github.io` **正在做、计划做、明确搁置**的唯一事实来源。兼容
> Claude Code plan / mem harness — 每一项都带稳定 ID 和状态符号，AI agent
> 无需从零重推上下文就能定位、读取、执行。
>
> **如何使用：** 扫 [Master TOC](#master-toc) → 钻入 Horizon → 找 Goal → 执行
> Tasks。条目状态变化或新增工作时，与代码改动在同一批 edit 里同步更新本文件，
> 并加一条对应的 `UPDATES.md` 条目。

## 状态符号

| 符号 | 含义 | 何时使用 |
|------|------|----------|
| `[✓]` | 完成 | 已上线、验证、代码中已体现。 |
| `[~]` | 进行中 | 本 session 正在做。 |
| `[ ]` | 待办 | 入队，无阻塞，可立即领取。 |
| `[!]` | 阻塞 | 需先解决依赖 / 等外部答复。 |
| `[?]` | 等用户输入 | 需要 Linlin 做手动或外部一次性操作。 |
| `[x]` | 已取消 | 保留历史，附一行 **Why cancelled:** 注释。 |

父项状态取最不完整的子项：
`[ ]` → `[~]` → `[!]` → `[?]` → `[✓]`（左优先）。

## ID 体系

`H<n>.M<n>.G<n>.T<n>` — Horizon → Milestone → Goal → Task。

- ID **按创建顺序分配，永不重新编号**。若 `T7` 被取消，下一个新任务是 `T8`，
  绝不复用 `T7`。
- 条目可以重命名；其 ID 是永久的，交叉引用保持有效。
- `H1.M2.G3.T4` 这种 ID 全局唯一、可 grep。
- Horizon 有散文名（如 "H1 — Site as a Job-Hunt Asset"）便于人读，但 AI agent
  以 `H1` 为 key。

## 层级约定

| 层级 | 标识 | 范围 | 典型存活期 |
|------|------|------|------------|
| **Horizon** | `H<n>` | 战略主题 — 回答 "为什么这件事存在？" | 月 → 年 |
| **Milestone** | `M<n>` | Horizon 内的具体交付物 — 有终态 | 周 → 月 |
| **Goal** | `G<n>` | Milestone 内一块连贯的事 — 完成时可测 | 天 → 周 |
| **Task** | `T<n>` | 原子动作 — 单个 PR / 单批 edit | 分钟 → 小时 |

如果 Task 一次 edit batch 装不下，在同一 Goal 下拆成多个 Task，不要再嵌套一层。
子 Task 是反模式 — 追踪会变困难。宁可列一堆扁平的小 `T`。

## Master TOC

- **[H1 — Site as a Job-Hunt Asset](#h1--site-as-a-job-hunt-asset)** `[~]`
    - [M1.1 — 内容对齐 CV / extra_info](#m11--内容对齐-cv--extra_info) `[~]`
        - [G1 — Publications](#g1--publications) `[✓]`
        - [G2 — Projects](#g2--projects) `[✓]`
        - [G3 — News](#g3--news) `[ ]`
        - [G4 — Skills](#g4--skills) `[✓]`
        - [G5 — Stats](#g5--stats) `[ ]`
        - [G6 — 合作机构露出](#g6--合作机构露出) `[✓]`
        - [G7 — 博士论文接入（timeline + Publications）](#g7--博士论文接入timeline--publications) `[✓]`
        - [G8 — UX 打磨（V9 Linlin 标记）](#g8--ux-打磨v9-linlin-标记) `[✓]`
    - [M1.2 — SEO + AI 搜索可见度](#m12--seo--ai-搜索可见度) `[~]`
        - [G1 — Schema.org 覆盖](#g1--schemaorg-覆盖) `[✓]`
        - [G2 — 多语言可爬取](#g2--多语言可爬取) `[✓]`
        - [G3 — AI 搜索优化](#g3--ai-搜索优化) `[ ]`
        - [G4 — Head 清理（非 schema 类）](#g4--head-清理非-schema-类) `[~]`
        - [G5 — 第二轮审计 P0 清理（链接卫生 + description 截短）](#g5--第二轮审计-p0-清理链接卫生--description-截短) `[✓]`
    - [M1.3 — 移动 / 无障碍 / 性能](#m13--移动--无障碍--性能) `[ ]`
        - [G1 — Lighthouse 全绿](#g1--lighthouse-全绿) `[✓]`
        - [G2 — 触控目标](#g2--触控目标) `[✓]`
        - [G3 — LCP / CLS / INP](#g3--lcp--cls--inp) `[✓]`
        - [G4 — 性能打磨（vibe 审计补漏）](#g4--性能打磨vibe-审计补漏) `[ ]`
        - [G5 — Figure 放大镜（点击放大）](#g5--figure-放大镜点击放大) `[~]`
    - [M1.4 — 招聘官记忆点差异化](#m14--招聘官记忆点差异化) `[~]`
        - [G1 — Live Citation Graph](#g1--live-citation-graph) `[ ]`
        - [G2 — Redox prediction 交互 demo](#g2--redox-prediction-交互-demo) `[ ]`
        - [G3 — "/now" 页面](#g3--now-页面) `[ ]`
        - [G4 — 默认主题 → academic](#g4--默认主题--academic) `[ ]`
        - [G5 — Cmd+K 命令面板搜索](#g5--cmdk-命令面板搜索) `[✓]`
        - [G6 — Visit Map（访客国家地图）](#g6--visit-map访客国家地图) `[?]`
- **[H2 — 站点运营与维护](#h2--站点运营与维护)** `[?]`
    - [M2.1 — 手动一次性配置](#m21--手动一次性配置) `[?]`
        - [G1 — Welcome 表单后端](#g1--welcome-表单后端) `[?]`
        - [G2 — Microsoft Clarity](#g2--microsoft-clarity) `[?]`
        - [G3 — pre-commit 钩子](#g3--pre-commit-钩子) `[?]`
        - [G4 — Clarity 每周备份 secrets](#g4--clarity-每周备份-secrets) `[?]`
    - [M2.2 — 自动化](#m22--自动化) `[ ]`
    - [M2.3 — 备份与韧性](#m23--备份与韧性) `[ ]`
- **[H3 — 站点内容扩展](#h3--站点内容扩展)** `[ ]`
    - [M3.1 — 项目深度子页](#m31--项目深度子页) `[ ]`
    - [M3.2 — 博客 / 写作](#m32--博客--写作) `[ ]`
    - [M3.3 — 多语言忠实度](#m33--多语言忠实度) `[ ]`
    - [M3.4 — 主题扩展](#m34--主题扩展) `[ ]`
- **[H4 — 文档与 AI 协作基础设施](#h4--文档与-ai-协作基础设施)** `[ ]`
    - [M4.1 — Master Plan + Master TOC + 中英双语约定](#m41--master-plan--master-toc--中英双语约定) `[✓]`
    - [M4.2 — 按读者分区的文档](#m42--按读者分区的文档) `[ ]`
    - [M4.3 — 技能 + 钩子扩展](#m43--技能--钩子扩展) `[ ]`
- **[H5 — 职业外延触点](#h5--职业外延触点)** `[ ]`
    - [M5.1 — 跨平台宣传](#m51--跨平台宣传) `[ ]`
    - [M5.2 — 讲座与活动](#m52--讲座与活动) `[ ]`
    - [M5.3 — 招聘方对接](#m53--招聘方对接) `[ ]`

---

## H1 — Site as a Job-Hunt Asset

**Why:** 本站是 Linlin 为 ML Research Scientist 岗位（Isomorphic Labs、DeepMind-adjacent
labs 等）公开展示的首要求职资产。任何内容 / SEO / 无障碍决策都按 "对招聘方从
第一印象到下载 CV / 联系的转化是否有帮助" 来评估。

### M1.1 — 内容对齐 CV / extra_info

**终态：** 站点上的每一条信息都能追溯到 `res/cv/CV_Linlin_Jia_en.pdf` 或
`extra_info_work.md`。不幻觉，不过时 affiliation。

#### G1 — Publications
- `[✓]` H1.M1.G1.T1 — 已用真实 CV pubs（J24/C23/J23/J22b/J22a/J21/W21b/W21a/P16）+ ICPR 2026 替换 3 条幻觉条目。
- `[✓]` H1.M1.G1.T2 — 3 张 SVG 图嵌入对应 pub 卡。
- `[✓]` H1.M1.G1.T3 —（2026-04-21 V8）figure 文件名统一为 `YYYY_venue_*` 约定（`icpr2026_swissriver_diagram.{svg,png}` → `2026_icpr_swissriver_diagram.{svg,png}`；`jcc2023_redox_framework.{svg,png}` → `2023_jcc_redox_framework.{svg,png}`），并为 6 张仍在用 Font Awesome 占位图标的论文卡补上真实 figure：J23（CompBioMed EpidNN abstract）、J22b（Electronics GED 稳定性结果）、J22a（ESWA 图核表示）、J21（PRL graphkit-learn 准确度）、W21b（SSPR pre-image intro）、W21a（SSPR GED 学习框架）。chrome-devtools 里 6 张都验证 `naturalWidth > 0`。

#### G2 — Projects
- `[✓]` H1.M1.G2.T1 — 对照 `extra_info_work.md` + CV 逐卡校对所有项目（2026-04-21 V9 通过 9 卡 CV 重构完成；每张卡标题现在逐字匹配 CV）。
- `[✓]` H1.M1.G2.T2 —（2026-04-22 V1, V10 回填）已新增 **LIULIAN platform** 卡，置于项目网格顶部。Personal-infra 徽标，`data-tags="industry,llm,agents,software"`，底部链接到平台主页 + GitHub 组织页。素材出处：`extra_info_work.md §LIULIAN`。
- `[✓]` H1.M1.G2.T3 — 新增 **PLANALYSER — Automated HVAC-Concept Audit and Optimisation using AI** 卡（2026-04-21 V9 完成）。INNOSUISSE 2024-2025，合作方 iCoSys + WATTELSE AG。底部链接：ARAMIS 立项页 + WATTELSE 初创页。Industry 徽标，data-tags `academia,industry` 使其在两个 filter 下都出现。
- `[✓]` H1.M1.G2.T4 —（2026-04-22 V1, V10 回填）已新增 **Local Confidential Translator** 卡。Personal-MVP 徽标，`data-tags="software,llm,fun"`，底部链接到 GitHub 仓库。突出本地 LLM + 隐私定位，与 N-Banker / OCTOPUSSY 形成区分。
- `[✓]` H1.M1.G2.T5 — 用 CV 正式名 "1st Global Neobank Research Center" 刷新 **N-Banker** 描述（2026-04-21 V9 完成）。中性措辞；无 CTO / CAIO 标签。底部：平台主页 + PolyU 合作方页。
- `[x]` H1.M1.G2.T6 — 按 extra_info_work.md 刷新 **OCTOPUSSY** + **Virtual Bodmer** 文案。取消原因：V9 方案变更——Virtual Bodmer 被整张删除（Linlin 决定；HES-SO 链接弱、范围未落地），OCTOPUSSY 与 RedoxPrediction 合并为单张按 CV 命名的卡。由 T9 + T10 + T11 承接。
- `[✓]` H1.M1.G2.T7 — 新增 **GraphInk** 卡并带图（2026-04-21 V2 完成）。
- `[✓]` H1.M1.G2.T8 — 新增 **Graph Matching Algorithms (SNSF 2023-2024)** 卡并带图（2026-04-21 V2 完成）。
- `[✓]` H1.M1.G2.T9 —（2026-04-21 V9）整张删除 **Virtual Bodmer** 项目卡。Linlin 决定：范围未落地；HES-SO 合作链接弱。从 `index_en.html` 移除；无 i18n 键副作用（项目卡文案原本就未 i18n）。
- `[✓]` H1.M1.G2.T10 —（2026-04-21 V9）把 **OCTOPUSSY** + **RedoxPrediction** 合并为一张卡，标题 **"OCTOPUSSY — Optimization of Polymers Using Sustainable SYnthesis"**（CV 正式名）。依据：RedoxPrediction 本就是 OCTOPUSSY 的实现产出，两张卡反而令人困惑。合并卡同时承载 `2023_jcc_redox_framework.svg` 图 + 底部到 GitHub `RedoxPrediction` + JCC 2024 DOI 的链接。
- `[✓]` H1.M1.G2.T11 —（2026-04-21 V9）补齐 CV 缺的 2 张卡：**APi — Apprivoiser la Pré-image**（2018-2021，ANR，博士经费）用 `2021_sspr_preimage_intro.svg` 作图，底部 ANR 立项 + LITIS 项目页 + "Papers" 锚。**Service-oriented Programmable Control and Scheduling for Software Defined Network**（2014-2017，XJTU 硕士研究）用 `2016_patent_elm_google_patent_page.png` 作图，底部 Google Patents CN106376041B 链接。
- `[✓]` H1.M1.G2.T12 —（2026-04-21 V9）结构性重构——全部 9 张项目卡：`<a class="project-card">` → `<div class="project-card" data-primary-href="…" role="link" tabindex="0">`。原因：底部链接条里的 `<a>` 嵌到外层 `<a>` 在 HTML 规范上非法。`js/main.js:611-640` 加代理式点击处理（`document.addEventListener('click', …)`），点卡主体 → 按 `data-primary-href` 跳转（外部链接开新标签）；点底部链接冒泡到各自的 `<a>`；cmd/ctrl/middle-click 开新页；键盘 Enter/Space 可触达（a11y）。
- `[✓]` H1.M1.G2.T13 —（2026-04-21 V9）`.project-links` 底部控件（`css/main.css:1588-1625`）：dashed 顶部边框、flex-wrap 药丸式，视觉与 `.pub-link` 一致。图标：`fa-file-signature`（立项 / 经费）、`fa-globe`（平台 / 项目主页）、`fa-handshake`（合作方）、`fab fa-github`（代码仓）、`fa-file-lines`（关联论文）、`fa-certificate`（专利）。各卡 `data-primary-href`：ST-GCN → SNSF 206352；N-Banker → 平台主页；GraphInk → SNSF 217594；graphkit-learn → GitHub 仓；PLANALYSER → ARAMIS 立项；Graph Matching → SNSF 188496；OCTOPUSSY → RedoxPrediction GitHub；APi → LITIS 项目页；SDN → Google Patents。各卡链接数：3, 2, 1, 2, 2, 3, 2, 3, 1。

#### G3 — News
- `[ ]` H1.M1.G3.T1 — 新增 2025 年条目（GraphInk launch、LIULIAN 早期原型）。
- `[ ]` H1.M1.G3.T2 — 新增 2024 年条目（GraphInk SNSF 启动、Bodmer SNSF 立项）。
- `[ ]` H1.M1.G3.T3 — 新增 2026 年条目（InnoEx 2026 HK 上 N-Banker chatbot 展示）。

#### G4 — Skills
- `[✓]` H1.M1.G4.T1 —（2026-04-22 V1）已新增 **agent-skills** 标签（`python-backend-creator`、`project-adaptor`），归入新增的 `ai_tools` 技能分类。
- `[✓]` H1.M1.G4.T2 —（2026-04-22 V1）已新增 **vibe-coding 工具** 标签（Claude Code、Codex、Antigravity、OpenCode、GitHub Copilot），同样归入 `ai_tools`。
- `[✓]` H1.M1.G4.T3 —（2026-04-22 V1）已新增 **agent / LLM 系统** 标签（CrewAI、Ollama、vLLM、RAG、GRPO、LoRA），归入 `ml_ai` 与 graph-ML / GNN 标签并列。
- `[✓]` H1.M1.G4.T4 —（2026-04-22 V1）Skills 6 分类重构：`programming` / `ml_ai` / `tools` / `domain` / `languages` / `ai_tools`。新增 `skills_cats.ai_tools` i18n 键，4 个语种全部补齐。专利 + ELM (Extreme Learning Machine) 重新归到 `domain`，与 chemoinformatics / hydrology 一起，避免吹大 `ml_ai` 标签数量。

#### G5 — Stats
- `[ ]` H1.M1.G5.T1 — 发表数量从 9 → 10（含 ICPR 2026 与修正后的 pubs）。
- `[ ]` H1.M1.G5.T2 — 自动拉取 Google Scholar 引用数据（目前手工；见 H2.M2.G2）。

#### G6 — 合作机构露出
> 2026-04-21 V5 根据 Linlin 指令 #5 加入。V6 (2026-04-21) 改方案：原本的 `about.p5` 大段合作机构段落根据 Linlin 反馈 "合作者不要加到 About Me，加到 projects 和 papers 对应部分" 被 revert。存活意图改为把每个合作机构嵌到对应的项目/论文卡片里，让关系紧挨具体产物。
- `[x]` H1.M1.G6.T1 — （V6 取消）`about.p5` 合作机构段（University of Basel、ETH Zürich、HES-SO Fribourg、University of Zürich、Inselspital Bern、AWS、N-Banker、China Pharmaceutical University）。取消原因：段落级露出与 About Me 的个人履历定位冲突；卡级才是目标策略——由下方 T3 承接。
- `[✓]` H1.M1.G6.T2 — Virtual Bodmer 项目伙伴（Université de Genève、Fondation Martin Bodmer、Archaeo-Scientific Lab）写进 Scientific Collaborator 时间线描述而非 About — 属具体项目资源，不是长期合作。
- `[✓]` H1.M1.G6.T3 —（2026-04-21 V9）合作机构在 9 卡 CV 重构中通过项目卡级露出。每张卡的描述都列出对应的机构合作方（例如 PLANALYSER → iCoSys + WATTELSE AG、N-Banker → Digital Financial Services Research Center / PolyU、ST-GCN → ETH + U. Basel、Graph Matching → ETH Zürich、OCTOPUSSY → Arkema + 工业高分子团队），`.project-links` 底部控件直接放合作方 / 机构 URL（例如 N-Banker `fa-handshake` → PolyU KTEO 页、PLANALYSER → WATTELSE startup.ch 页）。卡级露出替换了 V6 取消的 `about.p5` 段落方案——合作方出现在具体产物旁边。

#### G7 — 博士论文接入（timeline + Publications）
> 2026-04-21 V7 加入。决策依据：博士论文原本只躺在 CV 里，站上完全不露；招聘方要翻开 CV PDF 才看到那 260 页的产物，Publications 区块又从 2026 ICPR 论文开场，奠基之作被排挤到视线外。两条动线各放一个触点——按时间线浏览 Experience 的读者 / 从 Publications 开始扫的读者都能在一屏内抵达论文。
- `[✓]` H1.M1.G7.T1 — PhD 时间线条目新增 `.timeline-links` 行（`index_en.html:888`），包含 Thesis PDF + Defense slides 两个按钮；复用既有 `.pub-link` 样式，主题 hover 色直接继承。
- `[✓]` H1.M1.G7.T2 — Publications 区块顶部新增 `.thesis-highlight` 特色卡（`index_en.html:1031`），位于 filter 控件之上，任意 filter / 排序组合下都常驻可见。
- `[✓]` H1.M1.G7.T3 — 新增 6 条 `thesis.*` i18n 键（`badge` / `title` / `institution` / `subtitle` / `download` / `slides`）× 4 语种。当前共 119 键。按学术惯例 `thesis.title` 四个语种均保留英文原题。
- `[✓]` H1.M1.G7.T4 — `.thesis-highlight*` + `.timeline-links` CSS（`css/main.css`）。chrome-devtools 跨主题视觉验证：`ai-generated` / `industrial` / `fancy`。
- `[✓]` H1.M1.G7.T5 —（2026-04-21 V8）把 `.thesis-highlight` 从 Publications 顶端（filter 控件之上）搬到**底端**（`#pubsList` 关闭后、section 容器关闭前）。依据：V7 的顶端摆放会把 2026 ICPR 的 accepted 公告挤到折叠线以下；搬到底端后，"我现在在做什么"作为开场卡，基础性的博士论文作为收尾总结。chrome-devtools `compareDocumentPosition` 验证 `isAfterPubsList: true`，卡 + 两个下载按钮渲染保持原样。

#### G8 — UX 打磨（V9 Linlin 标记）
> 2026-04-21 V9 加入。V8 上线后 Linlin 标的三件独立 UX 修正：coming-soon toast 看起来很廉价、论文缩略图太小招聘方一眼看不清 figure、thesis 高亮卡紧贴论文最后一张没有留白。每项都小，但每项都是用户反馈，打包进 V9 让本次 change-set 自成一体。
- `[✓]` H1.M1.G8.T1 —（2026-04-21 V9）Coming-soon toast 玻璃拟态重写（`index_en.html:1609` + `css/main.css:~2935`）。居中卡 280-420 px（viewport 夹紧）、18 px backdrop blur + 160% 饱和度、44×44 图标徽章 `fa-screwdriver-wrench`、两行标题 + 副标题、柔软阴影 + 主色 1 px ring、`scale(0.92) → 1.0` cubic-bezier 入场。主题覆盖：industrial → 深卡 + 霓虹绿图标，fancy → 粉色渐变。新增 i18n 键 `comingSoon.title` + `comingSoon.sub` 替换旧单行 `comingSoon.text`。chrome-devtools 跨主题验证。重写原因：Linlin 对 V6 药丸式 toast 的直接反馈 "太丑"。
- `[✓]` H1.M1.G8.T2 —（2026-04-21 V9）论文缩略图放大 + padding 减半（`index_en.html` 10 个 `<img>` dim + `css/main.css:~1841, ~1857`）。指令原文："图片放大，左/上 padding 减半，下 padding 等于上 padding"。卡片 padding `1.5rem` → `0.75rem 1.5rem 0.75rem 0.75rem`（上 + 左减半、下 = 上）。Grid `180px 1fr` → `220px 1fr`、gap `1.5rem` → `1.25rem`。`.pub-thumbnail` max-width 180→220 px、height 140→172 px（保持 5:4 比例）。10 张论文卡 `<img>` 用 `replace_all` 替唯一串 `" loading=\"lazy\" width=\"180\" height=\"140\">"`——项目卡图（400×180）不受影响。
- `[✓]` H1.M1.G8.T3 —（2026-04-21 V9）Thesis 高亮卡 `margin-top: 2rem`（`css/main.css:~1767`）。不加间距的话，thesis 卡会直接顶着 carousel 最后一张论文，在视觉上把 Ph.D. 收官作品压成又一条列表项。加上空白让 thesis 读成收尾陈述，而非列表项。纯 CSS 改动，无 HTML / i18n 影响。

### M1.2 — SEO + AI 搜索可见度

**终态：** 站点在 Google 正常被索引，`Linlin Jia` + `graph machine learning`
query 有排名；ChatGPT / Perplexity / Claude 被问到 graph ML 研究者时会引用本站。

#### G1 — Schema.org 覆盖
- `[✓]` H1.M2.G1.T1 — Person schema 含 `knowsAbout` + `affiliation`。
- `[✓]` H1.M2.G1.T2 — ScholarlyArticle JSON-LD（10 条）。
- `[✓]` H1.M2.G1.T3 — SoftwareSourceCode JSON-LD（graphkit-learn 等）。
- `[✓]` H1.M2.G1.T4 — WebSite + FAQPage + BreadcrumbList JSON-LD（2026-04-21 V2 完成）。
- `[✓]` H1.M2.G1.T5 —（2026-04-21 V9，SEO 审计第三轮 P5）把引用次数注入 Person + 全部 8 篇 ScholarlyArticle schema，用 `interactionStatistic`，`@type: InteractionCounter`、`interactionType: https://schema.org/CiteAction`、`userInteractionCount: <N>`。Person 带 `data/citations.json` 的总数（130）；每篇 ScholarlyArticle 各自带一份：J24=9、ACPR=1、CBM=61、Electronics=2、ESWA=25、PRL=14、W21b=9、W21a=7。让 Google / Scholar / LLM rerank 不必爬可见 `.citation-count` span 就能拿到同行认可信号。

#### G2 — 多语言可爬取
- `[✓]` H1.M2.G2.T1 — hreflang `?lang=` URL 变体。
- `[✓]` H1.M2.G2.T2 — sitemap.xml 从 3 → 13 URL，并用 `xhtml:link` 声明 alternate。
- `[✓]` H1.M2.G2.T3 —（2026-04-21 V8）通过新增的 `data-i18n-href-map` 属性，在 `applyTranslations`（`js/main.js`）里按当前语种切换 `href`。中文访客现在落在中文版 Google Patents 页（`/patent/CN106376041B`），en / fr / de 访客落在英文版（`/patent/CN106376041B/en`）。依据：读 CN 专利的中文读者适合 Google 原生中文渲染；其他语种读者适合英文摘要。方案足够通用，后续按语种切换的外链（区域媒体报道、视频镜像）都可复用。
- `[✓]` H1.M2.G2.T4 —（2026-04-22 V1）按语种切换图片 `src` 的新属性 `data-i18n-src-map`，同样在 `applyTranslations`（`js/main.js`）里处理。是 T3 的姊妹（`<img>` 而非 `<a>`），用于 Contact 区块里的静态地图截图按访客语种切换 en/zh/fr/de Google Maps tile。loader 把缺少的语种条目当作 no-op（保留默认 `src`）。

#### G3 — AI 搜索优化
- `[ ]` H1.M2.G3.T1 — `llms.txt` 约定稳定后加上（目前还在草案阶段）。
- `[ ]` H1.M2.G3.T2 — 季度检查：被问 "tell me about graph ML researchers" 时，ChatGPT / Perplexity / Claude 是否引用本站？
- `[ ]` H1.M2.G3.T3 — 考虑 Mastodon / Bluesky 身份验证作为 AI grounding 信号。

#### G4 — Head 清理（非 schema 类）
> 来源：2026-04-20 vibe 审计 §三 SEO / 可发现性。2026-04-21 V9 扩展为 SEO 审计第三轮 P0–P3 收尾（sitemap 卫生 + section 标题 i18n attr 奇偶 + title/description 关键词收紧）。
- `[ ]` H1.M2.G4.T1 — 删掉过时的 `<meta name="keywords">`（`index_en.html:8`）。现代搜索引擎已不参考，保留只是噪音。
- `[✓]` H1.M2.G4.T2 —（2026-04-21 V8）Associations 卡图标 `fa-edit` → `fa-id-badge`（`index_en.html:1252`）。`fa-edit` 语义贴合 "Reviewing"（审稿），但与 "Associations"（SAPR / Marie Curie Alumni / LITIS 会员身份）不匹配；换成 `fa-id-badge` 会员卡图形更匹配成员身份语义。Reviewing 卡保留 `fa-edit`。
- `[✓]` H1.M2.G4.T3 —（2026-04-21 V9，SEO 审计第三轮 P0）`sitemap.xml` 失效 URL 修复 + 补 6 条新图链接（`sitemap.xml:54-78`）。两条 `<image:loc>` 还指着 V8 改过名的文件（`icpr2026_*` → `2026_icpr_*`、`jcc2023_*` → `2023_jcc_*`），谷歌图搜爬取必 404。已修。新增 6 条 `<image:loc>`，覆盖 V8 接入的论文卡 figure（EpidNN、Electronics 稳定性、ESWA 核、PRL 精度、SSPR pre-image、SSPR GED 度量）——让索引器不用渲染页面就能发现这些图。
- `[✓]` H1.M2.G4.T4 —（2026-04-21 V9，SEO 审计第三轮 P1）Beyond Research + Blog 两个 `<h2>` 补 i18n 属性（`index_en.html:1423, 1543` + 4 语种）。两个标题虽然在有 `data-i18n` 的 `<section>` 下，但 `<h2>` 自身没有 attr——zh/fr/de 访客看到的是"中文页面夹着英文标题"。新增 `sections.beyond`、`sections.blog`、`beyond.subtitle`、`blog.label` 键到 EN/ZH/FR/DE。奇偶：124 键/语种。
- `[✓]` H1.M2.G4.T5 —（2026-04-21 V9，SEO 审计第三轮 P2）Title 关键词收紧（`index_en.html:5`）。新版：`Linlin Jia, Ph.D. — ML Research Scientist | Graph ML · LLM`（60 字符，Google SERP 截断线上）。把偏泛的 "AI Research" 换成更高意图的 "LLM"——这是 Linlin 本轮求职的目标关键词。
- `[✓]` H1.M2.G4.T6 —（2026-04-21 V9，SEO 审计第三轮 P3）Meta description 截到 148 字符（`index_en.html:6`）。上一版 160+ 字符（V6 G5.T1 截过一次）在 SERP 上仍会被省略号截掉。新版："Linlin Jia, Ph.D. — Graph ML, LLM Agents, Spatio-Temporal Forecasting, AI for Science. Postdoc at U. Bern. Open to ML Research Scientist roles."。保留 4 个目标关键词 + 身份 + 求职信号。在 V6 截短（210 → 156）的基础上进一步收紧。

#### G5 — 第二轮审计 P0 清理（链接卫生 + description 截短）
> 2026-04-21 V6 新增。来源：2026-04-21 跑的第二轮 SEO 审计（综合评分 92/100 —— "优秀基础"）。4 处 `href="#"` 死链 + 1 处过长 meta description 被标记为 P0，同一个 edit batch 一起落，无布局 / schema 改动。
- `[✓]` H1.M2.G5.T1 — Meta description 截短 210 → 156 字符（`index_en.html:6`）。开头堆关键词密集的职位 + 研究方向。
- `[✓]` H1.M2.G5.T2 — ACPR 2023 PDF 按钮 → Google Scholar 单篇引用 URL（`index_en.html:1106`）。无公开 preprint；Scholar 页面是可爬取的 fallback。图标 `fa-file-pdf` → `ai-google-scholar`，文字 "PDF" → "Scholar"。
- `[✓]` H1.M2.G5.T3 — N-Banker（`:936`）+ OCTOPUSSY（`:989`）项目卡：`href="#"` → `href="#projects"`（自指向空锚 no-op 模式，对齐 `:954` 的 GraphInk 卡）。
- `[✓]` H1.M2.G5.T4 — RSS Feed 死链移除（`:1521`）。博客还是 "coming soon"，没有 feed 可指。

### M1.3 — 移动 / 无障碍 / 性能

#### G1 — Lighthouse 全绿
- `[✓]` H1.M3.G1.T1 — 所有 Lighthouse 类别 ≥90。

#### G2 — 触控目标
- `[✓]` H1.M3.G2.T1 — 所有可交互元素 ≥ 44×44 px。

#### G3 — LCP / CLS / INP
- `[✓]` H1.M3.G3.T1 — LCP < 2.5 s，靠 AVIF hero + preconnect + fetchpriority。
- `[✓]` H1.M3.G3.T2 — CLS < 0.1（所有 `<img>` 有显式 width/height）。
- `[✓]` H1.M3.G3.T3 — JS 抽离后 INP 进入预算。

#### G4 — 性能打磨（vibe 审计补漏）
> 来源：2026-04-20 vibe 审计 §二 性能与依赖臃肿 + §四 4.3 chatbot `alert()`。Lighthouse ≥90 覆盖不到这些 — 都是依赖重量 / UX 细节层面的打磨，招聘官第一眼就能感受到。
- `[ ]` H1.M3.G4.T1 — 字体家族精简。保留 Inter（正文）+ JetBrains Mono（代码）。`fancy` 主题放弃 Playfair Display，`industrial` 主题放弃 Orbitron → 两主题改用系统字体。省约 200-400 KB + 一次 DNS / TLS 握手。
- `[ ]` H1.M3.G4.T2 — `canvas-confetti` 改为 dynamic import，只有庆祝触发（如 ICPR accepted 按钮）才加载。目前每次打开页面都加载。
- `[ ]` H1.M3.G4.T3 — 加 `@media (prefers-reduced-motion: reduce)` CSS 规则。当前约 70 处 `@keyframes` / transition 忽略了这个 OS 级偏好。
- `[ ]` H1.M3.G4.T4 — 地图栈去重：Leaflet（JS）与 Google Maps iframe 共存，留一个。Google Maps iframe 同时是 a11y 失败项（`frame-title` 缺失）。
- `[ ]` H1.M3.G4.T5 — `openChatbot()` 把 native `alert()` 改成 toast 组件或直接 `mailto:`。native alert 会卡住 chrome-devtools 自动化，也是 UX 反模式。

#### G5 — Figure 放大镜（点击放大）
> 2026-04-21 V5 根据 Linlin 指令 #6 加入。决策：项目与出版卡的缩略图很小（~120×80 px），招聘官需要看到 SVG 的细节（graph-kernel 架构、GNN message-passing、redox demo）才能 grasp 研究内容。Lightbox 保留全分辨率 SVG 清晰度，不必为每张图单独建页。
- `[~]` H1.M3.G5.T1 — CSS + JS + a11y（role=dialog、aria-modal、ESC / backdrop 关闭、焦点还原）+ 4 主题 CSS 变量同步。`ai-generated` 已验证；academic / industrial / fancy 跨主题验证待补。

### M1.4 — 招聘官记忆点差异化

> 来源：2026-04-20 vibe 审计 §五（独特性建议）+ §七（立刻做的 3 件事）。目标：给招聘官留一个**具体的"wow"点**，让 ta 能记住并描述给同事 — 把本站从 Karpathy / Olah / Beyer 参考集里拉开。默认主题和 `/now` 是同一 Milestone 下的轻量级补强项。

#### G1 — Live Citation Graph
- `[ ]` H1.M4.G1.T1 — 在 publications 区块用 D3.js 力导向图。节点 = 论文，边 = 共同作者。数据源：`data/citations.json` + 内联作者列表。骨架参考：`new_web_test.html`（已经是可运行原型）。
- `[ ]` H1.M4.G1.T2 — 点节点 → 平滑滚动到对应 publication 卡。
- `[ ]` H1.M4.G1.T3 — 用 IntersectionObserver 延迟初始化，避免吃 LCP 预算。

#### G2 — Redox prediction 交互 demo
- `[ ]` H1.M4.G2.T1 — 在 RedoxPrediction 项目卡上放小型交互 demo：SMILES 输入 → 渲染分子图 → 可视化 GNN message-passing forward pass。预置 3-5 个已知分子，招聘官不打字也能点进去看。
- `[ ]` H1.M4.G2.T2 — 为 `prefers-reduced-motion` 用户与无 canvas 支持的浏览器提供静态 fallback 图 / 动画。
- `[ ]` H1.M4.G2.T3 — 把 demo 从 hero "Research" 关键词与 RedoxPrediction 项目卡醒目入口引流过去 — 这是 graph-ML 药物发现科学家的 3 秒电梯演讲。

#### G3 — "/now" 页面
- `[ ]` H1.M4.G3.T1 — 仿 <https://nownownow.com/> 风格加 `now.html`：一段话讲当前重点（N-Banker LLM agent + SNSF Bodmer + 求职状态）。每月更新。
- `[ ]` H1.M4.G3.T2 — 在 navbar（"Now" 槽位）与 `index_en.html` 的 footer 链接过去。

#### G4 — 默认主题 → academic
- `[ ]` H1.M4.G4.T1 — `js/main.js` 主题初始化里把默认主题从 `ai-generated` 改为 `academic`。已有 `localStorage` 偏好仍然尊重。主题 / 语言切换器位置不动（vibe 审计 "降到 footer" 建议 Linlin 不采纳）。

#### G5 — Cmd+K 命令面板搜索
> 2026-04-22 V1 加入（V11 回填）。决策依据：站点已经长到 9 个项目卡 + 10 篇论文 + 4 主题 + 4 语种 — 招聘官靠滚动找内容很费时。Cmd+K（或 "/"）打开 Mac 风格 palette，把所有 section / 项目 / 论文 / 技能索引在一处，支持模糊匹配 + 键盘导航 + ESC 关闭。是 H1.M4 上一个具体的 "wow" 点。
- `[✓]` H1.M4.G5.T1 —（2026-04-22 V1）`index_en.html` 内 palette 标记（focus-trap、role=dialog、aria-modal、ESC + backdrop 关闭、焦点还原）。把 section 锚点 + 项目 / 论文标题 + 技能 chip 索引到内存列表，按子串匹配 + token 前缀加权打分。
- `[✓]` H1.M4.G5.T2 —（2026-04-22 V1）Cmd+K（macOS）/ Ctrl+K（Win/Linux）/ "/"（在文本输入框外）全局键位。Palette 内显示快捷键徽章 + navbar 放大镜 icon 上加 tooltip。
- `[✓]` H1.M4.G5.T3 —（2026-04-22 V1）i18n 奇偶：新增 4 条 `search.*` 键（`placeholder`、`aria`、`empty`、`no_results`）+ 3 条 `common.search_*` 占位（search、search_projects、search_publications），覆盖 en / zh / fr / de。
- `[✓]` H1.M4.G5.T4 —（2026-04-22 V1）chrome-devtools 跨主题验证 `ai-generated` / `academic` / `industrial` / `fancy` — palette 卡 + ring 颜色按主题 `--primary` 跟着走。

#### G6 — Visit Map（访客国家地图）
> 2026-04-22 V1 加入（Phase 4）。决策依据：把现有 Microsoft Clarity 每周备份管线变成可见的"展示物"，挂在 Contact 区块底部，让招聘官看到自然的全球访问量而不必离站。完全自建 / 不再加新的第三方 tracker；复用已经 commit 在 `data/analytics/` 的 snapshot JSON。
- `[✓]` H1.M4.G6.T1 —（2026-04-22 V1）`.visit-map-block` 标记加在 Contact 区块底端。在 JS 验证 snapshot 存在前保持 `hidden`；无数据时静默 no-op。
- `[✓]` H1.M4.G6.T2 —（2026-04-22 V1）`js/main.js` 内 `initVisitMap` IIFE：`findLatestSnapshotPath` HEAD 探测最近 90 天，`extractCountryCounts` 解析 Clarity 的 `data[*].information[*]` 字段，用 `COUNTRY_ALIAS` 把 ISO-2 → world-atlas 英文短名做归一化，然后从 jsDelivr（script-src 已经允许）懒加载 D3 v7.9.0 + topojson-client v3.1.0，用 `geoNaturalEarth1` 投影 + `scaleSequential` 从 `rgba(120,144,180,0.18)` → `--primary` 渲染 choropleth。同时渲染 Top-Countries `<ol>` + 总访问数 / 国家数 / 时间窗统计。
- `[✓]` H1.M4.G6.T3 —（2026-04-22 V1）world-atlas TopoJSON（约 108 KB）打包到本地 `data/world-atlas/countries-110m.json`，避免把 CSP `connect-src` 放宽到 jsDelivr。trade-off：一次性 108 KB 体积换更紧的 CSP。
- `[✓]` H1.M4.G6.T4 —（2026-04-22 V1）i18n 奇偶：新增 7 条 `visitMap.*` 键（`title`、`totalVisits`、`countries`、`window`、`source`、`topCountries`、`svgTitle`），覆盖 en / zh / fr / de。当前奇偶 141 键 / 语种。
- `[✓]` H1.M4.G6.T5 —（2026-04-22 V1）chrome-devtools 跨主题验证 `ai-generated` / `industrial` / `fancy`（用 mock fixture，验证后已删）。已知 v1 限制：choropleth 颜色是首次渲染时从 `--primary` 取的，运行时切换主题需要刷新页面才会重染（可接受；未来可加 `MutationObserver` 监听 `[data-theme]` 修复）。
- `[?]` H1.M4.G6.T6 — 真实数据填充：被 H2.M1.G4.T2（`CLARITY_API_TOKEN` repo secret）卡住。Linlin 设好 secret 并重新跑一次 workflow 后，第一份真实 `data/analytics/clarity-YYYY-MM-DD.json` 落地，块下次访问时自动激活。

---

## H2 — 站点运营与维护

**Why:** 站点用了多个免费第三方服务（Google Sheets、Microsoft Clarity、GitHub
Actions）。每个都需要仓库外一次性配置，加上定期检查。这个 Horizon 同时跟踪两者。

### M2.1 — 手动一次性配置

> 下面所有 `[?]` 项目都需要 Linlin 在**仓库之外**做点事 — dashboard 点一下、
> 粘贴一个 token、跑一行 shell 命令。没做的话，对应功能在线上会静默失效。
> 详细步骤在 `setup/`。

#### G1 — Welcome 表单后端
**详情：** [setup/form-backend-google-sheets.md](setup/form-backend-google-sheets.md)
- `[?]` H2.M1.G1.T1 — 创建 Google Sheet + Apps Script Web App。
- `[?]` H2.M1.G1.T2 — 用 Web App URL 替换 `index_en.html` 里的 `PASTE_YOUR_APPS_SCRIPT_WEB_APP_URL_HERE`。
- `[?]` H2.M1.G1.T3 — 烟囱测试：提交 postcard → Sheet 出现新行。

#### G2 — Microsoft Clarity
**详情：** [setup/analytics-clarity.md](setup/analytics-clarity.md)
- `[?]` H2.M1.G2.T1 — 在 <https://clarity.microsoft.com/> 创建 Clarity 项目。
- `[?]` H2.M1.G2.T2 — 用 project id 替换 `index_en.html` 里的 `PASTE_CLARITY_PROJECT_ID`。
- `[?]` H2.M1.G2.T3 — 在 dashboard 里开启 cookie-less 模式（Settings → Setup → Cookies）。
- `[?]` H2.M1.G2.T4 — footer 里加一条 Clarity 隐私政策声明。

#### G3 — pre-commit 钩子
- `[?]` H2.M1.G3.T1 — **每个 clone 跑一次**：`git config core.hooksPath .githooks`。

#### G4 — Clarity 每周备份 secrets
**详情：** [setup/analytics-backup.md](setup/analytics-backup.md)
- `[?]` H2.M1.G4.T1 — 在 Clarity 里生成 API token（Settings → Data Export）。
- `[?]` H2.M1.G4.T2 — 以 `CLARITY_API_TOKEN` 加为 GitHub 仓库 secret。
- `[?]` H2.M1.G4.T3 — 开启 Settings → Actions → General 里的 "Read and write permissions"。
- `[~]` H2.M1.G4.T4 —（2026-04-22 V1）workflow 已经在 `master` 上线；首次手动触发（run id 24780197033）已发起，但**因 `error: CLARITY_API_TOKEN env var not set` 失败** — 被 T1 + T2 卡住。secret 落地后重新触发。

### M2.2 — 自动化

#### G1 — CV 刷新
- `[ ]` H2.M2.G1.T1 — 用构建脚本自动更新 `res/cv/` 下的 CV PDF（目前纯手工）。
- `[ ]` H2.M2.G1.T2 — 站点上显示 "CV last updated"。

#### G2 — 引用数刷新
- `[ ]` H2.M2.G2.T1 — 定时抓取（GH Actions 每周 cron）刷新 `data/citations.json`（从 Google Scholar）。
- `[!]` H2.M2.G2.T2 — 阻塞：Scholar 无官方 API；需要鲁棒爬虫或替代（Semantic Scholar API）。

#### G3 — OG 卡轮换（可选）
- `[ ]` H2.M2.G3.T1 — 启用 `.github/workflows/rotate-og-card.yml` 的周一 cron。
- `[x]` H2.M2.G3.T2 — 每次请求随机 — 已取消（纯 GH Pages 做不到，要边缘 worker）。

#### G4 — 垃圾提交缓解（welcome form）
- `[ ]` H2.M2.G4.T1 — Cloudflare Turnstile（低成本，免费）— 只在垃圾提交真出现时做。
- `[ ]` H2.M2.G4.T2 — honeypot 字段（零依赖）。
- `[ ]` H2.M2.G4.T3 — Apps Script 里按 IP 限流（PropertiesService）。

### M2.3 — 备份与韧性

#### G1 — Clarity 每周备份
- `[~]` H2.M3.G1.T1 —（2026-04-22 V1）workflow 文件 `.github/workflows/backup-analytics.yml` 已 push 到 `origin/master`（commit 范围 `f64a27a..3ddd46a`）；cron `'17 4 * * 0'` 已挂上下个周日 04:17 UTC，`workflow_dispatch` 也可用。首次手动触发已执行；激活仍取决于 H2.M1.G4（secret）。

#### G2 — Welcome 提交备份
- `[ ]` H2.M3.G2.T1 — 建私仓 `linlin-site-submissions-backup` 每周镜像 Sheet 的 published-CSV。

#### G3 — 源头快照
- `[ ]` H2.M3.G3.T1 — 季度 tarball：仓库 + Sheet → Drive（预防 GH-Pages 或 Sheets 长期变化）。

---

## H3 — 站点内容扩展

**Why:** H1 完成后，招聘方访客需要深度。子页与写作是在首页滚动之外展示技术
沟通能力的手段。

### M3.1 — 项目深度子页

#### G1 — LIULIAN platform 子页
- `[ ]` H3.M1.G1.T1 — `/projects/liulian/` 页（planned vs. implemented 模块；图来自 extra_info_work.md §LIULIAN）。
- `[ ]` H3.M1.G1.T2 — MVP1 上线后嵌入实时 demo iframe。

#### G2 — GraphInk demo
- `[ ]` H3.M1.G2.T1 — `/projects/graphink/` 页，含框架 SVG 与论文链接。

#### G3 — Local Confidential Translator
- `[ ]` H3.M1.G3.T1 — `/projects/translator/` 页，含屏幕录像。

### M3.2 — 博客 / 写作

#### G1 — 博客复活
- `[ ]` H3.M2.G1.T1 — 决定：保留现 `blog/` Hux-Blog Jekyll 配置，还是迁到 Substack 之类外部站点（更低摩擦）。
- `[ ]` H3.M2.G1.T2 — 有文章后把博客链进主导航。

#### G2 — 开局 3 篇
- `[ ]` H3.M2.G2.T1 — "Graph ML for non-graph people" — 入门普及。
- `[ ]` H3.M2.G2.T2 — "Vibe-coding workflow for solo researchers" — 用 Claude Code / Codex 的流程。
- `[ ]` H3.M2.G2.T3 — "Job-hunt journal — switching from postdoc to industry"（可选，也可能保留为私）。

### M3.3 — 多语言忠实度

#### G1 — 翻译完整度
- `[ ]` H3.M3.G1.T1 — 把 H1.M1 产生的新 key 翻译到 fr/de。
- `[~]` H3.M3.G1.T2 — 每次 locale 改动后跑 `/i18n-sync`（技能已存在；行为层面）。

#### G2 — locale-specific 文案
- `[ ]` H3.M3.G2.T1 — 识别 en.json 里难以直译的英文俗语；重写源文使之可译。

### M3.4 — 主题扩展

- `[ ]` H3.M4.G1.T1 — `industrial` 主题：对慢网络 Orbitron 字体 fallback 做打磨。
- `[ ]` H3.M4.G2.T1 — `fancy` 主题：移动端动画缓动微调（目前稍卡）。
- `[ ]` H3.M4.G3.T1 — 可选：`print` 主题，为页面导出干净 PDF。

---

## H4 — 文档与 AI 协作基础设施

**Why:** 本站已经大到中途加入的 AI agent（Claude Code）需要一张清晰地图。
否则每个新 session 都会从零重推上下文，并与之前的决定打架。

### M4.1 — Master Plan + Master TOC + 中英双语约定

#### G1 — 创建 PLAN.md
- `[✓]` H4.M1.G1.T1 — 本文件（2026-04-21 V3 创建）。

#### G2 — 更新 CLAUDE.md
- `[✓]` H4.M1.G2.T1 — 加硬规则：每份文档顶部必须带 Master TOC + 层级标识。
- `[✓]` H4.M1.G2.T2 — 加硬规则：PLAN.md 是路线图唯一来源；需要用户 / 外部动作的用 `[?]`。
- `[✓]` H4.M1.G2.T3 — 加硬规则：改动命中 PLAN.md 条目时，同批 edit 内更新状态。

#### G3 — 给已有文档加 Master TOC
- `[✓]` H4.M1.G3.T1 — README.md。
- `[✓]` H4.M1.G3.T2 — setup/README.md。
- `[✓]` H4.M1.G3.T3 — 每份 `setup/*.md`（form-backend、analytics-clarity、analytics-backup、security-headers）。

#### G4 — 中英双语双文件（NAME.md + NAME.zh.md）
- `[✓]` H4.M1.G4.T1 — 在 CLAUDE.md 加强制硬规则：所有仓库级文档必须以 NAME.md（英文 canonical）+ NAME.zh.md（中文镜像）双文件形式存在，代码 / 标识符 / ID 两版保持英文。
- `[✓]` H4.M1.G4.T2 — 为每份 canonical 文档顶部加语言切换器（`> **Language:** English | [中文](NAME.zh.md)`）。
- `[✓]` H4.M1.G4.T3 — 为全部 9 份仓库级文档创建中文镜像：`CLAUDE.zh.md`、`README.zh.md`、`PLAN.zh.md`、`UPDATES.zh.md`、`setup/README.zh.md`、`setup/form-backend-google-sheets.zh.md`、`setup/analytics-clarity.zh.md`、`setup/analytics-backup.zh.md`、`setup/security-headers.zh.md`。
- `[ ]` H4.M1.G4.T4 — Pre-commit 奇偶校验：canonical `NAME.md` 修改但对应 `NAME.zh.md` 未同步时拦截提交（scripts/check_bilingual_parity.py）。今日不做，入队。

### M4.2 — 按读者分区的文档

**终态：** 首次访问者 — 无论是招聘方、Linlin 未来的自己、还是 AI agent —
都能在 30 秒内找到自己的入口。

#### G1 — README.md 分区
- `[~]` H4.M2.G1.T1 — 加 "面向访客 / 面向维护者 / 面向 AI agent" 三节。
- `[~]` H4.M2.G1.T2 — 给每份 `setup/*.md` 加一行描述索引。
- `[~]` H4.M2.G1.T3 — 在顶部用 flat checklist 列出 H2.M1 所有手动动作项。

#### G2 — 维护 how-to（2026-04-21 审计新识别的缺口）
- `[ ]` H4.M2.G2.T1 — `setup/add-project-card.md` — 如何新增项目卡 + SVG 图（含对应 publication 的映射）。
- `[ ]` H4.M2.G2.T2 — `setup/add-locale.md` — 如何新增第 5 种语言（例如 ja、es）。
- `[ ]` H4.M2.G2.T3 — `setup/extend-csp.md` — 如何为新 CDN 扩展 CSP（目前分散在 security-headers.md + form-backend.md 里）。

### M4.3 — 技能 + 钩子扩展

#### G1 — 新的项目技能
- `[ ]` H4.M3.G1.T1 — `/audit-docs` 技能 — 一键跑整套文档审计，重现本 Horizon 的产出路径。
- `[ ]` H4.M3.G1.T2 — `/sync-cv` 技能 — 对比站点内容 vs. `res/cv/CV_Linlin_Jia_en.pdf` + `extra_info_work.md`，提示漂移。
- `[ ]` H4.M3.G1.T3 — `/plan-status` 技能 — 从 PLAN.md 打印所有 Horizon / Milestone / Goal 的聚合状态。

#### G2 — 钩子
- `[ ]` H4.M3.G2.T1 — PostToolUse 钩子：代码改动未伴随同批 UPDATES.md 更新时报警。
- `[ ]` H4.M3.G2.T2 — PostToolUse 钩子：PLAN.md 里 `[~]` 超 N 天未更新时报警。

---

## H5 — 职业外延触点

**Why:** 站点只是一条渠道；跨平台宣传才能让它被看到。

### M5.1 — 跨平台宣传
- `[ ]` H5.M1.G1.T1 — LinkedIn profile 同步（headline + featured links）。
- `[ ]` H5.M1.G2.T1 — Google Scholar 的 profile 字段与站点对齐（ORCID、affiliation、areas）。
- `[ ]` H5.M1.G3.T1 — Twitter / X / Bluesky bio 加站点链接。

### M5.2 — 讲座与活动
- `[ ]` H5.M2.G1.T1 — 下次讲座定了以后加 "Talks" 区。

### M5.3 — 招聘方对接
- `[ ]` H5.M3.G1.T1 — 加 "Hire me" CTA 卡变体，直接分享给招聘方。
- `[ ]` H5.M3.G2.T1 — A/B 测试：hero 用照片 vs. 插画。

---

## 本文件的维护规程

- 完成 Task 时：把 `[ ]` / `[~]` → `[✓]`，并在当日 `UPDATES.md` 里加一条。
  **不要删**已完成 Task — 它们是未来 Linlin / AI agent 理解决策的历史。
- 取消 Task 时：改为 `[x]` 并加一行 **Why cancelled:** 注释。
- 新增 Task 时：在对应 Goal 下取下一个空闲 `T<n>`。即使老编号已空，也不复用。
- Task 需要拆分时：原条目保留成简短 umbrella，新建若干 Task 在同 Goal 下用新 T 编号，原条目里链回新 T。
- **状态向上汇总**（所有子 T 完成 → Goal 完成 → Milestone 完成）：更新父级状态标记，并同步顶部 Master TOC 的 bullet。
