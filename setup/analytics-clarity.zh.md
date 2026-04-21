# 分析 — Microsoft Clarity（无需 cookie 同意）

> **Language:** [English](analytics-clarity.md) | 中文

Microsoft Clarity（免费、无限量）提供热图、会话回放、愤怒点击检测与基础访客统计。通过 `index_en.html` 中的一小段脚本（`</body>` 之前）注入。

**目标：让 Clarity 运行起来，且不向访客弹 cookie 同意横幅。**

## Master TOC

- [1. 创建 Clarity 项目（~2 分钟）](#1-创建-clarity-项目2-分钟)
- [2. 把 project id 粘到站点](#2-把-project-id-粘到站点)
- [3. 启用无 cookie / 无同意要求模式](#3-启用无-cookie--无同意要求模式)
- [4. 隐私政策简短声明（一次性）](#4-隐私政策简短声明一次性)
- [5. 遮蔽 — sanity check](#5-遮蔽--sanity-check)
- [6. 验证](#6-验证)
- [故障排查](#故障排查)

PLAN.md 交叉引用：`H2.M1.G2`（手动一次性 setup）。每周备份：`H2.M1.G4` + [analytics-backup.md](analytics-backup.md)。

Clarity 支持 *cookie-less* 模式 — 启用后仅在 `localStorage` 中存访客 ID，不写 HTTP cookie，按大多数法域（包括欧盟 / 瑞士 ePrivacy 规则）就不再强制要求 cookie 横幅了。你仍需要一段朴素的隐私政策说明，但不用强制点击确认。

## 1. 创建 Clarity 项目（~2 分钟）

1. 进 <https://clarity.microsoft.com/> → 用 Microsoft 账号登录。
2. **+ New project**。
   - **Name**：`jajupmochi-github-io`
   - **Website URL**：`https://jajupmochi.github.io`
   - **Site category**：Personal / Portfolio
3. 项目落地页顶部可见一个 10 字符的 **Project ID**，复制它（Settings → Setup 里也有）。

## 2. 把 project id 粘到站点

打开 `index_en.html`，靠底部找到：

```js
})(window, document, "clarity", "script", "PASTE_CLARITY_PROJECT_ID");
```

把 `PASTE_CLARITY_PROJECT_ID` 替换成第 1.3 步拿到的 id。提交。

## 3. 启用无 cookie / 无同意要求模式

在该项目的 Clarity 仪表盘里：

1. **Settings → Setup → Cookies**。
2. 切换 **"Remove Clarity cookies"**（按版本也可能写作 "Use localStorage only" 或 "Cookie-less mode"） → **ON**。
3. 保存。

这是唯一的开关。启用后：

- 不再写 `_clck` / `_clsk` cookie。
- 访客 id 改存在 `clarity.microsoft.com` 域下的 `localStorage`。
- 浏览器重置 / 清缓存会算作新访客（个人站无所谓）。

## 4. 隐私政策简短声明（一次性）

即使不弹 cookie 横幅，GDPR / ePrivacy 仍希望有简短声明。在站点的隐私页脚 / 关于页加一段类似：

> "This site uses Microsoft Clarity (cookie-less mode) for anonymous heatmaps
> and session replay. No personal data is stored; recordings are masked by
> default. See Microsoft's privacy statement at
> <https://privacy.microsoft.com/en-us/privacystatement>."

## 5. 遮蔽 — sanity check

Clarity 默认遮蔽表单输入框以及任何带 `data-clarity-mask="true"` 的元素。顺便到 Settings → Privacy → Masking 检查一下敏感字段（如有）都被遮蔽。我们明信片表单的输入都是普通文本，已经安全，但稳妥起见可以给整个 modal 加 `data-clarity-mask="true"`。

## 6. 验证

1. 部署站点（推到 `master` — GitHub Pages 自动部署）。
2. 在无痕窗口访问线上 URL。
3. Clarity 仪表盘 → **Live** tab：会话应在 1–2 分钟内出现。
4. 浏览器 DevTools → **Application → Cookies**：无 cookie 模式生效时不会在 `.clarity.ms` 下看到 `_clck` / `_clsk`。

## 故障排查

| 现象 | 可能原因 | 修复 |
|------|----------|------|
| 5 分钟后仪表盘里什么都没有 | Project id 还是占位符 | 重做步骤 2 |
| DevTools 里仍有 cookie | Cookie-less 开关没保存 | 重做步骤 3，硬刷新 |
| 刚上线时热图为空 | 热图需要约 10 次访问才有样本 | 等 — 正常现象 |
| CSP 拦了 Clarity | 严格 CSP 在位 | 允许 `script-src https://www.clarity.ms 'self' 'unsafe-inline'` 与 `connect-src https://*.clarity.ms`（见 setup/security-headers.md） |
