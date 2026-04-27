# Mindstorm 01 — Design Audit & Magic-Graph Vision Set

> **日期 / Date:** 2026-04-27 (UTC)
> **状态 / Status:** ✅ Vision 已确定，进入执行阶段（D6.2 → D6.5）
> **触发 / Trigger:** Linlin 提出"现在的设计过于呆板，没有个性，没有创新性，没有吸引力" — 要求用 impeccable / gpt-taste / ui-ux-pro-max / huashu-design / shadcn / gsap / motion / lenis / three.js / d3 / visx / recharts / culori / radix-ui/colors / rive 等工具全面分析。
> **审计框架 / Framework:** [impeccable](.claude/skills/impeccable) `critique` + brand register reference
> **后续 / Series:** Mindstorm 02 将记录魔法 graph 主题的具体探索（在 D6.2-D6.5 完成、用户审阅之后开始）

---

## Master TOC

- [0. 审计背景](#0-审计背景)
- [1. AI Slop 判定](#1-ai-slop-判定最关键的诊断)
- [2. Nielsen 启发式评分](#2-nielsen-启发式评分满分-40)
- [3. 整体印象（一句话诊断）](#3-整体印象一句话诊断)
- [4. 当前做得好的（保留）](#4-当前做得好的保留)
- [5. P0 / P1 问题（按影响排序）](#5-p0--p1-问题按影响排序)
    - [P0-1: 字体反射选择 — Inter + Playfair Display 双 ban](#-p0-1-字体反射选择--inter--playfair-display-双-ban)
    - [P0-2: 缺失核心 metaphor — 你做 graph 但网站没有 graph](#-p0-2-缺失核心-metaphor--你做-graph-但网站没有-graph)
    - [P0-3: 卡片网格垄断了所有 section](#-p0-3-卡片网格垄断了所有-section)
    - [P1-1: 4 主题不是「设计」，是「逃避决定」](#-p1-1-4-主题不是设计是逃避决定)
    - [P1-2: 动画都是孤立 micro，没有 narrative 编排](#-p1-2-动画都是孤立-micro没有-narrative-编排)
    - [P1-3: Hero 是「证件照模板」](#-p1-3-hero-是证件照模板)
    - [P2 minor](#-p2-1-bento--card--section-的视觉重量没有-typography-hierarchy)
- [6. Aesthetic Lane 三个候选](#6-你独有的可以放大的资产aesthetic-lane)
- [7. 按工具分配的 actionable 改动表](#7-按工具分配的具体-actionable-改动)
- [8. 推荐执行路径（如果只能做 3 件事）](#8-推荐的执行路径如果只能做-3-件事)
- [9. 必须避免的几件事](#9-必须避免的几件事impeccable-absolute-bans)
- [10. 给 Linlin 的几个尖锐问题](#10-给你的几个尖锐问题)
- [11. Linlin 的 Vision 决定（2026-04-27）](#11-linlin-的-vision-决定2026-04-27)
- [12. 下一步执行计划](#12-下一步执行计划)

---

## 0. 审计背景

| 维度 | 当前状态 |
|---|---|
| **Register**（impeccable 框架分类） | **Brand**（设计 IS 产品 — 网站本身就是求职名片，访客的瞬间感受是交付物） |
| **核心受众** | ML Research Scientist 招聘官（10 秒扫描决定继续/关闭） |
| **核心叙事** | Graph ML / GNNs / 化学分子 / LLM agents / Bridging graph & kernel spaces |
| **目标行为** | "这个人有意思 → 看 publications/projects → 联系" |

---

## 1. AI Slop 判定（最关键的诊断）

> Impeccable 框架第一原则：*"If someone could look at this and say 'AI made that' without hesitation, it's failed."*

**判定结论：⚠️ 强 AI slop 信号。**

具体证据（按 impeccable 反射拒绝清单逐条核对）：

| 反射拒绝项 | 当前网站 | 严重度 |
|---|---|---|
| **Inter 作为 body 字体** | ✅ 是 — 在 ban list | 🔴 P0 |
| **Playfair Display 作为 display 字体** | ✅ 是 — 在 ban list | 🔴 P0 |
| **Identical card grids（卡片网格模板）** | ✅ 是 — Publications / Projects / Awards / Services / News 全都是「卡片网格」 | 🔴 P0 |
| **4 个 palette-swap 主题** | ✅ 是 — 同一布局换 4 套色 = "category-reflex check" 失败：每个主题都能被人一眼归类（学术 = 米色 + 蓝、industrial = 暗色 + 黄、fancy = 粉紫） | 🟠 P1 |
| **大圆角 icon 在每个 heading 上方** | ✅ 是 — 几乎每个 section 标题都用了 FontAwesome icon | 🟠 P1 |
| **Hero-metric template** | ✅ 局部命中 — Publications stats grid 的 8 个数字卡片是典型 SaaS cliché | 🟠 P1 |
| **Glassmorphism as default** | 部分 — 弹窗用了 backdrop-filter blur | 🟡 P2 |
| **Em-dash 滥用** | 已修了 EN/FR/DE，中文还有 | 🟢 已处理 |

**Category-reflex 测试**：让人凭"ML 研究者求职页"猜配色 → 学术蓝 / 米黄 / 简洁排版 → 你的 academic 主题完美命中训练数据反射。失败。

---

## 2. Nielsen 启发式评分（满分 40）

| # | 启发式 | 分 | 关键问题 |
|---|---|---|---|
| 1 | Visibility of System Status | 3 | 主题 / 语言切换有反馈，加载状态弱 |
| 2 | Match real world | 3 | 学术词汇正确，但 graph metaphor 完全没体现 |
| 3 | User control & freedom | 3 | 4 主题 + 4 语言给了选择权；但选择本身不创造价值 |
| 4 | Consistency | 3 | 卡片样式一致，反而成了问题（无视觉层次） |
| 5 | Error prevention | 3 | 表单 OK |
| 6 | Recognition over recall | 2 | Section 名都很标准，但用户记不住任何视觉锚点 |
| 7 | Flexibility & efficiency | 3 | Cmd+K 搜索是亮点 |
| 8 | **Aesthetic & minimalist** | **2** | **同质化严重，缺乏 POV** |
| 9 | Error recovery | 3 | OK |
| 10 | Help & documentation | 3 | 不需要太多 |
| **总分** | | **28/40** | **能用，但毫无记忆点** |

> 28 分意味着：**"标准学术模板水平"**。能下载简历、看到论文、知道你是谁。但访客离开后 **5 分钟就忘了**。这就是你说的"呆板、没个性"。

---

## 3. 整体印象（一句话诊断）

> **你建了一个非常"称职"的学术模板，但模板本身就是问题。**
>
> 内容是真材实料（4 个 grant、ICPR 2026、graphkit-learn 128⭐），但视觉表达把这些成就降级到了"和别人一样"的水平。访客拿不到关于「Linlin 这个人」的独有印象，只拿到关于「一个 ML 研究者」的通用印象。

**核心矛盾**：你做的是 **graph ML**（最视觉化的 ML 子领域之一），但你的网站完全没有任何 **graph 形态**。这是巨大的浪费。

---

## 4. 当前做得好的（保留）

1. **Howler 信封 + 明信片**（D5.N 刚完成）— 这是整站唯一有真正 POV 和工艺感的部分。哈利波特尖叫信的隐喻 + 蜡封 SVG 的 3D feSpecularLighting + 猫头鹰送信动画。**这是整站的"voice"，但被藏在弹窗里**。
2. **Hero 信号密度** — `graphkit-learn 作者 · SNSF + Innosuisse · ICPR 2026 · MSCA Alumni` 这一行 10 秒内传递 4 个可信度信号。文案对了。
3. **i18n 4 语言 + 4 主题的工程严谨度** — 罕见。

---

## 5. P0 / P1 问题（按影响排序）

### 🔴 P0-1: 字体反射选择 — Inter + Playfair Display 双 ban

- **问题**：Body 用 Inter，display 用 Playfair Display。Impeccable 把这两个都明确列在 reflex-reject list（"训练数据默认值"）。
- **后果**：字体本身没错，但组合 = AI 能立即生成的最大公约数 = 无个性。
- **修复方向**（需要选一个 voice 词组先）：
  - 选项 A — *"warm, mechanical, opinionated"*（符合 graph ML 研究者气质）：display 用 **Söhne** / **Neue Haas Grotesk Display** / **GT America** / **Söhne Mono**；body 用 **Söhne** / **Inter Tight**（不是 Inter）
  - 选项 B — *"editorial, considered, slightly antiquated"*：display 用 **Tiempos Headline** / **GT Sectra** / **Söhne Breit**；body 用 **Tiempos Text** / **Domaine Text**
  - 选项 C — *"technical, almost-Swiss, precise"*（fits graph ML）：display 用 **ABC Diatype** / **Neue Montreal** / **Söhne Schmal**；body 用 **Diatype Mono** for code / labels
  - 选项 D — *"hand-set, literary"*（与你的中文毛笔字体呼应）：display 用 **Söhne Buch** + 中文 **思源宋体 Heavy**；body **思源宋体 Regular** + **Tiempos Text**
- **中文字体**：Ma Shan Zheng（毛笔）已经选得对 — 是少数有 POV 的选择。可以保留作为 hero 名字签名 + 明信片。但 body 中文不能用毛笔，建议 **思源宋体 / 霞鹜文楷 GB** 替换当前 Noto Sans SC（同样反射）。

### 🔴 P0-2: 缺失核心 metaphor — 你做 graph 但网站没有 graph

- **问题**：你的 thesis 标题就叫 *"Bridging graph and kernel spaces"*，主项目叫 graphkit-learn，研究关键词第一个就是 GNN。但首屏到底部，**视觉上一根 graph edge 都没有**。
- **后果**：错过了网站和你研究身份合一的最大机会。
- **修复方向**（重投入）：
  - **方案 A — Graph as navigation**：用 **d3-force** 或 **three.js + @react-three/fiber** 做整个网站的导航 = 一张力导向图。Nodes = 每个 section / 每篇论文 / 每个项目；edges = 主题相关性（你已有 `data-priority` 字段）。Hover 高亮邻居子图；click 进入 detail view。`new_web_test.html` 你已经做过原型 — 这就是你想要的方向。
  - **方案 B — Subtle graph motif**：不做整站，但每个 section divider 用一段 force-graph 动画（10–20 nodes）；hero 背景叠一个 lazy-render 的 d3 force layout 浅色版本作为 ambient 背景（CSS `position: fixed; opacity: .08; pointer-events: none`）。
  - **方案 C — Edge-aware micro-interactions**：每张 publication/project card 的 hover 状态显示「与该论文有 X 条引用边连接到这些其他论文」的浮层；滚动到下个 section 时画一条 SVG path 连过去（gsap-scrolltrigger）。

### 🔴 P0-3: 卡片网格垄断了所有 section

- **问题**：Publications、Projects、Awards、Services、News、Skills 全部是「`grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))` + 同尺寸卡片」。结果是 **7 个 section 视觉权重一样**，访客无法分辨「哪个是必看的」。
- **后果**：违反 brand register 的核心原则 *"Single-purpose viewports. One dominant idea per fold, long scroll, deliberate pacing."*
- **修复方向**：
  - 给每个 section **不同的 layout 性格**：Publications 用 **editorial 列表**（左 thumbnail + 右长描述，不分卡）；Projects 用 **大尺寸 hero card + 小辅助卡** 的不对称布局；Awards 用 **timeline horizontal scroll**；Skills 用 **word cloud / radial chart**（你的 D3 word cloud 思路对）；News 用 **printed-newspaper column** 排版。
  - 用 **asymmetric grid** 打破对称感。impeccable brand 章节明确说："Don't default to centering everything. Left-aligned with asymmetric layouts feels more designed."

### 🟠 P1-1: 4 主题不是「设计」，是「逃避决定」

- **问题**：4 个主题各自命中 category-reflex（academic = 米色蓝、industrial = 暗色 + 橙、fancy = 粉紫…）。这是 SaaS 公司给用户的"主题包"思路，不是 brand site 的做法。Brand site 的 voice 应该是**唯一的、不可妥协的**。
- **后果**：你花了大量 CSS 维护 4 套配色，但每一套都是 generic 的。访客看到 3 个主题都觉得"嗯，是某个 ML 研究者的页面"。
- **修复方向**（最有勇气的做法）：
  - **删掉 4 主题，只留 1 个**。选一个有真正 POV 的色板 — 不是从 category-reflex 选。
  - 比如：**深苔藓绿 + 暖象牙白 + 一抹猩红强调色**（OKLCH(0.32 0.04 145) / OKLCH(0.96 0.012 80) / OKLCH(0.48 0.18 25)）— 像旧 Princeton 论文集封面。
  - 或：**纯白 + 纯黑 + 一种荧光（电青 #00ffd5）作为 graph edges 高亮色** — Klim/Vercel 路线但用一个非常规荧光色锚定身份。
  - 或：**整站 drenched in oxblood 暗红**（呼应你的 Howler 信封）+ 米白文字 — 极强的 voice，是 brand register 允许的。
- **若坚持多主题**：把它们重新定位成 *"4 种阅读模式"*（Reader / Presenter / Code / Print），不要叫 ai/academic/industrial/fancy（这些名字本身就 reveal 了 reflex）。

### 🟠 P1-2: 动画都是孤立 micro，没有 narrative 编排

- **问题**：Ticker 在 marquee、信封在抖、Postcard 有翻折/盖章/猫头鹰 — 但这些是**孤立的小动作**。整个 page-load 没有一段 orchestrated 的 cinematic entrance。Scroll 滚动是 native scroll，没有 lenis 的丝滑。Section 之间没有 transition。
- **后果**：访客感受到的是"页面有几个动来动去的东西"，不是"这个网站讲了一个故事"。
- **修复方向**：
  - **Page-load choreography**（gsap-timeline）：5–8 秒的 hero 入场。先黑屏 → 一个 graph node "Linlin" 浮现 → 4 条 edges 长出来连到 graphkit-learn / SNSF / Innosuisse / ICPR 2026 → 整个 graph 旋入背景，hero 文字 stagger fade in（用 quart-out exponential ease，**不要 bounce**）。
  - **Lenis 平滑滚动** + **gsap-scrolltrigger** 让滚动驱动 graph 局部高亮（滚到 publications，graph 中所有 paper nodes 同步高亮）。
  - **Section transitions** = 一段 SVG path 从上一节 dispatch 到下一节，0.6s `cubic-bezier(0.16, 1, 0.3, 1)`。
  - 复用 **motion** library 做 spring-based transitions（Howler 抖动可以保留，但其他元素不要 spring）。
  - 保留 `prefers-reduced-motion` 退化到瞬时。

### 🟠 P1-3: Hero 是「证件照模板」

- **问题**：左签名 + 右圆形头像 + 一行 tagline + 几个 badge — 这是 LinkedIn 简化版。完全没有 *"opening move"*。
- **修复方向**：
  - **方案 A — 一个超大 typographic hero**：屏幕宽 90vw 的 `BRIDGING GRAPHS & KERNELS` 字打满首屏，下方一句小字 *"Linlin Jia · ML researcher · Bern"*，头像移到 about section。Klim 字体规格页风格。
  - **方案 B — Live graph hero**：满屏 d3-force / three.js 力导向图持续呼吸，节点是「graph」「kernel」「molecule」「LLM」「Switzerland」等关键词，鼠标 hover 边会发光。访客理解：哦，这个人做这个。
  - **方案 C — Code hero**：屏幕中间一段实时打字的 Python，`from graphkit_learn import GraphKernel` … 配合 syntax highlighting，5 秒后淡入名字。Tech-brand 经典手法。
  - **方案 D — 双语漂浮**：贾林林（毛笔大字）+ Linlin Jia（拉丁小字）非对称排布，背景是 一段 graph edge 的 SVG 蜿蜒走过文字间隙。

### 🟡 P2-1: Bento / Card / Section 的视觉重量没有 typography hierarchy

- 所有 section title 都是 `<h2>` + 同样的 icon + 同样的字号。没有 ≥1.25 的 scale ratio。impeccable 明确要求"Hierarchy through scale + weight contrast"。
- 修复：Hero / About → fluid `clamp(3rem, 8vw, 8rem)`；Section titles → 不要 icon，单色大字 `clamp(1.5rem, 3vw, 3rem)`，让排版本身做层级。

### 🟡 P2-2: 信息建筑：Above-the-fold 密度过高

- Hero + ticker + Open to Work 三个组件叠在首屏，每个都喊"看我"。Cognitive load checklist 失败 4+ 项 = critical。
- 修复：Hero 独占首屏。Ticker 移到第二屏。Open to Work 单独一个 viewport。

---

## 6. 你独有的、可以放大的资产（Aesthetic Lane）

按 impeccable brand register 的"name a real reference"原则，给你 3 个具体可走的设计方向（每个都标注了与你身份的契合点）：

### Lane A — 「Living Graph」(我最推荐)

- **参考**：Distill.pub + Obsidian graph view + Karpathy.ai 的极简
- **Voice 词**：*precise, mathematical, alive*
- **核心 move**：整站导航 = 一张力导向图（d3-force + three.js）。Hover 节点显示 5 条最强连接。Click 节点滑入 detail panel。
- **字体**：Diatype Mono + Söhne Breit
- **配色**：纸张白 + 墨水蓝 + 一种稀有荧光（如 OKLCH(0.85 0.18 165) 「电青」）
- **跟你身份对齐度**：⭐⭐⭐⭐⭐（你做 graph、你做 kernel、你做 force methods）
- **可用工具**：d3-force / three.js + @react-three/fiber + @react-three/drei / visx / lenis
- **风险**：实现成本最高；移动端需要替代视图

### Lane B — 「Lab Notebook」

- **参考**：1970s 实验室手稿 + Maggie Appleton illustrated essays + Acko.net (Steven Wittens)
- **Voice 词**：*hand-set, considered, slightly worn*
- **核心 move**：整站像一本被使用过的活页实验本。手绘 SVG 分子结构、graph 涂鸦、咖啡渍水印（PNG texture overlay）、margin notes（你已经有 Caveat 字体）。
- **字体**：Söhne Buch（display）+ Tiempos Text（body）+ Caveat / Ma Shan Zheng（margin notes）
- **配色**：旧纸黄 + 红墨 + 蓝墨（cyanotype 风）
- **跟你身份对齐度**：⭐⭐⭐⭐（学术 + 化学 + 跨语言）
- **可用工具**：plain SVG / GSAP / Rive（如装则可做手绘动画）
- **风险**：维护成本（需要画图）；可能显得不够"工程化"

### Lane C — 「Brutalist Spec Sheet」

- **参考**：Klim Type specimen + 苏黎世风格 + Dia Studio
- **Voice 词**：*structured, fast, unsentimental*
- **核心 move**：严格 12-col grid 始终可见、超大 number 排版、全大写 metadata、严格左对齐、no rounded corners、no shadows、no gradients。
- **字体**：单家族 — ABC Diatype（mono + sans + display）
- **配色**：纯白 + 纯黑 + 一个 alarm 色 (oxblood #6B0F1A)
- **跟你身份对齐度**：⭐⭐⭐（不直接关联 graph，但展现 "my work is rigor"）
- **可用工具**：纯 CSS Grid / lenis 平滑滚动
- **风险**：和 Vercel/Linear 同质化；可能显得冷漠

---

## 7. 按工具分配的具体 actionable 改动

| 改动 | 工具 | 影响 | 难度 |
|---|---|---|---|
| Hero 改 typographic + force-graph 背景 | **three.js + drei**, GSAP timeline | 🔴 极大 | 高 |
| 整站导航变 graph view | **d3-force**, motion library | 🔴 极大 | 高 |
| 平滑滚动 + scroll-triggered transitions | **lenis** + gsap-scrolltrigger | 🟠 大 | 中 |
| Publications 改 editorial list（非卡片） | 纯 CSS | 🟠 大 | 低 |
| Skills section 改 D3 radial chart | **d3** | 🟠 中 | 中 |
| Award stats 改 recharts/visx 可视化 | **recharts** 或 **visx** | 🟡 中 | 低 |
| 替换 Inter + Playfair → 新字体 voice | Google Fonts / Pangram Pangram | 🔴 极大 | 低 |
| OKLCH 重做配色 | **culori**（直接调色） | 🔴 极大 | 中 |
| Section transitions（SVG path animate） | **motion** library + GSAP | 🟠 大 | 中 |
| 删 3 个主题，只留 1 个有 POV 的 | 删 CSS | 🔴 极大 | 低 |
| 引入 Rive 做手绘 lab-notebook 动画 | **rive**（需安装） | 🟡 中 | 中 |
| Color palette via radix-ui/colors | **radix-ui/colors** | 🟡 小 | 低 |

---

## 8. 推荐的执行路径（如果只能做 3 件事）

按 **影响 / 难度** 比排序：

1. **【最高 ROI · 1 天】字体 + 配色重构**
   - 替换 Inter + Playfair 为 Söhne + Diatype（或选一个其他 voice）
   - 删 3 个 theme，只留 1 个有 POV 的（建议 Lane A 的「纸白 + 墨蓝 + 电青」）
   - 用 culori 把所有色值改成 OKLCH
   - 即刻提升 AI slop 评分从 P0 → P2

2. **【最高叙事价值 · 3-5 天】Hero 改 force-graph + 整站铺一条 graph edge 主线**
   - Hero 满屏 three.js 或 d3-force 力导向图（Lane A 核心）
   - 每个 section 之间用 SVG path 连接（gsap-scrolltrigger 驱动）
   - 把 graphkit-learn / Howler 信封 / 明信片 都纳入这条线
   - 即刻把"graph ML researcher"从文字转换为视觉身份

3. **【最高内容价值 · 2 天】Publications + Awards 重排**
   - Publications 改 editorial 列表布局（左小图 + 右长描述，不要卡片）
   - Awards 改 horizontal timeline scroll
   - Stats 不要 8 个卡片，改 1 张 recharts radar / radial chart

剩下的（micro animations、新 components、整站 graph navigation）可以排在 D6 / D7 batch。

---

## 9. 必须避免的几件事（impeccable absolute bans）

执行任何重做时，禁止出现：

1. ❌ Side-stripe borders（左侧 3px 彩色条作为强调）
2. ❌ Gradient text（任何 `background-clip: text`）
3. ❌ Glassmorphism 作为默认（弹窗外的任何 blur backdrop）
4. ❌ Hero metric template（big number + small label + supporting stats）— Publications stats grid 触犯
5. ❌ Modal as first thought（Welcome 弹窗其实违反，应该 inline 进首屏的 ambient 区域）
6. ❌ Bounce / elastic easing（你 Howler 抖动可以，因为是物理叙事；其他都用 quart-out）
7. ❌ 中文还有 em dash（之前清理英文 / 法 / 德了，中文要再过一遍）
8. ❌ All-caps body copy

---

## 10. 给你的几个尖锐问题

按 impeccable critique 框架，最后留几个值得自己想清楚的问题：

1. **如果只能保留 1 个主题，是哪个？为什么？** — 4 个主题等于没有主题。
2. **访客离开 5 分钟后，你希望他记住的 1 个视觉印象是什么？** — 如果答不出，说明没有 voice。
3. **你的 graph ML 身份能否变成网站本身？** — 不是图标和关键词，是 layout / navigation / motion 的形态。
4. **Howler 信封 + 蜡封明信片是整站最好的部分。如果整站都达到这个工艺水平，会是什么样？** — 这就是你的 ceiling。

---

## 11. Linlin 的 Vision 决定（2026-04-27）

针对上述 10 节中的开放问题与 Aesthetic Lane 选择，Linlin 给出的方向：

### 视觉主题（核心 voice）

> **整个页面是一个像哈利波特那样的动态魔法实验手稿。**
>
> - 内容可以是 **2D 风格伪 3D**
> - 可以有动画、可以有 3D
> - 可以使用 **Living Graph 模式** 展现具体内容、交互与连接

这是 Lane A（Living Graph）+ Lane B（Lab Notebook）的融合 — 一个"魔法版 Living Graph"或"会动的实验手稿"。

### 视觉印象（5 分钟后访客应该记住什么）

> **"一个轻松就能用 graph 构建世界的 graph ML 魔法师"**

= 对应"What single visual impression do you want them to keep" 问题的答案。这个 tagline 同时锚定了：
- Subject（graph ML researcher）
- Verb（轻松构建）
- Object（世界）
- Persona（魔法师，不是 PhD / engineer / researcher 这种平淡身份）

### 工艺标准（quality bar）

> **以 Howler 信封 + 蜡封明信片的工艺水平作为今后所有设计的标准。**

= 对应"如果整站都达到这个工艺水平会是什么样"问题的答案。具体含义：
- 每个组件都有真实材质感（feSpecularLighting / feTurbulence / 多层 SVG）
- 每个动作都有叙事（不只是 micro-interaction，而是 mini-story）
- 每个文案都有 voice（不只是 label，而是带感情）
- 每段动画都有时序设计（不是孤立 transition，而是 choreography）

### 主题策略

- **保留 1 个 academic 主题作为 fallback**（给保守招聘官 / 想下 PDF 简历的用户 / Reader Mode 用户）
- **删除 ai-generated / industrial / fancy 三个主题**（释放维护成本，避免 reflex）
- **新增 1 个 magic-graph 主题作为 primary default**（从头设计，命名待定 — 候选：`grimoire` / `manuscript` / `spellbook` / `ouroboros`）

### 短期执行优先级

> **(c) 先动字体、色彩等优化现有风格 → (d) 完成后展示重构主题给 Linlin 审阅 → 之后才开始魔法 graph 主题的设计实现**

---

## 12. 下一步执行计划

按 Linlin 答复 (a)-(d) 拆为两个 batch：

### Batch D6 — 现有主题瘦身 + 字体/色彩重构（本次会话内执行）

| 任务 | 说明 | 状态 |
|---|---|---|
| **D6.1** Mindstorm 文档保存 | 本文件 | 🟢 进行中 |
| **D6.2** 删除 3 主题 | 移除 ai / industrial / fancy 的 HTML dropdown 项、CSS 规则、JS setTheme 分支 | ⏳ 排队 |
| **D6.3** 字体替换 | Inter + Playfair Display → 选一组非反射字体（保留 Ma Shan Zheng for hero accent；body Chinese 改用 LXGW WenKai 或思源宋体） | ⏳ 排队 |
| **D6.4** OKLCH 配色重构 | 用 culori 把 academic 主题改成 Restrained 策略：tinted parchment + tinted ink + 一个 ≤10% 强调色 | ⏳ 排队 |
| **D6.5** 视觉验证 + before/after 截图 | chrome-devtools 抓 hero / about / awards / publications / projects 各一张截图，对比展示给 Linlin 审阅 | ⏳ 排队 |

### Batch D7 — Magic-Graph 主题从头设计（下次会话或本会话延续）

待 D6.5 通过 Linlin 审阅之后开始。预期内容：
- 新主题命名 + voice 词 3 个
- 字体方案（display / body / hand / mono / Chinese）
- 配色方案（OKLCH，Drenched 或 Committed 策略）
- 核心 metaphor 落地：spellbook background texture / quill stroke decorations / glowing graph edges / parchment paper layers / ambient living graph
- 关键组件重设计：Hero / About / Publications / Projects / Howler trigger（可能转成「咒语书」）
- 动画编排：page-load choreography + scroll-driven ambient graph
- 工具栈：lenis + gsap timeline / scrolltrigger + d3-force + three.js + motion + culori
- 单独 mindstorm 文档：`docs/vibe/mindstorm-02-magic-graph-theme.md`

### Batch D8+ — 实施（再之后）

待 D7 magic theme 设计被 Linlin 审阅通过后，分阶段实施：
- **D8** Hero magic 重做
- **D9** 整站 ambient living graph 背景
- **D10** Section transitions / SVG path choreography
- **D11** Publications / Projects / Awards 重新排版（不再是 card grid）
- ... 视进展决定

---

## 附录：参考资源

- [Winners of the Best Personal Academic Websites Contest 2025](https://theacademicdesigner.com/2025/winners-of-the-best-personal-academic-websites-contest-2025/)
- [Lil'Log (Lilian Weng)](https://lilianweng.github.io/)
- [Andrej Karpathy blog](http://karpathy.github.io/)
- [Awwwards · Best Portfolio Websites](https://www.awwwards.com/websites/portfolio/)
- [100 Best Designer Portfolio Websites of 2026 (Muzli)](https://muz.li/blog/top-100-most-creative-and-unique-portfolio-websites-of-2025/)
- [Portfolio design trends for 2026 (Envato)](https://elements.envato.com/learn/portfolio-trends)
- [Sites for Scholars · Academic / research websites portfolio](https://www.sitesforscholars.com/portfolio/)
- impeccable skill 框架：`/home/linlin/.claude/skills/impeccable/reference/{critique,brand,motion-design,typography,color-and-contrast,heuristics-scoring}.md`

---

> **下一个 mindstorm 文件**：`docs/vibe/mindstorm-02-magic-graph-theme.md`（待 D6.5 完成 + Linlin 审阅通过后撰写）
