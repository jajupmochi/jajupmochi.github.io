---
name: deploy-round
description: Promote a finalized round file (typically v{N}_round3) to index_en.html. Use ONLY after /verify-visual has passed on the round file. Does not push to git — the user commits separately.
---

# /deploy-round

Copy a finalized working file back to `index_en.html`.

## Accepted arguments

- `$ARGUMENTS` empty → promote the latest `v{Nmax}_round3.html` if it exists.
- `v<N>` → promote `v{N}_round3.html` (error if round3 missing).
- A full filename → promote that exact file.

## Steps

1. Resolve source filename per the argument rules above.
2. Verify the source exists and is readable.
3. **Confirm with the user** before overwriting `index_en.html`. Show:
   - Source file and its size
   - A `diff --stat index_en.html <source>` summary so they can see the delta
4. After confirmation, copy source → `index_en.html`.
5. Run `git status` so the user can see what's changed, staged or unstaged.
6. Remind the user:
   - Re-run `/verify-visual` on `index_en.html` itself (not just the round file) to confirm nothing differs between paths.
   - Commit + push manually when ready — GitHub Pages picks it up from `master`.

## Guardrails

- Do not commit or push — the user handles git themselves.
- Do not delete the source round file. The user keeps them for history.
- Refuse to run if `index_en.html` has uncommitted changes that aren't identical to the source — warn the user first.
