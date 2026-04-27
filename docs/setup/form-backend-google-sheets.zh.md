# Welcome 表单后端 — Google Sheets 走 Apps Script

> **Language:** [English](form-backend-google-sheets.md) | 中文

`index_en.html` 上的明信片表单提交到一个 Google Apps Script（GAS）Web App，它会把每次提交追加为一行写入你名下的 Google Sheet。零服务器，个人站点用免费额度等于无限，数据就在你自己的 Google Drive 里（可导出 / 可脚本化）。

**耗时：约 10 分钟。**

## Master TOC

- [1. 建立承载数据的 Sheet](#1-建立承载数据的-sheet)
- [2. 打开绑定的 Apps Script 项目](#2-打开绑定的-apps-script-项目)
- [3. 部署为 Web App](#3-部署为-web-app)
- [4. 把 URL 粘回站点](#4-把-url-粘回站点)
- [5. 冒烟测试](#5-冒烟测试)
- [Payload 字段](#payload-字段)
- [修改脚本后如何重新部署](#修改脚本后如何重新部署)
- [安全与隐私](#安全与隐私)
    - [为什么 endpoint URL 天生公开](#为什么-endpoint-url-天生公开)
    - [公开标识符 vs 真正的 secret](#公开标识符-vs-真正的-secret)
    - [从访客收集的数据](#从访客收集的数据)
    - [合规升级路径](#合规升级路径)
- [故障排查](#故障排查)
- [反垃圾选项（将来需要再做）](#反垃圾选项将来需要再做)

PLAN.md 交叉引用：`H2.M1.G1`（手动一次性 setup）。反垃圾：`H2.M2.G4`。

## 1. 建立承载数据的 Sheet

1. 进 <https://sheets.google.com> → **Blank**（空白）。
2. 把表格重命名为清晰的名字，例如 `linlin-site-submissions`。
3. 保留默认 tab — 脚本首次运行时会自己新建 `welcome-submissions` tab。

## 2. 打开绑定的 Apps Script 项目

1. 从 Sheet 菜单：**Extensions → Apps Script**。
   （它打开的是已绑定到该表格的 Script 项目，这正是 `SpreadsheetApp.getActiveSpreadsheet()` 所依赖的。）
2. 重命名项目：左上角标题 → `welcome-form-backend`。
3. 删掉编辑器里的占位 `function myFunction() {}`。
4. 把本仓库 `scripts/welcome-form-backend.gs` 的全部内容粘到 `Code.gs`。保存（⌘S / Ctrl+S）。

## 3. 部署为 Web App

1. 右上角：**Deploy → New deployment**。
2. 点 "Select type" 旁的齿轮图标 → 选 **Web app**。
3. 填：
   - **Description**：`welcome-form backend v1`
   - **Execute as**：*Me（your-address@gmail.com）*
   - **Who has access**：**Anyone** — 必需，否则公共站点 POST 不过来。
     （脚本以你身份运行，但 endpoint 本身是公开的。我们只接 `doPost` 并在 append 前对输入做 sanitize，因此风险仅限于垃圾行，可在 Sheet 里过滤。）
4. 点 **Deploy**。
5. Google 会请求访问你的 Sheet 的权限 — 点 **Authorize access**，选你的账号，在 "Google hasn't verified this app" 提示页点 **Advanced → Go to welcome-form-backend (unsafe)**。这是你自己的脚本，警告只是因为 Google 只自动验证发布的 add-on。
6. 复制 **Web app URL**。形如：
   `https://script.google.com/macros/s/AKfycb.../exec`

## 4. 把 URL 粘回站点

打开 `js/main.js`（约 282 行）找到：

```js
const WELCOME_FORM_ENDPOINT = 'PASTE_YOUR_APPS_SCRIPT_WEB_APP_URL_HERE';
```

把占位字符串替换成第 3.6 步拿到的 Web app URL。提交。

> 这一行以前内联在 `index_en.html` 里；内联 `<script>` 被抽到 `js/main.js`
> 之后就搬过去了（任务 `#46`）。

## 5. 冒烟测试

1. 在本地开站（`python3 -m http.server 8000` → `/index_en.html`）。
2. 若本浏览器已经点掉过 welcome 弹窗，进 DevTools → Application → Local Storage → 删 `hasVisitedBefore`，刷新。
3. 填明信片，提交。应该看到纸屑特效 + "Thank You" 卡片。
4. 打开 Google Sheet → `welcome-submissions` tab。数秒内应该出现一行，列为：
   `timestamp_iso | name | profession | message | theme | locale | user_agent | referrer`

## Payload 字段

浏览器会 POST 一个 JSON body，字段如下（`js/main.js:287-295`）：

| 字段（JSON） | 来源 | 后端有 sanitize？ |
|---|---|---|
| `name` | `#visitorName` input（用户输入） | 是 — `sanitize_()` |
| `profession` | `#visitorProfession` select | 是 |
| `message` | `#visitorMessage` textarea | 是 |
| `theme` | `document.body[data-theme]` | 是 |
| `locale` | `currentLang`（JS i18n 状态） | 是 |
| `userAgent` | `navigator.userAgent` | 是 |
| `referrer` | `document.referrer` | 是 |

GAS 的 `doPost` handler 自己加 `timestamp_iso`（`new Date().toISOString()`），
然后把一行 append 到 Sheet。首次运行写入的表头（便于人读）用的是
**snake_case**：

```
timestamp_iso | name | profession | message | theme | locale | user_agent | referrer
```

camelCase 到 snake_case 的映射在 `getOrCreateSheet_()` 里硬编码 — 新增字段时
要同时改 `js/main.js` 的 payload **和** GAS 的表头数组，否则新列会没标题。

## 修改脚本后如何重新部署

Apps Script 把每次编辑都视作新版本。要让改动在线上 URL 生效：

- **Deploy → Manage deployments → 铅笔图标 → Version: New version → Deploy。**

用 "Manage deployments"（而非 "New deployment"）能保持 URL 不变，这样不用再改 `index_en.html`。

## 安全与隐私

### 为什么 endpoint URL 天生公开

Apps Script Web App URL（`WELCOME_FORM_ENDPOINT`）**不是 secret**。它明文写
在 `js/main.js` 里 — 所以也躺在这个 GitHub 仓库里 — 因为任何静态站点的表单都
必须把后端 URL 暴露给客户端，否则浏览器根本 POST 不过去。这跟以下是同一种
模型：

- Stripe publishable key（`pk_live_...`）嵌在客户端 JS
- 传统 HTML 表单的 `<form action="https://...">`
- Google Analytics / Microsoft Clarity 的 tracking ID

Apps Script 部署里的 "Who has access: Anyone" 就是让未登录浏览器能 POST 成功
的必要条件。限制到 Google 账号就得要求每个访客先登录 — 对公开站点不可
接受。

纯静态站没办法"藏"这个 URL。即使在 build time 从 env var 读，编译出来的 JS
还是要带着它给浏览器，点开 DevTools → Network 一清二楚。真正能藏只有加
server-side 代理（例如 Cloudflare Workers / Netlify Functions 加
origin-Referer 校验 + 速率限制） — 对个人站是过度工程。

**真实风险是什么？**

- **针对 Sheet 的 spam POST。** 任何人都能脚本化刷这个 endpoint。
  `sanitize_()` 能中和公式注入（`=…`、`+…`），但防不了数量。偶尔扫一眼
  Sheet；按 `timestamp_iso` 排序过滤垃圾行。
- **GAS 配额被耗尽。** Apps Script 免费额度约为每天 90 分钟执行时间。持续大
  量请求可能打满额度，导致合法提交被拒。
- **攻击者不能做的事：** 读 Sheet（脚本只实现了 `doPost`，`doGet` 只返静态
  提示）、删行、访问你的 Google 账号、提升到其它 scope（脚本请求的是
  `spreadsheets.currentonly`，绑定于这一个 Sheet）。

### 公开标识符 vs 真正的 secret

将来接新服务时的参考表：

| Token | 存放位置 | 是 secret 吗？ |
|---|---|---|
| `WELCOME_FORM_ENDPOINT`（GAS URL） | `js/main.js`（明文已提交） | **不是** — 天生公开 endpoint |
| `CLARITY_PROJECT_ID`（如 `"wfp3nak9zq"`） | `index_en.html` 内联 `<script>` | **不是** — 公开 tracking ID |
| `CLARITY_API_TOKEN` | GitHub Actions secret，`backup-analytics.yml` 读 | **是** — 泄露要轮换 |
| 将来的服务端 credential | GitHub Secrets 或 env var，**绝不**放客户端 JS | **是** |

经验法则：只要这个 token 最终进到浏览器执行的 `<script>` 里，它就是公开的。
按"标识符"对待它，不是"key"。

### 从访客收集的数据

每次 welcome 表单提交都会往你的 Google Drive 存以下内容：

- **用户输入：** `name`、`profession`、`message`。`message` 是自由文本，访客
  可能自己把 email / 电话键进去。
- **浏览器派生：** `userAgent`、`referrer`、`locale`、`theme`、
  `timestamp_iso`。

保留期：**无限期**，除非手动删 Sheet 里的行。

以下情况会触发隐私法律义务：

- **EU 访客 → GDPR** — 要求有合法依据（通常是 consent 或 legitimate-interest
  通知）、隐私政策交代用途、要响应删除请求。
- **加州访客 → CCPA / CPRA** — 要求披露收集行为 + 提供 opt-out。
- **中国大陆访客 → PIPL（个人信息保护法）** — 跨境传输需要单独同意（数据存
  在 Google Drive，即境外存储）。

对流量低的个人学术站，执法风险几乎为零 — 但"重视隐私"对 ML Research 招聘方
（尤其注重 responsible AI 的 lab）是加分项。当前站点已经做的缓解：

- 在 postcard 的 Send 按钮正下方渲染一行隐私提示（四个 locale 里的
  `welcome.privacy_note` key）。
- footer 的隐私声明（`footer.privacy`）里补充了 welcome 表单的数据去向，
  跟 Clarity 的声明并列。

### 合规升级路径

以后如需更严的合规（比如被 EU 机构的站点引用），渐进加固方案：

1. **独立的隐私页面**（`privacy.html`），包含完整数据清单 + 数据控制者联系
   方式 + 删除请求流程。从 footer 链过去。
2. **提交前强制勾选同意框**（"I agree …"）。防止"无意中"提交被当默示同意。
3. **缩短保留期。** 定时跑的 Apps Script trigger，自动删除 N 天以上的行。
4. **如果不需要就别收 IP / User-Agent。** 从 payload 和 Sheet 表头里去掉
   `userAgent` / `referrer`。
5. **换一套合规后端**（如 Cloudflare D1 + Workers、Fastmail webform），如果
   Google Drive 存储跟所在机构政策冲突。

## 故障排查

| 现象 | 可能原因 | 修复 |
|------|----------|------|
| 表单提交了，Sheet 里没出现 | 旧部署被缓存 | Manage deployments → New version |
| Console 显示 CORS 错误 | 用了 `application/json` content-type | 代码里用的是 `text/plain`；检查你没改动 |
| 提交时 "Authorization required" | 部署设成了 "Only me" | Manage deployments → 改访问为 **Anyone** |
| 行里被注入公式 | 输入以 `=` 或 `+` 开头 | 已由 `sanitize_()` 处理 — 会在前面加 `'` |

## 反垃圾选项（将来需要再做）

Endpoint 是公开的，所以机器人可能刷垃圾。低成本缓解方案：

1. **Cloudflare Turnstile** — 隐形 CAPTCHA，提交前加。免费。
2. **蜜罐字段** — 真人不会填的隐藏 `<input>`；填了就拒。
3. **GAS 内 per-IP 限流** — 在 PropertiesService 里记 IP，> N/min 就拒。

垃圾真正出现前不用做 — 单页个人站很少被打。
