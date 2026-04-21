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
        - [G2 — Projects](#g2--projects) `[~]`
        - [G3 — News](#g3--news) `[ ]`
        - [G4 — Skills](#g4--skills) `[ ]`
        - [G5 — Stats](#g5--stats) `[ ]`
        - [G6 — 合作机构露出](#g6--合作机构露出) `[~]`
    - [M1.2 — SEO + AI 搜索可见度](#m12--seo--ai-搜索可见度) `[~]`
        - [G1 — Schema.org 覆盖](#g1--schemaorg-覆盖) `[✓]`
        - [G2 — 多语言可爬取](#g2--多语言可爬取) `[✓]`
        - [G3 — AI 搜索优化](#g3--ai-搜索优化) `[ ]`
        - [G4 — Head 清理（非 schema 类）](#g4--head-清理非-schema-类) `[ ]`
        - [G5 — 第二轮审计 P0 清理（链接卫生 + description 截短）](#g5--第二轮审计-p0-清理链接卫生--description-截短) `[✓]`
    - [M1.3 — 移动 / 无障碍 / 性能](#m13--移动--无障碍--性能) `[ ]`
        - [G1 — Lighthouse 全绿](#g1--lighthouse-全绿) `[✓]`
        - [G2 — 触控目标](#g2--触控目标) `[✓]`
        - [G3 — LCP / CLS / INP](#g3--lcp--cls--inp) `[✓]`
        - [G4 — 性能打磨（vibe 审计补漏）](#g4--性能打磨vibe-审计补漏) `[ ]`
        - [G5 — Figure 放大镜（点击放大）](#g5--figure-放大镜点击放大) `[~]`
    - [M1.4 — 招聘官记忆点差异化](#m14--招聘官记忆点差异化) `[ ]`
        - [G1 — Live Citation Graph](#g1--live-citation-graph) `[ ]`
        - [G2 — Redox prediction 交互 demo](#g2--redox-prediction-交互-demo) `[ ]`
        - [G3 — "/now" 页面](#g3--now-页面) `[ ]`
        - [G4 — 默认主题 → academic](#g4--默认主题--academic) `[ ]`
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

#### G2 — Projects
- `[~]` H1.M1.G2.T1 — 对照 `extra_info_work.md` 逐卡校对所有项目（对应 task #47）。
- `[ ]` H1.M1.G2.T2 — 新增 **LIULIAN platform** 卡（置顶；关键个人基础设施）。来源：extra_info_work.md §LIULIAN。
- `[ ]` H1.M1.G2.T3 — 新增 **PLANALYSER** 卡（2024-2025 Innosuisse），标注 NDA。
- `[ ]` H1.M1.G2.T4 — 新增 **Local Confidential Translator** 卡（个人 MVP）。
- `[ ]` H1.M1.G2.T5 — 调整 **N-Banker** 描述的中性措辞（使用 "key AI advisor" / "key AI contributor" 而非 CTO / CAIO）。
- `[ ]` H1.M1.G2.T6 — 按 extra_info_work.md 刷新 **OCTOPUSSY** + **Virtual Bodmer** 文案。
- `[✓]` H1.M1.G2.T7 — 新增 **GraphInk** 卡并带图（2026-04-21 V2 完成）。
- `[✓]` H1.M1.G2.T8 — 新增 **Graph Matching Algorithms (SNSF 2023-2024)** 卡并带图（2026-04-21 V2 完成）。

#### G3 — News
- `[ ]` H1.M1.G3.T1 — 新增 2025 年条目（GraphInk launch、LIULIAN 早期原型）。
- `[ ]` H1.M1.G3.T2 — 新增 2024 年条目（GraphInk SNSF 启动、Bodmer SNSF 立项）。
- `[ ]` H1.M1.G3.T3 — 新增 2026 年条目（InnoEx 2026 HK 上 N-Banker chatbot 展示）。

#### G4 — Skills
- `[ ]` H1.M1.G4.T1 — 新增 **agent-skills** 标签（`python-backend-creator`、`project-adaptor`）。
- `[ ]` H1.M1.G4.T2 — 新增 **vibe-coding 工具** 标签（Claude Code、Codex、Antigravity、OpenCode、GitHub Copilot）。
- `[ ]` H1.M1.G4.T3 — 新增 **agent / LLM 系统** 标签（CrewAI、Ollama、vLLM、RAG、GRPO、LoRA）。

#### G5 — Stats
- `[ ]` H1.M1.G5.T1 — 发表数量从 9 → 10（含 ICPR 2026 与修正后的 pubs）。
- `[ ]` H1.M1.G5.T2 — 自动拉取 Google Scholar 引用数据（目前手工；见 H2.M2.G2）。

#### G6 — 合作机构露出
> 2026-04-21 V5 根据 Linlin 指令 #5 加入。决策：单独的 "Partners" 卡片网格会分散机构识别度，且与 Research Areas / Experience 在视觉权重上冲突；把合作机构放进一句 About 段落，信号强、占地小。
- `[✓]` H1.M1.G6.T1 — `about.p5` 合作机构段（University of Basel、ETH Zürich、HES-SO Fribourg、University of Zürich、Inselspital Bern、AWS、N-Banker、China Pharmaceutical University），4 语种同步。
- `[✓]` H1.M1.G6.T2 — Virtual Bodmer 项目伙伴（Université de Genève、Fondation Martin Bodmer、Archaeo-Scientific Lab）写进 Scientific Collaborator 时间线描述而非 About — 属具体项目资源，不是长期合作。

### M1.2 — SEO + AI 搜索可见度

**终态：** 站点在 Google 正常被索引，`Linlin Jia` + `graph machine learning`
query 有排名；ChatGPT / Perplexity / Claude 被问到 graph ML 研究者时会引用本站。

#### G1 — Schema.org 覆盖
- `[✓]` H1.M2.G1.T1 — Person schema 含 `knowsAbout` + `affiliation`。
- `[✓]` H1.M2.G1.T2 — ScholarlyArticle JSON-LD（10 条）。
- `[✓]` H1.M2.G1.T3 — SoftwareSourceCode JSON-LD（graphkit-learn 等）。
- `[✓]` H1.M2.G1.T4 — WebSite + FAQPage + BreadcrumbList JSON-LD（2026-04-21 V2 完成）。

#### G2 — 多语言可爬取
- `[✓]` H1.M2.G2.T1 — hreflang `?lang=` URL 变体。
- `[✓]` H1.M2.G2.T2 — sitemap.xml 从 3 → 13 URL，并用 `xhtml:link` 声明 alternate。

#### G3 — AI 搜索优化
- `[ ]` H1.M2.G3.T1 — `llms.txt` 约定稳定后加上（目前还在草案阶段）。
- `[ ]` H1.M2.G3.T2 — 季度检查：被问 "tell me about graph ML researchers" 时，ChatGPT / Perplexity / Claude 是否引用本站？
- `[ ]` H1.M2.G3.T3 — 考虑 Mastodon / Bluesky 身份验证作为 AI grounding 信号。

#### G4 — Head 清理（非 schema 类）
> 来源：2026-04-20 vibe 审计 §三 SEO / 可发现性。
- `[ ]` H1.M2.G4.T1 — 删掉过时的 `<meta name="keywords">`（`index_en.html:8`）。现代搜索引擎已不参考，保留只是噪音。

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
- `[?]` H2.M1.G4.T4 — 首次手动触发（Actions → backup-analytics → Run workflow）。

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
- `[~]` H2.M3.G1.T1 — workflow 已存在；激活取决于 H2.M1.G4。

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
