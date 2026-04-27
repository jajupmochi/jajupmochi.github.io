# Mindstorm 02 — 麻瓜之书 / 魔法师之书 主题设计

> **日期 / Date:** 2026-04-27 (UTC)
> **状态 / Status:** 🟡 设计阶段 — 等 Linlin 审阅本 mindstorm 后进入 D8+ 实施
> **承接自 / Follows:** [mindstorm-01-design-audit.md](./mindstorm-01-design-audit.md)
> **核心定位 / Core voice:** **图表示学习人工智能魔法学徒 / Graph Representation Learning AI Magic Apprentice**
> **审计框架 / Framework:** impeccable critique + brand register；motion-design + typography + color-and-contrast 子参考已加载

---

## Master TOC

- [0. 关键决定（Linlin 在本轮提出）](#0-关键决定linlin-在本轮提出)
- [1. 视觉参考与世界观源头](#1-视觉参考与世界观源头)
- [2. 双主题命名与默认行为](#2-双主题命名与默认行为)
- [3. 身份升级：图表示学习人工智能魔法学徒](#3-身份升级图表示学习人工智能魔法学徒)
- [4. Living Graph 设计 — 两个版本](#4-living-graph-设计--两个版本)
    - [4.A 我原本的设计：全页 force-graph（重）](#4a-我原本的设计全页-force-graph重)
    - [4.B Linlin 的改良：Edge-on-Engagement（轻 + 优雅）](#4b-linlin-的改良edge-on-engagement轻--优雅)
    - [4.C 两个方案对比与最终建议](#4c-两个方案对比与最终建议)
- [5. 世界架构：魔法书 + 画壁 + 地区切换](#5-世界架构魔法书--画壁--地区切换)
- [6. Day / Night 设计 token（OKLCH）](#6-day--night-设计-tokenoklch)
- [7. 字体系统升级](#7-字体系统升级)
- [8. 各模块的空间化设计（13 个房间 / 场景）](#8-各模块的空间化设计13-个房间--场景)
    - [8.1 Hero — 阁楼书房（apprentice's attic study）](#81-hero--阁楼书房apprentices-attic-study)
    - [8.2 About Me — 卧室（bedroom）](#82-about-me--卧室bedroom)
    - [8.3 Skills + Research Outline — 天花板星空（celestial ceiling）](#83-skills--research-outline--天花板星空celestial-ceiling)
    - [8.4 Publications — 书架（bookshelf wall）](#84-publications--书架bookshelf-wall)
    - [8.5 Projects — 实验台（alchemist's workbench）](#85-projects--实验台alchemists-workbench)
    - [8.6 Awards — 获奖墙（award wall）](#86-awards--获奖墙award-wall)
    - [8.7 Experience — 时光走廊画壁（painted wall corridor）](#87-experience--时光走廊画壁painted-wall-corridor)
    - [8.8 News — 报纸架（newspaper rack）](#88-news--报纸架newspaper-rack)
    - [8.9 Talks — 演讲台（lectern）](#89-talks--演讲台lectern)
    - [8.10 Visit Map — 大幅卷轴地图（rolled parchment map）](#810-visit-map--大幅卷轴地图rolled-parchment-map)
    - [8.11 Contact + Howler — 信件房（letter room）](#811-contact--howler--信件房letter-room)
    - [8.12 External Links — 动物间（companion animal room）](#812-external-links--动物间companion-animal-room)
    - [8.13 Robot Guide — 小助手机器人](#813-robot-guide--小助手机器人)
- [9. 风格变换 — Zootopia 式分区](#9-风格变换--zootopia-式分区)
- [10. 技术栈映射](#10-技术栈映射)
- [11. 性能预算 / 移动端 / 无障碍降级](#11-性能预算--移动端--无障碍降级)
- [12. 分阶段实施路线（D7 → D∞）](#12-分阶段实施路线d7--d)
- [13. 待 Linlin 决定的开放问题](#13-待-linlin-决定的开放问题)
- [14. 参考资源](#14-参考资源)

---

## 0. 关键决定（Linlin 在本轮提出）

来自 2026-04-27 第二轮 mindstorm 的补充思考：

| # | 决定 | 影响 |
|---|---|---|
| **D-A** | 主题命名：**「麻瓜之书」**（fallback）+ **「魔法师之书」**（primary） | 文化母语 + 自嘲 + HP 隐喻但不抄袭，命名层面就有 voice |
| **D-B** | **不要直接抄袭哈利波特的视觉风格** — 借鉴而非复制 | 禁用 Hogwarts 元素、Marauder's Map clone、house colors；改用通用魔法手稿 + 中国画中世界融合 |
| **D-C** | 身份从"魔法师"改为 **「图表示学习人工智能魔法学徒」** | 保留谦逊（学徒 vs 大师）；招聘官读起来更可信；中文 Voice 更纯粹 |
| **D-D** | Living Graph 走 **edge-on-engagement** 局部模式（不是全页 force-graph） | 大幅降低实现成本；保留 graph 隐喻作为"被召唤的咒语"而非环境装饰 |
| **D-E** | 浑然天成 + 风格迥异：**魔法书 + 画中世界（画壁、清明上河图、乾坤图）** 混搭 | 单一世界框架（魔法书）下允许各模块有自己的视觉方言（中国画、欧洲油画、报纸、机械、像素游戏…） |
| **D-F** | 各模块场景化：**卧室、天花板星空、书架、实验台、画壁走廊、报纸架、动物间、机器人助手** 等 | 整站从"长滚动文档"升级为"可漫游的住所" |
| **D-G** | 工艺标准沿用 D5.N Howler / 蜡封明信片的高度 | 每个组件都要有真实材质 + 叙事 + voice |

---

## 1. 视觉参考与世界观源头

为了避免抄袭哈利波特，明确我们的灵感来源（皆**非** HP 直接元素）：

### 西方手稿 / 魔法书传统

- **凯尔斯之书 (Book of Kells)** — 7 世纪爱尔兰福音书，金箔 + 复杂藤蔓装饰字母
- **贝里公爵的豪华时祷书 (Très Riches Heures du Duc de Berry)** — 中世纪手抄本，分月分主题的微型图
- **Voynich Manuscript** — 神秘文字 + 植物 / 星象 / 解剖图，未解之谜带来的"魔法感"
- **Codex Seraphinianus**（1981）— 现代版伪手稿，超现实生物 + 虚构语言
- **Studio Ghibli《哈尔的移动城堡》咒语本** — 卡尔西法 + 翻动的页面 + 红铜墨蓝色调

### 中国画中世界传统

- **清明上河图 (Zhang Zeduan, 北宋)** — 世博会"智慧河"做了 130m × 6.3m 的动态数字版本（Crystal CG）；故宫博物院做了 36m × 4.8m 的虚拟乘船体验。**关键启发：** 静态画面 + 局部点击 → 该角色 / 物件开始动起来。
- **千里江山图 (王希孟, 北宋)** — 山水卷轴，色彩极强（青绿山水）。横向滚动展开。
- **韩熙载夜宴图 (顾闳中, 五代)** — 同一空间不同时刻的连续场景（电影分镜）
- **聊斋志异《画壁》** — 朱孝廉跌入墙上的画里。**关键启发：** 墙不是墙，是入口；画里有完整世界。
- **《哪吒之魔童降世》乾坤图** — 二维卷轴里装 3D 世界
- **《刺客信条》中国朝代设定研究** — 现代游戏对中国古风的考据演绎

### 互动设计参考

- **[Bruno Simon (bruno-simon.com)](https://bruno-simon.com/)** — three.js + cannon 物理引擎，开车在 3D 世界里探索作品集。Awwwards 级别。**警告：** 全 3D 太重；我们只做 2D 伪 3D + 局部 R3F。
- **[Maggie Appleton (maggieappleton.com)](https://maggieappleton.com/)** — illustrated digital garden，手绘视觉锚点 + 分层结构（essays / notes / patterns / library / anti-library）。**关键借鉴：** 手绘风格 + 有结构的内容分层。
- **[Robby Leonardi (rleonardi.com)](https://www.rleonardi.com/interactive-resume/)** — interactive sidescroller resume，像素游戏。**关键借鉴：** 简历可以是空间叙事。
- **[Distill.pub](https://distill.pub)** — 交互式 ML 论文，慢思考 + 高质量动画
- **[Bret Victor (worrydream.com)](http://worrydream.com)** — 直接操纵理念，每个图都可以拨拉
- **[Acko.net (Steven Wittens)](https://acko.net)** — 数学可视化交错文字
- **[The Pudding (pudding.cool)](https://pudding.cool)** — 长文 + 数据驱动叙事
- **[Patatap (patatap.com)](https://patatap.com)** — 声音 + 视觉的最简交互

### 灵感汇总成"我们的世界"

> **一位图表示学习的 AI 魔法学徒，在伯尔尼老城旁的阁楼书房里，研究图与核空间的炼金术。她的研究笔记本是一本会动的魔法书（grimoire），翻开时每一页可以是欧洲手稿、可以是中国画卷、可以是一篇打开的报纸、可以是星空。书里住着她的研究伙伴们 — 各种动物形态的链接、一个小助手机器人、一只送信猫头鹰、一封冒火的尖叫信。访客是被书邀请进来的客人，可以漫游各个房间。书里所有内容之间有图状的连接，但这些连接平时是隐藏的 — 当客人凝视某个东西超过 5 秒，相关的连接就会从那个东西边缘长出来，像藤蔓（白天）或电路（夜晚），指向相关的内容。**

---

## 2. 双主题命名与默认行为

### 命名

| Theme key | 中文名 | English | data-theme attr | 角色 |
|---|---|---|---|---|
| `grimoire` | **魔法师之书** | The Grimoire | `data-theme="grimoire"` | 主默认主题、夜间、Drenched 配色、所有动画激活、机器人助手活跃 |
| `muggle` | **麻瓜之书** | The Muggle Book | `data-theme="muggle"` | 备用 fallback、白天、Restrained 配色（D6 已建）、动画极简、招聘官 / 高对比度 / 移动慢网友好 |

> **建议：** `grimoire` 是默认（首次访客直接进入魔法版）。给招聘官 / Reader Mode 提供清晰可见的"切换到 muggle"控件。

### 主题切换的视觉隐喻

不要做平庸的"sun ↔ moon"小图标。改用 **桌上的蜡烛**：

- **Day mode**: 桌上一根**未点燃的蜡烛**作为切换控件，悬停浮出"点亮"提示
- 点击点蜡烛 → 1.5s 转场动画：
  - 窗外阳光淡出 → 月光淡入
  - 羊皮纸背景渐变到深夜墨色
  - 字符颜色对应反转
  - 桌上墨水瓶里浮起萤火虫（粒子）
  - 书架上的书脊开始微弱荧光
  - 墙上挂的 graph 边从"水墨藤蔓"变为"电路荧光"
  - 远处 Howler 信封从静态变摇动
  - 机器人助手醒来眨眼
- **Night mode**: 切换控件变为蜡烛的**火焰**，悬停"熄灭"，点击反向转场

### 持久化

- localStorage `theme` = `grimoire` | `muggle`
- 默认为 `grimoire`
- 首次访客：直接 grimoire，但 5 秒内若鼠标快速移到右上角控件区，弹出一句话引导："要看安静版本？点蜡烛熄灭" / "Prefer the calm version? Snuff the candle"

---

## 3. 身份升级：图表示学习人工智能魔法学徒

| 元素 | 旧 | 新 |
|---|---|---|
| 中文头衔 | 机器学习研究科学家 / 博士后 | **图表示学习人工智能魔法学徒** |
| 英文头衔 | Machine Learning Research Scientist / Postdoc | **Graph Representation Learning · AI Magic Apprentice** |
| Tagline 词组 | graphkit-learn 作者 · SNSF + Innosuisse · ICPR 2026 · MSCA Alumni | 同（这一行不动 — 已经够好） |

新身份 voice 解析：

- **图表示学习** = 技术准确（不只是"graph ML"，是更精确的子领域）
- **人工智能** = 招聘官关键词雷达可命中
- **魔法学徒** = 谦逊（不是 master / wizard）+ 进行中的（recruiter loves potential）+ 与世界观一致

**Hero 主标题候选**（待 Linlin 选）：

| 选项 | 中文 | English | 气质 |
|---|---|---|---|
| A | 贾林林博士 / 图表示学习人工智能魔法学徒 | Linlin Jia, Ph.D. / Graph Representation Learning · AI Magic Apprentice | 直接、信息密度高 |
| B | 一位图魔法学徒 / 在伯尔尼炼金图与核 | An apprentice of graph magic / brewing graphs & kernels in Bern | 文学、富叙事 |
| C | 图表示学习 · 人工智能 · 魔法 / 贾林林 | Graph Representation Learning · AI · Magic / Linlin Jia | Klim 字体规格页风 |
| D | 我用图给世界编码 / 贾林林 · 图表示学习 AI 学徒 | I encode the world with graphs / Linlin Jia · Graph ML AI Apprentice | 第一人称、动作动词 |

我的推荐：**A 是 muggle 默认，D 是 grimoire 默认**（双主题不同 hero 文案，强化 voice 差异）。

---

## 4. Living Graph 设计 — 两个版本

### 4.A 我原本的设计：全页 force-graph（重）

> Linlin 让我先列出来作为对比。这是 mindstorm-01 推荐的 Lane A 的具体落地。

- **核心**：整个网站的导航 = 一张力导向图（d3-force + three.js）
- **节点 (~80-150 个)**：
  - 每个 section（hero / about / publications / projects / awards / ...）
  - 每篇 publication
  - 每个 project
  - 每个 grant
  - 每个 collaborator
  - 几个外链 anchor（GitHub / Scholar / etc.）
- **边 (~200-400 条)**：
  - Section 包含 → 子节点
  - 同 venue / 同 year / 同 author 的 publications
  - 同 grant funded 的 projects
  - 同 institution 的 collaborators
  - 关键词 co-occurrence（hand-curated）
- **布局**：d3-force 力导向，节点 mass 与重要性成正比，graphkit-learn / SNSF / 论文等是大节点
- **2 视图**：
  - **Galaxy view** (R3F + three.js，sphere camera 360°)：缩到最远，看整张图旋转
  - **Region view** (d3-force 2D)：缩到某个 section 的子图，可读
- **导航**：
  - Click 节点 → 相机滑过去，detail panel 滑入
  - Drag 节点 → 物理推动周围节点
  - Pinch zoom → galaxy ↔ region 切换
- **背景**：纯黑或深星空
- **优点**：极致 distinctive，与 graph ML 身份完全融合，Awwwards 候选水准
- **缺点**：
  - 实施成本极高（4-8 周）
  - 移动端基本废掉（需要完全替代视图）
  - Cognitive load 高 — 访客容易"迷路"
  - 招聘官 10 秒扫描完全失败（找不到 publications 在哪）
  - 维护成本高（每加一篇论文都要更新边数据）
  - SEO 几乎归零（搜索引擎抓不到内容）
- **`new_web_test.html` 你已有原型** — 可作起点

### 4.B Linlin 的改良：Edge-on-Engagement（轻 + 优雅）

> 这是 Linlin 本轮提出的方案。我读完后 — **完胜我的原方案**。下面详细设计。

#### 核心思想

页面**仍然是滚动文档**（保留 SEO、可读性、招聘官友好），但每个组件 / 内容都"知道"自己最相关的几个邻居。当读者**关注**某个组件时（hover 持续 / dwell ≥ 5s），就有 1-3 条边从这个组件边缘**长出来**，连向最相关的邻居。这些边在白天像水墨藤蔓，在夜里像电路荧光。

#### 数据模型

每个 section / card 上添加 metadata：

```html
<article class="award-card" id="award-snsf"
         data-related="proj-graphkit,proj-river,pub-icpr2026"
         data-related-strength="0.9,0.7,0.6">
  ...
</article>
```

- `data-related` = 1-5 个相关节点 ID
- `data-related-strength` = 相关度 0-1（决定边的粗细 / 亮度 / 持续时间）
- 维护方式：手工标注（最准）或基于关键词 / 标签自动生成（轻量算法）

#### 触发模式

```js
// 伪代码
const ENGAGEMENT_HOVER_MS = 600;     // 鼠标悬停 600ms 触发
const ENGAGEMENT_DWELL_MS = 5000;    // 视口中心区驻留 5s 触发
const ENGAGEMENT_FOCUS = true;       // 键盘 Tab focus 也触发
const MAX_CONCURRENT_EDGES = 3;      // 最多同时显示 3 条
const EDGE_PERSIST_MS = 10000;       // 移开后边持续 10s 然后淡出
```

#### 边的视觉设计

##### Day mode (麻瓜之书) — 水墨藤蔓 ink vines

- SVG `<path>`，`d` = 贝塞尔曲线 from 源节点 edge 到 目标节点 edge / 屏幕边缘
- `stroke` = `oklch(0.32 0.04 145)`（苔绿墨色）
- `stroke-width` = 1-2px
- `stroke-dasharray` = 一段一段断续，模拟手绘
- 起源处 / 末端处加几片 SVG 叶子 / 涡卷装饰（手绘 SVG asset，3-5 种随机选）
- 动画：`stroke-dashoffset` 从 100% 到 0% 渐显（600ms `cubic-bezier(0.16, 1, 0.3, 1)`），叶子在 400ms 后淡入

##### Night mode (魔法师之书) — 电路荧光 circuit traces

- SVG `<path>`，路径走 90°/45° 直角拐弯（电路板风格）
- `stroke` = `oklch(0.85 0.18 195)`（电青）
- `stroke-width` = 1px
- `filter: drop-shadow(0 0 4px currentColor)` 制造光晕
- 路径上小焊点（小圆 SVG）
- 动画：路径绘制 + 沿路径有光点流动（`offset-path`）
- 偶尔有"火花" SVG 闪烁

#### 离屏目标节点的处理

如果相关节点在屏外：

- 边走到屏幕边缘的最近交点
- 在交点处显示一个**缩略卡片**（浮动 16:10 小卡，含 thumbnail + 标题 + 一行描述）
- 缩略卡片可点击 → 平滑滚动到目标位置（lenis + gsap-scrolltrigger）
- 缩略卡片有屏幕边缘箭头方向指示
- 多个离屏目标 = 多个缩略卡片在屏幕同一边缘竖直堆叠

#### 历史回溯边（Linlin 提出的"reader's previous step"）

- 记录读者最近 3 步的访问历史（`history = [section_id, ...]`）
- 当读者关注当前节点时，除了"前向相关边"，再画 1 条**回溯边**指向上一步的位置
- 回溯边视觉：略淡、虚线、不同颜色（day = 浅褐 ink fade；night = 紫罗兰光）
- 鼠标悬停回溯边 → 显示"刚才你看的：XXX"标签
- 点击 → 滑回上一步

#### 点击边或节点的转场

- Click edge: 相机沿边平滑移动（lenis scrollTo + gsap timeline）
- 期间边变粗 + 颜色亮起 + 沿边有粒子流动
- 到达目标 = 目标节点轻微闪烁 + 蜡烛火焰短暂跳动（night mode）/ 墨水溅一下（day mode）

#### Mobile 退化

- Hover → tap-and-hold（500ms）
- Dwell → 自动检测进入视口中心区
- 缩略卡片 → 触屏直接点击放大
- 边视觉简化（去掉藤蔓装饰，只画线）

#### 无障碍

- `prefers-reduced-motion: reduce`：边瞬时绘制（无 stroke-dashoffset 动画）
- 键盘 Tab focus 触发等同 hover
- 所有边对应的 ARIA 关系用 `aria-describedby` / `aria-controls` 标注，屏幕阅读器可读"This award is related to: graphkit-learn, Swiss River project, ICPR 2026 paper"

### 4.C 两个方案对比与最终建议

| 维度 | 4.A 全页 force-graph | 4.B Edge-on-Engagement |
|---|---|---|
| 实施成本 | 4-8 周 | 1-2 周 |
| 移动端支持 | ⚠️ 需完全重做 | ✅ 直接复用 |
| Cognitive load | 高 | 低（按需出现） |
| 招聘官 10 秒扫描 | ❌ | ✅（页面正常滚动） |
| SEO | ❌ | ✅ |
| 维护成本 | 每条新内容大改 | 加 `data-related` 即可 |
| Voice 强度 | 极强（10/10） | 强（8/10） |
| Awwwards 候选 | 是 | 较难 |
| 与 Linlin vision 契合度 | 中（更像炫技） | 高（"被召唤的咒语"完美呼应魔法主题） |
| 实施风险 | 高 | 低 |

**最终建议：✅ 完全采用 Linlin 的 4.B 方案。**
- 4.A 的"force-graph 视图"作为隐藏彩蛋：在右下角给一个"打开节点图"按钮（或 Cmd+G 快捷键），点击后显示全页 force-graph 模态视图。这给极客访客一个"我也能看到一切"的彩蛋，但不是默认体验。

---

## 5. 世界架构：魔法书 + 画壁 + 地区切换

### 5.1 顶层框架：The Grimoire（永远存在的容器）

整个网站永远被一本"打开的书"框住：

- **左右两个翻页边缘**（或上下，决定后看 mockup）
- 翻页边缘有真实纸张的纹理（SVG / PNG texture overlay）
- 书脊上贴着一个金属书签（书签实际上是导航 — 提供 quick-jump anchor 列表）
- 翻页时的真实物理效果 — 但不是必须；可以选"无翻页 = 一直在同一摊开的双页"
- 页脚有页码（仿手稿）+ 章节装饰（vine / 龙 / 飞鸟，根据章节切换）

### 5.2 "页面"层：每个 section = 一页 / 一个跨页

每翻一页，左右两页内容呼应。例如：

- **第 1 页 spread**：左 = Hero 阁楼书房剖视；右 = 介绍语 + tagline
- **第 2 页 spread**：左 = About 卧室细节；右 = bullet 介绍
- **第 3 页 spread**：左 = 天花板星空；右 = Skills 词云
- ...

但实际实现不必真的"翻页"。可以是**长卷轴**（清明上河图 metaphor），用 lenis 平滑滚动，每个"章节"有自己的视觉风格。

### 5.3 地区切换：Zootopia 式分区

> Linlin 提出："不同模块或者随着屏幕下滑风格都可以逐渐变换"

每个章节有自己的视觉地区（visual district），但所有都在同一本书内。地区列表：

| Section | 地区风格 | 主色调 | 元素 |
|---|---|---|---|
| Hero | **欧式手稿小品**（apprentice study） | 暖羊皮 + 墨蓝 + 烛火橙 | 鹅毛笔、放大镜、几何图、铜墨壶 |
| About bedroom | **混搭温馨**（cottage） | 暖橙 + 墨蓝 + 木色 | 床、照片墙、电视、地图、书架边 |
| Ceiling stars | **天文图**（celestial chart） | 深夜墨 + 银 + 星金 | 黄道十二宫风格的星座绘制（对应研究关键词） |
| Bookshelf | **欧式图书馆** | 深棕木 + 烫金 + 米色 | 真实书脊厚度、阶梯、油灯 |
| Workbench | **炼金实验室** | 铜色 + 玻璃绿 + 紫烟 | 玻璃瓶、酒精灯、各种动态实验 |
| Award wall | **学院礼堂** | 暗红丝绒 + 鎏金 + 木色 | 镜框、奖杯、徽章 |
| Hallway 画壁 | **中国画卷长廊** | 青绿山水 + 朱砂 + 米色 | 4-6 幅大型墙壁画，对应职业生涯 |
| News rack | **民国 / 维多利亚报馆** | 报纸黄 + 墨黑 + 朱红 | 申报 + Daily Prophet 风格 |
| Lectern talks | **小礼堂**（hall） | 木色 + 灯光 + 笔记蓝 | 演讲台、笔记本、麦克风 |
| Map room | **海上探险图厅** | 古地图棕 + 海蓝 + 罗盘金 | 大幅地图卷轴、罗盘、望远镜 |
| Letter room | **维多利亚私房**（writing parlour） | 暗红 + 蜡红 + 信纸米 | 写字台、墨水瓶、Howler 信封、猫头鹰 |
| Animal room | **童书插画风**（picture book） | 柔和饱和 + 角色化 | 各种"伙伴动物"对应外链 |

### 5.4 章节之间的过渡（transition zone）

在两个章节之间留 ~50vh 的过渡区：

- 视觉风格混合渐变（gsap-scrolltrigger 控制 progress）
- 出现"过渡装饰"：从一种风格的元素逐渐变形为另一种（例如从 hero 的几何图变形为 about 的家具轮廓）
- 文字连接（一句话桥梁）

这是 Zootopia 区域切换的精髓 — 边界**模糊**，不是硬切。

### 5.5 主导航的两层

- **被动导航**：滚动 = 走过房间。配 lenis 平滑滚。
- **主动导航**：右下角小机器人助手（详见 §8.13）。点击 = 弹出对话 = 选择房间 = 平滑飞过去。
- **极客导航**：Cmd+K 现有搜索保留。增加 Cmd+G 打开"全页 graph view"彩蛋。

---

## 6. Day / Night 设计 token（OKLCH）

### 6.1 麻瓜之书 (Day) — 已在 D6 完成

继续用 D6.4 的 academic palette，但 alias 重命名为 muggle：

```css
[data-theme="muggle"] {
    --primary:        oklch(0.45 0.16 27);    /* 氧血红 */
    --secondary:      oklch(0.46 0.08 145);   /* 苔藓绿 */
    --accent:         oklch(0.62 0.12 65);    /* 烛火橙 */
    --text-primary:   oklch(0.22 0.025 250);  /* 石板墨 */
    --bg-paper:       oklch(0.98 0.010 80);   /* 暖羊皮 */
    --bg-paper-alt:   oklch(0.94 0.014 80);
    /* edges in vine ink */
    --edge-stroke:    oklch(0.32 0.04 145);   /* 墨绿藤蔓 */
    --edge-leaf:      oklch(0.46 0.08 145);
}
```

### 6.2 魔法师之书 (Night) — 新设计

```css
[data-theme="grimoire"] {
    /* Background — deep midnight ink, never pure black */
    --bg-paper:       oklch(0.16 0.025 260);  /* 深夜墨 */
    --bg-paper-alt:   oklch(0.20 0.030 258);  /* 月影墨 */
    --bg-paper-warm:  oklch(0.24 0.040 50);   /* 烛光附近的暖墨 */
    /* Text — moonlit parchment ink, never pure white */
    --text-primary:   oklch(0.92 0.018 80);   /* 月光纸 */
    --text-secondary: oklch(0.78 0.020 78);
    --text-muted:     oklch(0.62 0.022 75);
    /* Primary — spell-fire amber, the candle / wax / Howler red blend */
    --primary:        oklch(0.72 0.18 50);    /* 蜡烛橙 */
    --primary-light:  oklch(0.82 0.15 55);
    --primary-dark:   oklch(0.55 0.18 45);
    /* Accent — moonlight silver */
    --accent:         oklch(0.85 0.04 220);
    /* Magic glow — electric cyan, the spell-edge color */
    --magic-glow:     oklch(0.85 0.18 195);   /* 电青 */
    --magic-violet:   oklch(0.55 0.22 305);   /* 紫罗兰咒文 */
    /* Edges in circuit traces */
    --edge-stroke:    oklch(0.85 0.18 195);   /* 电青 */
    --edge-glow:      oklch(0.85 0.18 195 / 0.45);
    /* Borders — gilt thread */
    --border-light:   oklch(0.42 0.06 60);    /* 古铜 */
    --gilt:           oklch(0.78 0.13 80);    /* 烫金 */
    /* Shadows — deep candlelight cast */
    --shadow-md: 0 4px 16px oklch(0.05 0.04 260 / 0.55);
    --shadow-lg: 0 12px 32px oklch(0.05 0.04 260 / 0.65);
    /* Hero gradient — night sky with hint of dawn at horizon */
    --gradient-hero: linear-gradient(180deg,
        oklch(0.10 0.025 260) 0%,
        oklch(0.18 0.035 258) 50%,
        oklch(0.28 0.060 50) 100%);
}
```

### 6.3 颜色策略对比

| 维度 | Muggle | Grimoire |
|---|---|---|
| Strategy（impeccable 分类）| **Restrained** — tinted neutrals + 1 accent ≤10% | **Drenched** — surface IS the color |
| 主色比例 | 氧血红 ≤10% | 烛橙 + 电青 ≥30% combined |
| 对比 | 中（好读） | 高（戏剧性） |
| AI Slop 风险 | 低（不命中"academic 蓝"） | 低（不是"healthcare 白" 也不是"crypto 霓虹"） |
| 访客情绪曲线 | 平稳、专注 | 起伏、惊奇、留恋 |

---

## 7. 字体系统升级

### 7.1 Latin

继续 D6.3 的方向但分主题：

| 角色 | Muggle | Grimoire | 理由 |
|---|---|---|---|
| Display | Spectral Regular/Italic | **GT Alpina** *(if affordable)* / Spectral Display Italic | Grimoire 想要更"文学"+"古"的衬线；GT Alpina 有点剑齿 + 强意大利体；如不预算用 Spectral Italic 700 |
| Body | Spectral Regular | Spectral Regular | 同家族保证一致 |
| Mono / Code | JetBrains Mono | JetBrains Mono | OK |
| Hand / 手稿注解 | Caveat | **Henrietta** (Future Fonts) / **Reckless** Italic | 比 Caveat 更"有手感"；如不预算继续 Caveat |
| Headline 偶尔大字 | Spectral 700 italic | **Tan Pearl** 或 **Reckless Display** | 仅用于 1-2 个章节首字母 / 大引语 |

**反射拒绝复查**：以下字体绝对不用，即使想要"魔法感"：
- ❌ Cinzel — HP 字体反射
- ❌ Cormorant — impeccable ban
- ❌ UnifrakturMaguntia / 黑体 (Fraktur) — 廉价"中世纪"反射
- ❌ Pirata One — 海盗反射
- ❌ Almendra Display — 不入流

### 7.2 中文

| 角色 | Muggle | Grimoire | 理由 |
|---|---|---|---|
| Body | LXGW WenKai 霞鹜文楷 | **江城圆体** / **霞鹜文楷加粗** | Grimoire 想要更"夜晚故事书"质感 |
| Hero name accent | Ma Shan Zheng 马善政 | Ma Shan Zheng | 保留毛笔 |
| 标题大字 | LXGW WenKai | **方正字迹-邢体毛笔行书** / **江城手书** | 大字时手写感更重 |
| 报纸节 (News) | LXGW WenKai | **方正报宋** / **铅字字模 OldFangsong** | 民国报纸感 |
| 古风装饰 | n/a | **江城斜宋体** / 楷体 | 信件 / 卷轴文字 |

### 7.3 实施

- Grimoire 字体通过 `[data-theme="grimoire"]` 选择器覆盖 var(--font-display)
- 加 `font-display: optional` 到所有 CJK 字体，避免阻塞首屏
- preconnect to jsdelivr / Google Fonts already in head

---

## 8. 各模块的空间化设计（13 个房间 / 场景）

> 每个模块给：场景描述、白天/夜晚状态、主要交互、技术栈、所需资产、备注。

### 8.1 Hero — 阁楼书房（apprentice's attic study）

#### 场景描述

俯视一张木桌的内景视角。桌上摆放：

- 一本翻开的真皮装订笔记本（主体内容承载）— 笔记本现在在"自我介绍页"
- 鹅毛笔斜插在墨水瓶里（cursor 跟随时笔会微微指向鼠标）
- 一只放大镜悬浮在笔记本上方（hover 笔记本时放大镜跟随，放大镜里看到的内容会有 zoom 效果）
- 一张被压在镇纸下的小型 graph 图（手绘风），上面有几个标着"graphkit-learn""SNSF""ICPR""Bern"的节点
- 桌角一根蜡烛（**这是主题切换控件**）
- 远处窗户（透视）：白天可见伯尔尼老城 + 雪山；夜晚可见星空 + 月亮
- 桌侧一只小机械猫头鹰（这是 Howler 触发器，已存在）

#### 白天 / 夜晚

- 白天：阳光从窗倾斜照入，桌面有阳光斑驳；蜡烛未点燃；笔记本字迹清晰墨色
- 夜晚：蜡烛已点燃，火焰跳动；桌面是温暖橙光圈；笔记本字迹烛光下偏暖；窗外群星 + 词云星座（连接 §8.3）

#### 主要交互

- 鼠标移到笔记本 → 放大镜跟随，可以"读"到细节
- Hover 笔记本上的某段文字（如 graphkit-learn 链接） → 放大镜里 graph 图的对应节点高亮 + 一条 edge 长出来到这段文字
- Click 蜡烛 → 主题切换（详见 §2）
- Click 猫头鹰 / 远处的 Howler → 弹出明信片（已存在 D5.N）

#### 技术栈

- 主体：HTML + CSS（多层 absolute positioning + transform: translateZ）+ SVG（graph 图）+ PNG/WebP（背景画）
- 视差：CSS variables 由 JS 更新（鼠标位置 → translate3d 各层不同强度）
- 鹅毛笔指向 cursor：JS 计算角度 + transform rotate
- 蜡烛火焰：SVG + CSS keyframes + small turbulence filter
- 窗外白天/夜晚：两张 PNG，opacity crossfade

#### 所需新资产

- 阁楼书房背景画（白天版 + 夜晚版）— 2 张 PNG / WebP，~1MB each
- 蜡烛 SVG（点燃 / 未点燃 状态）
- 鹅毛笔 SVG
- 放大镜 SVG  
- 笔记本立体效果 SVG / 3 层 PNG
- graph 图（小型 SVG）
- 窗外：伯尔尼老城白天 + 星空夜晚 — 2 张 PNG

> 资产可用 baoyu-image-cards / Midjourney / DALL-E / Stable Diffusion 生成 + manual editing。建议先 AI 生成 5-10 张候选 → Linlin 选 → impeccable polish。

#### 备注

- 第一次访客的 attention sequence 设计：
  1. 0s 翻开书的动画 → 看到桌面
  2. 0.5s 笔记本上的字 stagger fade in
  3. 1.5s 鹅毛笔小动作（拨动一下）
  4. 2s 远处猫头鹰转头看读者（如果是 Howler 状态）
  5. 3s 桌角蜡烛上方有"点亮我？"的小气泡（如果 day mode）

### 8.2 About Me — 卧室（bedroom）

#### 场景描述

从 Hero 书房推开一扇门进入卧室，俯视约 30°斜视的房间内景：

- **左墙**：照片墙，挂着 6-9 张照片（career milestones — Bern / INSA / XJTU / 各会议合照），有的歪着挂，有的并排
- **正墙**：一台壁挂电视 + 一张大幅世界地图。地图上钉着小红旗（工作过的地点）+ 蓝色细线连接合作机构
- **右墙**：床（睡着一只猫，这是 delight 元素 — 滑过去会伸懒腰）。床头柜上一台电脑（屏幕开着，icons：CV / Email / GitHub / Twitter / Bilibili）
- **天花板** ：可见小天窗（仰头能看到星空 — 触发跳到 §8.3）
- **房间一角**：一扇通向"动物间"的门（§8.12）

#### 白天 / 夜晚

- 白天：自然光从天窗 + 侧窗
- 夜晚：床头一盏台灯 + 月光从天窗。电视屏幕变蓝白光晕

#### 主要交互

- Hover 照片 → 长出标注线 + 信息卡（公司 / 时间 / 角色）
- Click 照片 → lightbox 打开
- Click 电视 → 播放 talks playlist（loops 或 modal）
- Hover 地图 → 红旗变大，那条线高亮
- Click 电脑 icon → 该 action（下载 CV / 打开 Email / 跳外链）
- Hover 猫 → 猫伸懒腰
- Click 动物间门 → 打开 §8.12

#### 技术栈

- 主体：CSS Grid + CSS 3D transforms（伪 3D 房间透视）
- 照片墙：多个 div + box-shadow + slight rotate（每张随机 -3° 到 +3°）
- 世界地图：SVG（D3 + topojson 已有，复用 visit-map 数据）
- 电视播放：YouTube / Bilibili embed lazy load
- 猫动画：Lottie / Rive（如装）

#### 所需新资产

- 房间背景透视图（白天 + 夜晚）
- 照片框 SVG （3 种风格随机）
- 电视模型 SVG
- 床 + 猫 illustration（白天 / 夜晚双版本，猫 idle / stretch 双状态）
- 动物间门 SVG

### 8.3 Skills + Research Outline — 天花板星空（celestial ceiling）

#### 场景描述

从卧室仰头（或从 hero scroll up），相机切换到仰视天花板视角：

- 整片夜空铺满屏幕
- 4-6 个**星座**（每个对应一个研究方向）：
  - 星座 1 = 图核与图编辑距离 (Graph Kernels & GED)
  - 星座 2 = 图神经网络 (GNNs)
  - 星座 3 = 化学分子与药物 (Molecular Property Prediction)
  - 星座 4 = LLMs & Agents
  - 星座 5 = 智能感知与时空预测 (Spatio-Temporal Forecasting / Smart Engineering)
  - 星座 6 = 跨语言识别 (Handwriting Recognition)
- 每个星座是 5-9 颗星 + 连接线
- 星座旁边浮着该方向的关键词云（旧 word cloud 重定位）
- 流星偶尔划过

#### 白天 / 夜晚

- 即使白天进入也是星空（这是天花板，不是天空）
- 夜晚则更亮（白天能见度低 70%，夜晚 100%）

#### 主要交互

- Hover 星座 → 该星座所有星亮起 + 连接线发光 + 该领域所有关键词浮起来
- Click 星座 → 飞到该星座中心，detail panel 滑入显示该领域所有 publications + projects
- Edge to Publications/Projects/Awards：从星座边缘长出 edge 指向相关条目（如果在屏 = 直接连，离屏 = 显示缩略卡 §4.B）

#### 技术栈

- **R3F** + drei `<Stars>` 组件作为基础星空（`count=2000, depth=50`）
- 星座节点用 `<group>`（每星 = `<mesh>` + `<sphereGeometry>` + glow `<sprite>`）
- 词云用 R3F 的 `<Html>` 组件（HTML 在 3D 空间中 billboard）
- Hover 检测用 R3F raycaster
- Camera animations 用 GSAP timeline
- 流星：粒子系统（drei 有现成的）

#### 所需新资产

- 6 个星座的"星图"设计（哪些点 + 连接哪些线）— hand-design
- 词云已有数据
- 流星 sprite

### 8.4 Publications — 书架（bookshelf wall）

#### 场景描述

整面墙的多层木质书架，每层放着按年份排列的书：

- 5-7 层书架
- 每本书 = 1 篇 publication
- 书脊显示：年份 + 简称 venue + 第一作者姓
- 书的厚度与"被引用数"成正比
- 颜色：journals 用一种皮革色，conferences 用另一种，preprints 用第三种
- **博士论文是中央那本巨大的烫金皮封面 tome**（the "spine of the shelf"）
- 一架小木梯靠在书架上（装饰 + 暗示"翻到顶上的旧书")
- 书架上方挂着 stats 框：[ 9 papers ] [ 6 h-index ] [ 5+ grants ] — 不是卡片，是写在小铜牌上的 metadata

#### 白天 / 夜晚

- 白天：书脊清晰可读，金箔反光
- 夜晚：每本书脊轻微荧光（油灯光），鼠标在哪本书附近，那本会更亮

#### 主要交互

- Hover 书 → 拉出 30%（CSS 3D rotate）+ 烫金标题描出
- Click 书 → 书"飞"到屏幕中央打开 → 看到内页（pub abstract + figure + citation count + DOI/code/slides/video links）
- 关闭打开的书 → 书飞回原位
- Edge: hover 一本书 → 长出 edges 到相关 projects（实现该 paper 的代码） / 相关 grants（资助该 paper） / 同 venue 其他 paper

#### 技术栈

- 主体：CSS Grid 多行 + CSS 3D transforms
- 书脊渲染：CSS gradient + box-shadow + text (vertical-rl writing-mode)
- 书的"拉出"：transform: translateZ(20px) rotateY(-15deg)
- 书的"打开"：3D 翻折 + 双面卡牌效果
- 烫金描边：text-shadow + filter
- 边的 edge 走 §4.B 模式

#### 所需新资产

- 书脊纹理 SVG / WebP（3-5 种皮革 + 烫金）
- 书架背景（木纹 SVG / WebP）
- 木梯 SVG
- 铜牌 stats 框 SVG

### 8.5 Projects — 实验台（alchemist's workbench）

#### 场景描述

俯视一张实验台。台上凌乱摆着各种实验：

- 玻璃罐（每个 = 一个 project）
- 每个罐子的内容 = 该 project 的可视化：
  - **graphkit-learn** = 玻璃罐里飘着真实的 d3 force graph，节点边会动
  - **PLANALYSER** = 一张 HVAC 管路图慢慢自动绘制 + 灯泡亮灭
  - **LIULIAN** = 一只小汤匙在汤锅里自转（推文里那种自动搅拌器）
  - **Confidential Translator** = 鹅毛笔在写诡异密码 cipher
  - **Swiss River Network** = 一只小河流仿真在瓶子里流（CSS 渐变 + 粒子）
  - **GraphInk** = 大墨水瓶里漂着字符
  - **OCTOPUSSY / RedoxPrediction** = 分子结构悬浮 + 化学键发亮
- 实验台上还有：试管架、小天平、记录本（笔记本）、计算尺
- 角落坐着小机器人助手（idle 状态）

#### 白天 / 夜晚

- 白天：自然光，玻璃罐里实验"温和"运行
- 夜晚：每个罐子都有自己的微弱发光（不同颜色对应不同领域），实验更活跃

#### 主要交互

- Hover 罐子 → 罐子轻微浮起 + 项目名 + 短描述 fade in
- Click 罐子 → detail panel 滑入：完整描述 + 链接 + 图 + tech tags
- 部分罐子可拖动（physics 玩具，可选）
- Edge 走 §4.B

#### 技术栈

- 实验台背景：WebP
- 玻璃罐：SVG 或 PNG with transparent
- graphkit-learn 罐：复用 d3-force（小型版）
- PLANALYSER 罐：CSS animation + SVG path drawing
- LIULIAN 罐：纯 CSS keyframe rotate
- 分子结构：3D ball-and-stick — 用 R3F + drei `<Sphere>` + `<Cylinder>`
- 机器人：见 §8.13

#### 所需新资产

- 实验台背景 PNG
- 8-11 个玻璃罐 SVG（每个独特设计）
- 试管 / 天平 / 计算尺 SVG

### 8.6 Awards — 获奖墙（award wall）

#### 场景描述

阁楼书房的另一面墙。墙上挂 4 个画框（4 个奖项）：

- 框风格：欧式镀金 frame
- 每框中央：该机构的 logo（已用 D5.C 的 square crop）
- 框下小铜牌：奖项名 + 时间
- 墙上挂着一个小奖杯柜，柜里 1-2 个小奖杯（ICPR 2026、SNSF Bodmer 等里程碑）
- 墙底装饰线条（barocco 装饰）

#### 白天 / 夜晚

- 白天：壁灯柔和打光每个框
- 夜晚：每个框的画框有发光描边，奖杯里有 trophy glow

#### 主要交互

- Hover 框 → spotlight 聚焦 + 详细描述（amount / period / role）滑入
- Click 框 → 打开外链（grant database 链接）
- Edge 走 §4.B（连到该资助下的 papers / projects）

#### 技术栈

- CSS Grid 排列 4 框
- 画框：SVG 或 PNG layered
- Hover spotlight：radial-gradient + transition

### 8.7 Experience — 时光走廊画壁（painted wall corridor）

> 这是聊斋《画壁》metaphor 的核心实现。Linlin 提的"画中世界"。

#### 场景描述

整个 section 横向滚动（horizontal scroll within section，垂直滚动外面正常）：

- 左侧入口：一面挂着 4-6 幅大型画作的走廊
- 每幅画对应一段职业生涯：
  - **Bern Postdoc 2020-2026** = 阿尔卑斯雪山 + 老城（瑞士山水 mood）
  - **INSA Rouen PhD 2017-2021** = 诺曼底 + 尖塔哥特建筑（欧洲学院 mood）
  - **XJTU MSc 2014-2017** = 西安城墙 + 兵马俑剪影（中国传统 mood）
  - **XJTU BSc 2010-2014** = 大学校园 + 樱花（青春 mood）
- 每幅画**有自己的视觉语言**（青绿山水、水墨、油画、铅笔素描…）
- 走过画前 → 画"活"起来（清明上河图 metaphor）：人物动、水流、云飘、灯亮

#### 白天 / 夜晚

- 白天：画作清晰，色彩饱和
- 夜晚：画作变幽暗但发光线条 + 月光下的画里世界

#### 主要交互

- Horizontal scroll（pin section + scroll-driven gsap-scrolltrigger）
- 当画进入视口中心 → 画"活"起来 + 标注卡片浮出（年份 + 头衔 + 描述）
- Click 画 → 推入画里（聊斋 metaphor）：全屏沉浸式视图，描述完整经历 + 当时的论文 + 当时的项目
- Edge 走 §4.B（每个时期的 publications / awards 边都从对应画浮出）

#### 技术栈

- Pin + horizontal scroll：gsap-scrolltrigger
- 画作活化动画：SVG path + GSAP timeline
- 沉浸视图：full-screen modal + CSS animations

#### 所需新资产

- 4-6 幅大型画作（每个独特风格）— **这是工作量最大的资产**
- 标注卡片设计

> 备注：画作可以用 baoyu-image-gen / DALL-E / Midjourney 生成 + 后期编辑。可能需要 5-10 次迭代。

### 8.8 News — 报纸架（newspaper rack）

#### 场景描述

走廊一角，一个木质报纸架。架上挂着 1-3 份不同年代的报纸：

- 最新一份是当前 ticker 的所有 news items
- 报纸标题大字采用民国时期 + Daily Prophet 风格（但不抄袭 HP）
- 版式仿《申报》或《大公报》
- 报纸有时翻页（自动或 hover）

#### 白天 / 夜晚

- 白天：报纸纸色清晰
- 夜晚：报纸用一根钉子挂着，旁边一盏小油灯

#### 主要交互

- Hover 报纸 → 报纸"展开" → 可读
- 多份报纸：scroll wheel 切换
- Click 一条 news → 该日详情

#### 技术栈

- CSS 报纸 mockup（Grid + overflow + columns）
- 翻页效果：CSS 3D transform

### 8.9 Talks — 演讲台（lectern）

#### 场景描述

一个木质演讲台 + 上面摊开的笔记本：

- 笔记本左页 = talk title + venue + date
- 笔记本右页 = abstract + slides 缩略图
- 笔记本可翻页（左右箭头或 scroll）
- 演讲台上有麦克风 + 一杯水（细节装饰）

#### 主要交互

- 翻页：箭头 / 滚轮
- Click slides 缩略图 → 全屏 slides
- Click "play" → 播放 audio / video（如有）

### 8.10 Visit Map — 大幅卷轴地图（rolled parchment map）

#### 场景描述

一张大幅羊皮纸地图铺在桌上：

- 半卷状（左卷右卷可见）
- 海洋用古老的"Here be dragons"风格（有 sea monster 装饰）
- 各国颜色按访问数饱和度
- 钉着小红旗（visit pins）
- 上方挂着罗盘 + 望远镜（装饰）

#### 主要交互

- Hover 国家 → 浮出 visit count + 国旗
- 数据复用现有 visit-map.js

### 8.11 Contact + Howler — 信件房（letter room）

#### 场景描述

把现有的 Howler / Welcome Postcard 变成永久的房间装置：

- 桌上：未发出的 Howler 信封（可点击 → 弹出明信片）
- 桌上：已写好的 outgoing 邮件（点 → mailto）
- 墙上：地址卡 PRG @ Neubrückstrasse 10
- 角落：一只活的猫头鹰（occasional 翅膀扇动 idle 动画）
- 桌上：墨水瓶 + 蜡封烛 + 鹅毛笔

#### 主要交互

- Click 信封 → 弹出 D5.N 的明信片（保留现有功能）
- Click 邮件 → mailto
- Click 猫头鹰 → 猫头鹰飞到桌前 → 弹出"send a message" 选择（contact methods 列表）

### 8.12 External Links — 动物间（companion animal room）

#### 场景描述

卧室中那扇门后的一个小动物伙伴间：

- **Twitter 蓝鸟**（在小笼子里，门是开的，象征"它来去自由"）→ @jajupmochi
- **GitHub 章鱼猫**（趴在树枝上打盹）→ /jajupmochi
- **LinkedIn 鸭子**（穿西装 — 设计的笑点）→ /linlin-jia-b456a6a7
- **Bilibili 小白猫**（lil-cat）→ /jajupmochi
- **Google Scholar 蜜蜂**（在花上）→ scholar profile
- **ResearchGate 鱼**（缸里）→ ResearchGate profile  
- **Email 鸿雁**（站在窗边）→ mailto:linlin.jia@unibe.ch

#### 主要交互

- Click 任一动物 → 在新窗口打开对应链接
- Hover → 动物有 idle 反应（鸟扑棱、猫睁眼、鱼摆尾）
- 房间整体氛围：插画风（Maggie Appleton 借鉴），所有动物风格一致

#### 所需新资产

- 7 个动物的手绘 SVG / illustration（每个 idle + hover 两状态）

### 8.13 Robot Guide — 小助手机器人

#### 场景描述

机器人形象：

- 像一只小铜质机械猫头鹰（呼应 Howler 猫头鹰但更可爱、更工业感）
- 高约 60px（屏幕坐标）
- 站姿，胸前有齿轮
- 默认坐在右下角，蹲在小台子上

#### 状态

- **Idle**: 偶尔眨眼、转头、齿轮转。每 30s 一次"打哈欠"
- **Awakened** (after click): 站起来，翅膀展开
- **Talking**: 弹出对话气泡 / 对话面板
- **Walking**: 沿屏幕底边小跑（如果引导用户去某处）

#### 对话面板

```
你好！我是助手 Cortex（or 任何 Linlin 取的名）。
要去哪里？

→ 自我介绍 (Hero 阁楼)
→ 关于林林 (卧室)
→ 看看研究领域 (天花板星空)
→ 翻论文 (书架)
→ 看项目 (实验台)
→ 看获奖 (奖墙)
→ 职业经历 (画壁走廊)
→ 联系方式 (信件房)
→ 外部链接 (动物间)

[关掉对话]
```

#### 主要交互

- Click 机器人 → 醒来 + 弹出对话
- 选 destination → 关闭对话 + lenis 平滑滚到 + 机器人沿路追上去（cute！）
- 30s 无操作 → 机器人坐回去睡

#### 技术栈

- 机器人形象：**Rive**（首选，2D vector animation 支持 state machine + 鼠标交互）
- Fallback: Lottie + JS state machine
- 对话面板：Radix UI Dialog / 纯 CSS popover
- 滚动：lenis

#### 所需新资产

- Rive 文件：robot-guide.riv（idle / awake / talking / walking 4 状态 + 过渡）
- 或 Lottie JSON

### 8.14 整站背景（the parchment / midnight foundation）

不在某个 section 里，但贯穿所有 section 的底层：

- **Muggle**: 暖羊皮 PNG texture overlay (slight grain) at 5-8% opacity over `--bg-paper`
- **Grimoire**: 深夜墨 PNG texture + 微星空小颗粒（CSS 粒子）+ 偶尔的"灰尘 mote" 漂浮（粒子动画）
- 整站**没有顶部 navbar**（取消现有的 navbar），改为：
  - 左侧 / 顶部一排小**金色书签**（章节锚点）— 视觉上像粘在书上的便签
  - 右下角机器人助手（§8.13）
  - 右上角语言切换 + 蜡烛（主题切换）

---

## 9. 风格变换 — Zootopia 式分区

每个章节有自己的视觉地区，但通过以下手段保证**整体统一**：

1. **The Grimoire frame** 始终存在 — 翻开的书边缘、纸张纹理、装饰线条
2. **统一字体系统**（§7） — 同一套 fonts 跨所有章节
3. **统一 color tokens**（§6） — 各章节用 brand palette 的不同子集
4. **统一交互语法** — hover + edge growth + 点击转场，所有章节一致
5. **统一 motion 风格** — 所有动画用 `cubic-bezier(0.16, 1, 0.3, 1)` quart-out（impeccable 推荐）
6. **统一 Audio cue 系统**（如开声音）：进入章节 = 一声轻微的"翻页" sfx

章节之间过渡（gsap-scrolltrigger 驱动）：

- 50vh 过渡区
- 视觉风格混合渐变
- 装饰元素从 A 章节的形态逐步变形为 B 章节的形态
- 文案桥梁：一句话从 A 章节末尾延续到 B 章节开头

例：从 Hero（欧式书房）→ About（混搭卧室）：

```
[Hero 末尾]                  → [Transition zone, 50vh]                  → [About 开头]
桌上的笔                       → 笔写一句"我住在伯尔尼一间小阁楼…"
                              → 笔渐变成"床头灯下的笔"
                              → 镜头平移：桌 → 床                          → 卧室全景出现
```

---

## 10. 技术栈映射

### 10.1 库选型 + 用途

| 库 | 用途 | 章节 |
|---|---|---|
| **lenis** | 整站平滑滚动 | 全站 |
| **gsap** core | 时间轴动画 / page-load choreography | 全站 |
| **gsap-scrolltrigger** | 章节 pin / scrub / transition | 全站 |
| **gsap-timeline** | hero entrance / postcard fold / theme switch | hero, postcard, theme toggle |
| **gsap-utils** | clamp / random / interpolate | misc |
| **motion library** | spring transitions for menus, tooltips, reveals | dialogs, robot bubble, edge growth |
| **three.js + @react-three/fiber + @react-three/drei** | 3D 星座 + 分子结构 | §8.3 ceiling, §8.5 projects (molecules) |
| **d3 + d3-force** | graphkit-learn 罐内的 force graph + edge drawing | §8.5, §4.B |
| **visx** | 如要做某些 chart-like 元素 | TBD |
| **recharts** | 如要做 stats radial chart | §8.4 stats panel |
| **culori** | OKLCH manipulation in JS | theme switch transitions |
| **radix-ui/colors** | 系统色（不太需要 — OKLCH 直接定义） | minimal use |
| **rive** (需安装) | 机器人助手 + 猫头鹰 + 部分动物 idle | §8.12, §8.13 |
| **shadcn** | 如果转 React，组件库 | TBD（暂不） |

### 10.2 不引入

- **React** — 暂不引入（保持 vanilla HTML/CSS/JS 与现有架构一致）
- **Next / Vite / 任何 build tool** — 保持 GitHub Pages 静态部署
- **Tailwind** — 用 CSS variables + custom CSS（impeccable 推荐 utility-first 但 Tailwind 也是 reflex）

### 10.3 加载策略

- 首屏关键：CSS + Hero 必需 JS（lenis init + theme toggle + edge tracker init）
- Hero 加载完后异步：gsap + scrolltrigger
- Scroll into view 后：每个章节 lazy-load 自己的 JS（R3F scene、d3 instance、Rive animation）
- code split via `<script type="module">` + dynamic `import()`

---

## 11. 性能预算 / 移动端 / 无障碍降级

### 11.1 性能预算

- 首屏 JS（gzipped）：≤ 200KB
- 首屏 CSS：≤ 60KB
- 首屏 LCP：≤ 2.5s on 4G mobile
- 总页面（包括所有章节）：≤ 2MB（含图片）
- 图片：WebP + responsive `srcset` + `loading="lazy"` 全部

### 11.2 移动端

| 桌面 | 移动端替代 |
|---|---|
| 阁楼书房 hero | 静态画 + 缩小版可缩放 |
| 卧室 透视 | 单层平面图 + tap interactions |
| 天花板星空（R3F） | 静态 SVG 星座 + tap |
| 书架 3D | 简化为列表，每条目 tap 展开 |
| 实验台罐 | 列表 + 静态 SVG |
| 画壁走廊（horizontal scroll） | 改为 vertical scroll |
| 报纸架 | 同样 |
| 机器人对话 | 改为 nav menu hamburger |
| Edge-on-engagement | 简化：仅 tap 触发，单条边 |
| Theme switch (蜡烛) | 同样 |

### 11.3 无障碍

- `prefers-reduced-motion: reduce`：
  - 所有 GSAP 动画 → 瞬时
  - 没有 stroke-dashoffset 边动画
  - 没有视差
  - 蜡烛火焰静态
  - 机器人 idle 动画停止
  - Hero 入场 = 无动画
- 键盘：
  - Tab 顺序合理（hero → about → ... → contact）
  - 所有 click target = button or link，可 Enter 激活
  - Cmd+K 现有搜索保留
  - Cmd+G 打开 graph view 彩蛋
- 屏幕阅读器：
  - 每个 spatial scene 有 hidden semantic markup（`<h1>`, `<h2>`, list, paragraph）
  - 所有 emoji 装饰 `aria-hidden="true"`
  - 所有图片 `alt` 描述充分
  - Edges 用 `aria-describedby` 表达关系
- 色彩对比：
  - 所有正文文字 ≥ AA（4.5:1）
  - 所有交互元素 ≥ AA Large（3:1）

### 11.4 SEO

- 所有内容仍用 semantic HTML（`<h1>`, `<article>`, `<section>`, `<nav>`）
- JSON-LD ScholarlyArticle / Person / SoftwareSourceCode 全保留
- meta tags 不动
- noscript fallback：完整可读简历样式（如果用户禁 JS）

---

## 12. 分阶段实施路线（D7 → D∞）

| Phase | 内容 | 预期工时 | 依赖 |
|---|---|---|---|
| **D7.1** | 本 mindstorm 02 | 完成 | — |
| **D7.2** | Linlin 审阅 + 批准方向 | 等待 | mindstorm-02 |
| **D8.1** | 安装 lenis + gsap + scrolltrigger，建立 magic theme `[data-theme="grimoire"]` 框架（CSS tokens） | 0.5 天 | D7 批准 |
| **D8.2** | Hero 阁楼书房静态版（日 + 夜两套图）+ 字体定稿 | 1-2 天 | 资产生成 |
| **D8.3** | 蜡烛主题切换动画 + 持久化 | 0.5 天 | D8.1, D8.2 |
| **D8.4** | Hero 入场 choreography（gsap timeline） | 0.5 天 | D8.2 |
| **D8.5** | 鹅毛笔 cursor follow + 放大镜 hover | 0.5 天 | |
| **D8.6** | 视觉验证 D8 整体（chrome-devtools） | 0.5 天 | |
| **D9.1** | Edge-on-engagement Living Graph 基础设施（SVG layer + tracker + 数据 model） | 1.5 天 | |
| **D9.2** | 第一批 `data-related` 标注（hero / awards / publications） | 0.5 天 | |
| **D9.3** | 边视觉（vines + circuit）+ 离屏缩略卡 | 1 天 | |
| **D10** | 卧室 About Me 重做 | 2 天 | 资产 |
| **D11** | 天花板星空 + 词云重排 | 2-3 天 | R3F 集成 |
| **D12** | 书架 Publications | 2 天 | 资产 |
| **D13** | 实验台 Projects + 玻璃罐 | 3 天 | 资产 + 复杂动画 |
| **D14** | 画壁走廊 Experience（horizontal scroll） | 2-3 天 | 4-6 幅画作生成 |
| **D15** | 获奖墙 + 报纸架 + 演讲台 + 地图 | 2 天 | |
| **D16** | 信件房 Contact + 动物间 External | 1.5 天 | 7 动物 illustration |
| **D17** | 机器人助手 Robot Guide（Rive） | 2 天 | rive 安装 + Rive 文件 |
| **D18** | 章节过渡 + 整站 polish | 1.5 天 | |
| **D19** | 移动端降级 + 无障碍 audit | 2 天 | |
| **D20** | 性能优化（lazy load / code split / image opt） | 1 天 | |
| **D21** | 全主题 visual verify + impeccable critique 回归 | 1 天 | |
| **D22** | UPDATES + PLAN docs sync + commit | 0.5 天 | |
| **D∞** | i18n updates / 收 Linlin 反馈持续迭代 | ongoing | |

**总估**：~30-40 天工作量（一个研究人员业余时间数月）。

可以**只做最关键的 50%** 拿到 80% 效果：D8 (Hero) + D9 (Edges) + D10 (卧室) + D14 (画壁走廊) + D17 (机器人) = ~10 天，已经能让网站从 "标准模板" 跃升为 "独特记忆点"。

---

## 13. 待 Linlin 决定的开放问题

1. **机器人助手的名字**？建议候选：
   - **Cortex**（脑皮层 + 现代感）
   - **Atlas**（地图集 + 希腊神 + 知识承载）
   - **Owlet**（小猫头鹰，与 Howler owl 呼应）
   - **林助 / 小林**（中文 helper personification）
   - **Quilly**（鹅毛笔的人格化）
   - 或你自己取
2. **Hero 主标题选哪个**？(§3 候选 A/B/C/D)
3. **Hero 视觉 — 桌面视角 OK 还是想换**？例如改为：
   - 站在书房中央俯视的等距视角（isometric）
   - 站在窗边外向看（向外的视角）
   - 第一人称 POV（拿着书走向桌子）
4. **画作生成谁来做**？我用 baoyu-image-gen 生成候选 → 你选；还是 Linlin 自己找艺术家 / 自画
5. **Rive 是否要装**？如装，机器人 + 部分动物可用 Rive；如不装，Lottie 替代
6. **音效是否要加**？默认静音 + 用户可开启（书页翻动 / 蜡烛点燃 / 边长出 / 机器人语音）
7. **画壁走廊 — 只有 4 段经历对吗**？（PRG / INSA / XJTU MSc / XJTU BSc，加上未来可能的下一份）
8. **是否真的要"翻书"动画作为入场**？还是直接淡入到桌面视角？
9. **Mobile 是否做"幻灯片版本"**？即移动端不是降级，而是完全不同的"翻页式简历"体验
10. **Day default 还是 Night default**？我建议 Night（grimoire），但 Linlin 决定

---

## 14. 参考资源

### 视觉风格

- [Bruno Simon Portfolio](https://bruno-simon.com/) — 3D 沉浸式作品集顶级范例
- [Maggie Appleton](https://maggieappleton.com/) — illustrated digital garden 顶级范例
- [Robby Leonardi Interactive Resume](https://www.rleonardi.com/interactive-resume/) — interactive sidescroller
- [Distill.pub](https://distill.pub) — 交互式 ML 论文
- [Acko.net](https://acko.net) — 数学可视化
- [Patatap](https://patatap.com) — 声音 + 视觉游戏

### 中国画与画中世界

- [Wikipedia: Along the River During the Qingming Festival](https://en.wikipedia.org/wiki/Along_the_River_During_the_Qingming_Festival)
- [SCMP: 4D interactive Qingming at Beijing Palace Museum](https://www.scmp.com/culture/arts-entertainment/article/2154396/classic-chinese-painting-brought-life-4d-interactive)
- [CGTN: Dynamic digital Qingming scroll](https://news.cgtn.com/news/2023-07-11/Dynamic-digital-scroll-reveals-life-a-millennium-ago-1llENznzcQ0/index.html)
- [New Atlas: Crystal CG digital animated tapestry at Shanghai Expo 2010](https://newatlas.com/crystal-cg-digital-animated-tapestry/16108/)

### 学术页面参考

- [Lil'Log (Lilian Weng)](https://lilianweng.github.io/) — 极简 ML 博客
- [Karpathy.ai](http://karpathy.github.io/) — 极简 ML 研究者
- [Best Personal Academic Websites Contest 2025](https://theacademicdesigner.com/2025/winners-of-the-best-personal-academic-websites-contest-2025/)

### 工具文档

- impeccable skill: `/home/linlin/.claude/skills/impeccable/reference/{critique,brand,motion-design,typography,color-and-contrast}.md`
- gsap-scrolltrigger: built-in skill
- lenis: [docs](https://github.com/darkroomengineering/lenis)
- @react-three/fiber + drei: built-in skills
- d3-force: built-in tool
- rive: [rive.app](https://rive.app)

---

## 15. 增订（2026-04-27 第二轮 mindstorm 后）

Linlin 在第二轮提出的三个关键约束 / 补充：

### D-H · 简洁感优先（hidden complexity）

> "设计要给人简洁感，把复杂的控制流隐藏起来。所有的东西应该是感觉自然的生长在这个魔法书世界里，而不是上面加了一层多出来的东西。"

**实施原则（贯穿所有模块的硬规则）：**

1. **没有任何"看起来像 UI 控件"的东西。** 所有控件必须以**世界中的物体**形式存在。对照表：
   | 旧（UI 控件） | 新（世界中的物体） |
   |---|---|
   | 顶部 navbar | ❌ 移除。改为书脊上突出的金属书签（章节锚点） |
   | Theme toggle 按钮 | 桌上的**蜡烛**（点燃 / 熄灭） |
   | Language switch dropdown | 桌上一座**小型旗杆架**（4 国旗替换） — 或书页的"译本切换" |
   | Search box (Cmd+K) | **钢铁侠式控制台**（详见 §16） |
   | 帮助 / FAQ | 机器人助手（已设计） |
   | 关闭 modal X | 一根**羽毛**轻拂 / 一颗**蜡封**按下去 |
   | Form submit button | 蜡封盖下去（Howler 已实现这个 metaphor） |
   | Theme dropdown 列表 | ❌ 不需要 — 只有 muggle / grimoire 二态，蜡烛点 / 灭代表 |
   | Mute / Sound | 桌上一座**小铜铃** |

2. **Affordance 必须自然**。不是"点这里"的标签，而是物体本身的**视觉吸引**：
   - 蜡烛火焰**呼吸跳动** → 自然吸引点击
   - 机器人**偶尔抬头看读者** → 自然产生"它能帮我"的认知
   - 控制台水晶**轻微脉动** → 自然引导
   - 任何 hover 反馈必须**物理化**（按下去 / 抬起来 / 转动 / 发光），不是"out of nowhere 的 UI 弹出"

3. **过渡必须无缝**。section 之间不能有 hard cut，必须是镜头平移 / 翻页 / 卷轴展开（详见 §17）。

4. **复杂度藏在凝视后面**。Edge-on-engagement 已经是这种思路 — 默认看不到任何"系统"，凝视后才浮现。所有复杂功能都遵循这个：默认隐藏，被关注时才呈现。

5. **绝不堆叠 modal**。所有"对话"、"详情面板"、"播放视频"都尽量原地展开，不另开图层（除非真的必须，如 lightbox）。

6. **去掉所有 emoji icon**。section title 不要 FontAwesome 头部小图标；改为**装饰性首字母**（drop cap）或**手绘小章**。

### 16. Iron-Man 式控制台（D-I）

> "类似钢铁侠那样的控制台桌面，最终目的是可以进行 ai chatbot 对话并且直接展示相关的具体模块/组件（麻瓜可以在这看原始内容），现在就先在这里放搜索模块，chatbot 设计作为未来计划。"

#### 概念

桌面上有一颗**水晶**（或一台 holographic 投影器），idle 时小而暗，激活后展开为**全息控制台**：

- **Idle 状态**：一颗悬浮在桌面上方约 20cm 的**棱形水晶**，内部有微弱蓝光呼吸（grimoire 模式）/ 暖光（muggle 模式）
- **Hover 状态**：水晶轻微旋转 + 周围浮起几个 hint particle
- **激活状态**：点击水晶 / 按 Cmd+K → 水晶炸开为**全息面板**：
  - 一块半透明蓝色面板浮起，宽 ~600px
  - 顶部：搜索输入框（无明显 border，置于面板的 typography 里）
  - 中部：实时搜索结果，每条结果是一个**"卡片缩略图"** — 但卡片样式与所属模块的视觉一致（书脊 / 玻璃罐 / 画壁画 等），点击 = 关闭面板 + 平滑滚到该模块 + 该模块**亮起**3 秒
  - 底部：键盘提示 ↑↓ / Enter / Esc
  - **未来扩展位**：底部有一行 chat 输入框（暂时灰显，hover 提示"chatbot 即将上线"）
- **关闭**：按 Esc / 点击外部 / 水晶折叠回去

#### 视觉语言

- **Grimoire mode**：全息**电青** + 紫罗兰咒文光
  - 面板边缘是流动的"咒语符文"（小符号沿边漂移）
  - 文字 typography：Spectral italic + 微微发光
  - 搜索结果排列像漂浮在空中的"魔法卡片"
  - 关闭时面板"分解为粒子"消散
- **Muggle mode**：全息**琥珀色** + 烫金
  - 面板边缘是简洁的几何线条（不是符文）
  - 文字 typography：Spectral regular
  - 关闭时面板"折叠成纸片"消失

#### 与现有 Cmd+K search 的关系

- 现有 search modal（D5.M+前的 Full-site search）**保留功能**，但**重新视觉化**为这个全息控制台
- 数据 / 索引层不变（仍按现有 search index）
- 仅替换 modal 的视觉
- 关闭后水晶回到 idle 状态

#### 未来扩展（chatbot — 不在 D7-D∞ 当前路线，标为 D-future）

- 底部 chat input 启用
- 接 Anthropic API（Claude Opus / Sonnet）作 backend
- chatbot 知道整站内容（embed papers + projects + about + cv）
- 用户问"她做什么的？" → chatbot 答 + **触发控制台展示对应模块**（panel 替换 search results 为 about/projects 缩略）
- 用户问"她最有引用的论文？" → 抓 publications 排序 → 展示 top 3 书脊
- "麻瓜模式"：chatbot 可以"展平"内容 — 例如"给我一份完整简历" → 输出纯文本简历可复制

#### 技术栈

- 全息面板视觉：CSS + SVG + 一点 R3F（如要真 3D）或纯 CSS 3D transforms
- 搜索逻辑：现有 search index + Fuse.js
- 未来 chatbot：Anthropic SDK + edge function（Vercel Edge / Cloudflare Worker；GitHub Pages 不能跑后端，需迁移或 hybrid）

#### 实施位置

- **D8 阶段**：把现有 Cmd+K modal **重新设计**为本控制台的视觉（但功能不变，只是视觉重做）
- **D-future 阶段**：接 chatbot

### 17. 整站作为羊皮纸卷轴（D-J）

> "整个页面也可设置成一个羊皮纸卷轴（你看看是横向还是纵向比较好），有卷轴的两端设计和可能的动画"

#### 我的推荐：**纵向挂轴 (vertical hanging scroll, 挂轴) + 局部横向手卷 (handscroll, 手卷)**

理由：

| 选项 | 横向 (清明上河图 / 千里江山图 / 手卷) | 纵向 (挂轴 / 中堂 / hanging scroll) | 推荐 |
|---|---|---|---|
| 中国画传统 | 手卷（私人鉴赏） | 挂轴（厅堂悬挂） | 都有 |
| 西方手稿传统 | 几乎没有横向 | 都是纵向 codex | 纵向 |
| Web 习惯 | ❌ 反直觉 | ✅ 默认 | 纵向 |
| 鼠标滚轮 | ❌ 需要 JS hack | ✅ 原生 | 纵向 |
| 移动端 | 需要 swipe | ✅ 原生 | 纵向 |
| SEO / 可访问性 | 难 | 易 | 纵向 |
| 总长度 | 长一些（几屏宽） | 极长（几十屏高） | 纵向更适合 portfolio |
| 与"魔法书"叙事 | 弱（魔法书是垂直翻页） | 强（既像挂轴又像翻开的长书） | 纵向 |

**最终架构：**

- **整站 = 一卷悬挂的羊皮纸卷轴 (挂轴)**
- 左右两侧是**卷轴的木轴（spool）**，固定在视口左右边缘（`position: fixed`）
- 顶部 + 底部各有一个**装饰性的卷轴端**（雕花木 / 黄铜帽）
  - 顶部 spool 端 = 卷轴起点（"开卷"）
  - 底部 spool 端 = 卷轴尾部（"末页"）
- 卷轴两侧木轴**随着滚动旋转**（CSS animation 联动 scroll position；scroll 越多 → 上方木轴转越多次）
- 这是**视觉装饰**，不影响内容布局；内容仍然纵向滚动
- 滚动到底 = "卷尾" 出现签名 + 蜡封 + 装订印章

#### 卷轴端的设计细节

**顶部端（开卷）**
- 一支**雕花木棒**横置（视口宽度 60-80%）
- 木棒两端是金属帽 + 装饰流苏
- 中央悬挂一个**牌匾**：双语 logo "贾林林博士 · 图表示学习人工智能魔法学徒 / Linlin Jia · Graph Representation Learning · AI Magic Apprentice"
- 牌匾下方一段红色绶带垂落到第一屏

**底部端（卷尾）**
- 类似的木棒 + 金属帽
- 卷尾印章：一个红色蜡封圆章，里面是手写"林" / "L"
- 蜡封下方一行小字：版权 + 联系方式
- 牌匾上方挂着一对装饰性挂坠（玉佩 / 铜钱 / 中西混搭）

#### 卷轴端动画

- **首屏入场（page-load）**：
  - 0s：屏幕全黑
  - 0.3s：顶部 spool 从屏幕上方降下到位（quart-out, 0.7s）
  - 1.0s：spool 开始旋转，卷轴向下展开（"开卷"）
  - 2.5s：卷轴展开到底部 spool（速度递减）
  - 2.8s：底部 spool 出现并固定
  - 3.0s：第一屏内容 stagger fade in（hero）
  - 共 ~3 秒入场
- **滚动时**：左右木轴随滚动**轻微转动**（视觉反馈；不必同步精确）
- **滚动到底**：底部 spool 上的蜡封做一次"按压"动画（press in），然后落回原位
- **离开页面（unload）**：可选 — 卷轴向上卷起 + 黑屏（如果浏览器支持 unload 动画）

#### 与"魔法书"框架的整合

- 之前 mindstorm 提到 "the open book frame"。**修订**：去掉 book 横向边框，改为 scroll 纵向边框（左右木轴 + 上下端）
- 卷轴本身就是**魔法书内的一卷长卷**（书 + 卷的混合：你打开一本书，里面是一卷长卷展开）
- "翻书"入场动画 → 改为"开卷"动画

#### 横向手卷的特例：§8.7 画壁走廊

§8.7 那段保留**横向滚动子区域**（gsap-scrolltrigger pin），是整站唯一一段横向运动 — 致敬清明上河图的手卷传统。这个对比反而强调了"主体是挂轴，里面有一段是手卷"的丰富性。

### 18. 修订决定汇总（D-H, D-I, D-J 对前文的影响）

以下是对 §1-§14 的修订指令；实施时以本节为准：

| 原条文 | 修订 |
|---|---|
| §5.1 整站框架 = 翻开的书（左右翻页边缘） | ❌ 移除。改为 §17 的纵向挂轴卷轴框架 |
| §5.5 / §6.x 顶部 navbar 章节锚点 | ❌ 移除。改为书脊上的金属书签或滑出式的卷轴边缘小标 |
| §5.5 主题切换 = 桌上蜡烛（已对） | ✅ 保留。强化"看起来不是 toggle，是物体" |
| §11.1 Cmd+K 搜索 | 改为 §16 的水晶控制台 — 视觉重做但功能保留 |
| §8.x 各章节 section title 用 emoji icon | ❌ 移除 emoji icon。改用装饰性首字母 / 手绘小章 |
| §13 "翻书入场动画" | ❌ 改为 §17 的"开卷入场动画" |
| §6.x 主题命名 grimoire / muggle 不变 | ✅ 保留 |
| §4.B Edge-on-Engagement | ✅ 保留，未受影响 |

---

> **下一个 mindstorm 文件**：当 Linlin 在 §13 + §18 给出答案后撰写 `mindstorm-03-asset-generation-plan.md`（如果走资产生成路线）或直接进入 D8 实施。
