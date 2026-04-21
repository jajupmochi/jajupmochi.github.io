## 网站深度分析报告：jajupmochi.github.io

> 审计依据：`searchfit-seo` skill、Chrome DevTools Lighthouse、grep/read 静态扫描、Web 对标 3 个 ML 研究科学家个人站。
> 审计目标：对 ML Research Scientist 招聘官（Isomorphic Labs、DeepMind 类）的转化效率。

---

### 一、严重技术问题（P0 — 必须立刻修）

| # | 问题 | 位置 | 后果 |
|---|------|------|------|
| 1 | **Universal Analytics 已死** | `index_en.html:3995-3996` `ga('create', 'UA-113203183-2', 'auto')` | UA 在 2023 年 7 月已停服，所有访客数据没在收集。不知道有没有招聘官来过、停留多久、点了哪些链接。 |
| 2 | **完全没有 JSON-LD 结构化数据** | grep 全文 0 命中 `application/ld+json` | Google Knowledge Graph 不识别你为 Person 实体；ChatGPT/Perplexity/Claude 等 LLM 搜索引擎在 2026 年越来越依赖 schema.org 的 Person/ScholarlyArticle 标记来引用你 → AI 搜索时代严重失分。 |
| 3 | **无 robots.txt 和 sitemap.xml** | `localhost:8000/robots.txt` → 404；`/sitemap.xml` → 404 | 搜索引擎抓取效率低，子页面（about/research/projects/publications）不一定被发现。 |
| 4 | **busuanzi（不蒜子）中国统计** | `index_en.html:35` `<script async src="//busuanzi.ibruce.info/...">` | (a) HTTP 协议（不是 HTTPS）→ 浏览器警告，影响 `is-on-https` Lighthouse 评分；(b) 西方招聘官看到中文统计服务可能产生信任疑虑；(c) 服务在欧洲/北美往往慢或挂掉。 |
| 5 | **8 个 Lighthouse 无障碍失败** | Chrome DevTools 报告 | `frame-title`（Google Maps iframe 没 title）、`heading-order`（h2 直接跳到 h4）、`landmark-one-main`（缺 `<main>` 标签）、`button-name`、`link-name`、`link-in-text-block`、`select-name`、`is-on-https`。整页 0 个 `aria-label`。 |
| 6 | **OG 卡片不完整** | `index_en.html:11-15` | `og:image` 是相对路径 `images/photo.jpg` → 在 LinkedIn/Twitter 分享时不能解析；缺 `og:url`、`twitter:card`、`twitter:title`、`twitter:image`、canonical URL。 |

---

### 二、性能与依赖臃肿（P1）

| 项 | 现状 | 问题 |
|----|------|------|
| Google Fonts | 4 个字体家族（Inter, JetBrains Mono, Playfair Display, Orbitron）| 单页加载 4 个 woff2 家族 ≈ 200-400KB，且阻塞渲染。Karpathy/Olah/Beyer 都只用 1 个。 |
| 外部 CDN | 4 个不同域名（fonts.googleapis、cdnjs、jsdelivr、unpkg）| 每个 DNS 查找 + TLS 握手都是 RTT。 |
| 地图技术冗余 | Leaflet **加上** Google Maps iframe | 双地图栈共存。`index_en.html:29, 3079, 3284` —— 留一个就够。 |
| `canvas-confetti` | `index_en.html:32` 始终加载 | 仅"庆祝"用，应当 dynamic import。 |
| `images/photo.jpg` | 92KB JPEG，无 `width/height`，无 WebP | 引发 CLS（Cumulative Layout Shift），首屏体验差。 |
| 70+ 处 `@keyframes/animate` | grep 命中 70 | 对 `prefers-reduced-motion: reduce` 用户不友好（医学/健康偏好）。 |

---

### 三、SEO / 可发现性（P1）

- ❌ `<link rel="canonical">` 不存在 → 多个 URL 变体可能被 Google 视为重复内容。
- ❌ `meta name="keywords"` 还在用（`index_en.html:8`）—— 现代 SEO 已无意义，删除。
- ❌ 无 `<main>` / `<nav>` / `<article>` 等 HTML5 语义标签。
- ❌ 论文（Publications section, line 2829）没用 `ScholarlyArticle` schema —— Google Scholar 已经索引了你的论文，但你的网站列表与之没建立 JSON-LD 关联。
- ❌ 唯一 `<h1>` 是 "Linlin Jia, Ph.D."（line 2496）—— 标题中**没有 ML Research Scientist / Graph Neural Networks 关键词**，搜索"graph neural network postdoc Switzerland"很难命中你。

---

### 四、设计与独特性（P2）

#### 4.1 信息架构

13 个 section（hero, news, about, research, experience, projects, publications, services, skills, contact, personal-hero, personal-section, section）—— **信息密度极高**，但缺少招聘官扫描时的"钩子"。

对比：
- **Karpathy** 单页极简，只有时间线，但有 "Order of the Unicorn" 这种**记忆点**。
- **Olah** 写长篇可视化博客，本身就是作品集。
- **Beyer (lucasb.eyer.be)** 自嘲幽默 + Konami 彩蛋，让人记住。
- **Ruder** NLP-Progress 配套站，"我维护 X" 比 "我做了 X" 更难忘。

**你的网站缺一个让人离开后还能描述的"那个人是 _____"**。4 个主题、4 种语言、confetti 动画 —— 是**功能丰富**，但不是**独特记忆点**。

#### 4.2 主题/语言切换器

- 4 主题（ai-generated/academic/industrial/fancy）+ 4 语言（en/zh/fr/de）= 16 个组合，多数招聘官只会看默认那个。
- **建议**：默认就给招聘官看 `academic`（最专业），`fancy`/`industrial` 当作彩蛋藏起来；语言切换器**降级到 footer**（招聘官 99% 只读英文）。

#### 4.3 chatbot 用 native `alert()`

`index_en.html:3528` `function openChatbot() { alert('Chatbot coming soon! ...'); }` —— 既是 UX 反模式（阻塞 UI），又会触发 chrome-devtools dialog 卡住自动化（上次 verify-visual 就被它卡住）。

#### 4.4 单文件 4000 行

`index_en.html` 现在 4000 行，难以维护。考虑拆成 `<head>` partial、各 section partial（Jekyll `_includes` 或纯静态 SSI），但这是工程侧问题，不是招聘官能看到的。

---

### 五、独特性建议（差异化加分）

招聘官（尤其 Isomorphic Labs / DeepMind 类）每天看几十个个人站，让你脱颖而出的方向：

1. **"Live Citation Graph"** —— 你已经有 `data/citations.json`，可以用 D3 force-graph（`new_web_test.html` 已经是参考！）做一个**论文-合作者-引用网络的可交互图**，作为 hero 区域的背景。这正是 graph ML 研究者最自然的"作品即简历"。
2. **"Drug discovery sandbox"** —— 一个非常小的交互 demo：拖个 SMILES 字符串进去，画出分子图，跑你某个 GNN 的简化前向（甚至只是可视化 message-passing）。**3 秒钟告诉招聘官你做什么**，比 paragraph 强 10 倍。
3. **"/now" 页面**（参考 nownownow.com 风格）—— "当前正在 N-Banker 做 LLM agent + SNSF Bodmer 项目"，招聘官知道你**当前可专注于什么**。
4. **博客/notes 区**，每月发 1 篇短文 → 影响 GEO（Generative Engine Optimization），让 ChatGPT 引用你时有 "according to Linlin Jia's blog post on..." 的句式。

---

### 六、修改计划（按优先级）

#### P0 — 本周内（招聘官看到就会扣分）

| 任务 | 改动文件 | 工作量 |
|------|---------|--------|
| 把 UA-113203183-2 替换为 GA4 (G-XXXXXXXXXX) 或 Plausible/Umami | `index_en.html:3987-4000` | 30 min |
| 添加 JSON-LD `Person` schema（含 `alumniOf`, `jobTitle`, `knowsAbout`, `sameAs`→[GitHub, Scholar, ORCID, LinkedIn]）| `index_en.html` head 区 | 1 h |
| 创建 `robots.txt` + 自动生成的 `sitemap.xml` | 新文件 | 30 min |
| 修复 8 个 a11y 失败：iframe 加 title、补 `<main>`、heading h2→h3→h4、给所有 button/link 加 aria-label | `index_en.html` 多处 | 2-3 h |
| 加 canonical URL + Twitter Card + 绝对 og:image (`https://jajupmochi.github.io/images/photo.jpg`) + og:url | `index_en.html:11-15` | 15 min |
| 移除 busuanzi（`line 35` + `line 3070` 占位）| `index_en.html` | 5 min |

#### P1 — 一周内

| 任务 | 改动 |
|------|------|
| 字体精简：保留 Inter（正文）+ JetBrains Mono（代码）；删 Playfair Display + Orbitron（仅 fancy/industrial 主题用，可改 system font）| `line 18`, CSS `--font-*` 变量 |
| 二选一：删 Leaflet 或删 Google Maps iframe | `line 28-29, 3077-3090, 3284` |
| `images/photo.jpg` → `photo.webp` + `width/height` attr + `loading="eager"` (首屏) | `line 2518` |
| `canvas-confetti` 改为按需 dynamic import（点 ICPR 庆祝才加载）| `line 32, 2530` |
| `<h1>` 改为 "Linlin Jia, Ph.D. — ML Research Scientist · Graph Neural Networks · AI for Drug Discovery"（首屏 SEO 命中关键词）| `line 2496` |
| `openChatbot()` 的 `alert()` 改为 toast 或直接 `mailto:` | `line 3528` |
| 加 `prefers-reduced-motion: reduce` CSS 媒体查询关闭动画 | CSS 区 |

#### P2 — 两周内（差异化）

| 任务 | 价值 |
|------|------|
| 默认主题改 `academic`；其他主题作为彩蛋（footer 小切换器或 `?theme=fancy`）| 招聘官第一眼专业 |
| 语言切换器降级到 footer | 减视觉噪音 |
| 单元化 `index_en.html`（拆 head/section partials）| 可维护性 |
| **"Live Citation Graph"** 用 D3 力导向图（参考你已有的 `new_web_test.html`）做 publications section 的视觉化 | 独特记忆点 #1 |
| 删 `meta keywords` 等过时 SEO | 干净 |

#### P3 — 一个月内（长期资产）

| 任务 | 价值 |
|------|------|
| 加 `/blog` 或 `/notes`，承载技术写作（GEO 加分）| AI 搜索可见性 |
| `/now` 页面 | 招聘官即时上下文 |
| 一个交互 demo（GNN 在小分子上的 message passing 可视化）| 独特记忆点 #2 |

---

### 七、优先建议你立刻做的 3 件事

1. **P0-1（移除 UA + 加 GA4 或 Plausible）** —— 你这站是求职关键资产，**不知道招聘官有没有访问、看了多久**等于盲飞。
2. **P0-2（加 JSON-LD Person schema）** —— 2026 年 LLM 搜索时代，没有这个约等于在 ChatGPT 引用面前隐身。
3. **P2 "Live Citation Graph"** —— 只有这一项能让你**视觉上**与 karpathy/olah/ruder 区分开，且与你的研究方向（graph ML）天然一致。
