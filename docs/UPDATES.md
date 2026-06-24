# Update Log

> **Language:** English | [中文](UPDATES.zh.md)
>
> Mandatory development log per `CLAUDE.md` Hard Rules. Every change set MUST add an entry here in the same edit batch.
>
> Format: `# YYYY-MM-DD` (UTC) as date heading, **newest day on top**. Within a single day, use `## V1`, `## V2`, `## V3` H2 sub-headings **with the highest V number on top** so the most recent work lands first.

## Master TOC

- [2026-06-24](#2026-06-24)
    - [V1 — Homepage synced to the job-hunt CV: talks section, startup training, N-Banker AI Lead, content + truthfulness pass](#v1--homepage-synced-to-the-job-hunt-cv-talks-section-startup-training-n-banker-ai-lead-content--truthfulness-pass) — promoted Invited Talks to a dedicated `#talks` timeline section (navbar link, 2 new 2026 talks with slides, S+SSPR flag → 🇮🇹); added N-Banker **AI Lead** (experience) + **Innosuisse Entrepreneurship Training** (education) + 2 News rows; PLANALYSER method stack, swiss-river ST-LLM research line, AI-Tools skills, translator MVP1, recruitment-panel; truthfulness pass (foundations-for-drug-discovery, industry 8+→2+, honest LIULIAN). 4-locale i18n in parity.
- [2026-06-16](#2026-06-16)
    - [V3 — TV follow-ups: muted by default + remote sound, control overscan auto-hide, cover art for non-embeddable channels](#v3--tv-follow-ups-muted-by-default--remote-sound-control-overscan-auto-hide-cover-art-for-non-embeddable-channels) — per Linlin's review: the TV stays muted until the remote VOL turns sound on (YouTube via the iframe API + `origin`; Bilibili via its own control); the player's chrome is overscanned off by default and revealed only on hover (CSS `:hover`, re-hides when the mouse leaves); the 6 non-embeddable 小红书/微信 channels now show the real video's cover screenshot as the slate background instead of bare colour bars.
    - [V2 — Living-room TV with real video playback in the 3D personal room](#v2--living-room-tv-with-real-video-playback-in-the-3d-personal-room) — `personal.html` gains a wall-mounted 4K TV that plays Linlin's own videos: a real `<iframe>` in a CSS3DRenderer layer behind a depth-only WebGL hole (correct occlusion, the cat can pass in front), 19 shuffled Bilibili/YouTube channels + a test-card slate for non-embeddable 小红书/微信视频号, a paper remote (power / channel / volume / brightness / watch-on-site + keyboard), and an old-set snow→black→picture tune transition.
    - [V1 — Homepage social-preview image swapped to the parchment hero](#v1--homepage-social-preview-image-swapped-to-the-parchment-hero) — `index_en.html` OG/Twitter card → new `images/og-hero.jpg` (1200×630 capture of the live parchment notebook hero) instead of the old blue studio card; `alt` text refreshed; zh page + JSON-LD portrait left unchanged; re-scrape needed after deploy.
- [2026-06-11](#2026-06-11)
    - [V6 — site-wide v8 polish swapped live (5 rounds + 2 review rounds)](#v6--site-wide-v8-polish-swapped-live-5-rounds--2-review-rounds) — approval-gated v8 set went live: neat-handwriting reading tier (Patrick Hand ≥17px) across all prose; blog/gallery joined the site nav language (translated ×4); tactile personality (gilt selection, ink scrollbars, blog sign-off + 旺财 paw, footer paw trail); zh homepage renamed `index_en_clear.html`→`index_zh_clear.html` with a redirect stub + router/sitemap updates; pre-existing zh mobile 458px overflow fixed; pre-swap originals archived in `backups/pre-v8-swap-2026-06-11/`.
    - [V5 — 旺财 slinks under the coffee table (height-aware collision)](#v5--旺财-slinks-under-the-coffee-table-height-aware-collision) — a standing cat's head (y≈0.68) clipped through the tabletop (underside y≈0.59); now the table zone triggers a smooth crouch-walk (root −0.105, legs tucked, head down, slower gait) that clears the table by 0.05+, and post-reaction walks route to the NEAREST waypoint (the stale-node shortcut was the path that cut through furniture). Reactions are suppressed under the table (hearts only).
    - [V4 — pet 旺财: focus-follow camera, pat with 3 reactions; cuter eyes; collar fixed](#v4--pet-旺财-focus-follow-camera-pat-with-3-reactions-cuter-eyes-collar-fixed) — click 旺财 → the camera focuses and follows him around; nearby cursor becomes a hand; click = a paper hand pats him with one of 3 random reactions (blissful lean-in + hearts / belly-flop roll / offended shake-then-storm-off); scroll out (or ESC) steps back. Eyes redesigned to Dragon-Li reference (large golden almond, outer corner higher, big round pupil, two glints). Collar now truly wraps the neck and the 旺财 tag chains to it via a link.
    - [V3 — 旺财 gets a real body](#v3--旺财-gets-a-real-body) — the cat refined per Linlin's 4 points: lathed organic body (no more capsule-pill) + haunches/shoulder/scruff/cheeks; tail properly rooted (was floating 0.27 above the back); layered eyes (dark rim, amber iris, vertical slit pupil, glint) with random blinking; cinnabar collar + gilt tag engraved 旺财. Sleep tail flattened; fallback image re-shot.
    - [V2 — Personal entrance opened + a living 狸花猫](#v2--personal-entrance-opened--a-living-狸花猫) — navbar Personal now opens `personal.html` directly (teaser removed, teaser/fallback image re-shot from the v3 home); the placeholder cat became a procedural Li Hua tabby with 5 random, smoothly-blended behaviours (sit+look / walk on a waypoint graph / sleep / stretch / groom).
    - [V1 — Personal page rebuilt: paper pop-up HOME with diegetic interactions (v2+v3)](#v1--personal-page-rebuilt-paper-pop-up-home-with-diegetic-interactions-v2v3) — `personal.html` redesigned twice in one arc: v2 turned the generic 3D room into a parchment-true paper pop-up-book diorama (personal content only); v3, after Linlin's 5-point review, made it an indoor paper home (hinged door opening onto a pocket trail world) with game-like in-world interactions — wall-map story, door swing, spinning vinyl + floating notes, a page-flipping photo album — replacing the right sidebar entirely. Full-screen aspect-adaptive initial view.
- [2026-06-08](#2026-06-08)
    - [V3 — EN CV updated to the research-scientist build](#v3--en-cv-updated-to-the-research-scientist-build) — `res/cv/CV_Linlin_Jia_en.pdf` replaced (6 pp, 207 KB); same filename so every "my cv" link picks it up.
    - [V2 — Post-launch review corrections](#v2--post-launch-review-corrections) — apps mode-toggle now highlights the CURRENT view on all three modes (deck page gained the trio); H-index reverted to 6 per Google Scholar; "read my CV" became a "(my cv)" parenthetical in the About headline (×4 locales); footer gained DBLP and was reordered by recruiter/peer priority.
    - [V1 — apps-gallery.html defaults to the deck; 4 referenced figures committed](#v1--apps-galleryhtml-defaults-to-the-deck-4-referenced-figures-committed) — bare `apps-gallery.html` now redirects to the deck (`?view=` stays on the grid; no loop); 4 publication figures referenced by the live pages were untracked (would 404 on deploy) — committed.
- [2026-06-05](#2026-06-05)
    - [V3 — Homepage 10-round optimization pass (in-place, per-round, verified)](#v3--homepage-10-round-optimization-pass-in-place-per-round-verified) — a deep 10-round audit+optimize sweep of the live homepage for the launch: hero gains a "read my CV ↗" recruiter path + "130+ citations" credibility line; anchor-jump occlusion fixed (`scroll-padding-top`); pub-title legibility; on-brand maroon focus ring; H-index 6→7 (verified); mobile CV-link tap target; 2 Google-Fonts requests merged to 1 (drop unused ZCOOL XiaoWei); Clarity analytics un-blocked (CSP). Audit confirmed hierarchy / contrast (18:1) / spacing / motion-a11y / credibility surfaces already sound. Plan + per-round notes under `docs/strategy/homepage-redesign-2026-06-05/`.
    - [V2 — Launch prep (cont.): blog mobile TOC, exact postcard replication, Howler mobile size, zh postcard overflow, footer links](#v2--launch-prep-cont-blog-mobile-toc-exact-postcard-replication-howler-mobile-size-zh-postcard-overflow-footer-links) — collapsed blog TOC on mobile now hugs its label (compact tab, not a 200px bar); the parchment welcome postcard is re-pinned to its exact pre-parchment computed values (drifted §7 rewritten); the idle 尖叫信 envelope scales down on phones (140px→92px); the zh postcard clamps to the viewport + scrolls instead of overflowing; footer gains Twitter/X · ResearchGate · ORCID on both index files.
    - [V1 — Launch prep: navbar parchment background + Personal-room teaser](#v1--launch-prep-navbar-parchment-background--personal-room-teaser) — gave the top navbar a semi-transparent parchment background + blur (was fully transparent → overlapped content, worst on mobile), colour unchanged on scroll. Temporarily blocked the unfinished 3D room: navbar **Personal** now opens a small parchment teaser (room render + "coming soon") instead of `personal.html`, on both index files.
- [2026-06-04](#2026-06-04)
    - [V1 — Personal 3D room: graceful no-WebGL / no-hardware-acceleration fallback](#v1--personal-3d-room-graceful-no-webgl--no-hardware-acceleration-fallback) — `personal.html` showed a bare "needs WebGL" when the browser had hardware acceleration off (or only WebGL1; three r160 needs WebGL2). Replaced it with a content fallback (room image + "turn on hardware acceleration" instructions + 6 content cards → Apps / Publications / hobbies), `failIfMajorPerformanceCaveat:false` to allow a software context, and a CDN-load-failure timeout. Verified live.
- [2026-06-03](#2026-06-03)
    - [V2 — Personal section: interactive three.js 3D study/living-room (`personal.html`)](#v2--personal-section-interactive-threejs-3d-studyliving-room-personalhtml) — built a standalone three.js cozy study you orbit, with 6 clickable skeuomorphic hotspots → parchment panels (My desk → Apps, Bookshelf → Publications, Photos → album lightbox, Hiking, Dancing, Travel). All from three.js primitives in the parchment palette (one CDN dep, no model downloads). a11y Explore menu, reduced-motion, no-WebGL fallback, 0 console errors. Wired navbar **Personal** → `personal.html` (both index files). Docs + 10-round notes under `docs/strategy/personal-3d-room-2026-06-02/`.
    - [V1 — Apps entry in the homepage navbar; deferred blog work tracked in PLAN.md; 3D Personal-space work started](#v1--apps-entry-in-the-homepage-navbar-deferred-blog-work-tracked-in-planmd-3d-personal-space-work-started) — added an **Apps** nav link (`nav.apps` ×4 locales) → `apps-deck.html` after Projects on both `index_en.html` and `index_en_clear.html` (9 items, no wrap). Logged the pending blog work (scrollbar pick, Share/Related/Bookmark/Like, extras) under `docs/PLAN.md` H3.M3.2 G3–G5, and opened M3.5 for the three.js Personal-space home environment.
- [2026-06-02](#2026-06-02)
    - [V3 — Blog: skeuomorphic code-block scrollbar options + features implementation plan](#v3--blog-skeuomorphic-code-block-scrollbar-options--features-implementation-plan) — Linlin rejected the flat scrollbars and asked for a skeuomorphic (拟物) one; designed 4 material options (`docs/strategy/blog-scrollbar-skeuomorphic-2026-06-02.html`): 卷轴木轴 wooden rod · 黄铜 brass · 皮革缝线 stitched leather · 竹简 bamboo (layered gradients + inset/outset shadows + a `:vertical`/`:horizontal` cylinder highlight in a carved-groove track). Also wrote the implementation plan for the 4 chosen features (Share / Related / Bookmark / dedicated Like, incl. a giscus-backed vs serverless option) + a survey of more features, in `docs/strategy/blog-features-implementation-plan-2026-06-02.md`. Pending Linlin's scrollbar pick + plan sign-off.
    - [V2 — Blog: foldable Cite module (shared `.blog-fold`) + blog-features research + code-block scrollbar options](#v2--blog-foldable-cite-module-shared-blog-fold--blog-features-research--code-block-scrollbar-options) — generalized the collapsible footer pattern into a shared `.blog-fold` (summary + chevron + collapse) and applied it to both **Cite this post** and Edit-history (both collapsed by default). Added a research note (`docs/strategy/blog-features-research-2026-06-02.md`) on view count / likes / bookmark / share / RSS / related posts and how to build each on this no-backend static site, and a pickable demo of 4 parchment-matched code-block scrollbar styles (`docs/strategy/blog-scrollbar-options-2026-06-02.html`).
    - [V1 — Blog edit-history collapsed by default (click to expand)](#v1--blog-edit-history-collapsed-by-default-click-to-expand) — the per-post "Edit history" panel now renders as a native `<details>` collapsed by default (a `<summary>` with the revision count + a ▾ chevron); click expands the revision list + diff. A global rule was forcing the children visible, so the CSS also hard-hides the list/diff when `:not([open])`. (Homepage already links to the App Gallery via the Projects CTA → `apps-deck.html` — no change needed there.)
- [2026-06-01](#2026-06-01)
    - [V3 — apps-deck mobile control ribbon: one compact row (was 3 rows overlapping the slide)](#v3--apps-deck-mobile-control-ribbon-one-compact-row-was-3-rows-overlapping-the-slide) — on phones the revealed top control ribbon wrapped to 2-3 rows (138px in a 390px frame) and overlapped the slide. Root cause: the outer `.deck-ribbon` kept `flex-wrap:wrap` and the reused gallery `.section-controls` stacks `flex-direction:column` under 1024px. Fixed (≤1024px) to a single no-wrap ~50px row: keep the 林 mark / drop the brand text, only the filter-tags scroll horizontally, search + sort + tools pinned, near-solid bar background. Verified landscape (844×390), portrait-rotated, and desktop (unchanged); 0 console errors.
    - [V2 — Dependabot triage (13 legacy alerts dismissed + `.github/dependabot.yml`); apps-deck mobile rotate-hint auto-reveals the deck](#v2--dependabot-triage-13-legacy-alerts-dismissed--githubdependabotyml-apps-deck-mobile-rotate-hint-auto-reveals-the-deck) — all 13 Dependabot alerts were in non-deployed legacy subprojects (`blog/package.json` grunt ×3; `docs/_archive-jekyll-minima/Gemfile.lock` addressable/rexml/kramdown ×10) — never built or run by the static deploy, so not exploitable; dismissed all as `not_used` and added a `dependabot.yml` scoping update-PRs to the active github-actions surface. On `apps-deck.html` mobile, the portrait "Turn your phone" hint now auto-reveals the deck after ~3s (one-time timer + `hintDone` flag, 0.45s fade) instead of needing a tap.
    - [V1 — Deck wired into the site as the default apps view + 3-way Deck|Cards|Detailed toggle; deck fonts unified (mobile==desktop); cover + inline images for the 2 new blog posts; image convention documented](#v1--deck-wired-into-the-site-as-the-default-apps-view--3-way-deckcardsdetailed-toggle-deck-fonts-unified-mobiledesktop-cover--inline-images-for-the-2-new-blog-posts-image-convention-documented) — the orphan `apps-deck.html` is now reachable: a homepage Projects CTA (`common.open_gallery`, ×4 locales, on both `index_en.html` and the zh/fr/de `index_en_clear.html`) opens the deck, and the gallery's view toggle gains a **Deck** button (`Deck | Cards | Detailed`). Fixed the deck's mobile-vs-desktop font divergence: `parchment-overrides.css` was forcing the site's `Reenie Beanie / Indie Flower` (which the standalone deck never loads → platform-cursive fallback) onto the deck's `p/li/h2`; re-asserted the deck's own `Patrick Hand / Spectral / JetBrains Mono` scoped to `.deck-rotor` + `text-size-adjust:100%` (bonus: PLANALYSER now fits at full size). Gave `blog-version-history` (diff view) and `blog-comments-giscus` (giscus box) content-matching WebP covers + one inline screenshot each (en+zh). Recorded the cover/inline-image rule as a default in `blog-writing-style.md` (+zh).
- [2026-05-31](#2026-05-31)
    - [V3 — Apps deck: fit-to-column titles (PLANALYSER overlap gone), scale-to-fit canvas (mobile fullscreen never clips), bigger crisp images](#v3--apps-deck-fit-to-column-titles-planalyser-overlap-gone-scale-to-fit-canvas-mobile-fullscreen-never-clips-bigger-crisp-images) — the long single word PLANALYSER (526px) overflowed its 389px column and lapped onto the image by 73px; `fitTitles()` shrinks only overflowing single-word titles (→ 60.5px, clean 70px gap), short titles stay big. Mobile fullscreen clipped the bottom (action links 482px in a 390px frame) because `.deck-slide` is `overflow:hidden`; restructured to a **scale-to-fit `.deck-canvas`** (`--fit = min(1, availH/contentH, availW/contentW)`) so the whole spread always fits — desktop stays `--fit:1`. Images enlarged (54vw/820px, specimen 57vw/900px) and crisped (drop sepia → `contrast+saturate`). Verified by DOM measurement + screenshots: all 9 desktop, mobile 844×390, portrait-rotated; 0 console errors.
    - [V2 — Apps deck: remove Turn picker (always 3D cube), true centering, fix overlap (edge-on faces), per-project verified](#v2--apps-deck-remove-turn-picker-always-3d-cube-true-centering-fix-overlap-edge-on-faces-per-project-verified) — removed the transition picker (the deck is always the 3D cube turn now); the cube's adjacent faces sit edge-on (rotate ±90°) at rest so nothing peeks/overlaps (fixes PLANALYSER text+image overlap); the slide is now `grid auto auto + justify-content:center` so the image+text group is truly centred (fixes the left-shift). Every one of the 9 projects screenshot-verified at desktop + mobile (no overlap, centred, image sized, text complete).
    - [V1 — Apps deck: review pass 3 (3D cube default + loop, per-project centred layout, parchment blend, manuscript pagination)](#v1--apps-deck-review-pass-3-3d-cube-default--loop-per-project-centred-layout-parchment-blend-manuscript-pagination) — default 3D cube (loop-clean creative rotateY) + last↔first looping; redesigned the slide so image + text hug the centre gutter (consistent gap, centred — fixes LIULIAN-close / N-Banker-far); bigger images (3/2 diagrams); `mix-blend-mode:multiply` so white screenshots show the parchment through; responsive NDA seal; mobile `dvh/dvw` + single-row scroll tags (no overflow / 2-row); ink-tally-stroke pagination; fixed the loop-wrap text-overlap (deterministic reveal); arrows blur after click. Every project visually verified.
- [2026-05-30](#2026-05-30)
    - [V3 — Apps deck: review pass 2 (mobile landscape unified, horizontal layout, embedded images, transition options) + cross-page tag-contrast fix](#v3--apps-deck-review-pass-2-mobile-landscape-unified-horizontal-layout-embedded-images-transition-options--cross-page-tag-contrast-fix) — moved all controls into `.deck-rotor` so mobile rotates the whole UI to landscape; unified every slide to a horizontal two-column spread (fixes vertical overflow); embedded images directly on the paper (no card frame) + ink-style page arrows; added in-image hover rotate arrows for multi-image; a transition picker (Slide / Page drift / 3D Cube / 3D Flip); tightened text-image gap; aligned the NDA seal. **Cross-page**: fixed the active filter-tag contrast (red-on-maroon → cream-on-maroon) by excluding `.filter-tag` from a red-ink rule in `parchment-overrides.css` (affects homepage / gallery / deck; blog chip hardened too).
    - [V2 — Apps deck: fixes + UX pass (autoplay, multi-image rotate, reused controls, big arrows, mobile swipe)](#v2--apps-deck-fixes--ux-pass-autoplay-multi-image-rotate-reused-controls-big-arrows-mobile-swipe) — addressed Linlin's review of the deck: multi-image plates auto-rotate; the deck auto-advances (removed the `pauseOnMouseEnter` trap) with a progress bar; removed "codex" branding; image zoom = click-the-image + zoom cursor (dropped the tiny button); reused the gallery's `.section-controls` controls verbatim; big left/right arrows + a first-load swipe hint; mobile swipe fixed (custom handler for the rotated deck). Plus web-researched UX (a11y aria-live/keyboard, autoplay-off-on-mobile, empty/single states) and a mixed-aspect `contain` fix. 0 console errors.
    - [V1 — App Codex deck: standalone full-screen "web PowerPoint" prototype](#v1--app-codex-deck-standalone-full-screen-web-powerpoint-prototype) — new standalone `apps-deck.html`: the App Gallery reimagined as a full-screen, one-app-per-page codex (Swiper.js; auto-leaf + swipe + keyboard; marginalia controls hidden until mouse-move; 3 layout variants; parallax + zoom + fullscreen; mobile force-landscape). Reads `window.PROJECTS` (DRY). Designed with `impeccable` (brand register); research + plan + critique in `docs/strategy/apps-deck-redesign-2026-05-30/`. **Standalone, not merged** — for review.
- [2026-05-29](#2026-05-29)
    - [V6 — Custom parchment giscus theme](#v6--custom-parchment-giscus-theme) — `css/giscus-parchment.css` restyles the giscus comment box to the blog's parchment palette + serif/LXGW fonts (overrides GitHub-Primer CSS vars; keeps syntax-highlight colors). `mountGiscus` `data-theme` → the live theme URL. Only renders on the deployed site (giscus's iframe fetches the absolute URL; can't reach localhost).
    - [V5 — Two build-process blog posts: version history + giscus comments (bilingual)](#v5--two-build-process-blog-posts-version-history--giscus-comments-bilingual) — wrote `blog-version-history` and `blog-comments-giscus` (en+zh), documenting the two features just shipped, per `docs/conventions/blog-writing-style.md` (problem-first, AI-prompt + agent paragraph, reproducible code, real gotchas, Mermaid, human×AI authorship). Registered in `registry.json`. Also two design docs (per-paragraph annotation; blog↔homepage linking) and the `giscus` repo topic.
    - [V4 — Comments live (giscus / GitHub Discussions)](#v4--comments-live-giscus--github-discussions) — turned on the pre-wired giscus comment system: filled `repoId`/`categoryId` (derived via the GitHub API), switched mapping `pathname`→`specific` keyed by `post:<slug>` (the blog routes via `?post=`, so `pathname` would merge every post into one thread), and opened CSP for `giscus.app` (script/frame/style). Verified: per-post thread, no console errors, in-page sign-in box.
    - [V3 — Blog post version history (T0–T4+): edit log, view old version, in-page diff](#v3--blog-post-version-history-t0t4-edit-log-view-old-version-in-page-diff) — Zhihu/Wiki-style edit history on the static blog. Registry-driven 「编辑记录」panel + "last updated · N edits · full history ↗" stamp (T0–T2, zero API), in-page **view of any past version** (T3) and **side-by-side diff** (T4) via `raw.githubusercontent` + jsdiff/diff2html, contributors + `?rev=` permalink (T4+). Verified en/zh. Design: `docs/strategy/blog-version-history-design-2026-05-29.md`.
    - [V2 — fcitx5 blog: link the published repo + fix resource/zip links](#v2--fcitx5-blog-link-the-published-repo--fix-resourcezip-links) — added the companion-repo link (intro + Downloads) to the `ubuntu-fcitx5-pinyin` post (en+zh); its broken `resources/` links (config, theme, panel.js, custom.lua, dog script, `dog-design.zip`) repointed to the published repo (tree/blob/raw) — all verified 200.
    - [V1 — Multi-image project cards auto-advance](#v1--multi-image-project-cards-auto-advance) — gallery + homepage multi-image carousels now auto-cycle every ~4.2 s (pause on hover; disabled under `prefers-reduced-motion`).
- [2026-05-28](#2026-05-28)
    - [V6 — Homepage Projects now render from the shared data source (DRY, i18n preserved)](#v6--homepage-projects-now-render-from-the-shared-data-source-dry-i18n-preserved) — Homepage `#projectsTrack` is rendered by `Projects.mountHome()` from the same `window.PROJECTS` as the gallery — the duplicate hardcoded 11-card list is gone. `homeCardHTML` emits the existing `.project-card` structure with `data-i18n` keys so `main.js`'s `applyTranslations` (4-lang), carousel, lightbox, card-click, and filter all keep working untouched. SEO preserved (single SVG → `<object>`); gklearn stats pills + liulian/nbanker dots retained. Verified en/zh/fr with no English leak; gallery (9 cards) unaffected.
    - [V5 — App Gallery merged into one data-driven page (Cards+Detailed), bento cards](#v5--app-gallery-merged-into-one-data-driven-page-cardsdetailed-bento-cards) — Merged `apps-gallery.html` + `portfolio.html` into **one data-driven page** (approach A): `js/projects-data.js` (data only) + `js/projects-render.js` (render logic) + CSS (design) — clean separation. In-page `Cards | Detailed` toggle (localStorage-persisted), homepage-style controls (filter pills + search + **Sort**). Cards view is now a **bento** (featured LIULIAN spans 2×2, varied tiles — de-monotonous); Detailed view = project-cards. Shared carousel + lightbox (prev/next, counter, scroll-lock). `portfolio.html` deleted.
    - [V4 — Homepage Projects: multi-image cards (dots+swipe) + LIULIAN Online Demo](#v4--homepage-projects-multi-image-cards-dotsswipe--liulian-online-demo) — LIULIAN (studio+mobile) and N-Banker (chat+canvas) home cards become 2-slide carousels matching the gallery (dots + pointer/touch swipe; `stopPropagation` so the outer carousel + card-nav don't fire); LIULIAN gains an **Online Demo** link + card-click → liulian-web demo. New `proj_link.online_demo` key ×4 locales (parity OK).
    - [V3 — Gallery optimization pass: lazy-load, keyboard a11y, reduced-motion, lightbox polish](#v3--gallery-optimization-pass-lazy-load-keyboard-a11y-reduced-motion-lightbox-polish) — Ten-round polish on `apps-gallery.html`: lazy-load + `decoding=async` on all 12 slides (defers the 1.24 MB translator GIF); cards keyboard-focusable (`tabindex`/`role`/`aria-label`, Enter/Space to open); `prefers-reduced-motion` disables transitions; lightbox locks body scroll + shows an `n / total` counter; verified mobile (1-col), Detailed view, and homepage carousel.
    - [V2 — App Gallery overhaul: Detailed view restored, persistent controls row, 3-col, hover fix, borderless, WebP](#v2--app-gallery-overhaul-detailed-view-restored-persistent-controls-row-3-col-hover-fix-borderless-webp) — Reverses V1's single-page consolidation per Linlin's new direction: restored `portfolio.html` (Detailed view) and put the `Cards | Detailed` toggle into a persistent **controls row** (filter tags · search) on both views — gallery gains a working tag filter + search. Gallery: 3 cards/row on large screens, hover-overlay overflow + typography fixed, card rounding removed (blend into parchment). Speed: the 5 screenshots converted PNG→WebP (4.25 MB → 194 KB). Homepage Projects LIULIAN/N-Banker images synced to the gallery screenshots.
    - [V1 — App Gallery: hi-res screenshots + single-page consolidation; LIULIAN home card](#v1--app-gallery-hi-res-screenshots--single-page-consolidation-liulian-home-card) — `apps-gallery.html` is now the single apps page: swapped LIULIAN/N-Banker/homepage cards to `res/portfolio/img` hi-res PNG screenshots (diagrams stay SVG), deleted `portfolio.html` (Detailed view) + its `Cards | Detailed` toggle, and pointed the home Projects LIULIAN card at the architecture diagram + GitHub (Demo link & unused `proj_link.demo` i18n key removed).
- [2026-04-23](#2026-04-23)
    - [V2 — Job-hunt P0+P1+P2 end-to-end (hero signature/ticker, About restructure, layout reorder, Featured projects, Awards section, Invited Talks, +42 i18n keys)](#v2--job-hunt-p0p1p2-end-to-end-hero-signatureticker-about-restructure-layout-reorder-featured-projects-awards-section-invited-talks-42-i18n-keys) — Single big push driven by Linlin's "run end-to-end, no stops, give me a report" directive. **B1 — Above-the-fold:** new `.hero-signature` line (`graphkit-learn` author · SNSF + Innosuisse · ICPR 2026 · MSCA Alumni); About replaced 4 paragraphs with `about-headline` + 6 emoji bullets; M.Sc./B.S. (XJTU 2010-2017 with patent) moved to Experience timeline; drug-discovery reframed as "molecular property prediction (foundations for drug discovery — redox potentials, polymer optimization)"; 11 project cards got `data-priority`, new "Featured" sort option as default in Projects (graphkit-learn → top). **B2 — Credibility:** Publications default sort flipped to Most Cited; new H-index (6) + Grants (5+) stat cards (8 total); YOLO moved Domain → AI/ML; graphkit-learn live-stats pills (128⭐ + ~300 PyPI / mo). **B3 — Authority:** Invited Talks card added to Services (GRAPHADON, ACPR 2023, PhD defence); brand-new `#awards` section with 4 award cards (SNSF Postdoc.Mobility / SNSF Bodmer / SNSF GraphInk / Innosuisse PLANALYSER + ANR APi + MCAA). **B4 — Recruiter UX:** full-page section reorder via Python (hero → ticker → OTW → about → publications → projects → research → experience → skills → awards → services → news → contact); new hero `.hero-ticker` CSS marquee with 5 ticker items (ICPR 2026, Neobanker, GRAPHADON, SNSF Bodmer, graphkit-learn stars), `prefers-reduced-motion` fallback, ~255 lines of new CSS. **B5 — i18n:** 42 new keys × 4 locales (388 → **430**), parity verified. SEO audit deliberately skipped per Linlin.
    - [V1 — Anti-spam hardening + 12-item polish pass (flag emojis, zh fixes, chatbot UX)](#v1--anti-spam-hardening--12-item-polish-pass-flag-emojis-zh-fixes-chatbot-ux) — (A) Backfill: Apps Script anti-spam trio (honeypot + origin allowlist + dwell-time ≥ 2 s) + new `docs/setup/local-dev.md` + form-backend Security & privacy section + welcome-card `welcome.privacy_note`. (B) 12-item polish: 🇨🇭/🇫🇷/🇯🇵 flag emojis on geo items; zh wording fixes (hero badge, "可快速入职", 预映射, HES-SO / INSA full Chinese names, PRG, "贾林林" navbar+footer); River-Water-Temp authors appended (B. Fankhauser, V. Bigler, K. Riesen); removed redundant `contact.connect`; chatbot toast i18n × 4 locales; **chatbot UX fix** — 🤖 always visible (stacked above 🎁), welcome 🎁 only disappears after form-submit (skip path keeps it).
- [2026-04-22](#2026-04-22)
    - [V1 — Deferred backfill (V10 LIULIAN/Fun + V11 Cmd+K search) + today's batch (Skills restructure, Patent category, Map i18n, 7-paper pub-links, empty-filter UX, Visit Map)](#v1--deferred-backfill-v10-liulianfun--v11-cmdk-search--todays-batch-skills-restructure-patent-category-map-i18n-7-paper-pub-links-empty-filter-ux-visit-map) — One consolidated V covering three sittings: (A) V10 backfill — LIULIAN + Confidential Translator project cards, new "Fun" filter, card-polish pass. (B) V11 backfill — full-site Cmd+K / Ctrl+K search modal indexing sections / projects / pubs / news. (C) Today: Skills section restructured to 6 categories × 44 tags (ML/AI first, Languages last); new `patent` filter chip + ELM reclassified preprint→patent; Maps iframe + "Open in Maps" link i18n via parallel `data-i18n-src-map` + `data-i18n-href-map` attrs (new JS handler); 7 publications gain Preprint/Slides/Video links incl. YouTube↔Bilibili per-locale swap; filter chips with zero matches auto-disable; **Visit Map (Phase 4)** — Contact-section choropleth of visitor countries from weekly Clarity backup, lazy D3 + topojson + locally bundled world-atlas (`data/world-atlas/countries-110m.json`, ~108KB) to keep CSP `connect-src` tight. i18n: 124 → 141 keys/locale.
- [2026-04-21](#2026-04-21)
    - [V9 — SEO audit round-3 P0–P5 + UX polish + Projects 9-card CV-aligned refactor](#v9--seo-audit-round-3-p0p5--ux-polish--projects-9-card-cv-aligned-refactor) — SEO: sitemap broken-URL fix + 6 new figure URLs, `<h2>` i18n attrs for Beyond/Blog, title/description keyword tightening, citation counts into Person + 8 ScholarlyArticle schemas. UX: coming-soon toast glass-morphism rewrite, pub-thumbnail 180×140→220×172 with halved padding, thesis spacing above. Structural: Projects refactored to 9 CV-aligned cards — Virtual Bodmer deleted, OCTOPUSSY+RedoxPrediction merged, PLANALYSER/APi/SDN added, all `<a class="project-card">` → `<div>` with new `.project-links` footer widget + delegated JS click handler. 6 new i18n keys × 4 locales (124 total).
    - [V8 — Batch-B preprocessing (thesis repositioned, pub figures, patent i18n, services icon)](#v8--batch-b-preprocessing-thesis-repositioned-pub-figures-patent-i18n-services-icon) — Four parallel polish items ahead of Batch B: thesis highlight moved from top → bottom of Publications, 6 pub cards gain real figures (+ figure-filename rename to `YYYY_venue_*`), patent link now locale-aware via new `data-i18n-href-map` attr, Associations card icon `fa-edit` → `fa-id-badge`.
    - [V7 — A4 thesis integration (timeline + Publications highlight)](#v7--a4-thesis-integration-timeline--publications-highlight) — Ph.D. dissertation surfaced on-site for the first time: PhD timeline now exposes Thesis PDF + Defense slides buttons; Publications section opens with a featured highlight card above filters. 6 new `thesis.*` i18n keys × 4 locales (119 total). Cross-theme visual verify via chrome-devtools.
    - [V6 — Batch A wrap-up + SEO audit round-2 P0 cleanup](#v6--batch-a-wrap-up--seo-audit-round-2-p0-cleanup) — Batch A: `about.p5` collaborators reverted (will move to cards in Batch B), Personal/Blog coming-soon toast, cross-theme lightbox verified. SEO round-2: 4 `href="#"` dead links fixed, meta description 210→~160 chars.
    - [V5 — Content polish, collaborators surface, figure lightbox, timeline i18n parity](#v5--content-polish-collaborators-surface-figure-lightbox-timeline-i18n-parity) — MSc/BSc line appended to About, new `about.p5` collaborators summary, 5 `exp.desc_*` keys × 4 locales, services cards restructure, click-to-enlarge lightbox (CSS + JS + a11y).
    - [V4 — Docs folder reorg + vibe audit integration](#v4--docs-folder-reorg--vibe-audit-integration) — PLAN/UPDATES/setup → `docs/`, Jekyll archived, vibe items land as `H1.M2.G4` + `H1.M3.G4` + new `H1.M4`.
    - [V3 — Documentation overhaul (Master Plan + bilingual dual-file)](#v3--documentation-overhaul-master-plan--bilingual-dual-file-convention) — new `PLAN.md`, 9 Chinese mirrors, CLAUDE hard rules.
    - [V2 — SEO audit follow-through](#v2--seo-audit-follow-through-6-warnings--5-opportunities) — hreflang URL variants, FAQ/Breadcrumb JSON-LD, AVIF hero, sitemap depth 3→13.
    - [V1 — Content audit, figures, update log](#v1--content-audit-figures-update-log) — real CV publications, 4 SVG project figures, UPDATES.md created.
- [2026-04-20](#2026-04-20)
    - [V4 — Static refactor](#v4--static-refactor) — CSS/JS extracted out of `index_en.html` (4852 → 1289 lines).
    - [V3 — Tooling](#v3--tooling) — pre-commit i18n-parity hook, PostToolUse JSON validator, 5 project skills, `setup/` README.
    - [V2 — Site ops batch](#v2--site-ops-batch-forms-analytics-csp-mobile) — Google Sheets form backend, Clarity analytics, CSP hardening, mobile hamburger.
    - [V1 — v7 redesign deployment + P0 SEO/a11y](#v1--v7-redesign-deployment--p0-seoa11y-overhaul) — full redesign live, canonical/sitemap/WebSite schema, Lighthouse a11y fixes.
- [2026-04-02](#2026-04-02) — manual Google Scholar citations refresh (130 / 7 / 5).
- [2024-01-17](#2024-01-17) — CV PDFs updated.
- [2023-12-13](#2023-12-13) — heavy CV refresh.
- [2023-10-24](#2023-10-24) — new paper + CV update.
- [2023-09-27](#2023-09-27) — new papers + CV update.

# 2026-06-24

## V1 — Homepage synced to the job-hunt CV: talks section, startup training, N-Banker AI Lead, content + truthfulness pass

Compared `index_en.html` against the canonical job-hunt profile (`modes/_profile.md` + `research_scientist_en.tex` in the job-hunter workspace) and brought the live site up to date. Every claim traces to the CV / profile (no fabrication).

- **Invited Talks promoted to its own section.** The Invited Talks `.service-card` became a dedicated `#talks` section (`Invited Talks & Presentations`, placed after Experience) in the Experience-style **timeline format with the date pulled to the front**, plus a navbar `Talks` link. Two 2026 talks added with slide PDFs self-hosted in `res/slides/`: CSSABern academic salon, Bern (*From Dialogue Box to Agent: A Researcher's Path with AI Tools*, Jun 2026) and the Swiss-Sino Science Club, Zurich (*How Graphs Understand the World*, May 2026). The S+SSPR 2020 entry's flag was corrected 🇫🇷 → 🇮🇹 (the workshops were in Venice, Italy).
- **Experience + Education.** New **N-Banker AI Lead** entry (2024–Present, Hong Kong: led the AI strategy + an LLM-agent system, AI Studio PoC, data-fusion-platform design, demonstrated at InnoEX 2026) at position 2; new **Innosuisse Entrepreneurship Training** (Business Concept, Module 2, University of Bern, 2025) education entry. Both also added as News rows.
- **Content depth (from the profile):** PLANALYSER method stack (YOLO + Vision Transformer symbol detection, Segment Anything edge detection, graph topology extraction, custom HVAC block recognition, semantic graph reconstruction); swiss-river current-research line (spatio-temporal LLMs, fine-tuning + structure-based GRPO, research stage); AI-Tools skills (Claude Code, Codex, OpenCode, Gemini, GPT-5-Codex); `confidential-translator` marked MVP1 public; Supervision card gains the technical recruitment panel (20+ candidates interviewed).
- **Truthfulness pass:** bare "drug discovery" claims qualified to "foundations for drug discovery" in the OG / JSON-LD prose (the literal phrase kept intact for SEO); the Industry-Experience stat `8+` → `2+`; the LIULIAN description pulled back to "under active development" (dropped "live web app / BI agent systems / productizable").
- **i18n:** new `talks.*` group (14 keys) + `nav.talks` + `sections.talks` + `services_cards.supervision_i3` + 5 News keys across en/zh/fr/de; the 6 old `services_cards.talks_*` keys removed; all 4 locales verified in parity. See PLAN `H1.M1.G11.T2`.

# 2026-06-16

## V3 — TV follow-ups: muted by default + remote sound, control overscan auto-hide, cover art for non-embeddable channels

- Per Linlin's review of the new TV, three fixes:
- **Sound**: the set stays muted on tune-in (browser autoplay policy) and the remote's VOL turns sound on. YouTube unmutes via the iframe API (added `&origin=` for reliable cross-origin control); Bilibili has no public volume API, so its sound is adjusted on the player's own control (now reachable, see overscan below). OSD notes guide each case.
- **Control chrome auto-hide**: the embedded player's own UI (Bilibili / YouTube control bar, title, borders) is "overscanned" off-screen by default (`transform:scale(1.14)` on the iframe inside the `overflow:hidden` screen) for a clean full-bleed picture; moving the mouse onto the screen reveals the native controls (`scale(1)`), and leaving re-crops them. Pure CSS `:hover`, which stays active over a cross-origin iframe (JS mouse events do not fire from inside one).
- **Cover art for non-embeddable channels**: 小红书 / 微信视频号 cannot be iframed, so they stay as test-card channels, but each now uses the real video's cover screenshot as the slate background (6 covers pulled from each note's `og:image` / video poster and self-hosted under `images/tv-ext/` to avoid mixed-content) with a bottom gradient + title + "watch on site" prompt. The WeChat channel is retitled to its actual video ("巴塞罗那高空跳伞"). Falls back to colour bars if a cover is ever missing.

## V2 — Living-room TV with real video playback in the 3D personal room

- `personal.html` gains a wall-mounted slim 4K **TV** that actually plays Linlin's own videos. The screen is a real `<iframe>` living in a `CSS3DRenderer` layer behind the transparent WebGL canvas; a depth-only "hole" mesh (`colorWrite:false`, `renderOrder:-1`) punches through the scene so occlusion is correct — the 旺财 cat can walk in front of a playing video. (The renderer became `alpha:true` with `scene.background=null` for the mix; the fog stays.)
- **19 channels**, deliberately shuffled (not chronological): Bilibili + YouTube embeds, plus non-embeddable stations (小红书 / 微信视频号) rendered as `type:'ext'` — a classic colour-bar test card + the title + a "watch on site" remote link. Channel 1 is a strong playable video. Short links were resolved up front (b23.tv → BV id; YouTube oEmbed for titles).
- **Paper remote** (parchment style, bottom-right): power, channel ±, volume ± (YouTube via the iframe postMessage API; Bilibili/ext show a note instead), brightness (CSS `filter` on the screen element), and a per-channel "watch on site" link. Keyboard: ←→ channel, ↑↓ volume. Channel changes play the old-set tune transition (snow → black + source swap → snow → picture) with a green channel OSD; `prefers-reduced-motion` skips the snow.
- Layout fits: the TV is centred on the back wall (curtains narrowed, photo wall slid right to make room). The focus camera pulls in for a sit-on-the-sofa view, and on narrow / portrait viewports it auto-pulls back (fov-based) so the whole set fits. Exit (power button / ESC / click the cream backdrop) stops playback (`src='about:blank'` — never `''`, which would reload the page) and restores orbit controls. 0 own console errors (the only console error is from Bilibili's own iframe script).
- The channel list is a `TV_CHANNELS` array at the top of the TV logic for easy editing; future video links get **shuffled in**, not appended. Built 2026-06-11..16; committed today.

## V1 — Homepage social-preview image swapped to the parchment hero

- The Open Graph / Twitter card image for `index_en.html` (what LinkedIn, X, Slack, etc. scrape) changed from the old blue-on-white studio card (`images/og-card.jpg`) to **`images/og-hero.jpg`** — a 1200×630 capture of the live parchment notebook hero (name, portrait, the "today's research" Graph-ML mindmap), so the share preview now matches the actual site instead of a separate design.
- How the image was made: screenshotted the real hero at a 1200×630 viewport with the navbar / welcome overlay / howl button / coming-soon toast / "open to opportunities" pill hidden, then saved JPEG q92 with 4:4:4 sampling (185 KB) so the thin red handwriting stays crisp.
- `index_en.html` edits: `og:image`, `og:image:secure_url`, `twitter:image` → `og-hero.jpg`; `og:image:alt` + `twitter:image:alt` rewritten to describe the parchment page. Dimensions stay 1200×630, type stays `image/jpeg`. The old `images/og-card*.jpg` files are kept untouched as a revert path.
- Out of scope / notes: the zh/fr/de `index_zh_clear.html` still uses `og-card.jpg` (old "clear" design — a parchment preview there would mismatch); the JSON-LD `Person.image` (portrait `photo.jpg`) is unchanged. Social platforms cache OG images, so after deploy the new card must be re-fetched via LinkedIn Post Inspector / X Card Validator to refresh. See PLAN `H2.M2.G3.T3`.

# 2026-06-11

## V6 — site-wide v8 polish swapped live (5 rounds + 2 review rounds)

Linlin approved the v8 candidate (built entirely in new files, originals untouched
during review — full docs in `docs/strategy/site-polish-v8-2026-06-11/`). Swapped live:

- **R1 可读性** — two-tier type: reading tier = **Patrick Hand** (the neatest loaded
  handwriting; Linlin's correction — readability must stay handwritten, no serif) at
  ≥17px / lh 1.66–1.7 for all sustained prose (blog body 17.3px + excerpts, home
  research/news/timeline/projects/pub-meta, gallery card descs); voice tier
  (Reenie/Indie/Caveat) keeps headings/labels/hero. zh body keeps its own calligraphy.
- **R2 主题** — blog navbar/footer carry Home·Apps·Personal (translated ×4 via
  js/blog.js dicts); gallery nav/footer + paw icon for Personal.
- **R3 个性** — gilt-highlighter `::selection`; parchment-ink page scrollbars; blog
  posts sign off "— Linlin" + 旺财 ink paw; footer paw trail (home + gallery);
  stat-card wiggle + skill-tag ink-dip hovers. (Title swashes were tried and removed
  per review; CV links on blog/gallery likewise removed.)
- **R5 QA** — mobile pass all pages; **fixed a pre-existing live bug**: the zh page's
  navbar link row forced 458px page width on phones (site-wide horizontal scroll).
- **zh homepage renamed** — history (38117b6) confirmed `index_en_clear.html` is the
  pre-parchment OLD EN homepage kept to serve zh/fr/de via i18n. Now properly named
  `index_zh_clear.html`; old URL keeps a redirect stub (meta refresh + JS, preserves
  `?lang=`); `js/main.js` router ×2, `index_en.html` hreflangs ×3, `sitemap.xml` ×7
  updated. Remaining old-name mentions are explanatory comments.
- **Backups** — exact pre-swap versions of all replaced/edited files archived in
  `backups/pre-v8-swap-2026-06-11/` (also in git history). v8 working files kept.

## V5 — 旺财 slinks under the coffee table (height-aware collision)

Linlin spotted the cat clipping through the coffee table. Root causes + fixes:

- **Height conflict.** Standing, the cat's back tops out at y≈0.595 and the head at ≈0.68,
  while the tabletop's underside is at y≈0.59 — any crossing clipped. Fix (per Linlin's
  suggestion): a **table zone** (r 0.8 around the tabletop) makes a walking cat
  **crouch-slink (趴着走)**: root drops 0.105, legs tuck (+0.85 rad), head lowers, gait
  swing/bounce damped, speed ×0.65 — crouched clearance 0.05+ under the table, eased in
  and out (no snapping). Verified numerically (root 0.261→0.150 across the zone) and
  visually (side shots at table height).
- **Stale-node shortcut.** When a pet reaction interrupted a walk, the next walk targeted
  a neighbour of the *last visited* node from wherever the cat stood — a straight line
  that could cut across furniture. Now an off-graph cat routes to the **nearest** waypoint
  first.
- Reactions are suppressed while inside the table zone (no sitting up under the tabletop;
  patting there gives hearts only).

## V4 — pet 旺财: focus-follow camera, pat with 3 reactions; cuter eyes; collar fixed

Third cat pass per Linlin's points:

- **Click-to-focus + follow.** Clicking 旺财 (hover shows a washi「旺财」label + pointer)
  enters a focus mode: the camera tweens close and then **follows him** as he wanders
  (target tracks the cat each frame; the camera keeps its user-controlled orbit offset).
  Hotspot clicks are suspended during focus; ESC or **scrolling out past 3.4 units**
  steps back to the HOME view (the requested wheel-out exit).
- **Patting.** While focused, the cursor near the cat becomes a **hand** (`grab`); click
  = a paper hand (ink-outlined canvas, matching the world) bobs two pats over his head,
  and one of **3 random reactions** plays: ① blissful — leans into the hand, eyes squint
  shut, 3 cinnabar hearts float up; ② flop — rolls onto his side, belly up, and rights
  himself; ③ offended — quick head-shake, tail lashing, then storms off to another
  waypoint. Reactions blend through the same pose system (no snapping); reduced-motion
  gets hearts only. Verified: full cycle focus→pat→pat→wheel-out→hotspots-intact, plus
  each reaction individually; 0 console errors.
- **Cuter eyes** (per [Dragon Li breed references](https://en.wikipedia.org/wiki/Dragon_Li):
  large luminous almond eyes, golden-green, outer corners set higher) — rebuilt as big
  golden almonds with **large round pupils** + two glints, outer-corner-up tilt; reads
  warm instead of beady. Blink + sleep/bliss squint retained.
- **Collar/tag fixed.** The collar ring now sits perpendicular to the neck axis (fully
  around the neck, inner edge seated in the fur) and the 旺财 tag hangs from a **gilt
  link that wraps the collar tube** — chained, not floating. Verified in macro shots.

## V3 — 旺财 gets a real body

Cat refinement per Linlin's 4-point review (technique grounded in a quick web check:
[LatheGeometry profile-spinning](https://threejs.org/docs/pages/LatheGeometry.html) is the
standard way to get organic bodies from a 2D silhouette; also referenced
[three-low-poly](https://github.com/jasonsturges/three-low-poly) and the
[learning-three.js lathe example](https://github.com/josdirksen/learning-threejs/blob/master/chapter-06/02-advanced-3d-geometries-lathe.html)):

- **Body de-geometrized.** The capsule pill became a **lathed cat silhouette** (neck →
  shoulders → belly → haunches → tapered rear, 12-point profile spun 18 segments), plus
  haunch/shoulder/scruff lumps and white cheeks — reads as an animal, not a primitive.
- **Tail rooted.** The tail base was floating 0.27 above the spine (v1 bug Linlin spotted);
  now anchored inside the rear of the body with a joint ball hiding the seam. Sleep-pose
  tail re-tuned to lie flat on the floor (was ending tip-up like a question mark).
- **Eyes rebuilt.** Black dots → layered cat eyes: dark rim, amber iris (Li Hua yellow),
  vertical slit pupil, white glint, slight outward angle — plus **random blinking**
  (every 2–7 s) and eyes closed while sleeping.
- **项圈 + 旺财.** Cinnabar leather collar (torus, tilted with the neck) + a gilt ring and
  a hanging gilt tag engraved **旺财** (canvas texture, maroon rim, CJK-safe font stack).
  Verified readable in macro screenshots.
- Re-verified: 18 s roam (walk→sit→walk, continuous positions), all poses with the new
  body, 0 console errors; `res/portfolio/img/personal-room.png` re-shot with the final cat.

## V2 — Personal entrance opened + a living 狸花猫

- **Entrance open.** Navbar **Personal** → `personal.html` directly on both index files;
  the temporary coming-soon teaser fully removed (overlay markup ×2, `.ptz-*` CSS,
  `showPersonalTeaser`/`closePersonalTeaser` JS). Verified: click navigates, no stray
  references, no new console errors.
- **Teaser/fallback image re-shot.** `res/portfolio/img/personal-room.png` now shows the
  v3 paper home (clean render, UI hidden, cat in frame) — used by `personal.html`'s
  no-WebGL fallback.
- **狸花猫 (Li Hua tabby).** The 2-box placeholder became a procedural cat: canvas-painted
  mackerel fur (rings + dorsal line + tabby-M crown), white bib/belly/paws/muzzle, pink
  ears + nose, green eyes with glints, whiskers, ringed tail (3-segment chain), toon
  inverted-hull outline. **Behaviour state machine** with 5 actions — sit+look-around /
  walk / sleep (breathing) / stretch / groom (nodding) — random transitions with smooth
  pose blending (sleep→stretch 80%, etc.), walking on a 7-node waypoint graph with
  edge-list adjacency so paths are collision-free by construction; gait, head-bob, tail
  sway/flick layered on top. `prefers-reduced-motion` → the cat just sleeps and breathes.
  Verified: 25 s roam sample shows continuous positions + random state changes; all 5
  poses screenshot-checked; 0 console errors.

## V1 — Personal page rebuilt: paper pop-up HOME with diegetic interactions (v2+v3)

Linlin: the v1 3D room was ugly, style-mismatched, and carried professional content. Two
redesign passes in one arc (full docs: `docs/strategy/personal-room-v2-2026-06-11/` —
research, plan, round notes, v2 snapshot, screenshots):

- **v2 — paper pop-up book.** The room became a diorama rising from an open book on a
  parchment desk: MeshToon 3-step shading + `EdgesGeometry` ink-line edges + hand-cut
  jitter (the homepage's manuscript language in 3D); content reduced to personal corners
  only (travel / hiking / dancing / photos; desk→Apps and shelf→Publications removed
  everywhere, incl. the no-WebGL fallback cards).
- **v3 — the paper HOME (Linlin's 5-point review).** ① Indoor dollhouse-cutaway home —
  plank floor, walls + wainscot, curtained window, rug/sofa/coffee-table/lamp/plant/cat —
  with a **hinged door** opening onto a pocket trail world on the left page (the
  future-expansion area). ② Proportions humanized (mountains became small *outdoor*
  scenery). ③ Objects rebuilt multi-part (suitcase latches/wheels/stickers, sideboard
  drawers/knobs/feet, record player plinth/platter/label/tonearm + vinyl crate, teapot
  spout/handle/lid, framed photo wall with washi tape…). ④ **Diegetic, game-like
  interactions replace the right sidebar**: Travel → wall map with the story written on
  it + popping pins; Hiking → the door swings open framing the outside; Dancing → vinyl
  + label spin, tonearm drops, ♪ notes float; Photos → the album on the table opens
  (propped cover), corner-tab page flips, click a photo → lightbox. aria-live `#story`
  keeps text accessible; explore chips / ESC / click-empty-to-return all work.
  ⑤ Full-screen initial view, camera distance adaptive to aspect (desktop and portrait).
- Verified: all 4 modes incl. direct mode-switch (exitMode), flip fwd/back, ESC chain;
  0 console errors/warnings at 1440×980 and 390×844.
- Known follow-ups (PLAN H3.M5.G2.T3/T4): re-shoot the homepage teaser image (still v1)
  and re-link navbar Personal when ready; drop in real photos later.

# 2026-06-08

## V3 — EN CV updated to the research-scientist build

- `res/cv/CV_Linlin_Jia_en.pdf` replaced with the new research-scientist version (PDF 1.5,
  6 pages, 207 KB, title "Linlin Jia – Ph.D."). Same filename → About-headline "my cv"
  links (en/fr/de) and JSON-LD pick it up with no markup change.

## V2 — Post-launch review corrections

- **Apps mode-toggle highlight.** The Deck/Cards/Detailed pill now highlights the current
  mode on ALL three views: `?view=` is authoritative on load (was click/localStorage-only),
  gallery's "Deck" is no longer permanently maroon (ID-scoped rules beat parchment's global
  link ink), and the deck page gained the same trio with **Deck** active (was missing
  entirely). Verified across all three modes.
- **H-index 7 → 6** on both index files + `data/citations.json`, per Google Scholar
  (the earlier bump to 7 came from a stale json field — wrong).
- **"read my CV" → "(my cv)"** parenthetical at the end of the About headline, per Linlin;
  implemented in `about.headline` across all 4 locales (zh links the zh CV); the separate
  hero link and About CV row removed.
- **Footer links: +DBLP, reordered** by what interviewers / collaborators / peers check
  most: Scholar → GitHub → LinkedIn → DBLP → ORCID → ResearchGate → X → Email (both
  index files; `ai-dblp` icon, pid 152/2558).

## V1 — apps-gallery.html defaults to the deck; 4 referenced figures committed

- **apps-gallery.html → deck by default.** Many external docs link this URL, and the deck
  is the preferred view: a bare visit now redirects to `apps-deck.html`; `?view=cards` /
  `?view=detailed` stay on the grid (the deck's "Grid view" link passes `?view=cards`, so
  no loop). Verified: redirect + grid + 0 console errors.
- **Deploy-safety fix.** 4 publication figures (`2021_prl_gklearn_accuracy`,
  `2023_jcc_redox_framework`, `2025_graphink_framework`, `2026_icpr_swissriver_diagram`)
  were referenced by `js/projects-data.js` + both index files but never git-tracked —
  fine locally, 404 on the deployed site. Committed.

# 2026-06-05

## V3 — Homepage 10-round optimization pass (in-place, per-round, verified)

The deep follow-on Linlin asked for after the launch-prep fixes: 10 rounds of audit +
optimization over the **live** homepage (not HTML mocks), each anchored to one lens,
screenshot-verified, and committed on its own. Plan + per-round notes:
`docs/strategy/homepage-redesign-2026-06-05/` (`00-plan.md`, `round-notes.md`,
`DELIVERY.md`). The page is mature (months of work), so several rounds confirmed an
area is already sound and made a focused, low-risk improvement rather than churn.

- **R1 — above-the-fold.** Hero `hn-fact-4` "9 papers published" → "9 papers · 130+
  citations" (verified from `data/citations.json`); new `.hn-cv-link` "read my CV ↗"
  under the role → `res/cv/CV_Linlin_Jia_en.pdf`, a clear recruiter path styled as
  parchment ink (not a SaaS button).
- **R2 — hierarchy.** Anchor-jump occlusion fixed: sections had `scroll-margin-top:0`
  under the 57px fixed navbar, so nav-link jumps hid the heading; added `html {
  scroll-padding-top: 72px }`.
- **R3 — typography.** Indie Flower body is a deliberate choice (kept); bumped
  `.pub-title` (the credibility scan-target) to 1.18rem / weight 700. Flagged the
  bubbly-hand-on-credibility tradeoff for Linlin.
- **R4 — colour/contrast.** Contrast audit: all content ~18:1 (a11y strength, no fix).
  Added an on-brand maroon `:focus-visible` ring (was the default blue) for keyboard
  a11y (WCAG 2.4.7).
- **R5 — spacing.** Rhythm consistent (36px sections); no forced change (flagged an
  optional breathing-room bump).
- **R6 — credibility.** No broken figures; flagship leads (priority sort). Fixed
  **H-index 6 → 7** (verified from `citations.json`) on both index files.
- **R7 — motion.** Reduced-motion is comprehensive (global `*` catch-all + scoped
  fallbacks); marked stale PLAN H1.M3.G4.T3 done.
- **R8 — mobile.** No horizontal overflow; cards stack cleanly. Padded the R1 CV link
  to a 29px touch height (≥ WCAG AA 24px).
- **R9 — performance.** Merged the EN page's 2 Google-Fonts requests into 1 (deduped
  Ma Shan Zheng / JetBrains Mono), dropped **ZCOOL XiaoWei** (0 uses) on both index
  files; confirmed PLAN T1 (font trim) + T2 (confetti lazy) already done. Flagged: the
  zh page never loads the handwriting fonts; map dedup (T4) still open.
- **R10 — final QA.** i18n parity in sync; all 5 JSON valid; no gradient-text / em-dash
  / emoji-chrome bans. **Fixed the CSP** so Microsoft Clarity loads
  (`script-src` → `*.clarity.ms`, matching `connect-src`) on both index files. Flagged
  an opaque cross-origin `404×5` (not a missing local asset) for a deployed-site check.

## V2 — Launch prep (cont.): blog mobile TOC, exact postcard replication, Howler mobile size, zh postcard overflow, footer links

Continued the publish-prep fixes Linlin listed before the planned 10-round homepage pass. Visual-verified at desktop + phone viewports.

- **Blog TOC collapsed on mobile.** The floating Contents scroll stayed a 200px-wide bar over the article's top-left even when collapsed. On `≤1179px` the collapsed state now hugs its label (`width:auto`; the rolled-up nav contributes `width:0` so the longest link no longer drives the width), and the heavy 镇纸 paperweight shrinks to a small inline dowel pip, i.e. a compact "Contents" tab. Tapping still unrolls the full 200px scroll. (`css/blog.css`)
- **Welcome postcard — exact pre-parchment replication (EN).** Linlin wanted the parchment postcard to look exactly like the pre-parchment canonical design. `parchment-overrides.css` §7 was meant to re-assert it but had drifted: a universal `font-size / line-height / font-weight: revert` blew the labels up to 22px and the postmark to 17.5px, §7.8 forced the handwriting `<input>` blanks to Spectral, and several colours were off. Recaptured every postcard element's canonical computed value (getComputedStyle with the override disabled) and rewrote §7 to pin each element exactly (Caveat faces, 13px tan labels, Caveat blanks, 9px blue postmark, etc.). Verified: the current-vs-original computed-style diff is now empty (bar a never-rendered Georgia fallback). Reference shots: `docs/strategy/apps-deck-redesign-2026-05-30/postcard-{ORIGINAL-preparchment,FIXED-parchment}-en.png`.
- **尖叫信 (Howler) too big on mobile.** The idle envelope was a fixed 140×110 (≈36% of a 390px screen) with no mobile size. Added a `≤640px` rule that scales the whole widget (envelope + steam + embers + hit target) to 0.66 from the bottom-left and tucks it to a 16px inset → ~92px (24%). (`css/main.css`)
- **zh postcard overflowed the screen.** On `≤640px` the card becomes single-column `height:auto` but kept `overflow:visible`, so tall (especially Chinese) content spilled off-screen. Clamped it to `max-height: calc(100dvh - 24px)` (dvh accounts for mobile browser chrome) + `overflow-y:auto`, so long content scrolls inside and the card never exceeds the viewport. (`css/main.css`)
- **Footer social links completed.** The footer carried only GitHub / Scholar / LinkedIn / email, but the zh hero exposes the full set; added **Twitter/X, ResearchGate, ORCID** to the footer on both `index_en.html` and `index_en_clear.html` (academicons already loaded; icon links use `aria-label`, no i18n keys).

## V1 — Launch prep: navbar parchment background + Personal-room teaser (room temporarily blocked)

Prepping the homepage for publishing/promotion; first the two most visible fixes.

- **Navbar background.** `.navbar` was fully transparent (from a past "don't change colour on scroll" request), so it overlapped the content scrolling underneath — worst on mobile. Gave it a **semi-transparent parchment** background `oklch(0.93 0.03 84 / 0.85)` + `backdrop-filter: blur(7px) saturate(1.08)` in `parchment-overrides.css`: still reads as the same paper, but the bar now clearly separates from content. Base and `.scrolled` keep the **same colour** (so it doesn't change on scroll, per Linlin), with only a soft shadow lift when scrolled.
- **Personal-room teaser (temporarily block the 3D room).** The 3D study (`personal.html`) isn't finished, so the navbar **Personal** now opens a small parchment **teaser** (a render of the room + "My 3D study · coming soon") instead of navigating to the live room, on both `index_en.html` and `index_en_clear.html`. New `.ptz-*` overlay (`css/main.css`) + `window.showPersonalTeaser()` (`js/main.js`); the room screenshot is `res/portfolio/img/personal-room.png`. Revert by pointing Personal back to `personal.html` once the room ships.

## V1 — Personal 3D room: graceful no-WebGL fallback (was a bare "needs WebGL")

Linlin's browser showed `personal.html`'s no-WebGL screen. That screen only appears when three.js loaded but `new THREE.WebGLRenderer()` threw — i.e. the browser couldn't make a WebGL context (almost always **hardware acceleration is switched off**, or the GPU only has WebGL1 while three r160 needs WebGL2).

- **Graceful content fallback.** Replaced the bare "needs WebGL" message with a real page: a rendered **image of the room** (`res/portfolio/img/personal-room.png`) + a clear note ("turn on *Use hardware acceleration* and reload") + **6 content cards** (desk → Apps, bookshelf → Publications, photos, hiking, dancing, travel). So visitors without WebGL (recruiters on locked-down machines included) still get the content and the key links.
- **Try to render anyway.** Added `failIfMajorPerformanceCaveat:false` + `powerPreference:'default'` to the renderer so the browser can hand back a **software** WebGL context where it otherwise would refuse (rescues some hardware-accel-off cases).
- **CDN-load resilience.** A classic (non-module) script defines the fallback before the module and arms a ~9 s timeout: if three.js never initialised (e.g. its CDN was blocked), it shows the fallback with a "couldn't load (network?)" note. A guard makes sure the WebGL-off case keeps its own (hardware-acceleration) message.
- Verified live: the headless test browser happened to have no WebGL, so the fallback rendered for real — room image + correct message + all 6 cards.
- **For Linlin:** to see the actual 3D room, turn on hardware acceleration (Chrome/Edge: Settings → System → "Use graphics acceleration when available" → on, then relaunch), or use a browser/GPU with WebGL2.

## V2 — Personal section: interactive three.js 3D study/living-room (personal.html)

The `personal` section is no longer a coming-soon toast — it's a room you can wander.

- **`personal.html`** — a standalone three.js cozy study/living-room. Orbit it (drag / scroll, damped + clamped to the corner), with an intro auto-orbit. Six **clickable skeuomorphic hotspots**, each opening a parchment info panel: **My desk** (laptop with a graph plot → Apps / Projects), **Bookshelf** (spines = the 9 papers + thesis → Publications), **Photos** (pinned board → an album lightbox), **Hiking** (backpack/boots/mountain photo), **Dancing** (turntable/vinyl/shoes), **Travel** (globe, 西安 → Rouen → Bern). Plus ambient props: sofa + coffee table, rug, plant, floor lamp, a sleeping cat.
- **Built from three.js primitives** in the site's parchment palette (cream/wood/cinnabar/gilt/qing), warm golden-hour lighting (ACESFilmic, soft shadows). The only runtime dependency is three.js from a CDN — **no model downloads**, so it's fast and robust (no repeat of the giscus/Valkey China-access risk).
- **a11y + resilience:** raycast hover labels + a keyboard / screen-reader **Explore** menu mirroring every hotspot; `prefers-reduced-motion`; pause-when-hidden; resize; a loading state; a **no-WebGL fallback**; Esc closes overlays; pixelratio capped. **0 console errors** at 1440×980. *Two bugs fixed during the build:* `controls.setAzimuthalAngle` (not in three r160 → manual offset rotation) and an undefined `COL.maroon`.
- **Wired in:** homepage navbar **Personal** → `personal.html` on both `index_en.html` and `index_en_clear.html` (replaced `showComingSoon('personal')`).
- **Docs:** `docs/strategy/personal-3d-room-2026-06-02/` (00-research, 00-plan, round-notes, DELIVERY, screenshots); `docs/PLAN.md` H3.M3.5 marked done. **Photos + hobby copy are warm placeholders** for Linlin to personalize (drop in real images; make the blurbs specific).

## V1 — Apps entry in the homepage navbar; deferred blog work tracked in PLAN.md; 3D Personal-space work started

- **App Gallery entry on the homepage.** Added an **Apps** link to the main navbar (after Projects) → `apps-deck.html`, on both `index_en.html` and `index_en_clear.html`; new `nav.apps` key ×4 locales (parity verified). Navbar stays one row (9 items, no wrap at desktop). The existing Projects-section CTA stays as a secondary entry.
- **Deferred blog work → PLAN.md.** Recorded the still-pending blog items under `docs/PLAN.md` H3.M3.2: G3 (foldable Cite/history, done), G4 (skeuomorphic scrollbar — awaiting pick of wood/brass/leather/bamboo), G5 (Share / Related / Bookmark / dedicated Like + extras). Full plans remain in `docs/strategy/blog-features-*.md` + the scrollbar demo.
- **Personal-space 3D environment (started).** Opened `docs/PLAN.md` H3.M3.5 for the three.js skeuomorphic home (living room/study with photo album, hiking/dancing hobby objects); research + 10-round design + integration tracked there and under `docs/strategy/personal-3d-room-2026-06-02/`.

## V3 — Blog: skeuomorphic code-block scrollbar options + features implementation plan

Follow-ups: Linlin rejected the 4 flat scrollbar styles and asked for a **skeuomorphic** (拟物) one (research then design); and for the 4 picked features (Share / Related / Bookmark / Like) asked to be told the **implementation plan first**, then to research further features (the Like must be a dedicated button, optionally giscus-backed).

- **Skeuomorphic scrollbar options.** `docs/strategy/blog-scrollbar-skeuomorphic-2026-06-02.html` — 4 material thumbs in a carved-groove track, built with layered gradients + inset/outset `box-shadow` and a `::-webkit-scrollbar-thumb:vertical`/`:horizontal` cylinder highlight (Firefox falls back to a matching solid via `scrollbar-color`): **1 卷轴木轴 wooden rod · 2 黄铜 brass · 3 皮革缝线 stitched leather · 4 竹简 bamboo**. For Linlin to pick; not yet applied to `css/blog.css`.
- **Features implementation plan.** `docs/strategy/blog-features-implementation-plan-2026-06-02.md` — concrete build plan for Share (Web Share + Weibo/X/LinkedIn/email/copy + WeChat QR), Related (tag-overlap from the registry), Bookmark (localStorage + a "Saved" filter), and a dedicated Like (D1 giscus-backed count + scroll-to-react, or D2 a Cloudflare-Worker one-click), all in a new `.blog-actions` bar; plus a survey of further features (per-post OG share image, image lightbox, footnotes/callouts, series, donate, TTS, webmentions, …). Pending sign-off before building.

## V2 — Blog: foldable Cite module (shared .blog-fold) + blog-features research + code-block scrollbar options

Three asks: make the "Cite this post" section a collapsible standard module like the edit-history; research common blog/posting features and how to implement them here; and design several code-block scrollbar styles to pick from (the parchment code block clashes with the default browser scrollbar).

- **Foldable Cite module.** Generalized the collapsible footer pattern into a shared `.blog-fold` class (a `<details>`: `<summary class="blog-foot-h">` + ▾ chevron, content hidden when `:not([open])`). Applied it to both **Cite this post** (BibTeX + APA, now collapsed by default) and the Edit-history. The copy buttons still wire up inside. Verified: Cite collapsed (block height 0) → click expands (BibTeX present) → collapses; history unchanged.
- **Blog-features research.** `docs/strategy/blog-features-research-2026-06-02.md` — surveys view count, likes/reactions, bookmark (收藏), share-to-platform, list comment counts, RSS, related posts; for each, the no-backend options on GitHub Pages with tradeoffs (privacy, **China-accessibility flagged as unverified**, effort) and a value÷effort roadmap. Notes what the site already has (giscus comments+reactions, Clarity, TOC/reading-time, etc.). Sources cited.
- **Code-block scrollbar options (pending pick).** `docs/strategy/blog-scrollbar-options-2026-06-02.html` — 4 parchment-matched styles (1 Gilt thread · 2 Cinnabar seal · 3 Ink hairline · 4 Bound book) vs. the current default, on overflowing code blocks, for Linlin to choose. Not yet applied to `css/blog.css`.

## V1 — Blog edit-history collapsed by default (click to expand)

Two asks: (1) make sure the homepage links to the App Gallery, and (2) collapse the blog's per-post edit-history by default, expanding on click.

- **Homepage App Gallery link — already present.** The Projects section already carries an "Open the full App Gallery" CTA (`common.open_gallery`) → `apps-deck.html` (the deck, the default view; the grid is one click further via the deck's grid-view button), on both `index_en.html` and `index_en_clear.html`. No change needed; a navbar entry remains an option if more prominence is wanted.
- **Edit-history collapsed by default.** `buildHistory` in `js/blog.js` now renders the panel as a native `<details class="blog-history-d">` collapsed by default: a `<summary class="blog-foot-h">` showing the localized title + the revision count + a ▾ chevron (rotates when open); clicking it reveals the revision list and the in-page diff area. The rev-row View-this-version / Diff buttons still wire up inside. A global stylesheet was forcing the `<details>` children visible (defeating the native collapse), so `css/blog.css` also hard-hides `.blog-rev-list` / `.blog-diff` when the panel is `:not([open])`. Verified: collapsed (list height 0) → click expands (list 660px) → click collapses again; 0 console errors.

# 2026-06-01

## V3 — apps-deck mobile control ribbon: one compact row (was 3 rows overlapping the slide)

Linlin: on mobile (fullscreen or not), the top ribbon's controls (filter tags, the Featured sort, the search box, etc.) wrapped onto a 2nd/3rd row and overlapped the slide content underneath. Compress them onto one row (or a click-to-expand). Applied impeccable's `adapt` direction (single compact row, progressive disclosure).

- **Root cause.** The top `.deck-ribbon` is `position:fixed; top:0` with `flex-wrap:wrap`, so brand + `.section-controls` + tools stacked when they didn't fit; and the deck reuses the gallery's `.section-controls`, whose `main.css` mobile rule sets `flex-direction:column` — so the controls stacked vertically too. Together the revealed bar was **138px tall in a 390px viewport** (≈35%), overlaying the slide title and diagram.
- **Fix (`@media (max-width:1024px)`).** Force one no-wrap row: `.deck-ribbon{ flex-wrap:nowrap }`, `.section-controls{ flex-direction:row; flex-wrap:nowrap }`; keep the 林 mark but hide the "Linlin Jia" text (`font-size:0` on the brand, the `.mk` keeps its own size); the filter-tags are the only flexible part and scroll horizontally (`flex:1; overflow-x:auto`, hidden scrollbar); search + sort + tools are `flex:0 0 auto` (pinned), the search input narrowed to `7em`; the bar background is near-solid for legibility over content.
- **Result + verification.** The revealed ribbon is now **~50px, a single row** with the tags scrolling. Verified at landscape `844×390` (138px → 50px), portrait-rotated (`offsetHeight` 50, one row), and desktop `1440` (unchanged — full "林 Linlin Jia" brand, fix scoped to ≤1024px). 0 console errors.

## V2 — Dependabot triage (13 legacy alerts dismissed + dependabot.yml); apps-deck mobile rotate-hint auto-reveals the deck

Two follow-ups after the V1 push: triage the 13 Dependabot alerts GitHub flagged on the repo, and stop the mobile deck's rotate-hint from needing a manual tap.

- **Dependabot triage (read-only first, then act).** All 13 alerts sit in two LEGACY, non-deployed subprojects: `blog/package.json` (old Hux Blog grunt toolchain — grunt RCE / path-traversal / race, ×3) and `docs/_archive-jekyll-minima/Gemfile.lock` (archived Jekyll minima — addressable ReDoS ×2, rexml DoS ×6, kramdown RCE ×1). The deployed site is plain static HTML/CSS/JS with no build (`build_type: legacy`, no root Gemfile/package.json), and neither manifest is ever `bundle install`/`npm install`-ed or run, so the vulnerabilities (which all require the code to execute) are not exploitable. Action: dismissed all 13 as `not_used` via the Dependabot API (0 open / 13 dismissed), and added `.github/dependabot.yml` that scopes version-update PRs to the one active surface (github-actions in `.github/workflows`, monthly) and documents the legacy dirs as intentionally unmanaged. Note: Dependabot security *alerts* are repo-wide and cannot be excluded per-path by config, so the dismissal is what clears them; a guaranteed-no-recurrence alternative (removing just the 2-3 legacy manifest files) was left out since those subprojects are kept for history.
- **apps-deck mobile rotate-hint.** The portrait "Turn your phone to view" overlay used to block until tapped. It now auto-reveals the deck ~3s after load with no tap: a one-time `setTimeout(dismissHint, 3000)` plus a `hintDone` flag (so `orientationchange` never re-shows it once dismissed) and a 0.45s opacity/visibility fade. Verified on a portrait phone viewport (hint dismisses itself; the deck is revealed; 0 console errors).

## V1 — Deck wired into the site as the default apps view + 3-way Deck|Cards|Detailed toggle; deck fonts unified (mobile==desktop); cover + inline images for the 2 new blog posts; image convention documented

Linlin: wire the new full-screen deck into the official site as the default apps view (add a Deck button next to the gallery's two view-toggle buttons); unify the deck's mobile vs desktop fonts; give the two new blog posts content-matching images (list + inline) like the others; and make "add a cover + place images" a documented default.

- **Deck integrated + default.** `apps-deck.html` and `apps-gallery.html` were orphan pages (nothing on the site linked to them). Added a homepage **Projects → Open the full App Gallery** CTA that opens the deck (the default view), on both `index_en.html` (EN) and `index_en_clear.html` (zh/fr/de canonical); new i18n key `common.open_gallery` across en/zh/fr/de (parity verified). The gallery's view toggle is now **Deck | Cards | Detailed** (`<a class="mode-deck" href="apps-deck.html">`); the deck already links back via its grid-view button.
- **Deck fonts unified (mobile == desktop).** Root cause: the standalone deck pulls in `css/parchment-overrides.css` for the palette, but that file forces the SITE's handwriting fonts (`Reenie Beanie` / `Indie Flower`) + em sizes/weight/line-height with `!important` on bare `body/p/li/h2` — fonts the deck never loads, so phones fell back to a different platform `cursive`. Re-asserted the deck's own loaded fonts (`Patrick Hand` / `Spectral` / `JetBrains Mono`) and the hijacked metrics, scoped to `.deck-rotor` with `!important` (NOT on `.m-title` font-size, so `fitTitles()` still owns it), plus `-webkit-text-size-adjust:100%`. Computed fonts now identical on desktop (1440) and mobile (844×390). Bonus: with the correct compact Patrick Hand, PLANALYSER fits at full 80px (no shrink) with a 93px gap.
- **Blog images for the 2 new posts.** `blog-version-history` and `blog-comments-giscus` had no images. Made content-matching WebP covers (screenshot → crop → `convert`): the in-page **diff/edit-history** view, and the **giscus comment box** (captured on the deployed site, since giscus only renders there). Registered both via `cover` in `registry.json` (render verified in the blog list), and added one inline screenshot to each post's `en.md` + `zh.md` at the section that shows the feature.
- **Convention recorded.** Added a "cover image (required) + content-matching + WebP + inline placement (same image en+zh)" rule and two checklist items to `docs/conventions/blog-writing-style.md` (+ `.zh.md`).
- Verified in-browser: gallery Deck button → deck; homepage CTA (en + zh) → deck; deck fonts desktop==mobile; blog list covers + post inline images load; JSON valid; i18n parity in sync. `apps-deck.html` is still standalone (opened from the site, not embedded).

# 2026-05-31

## V3 — Apps deck: fit-to-column titles (PLANALYSER overlap gone), scale-to-fit canvas (mobile fullscreen never clips), bigger crisp images

Linlin's review: PLANALYSER still overlapped a little; on mobile fullscreen part of the content (especially text) was cut off past the boundary; and the design needed more wow — make the image bigger and clearer. All three fixed and verified by real-browser DOM measurement + screenshots.

- **PLANALYSER overlap — root cause + fix.** The long single word "PLANALYSER" rendered **526px** wide but its text column was only **389px**, so the title overflowed the column by 138px and lapped onto the image by **73px** (measured via `getBoundingClientRect`). Added `fitTitles()`: only titles whose unbreakable single word overflows its column are scaled down (PLANALYSER → **60.5px**); short / multi-word titles keep their full size and impact. Result: a clean **70px** gap title→image. Runs on `init`, `document.fonts.ready`, and resize.
- **Mobile fullscreen clipping — root cause + fix.** `.deck-slide{overflow:hidden}` plus a **469px**-tall text column in a **390px** landscape frame meant the bottom (the action links, bottom 482px) was clipped below the viewport — "part of the content disappears". Restructured to a **scale-to-fit canvas**: the inner spread is wrapped in `.deck-canvas`, `.deck-slide` is now a centring flex box, and `fitSlide()` sets `--fit = min(1, availH/contentH, availW/contentW)` so the **whole** spread (image + every line of text) always fits — nothing is ever clipped. Desktop content fits, so `--fit:1` (unchanged). Re-fits on `slideChange`, `fullscreenchange`, `orientationchange`, `resize`, `fonts.ready`. Mobile landscape/portrait vertical rhythm tightened (canvas padding/gap, block margins, line-heights) so the fit factor stays high (**0.74–0.83**, less empty side margin).
- **Bigger, crisper images.** Hero image up to **54vw / 820px** (specimen **57vw / 900px**); dropped the dulling `sepia(0.05)` and switched to `contrast(1.06) saturate(1.07)` so the multiply-embedded screenshot reads sharp, not muddy (keeps the parchment-embed look).
- **Verification.** PLANALYSER title overflow **−73px → +70px** gap (numeric + screenshot). Mobile **844×390**: graphkit-learn / N-Banker / Local Confidential Translator / LIULIAN — all content within the viewport (symmetric ~18px margins). Portrait-rotated fallback fits. **Desktop fit=1**, all **9 projects** re-screenshot-verified at 1440×980 (no overlap, titles fit, images big/crisp). **0 console errors.** Standalone `apps-deck.html`, not merged — for review.

## V2 — Apps deck: remove Turn picker (always 3D cube), true centering, fix overlap (edge-on faces), per-project verified

Linlin: PLANALYSER still overlapped, slides looked left-shifted (not centred), and the Turn picker should go (always 3D cube). Fixed + rigorously verified every project.

- **Removed the transition picker** (`#deckFx`) + its handler. The deck is always the 3D cube turn now.
- **Fixed the overlap** (PLANALYSER text+image, GraphInk): the cube's adjacent faces now sit **edge-on** (creative rotateY **±90°** + `translate ±100%`) at rest, so nothing peeks over the active page; they turn in to the front as you swipe. Plus the deterministic `:not(.swiper-slide-active)` text-hide stays. Added `perspective:1600px` for the 3D depth.
- **True centering**: the slide is now `grid-template-columns:auto auto; justify-content:center`, so the image+text group is centred as a unit regardless of image/text size (fixes the left-shift). Image `width:clamp(300px,42vw,560px)` (diagrams up to 680px), text `clamp(260px,34vw,30rem)`.
- **Per-project verification**: screenshot-checked all 9 (LIULIAN · N-Banker · graphkit-learn · Swiss River · homepage · Translator · OCTOPUSSY · PLANALYSER · GraphInk) at 1440×980, and mobile spot-checks (GraphInk, LIULIAN, PLANALYSER): centred, no overlap (incl. the loop-wrap GraphInk reached by single-step nav), image sized, text complete, seal scaled. 0 console errors.

# 2026-05-31

## V1 — Apps deck: review pass 3 (3D cube default + loop, per-project centred layout, parchment blend, manuscript pagination)

Linlin's third review of the deck; all points fixed + every project visually verified. Single commit. Notes: `docs/strategy/apps-deck-redesign-2026-05-30/round-4-notes.md`.

- **3D Cube default + loop** — the deck defaults to the 3D cube turn and loops (last→first in one smooth turn, no rewind). The built-in Swiper cube overlapped the first slide onto the last at the loop boundary, so "3D Cube" is a loop-clean **creative rotateY** effect (same from-inside look). Picker still offers Slide / Page drift / Flip.
- **Per-project centred layout** — the two-column grid now has image + text both hug the centre gutter (`1fr 1fr` + `justify-self`), so the gap is consistent regardless of image aspect (fixes LIULIAN-too-close, N-Banker-too-far) and the composition is centred.
- **Bigger images** — larger `max-width`; diagrams use a `3/2` box (redox / gklearn / swissriver read much larger).
- **Parchment shows through white** — `mix-blend-mode:multiply` on the screenshots, so a white-UI shot reads as printed on the page.
- **NDA seal responsive** (clamp var, smaller on mobile); **no text cut off** (rotated-mobile + short-landscape content tightened; PLANALYSER fits).
- **Mobile unified + no overflow** — rotor uses `dvh/dvw`; filter-tags are a single horizontal-scroll row (no 2-row / edge overflow).
- **Manuscript pagination** — plain dots → ink tally-strokes on a gilt rule (active = tall cinnabar stroke).
- **Loop-wrap overlap bug fixed** — the reveal used `animation … forwards` whose fill left the first slide's text visible (~0.92) on the 3D side face over the active page (GraphInk). Replaced with a deterministic `:not(.swiper-slide-active)` reveal (non-active text hidden; image may peek).
- **Arrow focus box** removed (arrows `.blur()` after click).
- 0 console errors; all 9 projects verified at 1440×980 + mobile spot-checks.

# 2026-05-30

## V3 — Apps deck: review pass 2 (mobile landscape unified, horizontal layout, embedded images, transition options) + cross-page tag-contrast fix

Linlin's second review of the deck; all points fixed + a cross-page tag bug. Single commit. Notes: `docs/strategy/apps-deck-redesign-2026-05-30/round-3-notes.md`.

- **Mobile landscape unified** — all controls (ribbon, arrows, folio, progress, lightbox) moved INSIDE `.deck-rotor`, so a portrait phone rotates the whole UI to landscape as one unit (previously content was landscape but controls stayed portrait). The "turn your phone" hint stays outside, upright.
- **Horizontal layout** — every slide is now a two-column spread (side alternates by index); removed the centered vertical "specimen" layout that caused overflow / clipped images / overrun text.
- **Images embedded into the paper** — removed the matted border + drop-shadow + cream card bg; screenshots sit directly on the parchment with a faint `sepia(0.06)` (matching the homepage `.project-image`), so the page reads as one manuscript. The big page arrows are restyled as ink marks (no button chrome).
- **In-image rotate arrows** — multi-image plates get `‹ ›` on the image edges (hover) to rotate the images, distinct from the deck page arrows.
- **Transition options** — a "Turn:" picker in the ribbon switches Slide / Page drift / 3D Cube / 3D Flip live (Swiper re-inits); the 3D options rotate in from inside the screen.
- **Gap + seal** — tightened the text-image gap; the `NDA` text now centers on the wax seal (both at `-18px`).
- **Cross-page tag contrast** — root cause: `parchment-overrides.css` `button[class*="filter"].active` forced red text `oklch(0.40 0.22 27)` on the maroon active chip (red-on-maroon, illegible) at higher specificity. Excluded `.filter-tag` from that rule (`:not(.filter-tag)`) so active filter-tags keep maroon fill + bright cream text (weight 700); hardened `.blog-filterchip.active`. Affects homepage / gallery / deck / blog. Verified cream-on-maroon.
- Verified 1440×980 + 390×844; 0 console errors.

## V2 — Apps deck: fixes + UX pass (autoplay, multi-image rotate, reused controls, big arrows, mobile swipe)

Linlin reviewed the V1 deck and reported several issues; fixed them all + did a web-researched UX pass. Single commit (per the clean-history rule). Notes: `docs/strategy/apps-deck-redesign-2026-05-30/round-2-notes.md`.

- **Multi-image plates auto-rotate** (crossfade + dots + pause-on-hover); LIULIAN / N-Banker / homepage cycle their screenshots.
- **Deck auto-advances** between apps again. Root cause: `pauseOnMouseEnter` on a full-viewport deck kept autoplay paused forever (mouse always "over" it). Removed it; autoplay 6s + explicit pause + a **progress bar**.
- **Removed "codex"** branding (title/brand/hint) → "Apps".
- **Image zoom** = `zoom-in` cursor + magnifier cue on hover, click-the-image opens the lightbox (multi-image prev/next, Esc + arrow keys); the tiny corner button is gone.
- **Reused the gallery controls verbatim**: linked `css/main.css` + `parchment-overrides.css`, used `.section-controls` / `.filter-tag` / `.search-box` / `.sort-select`.
- **Big left/right arrows** appear on mouse-move; a **first-load teaching hint** (arrows pulse + onboard toast) shows every open so users know it leafs.
- **Mobile swipe fixed**: in the rotated portrait→landscape mode, Swiper's own touch is disabled and a custom handler maps a physical vertical swipe to prev/next.
- **Web-researched UX**: autoplay disabled on mobile (best practice), `aria-live` slide announcements + keyboard shortcuts + focus-visible, empty/single-result states hide the arrows, lazy-load.
- **Mixed-aspect fix**: desktop + mobile screenshots in one rotator cropped badly with `cover`; switched the plate to a fixed-aspect `contain` box matted on cream.
- Fixed a Swiper init crash (`rotorTimers` used before its `var`). 0 console errors; verified at 1440×980 + 390×844.

# 2026-05-30

## V1 — App Codex deck: standalone full-screen "web PowerPoint" prototype

Per Linlin: redesign the App Gallery as a full-screen, one-app-at-a-time slide deck (web PowerPoint) that reads like a continuous parchment **book**, not slides on a stage; build it as a **standalone page first** for review, then decide on merging.

- **`apps-deck.html`** (new, standalone; does NOT touch `apps-gallery.html` / homepage). Full-viewport codex of the 9 gallery apps, on the site's real `wm-02-pergament-aged.jpg` parchment.
- **Engine: Swiper.js** (jsDelivr; CSP already allows it). Auto-leaf (7s, pause-on-hover, off under reduced-motion) + manual swipe/drag + keyboard + mousewheel + `#slug` deep-link + Parallax + Zoom (click-to-magnify) + custom pagination.
- **Marginalia controls, hidden by default** (clean full plate): top ribbon (search · tag filter · app index · autoplay · fullscreen · grid link), bottom gilt page-slider, edge page-turn chevrons. Revealed on mouse-move / at the top.
- **3 bespoke layout variants** by app type: **Plate** (matted screenshot + margin column, side alternates), **Specimen** (centered diagram + museum caption), **Sealed** (wax seal + why-note for NDA apps). Oversize Patrick Hand plate-titles with a cinnabar accent letter, gilt folio numbers, per-slide entrance reveal.
- **Mobile**: portrait phones get a "turn your phone" hint and the deck force-rotates to landscape (center-rotate recipe); attempts `screen.orientation.lock` in fullscreen on Android. iOS can't truly lock (honest limit, documented).
- **DRY**: reads `window.PROJECTS` from `js/projects-data.js` — a third view of the one source.
- **Design process**: lane named via the `impeccable` plugin (brand register) = "a naturalist's codex of inventions"; passed the 4 UI_AUDIT tests + impeccable absolute bans; 0 console errors. Research / plan / critique / screenshots in `docs/strategy/apps-deck-redesign-2026-05-30/` (00-research, 00-plan, round-1-notes, DELIVERY, round-*.png).
- **Not merged.** Merge options (standalone link · third `Cards|Detailed|Deck` toggle · default view) deferred to Linlin.

# 2026-05-29

## V6 — Custom parchment giscus theme

Linlin: the default giscus box "completely doesn't fit". giscus runs in a
cross-origin iframe, so its DOM/interaction can't be changed, but its visual
theme can via `data-theme=<custom CSS URL>` (ADVANCED-USAGE).

- **`css/giscus-parchment.css`** — based on giscus's `light.css` (keeps the
  `--color-prettylights-syntax-*` palette so code in comments still reads),
  overrides the GitHub-Primer UI variables to the parchment palette from
  `css/blog.css` (cream canvas, warm-ink text, maroon links/usernames, maroon
  "Comment" button, hand-cut corner radii), and `@import`s Spectral + LXGW WenKai
  + JetBrains Mono so comments are set in the blog's body/code fonts.
- **`js/blog.js`** — `mountGiscus` `data-theme` `'light'` →
  `https://jajupmochi.github.io/css/giscus-parchment.css`.
- **Verification caveat** — only visible on the deployed site: giscus.app's
  iframe fetches the theme from the absolute URL and cannot reach localhost.
  Locally confirmed only that giscus still mounts and nothing breaks; the
  parchment visual must be verified live after deploy (and iterated there).

## V5 — Two build-process blog posts: version history + giscus comments (bilingual)

Per Linlin: turn the two features just built (version history + comments) into blog posts, following `docs/conventions/blog-writing-style.md`.

- **`blog-version-history`** (en+zh) — "Version history for a static blog, when the version store is already git." Problem → the key insight (versions are commits) → tiered T0–T4+ build → the raw.githubusercontent + jsdiff/diff2html mechanics → real gotchas (short-sha, the CSP line, curate-don't-scrape) → "make it yours".
- **`blog-comments-giscus`** (en+zh) — "Comments on a static blog with giscus, and the three gotchas nobody mentions." Why giscus → derive IDs via `gh api` (not by hand) → **gotcha 1** pathname-mapping merges all `?post=` routes (use `specific`+slug term) → **gotcha 2** three CSP holes (script/frame/**style**) → **gotcha 3** "Discussion not found" is normal → the mount code → category/spam choice.
- Both follow the convention: problem-first first-person, AI-prompt block + agent-read-this-URL paragraph, copy-pasteable code, document our own config (what/why/where), Mermaid diagram, human author vs Claude disambiguated, `translationStatus` en/zh = `ai_edited` (AI draft, edited, unreviewed), fr/de pending. No cover images (coverless cards degrade gracefully). Registered in `blog-posts/registry.json` (5 posts total).
- **Design docs** (separate, awaiting approval): `docs/strategy/blog-per-paragraph-annotation-design-2026-05-29.md` and `docs/strategy/blog-homepage-linking-research-2026-05-29.md`.
- **Repo topic** `giscus` added for discoverability (github.com/topics/giscus).
- Verified in-browser: both posts render (TOC, Mermaid, code blocks, meta stamp, comments mount), 0 errors.

## V4 — Comments live (giscus / GitHub Discussions)

The blog already had a `mountGiscus()` scaffold with blank IDs (so comments were hidden). Turned it on after Linlin enabled Discussions + installed the giscus app.

- **IDs** — `repoId = MDEwOlJlcG9zaXRvcnk3ODI1NDg1Ng==`, category **Announcements** `DIC_kwDOBKoTCM4C-GDD`, derived authoritatively via `gh api` (repo `node_id`) + the discussion-categories GraphQL query (not guessed).
- **Mapping fix** — `data-mapping` `pathname` → **`specific`** with `data-term = "post:<slug>"`. The blog is a single `blog.html` routing on `?post=<slug>`, so `pathname` mapping would have merged every post's comments into one shared thread. Slug-keyed terms give each post its own discussion (stable across title edits/translations).
- **CSP** — added `https://giscus.app` to `script-src`, `frame-src`, and `style-src` (its loader pulls `giscus.app/default.css`). Without these the widget/iframe is blocked.
- **Category choice** — "Announcements" type = only the giscus app + maintainers can open threads → spam-resistant (visitors comment, but can't spawn arbitrary discussions).
- **Verified** in-browser: per-post `term`, giscus iframe mounts under the version-history panel, "Sign in with GitHub" + reactions + Write/Preview render, **0 console/CSP errors**. ("Discussion not found" is the expected first-load state — the thread is created on the first comment.)

## V3 — Blog post version history (T0–T4+): edit log, view old version, in-page diff

Per Linlin (after the design round): build the full Zhihu/Wikipedia-style version-record tool. The blog is git-backed, so **a post's versions are its commits** — surfaced with no backend. Design doc: `docs/strategy/blog-version-history-design-2026-05-29.md`. Tiers are progressive (each layers on the same revision data):

- **T0** — "Updated &lt;date&gt; · N edits · Full history ↗ · Edit on GitHub" stamp under each post (full-history link → the file's GitHub commits page).
- **T1** — in-page **「编辑记录 / Edit history」** panel, **registry-driven**: each post gains a `revisions[]` array in `registry.json` (`{date, sha, by, summary:{en,zh}}`) → rows of date · localized summary · author. Zero API, fully static, bilingual.
- **T2** — each revision deep-links to its **GitHub commit/diff** (`…/commit/<sha>`).
- **T3** — **view any past version in-page**: fetch the `.md` at that commit from `raw.githubusercontent.com` (short SHAs resolve; CDN, **no API rate limit**), render through the existing `marked` pipeline, with a "you're viewing the version from … · back to latest" banner.
- **T4** — **in-page side-by-side diff** (Zhihu/Wiki style): `jsdiff` computes a patch, `diff2html` renders it (reuses the already-loaded highlight.js).
- **T4+** — contributors per revision (**Linlin × Claude**), `?rev=<sha>` permalink (opens that version), and the existing "edit on GitHub" = suggest-edit→PR.
- **Plumbing** — `+8` blog i18n keys × 4 langs; CSP `connect-src += https://raw.githubusercontent.com`; `blog.html` loads jsdiff + diff2html (+ CSS) from jsDelivr (already CSP-allowed); `css/blog.css` gains the history/diff styling (parchment, timeline dots). `revisions[]` seeded for all 3 existing posts.
- **Verified** in-browser (en + zh): stamp, 2-revision panel, view (old version loads without the later repo-link edit), diff (24 insertions / 16 deletions), localized summaries + buttons.

## V2 — fcitx5 blog: link the published repo + fix resource/zip links

The `ubuntu-fcitx5-pinyin` project was published to <https://github.com/jajupmochi/ubuntu-fcitx5-pinyin>. The blog post referenced `resources/…` paths (fcitx5 config, Kimpanel theme, `panel.js`, `custom.lua`, the dog script, `dog-design.zip`) that were **never bundled with the site** → all broken.

- **Companion-repo link added** — both `en.md` + `zh.md` get a "Full source code" line in the intro and a repo pointer in the §10 Downloads section.
- **All `resources/` links repointed** to the repo: directories → `/tree/main/…`, files → `/blob/main/…`, the zip → `/raw/main/resources/dog-design.zip` (direct download). 7 links per file.
- **Link audit** — every link tested: the 6 repo resource URLs return 200; external links (Arch wiki, GNOME Kimpanel, unibeCols, LXGW WenKai, brandcolors) all 200; `assets/*` images are local and present. No broken/local links remain. Render-verified in the blog engine (en post: repo link shows, 7 repo links, 5 images load, 0 broken).

## V1 — Multi-image project cards auto-advance

Per Linlin: multi-image project cards were static — make them auto-switch. Both carousel implementations — gallery `js/projects-render.js` `initCarousel` and homepage `js/main.js` `initProjectImageCarousels` — now auto-advance every ~4.2 s via a self-rescheduling `setTimeout`, **pause on hover** (`pointerenter`/`pointerleave`), and are **disabled under `prefers-reduced-motion`**. Manual dot-click / swipe reschedules the timer (no immediate double-jump). Verified in-browser: gallery LIULIAN cycles 0→1→0; homepage LIULIAN advances.

# 2026-05-28

## V6 — Homepage Projects now render from the shared data source (DRY, i18n preserved)

Per Linlin ("主页的也做"): the homepage Projects section now renders from the **same** `window.PROJECTS` as the App Gallery — eliminating the third hardcoded copy of the project list.

- **Shared render** — `index_en.html` `#projectsTrack` is emptied and populated by `Projects.mountHome('#projectsTrack')` (loaded synchronously before `main.js`, so cards exist before `applyTranslations` + the carousel init run).
- **i18n preserved (the hard part)** — `homeCardHTML` reproduces the homepage's existing `.project-card` markup with the correct `data-i18n` keys (`proj.{slug}.title|date|desc`, `proj_badge.{badge}`, `proj_tag.*`, `proj_link.*`). `main.js`'s `applyTranslations` fills them, so all 4 languages work with **no new translation keys**. Verified en / zh / fr render with no English leak (titles, badges, tags, links all translate).
- **Reuses main.js** — the rendered cards are wired by the existing `initProjectImageCarousels` (multi-image dots+swipe), `initImageLightbox`, the delegated card-click, and the projects filter/search/sort carousel. No new behaviour code on the homepage.
- **SEO preserved** — single `.svg` images render as `<object>` (indexable text); raster / multi-image use `<img>`. gklearn keeps its live-stats pills (128⭐ + PyPI); the `fun`-excluded-from-`all` filter rule still holds.
- **Data** — `js/projects-data.js` gained a per-project `home` block (slug + i18n chips + homepage links) + 3 homepage-only projects (Graph Matching, APi, SDN). Gallery fields untouched, so the 9-card gallery is unaffected.

## V5 — App Gallery merged into one data-driven page (Cards+Detailed), bento cards

Per Linlin: the two-file (Cards = `apps-gallery.html`, Detailed = `portfolio.html`) design was wrong — they share everything but the project display format, so merge + refactor, with **design / logic / data separated**, and apply to the homepage too. This V5 does the gallery; homepage follows.

- **One data-driven page** (approach A). `apps-gallery.html` rebuilt as a shell (nav · header · controls · empty `#gal` · footer) that renders from data via JS. `portfolio.html` deleted (merged).
- **Separation of concerns**:
    - `js/projects-data.js` — `window.PROJECTS`, the single source of truth (content only; loaded synchronously so no fetch races).
    - `js/projects-render.js` — render logic (`cardEl`, `detailedEl`, shared carousel + lightbox, filter/search/sort, view toggle) via `window.Projects.mountGallery`.
    - CSS — design only.
- **Controls in homepage style** — `.filter-tags`/`.filter-tag` + `.search-box` + `.sort-select` (from `css/main.css`) + a new **Sort** dropdown (Featured / Newest / Oldest) + the `Cards | Detailed` toggle (in-page view switch, persisted in `localStorage`).
- **Cards view = bento** (de-monotonous, Linlin: "方方正正太单调") — featured LIULIAN tile spans 2×2, other featured tiles vary in height, `grid-auto-flow:dense`. Detailed view = `.project-card`s with bullets + washi tape.
- **Shared** in-card carousel (dots + pointer swipe, `stopPropagation`) and lightbox (prev/next + `n / total` counter + body scroll-lock) across both views.
- Verified at 1440: 9 cards, Cards↔Detailed toggle, filter (Industry→LIULIAN/N-Banker/PLANALYSER), search, sort, dots on the 3 multi-image cards, lightbox studio→mobile.

## V4 — Homepage Projects: multi-image cards (dots+swipe) + LIULIAN Online Demo

Per Linlin: sync the homepage Projects carousel to the gallery, give multi-image cards the same in-card switching, and add the gallery's links.

- **Multi-image home cards** — LIULIAN (`liulian_studio.webp` + `liulian_mobile.webp`) and N-Banker (`neobanker_chat.webp` + `neobanker_canvas.webp`) `.project-image` now wrap a `.pimg-track` of `.pimg-slide`s + `.pimg-dots`, matching the gallery. New `.pimg-*` CSS in `css/main.css` (scoped — single-image cards untouched), new `initProjectImageCarousels()` in `js/main.js`: dots + pointer swipe, `go(n)` translateX, `wrap.dataset.idx` for the lightbox. Critical: `stopPropagation` on dot clicks, on the post-swipe click (capture), and on touchstart/touchend so the **outer projects carousel doesn't page** and the card's delegated navigate-click doesn't fire mid-swipe. `touch-action:pan-y` keeps vertical page-scroll working. Verified at 1440 (dots render, dot-click → `translateX(-100%)`).
- **LIULIAN Online Demo** — card-click `data-primary-href` and a new project link both point at `https://liulian-ai.github.io/liulian-web/` ("Online Demo"). New `proj_link.online_demo` i18n key ×4 locales (en/zh/fr/de), parity verified.
- **All other home cards already matched** the gallery's images (shared SVG/PNG/GIF), so only LIULIAN + N-Banker changed.

## V3 — Gallery optimization pass: lazy-load, keyboard a11y, reduced-motion, lightbox polish

Ten-round optimization pass on `apps-gallery.html` (Linlin: "进行十轮优化"):

- **Lazy-load** — `loading="lazy" decoding="async"` on all 12 `.g-slide` images; defers the 1.24 MB Local-Confidential-Translator GIF and other below-fold media (first-screen WebP still load eagerly).
- **Keyboard a11y** — cards are now `tabindex="0"` with `role` (link/button) + `aria-label` (project name); Enter / Space opens the card (link) or the lightbox (no-link cards). Focus-visible outlines on cards, tags, search box, and the toggle.
- **Reduced motion** — `@media (prefers-reduced-motion: reduce)` disables card / overlay / track transitions and the hover lift.
- **Lightbox polish** — opening locks `body` scroll (no background scroll-through), restored on close; multi-image lightbox shows an `n / total` counter (hidden for single-image cards).
- **Verification rounds** — mobile (1-col grid, controls wrap, no horizontal overflow), Detailed view (`portfolio.html`: 0 broken images, toggle round-trip), and homepage Projects carousel (WebP refs confirmed on disk/git/served) all checked in-browser at 1440 / 1600 / 390 px.

## V2 — App Gallery overhaul: Detailed view restored, persistent controls row, 3-col, hover fix, borderless, WebP

Continuation per Linlin's direction. This **reverses V1's single-page consolidation** — she now wants both views back, with the toggle living in a persistent controls row.

- **Detailed view restored** — `portfolio.html` brought back (it is the searchable/sortable list counterpart to the visual `apps-gallery.html` Cards view).
- **Persistent controls row + `Cards | Detailed` toggle** — the toggle moved out of the nav into the controls row on both pages. The Cards page (`apps-gallery.html`) gained a real controls row: filter tags (All · LLM · Agents · Graph · Vision · Software · Industry · Academia) + search box + the toggle. New per-card `data-tags` + a small filter/search script hide non-matching `.g-card`s, with an empty-state message. On `portfolio.html` the toggle was moved into its existing `.section-controls` row (right-aligned).
- **3 cards per row on large screens** — gallery grid `repeat(auto-fill,minmax(360px,1fr))` → `repeat(3,1fr)` (2 cols ≤1024px, 1 col ≤600px). Bigger cards.
- **Hover overlay fixed** — the overlay text overflowed because it inherited the parchment theme's large base font-size + 1.7 line-height. Set explicit px sizes + tight line-heights + `-webkit-line-clamp` on the description / NDA line. No more overflow at any card size.
- **Borderless cards** — `.g-card` border-radius 14px → 0 so screenshots sit flush in the parchment grid (Linlin: "去掉边框，融入背景", gallery cards). Iteration 1; may refine the blend.
- **Speed (WebP)** — the 5 screenshots used by the cards (LIULIAN studio/mobile, N-Banker chat/canvas, personal_site) converted PNG → WebP q86 via ImageMagick: **4.25 MB → 194 KB total** (personal_site alone 1.5 MB → 45 KB). All refs in `apps-gallery.html` / `portfolio.html` / `index_en.html` updated; old PNGs removed. Homepage card images also gained `decoding="async"`.
- **Homepage Projects sync** — `index_en.html` LIULIAN card now uses `liulian_studio.webp` (was the architecture diagram), N-Banker uses `neobanker_chat.webp` (was the agent-demo PNG), matching the gallery.
- **Detailed view consistency** — `portfolio.html` "This Website + Blog" → **"Linlin's homepage"** (+ blog as 2nd rotate frame), LIULIAN/N-Banker/homepage images synced to the WebP set, and `data-priority` bumped so the order matches the gallery (LIULIAN · N-Banker · graphkit-learn · Swiss River · Linlin's homepage).

Verified in browser (chrome-devtools, 1440×900): 3-col layout, filter (e.g. Industry → LIULIAN/N-Banker/PLANALYSER), toggle navigation, hover overflow gone, all 5 WebP load.

## V1 — App Gallery: hi-res screenshots + single-page consolidation; LIULIAN home card

The App Gallery (`apps-gallery.html`) was built across several commits today (per-card image carousels with dots + swipe, lightbox with mouse + keyboard ←/→ nav, curated order, "Featured" washi-tape, NDA/no-link projects each annotated with a `.why` line). This entry logs that feature plus the finishing batch.

**Apps gallery — final state (verified in browser via chrome-devtools):**

- **Curated order** — LIULIAN → N-Banker → graphkit-learn → Swiss River → Linlin's homepage → Local Confidential Translator → OCTOPUSSY → PLANALYSER → GraphInk.
- **Multi-image cards** — LIULIAN (studio + mobile), N-Banker (chat + canvas), and Linlin's homepage (site + blog) each carry 2 slides with bottom dots (shown when the card is collapsed, hidden on hover) + pointer swipe; single-image cards render no dots.
- **Lightbox** — Zoom opens a full-screen viewer; prev/next arrows (mouse) and ArrowLeft / ArrowRight (keyboard) cycle the card's frames, Esc closes.
- **No-link projects explained** — N-Banker (`Private / NDA engagement — no public repo or live demo.`), PLANALYSER (`Industrial NDA project — code and data are private.`), GraphInk (`Research in progress — the library is not released yet.`).
- **"this website" → "Linlin's homepage"** naming.

**Finishing batch (this session):**

- **Hi-res screenshots** — LIULIAN, N-Banker, and Linlin's homepage cards now point at dedicated `res/portfolio/img/*.png` high-res screenshots (1280×644 / 1400×900) instead of the small `res/figures/*.webp` thumbnails. Diagram/chart cards (graphkit-learn, Swiss River, GraphInk, OCTOPUSSY) deliberately keep their `.svg` sources — vector stays sharper than a raster export. The homepage's 2nd frame (blog) stays `res/figures/2026_blog.webp` (no portfolio/img blog shot exists).
- **Single-page consolidation** — deleted `portfolio.html` (the "Detailed" filter/search/sort view) per Linlin; removed the `Cards | Detailed` toggle from the nav and the "Detailed view" footer link. `apps-gallery.html` is now the one apps page; grep-verified no dangling `portfolio.html` links remain.

**Home Projects carousel (`index_en.html` + locales):** the LIULIAN card now shows `2026_liulian_architecture.png` (`.project-image--contain`), its primary href targets the `liulian-python` GitHub repo, and the **Demo** link was removed (public demo URL retired). The now-unused `proj_link.demo` key was dropped from all four locales; i18n parity re-verified, all locales valid JSON.

# 2026-04-23

## V2 — Job-hunt P0+P1+P2 end-to-end (hero signature/ticker, About restructure, layout reorder, Featured projects, Awards section, Invited Talks, +42 i18n keys)

One big consolidated push. Linlin approved executing all P0+P1+P2 items end-to-end without per-batch confirmation ("Seo先不跑。未完成的discovery就先不提了…直接跑吧，后面就不用再问我了，把这些所有的东西都跑完，就不用再停下来了，跑完再给我 report"). Below is the full change-set, grouped by Batch. Snapshot saved as `index_en_v7_round1.html` before the batch. SEO audit deliberately skipped per the instruction.

### B1 — Above-the-fold (hero signature + About restructure + drug-discovery reframe + Featured projects)

- **Hero signature** — new `<p class="hero-signature" data-i18n-html="hero.signature">` placed under the hero tagline (`index_en.html:~630`). Renders: "Author of `graphkit-learn` · **SNSF** + **Innosuisse**-funded · **ICPR 2026** paper · **Marie Skłodowska-Curie** Alumni". Front-loads the 4 credibility signals a recruiter's 10-second scan would otherwise miss. Uses `data-i18n-html` (not plain `data-i18n`) so the `<a>` + `<code>` + `<strong>` markup survives the translation loader.
- **About restructure** — 4 `.about-p` paragraphs replaced with (a) `.about-headline` one-liner + (b) `.about-bullets` `<ul>` of 6 `<li>` items, each led with a themed emoji (📍🛠🧪🤖🎓🎯). New keys `about.headline` + `about.b1..b6`. Information density jumps ~3× while readability actually improves — bullets scan in parallel, paragraphs serialized. Keeps the single `.about-p` intro sentence.
- **Drug-discovery reframe** — Linlin directive "未完成的 discovery 就先不提了". Chemistry narrative reworded from "drug discovery" to "**molecular property prediction (foundations for drug discovery — redox potentials, polymer optimization)**" across hero, about bullets, outline section (`outline.graph_ai_sci_desc`), and project copy. Honest framing — the work is upstream of discovery (property prediction / generative models), not discovery itself. Doesn't over-claim; doesn't under-sell.
- **Experience timeline — M.Sc. + B.S. surfaced** — 2 new `.timeline-item` cards added after the Ph.D. card (`index_en.html` experience section): **M.Sc. 2014-2017 @ Xi'an Jiaotong University** (SDN / scheduling research, CN patent CN106376041B) and **B.S. 2010-2014 @ Xi'an Jiaotong University**. The patent that used to sit orphaned in Projects now has an academic home in the timeline too. New keys: `exp.role_msc`, `exp.org_msc`, `exp.desc_msc`, `exp.role_bs`, `exp.org_bs`, `exp.desc_bs`.
- **11 project cards gain `data-priority`** — on every `.project-card` (`index_en.html:1065-1241`): graphkit-learn=10 (top), Swiss River / ST-GCN=9, PLANALYSER=8, OCTOPUSSY=7, LIULIAN=7, GraphInk=6, N-Banker=6, Graph Matching=5, APi=5, SDN=3, Confidential Translator=2. Attribute drives the new "Featured" sort option.
- **Projects "Featured" sort = default** — new `<option value="featured" data-i18n="common.featured">Featured</option>` prepended to the Projects sort `<select>` and marked `selected`. New key `common.featured` × 4 locales. `js/main.js:833` `sortCards()` gains a `featured` branch: primary sort = `data-priority` desc, tie-break = `data-year` desc. graphkit-learn now opens at the top of the grid by default (stars + downloads pills directly below), with Swiss River / PLANALYSER / OCTOPUSSY visible in the first carousel page.
- **Init-on-load for sort select** — added `sortCards(sortSelect.value);` after the `addEventListener('change', …)` in both the projects and publications blocks of `js/main.js`. Without this the default selected option wasn't applied until the user manually changed it.

### B2 — Credibility (Publications default / H-index + Grants stats / YOLO relocation / live-stats pills)

- **Publications default sort → Most Cited** — in the Publications sort `<select>`, `Most Cited` option moved to first position and marked `selected`. Rationale: citation count is the single most scannable credibility signal for recruiters unfamiliar with each venue; opening on cite-desc front-loads J24 (9 cites), CBM (61), ESWA (25), PRL (14) instead of a reverse-chronological stream of preprints.
- **Stats grid — H-index + Grants cards** — 2 new `.stat-card` nodes appended to the stats grid: `h-index` (value = **6**, label key `stats.h_index`) and `grants` (value = **5+**, label key `stats.grants`). Grid now carries 8 cards total; visually fills the row on wide viewports without pushing anything below-the-fold on common laptop resolutions.
- **YOLO moved Domain → AI/ML** — Skills section: the `yolo` chip was previously under `skills_cats.domain` (wrong — YOLO is a CV / detection model family, not a domain). Swapped into `skills_cats.ml_ai` so it sits next to GNN / transformers / RAG chips. No i18n-key churn (chip text was already `YOLO`, untouched).
- **graphkit-learn `.project-stats` pills** — 2 new `.project-stat-pill` anchors appended inside the graphkit-learn card body (`index_en.html:~1150`): (a) **128 ⭐ GitHub** (links to `github.com/jajupmochi/graphkit-learn/stargazers`, leading `<i class="fab fa-github">` + `<strong>128</strong>`) and (b) **~300 / mo PyPI downloads** (links to `pepy.tech/project/graphkit-learn`, `fa-download` icon + `<strong>~300</strong>` + `<span data-i18n="proj.gklearn.per_month">/ mo</span>`). Raw numbers beat the "popular library" hand-wave. Pills inherit the new `.project-stat-pill` CSS (pill shape, subtle border, hover → theme primary tint).

### B3 — Authority (Invited Talks + Selected Awards / Grants section)

- **Services — Invited Talks card** — new `.service-card` added to Services (`index_en.html` services grid). Icon `fa-microphone-lines`, title key `services_cards.talks_title`, 3 `<li>` items: GRAPHADON Summer School 2024 (Rouen), ACPR 2023 (Kyoto) invited poster, Ph.D. defence 2023 (LITIS). New keys: `services_cards.talks_title`, `services_cards.talks_i1`, `services_cards.talks_i2`, `services_cards.talks_i3`.
- **New `#awards` section — Selected Awards & Grants** — brand-new section between `#skills` and `#services` (`index_en.html:~1505`). `<h2>` uses `fa-trophy` icon + `sections.awards` i18n key ("Selected Awards & Grants"). Grid layout `.awards-grid` with 4 `.award-card` nodes:
    - **SNSF Postdoc.Mobility 2021-2023** (Postdoc.Mobility P500PN_210739) — funded 2-year postdoc at U. Bern PRG.
    - **SNSF Virtual Bodmer 2025-2027** (200021_225033) — AI for cultural heritage, 260 kCHF.
    - **Innosuisse PLANALYSER 2024-2025** — industry + academia, HES-SO + WATTELSE AG, ~500 kCHF.
    - **ANR APi — Apprivoiser la Pré-image 2018-2021** — Ph.D. thesis grant, LITIS.
    - **Marie Skłodowska-Curie Alumni** — EU MSCA network member.
    - **SNSF GraphInk 2024-2028** (217594_1) — graph + image handwriting recognition, Sinergia-adjacent.
    (Note: the card grid prioritizes the 4 most recent / highest-prestige; the other 2 surface via rotation if we re-sort later.)
    - New keys: `sections.awards`, plus 4 award subtrees: `awards.snsf_postdoc.{title,meta,desc}`, `awards.innosuisse.{title,meta,desc}`, `awards.anr_api.{title,meta,desc}`, `awards.mcaa.{title,meta,desc}` — 12 keys total for the awards block.
- **CSS** — new rules for `.awards-grid` (grid auto-fit minmax), `.award-card` (card w/ icon + body flex layout, theme-primary left-border accent), `.award-icon` (circular badge, `fa-medal` / `fa-award` / `fa-flask-vial` / `fa-users-gear` per card), `.award-body`, `.award-title`, `.award-meta` (grant ID / org / years), `.award-desc`.

### B4 — Recruiter UX (layout reorder + hero news ticker)

- **Full-page section reorder via Python regex** — sections extracted by `<section id="…">…</section>` (non-greedy, sections don't nest) and reinserted in this order after the OTW block close:
    1. `hero`
    2. `.hero-ticker` *(new, see below)*
    3. `#open-to-work` (OTW)
    4. `#about`
    5. `#publications`
    6. `#projects`
    7. `#research` (outline)
    8. `#experience`
    9. `#skills`
    10. `#awards` *(new)*
    11. `#services` (includes Invited Talks card)
    12. `#news`
    13. `#contact`
    Rationale: Publications → Projects → Research is the recruiter's preferred credibility stack (papers prove research, projects prove shipping, research outline gives context). Experience / Skills / Awards follow to give the vetting detail, then Services / News / Contact close.
- **Hero news ticker** — new `<aside class="hero-ticker" aria-label="Latest news ticker">` inserted between the hero block and OTW (`index_en.html:666-693`). Structure: small `.hero-ticker-label` badge ("📢 Latest") + `.hero-ticker-track` with two identical `.hero-ticker-content` divs (the second `aria-hidden="true"` for the seamless loop). Contents: 5 ticker items — 🆕 ICPR 2026 / 🚀 Neobanker live at InnoEX / 🎓 GRAPHADON invited / 💰 SNSF Virtual Bodmer / ⭐ graphkit-learn 128⭐ + ~300 PyPI / mo. New keys: `ticker.label`, `ticker.t1..t5`.
- **CSS — hero-ticker + CSS animation** — `@keyframes tickerScroll { from { transform: translate3d(0,0,0); } to { transform: translate3d(-100%,0,0); } }` at 40 s linear infinite on `.hero-ticker-track`, pauses on hover (`.hero-ticker:hover .hero-ticker-track` → `animation-play-state: paused`). `prefers-reduced-motion: reduce` media query → animation is disabled and the track is anchored at `translate3d(0,0,0)` so motion-sensitive visitors see a static banner instead of a marquee. Mobile `@media (max-width: 768px)` rule tightens font size and padding.
- **~255 lines of CSS appended** to `css/main.css` covering: `.hero-signature`, `.about-headline`, `.about-bullets`, `.about-emoji`, `.project-stats`, `.project-stat-pill`, `.awards-grid`, `.award-card`, `.award-icon`, `.award-body`, `.award-title`, `.award-meta`, `.award-desc`, `.hero-ticker`, `.hero-ticker-label`, `.hero-ticker-track`, `.hero-ticker-content`, `.hero-ticker-item`, `.hero-ticker-sep`, `@keyframes tickerScroll`, reduced-motion fallback, mobile media query.

### B5 — i18n (+42 keys × 4 locales)

- **42 new keys** spanning hero signature, About bullets, Experience M.Sc. / B.S., Featured sort option, H-index / Grants stats, outline update, graphkit-learn stat pill, Awards section (+4 award subtrees × 3 properties each = 12 keys), Services Invited Talks card, and hero ticker.
    - `hero.signature`, `about.headline`, `about.b1..b6` (7 keys)
    - `exp.role_msc`, `exp.org_msc`, `exp.desc_msc`, `exp.role_bs`, `exp.org_bs`, `exp.desc_bs` (6 keys)
    - `common.featured`, `stats.h_index`, `stats.grants` (3 keys)
    - `outline.graph_ai_sci_desc` (1 key) — reworded to lead with molecular property prediction framing
    - `proj.gklearn.per_month` (1 key)
    - `sections.awards` (1 key)
    - `services_cards.talks_title`, `services_cards.talks_i1..i3` (4 keys)
    - `awards.snsf_postdoc.{title,meta,desc}`, `awards.innosuisse.{title,meta,desc}`, `awards.anr_api.{title,meta,desc}`, `awards.mcaa.{title,meta,desc}` (12 keys)
    - `ticker.label`, `ticker.t1..t5` (6 keys)
- **Parity check — 430 keys, all 4 locales OK** via `scripts/check_i18n_parity.py`. Baseline en.json = 430; zh / fr / de all in sync. Delta from V1 = +42 keys × 4 locales = 168 total string additions in this V.
- Python script applied the same 42 keys in parallel to all 4 locale JSON files; jq validity verified by the PostToolUse hook.

### Files touched

- `index_en.html` — hero signature, hero ticker, About restructure, Experience timeline (M.Sc./B.S.), Projects card `data-priority` × 11, Featured sort `<option>`, Publications sort default, stats grid H-index + Grants, YOLO relocation, graphkit-learn `.project-stats`, Invited Talks card, `#awards` section, section reorder.
- `js/main.js:833` — `sortCards('featured')` branch, init-on-load for sort select (projects + publications blocks).
- `css/main.css` — ~255 new lines (see B4 bullet).
- `locales/{en,zh,fr,de}.json` — +42 keys each.
- `index_en_v7_round1.html` — pre-edit snapshot (copy of `index_en.html`).
- `docs/UPDATES.md` + `.zh.md` — this entry + Master TOC update.
- `docs/PLAN.md` + `.zh.md` — status markers flipped `[ ]`→`[✓]` on shipped items, new task IDs for B1-B4 features.

---

## V1 — Anti-spam hardening + 12-item polish pass (flag emojis, zh fixes, chatbot UX)

One consolidated V covering two sittings. Batch A (deferred "都存着" — logged now per the "Ask before doc updates" hard rule): anti-spam trio in the welcome-form Apps Script + new local-dev guide + privacy/security docs + welcome-card privacy line. Batch B: a 12-item curated polish pass driven by Linlin's job-hunt push — flag emojis on geo items, zh wording / terminology fixes, redundant heading removal, full chatbot i18n, and a chatbot/celebration button-stacking UX fix.

### A. Backfill — Anti-spam + local-dev guide + privacy

- **Apps Script anti-spam trio** in the welcome-form backend (spec: `docs/setup/form-backend-google-sheets.md` § Security & privacy):
    - **Honeypot field** — hidden `<input name="_gotcha">` in the form; Apps Script rejects any submission with non-empty value. Zero false-positives, zero deps.
    - **Origin allowlist** — Apps Script validates incoming `Origin` header against `['https://jajupmochi.github.io', 'http://localhost:8000']`. Anything else → 403.
    - **Dwell time** — `MIN_DWELL_MS = 2000`. Client stamps `t_open` when the welcome modal opens; Apps Script rejects submissions arriving < 2 s later. Catches automated bots that don't simulate read-time.
- **New `docs/setup/local-dev.md`** (+ `local-dev.zh.md` mirror) — one-page primer: `python3 -m http.server 8000`, locale-loader CORS note, theme switching, verify loop. Resolves repeated "how do I preview locally" friction.
- **`docs/setup/form-backend-google-sheets.md`** gains a **Security & privacy** section covering the trio above + Sheet permissions + Apps Script deploy-audit checklist. Chinese mirror updated.
- **Welcome-card privacy line** — new key `welcome.privacy_note` × 4 locales (en: "Your note is kept privately for my personal reference. Never shared.") rendered as a small line under the form to reassure visitors before they submit.

### B. Today's batch — 12 items

#### 1. Country-flag emojis on news + experience items

- **News** (`locales/*.json`): 🇫🇷 prepended to `c_graphadon` + `c_phd_defense`, 🇯🇵 to `c_acpr` — mirrored to all 4 locales.
- **Experience**: 🇨🇭 on `org_advanced_postdoc` + `org_scientific_collab` + `org_research_fellow`; 🇫🇷 on `org_postdoc` + `org_phd`. Geographic diversity at a glance for sidebar scanners.

#### 2. zh hero-badge rewording

`zh.json` `hero.badge`: "开放 ML 研究科学家职位" → **"寻求机器学习研究科学家/工程师职位"**. Old wording implied "I'm hiring"; new wording correctly reads "I'm seeking".

#### 3. zh availability-status softening

`zh.json` `otw.status`: "可立即入职" → **"可快速入职"**. More honest — Linlin has an ongoing postdoc, so "immediate" overstates.

#### 4. zh terminology — 预映像 → 预映射

All occurrences in `zh.json` (research keywords, Skills chip text, project copy referencing pre-image work). Linlin's call: 预映射 is the canonical Chinese rendering for "pre-image" in graph-ML / manifold-learning literature.

#### 5. River-Water-Temp paper — missing co-authors appended

`index_en.html:1204` — "Riverine Water Temperatures Response to Climate Change" author list now includes **B. Fankhauser, V. Bigler, K. Riesen**. Sync with the CV canonical list.

#### 6. zh translation for "University of Bern · Pattern Recognition Group"

`zh.json` now reads **"伯尔尼大学 · 模式识别小组"** instead of the English string. (fr/de were already translated; zh was the holdout.)

#### 7. `<h3>Let's Connect</h3>` + `contact.connect` key — removed

Redundant with the section's own `<h2>Contact</h2>` heading right above it. Deleted the DOM node + the `contact.connect` key from all 4 locales.

#### 8. Chinese CV link — verified

`zh.json` already routes to `res/cv/CV_Linlin_Jia_zh.pdf` via `data-i18n-href-map`; smoke-tested via chrome-devtools (en download → `_en.pdf`, zh download → `_zh.pdf`). No edit needed.

#### 9. zh full-name expansions for HES-SO + INSA

`zh.json`:

- "HES-SO Fribourg" → **"瑞士西部应用科技大学弗里堡校区"**
- "INSA Rouen Normandie" → **"法国诺曼底大学国立鲁昂应用科学学院"**

Full Chinese names read more naturally for CN-org recruiters; English acronyms stay in en/fr/de.

#### 10. "Linlin Jia" → "贾林林" in zh only (3 spots)

Three occurrences swapped in zh: navbar brand, footer line 1, footer line 2. New i18n key `nav.brand` (× 4 locales — "贾林林" in zh / "Linlin Jia" in en / fr / de) lets the swap be locale-aware while keeping pinyin for non-Chinese viewers.

#### 11. Chatbot toast — full i18n across 4 locales

`js/main.js:388-395` `openChatbot()` previously hardcoded English. Now reads `translationsCache[currentLang]['chatbot.toast_title']` + `chatbot.toast_html`. New keys × 4 locales:

```json
"chatbot": {
    "toast_title": "AI chat coming soon!",
    "toast_html": "For now, please reach out via email &rarr; <a href=\"mailto:linlin.jia@unibe.ch\">linlin.jia@unibe.ch</a>"
}
```

`&rarr;` rendered via the toast's existing innerHTML path. Per-locale variants for zh / fr / de.

#### 12. Chatbot button UX — fix

**Symptom (reported by Linlin):** two floating buttons (🎁 celebration + 🤖 chatbot) were stacked at identical coordinates (`left:20px, bottom:20px`), and the chatbot started `display:none` → only flipped to `display:flex` after the welcome overlay first closed. Result: first-time visitors saw only 🎁, mistook it for a chatbot icon, clicked, and were surprised by a welcome modal instead.

**Fix** (`css/main.css` + `js/main.js`):

- `.celebration-trigger` `bottom: 20px` → **`bottom: 100px`** (now stacks above).
- `.chatbot-trigger` `display: none` → **`display: flex`** unconditionally (always visible at `bottom: 20px`); removed the `.active`-gated style.
- `closeWelcomeWithBottle(submitted = false)` — new parameter:
    - If `submitted=true` (form filled + submitted): set `localStorage.hasVisitedBefore = 'true'` so 🎁 never returns for this visitor.
    - If `submitted=false` (skip path via "Maybe later"): re-show 🎁 by removing the `.hidden` class added in `openGiftBox()`.
- `submitWelcome` call site explicitly passes `true`.
- Dead code `closeWelcome()` removed (was never invoked).

Behaviour after fix:

- First visit → both 🎁 (stacked top) + 🤖 (bottom) visible.
- Submits → 🎁 gone for good; 🤖 still there.
- Skips ("Maybe later") → 🎁 stays for next try; 🤖 uninterrupted.
- Returning visitor (already submitted) → only 🤖.

### Verification

- `jq .` on all 4 locales — valid.
- `scripts/check_i18n_parity.py` — 389 leaf keys × 4 locales, zero drift.
- chrome-devtools cross-theme visual pass deferred to pre-commit (per CLAUDE.local.md "visual verification scope").

---

# 2026-04-22

## V1 — Deferred backfill (V10 LIULIAN/Fun + V11 Cmd+K search) + today's batch (Skills restructure, Patent category, Map i18n, 7-paper pub-links, empty-filter UX, Visit Map)

One consolidated V — three logical chunks were deferred from per-batch logging per the new "Ask before doc updates" hard rule (added 2026-04-21) and are now landing together. Driven by Linlin's job-hunt push: differentiator features (Visit Map, Cmd+K search) + content fidelity (Skills, Patent reclass, pub completeness) + UX correctness (empty-filter affordance, map locale).

### A. Backfill — V10: LIULIAN + Confidential Translator + Fun filter + project-card polish

- New project card **LIULIAN** (graph + LLM hybrid agent prototype) with `2026_liulian_architecture.png` figure.
- New project card **Confidential Translator** with `2026_confidential_translator_presentation.gif` figure (animated demo).
- New `fun` filter chip in Projects (`filters.fun` × 4 locales) so personal / playful work surfaces alongside formal projects without diluting the recruiter-track filters.
- General card polish: spacing, figure sizing consistency, hover behavior alignment with V9's `.project-links` footer widget.

### B. Backfill — V11: Full-site search (Cmd+K)

- New IIFE `(function initSiteSearch() { ... })()` at `js/main.js:1075-1295`: builds a flat index of section titles, project cards, publication cards, news items at DOM-ready, exposes a centered modal triggered by `Cmd+K` / `Ctrl+K` (or the navbar search icon).
- Keyboard nav (↑/↓/Enter/Esc), filtered live as user types, hits scroll the target into view + flash-highlight on the receiving element.
- New `search.*` i18n keys (`placeholder`, `aria`, `empty`, `no_results`) × 4 locales.

### C. Today's batch (2026-04-22)

#### 1. Skills section restructured — 6 categories × 44 tags

`index_en.html:1477-1545`. Linlin's directive: **ML/AI first, Languages last; no TensorFlow; Graph Kernels / Edit Distances / Pre-image belong in ML/AI; add Java to Programming**. Final order:

- **ML/AI (13)** — GNNs★, LLMs★, Transformers★, Graph Kernels, Graph Edit Distances, Pre-image, Agents, Vision Transformer, Computer Vision, Deep Learning, Machine Learning, Time series, scikit-learn.
- **Programming (9)** — Python★, PyTorch★, C++, Java, JavaScript, Cython, MATLAB, Spring Boot, React.js.
- **Tools & Infra (8)** — Docker, FastAPI, Git, Cloud, Linux, CI/CD, HPC, LaTeX.
- **Domain (6)** — RDKit, DeepChem, Gaussian, Chemoinformatics, Hydrology, Spatio-Temporal Analysis.
- **AI Tools (5)** — unchanged from V10 layout.
- **Languages (3)** — unchanged.

★ = "primary" tag styling (heavier weight, accent color).

#### 2. Patent filter category + ELM reclassification

- New `patent` filter chip in Publications (`index_en.html` filter row): `<button class="filter-tag" data-filter="patent" data-i18n="filters.patent">Patent</button>`. New i18n key `filters.patent` × 4 locales (`Patent` / `专利` / `Brevet` / `Patent`).
- ELM card (CN106376041B Service-oriented Programmable Control and Scheduling for SDN) reclassified `data-tags="preprint"` → `data-tags="patent"` — it's a granted patent at XJTU, not a preprint.
- Preprint chip kept (other genuine preprints fall under it).

#### 3. Map i18n — `data-i18n-src-map` for `<iframe>` `src` attr

`index_en.html:1612, 1620` + new JS handler `js/main.js:~140-150`. Existing `data-i18n-href-map` only swaps `<a href>`; the Google Maps `<iframe src>` was always English. Added a parallel attribute `data-i18n-src-map` and an 8-line handler in `applyTranslations()`:

```js
document.querySelectorAll('[data-i18n-src-map]').forEach(el => {
    try {
        const map = JSON.parse(el.getAttribute('data-i18n-src-map'));
        if (map && map[lang]) el.setAttribute('src', map[lang]);
    } catch (e) {}
});
```

Each locale gets the right `hl=` (`en|zh-CN|fr|de`) for both the embedded map and the "Open in Maps" link.

#### 4. Seven publications gain new `pub-links`

Per Linlin's curated list (preprints / slides / videos):

- **[J24] RedoxPrediction** — + ResearchGate Preprint.
- **[C23] ACPR 2023** — + PDF (`res/papers/acpr2023.pdf`).
- **[J22b] GED Stability** — + ResearchGate Preprint.
- **[J22a] Graph Kernels** — + HAL Preprint.
- **[J21] graphkit-learn** — + HAL Preprint.
- **[W21b] Pre-image** — + honeine.fr Preprint + Slides + Video (YouTube/Bilibili swap via `data-i18n-href-map`).
- **[W21a] Metric Learning** — + honeine.fr Preprint + Slides + Video (YouTube/Bilibili swap via `data-i18n-href-map`).

Video link is locale-aware: zh users get the Bilibili mirror (`BV1A54y1s7zJ` etc.), all other locales get the original YouTube URL — Linlin's call to respect the dominant video platform per region.

#### 5. Empty filter chips auto-disable

`js/main.js` in BOTH `initFilterableCarousel` and `initFilterableList`:

```js
filterBtns.forEach(btn => {
    const tag = btn.dataset.filter;
    if (tag === 'all') return;
    const matchCount = allCards.filter(c =>
        c.dataset.tags && c.dataset.tags.split(',').map(s => s.trim()).includes(tag)
    ).length;
    if (matchCount === 0) {
        btn.disabled = true;
        btn.setAttribute('aria-disabled', 'true');
    }
});
```

CSS (`css/main.css:~1722`): disabled chips get muted bg + 0.45 opacity + `cursor: not-allowed` + `pointer-events: none`. Triggered Linlin's request "preprint按钮保留，但是把无内容的按钮变成无法点击" — auto-recompute means future content changes update button state with no manual gate-keeping.

#### 6. Visit Map (Phase 4) — Contact-section choropleth

Self-built lightweight visit stats + source-distribution map (Linlin chose option C — no third-party widget, reuse the existing Clarity backup pipeline as the data source).

- **HTML** (`index_en.html` Contact section, after `.contact-section`): new `#visitMapBlock` (hidden by default, JS unhides on data hit). Header line: `total visits · countries · past 3 days · via Microsoft Clarity`. Body: `<svg id="visitMapSvg">` (left) + `<ol id="visitTopList">` Top-5 list (right). Mobile: list collapses below map.
- **JS** (`js/main.js` end-of-file IIFE `(function initVisitMap() { ... })()`):
    - Probe back up to 90 days for newest `data/analytics/clarity-YYYY-MM-DD.json` via HEAD requests (newest-first).
    - Walk Clarity payload's `data[*].information[*]` for `Country` field + `totalSessionCount`; aggregate to a Map.
    - `COUNTRY_ALIAS` table normalizes ISO-2 codes → world-atlas English short names (US → "United States of America", CH → "Switzerland", etc.).
    - Lazy-load D3 v7.9.0 + topojson-client v3.1.0 from jsDelivr (already in CSP `script-src`); fetch local `data/world-atlas/countries-110m.json` (~108KB bundled — chosen over `connect-src` allowlist extension to keep CSP tight).
    - Render: `geoNaturalEarth1` projection, `scaleSequential` interpolating `rgba(120,144,180,0.18)` → `--primary` (theme-aware at first render), `<title>` tooltip per country.
    - Empty state: block stays `hidden` if no snapshot, no D3, or zero countries — Contact section degrades silently.
- **CSS** (`css/main.css:~2384`, before `#map`): `.visit-map-block` w/ top border, 2-column body grid (1fr / 220px), responsive single-column mobile, theme overrides for industrial (dark) + fancy (pink).
- **i18n**: 7 new keys under `visitMap.*` (title / totalVisits / countries / window / source / topCountries / svgTitle) × 4 locales.
- **CSP**: no changes — D3+topojson scripts use existing `script-src https://cdn.jsdelivr.net`; world atlas is local; no `connect-src` widening.
- **Verified** (chrome-devtools, mock fixture deleted before commit):
    - 12-country mock → 181 total visits, 5-row top list, 12 colored country paths in 177-feature SVG.
    - ai-generated theme: purple choropleth, top list with primary-color counts. Chinese i18n verified ("全球访客分布 / 总访问数 / 过去 3 天 / 数据来自 Microsoft Clarity").
    - Industrial theme: dark card, orange accents.
    - Fancy theme: pink card, pink choropleth.
    - Empty state (no snapshot): block `hidden=true`, `display: none`, no rendered SVG paths, no console errors.

### Pipeline state — what's needed for real data

The Clarity backup workflow IS pushed (master 14 commits ahead → caught up). First `gh workflow run backup-analytics.yml` failed: `CLARITY_API_TOKEN` repo secret not set. Linlin's manual step:

1. Clarity dashboard → Settings → Data Export → Generate API token.
2. GitHub repo → Settings → Secrets and variables → Actions → New repository secret `CLARITY_API_TOKEN`.
3. Re-trigger workflow (`gh workflow run backup-analytics.yml`); it commits `data/analytics/clarity-2026-04-22.json` to master.
4. `git pull` → site shows real visitor distribution.

(Full setup walkthrough: `docs/setup/analytics-backup.md` §1–§4.)

### i18n parity

124 → **141 keys/locale**. New keys this V:

- `filters.fun` (V10 backfill).
- `search.placeholder`, `search.aria`, `search.empty`, `search.no_results` (V11 backfill).
- `filters.patent` (today).
- `visitMap.title`, `visitMap.totalVisits`, `visitMap.countries`, `visitMap.window`, `visitMap.source`, `visitMap.topCountries`, `visitMap.svgTitle` (today, Phase 4).

Pre-commit i18n hook + `python3 scripts/check_i18n_parity.py` both green.

### PLAN.md sync (this V's deltas)

- `H1.M1.G2` (Projects): LIULIAN + Confidential Translator + Fun filter `[✓]`.
- `H1.M1.G4` (Skills): 6-category 44-tag restructure `[✓]`.
- `H1.M1.G2` (Publications): 7-paper pub-links + Patent category + ELM reclass `[✓]`.
- `H1.M2.G2` (Multilingual crawlability): Map i18n via `data-i18n-src-map` `[✓]`.
- `H1.M4` (Unique differentiators): Cmd+K search + Visit-map choropleth `[✓]`.
- `H2.M3.G1` (Analytics backup): pipeline live `[~]` (awaiting `CLARITY_API_TOKEN` secret to mark `[✓]`).

### Known follow-ups

- Choropleth color is captured at first render from `--primary`; theme switch doesn't recolor the rendered SVG (page reload does). Acceptable v1 — could add a `MutationObserver` on `[data-theme]` later if Linlin notices.
- After `CLARITY_API_TOKEN` lands, first workflow run + repo pull → real choropleth on production. Until then, block stays hidden and section degrades gracefully.
- `index_zh.html` (legacy page) not synced for any of A/B/C — out of scope.

# 2026-04-21

## V9 — SEO audit round-3 P0–P5 + UX polish + Projects 9-card CV-aligned refactor

Goal: close out the SEO audit priority list (P0 sitemap hygiene through P5 citation-count signals), land the three UX fixes Linlin flagged after V8 (ugly coming-soon toast, undersized pub thumbnails, no breathing room above thesis highlight), and — the big one — reshape the Projects section to match the formal CV project list with per-card multi-link footers. Whole change-set is driven by "recruiters skimming the site should see the same projects, same titles, same scope as the PDF CV, plus every related URL one click away."

### 1. SEO audit round-3 follow-through (P0–P5)

- **P0 — `sitemap.xml` broken URLs fixed + 6 new figure URLs added** (`sitemap.xml:54-78`): Two `<image:loc>` entries pointed at filenames renamed in V8 (`icpr2026_*` → `2026_icpr_*`, `jcc2023_*` → `2023_jcc_*`); both would 404 on Google Images crawl. Patched. Added 6 new `<image:loc>` for V8's pub-card figures (EpidNN, Electronics stability, ESWA kernels, PRL accuracy, SSPR pre-image, SSPR GED metric) so the indexer discovers them without having to render the page.
- **P1 — `<h2>` i18n attrs for Beyond Research + Blog** (`index_en.html:1423, 1543` + 4 locales): Both headings were static English under a `data-i18n` parent section but the `<h2>` itself had no attr — zh/fr/de visitors got mixed-language headings. Added `sections.beyond`, `sections.blog`, `beyond.subtitle`, `blog.label` keys to EN/ZH/FR/DE. Parity at 124 keys/locale.
- **P2 — Title keyword tightening** (`index_en.html:5`): `Linlin Jia, Ph.D. — ML Research Scientist | Graph ML · LLM` (60 chars, on the Google SERP cutoff line). Trades the vaguer "AI Research" for the higher-intent "LLM" keyword Linlin is targeting this job search.
- **P3 — Meta description trimmed to 148 chars** (`index_en.html:6`): Previous 160+ char description got ellipsized on Google SERPs. New: "Linlin Jia, Ph.D. — Graph ML, LLM Agents, Spatio-Temporal Forecasting, AI for Science. Postdoc at U. Bern. Open to ML Research Scientist roles." Keeps the 4 target keywords + role + availability signal.
- **P4 — FAQPage / BreadcrumbList / WebSite schemas** — audit flagged as missing, verification showed they were already present at `index_en.html:340-428` (added in V2). No-op; marked complete for audit-trail clarity.
- **P5 — Citation counts injected into all 9 publication schemas** (`index_en.html` Person block + 8 ScholarlyArticle blocks): Person schema now carries `interactionStatistic` with `@type: InteractionCounter`, `interactionType: https://schema.org/CiteAction`, `userInteractionCount: 130` (total per `data/citations.json`). Each ScholarlyArticle gets its own per-paper InteractionCounter: J24=9, ACPR=1, CBM=61, Electronics=2, ESWA=25, PRL=14, W21b=9, W21a=7. Google Scholar–indexed counts so Google / Scholar / LLM-assisted rankers see peer-validation signal without needing to scrape the page's visible `.citation-count` spans.

### 2. UX polish (three Linlin flags)

- **Coming-soon toast — glass-morphism rewrite** (`index_en.html:1609` + `css/main.css:~2935`): Previous toast was a plain translucent pill with tight body text — Linlin called it "太丑" (too ugly). Rewrite: centered card (280–420 px wide, clamped by viewport), 18 px backdrop blur + 160% saturation, 44×44 icon badge (`fa-screwdriver-wrench`), two-line title + subtitle, soft drop shadow + primary-tinted 1 px ring, subtle `scale(0.92) → 1.0` cubic-bezier entrance for springy bounce. Theme overrides: industrial → dark card + neon-green icon, fancy → pink gradient + slightly more saturation. New i18n keys `comingSoon.title` + `comingSoon.sub` replace single-line `comingSoon.text`. Cross-theme verified via chrome-devtools.
- **Pub-thumbnail 180×140 → 220×172 + halved padding** (`index_en.html` 10 img dims + `css/main.css:~1841, ~1857`): Linlin's directive — "图片放大，左/上 padding 减半，下 padding 等于上 padding"（enlarge figure, halve left/top padding, bottom padding = top padding）. Card padding `1.5rem` → `0.75rem 1.5rem 0.75rem 0.75rem` (halved on top+left, bottom = top). Grid `180px 1fr` → `220px 1fr`, gap 1.5rem → 1.25rem. `.pub-thumbnail` max-width 180→220 px, height 140→172 px (preserved 5:4 aspect ratio). All 10 `<img>` elements inside pub-cards updated via `replace_all` with the unique string `" loading=\"lazy\" width=\"180\" height=\"140\">"` — project-card images (400×180) untouched.
- **Thesis highlight — `margin-top: 2rem` above** (`css/main.css:~1767`): Without spacing the thesis card butted directly against the last pub card in the carousel, visually flattening the Ph.D. capstone into the list. Added breathing room so it reads as a closing statement rather than another list item.

### 3. Projects 9-card CV-aligned refactor

The big structural change. Re-reading V7 with Linlin's CV open, the Projects section was a pile of somewhat-arbitrary cards — some were grants, some were code repos, some were placeholder `#projects` anchors. None matched the CV's `Projects` section verbatim. Recruiters reading the CV + site together would see different names.

- **Virtual Bodmer removed**: Card deleted entirely. Linlin's decision — project scope didn't materialize and the HES-SO link was weak.
- **OCTOPUSSY + RedoxPrediction merged** into a single card "OCTOPUSSY — Optimization of Polymers Using Sustainable SYnthesis" (formal CV title). Redox was the implementation deliverable of OCTOPUSSY, and two separate cards was confusing. Merged card carries both the 2023_jcc_redox_framework figure and footer links to GitHub `RedoxPrediction` + JCC 2024 DOI.
- **3 new cards added from CV**:
    - **PLANALYSER — Automated HVAC-Concept Audit and Optimisation using AI** (2024-2025, INNOSUISSE, iCoSys + WATTELSE AG). Industry badge. Footer: ARAMIS/INNOSUISSE grant page + WATTELSE startup page.
    - **APi — Apprivoiser la Pré-image** (2018-2021, ANR). Thesis-grant card. Footer: ANR grant page + LITIS project homepage + "Papers" anchor. Uses `2021_sspr_preimage_intro.svg` as figure.
    - **Service-oriented Programmable Control and Scheduling for Software Defined Network** (2014-2017, M.Sc. research at XJTU). Footer: Google Patents page for CN106376041B. Uses `2016_patent_elm_google_patent_page.png` as figure.
- **All 9 cards restructured** as `<div class="project-card" data-primary-href="…" role="link" tabindex="0">` instead of `<a class="project-card">`. Nested `<a>` (needed for the new footer link strip) is invalid HTML inside an `<a>`, so the outer wrapper became a div. Delegated JS click handler in `js/main.js:611-640` (`document.addEventListener('click', …)`): card-body click → navigate to `data-primary-href` (new tab if external); footer link clicks bubble to their own `<a>`; cmd/ctrl/middle-click opens new tab; keyboard Enter/Space works for a11y.
- **Formal CV names + full descriptions**: Every title swapped to the exact CV wording (e.g. "Spatio-Temporal GNN for River Temperature Forecasting" → "Spatio-Temporal Graph Convolutional Networks for River Temperature Forecasting"), descriptions expanded to include funder + institutional collaborators + outputs as stated in CV.
- **`.project-links` footer widget** (`css/main.css:1588-1625`): New block matching `.pub-link` visual idiom — dashed top border, flex-wrapped pills (background `--bg-subtle`, color `--primary`, hover → filled primary with 1 px translateY). Footer icons: `fa-file-signature` for funding pages, `fa-globe` for platform/project homepages, `fa-handshake` for partner pages, `fab fa-github` for code repos, `fa-file-lines` for linked papers, `fa-certificate` for patent.
- **data-primary-href targets per card**: ST-GCN → SNSF 206352 grant; N-Banker → platform homepage; GraphInk → SNSF 217594 grant; graphkit-learn → GitHub repo; PLANALYSER → ARAMIS grant; Graph Matching → SNSF 188496 grant; OCTOPUSSY → RedoxPrediction GitHub; APi → LITIS project page; SDN → Google Patents.

### Cross-theme visual verification (chrome-devtools)

- Live page at `http://localhost:8000/index_en.html#projects` programmatically inspected: 9 `.project-card` elements, all `DIV` tags, all carrying valid `data-primary-href`, `role="link"`, `tabindex="0"`, cursor `pointer`. Per-card link counts: 3, 2, 1, 2, 2, 3, 2, 3, 1 — matches intent.
- Default theme `ai-generated` screenshot: page 1 shows ST-GCN / N-Banker / GraphInk with footer strips reading `Funding · Code · Paper` / `Platform · Partner` / `Funding`; page 2 (graphkit-learn / PLANALYSER / Graph Matching); page 3 (OCTOPUSSY / APi / SDN with the distinctive Google Patents screenshot).
- `industrial` theme: orange accents on footer pills, background switch to dark card, text readable. Orbitron headers render cleanly with the longer formal titles.
- `fancy` theme: pink/magenta accents on footer pills, butterflies render around cards unaffected. Longer titles wrap gracefully (no overflow).
- `academic` theme: not re-screenshot; CSS vars inherit from `ai-generated` except muted primary hue. Confirmed by rule-path review.

### i18n parity

- 6 new keys added / swapped in `locales/{en,zh,fr,de}.json`: `sections.beyond`, `sections.blog`, `beyond.subtitle`, `blog.label`, `comingSoon.title`, `comingSoon.sub`. Legacy `comingSoon.text` removed.
- Total keys per locale: 124. Parity verified (identical key trees across all 4 files). Project card titles / descriptions deliberately NOT i18n'd — formal project names stay in their official language (same convention as paper titles).

### PLAN.md sync

- `H1.M1.G2.T*` (Projects) — three new tasks: T_ delete Bodmer, T_ merge OCTOPUSSY+Redox, T_ add PLANALYSER/APi/SDN with footer widget.
- `H1.M2.G4.T*` (Head hygiene) — P0/P1/P2/P3/P5 marked `[✓]`, P4 closed as already-present.
- `H1.M1.G6.T*` — closed (collaborators surfaced via project-card content + partner links).

### Not in this change-set (deliberately)

- Paper-to-project back-reference chips under each pub card (Linlin's "对应论文下的url标签也可依此更新" — optional per her "可以" wording). Skipped for this V; can land as V9.1 if desired.
- `index_zh.html` sync — zh is a separate legacy page, re-styled project card refactor would require its own session.

## V8 — Batch-B preprocessing (thesis repositioned, pub figures, patent i18n, services icon)

Goal: four unrelated-but-small polish items staged ahead of the larger Batch B work (B1-B7 sequence that Linlin queued). Each item stands on its own but shares the "get the site visually correct first, then do the structural surgery" prelude. No new i18n keys, no schema changes, no CSS additions — the surgery touches HTML only plus a 12-line JS helper.

### What changed

- **Thesis highlight: top of Publications → bottom** (`index_en.html:1238-1260`): The V7 placement put the `.thesis-highlight` card above the filter controls, which pushed the 2026 ICPR accepted announcement below-the-fold on a recruiter's first scroll. Decision: let "what I'm shipping now" (ICPR 2026) open the section, and let the foundational 2021 thesis close it as a summary. Position verified via chrome-devtools `compareDocumentPosition` (`isAfterPubsList: true`) and visual screenshot showing the thesis card immediately above the Academic Services section.
- **6 new figures attached to pub cards** (`index_en.html:1117-1220`): Publications cards J23 (CompBioMed EpidNN), J22b (Electronics GED stability), J22a (ESWA graph-kernel representations), J21 (PRL graphkit-learn), W21b (SSPR pre-image), W21a (SSPR GED metric learning) were still using bare Font Awesome icons as thumbnails. Swapped each for a `<img>` of a real figure from the paper:
    - `res/figures/2023_cbm_epidnn_abstract_page.png`
    - `res/figures/2022_electronics_ged_stability_results.png`
    - `res/figures/2022_eswa_graph_kernels_graph_representations.png`
    - `res/figures/2021_prl_gklearn_accuracy.svg`
    - `res/figures/2021_sspr_preimage_intro.svg`
    - `res/figures/2021_sspr_ged_learning_framework.png`
    - All 6 verified in browser with `naturalWidth > 0` (734-3135 px source), preserving the existing overlay badge ("CompBioMed" / "Electronics" / etc.) on top of the image.
- **Figure filename rename to `YYYY_venue_*` convention** (`index_en.html` 4 references): `icpr2026_swissriver_diagram.svg` → `2026_icpr_swissriver_diagram.svg` (2 usages: project card + pub card); `jcc2023_redox_framework.{svg,png}` → `2023_jcc_redox_framework.{svg,png}` (4 usages). The old filenames put the venue first and year second, which didn't sort chronologically in a directory listing. New convention aligns with how the other 2021–2026 figures are named.
- **Patent link locale-aware href** (`index_en.html:1231` + `js/main.js:128-137`):
    - New generic HTML attribute `data-i18n-href-map='{"zh":"…","en":"…/en","fr":"…/en","de":"…/en"}'` on the P16 patent anchor.
    - New handler in `applyTranslations(lang)`: for every element carrying `data-i18n-href-map`, parse the JSON and swap the `href` to the locale-matching URL. Silent on malformed JSON (leaves href unchanged).
    - Behavior: Chinese visitors land on the Chinese-language Google Patents page (`https://patents.google.com/patent/CN106376041B`); en / fr / de visitors land on the English-translated version (`/en` suffix). Verified in browser by calling `applyTranslations('zh' / 'fr' / 'de' / 'en')` and reading the live `href`: all four return the expected value.
    - Generic enough to support future locale-differentiated external URLs (regional news coverage, translated video mirrors).
- **Associations card icon `fa-edit` → `fa-id-badge`** (`index_en.html:1252`): `fa-edit` (a pencil-on-paper glyph) semantically fits "Reviewing" (editorial work on submitted papers) but mismatches "Associations" (membership in SAPR / Marie Curie Alumni / LITIS). Swapped to `fa-id-badge` — the member-card glyph matches the "I belong to these professional bodies" semantic. The Reviewing card at `:1260` deliberately keeps `fa-edit`.

### Cross-theme visual verification (chrome-devtools)

- Hard-reload with cache bypass, then programmatic checks in the live page:
    - Thesis card present at bottom: ✓
    - All 6 figures loaded (`naturalWidth` 734, 794, 1112, 1130, 1482, 3135 px): ✓
    - Association icon class = `fas fa-id-badge`: ✓
    - Patent initial href (EN default) = `…/en`: ✓
    - `applyTranslations('zh')` swaps href to `…CN106376041B` (no `/en`): ✓
    - `applyTranslations('fr' | 'de' | 'en')` swaps href back to `…CN106376041B/en`: ✓
- Screenshot captured: `/tmp/thesis_at_bottom.png` — shows ACPR card → thesis highlight → Academic Services handoff in the default `ai-generated` theme; all styling preserved from V7.
- `fancy` / `industrial` / `academic` not re-screenshot: the thesis block's CSS is unchanged from V7 (which was already verified on all 4 themes); only its DOM position moved. Position change doesn't trigger any theme-specific CSS path.

### Figure asset hygiene

- Six new figures now referenced by HTML, tracked by git:
    - Previously untracked / moved-in from V7 prep staging; now actively used.
- Three old filenames (`icpr2026_swissriver_diagram.svg`, `jcc2023_redox_framework.{png,svg}`) deleted; replaced with year-first variants.

### PLAN.md sync

- `H1.M1.G1.T3` (new) — figure renames + 6 pub-card attachments.
- `H1.M1.G7.T5` (new) — thesis highlight relocation top → bottom.
- `H1.M2.G2.T3` (new) — patent link locale-aware href via `data-i18n-href-map`.
- `H1.M2.G4.T2` (new) — Associations icon `fa-edit` → `fa-id-badge`.

### Not in this change-set (deliberately)

- Batch B items B2 (collaborator surfacing on cards), B3 (pub preprint/video/slides metadata), B4 (news external links), B5 (LinkedIn skill regrouping), B6 (i18n staleness script), B7 (55 missing `data-i18n` elements). Those land in subsequent V's per Linlin's sequence "B1-B6-B2-B3 4 5 7".

## V7 — A4 thesis integration (timeline + Publications highlight)

Goal: close out the last Batch A item — surface Linlin's Ph.D. dissertation in two discoverable places. The thesis was listed in the CV (`res/cv/CV_Linlin_Jia_en.pdf`) but had no on-site touch point, which hurt two audiences at once: recruiters looking for evidence of deep research training, and the Publications section itself (which opened straight on a 2026 paper while the ~260-page dissertation sat offstage).

### What changed

- **PhD timeline entry (`index_en.html:888-895`)**: Added a `.timeline-links` action row directly under `timeline-desc`. Two buttons using the existing `.pub-link` class so the theme-adaptive hover tint already verified in V5 carries over without new CSS audits:
    - **Thesis PDF** → `res/thesis/2021_thesis_linlin_jia.pdf` (new asset, 7.7 MB).
    - **Defense slides** → `res/thesis/2021_thesis_slides_linlin_jia.pdf` (new asset, 8.1 MB, preserved verbatim from 2021).
- **Thesis highlight block at the top of Publications (`index_en.html:1031-1050`)**: Featured `.thesis-highlight` card placed above the filter controls so it stays visible under any filter (`All` / `Journal` / `Conference` / `Preprint`) + any sort (Newest / Oldest / Most cited). Not part of `.pubs-list` so it's never sorted away. Components:
    - Circular icon wrapper (`fa-book-open`) with theme-adaptive background (`--bg-subtle`).
    - 4 px left-border accent in `--primary` (falls back to `--accent` in `fancy`).
    - Badge: "Ph.D. Dissertation · 2021" in uppercase-letter-spaced primary tint.
    - Title (thesis's full title), meta line (`L. Jia · LITIS Lab, INSA Rouen Normandie, France`), one-sentence description with advisor attribution.
    - Two download buttons (Thesis PDF + Defense slides) matching the timeline set — duplication is intentional: recruiter may skim top-down and never click into Experience.
- **CSS (`css/main.css`)**: New `.thesis-highlight*` block (7 rules: container, icon, body, badge, title, meta, desc, links) + a single-rule `.timeline-links` utility for the PhD-timeline button row. All rules use the existing `--bg-white` / `--bg-subtle` / `--border-light` / `--text-*` / `--primary` vars so `ai-generated` / `academic` / `industrial` / `fancy` inherit without new theme forks. Mobile breakpoint at `max-width: 600px` collapses the icon-beside-text layout into an icon-above-text stack.
- **i18n keys — 6 new × 4 locales = 24 new strings**: `thesis.badge`, `thesis.title`, `thesis.institution`, `thesis.subtitle`, `thesis.download`, `thesis.slides` added to EN / ZH / FR / DE. Thesis title kept as the original English phrase in all 4 locales (academic convention — papers / dissertations don't get translated titles). Parity verified at 119 keys across all 4 via `scripts/check_i18n_parity.py`.

### Cross-theme visual verification (chrome-devtools)

- `fancy` (default at session start): pink/magenta left border, pink icon circle, readable on soft-pink background.
- `ai-generated`: purple `--primary`, white card bg, book icon clean on light grey circle.
- `industrial` (dark): orange/amber accents on dark card, high-contrast text, buttons readable.
- `academic`: skipped as a separate screenshot — shares the light scheme with `ai-generated` and the theme's only delta is muted primary color; confirmed by CSS var usage review.
- Mobile layout verified by reviewing the `.thesis-highlight` flex rule — no physical resize captured (would require device emulation which adds noise for a rule this simple).

### PLAN.md sync

- New Goal **`H1.M1.G7`** — Ph.D. thesis integration (timeline + Publications). 4 Tasks all `[✓]`.
- Side fix: `H1.M1.G6.T1` flipped `[✓]` → `[x]` (cancelled). The V6 log said "kept `[~]`" but the PLAN had lagged at `[✓]` from the V5 original state; truth is that the `about.p5` paragraph tactic was reverted in V6, so the task's output no longer exists in the codebase. New `H1.M1.G6.T3` added to carry the surviving intent (collaborator surface at the card level) — scheduled for Batch B.

### Assets added to the repo

- `res/thesis/2021_thesis_linlin_jia.pdf` (7.7 MB) — final archival copy, same file uploaded to the INSA Rouen thesis repository in 2021.
- `res/thesis/2021_thesis_slides_linlin_jia.pdf` (8.1 MB) — defense slide deck, same file.

Deliberately **not** staged in this commit (V5-prep scaffolding for Batch B, to be wired into Publications cards with their own test pass):

- `res/figures/2021_sspr_preimage_intro.svg`
- `res/figures/2022_eswa_graph_kernels_graph_representations.png`
- `res/figures/2023_cbm_epidnn_abstract_page.png`
- `images/IMG_20231010_155307.jpg` (candidate Personal-section photo, not yet placed)

## V6 — Batch A wrap-up + SEO audit round-2 P0 cleanup

Goal: close out Linlin's post-V5 "Batch A" directives (A1 i18n diagnosis, A2 collaborators revert, A3 coming-soon toast, A5 cross-theme lightbox verify), then act on the P0 findings of a second SEO audit (scored 92/100 — excellent baseline after V2 + V5). A4 (thesis link) remains pending for the next V.

### Batch A — post-V5 follow-up

- **A2 — `about.p5` collaborators paragraph reverted** (Linlin's correction: "合作者不要加到 About Me，加到 projects 和 papers 对应部分"):
    - Removed the V5 final About paragraph from `index_en.html` and from all 4 `locales/*.json` (`about.p5` key deleted).
    - Partner surfacing on project/publication cards deferred to Batch B (paired with news-external links + pub preprint/video/slides metadata).
    - `H1.M1.G6.T1` re-scoped: Goal stays open (`[~]`); only the About-paragraph tactic was cancelled.
- **A3 — Personal / Blog "coming soon" toast** (Linlin's directive: "personal 和 blog 页面我还没准备好，不要跳转"):
    - Nav links at `index_en.html:550-551` now call `showComingSoon('personal|blog')` instead of `showPage(...)`.
    - New `#comingSoonToast` DOM block before `<script src="js/main.js">` (`role=status`, `aria-live=polite`, `aria-hidden` toggled by JS).
    - New `.coming-soon-toast` CSS in `css/main.css`: fixed-center, scale 0.92→1 + opacity 0→1 on open, 2.5 s auto-dismiss, `prefers-reduced-motion` fallback. Reuses `--bg-secondary` / `--text-primary` theme variables so all 4 themes inherit correctly.
    - New `showComingSoon(page)` JS function in `js/main.js`: idempotent (cancels any pending dismiss timer), sets `aria-hidden=false`, auto-reverts after 2.5 s.
    - New i18n key `comingSoon.text` across 4 locales (EN / ZH / FR / DE translations).
    - Verified via chrome-devtools: clicking Personal or Blog fires toast, aria-hidden cycles `true → false → true`, page content unchanged, no console errors.
- **A5 — cross-theme lightbox verification**:
    - Ran the V5 lightbox against `academic` / `industrial` / `fancy` via chrome-devtools snapshot + computed-style check.
    - All 3 themes: backdrop `rgba(0,0,0,0.88)`, caption `rgba(255,255,255,0.9)`, `body.lightbox-open` scroll-lock, `aria-hidden` toggles clean, zoom-button positions consistent. No theme-specific regressions.
    - `H1.M3.G5.T1` → `[✓]` (was `[~]` after V5 — only ai-generated verified at that point).
- **A1 — i18n switching diagnosis** (no code change, but the finding shapes Batch B):
    - Confirmed `setLanguage(lang)` correctly translates `about.p1` / `p2` / `exp.desc_*`. Linlin's "About 切到中文还是英文" perception was actually driven by ~55 elements missing `data-i18n`: `<h2>Beyond Research</h2>` (`:1369`), `<h2>Blog</h2>` (`:1489`), `<h3>Let's Connect</h3>` (`:1314`), all Hobbies / Volunteer / Social headings, theme dropdown options, contact inner text, 8 project-card titles + descs, 9 news rows.
    - Scheduled as Batch B P0 under `H1.M1.G6`.
- **A4 — thesis link (timeline + Publications section)** — **pending**, will ship in the next V.
- **4-locale parity**: after V5→V6 churn (`about.p5` removed, `comingSoon.text` added): still 113 keys across all 4 locales. Verified via `python3 scripts/check_i18n_parity.py` — 0 diff.

### SEO audit round-2 — P0 cleanup

Source: second SEO audit run on 2026-04-21 (scored 92/100 — "excellent foundation"). Four `href="#"` dead links + one overlong meta description flagged as P0. No i18n / schema changes; pure content + link hygiene.

- **Meta description trim (`index_en.html:6`)**: 210 → 156 chars. New copy: `Linlin Jia, Ph.D. — ML Research Scientist. Graph ML, LLM Agents, Spatio-Temporal Forecasting, AI for Science. Advanced Postdoc, University of Bern. Open to roles.`. Leads with keyword-dense role + research areas so Google SERP preview doesn't truncate mid-sentence.
- **Dead-link fixes (`index_en.html`)**:
    - **ACPR 2023 PDF button** (`:1106`): `<a href="#">PDF</a>` → Google Scholar citation URL (`https://scholar.google.com/citations?view_op=view_citation&hl=en&user=cnlixw0AAAAJ&citation_for_view=cnlixw0AAAAJ:UeHWp8X0CEIC`). Link icon swapped from `fa-file-pdf` → `ai-google-scholar`, label from "PDF" → "Scholar". The paper has no public preprint URL; pointing at its Scholar citation page is the closest usable target (abstract + citation metadata crawlable, serves both human and bot readers).
    - **N-Banker project card** (`:936`): `<a href="#">` → `<a href="#projects">` (self-referencing no-op anchor). Internal FinTech project has no public URL; follows the same pattern already established by the GraphInk card at `:954`, which Google treats as a non-indexable self-link rather than a 404.
    - **OCTOPUSSY project card** (`:989`): same fix — `<a href="#">` → `<a href="#projects">`.
    - **RSS Feed link** (`:1521`): `<a href="#">RSS Feed</a>` removed entirely from `.blog-platforms`. Blog is still "coming soon" (no Jekyll/11ty feed being generated); a dead link was worse than no link.
- **Why the other audit findings aren't in this V6**:
    - i18n parity gaps on English-only headings — already called out above in Batch A/A1 findings; scheduled as Batch B P0 under `H1.M1.G6`.
    - Sitemap per-URL alternates, ProfilePage schema wrapper, visible breadcrumbs UI — P2/P3 opportunities, queued under `H1.M2.G3` / `G4` for a later pass.
- **Audit-relevant verification**:
    - `python3 scripts/check_i18n_parity.py` — not touched (zero locale key additions/removals).
    - `jq . locales/*.json` — unchanged (no JSON edits this round).
    - Visual check skipped per `CLAUDE.local.md` micro-edit rule (4 link-href swaps + 1 meta-tag copy edit, no layout impact).
- **PLAN.md sync**:
    - New Goal **`H1.M2.G5`** — Round-2 audit P0 cleanup (link hygiene + description trim). 4 Tasks all `[✓]`.
    - `H1.M3.G5.T1` → `[✓]` (cross-theme lightbox verified via A5).
    - `H1.M1.G6.T1` kept `[~]` (p5-paragraph tactic cancelled via A2; card-level surface pending in Batch B).
- **Score delta (post-fix estimated)**: 92 → ~94. P0 items closed; remaining gaps are i18n parity (P1, under M1.1 G6) and schema polish (P2/P3, under M1.2 G3 + G4).

## V5 — Content polish, collaborators surface, figure lightbox, timeline i18n parity

Goal: close out the V2 SEO audit follow-through by fixing remaining Warnings / Opportunities, address Linlin's 7-part directive (content corrections, timeline i18n, collaborators surface, click-to-enlarge images), and keep content aligned with `CV_Linlin_Jia_en_2026.03.06.pdf` + `extra_info_work.md`.

- **Title + meta description (`index_en.html`)**:
    - Title rewritten to Linlin's spec: `Linlin Jia, Ph.D. — ML Research Scientist | Graph ML · Spatio-Temporal ML · AI4Sci&Industry · LLM` (76 chars, includes "Spatio-Temporal" per Linlin's correction — not "Spatial-temporal").
    - Meta description kept at ~158 chars, "Open to roles in Switzerland / EU / remote" preserved.
    - Matches Google search-result truncation (title ≤ 60 px wide ≈ 60–70 chars typically, but Linlin prefers the full form for click-through relevance; acceptable given keyword density).
- **About Me content fixes (`index_en.html`)**:
    - **p2 MSc/BSc append** (Linlin's directive #2): appended `M.Sc. in Software Engineering (2017) + B.Sc. in Information Engineering (2014), both from Xi'an Jiaotong University, China` after the PhD sentence. Propagated across 4 locales (`en/zh/fr/de` — `about.p2`).
    - **p4 Spatio-Temporal correction**: same Spatio-Temporal (not Spatial-temporal) fix in the role-summary sentence.
    - **p5 collaborators surface** (Linlin's directive #5, integration option): new final About paragraph listing active collaborations — University of Basel, ETH Zürich, HES-SO Fribourg, University of Zürich, Inselspital Bern, AWS, N-Banker, China Pharmaceutical University. Added as `about.p5` across 4 locales. Decision rationale: a dedicated "Partners" card grid would fragment institutional identity and compete with the Research Areas / Experience sections for visual weight; a single collaborators sentence in About keeps the institutional surface high-signal low-footprint (8 names in one scan). Virtual Bodmer project partner mention (Université de Genève, Fondation Martin Bodmer, Archaeo-Scientific Laboratory) landed in the Scientific Collaborator timeline desc instead of About — it's a specific project artifact, not a long-term collaboration.
    - **Typo fix** (Linlin's directive #3 — user manual-edit review): `the the Swiss Association for Pattern Recognition` → `the Swiss Association for Pattern Recognition` (double-the at `index_en.html:1226`).
- **Services card restructure** (Linlin's directive #3):
    - **Reviewing card**: kept only `International Conference on Pattern Recognition 2024` per Linlin's instruction — Pattern Recognition Letters (PRL) and Expert Systems with Applications (ESWA) removed from the visible card (they were listed as "invited but not reviewed" in `extra_info_work.md`, not confirmed reviewing work). `services_cards.reviewing_i1` kept; `reviewing_i2` removed.
    - **Supervision card**: `supervision_i2` updated to `Topics: Computer Vision, Graph-based Learning, Smart Engineering, Deep Learning, LLMs, Agent Systems` — matches `extra_info_work.md` supervision topic list.
    - **Associations card (new)**: added 3-item block — `services_cards.association_title / association_i1 / association_i2 / association_i3`. Members of SAPR (2024–), Marie Curie Alumni Association China Chapter (2024), associate member of LITIS Lab (2022). Previously scattered across other cards / absent.
    - **4-locale parity**: 113 keys total match across `en/zh/fr/de`. Verified via `python3 scripts/check_i18n_parity.py` — 0 diff.
- **Timeline description i18n** (Linlin's directive #4):
    - Added `data-i18n-html` attributes to the 5 `<p class="timeline-desc">` tags inside the `#experience` section at `index_en.html:{842, 853, 864, 875, 886}`, wired to `exp.desc_advanced_postdoc`, `exp.desc_scientific_collab`, `exp.desc_research_fellow`, `exp.desc_postdoc`, `exp.desc_phd`. Previously the role titles were translated but the descriptions stayed hard-coded in English on zh/fr/de — a visible i18n gap for ~30% of the Experience section's text mass.
    - Added matching keys to all 4 locale files. EN copies kept verbatim from existing HTML; ZH / FR / DE translated preserving project names (SNSF, ICPR 2026, Virtual Bodmer, OCTOPUSSY) and domain terms (graph-kernels, pre-image problems).
    - Verified with live locale switch test via `setLanguage` button click in chrome-devtools — all 5 paragraphs swap text correctly on zh/fr/de and revert on en.
- **Crawlability + indexation cleanup** (Linlin's directive #1):
    - `robots.txt`: removed `/archive/` disallow (directory doesn't exist; was legacy clutter from the v6 round scaffolding).
    - `sitemap.xml`: removed `/blog/` URL entry per Linlin's "if useless, delete" decision — the `blog/` Jekyll subproject isn't deployed and indexing a 404 URL is net-negative. `blog/` directory stays in repo for history (Hux Blog boilerplate).
    - No impact on the 13-URL hreflang-expanded sitemap; still at depth 3.
- **Figure lightbox (click-to-enlarge)** (Linlin's directive #6):
    - `css/main.css` — appended ~100 LOC after the `@media (prefers-reduced-motion)` block:
        - `.has-zoom` hover rule scales inner figure (`transform: scale(1.04)`, 180 ms ease) as affordance.
        - `.img-zoom-btn` positioned absolute top-right inside each `.project-image` / `.pub-thumbnail`; 32×32 px circular overlay with magnifier glyph; opacity 0 → 0.9 on hover.
        - `.lightbox` full-viewport fixed modal, `backdrop-filter: blur(4px)`, dark overlay `rgba(0,0,0,0.85)`; `.lightbox.is-open` fades in over 200 ms.
        - `.lightbox-figure img` capped at `min(90vw, 90vh)` with object-fit contain so SVGs never overflow; `.lightbox-caption` in bottom-center reuses the source `alt` text.
        - `body.lightbox-open { overflow: hidden }` locks page scroll while modal is open.
        - Matches existing theme CSS-variable palette (`--bg-primary`, `--text-primary`) so `academic` / `industrial` / `fancy` themes inherit correctly without per-theme overrides.
    - `js/main.js` — appended IIFE `initImageLightbox()` after the existing DOMContentLoaded module (~70 LOC):
        - Targets `.project-image` and `.pub-thumbnail` containers; skips icon-only cards where no `<object data>` or `<img src>` source exists.
        - Prefers `<object type="image/svg+xml" data="…svg">` URL over the `<img>` PNG fallback — SVG scales crisply when enlarged; PNG would pixelate.
        - Injects a single `.img-zoom-btn` per eligible container (idempotent guard: skip if already attached).
        - `e.stopPropagation()` on the zoom-button click so clicking the magnifier doesn't also fire the wrapping `.project-card` anchor navigation; clicking the image body itself still navigates normally.
        - A11y: `role="dialog"`, `aria-modal="true"`, `aria-hidden` toggles on open/close, `aria-labelledby` pointing to `#lightbox-caption`. Focus moves to close button on open; restored to the original trigger button on close.
        - Key handlers: `ESC` closes; backdrop click (target === lightbox) closes; explicit close button closes. No keyboard trap — standard Tab/Shift-Tab continues through page.
        - Result: 4 `.project-image` + 3 `.pub-thumbnail` = 7 zoom buttons injected on the production page.
    - `index_en.html` — added the lightbox DOM block before `<script src="js/main.js">`: `#lightbox > .lightbox-close + .lightbox-figure > .lightbox-img + .lightbox-caption`. Single global instance reused for all triggers.
- **JSON validity + i18n parity checks**:
    - `jq . locales/en.json locales/zh.json locales/fr.json locales/de.json` → all 4 parse clean.
    - `python3 scripts/check_i18n_parity.py` → `all 113 keys present in en/zh/fr/de` (5 new `exp.desc_*` + 4 new `services_cards.association_*` + 1 new `about.p5` + `reviewing_i2` removed).
- **Visual verification** (relaxed scope per `CLAUDE.local.md`):
    - `ai-generated` theme (default): verified lightbox open / close / caption / focus trap via chrome-devtools snapshot. All 7 zoom buttons render; SVG figures scale crisp to 90vh; caption matches alt text.
    - `academic` / `industrial` / `fancy` themes: **still pending** — tracked as a visual-verification carry-over, see below.
- **PLAN.md sync**:
    - New Goal **`H1.M1.G6`** — Partners / collaborators surface. T1 `about.p5` collaborators paragraph (4-locale) → `[✓]`. T2 Virtual Bodmer project partner mention in scientific-collaborator timeline desc → `[✓]`.
    - New Goal **`H1.M3.G5`** — Figure lightbox (click-to-enlarge). T1 CSS + JS + a11y + 4-theme CSS variable parity → `[~]` (ai-generated verified; academic/industrial/fancy pending cross-theme verification).
    - Status rollups: `M1.1` stays `[~]` (G1-G5 done but G6.T2 done only via timeline text, not a dedicated card; keep goal open for content polish). `M1.3` stays `[ ]` (new G5 `[~]`, still has G4 performance polish pending).
- **Still pending from Linlin's directive**:
    - **Directive #7** (LinkedIn skills / tech page audit): awaiting hand-pasted exported skills data from Linlin — LinkedIn returns HTTP 999 to automated `WebFetch`, so the skills section can't be scraped. Will cross-check against `extra_info_work.md` once data arrives.
    - **Cross-theme lightbox verification**: academic / industrial / fancy snapshots not yet taken.

## V4 — Docs folder reorg + vibe audit integration

Goal: consolidate all project documentation under `docs/`, archive the unused Jekyll subproject, reverse UPDATES.md V-ordering so newest-first is enforced, and harvest the 2026-04-20 vibe audit into `PLAN.md` as structured Horizon / Milestone / Goal / Task items.

- **File moves (git mv — history preserved)**:
    - `PLAN.md` / `PLAN.zh.md` → `docs/PLAN.md` / `docs/PLAN.zh.md`.
    - `UPDATES.md` / `UPDATES.zh.md` → `docs/UPDATES.md` / `docs/UPDATES.zh.md`.
    - `setup/` (10 files: `README.md`, 4 guides × 2 languages, plus `form-backend-google-sheets.{md,zh.md}`, `analytics-clarity.{md,zh.md}`, `analytics-backup.{md,zh.md}`, `security-headers.{md,zh.md}`) → `docs/setup/`.
    - Legacy Jekyll minima project (`docs/404.html`, `docs/about.markdown`, `docs/_config.yml`, `docs/Gemfile`, `docs/Gemfile.lock`, `docs/index.markdown`, `docs/.gitignore`, `docs/_posts/`) → `docs/_archive-jekyll-minima/`. Kept for history, no longer built/deployed.
- **`docs/README.md` + `docs/README.zh.md` (new)**: index for the reorganised docs tree. Lists PLAN/UPDATES, `setup/` guides with matching PLAN IDs, `vibe/` audit notes, and the Jekyll archive. Explains why `CLAUDE.md` / `README.md` / `extra_info_work.md` stay at repo root.
- **Cross-link fixes**: updated path references in `CLAUDE.md`, `CLAUDE.zh.md`, `README.md`, `README.zh.md` — `PLAN.md` → `docs/PLAN.md`, `UPDATES.md` → `docs/UPDATES.md`, `setup/…` → `docs/setup/…`. Repository-layout tables now describe `docs/` as the documentation home and `blog/` on its own as the legacy Jekyll subproject.
- **UPDATES newest-on-top reversal (2026-04-20)**: reversed V1→V4 chronological order so V4 (static refactor) appears on top, V1 (v7 redesign deployment) at the bottom — matching the "highest V on top" convention already applied to today.
- **`CLAUDE.md` hard rule refinements (both EN + ZH)**:
    - UPDATES.md rule now specifies **newest day on top** + **highest V number on top within a day**.
    - UPDATES.md rule now mandates keeping its own `## Master TOC` in sync (new bullet per day, sub-bullet per V with a one-line hook) — previously UPDATES was exempt from the Master-TOC rule.
    - Master-TOC rule path glob updated: `root .md, setup/*.md, .claude/skills/*/SKILL.md` → `root .md, docs/**/*.md, .claude/skills/*/SKILL.md`.
- **Vibe-audit integration into `PLAN.md` (+ `.zh.md`)** — from `docs/vibe/网站深度分析报告_claude_code_2026.04.20.md`:
    - New Goal **`H1.M2.G4`** — Head hygiene (non-schema cleanup). T1 removes obsolete `<meta name="keywords">`.
    - New Goal **`H1.M3.G4`** — Performance polish (post-vibe-audit gaps). T1 Google Fonts trim (4→2 families), T2 `canvas-confetti` dynamic import, T3 `@media (prefers-reduced-motion)`, T4 Leaflet-vs-Google-Maps dedup, T5 `openChatbot()` native `alert()` → toast / `mailto:`. Rolls `M1.3` status `[✓]` → `[ ]`.
    - New Milestone **`H1.M4`** — Unique differentiators for recruiter memorability. G1 Live Citation Graph (D3 force-graph in publications), G2 Redox prediction interactive demo (SMILES → molecular graph → GNN message-passing visualization — per Linlin's correction; vibe-audit's "drug discovery GNN demo" recommendation was scoped to redox prediction specifically), G3 "/now" page, G4 default theme → `academic` (Linlin declined vibe-audit's "move theme/language switcher to footer" recommendation — position stays unchanged).
    - Most vibe-audit P0 items (UA→GA4, Person JSON-LD, robots/sitemap, a11y, OG tags) were already completed in 2026-04-20 V1/V2 + 2026-04-21 V2 — no new tasks needed for those.
- **Status rollups**: `M1.3` → `[ ]` (was `[✓]`, now has pending G4). `M1.4` added at `[ ]`. `M1.2` stays `[~]` (new G4 pending, G1/G2 done, G3 pending). `H1` stays `[~]`.
- **Master TOC sync**: added M1.2.G4, expanded M1.3 with G1-G4 sub-bullets (previously flat), added M1.4 with G1-G4 sub-bullets.

## V3 — Documentation overhaul (Master Plan + bilingual dual-file convention)

Goal: give every reader (visitor / maintainer / AI agent) an entry point sized for them, and keep the roadmap + changelog in sync. Rolls out the H/M/G/T hierarchy across all project docs. All new docs are bilingual (`NAME.md` + `NAME.zh.md`). Resolves `H4.M1.G1..G4` and `H4.M2.G1` in `PLAN.md`.

- **`PLAN.md` (new)** — Master roadmap with status legend, ID system (`H<n>.M<n>.G<n>.T<n>`, never re-numbered), hierarchy convention (Horizon → Milestone → Goal → Task), Master TOC, and 5 populated Horizons: H1 (job-hunt asset), H2 (ops & maintenance, all `[?]` items surfaced), H3 (content expansion), H4 (docs / AI infra), H5 (career outreach). Maintenance protocol at the bottom.
- **`PLAN.zh.md` (new)** — full Chinese mirror, preserving all H/M/G/T IDs in English, translating only prose.
- **`CLAUDE.md`** — added 4 new hard rules: mandatory `UPDATES.md` daily log (pre-existing from V1, re-stated); mandatory `PLAN.md` sync in same edit batch when status changes; mandatory Master TOC on every markdown doc; mandatory bilingual dual-file rule (`NAME.md` canonical + `NAME.zh.md` mirror, language banner at top, code/IDs English in both). New "Documentation conventions" section explaining Master TOC / PLAN.md / UPDATES.md / hierarchy + status markers / bilingual rule.
- **`CLAUDE.zh.md` (new)** — full Chinese mirror of CLAUDE.md.
- **`README.md`** — rewrote with reader-segmented sections: "For visitors (recruiters, collaborators)" (homepage / CV / contact), "For the maintainer (Linlin / future me)" (quick actions table, manual one-time setup checklist with 4 items mapped to PLAN.md IDs, repo layout, where each feature is documented, how-to recipes), "For AI agents (Claude Code, etc.)" (entry-point files, roadmap + changelog, project skills). Open Graph card section, themes, deploy notes preserved.
- **`README.zh.md` (new)** — full Chinese mirror.
- **`UPDATES.md`** — added language banner + this V3 entry.
- **`UPDATES.zh.md` (new)** — full Chinese mirror.
- **`setup/README.md`** — added language banner + Master TOC with cross-refs to PLAN.md (`H2.M1` roadmap) + per-file detailed guide links.
- **`setup/README.zh.md` (new)** — full Chinese mirror.
- **`setup/form-backend-google-sheets.md`** — added language banner + Master TOC + PLAN.md cross-ref (`H2.M1.G1`, `H2.M2.G4`).
- **`setup/form-backend-google-sheets.zh.md` (new)** — full Chinese mirror.
- **`setup/analytics-clarity.md`** — added language banner + Master TOC + PLAN.md cross-ref (`H2.M1.G2`, `H2.M1.G4`).
- **`setup/analytics-clarity.zh.md` (new)** — full Chinese mirror.
- **`setup/analytics-backup.md`** — added language banner + Master TOC + PLAN.md cross-ref (`H2.M1.G4`, `H2.M3.G1`, `H2.M3.G2`).
- **`setup/analytics-backup.zh.md` (new)** — full Chinese mirror.
- **`setup/security-headers.md`** — added language banner + Master TOC + PLAN.md cross-ref (`H1.M2` SEO schema deps, `H2.M1.G1/G2` Sheets / Clarity origins).
- **`setup/security-headers.zh.md` (new)** — full Chinese mirror.
- **Status rollups (both `PLAN.md` + `PLAN.zh.md`)**: `H4.M1.G2.T1..T3` → `[✓]`; `H4.M1.G3.T1..T3` → `[✓]`; `H4.M2.G1.T1..T3` → `[✓]`. Added new `H4.M1.G4` Goal (Bilingual docs) with T1/T2/T3 `[✓]` + T4 `[ ]` (future pre-commit parity check). `M4.1` → `[✓]` (all goals done); `M4.2` → `[ ]` (G1 done, G2 how-tos pending); H4 aggregate → `[ ]` (M4.2/M4.3 still have pending work).

## V2 — SEO audit follow-through (6 warnings + 5 opportunities)

- **Title + meta description (`index_en.html`)**: Rewrote title to ~77 chars including `Ph.D. | ML Research Scientist · Graph ML / GNN / LLM · Postdoc @ Bern`; expanded description to ~158 chars including "Open to roles in Switzerland / EU / remote".
- **hreflang → `?lang=` URL variants (`index_en.html:34-38` + `sitemap.xml` + `js/main.js`)**: Each locale now has a distinct crawlable entry point (`?lang=en|zh|fr|de`). `main.js` reads URL param first (> localStorage > navigator) and persists it back into localStorage so navigation stays sticky.
- **FAQPage JSON-LD (`index_en.html`)**: Added 5 Q&A entries covering research area, availability, graph ML definition, open-source libs, contact — optimizes for ChatGPT/Perplexity/Claude citation + Google SGE.
- **BreadcrumbList JSON-LD (`index_en.html`)**: 6 breadcrumbs (Home → About → Research → Projects → Publications → Contact) for richer SERP display.
- **`rel="noopener noreferrer"` pass (`index_en.html`)**: Added to 23 external `target="_blank"` anchors (project-card ×4, pub-link ×13, social-link-personal ×4, hero CV download, Google Scholar text link, Zhihu footer link). Closes window.opener leak and modest SEO benefit.
- **Publications pub-thumbnail `width`/`height` attrs (`index_en.html`)**: ICPR / JCC / ACPR `<img>` fallbacks now have explicit `180×140` for pre-CSS CLS protection.
- **Projects → SVG figure embeds (`index_en.html:916-970`)**: Replaced FontAwesome-on-gradient placeholder for Spatio-Temporal GNN + RedoxPrediction cards with `<object type="image/svg+xml">` (PNG fallback). Added two new project cards — **GraphInk** (handwriting recognition, SNSF 2024-, HES-SO + TU Dortmund) and **Graph Matching Algorithms** (SNSF 2023-2024, PRG Bern) — each embedding its matching research figure. All 4 SVG pairs now live in both project AND publication cards per the one-to-many mapping from Task #48.
- **Welcome popup heading (`index_en.html:438`)**: Changed `<h2>Welcome</h2>` → `<p class="welcome-heading" role="heading" aria-level="2">Welcome</p>` so the sole page H2-before-H1 (in DOM order, inside modal) no longer leaks into Googlebot's heading-hierarchy analysis. CSS updated to style both selectors.
- **AVIF hero photo (`images/photo.avif` new + `index_en.html:556`)**: Generated 28 KB AVIF via `ffmpeg libaom-av1` (vs 59 KB WebP, 145 KB JPEG). `<picture>` now has AVIF → WebP → JPEG source order for best-case LCP on modern browsers.
- **Sitemap depth (`sitemap.xml`)**: Expanded from 3 → 13 URLs. Added 4 `?lang=` variants, `/blog/`, and all 4 research figure SVGs. Declared hreflang alternates via `xhtml:link` on the canonical homepage entry.
- **CSS welcome-heading rule (`css/main.css:956`)**: Mirrors `.postcard-header h2` styles onto `.postcard-header .welcome-heading` so the `<p>` swap is pixel-identical. Negated `.postcard-header p:not(.welcome-heading)` to keep subtitle styling intact.

## V1 — Content audit, figures, update log

- **CLAUDE.md**: Added new mandatory hard rule — every change must update `UPDATES.md`.
- **UPDATES.md** (new): Created the development log with backfill of 2026-04-20 work.
- **Publications (`index_en.html` + `data/citations.json` + JSON-LD)**: Replaced 3 hallucinated entries (WL-Kernel/PR 2021, Pre-image/ICML 2020, GED Review/TCBB 2019) with the real CV publications [J24, C23, J23, J22b, J22a, J21, W21b, W21a, P16] + ICPR 2026 accepted paper. Fixed wrong author lists for [J24] and [C23].
- **Projects (`index_en.html`)**: Added Graph Matching Algorithms (2023-2024 SNSF), GraphInk Handwriting (2024-, SNSF), LIULIAN platform (key personal infra), PLANALYSER (2024-2025 Innosuisse), Local Confidential Translator (personal MVP). Refreshed copy of N-Banker, Spatio-Temporal GNN, OCTOPUSSY, Virtual Bodmer to match `extra_info_work.md`.
- **Figures (`res/figures/`)**: Inserted four SVG-with-PNG-fallback figure pairs into matching project + publication cards using `<object type="image/svg+xml">` (so search engines can index SVG XML content for SEO). Mappings: `2023_acpr_gecl` → C23 + Graph Matching project; `2025_graphink` → GraphInk project; `2026_icpr_swissriver` → Spatio-Temporal GNN project + ICPR 2026 pub; `jcc2023_redox` → J24 pub + RedoxPrediction project.
- **CSP (`index_en.html`)**: Relaxed `object-src 'none'` → `object-src 'self'` to allow inline SVG embedding from same origin.
- **News (`index_en.html`)**: Added 2025 / 2024 entries reflecting GraphInk + LIULIAN + N-Banker chatbot demo at InnoEx 2026 HK.
- **Skills (`index_en.html`)**: Added agent-skills (`python-backend-creator`, `project-adaptor`) and vibe-coding tooling (Claude Code, Codex, etc.) tags.
- **Stats (`index_en.html`)**: Updated publication count from 9 → 10 to reflect ICPR 2026 + corrected pubs.
- **i18n (`locales/{en,zh,fr,de}.json`)**: No new translation keys required; HTML changes use existing keys + raw English/Chinese for technical project names.
- **CSS (`css/main.css`)**: Added `.project-image object`, `.pub-thumbnail object` rules so embedded SVG fills its container with `object-fit: cover`.

# 2026-04-20

## V4 — Static refactor

- Extracted CSS (~2.7k lines) → `css/main.css` and JS (~850 lines) → `js/main.js`.
- `index_en.html` shrunk from 4852 → 1289 lines.
- Welcome postcard fully i18n'd; full-site i18n audit completed; `zh` switched to the unified main site.

## V3 — Tooling

- `.githooks/pre-commit` runs `scripts/check_i18n_parity.py` on staged `locales/*.json`.
- `.claude/settings.json` PostToolUse hook validates JSON after edits.
- Project skills added: `/preview`, `/verify-visual`, `/new-round`, `/deploy-round`, `/i18n-sync`.
- Consolidated deployment README under `setup/`.

## V2 — Site ops batch (forms, analytics, CSP, mobile)

- Welcome postcard form → Google Sheets backend (Apps Script + GH-Actions cron mirror).
- Microsoft Clarity injected without cookie-consent flow.
- CSP / Referrer-Policy / X-Content-Type meta hardening.
- Mobile navbar hamburger.
- Postcard welcome i18n keys synced across en/zh/fr/de.

## V1 — v7 redesign deployment + P0 SEO/a11y overhaul

- Deployed `index_en_v7_round3.html` to `index_en.html` — full redesign: new hero, OG card, favicon, locales, theme switcher (ai-generated/academic/industrial/fancy).
- Fixed canonical redirect, deduped sitemap, added `WebSite` JSON-LD schema, preloaded Font Awesome webfonts.
- Fixed Lighthouse label-mismatch + mobile touch-target a11y warnings.

# 2026-04-02

- Manually refreshed `data/citations.json` with current Google Scholar metrics (`total_citations: 130`, `h_index: 7`, `i10_index: 5`).

# 2024-01-17

- `f64a27a` — Updated CV PDFs (`res/cv/CV_Linlin_Jia_{en,zh}.pdf`).

# 2023-12-13

- `c9b8cd0` — Heavy CV refresh.

# 2023-10-24

- `5329c74` — Added a paper + CV update.

# 2023-09-27

- `3383a4d` — Added new papers + CV update.
