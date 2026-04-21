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
- [修改脚本后如何重新部署](#修改脚本后如何重新部署)
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

打开 `index_en.html` 找到：

```js
const WELCOME_FORM_ENDPOINT = 'PASTE_YOUR_APPS_SCRIPT_WEB_APP_URL_HERE';
```

把占位字符串替换成第 3.6 步拿到的 Web app URL。提交。

## 5. 冒烟测试

1. 在本地开站（`python3 -m http.server 8000` → `/index_en.html`）。
2. 若本浏览器已经点掉过 welcome 弹窗，进 DevTools → Application → Local Storage → 删 `hasVisitedBefore`，刷新。
3. 填明信片，提交。应该看到纸屑特效 + "Thank You" 卡片。
4. 打开 Google Sheet → `welcome-submissions` tab。数秒内应该出现一行，列为：
   `timestamp_iso | name | profession | message | theme | locale | user_agent | referrer`

## 修改脚本后如何重新部署

Apps Script 把每次编辑都视作新版本。要让改动在线上 URL 生效：

- **Deploy → Manage deployments → 铅笔图标 → Version: New version → Deploy。**

用 "Manage deployments"（而非 "New deployment"）能保持 URL 不变，这样不用再改 `index_en.html`。

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
