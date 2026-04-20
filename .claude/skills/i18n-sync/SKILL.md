---
name: i18n-sync
description: Check that locales/{en,zh,fr,de}.json share identical key trees. Reports keys missing in any of the four files — these show up as raw English leaks on the deployed site. Run after editing any locale file, or when the user mentions a translation feels "off".
---

# /i18n-sync

Verify that the four locale files are structurally parallel.

## Files

- `locales/en.json`
- `locales/zh.json`
- `locales/fr.json`
- `locales/de.json`

English is the reference — if a key is in `en.json` but missing elsewhere, that's a translation gap. If a key is in another file but missing in `en.json`, that's usually an orphan (rarely useful, propose removal).

## Steps

1. Read all four files. If any file fails to parse as JSON, stop and report the syntax error — fixing validity comes first.
2. Flatten each object to dot-notation keys (e.g. `nav.home`, `hero.badge`).
3. Compute the union of all keys.
4. For each file, list:
   - **Missing** keys (in the union but not in this file)
   - **Extra** keys (in this file but not in `en.json`)
5. Report a compact table:

   ```
   File       Missing   Extra
   en.json    0         —
   zh.json    3         0
   fr.json    7         1
   de.json    7         1
   ```

6. Offer actions:
   - Print each missing key with its English value (for the user to translate).
   - If the user wants, auto-fill missing keys with the English value as placeholder (marked so they're easy to grep for later).

## Notes

- Don't attempt machine translation — leave that to the user.
- Nested arrays should be ignored for key comparison (flatten down to object paths only).
- Do NOT mutate files without explicit user confirmation, even for fill-with-English.
