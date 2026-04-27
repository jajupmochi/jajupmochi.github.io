# 本地开发 — 在自己电脑上跑起来

> **Language:** [English](local-dev.md) | 中文

站点是纯静态 HTML/CSS/JS，没有 build step，也没有 bundler。但是**双击打开**
`index_en.html`（即 `file://` 协议）会让 JSON 翻译加载失败 — 本指南解释为什么，
以及怎么正确跑。

**耗时：约 1 分钟。**

## Master TOC

- [为什么 `file://` 跑不通](#为什么-file-跑不通)
    - [出问题时实际看到什么](#出问题时实际看到什么)
- [本地跑起来](#本地跑起来)
    - [方案 A：Python（零安装，推荐）](#方案-apython零安装推荐)
    - [方案 B：Node 系服务器](#方案-bnode-系服务器)
    - [方案 C：IDE 插件](#方案-cide-插件)
- [切换语言](#切换语言)
    - [优先级顺序](#优先级顺序)
    - [示例 URL](#示例-url)
- [调试 welcome 弹窗](#调试-welcome-弹窗)
- [本地看 visit map](#本地看-visit-map)
- [本地调试高德地图 — 只能用 127.0.0.1](#本地调试高德地图--只能用-127001)
    - [申请 Key + jscode](#申请-key--jscode)
    - [本地 URL 必须是 127.0.0.1](#本地-url-必须是-127001)
    - [凭据贴在哪里](#凭据贴在哪里)
- [本地跑时的 Clarity](#本地跑时的-clarity)
- [故障排查](#故障排查)
- [相关文档](#相关文档)

## 为什么 `file://` 跑不通

翻译加载器在 `js/main.js:74`：

```js
const response = await fetch(`locales/${lang}.json`);
```

浏览器对 `file://` 协议下的 `fetch()` 有 same-origin / CORS 限制（某些浏览器
直接拒绝，某些允许发但解析 JSON 时报错）。fetch 失败后 `loadTranslations()` 会
退化到 `inlineFallback[lang]` — 这是 `js/main.js` 顶部内嵌的一个小对象，只包含
最关键的约 20 个 key，而不是完整的 386 个。所以大部分 `data-i18n` 节点只能
保留 HTML 里写死的英文默认值。

### 出问题时实际看到什么

- 语言选择器还能点（click handler 照跑）。
- 但切换到 ZH/FR/DE 时只有一小部分翻译生效 — "Send"、"Thank you"、主题名
  — hero / bio / publications / news 都还是英文。
- DevTools console 会报：
  ```
  Could not load translations for zh, using inline fallback: Failed to fetch
  ```

看到以上任一情况，说明你是用 `file://` 打开的。换成 HTTP。

## 本地跑起来

任何本地 HTTP 服务器都行。挑你本机已经装好的即可。

### 方案 A：Python（零安装，推荐）

```bash
cd /path/to/jajupmochi.github.io
python3 -m http.server 8000
```

浏览器打开 <http://localhost:8000/index_en.html>。Ctrl+C 停止。

### 方案 B：Node 系服务器

```bash
npx serve . -l 8000       # 在当前目录启 8000 端口
# 或
npx http-server -p 8000
```

### 方案 C：IDE 插件

- **VS Code**：装 **Live Server** 插件 → 右键 `index_en.html` → *Open with
  Live Server*。改文件自动刷新。
- **JetBrains**（IntelliJ / PyCharm / WebStorm）：自带预览 — 右键
  `index_en.html` → *Open In* → Browser。

## 切换语言

### 优先级顺序

页面加载时，起始语言按以下顺序解析（取第一个非空值）：

1. **URL 参数** `?lang=en|zh|fr|de`（优先级最高 — `sitemap.xml` 里做 SEO
   `hreflang` 也是这套）。
2. **`localStorage.preferredLang`**（上次访问时点过语言按钮存下来的）。
3. **`navigator.language`** — 以 `zh` / `fr` / `de` 开头就用对应语言，否则
   回落 `en`。

### 示例 URL

```
http://localhost:8000/index_en.html             # → 浏览器语言
http://localhost:8000/index_en.html?lang=en     # 强制英文
http://localhost:8000/index_en.html?lang=zh     # 强制中文
http://localhost:8000/index_en.html?lang=fr     # 强制法文
http://localhost:8000/index_en.html?lang=de     # 强制德文
```

把 `?lang=` 的 URL 收藏为书签，方便开发时锁定某个语言做测试。

## 调试 welcome 弹窗

欢迎明信片只对首次访客显示。一旦被关掉，就被
`localStorage.hasVisitedBefore = "true"` 锁住。

强制让它再出现：

1. 在 Chrome / Firefox / Safari 打开站点。
2. DevTools → **Application** tab → **Storage → Local Storage** → 你的
   origin。
3. 删掉 `hasVisitedBefore` key（或者点 *Clear storage* 一次清掉所有 key）。
4. 刷新，弹窗回来。

如果 `js/main.js:282` 里的 GAS backend URL 还是 `PASTE_...` 占位符，提交后
只会在 console 打一行：

```
[welcome-form] endpoint not configured — submission discarded { name: ..., ... }
```

在 DevTools console 里过滤 `[welcome-form]` 可以看每次提交的完整 payload。

## 本地看 visit map

About 区的 *Where visitors come from* 热力图数据来自
`data/analytics/clarity-YYYY-MM-DD.json` 快照 — 由每周 `backup-analytics.yml`
GH Actions workflow 生成。本地没有快照文件时，区块一直隐藏
（`<div id="visitMapBlock" hidden>`）。

想本地看效果，从线上站拷一个快照：

```bash
curl -sSL "https://jajupmochi.github.io/data/analytics/" \
  | grep -oE 'clarity-[0-9-]+\.json' | tail -1 \
  | xargs -I{} curl -sSL "https://jajupmochi.github.io/data/analytics/{}" -o "data/analytics/{}"
```

或者用 Clarity API token 跑一次 `scripts/fetch_clarity.py`。

## 本地调试高德地图 — 只能用 127.0.0.1

联系方式里的地图默认用 Google Maps，检测到中国大陆访客时切换为
**高德地图（Amap）**（详见 `js/main.js` 里的 `applyChinaMap()`）。高德是
目前在 GFW 内能稳定出图的唯一方案，所以直接内嵌，而不是藏在一个"打开地图"
按钮后面。

本地开发时有两个容易踩坑的点：

### 申请 Key + jscode

1. 在 <https://console.amap.com/dev/key/app> 登录，新建一个 Web 端（JS API）
   应用，把 **Key** 和 **安全密钥（jscode）** 都复制下来 —— 2021 之后高德
   要求两者同时传，缺一不可。
2. 凭据放密码管理器，不要进 git。它们和 Linlin 的高德账户 + 站点域名白名单
   一一绑定。

### 本地 URL 必须是 127.0.0.1

高德的域名白名单**不接受** `localhost` 这个字面量。如果你用
`http://localhost:8000/…` 打开站点，所有 JS API 请求都会被拒，报
`INVALID_USER_DOMAIN`，地图只剩一块灰底。

必须改用 `127.0.0.1`：

```bash
cd /path/to/jajupmochi.github.io
python3 -m http.server 8000
# 然后打开
http://127.0.0.1:8000/index_en.html
```

同时在高德控制台给这把 Key 的域名白名单里加上：

```
127.0.0.1
127.0.0.1:8000          # 控制台要求带端口时一起加
jajupmochi.github.io    # 生产域名
```

Linlin 约定用 8000 端口（`python3 -m http.server 8000`）；换端口的话记得
白名单也要同步加一条，否则本地地图又会变灰。

### 凭据贴在哪里

Amap 初始化代码会读 `js/main.js` 顶部两个常量（搜 `AMAP_KEY` /
`AMAP_JSCODE`）。本地调试时把值贴在那里就行 —— **生产环境**建议部署时注入，
不要把真实 key 长期留在公开 git 历史里。万一哪天误提交了，立即去高德控制台
换一把新 key。

## 本地跑时的 Clarity

Microsoft Clarity 注入在 `index_en.html` 末尾（约 1840 行）。`localhost`
下 Clarity 的 tag 服务器会接受 pageview，但仪表盘默认过滤开发流量 — 所以
本地测试时看不到自己不用紧张。

如果你在严格防火墙后面，`https://www.clarity.ms/tag/...` 请求会在 console
里报错。这**不会**让站点坏掉；Clarity 是延迟加载的，其它功能正常降级。

## 故障排查

| 现象 | 原因 | 修复 |
|---|---|---|
| 切换语言后大部分文本还是英文 | 用 `file://` 打开 | 改用 `http://localhost:...` |
| welcome 弹窗永远不再出现 | `hasVisitedBefore` 还在 localStorage | DevTools → Application → Local Storage → 删除这个 key |
| Console 里 `www.clarity.ms` 请求报错 | 公司防火墙拦了 Clarity | 预期行为，不影响站点 |
| visit map 区一直不可见 | 本地没有 `data/analytics/clarity-*.json` | 从线上站拷一个快照 |
| 高德地图变灰 / console 里 `INVALID_USER_DOMAIN` | 用 `localhost` 打开，或端口没加白名单 | 改用 `http://127.0.0.1:8000/…`，并在高德 Key 白名单里加 `127.0.0.1`（含端口） |
| `Address already in use :8000` | 已有其它 dev server 占端口 | 换端口：`python3 -m http.server 8001` |
| Network 里 `locales/*.json` 报 404 | 起 server 的目录不是仓库根 | 先 `cd` 到仓库根再起 server |

## 相关文档

- Welcome 表单后端：[form-backend-google-sheets.md](form-backend-google-sheets.md)
- Clarity 配置：[analytics-clarity.md](analytics-clarity.md)
- 安全响应头（CSP）：[security-headers.md](security-headers.md)
- 完整部署清单：[README.md](README.md)
