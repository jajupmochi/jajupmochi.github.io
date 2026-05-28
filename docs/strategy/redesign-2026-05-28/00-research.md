# Blog skeuomorphic redesign — research & variant matrix (2026-05-28)

> **Language:** English | (zh mirror pending)
>
> Goal: redesign every Markdown display module of the parchment blog into
> *skeuomorphic handwritten-paper* forms — simple, integrated, novel. Three
> variants per module, shown together in one lab HTML
> (`blog-skeuomorph-lab.html`). User then picks; we implement the winners.

## Master TOC

- [Source material](#source-material)
- [Design constraints](#design-constraints)
- [Variant matrix (9 modules × 3)](#variant-matrix-9-modules--3)
- [Deliverables](#deliverables)

## Source material

**Real manuscript / book / letter / scroll parts** (web research + domain):

- **Rubrication** — red (cinnabar) ink for headings & emphasis. Latin *rubrica*.
- **Marginalia** — margin notes, brackets, pointing hands (*manicule* ☞), fleurons.
- **Illumination** — gold/silver leaf on initials & borders (reflected light).
- **Deckle edge** — the untrimmed, irregular paper edge.
- **Physical fittings** — scroll dowels/rods, tie cords, sliding bead, silk
  bookmark ribbon + tassel, calligraphy paperweight (镇纸), brass pin / wax-seal
  brooch, book section tabs, gilt page edges, ledger ruling, paper creases,
  飞白 dry-brush strokes, 稿纸 grid paper, typewriter perforated slips.

**Homepage motifs already in `parchment-overrides.css` (reuse the vocabulary):**

- Illuminated **drop-cap**: cinnabar-red base + layered gold-rim shadows
  (carved depth, 8×1px inner gold rim, 8×2px hot-stamp band, gold halo).
- **Emboss** text-shadow on headings; **ink-bleed** ticker; 92%-opacity
  "ink-on-paper" body; faint **grid** parchment background; washi-tape / torn
  sticky-note components (OTW module); maroon + gold accent system.

## Design constraints

- Stay inside the warm parchment palette (OKLCH, maroon ink + gold + cinnabar).
- **impeccable absolute bans still hold**: no glassmorphism, no gradient text,
  no `border-left` side-stripe accents, no generic SaaS clichés.
- Body keeps a **handwritten** feel (Latin Patrick Hand, CJK 霞鹜文楷 / LXGW
  WenKai) — do NOT flatten to a plain system font.
- Skeuomorphism must stay **legible + simple**, not noisy. One clear physical
  metaphor per variant.
- Respect `prefers-reduced-motion` on every animated variant.

## Variant matrix (9 modules × 3)

| Module | V1 | V2 | V3 |
|---|---|---|---|
| **Reading progress (墨痕)** | Brush-stroke ink band, wet rough leading tip (SVG turbulence) | Thin line with ink-bleed blotches + fresh wet drop at head | Horizontal scroll unrolling — a dowel rolls right |
| **TOC toggle (三角→镇纸/别针)** | 镇纸 paperweight bar; press → scroll rolls | Brass pin / wax-seal brooch; pop → release | Ribbon tie; bow unties → unrolls |
| **TOC scrollbar (拟物)** | Side rod + carved sliding bead (玉珠) | Silk bookmark ribbon + tassel thumb | Curling paper edge; thumb = small paper roll |
| **Blockquote (引用)** | Folded-corner note + washi tape, tilted | Marginalia: cinnabar brace `{` + manicule ☞ | Big cinnabar quote mark on ruled lines + quill flourish |
| **Code block** | 稿纸 grid paper + paper language tab + wax-seal copy | Typewriter slip, perforated edges, red language stamp | Mini horizontal scroll w/ tiny dowels + hanging tag |
| **Table** | Ledger: red rules + rubricated header, no hard borders | Hand-drawn wobbly ink grid (rough) + double-stroke header | Row = faint card strip; header = paper tab |
| **List / bullets** | Hand-drawn ink dots / dashes / ticks | Cinnabar fleurons (❧ ❦ ※) as markers | Hand-ruled guide lines + manicule ☞ for emphasis |
| **Headings** | Illuminated initial (cinnabar+gold drop-cap) | Rubricated heading + ❧ + hand-drawn underline flourish | Protruding bookmark/section tab |
| **Horizontal rule** | Dry-brush 飞白 tapered ink stroke | Centered fleuron / asterism ⁂ with thin lines | Paper crease / fold line with soft shadow |

## Deliverables

- `00-research.md` (this file)
- `blog-skeuomorph-lab.html` — the lab: every module, 3 variants, on parchment,
  interactive where relevant. Servable at `/docs/strategy/redesign-2026-05-28/`.
- PNG renders per module section (via chrome-devtools) for review.
- After user selection → implement winners into `css/blog.css` + `js/blog.js`.
