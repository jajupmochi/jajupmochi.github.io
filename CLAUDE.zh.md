# CLAUDE.zh.md

> **Language:** [English](CLAUDE.md) | 中文

本文件为 Claude Code (claude.ai/code) 在本仓库协作时提供规范。

## Master TOC

- [项目](#项目)
- [主要文件](#主要文件)
- [迭代工作流（混合模式）](#迭代工作流混合模式)
- [硬规则](#硬规则)
    - 更新文档前先询问 — 批量合并而非每次 edit 都落
    - SEO 审计前先询问 — 长报告会撑大 context
    - JSON 有效性、i18n 对齐、中英双语双文件、内容权威来源、Master TOC 强制要求
- [文档规范](#文档规范)
    - [Master TOC 强制要求](#master-toc-强制要求)
    - [PLAN.md — 路线图唯一来源](#planmd--路线图唯一来源)
    - [UPDATES.md — 变更日志](#updatesmd--变更日志)
    - [层级 + 状态符号体系](#层级--状态符号体系)
    - [中英双语双文件规则](#中英双语双文件规则)
- [预览](#预览)
- [主题](#主题)
- [Git / 部署](#git--部署)
- [子代理 / 技能 / 钩子](#子代理--技能--钩子)

## 项目

Linlin Jia 的个人学术网站，托管于 GitHub Pages（`jajupmochi/jajupmochi.github.io`）。纯静态 HTML/CSS/JS — 无构建系统、无打包器。目标受众：ML Research Scientist 招聘方。

## 主要文件

- `index_en.html` — 部署的英文站，访客看到的就是这个。
- `index_zh.html` — 历史遗留中文页面（年代久远，样式独立）。
- `locales/{en,zh,fr,de}.json` — `index_en.html` 加载的 i18n 翻译。
- `data/citations.json` — Google Scholar 引用数据（手工维护；无官方 API）。
- `res/cv/CV_Linlin_Jia_{en,zh}.pdf` — 网站引用的 CV。
- `new_web_test.html` — D3.js force-graph 设计参考，仅作灵感保留。
- `docs/` — 项目文档主目录。包含 `PLAN.md`、`UPDATES.md`、`setup/`（一次性配置指南）、`vibe/`（审计 / 研究笔记）与 `_archive-jekyll-minima/`（归档的 Jekyll 子项目）。索引见 `docs/README.md`。
- `blog/` — 历史遗留 Jekyll 子项目（Hux Blog boilerplate）。与主站无关，保留作为历史。

## 迭代工作流（混合模式）

- **小改动**（文案调整、单条样式修复、错别字）：直接编辑 `index_en.html`。
- **大改动**（新增段落、重设计、新功能）：新建工作副本 `index_en_v{N}_round{N}.html`。每版 3 轮 — round1 主要改动、round2 打磨、round3 定稿。round3 批准后，将其内容拷贝回 `index_en.html`。
- 下一个版本号 `N` 取现有 `index_en_v{N}_round*.html` 中最大值 + 1。
- 历史 `v{N}_round{N}.html` 有意保留以供参考 — 未经允许不要删除。
- `index_en_backup.html` 是重设计前的快照；不要动。

## 硬规则

- **必须做视觉验证。** 任何影响 UI 的改动必须通过 chrome-devtools MCP 插件（navigate、snapshot、inspect）在真实浏览器中验证后方可视为完成。仅靠代码审查通过或编辑成功不算数。
- **JSON 有效性。** `locales/*.json` 和 `data/*.json` 必须保持合法 JSON — 语法错误会直接打挂已部署站点。改动后跑 `jq . <file>`。
- **i18n key 对齐。** `locales/{en,zh,fr,de}.json` 四个文件的 key 树必须完全一致。若一个文件里加 key，四个全都要加（loader 有 inline 默认回退，但缺 key 会以原始英文露出来）。
- **内容权威来源。** 更新职业相关内容（bio、publications、projects、experience）时，权威来源是 `res/cv/CV_Linlin_Jia_en_*.pdf` 和 `extra_info_work.md`。如果站点和权威不一致，改站点，不改权威。
- **更新文档前先询问（2026-04-21 新增）。** 下面两条强制规则仍然适用，**但不要在会话进行中自动落到文档里。** 每批 edit 结束时，先问 Linlin 是否现在更新 `docs/UPDATES.md` + `docs/PLAN.md`，还是推迟。若她选择推迟，把待落的文档变更记在内部 running list（task 笔记 / scratchpad），等她说"更新文档" / "update docs" / "sync docs" 时一次性合并落下去。原因：长会话中每批都更一次文档会制造噪音 — 批量合并后历史和 commit 都读着更干净。下方"漏了就补"子条款仍然适用：commit 出去之前，相应的 UPDATES + PLAN 条目必须已经就位。
- **SEO 审计前先询问（2026-04-21 新增）。** SEO 相关的 skill / plugin / 脚本（`searchfit-seo:seo-audit`、任何 SEO 检查工具、对 `index_en.html` 的人工 SEO 审计）即使命中任务语境也**禁止自动触发**。每次必须先问 Linlin（"要不要跑一次 SEO audit？" / "Run an SEO audit?"）并等她点头。原因：SEO 审计报告冗长、要反复读很多文件，会撑大 context 并加速 Claude Code 的自动压缩 — Linlin 想自己决定什么时候付这个成本。本条规则在 SEO 场景下**覆盖** `CLAUDE.local.md` 里"工具主动性"的通用偏好。
- **`docs/UPDATES.md` 强制日志。** 本仓库的每一次改动（内容、代码、资源、文案、配置）都必须在**同一批 edit** 里加一条 `docs/UPDATES.md` 条目。格式：今日日期做 `# YYYY-MM-DD` H1（UTC，用环境里的 `currentDate` 或跑 `date -u +%F`），**最新日期放在最上面**。当天若有多次独立变更，在该日期下用 `## V1`、`## V2`、`## V3` H2 分组，**V 号最大的在最上**（最新工作优先落入）。每个条目是短 bullet 列表 — 改了什么、为什么。同批 edit 内同步更新文件顶部的 `## Master TOC` — 每新增一天加一个 bullet，每新增一个 V 加一个带一句 hook 的子 bullet。**没有对应 `docs/UPDATES.md` 条目（含 TOC）的 PR / commit 视为不完整。** 漏了就补。时机：遵循上面的"更新文档前先询问"规则 — 等 Linlin 点头再一次性落。
- **`docs/PLAN.md` 同步。** 如果改动命中某个已存在的 `docs/PLAN.md` 条目，必须在同一批 edit 里更新其状态符号（`[ ]`→`[~]`→`[✓]`）。如果引入新的计划工作（今天不发），则以新的 ID 加入对应的 Horizon / Milestone / Goal / Task。凡涉及路线图的改动未触及 `docs/PLAN.md` 视为不完整。时机：遵循上面的"更新文档前先询问"规则 — 等 Linlin 点头再一次性落。
- **每份文档强制 Master TOC。** 本仓库的每份 markdown（根目录 `.md`、`docs/**/*.md`、`.claude/skills/*/SKILL.md`）都必须以 `## Master TOC`（或等价 "Table of contents" 段）开头，按下方层级规范把每个 `##` section 列为 bullet。`docs/UPDATES.md` 也同样带 Master TOC — 用嵌套 bullet 按 日期 → `V<n>` 排列，每条一句 hook。新增条目时同批 edit 内保持同步。
- **中英双语双文件。** 所有仓库级文档必须以英文 + 中文两个独立文件形式存在。约定：`NAME.md`（英文，canonical）+ `NAME.zh.md`（中文镜像），并列存放。每份文件顶部都要一行语言切换器：`> **Language:** English | [中文](NAME.zh.md)`（或镜像写法）。代码、标识符、文件名、Horizon/Milestone/Goal/Task ID、以及 JSON/YAML 代码块内部两版都保持英文 — 只翻译散文。例外：`extra_info_work.md`（Linlin 个人素材）、`CLAUDE.local.md`（私有）、`.claude/skills/*/SKILL.md`（Claude 解析，必须保持英文；中文镜像可选）。

## 文档规范

### Master TOC 强制要求

每份 markdown 文档的第一个大段落就是 TOC。格式：

```markdown
# Title

> 一句话目标。

## Master TOC

- [Section 1](#section-1)
- [Section 2](#section-2)
    - [Subsection 2.1](#subsection-21)
```

采用多级 bullet（内容复杂时至少 3 级）。AI agent 仅凭 TOC 就能快速定位。

### PLAN.md — 路线图唯一来源

`docs/PLAN.md` 是**唯一**存放长期 / 中期 / 当前路线图的地方。不要在 README、CLAUDE.md 或代码注释里重复路线图信息 — 链接对应的 `docs/PLAN.md` ID 即可。

### UPDATES.md — 变更日志

`docs/UPDATES.md` 是时间序列的审计日志。每次改动以短 bullet 加到当日日期下。详见 `## 硬规则`。

### 层级 + 状态符号体系

用于 `PLAN.md`（以及任何有结构化 TODO 的文档）：

**层级：**

| 层 | ID | 范围 |
|----|----|------|
| **Horizon** | `H<n>` | 战略主题。月 → 年。 |
| **Milestone** | `M<n>` | 具体交付物。周 → 月。 |
| **Goal** | `G<n>` | Milestone 的可验证子块。天 → 周。 |
| **Task** | `T<n>` | 原子动作，单次 edit batch。分钟 → 小时。 |

ID 按创建顺序分配，**永不重新编号**。完整路径：`H1.M2.G3.T4`。

**状态符号：**

| 符号 | 含义 |
|------|------|
| `[✓]` | 已完成 — 上线、验证、代码已体现。 |
| `[~]` | 进行中 — 本 session 正在做。 |
| `[ ]` | 待办 — 入队，可立即领取。 |
| `[!]` | 阻塞 — 等依赖 / 外部答复。 |
| `[?]` | 等用户输入 — 需要 Linlin 做手动 / 外部操作。 |
| `[x]` | 已取消 — 保留历史，附一行 "Why cancelled:" 注释。 |

父级状态取最不完整子级。

### 中英双语双文件规则

详见上方硬规则最后一条。简述：`NAME.md`（英文）与 `NAME.zh.md`（中文）并存，代码 / 标识符 / ID 在两版都保持英文，仅翻译散文。

## 预览

```
python3 -m http.server 8000
```

然后打开 `http://localhost:8000/index_en.html`。用 `file://` 访问会把 `fetch('locales/*.json')` 打挂（CORS）— 一定要走 HTTP server。代码里对这种情况有 inline-translation fallback，但做视觉验证必须走 server。

## 主题

顶栏有个切换控件能循环 4 个主题：`ai-generated`（默认紫蓝）、`academic`（亮色极简）、`industrial`（深色，Orbitron 字体）、`fancy`（童话粉带动画）。主题状态在 `body.className` 和 `localStorage`。改 CSS 时 4 个主题都要验证 — `ai-generated` 下看着对的改动可能打挂 `fancy`。

## Git / 部署

- 远程：`git@github.com:jajupmochi/jajupmochi.github.io.git`
- 分支：`master`（GitHub Pages 自动部署 — 无需 CI 配置）。
- 提交前：跑 `git status` 和 `git diff` 让用户过目。未经明确指示不要提交。

## 子代理 / 技能 / 钩子

- `.claude/skills/` 存项目技能：`/preview`、`/verify-visual`、`/new-round`、`/deploy-round`、`/i18n-sync`。各自的 SKILL.md 有细节。
- `.claude/settings.json` 里的 PostToolUse 钩子会在编辑 JSON 文件后做校验。
- `.githooks/pre-commit` 在任何 `locales/*.json` 进入暂存时跑 `scripts/check_i18n_parity.py` — 若 `zh/fr/de` 与 `en.json` 的 key 树有出入，提交会失败。**每个克隆只需启用一次：** `git config core.hooksPath .githooks`。
