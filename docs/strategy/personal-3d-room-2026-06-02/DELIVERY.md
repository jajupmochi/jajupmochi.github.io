# DELIVERY — Personal-space 3D room

**What got built.** `personal.html` — a standalone, interactive three.js "cozy study /
living-room" for the site's Personal section. Orbit it (drag / scroll), and click six
skeuomorphic hotspots that each open a parchment info panel: **My desk** → Apps/Projects,
**Bookshelf** → Publications, **Photos** → an album lightbox, **Hiking**, **Dancing**,
**Travel**. Built entirely from three.js primitives in the site's parchment palette; the
only runtime dependency is three.js from a CDN (no model downloads → robust, fast,
China-friendly).

**How to view.** Click **Personal** in the homepage navbar, or open
`https://jajupmochi.github.io/personal.html`. Local: `python3 -m http.server 8000` →
`http://localhost:8000/personal.html`.

**Wired in.** Homepage navbar **Personal** → `personal.html` on both `index_en.html` and
`index_en_clear.html` (replaced the coming-soon toast).

**Docs.** `00-research.md` (resources + the primitives-over-models decision), `00-plan.md`
(elements → skeuomorphic form → content + the 10-round lens plan), `round-notes.md` (what
each of the 10 rounds did), screenshots `round-5/7/8.png`.

**Accessibility / resilience.** Damped, clamped orbit; raycast hover labels; a keyboard /
screen-reader **Explore** menu mirroring every hotspot; `prefers-reduced-motion`; pause
when the tab is hidden; loading state; a no-WebGL fallback; Esc closes overlays;
pixelratio capped. **0 console errors** at 1440×980.

**Known gaps (personalization).**
- Photos are canvas-painted placeholders → drop in real images.
- Hobby blurbs are intentionally generic → make them specifically yours.
- English only for now (panels could be localized later).
- Mobile works via touch but is best on desktop; a static fallback for low-power devices
  is a future polish.

**Next.** Swap real photos + personalize the copy; optional: add a second room / more
hobbies, localize the panels, a mobile-simplified scene.
