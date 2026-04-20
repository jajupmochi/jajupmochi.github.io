---
name: verify-visual
description: Visually verify a UI change through the chrome-devtools MCP plugin before marking a task complete. This is the hard rule in CLAUDE.md — every UI-affecting change must go through this skill. Covers navigation, screenshot, console errors, and network 404s.
---

# /verify-visual

Drive the chrome-devtools MCP plugin to confirm a UI change actually works in a real browser.

## Prerequisites

- The local server is running on `http://localhost:8000` (run `/preview` first if not).
- The user has confirmed the chrome-devtools MCP plugin is attached. If unclear, ASK — do not assume. The user mentioned they start the plugin manually.

## Tool names

The chrome-devtools MCP tools are deferred — load their schemas with ToolSearch before calling them:

```
ToolSearch query: "select:mcp__plugin_chrome-devtools-mcp_chrome-devtools__navigate_page,mcp__plugin_chrome-devtools-mcp_chrome-devtools__take_screenshot,mcp__plugin_chrome-devtools-mcp_chrome-devtools__take_snapshot,mcp__plugin_chrome-devtools-mcp_chrome-devtools__list_console_messages,mcp__plugin_chrome-devtools-mcp_chrome-devtools__list_network_requests,mcp__plugin_chrome-devtools-mcp_chrome-devtools__evaluate_script"
```

## Protocol

1. **Navigate** to the page you changed, e.g. `http://localhost:8000/index_en.html`.
2. **Snapshot the DOM** (`take_snapshot`) — this gives element IDs you can target for clicks/inspects.
3. **Screenshot** (`take_screenshot`) the section(s) that changed. Pass a selector if focusing on a region.
4. **Console check** (`list_console_messages`) — any `error`-level message is a regression; surface them. Warnings about 3rd-party scripts (busuanzi, fonts) are usually benign but mention them.
5. **Network check** (`list_network_requests`) — flag any non-200 (especially for `locales/*.json`, `data/citations.json`, images, CSS/JS from CDNs).
6. **Interact where relevant** — if the change affects a theme switcher, navbar filter, or modal, `click` the control and repeat steps 3–5. The site has 4 themes (ai-generated, academic, industrial, fancy) — if the change touches CSS, sweep all 4.
7. **i18n sweep** — if the change touches text, also verify the other three languages via the language switcher (or `evaluate_script` to call `applyTranslations('zh')` etc.).

## Pass criteria

- Change is visible and correct on screenshot.
- No new console errors.
- No unexpected 404s.
- For theme/i18n changes, all variants verified.

## If verification fails

Do NOT mark the task complete. Report:
- What you expected vs. what you saw (attach the screenshot).
- Any console / network findings.
- Propose a fix and return to the edit loop.
