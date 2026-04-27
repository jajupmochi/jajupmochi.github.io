# GitHub Pages 上的安全响应头

> **Language:** [English](security-headers.md) | 中文

GitHub Pages 不允许我们设置任意 HTTP 响应头 — 所以能用浏览器接受的 `<meta http-equiv>` 标签就用。这覆盖大多数实用的 XSS / clickjacking / content-sniffing 缓解。

## Master TOC

- [我们设置了什么（在 `index_en.html` head 中）](#我们设置了什么在-index_enhtml-head-中)
    - [Content-Security-Policy](#content-security-policy)
    - [`unsafe-inline` — 为何保留](#unsafe-inline--为何保留)
    - [meta 无法做到的（局限）](#meta-无法做到的局限)
    - [`<meta name="referrer" content="strict-origin-when-cross-origin">`](#meta-namereferrer-contentstrict-origin-when-cross-origin)
    - [`<meta http-equiv="X-Content-Type-Options" content="nosniff">`](#meta-http-equivx-content-type-options-contentnosniff)
- [验证](#验证)
- [以后添加第三方脚本时](#以后添加第三方脚本时)

PLAN.md 交叉引用：引入任何新 CDN / 外部脚本时都相关。见 `H1.M2` 下的 tasks（SEO schema 依赖）与 `H2.M1.G1/G2`（Sheets / Clarity 源）。

## 我们设置了什么（在 `index_en.html` head 中）

### Content-Security-Policy

```
default-src 'self';
script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net https://www.clarity.ms https://c.clarity.ms https://webapi.amap.com https://*.amap.com;
style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com https://cdn.jsdelivr.net;
font-src 'self' data: https://fonts.gstatic.com https://cdnjs.cloudflare.com https://cdn.jsdelivr.net;
img-src 'self' data: blob: https:;
connect-src 'self' https://script.google.com https://script.googleusercontent.com https://*.clarity.ms https://api.country.is https://restapi.amap.com https://*.amap.com;
frame-src 'self' https://www.google.com;
worker-src 'self' blob:;
form-action 'self' https://script.google.com https://script.googleusercontent.com;
base-uri 'self';
object-src 'self';
upgrade-insecure-requests
```

每行的理由：

| Directive | 允许来源 | 为何 |
|---|---|---|
| `default-src 'self'` | 同源 | 未来任何 fetch 类型的保守兜底 |
| `script-src` | self + inline + eval + jsdelivr + clarity + amap | 全站有内联 `<script>`；canvas-confetti 走 jsdelivr；Clarity tag 在 clarity.ms；CN 访客时从 `webapi.amap.com` 加载高德 JS SDK；高德 SDK 要求 `'unsafe-eval'` |
| `style-src` | self + inline + googleapis + cdnjs + jsdelivr | 全站有内联 `<style>`；Google Fonts；Font Awesome；academicons |
| `font-src` | gstatic + cdnjs + jsdelivr + data: | Google Fonts 二进制；Font Awesome webfonts |
| `img-src` | self + data: + blob: + 任意 https | 外部缩略图、data-URI favicon、高德地图瓦片（canvas 里以 blob: 形式渲染） |
| `connect-src` | self + script.google.com + clarity + country.is + amap | Welcome 表单 POST 到 Google Apps Script；Clarity beacon 到 `*.clarity.ms`；`country.is` 用于 CN 检测；高德地图启用时访问 REST 端点取瓦片 / 地理编码 |
| `frame-src` | self + google.com | Google Maps iframe（高德是直接内嵌到 DOM，不走 iframe，不需要额外放行） |
| `worker-src` | self + blob: | 高德 SDK 会用 `blob:` URL 起 web worker 做离主线程的瓦片渲染 |
| `form-action` | self + script.google.com | 表单提交 — 明确白名单 |
| `base-uri 'self'` | — | 防止 `<base>` 标签注入攻击 |
| `object-src 'self'` | — | 不用 `<object>/<embed>`（本仓库因嵌入 SVG 放宽为 `'self'`） |
| `upgrade-insecure-requests` | — | 自动把游离 http:// 升级成 https:// |

### `unsafe-inline` — 为何保留

HTML 里有很多内联 `<script>` 块（初始化、页面路由器、welcome 表单处理等）和内联 `style=` 属性。移除它们是一次大重构（CSS 抽到独立文件、外部 JS 模块、nonces），对单作者的静态站点安全收益不大。暂时保留 `unsafe-inline`；若将来加入构建步骤再重新评估。

### meta 无法做到的（局限）

| Header | 为何跳过 |
|---|---|
| `X-Frame-Options` / `frame-ancestors` | `<meta>` 里无效 — 需要真实 HTTP 头。用下面的替代缓解。 |
| 严格 `Referrer-Policy` | 我们通过 `<meta name="referrer">` 设置 — 所有现代浏览器支持。 |
| `Permissions-Policy` | meta 方式受限；要真正生效需要 HTTP 头。跳过。 |
| HSTS | GH Pages 已经为 `*.github.io` 顶域下发这个头。 |

### `<meta name="referrer" content="strict-origin-when-cross-origin">`

跨源导航时从 Referer 头剥离 path/query — 限制精确 URL 泄漏给分析 / 外链。

### `<meta http-equiv="X-Content-Type-Options" content="nosniff">`

阻止浏览器对响应做 MIME 嗅探 — 削弱一种旧攻击向量（文本文件被重新解释为脚本）。

## 验证

1. 在 DevTools → **Console** 加载站点。任何 CSP 违规会显示为以 `Refused to ...` 开头的红色错误。
2. **Network** tab → 刷新 → 点 HTML 文档 → **Headers** tab → "Response Headers" 里看不到 meta 设置的 CSP（它只由客户端解析），但 DevTools → **Application → Frames → top → CSP summary** 反映生效策略。
3. 出现违规时，选择：
   - 把来源加进 meta tag 对应 directive，或
   - 如果这个调用本不该出现，直接移除。
4. **4 个主题都要测** — 有些主题加载不同字体 / 图标，可能改变所需来源。

## 以后添加第三方脚本时

把它的来源加到**两处**：`script-src` 和 `connect-src`（后者对应任何 XHR/fetch）。在无痕窗口中禁用缓存测试。
