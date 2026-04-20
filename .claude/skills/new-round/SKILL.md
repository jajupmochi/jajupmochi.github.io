---
name: new-round
description: Start a new large-change iteration by creating index_en_v{N}_round{M}.html from the current state. Detects the next (version, round) pair automatically, or accepts an override like "v7" or "round2". Use for structural redesigns, new sections, or anything the user wants to stage instead of editing index_en.html directly.
---

# /new-round

Create the next working file for the iterative redesign workflow.

## Accepted arguments

- `$ARGUMENTS` empty → auto-advance (see rules below).
- `v<N>` (e.g. `v7`) → start a fresh version at `round1`.
- `round<M>` → next round within the current max version.
- `v<N> round<M>` → explicit override.

## Auto-advance rules

1. Glob `index_en_v*_round*.html` and parse `(N, M)` pairs.
2. Let `Nmax` be the highest version.
3. Within `Nmax`, let `Mmax` be the highest round.
4. If `Mmax < 3` → new file is `v{Nmax}_round{Mmax+1}`.
5. If `Mmax == 3` → new file is `v{Nmax+1}_round1`.

## Steps

1. Compute target filename per the rules above.
2. Refuse to overwrite if the target file already exists — report and stop.
3. Source selection:
   - If advancing the round within a version: copy from `index_en_v{N}_round{Mmax}.html`.
   - If opening a new version: copy from `index_en.html` (the current deployed state).
4. Show the user: source file → target file, size, and ask confirmation before the actual copy.
5. After copy, report the new file path and remind the user that visual verification via `/verify-visual` is still required before `/deploy-round`.

## Notes

- Do not delete prior round files. They are the user's intentional revision history.
- If the user wants to skip rounds (e.g. jump from v6_round1 straight to v6_round3), require an explicit override argument — auto-advance refuses to skip rounds.
