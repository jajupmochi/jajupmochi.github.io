# Site Polish v8 — Research

> One-sentence purpose: ground the 5-round full-site optimization in audience data (interviewers/peers), readability standards, and 2026 design-trend evidence.

## Master TOC

- [Audience findings (interviewers)](#audience-findings-interviewers)
- [Readability standards](#readability-standards)
- [Personality / trend findings](#personality--trend-findings)
- [Per-page baseline audit](#per-page-baseline-audit)
- [Strategy implications](#strategy-implications)

## Audience findings (interviewers)

Sources: [The Muse — 6 hiring managers on personal sites](https://www.themuse.com/advice/can-a-personal-website-help-your-job-search-what-6-hiring-managers-really-think), [The Academic Designer](https://theacademicdesigner.com/2025/35-page-ideas-for-your-academic-personal-website/), [Townsend Center (Berkeley)](https://townsendcenter.berkeley.edu/blog/personal-academic-webpages-how-tos-and-tips-better-site).

- Visitors average **~30 s**; anything important must be ≤ 3 clicks; ≤ 5–6 primary nav items.
- Hiring managers zero in on the **2–5-line bio / value proposition** more than anything else.
- They look for **personality and authenticity** ("what would this person be like as a colleague; show what you're proud of") and **storytelling** (not a re-formatted CV).
- A bad-looking site is a negative signal, but "gorgeous" isn't required outside design roles — clarity wins.

## Readability standards

Sources: [USWDS typography](https://designsystem.digital.gov/components/typography/), [Toptal web typography](https://www.toptal.com/designers/typography/web-typography-infographic), [Harvard a11y — design for readability](https://accessibility.huit.harvard.edu/design-readability), [Smashing 10 principles](https://www.smashingmagazine.com/2009/03/10-principles-for-readable-web-typography/).

- Body ≥ **16px effective**, line-height ≈ **1.5** (raising 1.0→1.2 improves accuracy ~20%); line length **45–90 ch** (66 target); left-aligned.
- ≤ 2 typefaces for CONTENT (display/accent faces extra); bold/italic sparingly.
- Neutral background, charcoal text, 1–2 accents used consistently.

## Personality / trend findings

Sources: [Inky Designworks — micro-graphics 2026 "anti-AI rebellion"](https://www.inkydesignworks.com/posts/micro-graphics-design-trends-2026), [Envato portfolio trends 2026](https://elements.envato.com/learn/portfolio-trends), [UXPilot web trends 2026](https://uxpilot.ai/blogs/web-design-trends-2026).

- 2026 pushback against hyper-perfect UI: **hand-drawn, raw-edged, visibly human** design; "handmade/tactile elements drive ~67% higher engagement than AI-perfect work."
- **Micro-interactions carry personality**: hover feedback, tiny motion, unexpected floating details.
- Implication: this site's parchment/manuscript language is *on-trend* — the play is MORE tactile micro-detail and micro-interaction, while body text becomes disciplined for reading.

## Per-page baseline audit

Baselines: `base-*.png` (2026-06-11, 1440×980).

| Page | Strengths | Gaps |
|---|---|---|
| `index_en` | rich notebook hero, strong credibility sections (10-round pass done) | handwriting body on long prose (Indie Flower) taxes reading; section intros dense; hero value-prop line could be sharper |
| `index_en_clear` (zh/fr/de) | deliberate clean white-green style, compact hero | different system — internal polish only (type rhythm, spacing); NOT parchment-converted |
| `blog` list | washi title, covers, filters | handwriting body for descriptions hurts scan; weak list hierarchy; top nav minimal (no site navbar); personality thinner than home |
| `blog` post | TOC scroll, AI-callout, typewriter code | **long-form body in handwriting = the site's biggest readability debt**; meta row dense; end-of-post has no "next step" for visitors |
| `apps-deck` | editorial spreads, on-theme | full-screen view fine; check copy + meta row type sizes |
| `apps-gallery` | bento + washi tape | plain header (no site navbar); weaker theme intensity; footer thin |
| `personal` | freshest page (paper home + 旺财) | minor: ribbon hint copy; consistency of footer/links |

## Strategy implications

1. **Readability first** (R1): keep handwriting for headings/accents/labels (theme + trend), switch LONG-FORM/content prose to Spectral serif at ≥16px/1.6 across pages (blog post body is the highest-value fix).
2. **Coherence** (R2): one navbar/footer language everywhere (parchment pages); gallery/blog lifted to homepage's theme intensity; zh page polished within its own clean system.
3. **Personality** (R3): micro-interactions + hand-drawn details (marginalia, ink flourishes, 旺财 cameo) — lean into the anti-AI-polish trend.
4. **Interviewer flow** (R4): 30-second rule — sharpen the value-prop line, every page ends with a "where next" hand-drawn signpost; ≤3 clicks to proof.
5. **QA lock** (R5): mobile + a11y + consistency + perf pass over the v8 set.
