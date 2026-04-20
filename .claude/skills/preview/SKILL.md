---
name: preview
description: Start a local HTTP server (python3 -m http.server 8000) in the background so index_en.html can be opened in a real browser. Use whenever the user wants to preview changes, or as a prerequisite before /verify-visual.
---

# /preview

Start the local preview server for this site.

## Steps

1. Check if port 8000 is already occupied by a previous preview:
   ```bash
   ss -lntp 2>/dev/null | grep ':8000 ' || echo "free"
   ```
   If already in use, tell the user and skip to step 3 (don't start a second server).

2. Start the server in the background from the project root:
   ```bash
   python3 -m http.server 8000
   ```
   Use `run_in_background: true` so the server keeps running for the session.

3. Report the URLs the user should open:
   - `http://localhost:8000/index_en.html` (primary)
   - `http://localhost:8000/index_zh.html` (legacy Chinese page)
   - `http://localhost:8000/new_web_test.html` (D3 force-graph reference)

## Notes

- The user starts the chrome-devtools MCP plugin manually; this skill does NOT navigate the browser. For Chrome-driven verification, use `/verify-visual` after the user confirms the plugin is up.
- `file://` access breaks `fetch('locales/*.json')` due to CORS — a local HTTP server is required for real i18n loading (the site has an inline fallback, but visual verification of i18n behavior needs the server).
- To stop the server, terminate the background process.
