# Asset Sources — Open / CC0 / CC-BY 资产库清单

> **Purpose:** Single canonical reference of where to pull assets for the grimoire (and any future) design work.
> **Rule (D-X §20):** No AI image generation. Use these libraries first, hand-coded SVG second, photos only as backgrounds/textures.
> **Date:** 2026-04-27 · curated for Linlin Jia personal site
> **Tell the design plugin:** point any design-related skill (impeccable / huashu-design / frontend-design / etc.) at this file as the asset-source-of-truth.

---

## Master TOC

- [How to use this file](#how-to-use-this-file)
- [License decoder](#license-decoder)
- [§A · Illustrations (人物 / 场景 / 手绘)](#a--illustrations-人物--场景--手绘)
- [§B · SVG icon libraries (UI / 通用)](#b--svg-icon-libraries-ui--通用)
- [§C · Fantasy / 魔法 / 游戏图标 (核心 — 我们最常用)](#c--fantasy--魔法--游戏图标-核心--我们最常用)
- [§D · Textures (羊皮纸 / 纸 / 布 / 木)](#d--textures-羊皮纸--纸--布--木)
- [§E · Game art assets (props / sprites / tiles)](#e--game-art-assets-props--sprites--tiles)
- [§F · Chinese style assets (水墨 / 国画 / 朱砂)](#f--chinese-style-assets-水墨--国画--朱砂)
- [§G · 3D / Lottie / Rive (motion 资产)](#g--3d--lottie--rive-motion-资产)
- [§H · Photos (only when essential)](#h--photos-only-when-essential)
- [§I · Tools (creation, conversion, optimization)](#i--tools-creation-conversion-optimization)
- [§J · 我们项目本地资产库 (现状)](#j--我们项目本地资产库-现状)
- [§K · 用法手册 (机器可读)](#k--用法手册-机器可读)
- [§L · Motion & Sound — 动画 / 音效 (新增 2026-04-27)](#l--motion--sound--动画--音效-新增-2026-04-27)
    - [§L.1 Lottie 动画素材库](#l1-lottie-动画素材库)
    - [§L.2 Rive 互动动画素材](#l2-rive-互动动画素材)
    - [§L.3 CSS 动画预设库 (paste-and-go)](#l3-css-动画预设库-paste-and-go)
    - [§L.4 JavaScript 动画引擎](#l4-javascript-动画引擎)
    - [§L.5 Stock 视频背景](#l5-stock-视频背景)
    - [§L.6 SVG spinner / loader](#l6-svg-spinner--loader)
    - [§L.7 Audio / 音效 / 配乐](#l7-audio--音效--配乐)
    - [§L.8 本项目动效用例 (mapping)](#l8-本项目动效用例-mapping)

---

## How to use this file

1. **Look up by need** (e.g. "I need a magical book icon" → §C Game-Icons.net)
2. **Check license** before download (CC0 = anything, CC-BY = attribute, CC-BY-SA = attribute + share-alike, etc.)
3. **Download to `res/grimoire/<category>/<asset>.{svg,png,webp}`** in this repo (NOT inline base64 — keeps git diff sane)
4. **Cite source** in the asset filename or a sibling `LICENSE.md` in the folder
5. **Optimize** SVG with SVGO or Inkscape "Save as Optimized SVG" before commit
6. **Reference** in code via `<img>` / `background-image: url("res/grimoire/...")` / inline SVG

---

## License decoder

| License | What you can do | Attribution required? |
|---|---|---|
| **CC0** / Public Domain / Unlicense | Anything — commercial, modify, redistribute | No |
| **CC-BY** | Anything | Yes — credit author + license + link to original |
| **CC-BY-SA** | Anything | Yes — credit + share derivatives under same license |
| **CC-BY-NC** | NON-commercial only | ⚠️ Avoid for portfolio sites with employer interest |
| **MIT / Apache 2.0 / BSD** | Anything | Usually copyright notice in a NOTICE file |
| **GPL** | If you modify and redistribute, your code is GPL too | ⚠️ Tricky for proprietary work |

Default our project to **CC0 / CC-BY / MIT only**. Avoid CC-BY-NC and GPL assets.

---

## §A · Illustrations (人物 / 场景 / 手绘)

For: hero apprentice character, room scenes, portrait avatars, decorative figures.

| Library | URL | License | Style | Best for |
|---|---|---|---|---|
| **unDraw** | https://undraw.co/ | MIT (effectively CC0) | Flat, recolorable single-color | Generic hero / about scenes |
| **Storyset** by Freepik | https://storyset.com/ | Free with attribution OR CC0 if attribution-not-needed | Customizable, animated, multi-style | Animated illustrations |
| **Open Peeps** by Pablo Stanley | https://www.openpeeps.com/ | CC0 | Sketchy hand-drawn people, mix-and-match | Diverse character avatars |
| **Open Doodles** by Pablo Stanley | https://www.opendoodles.com/ | CC0 | Sketchy doodle figures | Casual / playful sketches |
| **Humaaans** by Pablo Stanley | https://www.humaaans.com/ | CC0 | Mix-and-match flat people | Diverse flat-style figures |
| **Highlights** | https://highlights.pixelarity.com/ | CC0 | Hand-drawn sketch elements (100+) | Decorative spot illustrations |
| **ManyPixels** | https://www.manypixels.co/gallery | CC0 | Isometric + flat illustrations | Isometric scenes |
| **Lukasz Adam illustrations** | https://lukaszadam.com/illustrations | Free for personal & commercial | Hand-drawn warmth, single-color | Cozy/warm scenes |
| **Absurd Design** | https://absurd.design/ | Free | Surrealist hand-drawn | Creative flair |
| **DrawKit** | https://www.drawkit.com/free-illustrations | Free with attribution | Vector illustration packs | Branded scenes |
| **Shape** | https://shape.so/ | Free, customizable | React / Lottie ready | Interactive web |

Recommended for our grimoire: **Open Peeps + Open Doodles + Highlights** for sketchy hand-drawn character + scene elements.

---

## §B · SVG icon libraries (UI / 通用)

For: navigation, buttons, status indicators, social icons.

| Library | URL | License | Count | Style | Best for |
|---|---|---|---|---|---|
| **Heroicons** | https://heroicons.com/ | MIT | 450+ | 2 styles (outline / solid) | Tailwind-friendly UI |
| **Lucide** | https://lucide.dev/ | ISC | 1500+ | Outline, consistent stroke | Clean modern UI |
| **Phosphor** | https://phosphoricons.com/ | MIT | 9000+ | 6 weights (thin → fill) | Versatile across themes |
| **Tabler Icons** | https://tabler.io/icons | MIT | 5800+ | Outline, 24×24 grid | Dashboard/admin UI |
| **Iconoir** | https://iconoir.com/ | MIT | 1600+ | Outline | Designer-friendly |
| **Bootstrap Icons** | https://icons.getbootstrap.com/ | MIT | 2000+ | Outline + solid | Bootstrap projects |
| **Feather Icons** | https://feathericons.com/ | MIT | 286 | Minimal outline | Minimal projects |
| **IconPark** by ByteDance | https://iconpark.oceanengine.com/official | Apache 2.0 | 2400+ | 4 themes | Multi-style options |
| **Untitled UI Icons** | https://www.untitledui.com/free-icons | Free (193 free icons) | 193 free | Outline | Premium feel |
| **Hugeicons** | https://hugeicons.com/ | Free 4000 / Pro 46k | 4000+ free | 9 styles | Maximalist breadth |
| **SVG Repo** (aggregator) | https://www.svgrepo.com/ | Mixed (filter by license) | 500k+ | Mixed | Catch-all search |
| **IcoMoon** | https://icomoon.io/ | Mixed | 1000s | Mixed (filter by license) | Custom font generation |

Recommended for our grimoire: **Phosphor (`thin` weight)** for default UI, **Game-Icons.net** (§C below) for fantasy-specific.

---

## §C · Fantasy / 魔法 / 游戏图标 (核心 — 我们最常用)

For: magic wands, scrolls, potions, owls, books, candles, swords, etc.

| Library | URL | License | Count | Best for |
|---|---|---|---|---|
| **🌟 Game-Icons.net** | https://game-icons.net/ | CC-BY 3.0 | 4180+ | **Top pick.** Wands, books, owls, scrolls, alchemy — perfectly grimoire. Author Lorc maintains thousands of fantasy/medieval icons. |
| **Game-Icons medieval-fantasy tag** | https://game-icons.net/tags/medieval-fantasy.html | CC-BY 3.0 | 29 themed | Tolkien/Scandinavian inspired |
| **Flaticon Fantasy** | https://www.flaticon.com/free-icons/fantasy | Free with attribution | 24,838 | Broader stock |
| **SVG Silh fantasy** | https://svgsilh.com/tag/fantasy-1.html | CC0 | 1100 | Public domain silhouettes |
| **Iconscout fantasy** | https://iconscout.com/icons/fantasy | Mixed (free + premium) | 1000s | Worth searching |
| **Icons8 fantasy-game** | https://icons8.com/icons/set/fantasy-game | Free with attribution | hundreds | Game-themed |
| **Freepik fantasy-game** | https://www.freepik.com/icons/fantasy-game | Free with attribution | 1043 | More options |

**Concrete Game-Icons.net IDs we'll likely use** (browse https://game-icons.net/ to download SVG):

| Need | Search term on Game-Icons | Author |
|---|---|---|
| Open book / grimoire | `open-book`, `book-cover`, `bookmarklet` | Lorc / Delapouite |
| Quill / feather pen | `quill-ink`, `feather` | Lorc |
| Wax seal | `wax-seal`, `stamper` | Lorc |
| Candle | `candle-flame`, `candle-holder` | Lorc / Delapouite |
| Owl | `owl` | Lorc / Delapouite |
| Magic wand | `magic-wand` | Lorc |
| Crystal ball | `crystal-ball`, `crystal-shine` | Lorc |
| Glass jar / potion | `potion-of-madness`, `bubbling-flask`, `corked-tube` | Lorc |
| Scroll | `scroll-quill`, `scroll-unfurled` | Lorc |
| Star / spell | `sparkles`, `magic-trick` | Lorc |
| Cat (sleeping) | `cat` | Delapouite |
| Bookshelf | `bookshelf`, `book-stack` | Lorc / Delapouite |
| Wax candle | `lit-candelabra`, `candle-light` | Lorc |
| Howl / shout (Howler) | `screaming` | Lorc |
| Wizard / apprentice | `wizard-face`, `mage-robe` | Lorc / Delapouite |

**License usage**: CC-BY 3.0 means we credit `Game-Icons.net` + the specific author + link to https://game-icons.net/ in a footer or LICENSE file. Compliance is easy.

---

## §D · Textures (羊皮纸 / 纸 / 布 / 木)

For: page background, scroll surface, wood desk, velvet wall, leather book covers.

| Library | URL | License | Best for |
|---|---|---|---|
| **CC0 Textures (cc0-textures.com)** | https://cc0-textures.com/c/paper | CC0 | PBR-ready paper / wood / fabric textures |
| **My Free Textures** | https://www.myfreetextures.com/45-free-old-paper-textures-and-parchment-paper-backgrounds/ | Free (commercial OK) | 45 parchment / aged paper textures |
| **Paper Texture.io** | https://papertexture.io/downloads/parchment | Free (personal + commercial) | Parchment, deckled edges |
| **Subtle Patterns** by Toptal | https://www.toptal.com/designers/subtlepatterns/ | CC-BY-SA 3.0 | Tileable subtle backgrounds |
| **Hero Patterns** | https://heropatterns.com/ | CC-BY 4.0 | Inline SVG repeating patterns |
| **Lost & Taken** | https://lostandtaken.com/textures/ | Free (commercial OK with attribution) | High-res aged paper / vintage textures |
| **Texture Lab** | https://texturelab.io/ | Free | Procedural textures, downloadable |
| **Poly Haven Textures** | https://polyhaven.com/textures | CC0 | High-quality PBR textures |
| **textures.com** | https://www.textures.com/ | Free (account, limited) | Vast library, requires login |
| **OpenGameArt textures tag** | https://opengameart.org/art-search?keys=texture | Mixed (filter CC0) | Game-style textures |

Recommended for our grimoire:
- **Page bg**: Lost & Taken parchment + CSS tile, OR Hero Patterns inline SVG (no http request)
- **Wood desk**: CC0 Textures wood
- **Velvet wall (awards)**: Subtle Patterns dark velvet
- **Leather book covers**: CC0 Textures leather PBR

---

## §E · Game art assets (props / sprites / tiles)

For: complete scenes — bookshelf with books, alchemy table, owl on perch.

| Library | URL | License | Best for |
|---|---|---|---|
| **🌟 OpenGameArt.org** | https://opengameart.org/ | Mixed (filter CC0 / CC-BY) | Top hub. 2D + 3D + textures + sounds. |
| **OGA fantasy-magic-set** by Melissa Krautheim | https://opengameart.org/content/fantasy-magic-set | CC0 | Magic items pack |
| **OGA fantasy-parchment-set** | https://opengameart.org/content/fantasy-parchment-set | CC0 | Pre-made parchment scrolls |
| **🌟 Kenney.nl** | https://kenney.nl/ | CC0 | 2D + 3D game assets, thousands. Includes RPG tiles. |
| **itch.io free assets** | https://itch.io/game-assets/free | Mixed (filter CC0) | Indie game assets |
| **Quaternius** | https://quaternius.com/ | CC0 | 3D models (low-poly fantasy) |
| **Pixel Art (CC0/OGA-BY)** | https://opengameart.org/content/cc0oga-by-pixel-art | CC0 / OGA-BY | Pixel-art fantasy assets |
| **Roman Arts** (PixelLand) | https://romanmakesgames.itch.io/ | Free / paid | RPG environments |

Recommended workflow for our grimoire scene composition:
1. Browse OpenGameArt with tag `fantasy` + filter CC0
2. Download a sprite pack (bookshelf + books + candle + jars)
3. Place in `res/grimoire/scene-props/`
4. Cite in sibling `LICENSE.md`

---

## §F · Chinese style assets (水墨 / 国画 / 朱砂)

For: career hallway 画壁, decorative ink-wash, brush strokes, seal stamps.

| Library | URL | License | Best for |
|---|---|---|---|
| **Vecteezy Chinese Ink Painting** | https://www.vecteezy.com/free-vector/chinese-ink-painting | Free with attribution | 1201+ ink-wash SVGs |
| **All Free Download Chinese ink** | https://all-free-download.com/free-vector/chinese-ink-painting.html | Free | AI/EPS/SVG/CDR ink art |
| **Freepik Chinese ink-painting** | https://www.freepik.com/vectors/chinese-ink-painting | Free with attribution | Vectors |
| **Vecteezy Chinese painting** | https://www.vecteezy.com/free-vector/chinese-painting | Free with attribution | 5090+ vectors |
| **Wikimedia Commons CN art** | https://commons.wikimedia.org/wiki/Category:Chinese_paintings | Public Domain (mostly) | High-res classical paintings (清明上河图 etc. for hallway scenes) |
| **The Met Open Access** | https://www.metmuseum.org/art/the-collection?showOnly=openaccess&material=Paintings&geolocation=China | Public Domain | High-quality PD scans of Chinese paintings |
| **Smithsonian Open Access CN** | https://www.si.edu/openaccess | CC0 | Asian art collection scans |
| **Adobe Color Chinese palettes** | https://color.adobe.com/search?q=chinese | n/a (free palettes) | Color inspiration |

Recommended:
- **Wikimedia / The Met / Smithsonian** for high-res classical painting scans (e.g. crop a section of 千里江山图 for the hallway 画壁 backdrop) — public domain, no attribution required
- **Vecteezy** for SVG brush strokes / ink splashes / 印章 stamps to layer on top
- For 印章: we already have our own (D5.N Howler L stamp); reuse pattern

---

## §G · 3D / Lottie / Rive (motion 资产)

> 历史分区，仅作 **入门索引**。深度内容请直接看 **§L Motion & Sound**（更新于 2026-04-27，覆盖 Lottie / Rive / CSS / JS / 视频 / SVG / 音效全栈）。

For: 小林 robot animation, 入场 choreography, ambient particles.

| Library | URL | License | Best for |
|---|---|---|---|
| **LottieFiles free** | https://lottiefiles.com/free-animations | Mixed (filter free) | Animated SVG/Lottie JSON |
| **IconScout free Lottie** | https://iconscout.com/lottie-animations/free | Free with attribution | More Lotties |
| **Rive Community** | https://rive.app/community/ | Mixed | Interactive Rive files |
| **Sketchfab CC0 / CC-BY** | https://sketchfab.com/3d-models?features=downloadable&licenses=322a749bcfa841b29dff1e8a1bb74b0b | CC0 | Free 3D models |
| **Poly Haven HDRIs / Models** | https://polyhaven.com/ | CC0 | Models + HDR lighting + textures |
| **Open3D Lab** | https://open3dlab.com/ | Free | 3D model archives |
| **Mixamo** (Adobe) | https://www.mixamo.com/ | Free with Adobe account | Rigged characters + animations |

Recommended:
- **LottieFiles** for the 小林 robot Idle animation (search "owl mechanical" or "clockwork")
- **Sketchfab CC0** if we ever want a real 3D Howler envelope (probably overkill — keep SVG)
- **Rive Community** for interactive elements

---

## §H · Photos (only when essential)

For: profile photo (already have), background hero photo (avoid — use our parchment).

| Library | URL | License | Best for |
|---|---|---|---|
| **Unsplash** | https://unsplash.com/ | Unsplash License (≈ CC0) | Photographic backgrounds |
| **Pexels** | https://www.pexels.com/ | Pexels License (≈ CC0) | Same |
| **Pixabay** | https://pixabay.com/ | Pixabay License (≈ CC0) | Same |
| **Openverse** (Wordpress) | https://openverse.org/ | Mixed (filter CC0) | Aggregator |
| **rawpixel** | https://www.rawpixel.com/ | Mixed (lots of CC0) | Vintage / classical scans |
| **The Noun Project** | https://thenounproject.com/ | Mixed (CC-BY common) | Pictographs |

**Default position**: avoid photos for the grimoire. Photos break the hand-drawn world. Only use for:
- Profile photo of Linlin (already in `res/`)
- OG card thumbnails (already exist)
- Last resort backgrounds when SVG can't capture

---

## §I · Tools (creation, conversion, optimization)

For: editing SVGs we download, optimizing file size, batch operations.

| Tool | URL | Purpose |
|---|---|---|
| **Inkscape** | https://inkscape.org/ | Free open-source vector editor — primary tool for editing SVGs |
| **SVGOMG** | https://jakearchibald.github.io/svgomg/ | Web GUI for SVGO (compress + clean SVG) |
| **SVGO CLI** | https://github.com/svg/svgo | `npx svgo file.svg --multipass` — bulk optimize |
| **Boxy SVG** | https://boxy-svg.com/ | Lightweight web-based SVG editor |
| **Figma** (free tier) | https://www.figma.com/ | Quick mockups, has SVG export |
| **squoosh.app** | https://squoosh.app/ | WebP/AVIF conversion, image compression |
| **ImageMagick** | https://imagemagick.org/ | CLI batch ops (already used for parchment crops) |
| **rsvg-convert** | https://gitlab.gnome.org/GNOME/librsvg | CLI SVG → PNG rasterization |
| **Vectorizer.io** | https://www.vectorizer.io/ | Raster → vector conversion |

---

## §J · 我们项目本地资产库 (现状)

```
res/grimoire/
├── refs/                              # 用户提供的 ChatGPT 设计参考
│   ├── ref-horizontal-world.png
│   ├── ref-vertical-bento.png
│   └── ref-vertical-rooms.png
├── apprentice-final.png               # 学徒人物 (从 ref 裁切)
├── cap-tl.png  cap-tr.png             # 卷轴铜帽装饰
├── parchment-bg.png                   # 羊皮纸 (废弃，CSS 已替代)
├── p-clean-final.png  p-strip*.png    # 各种裁切的羊皮纸尝试
└── textures/                          # 早期 ImageMagick 实验产物
    ├── parchment-tile*.png
    ├── apprentice*.png
    └── ...
```

**Currently in use** (live in `index_grimoire.html`):
- `res/grimoire/apprentice-final.png` — 学徒角色
- `res/grimoire/cap-tl.png` + `cap-tr.png` — 顶部铜帽

**To-do** (按需从上面 §A-§G 库里下载补充):
- `res/grimoire/icons/` — 来自 Game-Icons.net 的核心图标 (book / quill / wax-seal / owl / candle / wand)
- `res/grimoire/textures/` — 来自 CC0 Textures 或 Lost & Taken 的真羊皮纸 + 木材 + 天鹅绒
- `res/grimoire/illustrations/` — 来自 Open Peeps / Open Doodles 的备用人物 (如不再用学徒裁切)
- `res/grimoire/chinese-art/` — Wikimedia 上的清明上河图 / 千里江山图 局部，用于画壁走廊背景
- `res/grimoire/animations/` — LottieFiles 的小林 idle 动画 JSON

---

## §K · 用法手册 (机器可读)

为方便 design 插件 / future agent 自动选库，按"需求 → 推荐源"机器可读映射：

```yaml
# asset-routing.yaml — 需求到源的优先级映射
need_to_source:
  hand_drawn_character:
    preferred: ["openpeeps.com", "opendoodles.com"]
    fallback: ["humaaans.com", "drawkit.com"]

  fantasy_icon:
    preferred: ["game-icons.net"]  # CC-BY 3.0
    fallback: ["svgsilh.com", "flaticon.com (free with attribution)"]

  generic_ui_icon:
    preferred: ["phosphoricons.com", "lucide.dev"]  # MIT
    fallback: ["heroicons.com", "tabler.io/icons"]

  parchment_texture:
    preferred: ["cc0-textures.com/c/paper", "myfreetextures.com"]
    fallback: ["heropatterns.com", "css-generated"]

  game_props_pack:
    preferred: ["opengameart.org (CC0 filter)", "kenney.nl"]
    fallback: ["itch.io free assets"]

  chinese_ink_painting:
    preferred: ["commons.wikimedia.org (Chinese paintings cat)", "metmuseum.org open access"]
    fallback: ["vecteezy.com (chinese ink painting)"]

  motion_animation:
    preferred: ["lottiefiles.com free", "rive.app community"]
    fallback: ["css-keyframes-handcoded"]
    detailed_in: "§L Motion & Sound"

  css_animation_preset:
    preferred: ["animista.net", "animate.style"]   # CSS-only, paste-and-go
    fallback: ["uiverse.io", "hover.css"]
    detailed_in: "§L.3"

  js_animation_engine:
    preferred: ["motion.dev"]                       # MIT, modern
    fallback: ["gsap.com (free as of 2024)", "animejs.com"]
    detailed_in: "§L.4"

  video_background:
    preferred: ["mixkit.co", "coverr.co", "pexels.com/videos"]
    avoid: ["youtube embeds (privacy + perf)"]
    detailed_in: "§L.5"

  svg_loader_spinner:
    preferred: ["uiverse.io/loaders", "github.com/n3r4zzurr0/svg-spinners"]
    fallback: ["loading.io (CC0)"]
    detailed_in: "§L.6"

  ui_sound_effect:
    preferred: ["freesound.org (filter CC0)", "pixabay.com/sound-effects (cc0)", "mixkit.co/free-sound-effects"]
    fallback: ["kenney.nl audio packs"]
    detailed_in: "§L.7"

  photo_background:
    avoid: true  # default for grimoire — keep hand-drawn world
    if_essential: ["unsplash.com", "pexels.com"]

# Hard rules
rules:
  - never_use_AI_image_generation: true   # D-X §20
  - prefer_CC0_over_CC-BY: true           # easier compliance
  - avoid_CC-BY-NC: true                  # blocks commercial / employer use
  - avoid_GPL_assets: true                # license contagion risk
  - cite_in_LICENSE.md: true              # next to each downloaded asset folder
  - optimize_SVG_with_SVGO: true          # before commit
  - download_locally: true                # never hotlink (perf + reliability)
```

设计插件读取本文件后，遇到 "我需要一个魔法书图标" → 自动去 `game-icons.net` 找 `open-book` 系列；遇到 "我需要羊皮纸" → 去 CC0 Textures 下载 `paper-aged-001.jpg`；遇到 "我需要小林机器人 idle" → 去 LottieFiles 搜 `owl mechanical idle`。

---

## §L · Motion & Sound — 动画 / 音效 (新增 2026-04-27)

> **新增分区**：覆盖**所有动画相关素材** — Lottie / Rive / CSS preset / JS engine / 视频 / SVG loader / 音效。
> **核心原则同上**：CC0 / MIT / CC-BY 优先；本地下载，不 hotlink；署名义务在 `LICENSE.md`。
> **本项目用例索引**：见 §L.8 mapping。

---

### §L.1 Lottie 动画素材库

Lottie = 矢量动画 JSON（来自 After Effects 通过 Bodymovin 导出），渲染为可缩放、可着色、轻量的 SVG/CSS/Canvas 动画。**单个 .json ~5–50KB，远比视频小**。

| 库 | URL | License | 数量 | 用途 / 风格 | 商用 |
|---|---|---|---|---|---|
| 🌟 **LottieFiles** | https://lottiefiles.com/free-animations | 多数 Free with attribution / 部分 Premium | 100,000+ | 综合最大库；**入门首选** | ✅（免费部分需检查 per-asset） |
| **LottieFlow** by Webflow | https://lottieflow.com/ | Free | 数百 | 网页定制（Webflow 社区） | ✅ |
| **Flicker.design** | https://flicker.design/ | Freebies + Premium | 数百 | 高质量、design-forward 精品 | ✅（免费部分需 attribution） |
| **IconScout Lottie** | https://iconscout.com/lottie-animations/free | Free with attribution | 数千 | 商业项目可用，需 attribution | ⚠️ 需署名 |
| **Icons8 Animated** | https://icons8.com/animated-icons | Linkware（链接署名） | 数千 | 风格统一的 icon-style 动画 | ✅（需 visible link） |
| **Creattie** (前 Iconscout) | https://creattie.com/ | Mixed | 大量 | 综合资源 | ⚠️ |
| **MiroMiro** | https://miromiro.app/ | Free | 精选 | 设计师精选 | ✅ |
| **Lottie 官方 Community** | https://lottie.github.io/ | 多数 MIT | — | 官方仓库，开发者友好 | ✅ |

**推荐对应 §L.8**：小林 robot idle 用 LottieFiles 搜 "owl mechanical idle / clockwork bird"。

**集成方式**（HTML/JS）：
```html
<script src="https://unpkg.com/@lottiefiles/dotlottie-wc@0.6.0/dist/dotlottie-wc.js" type="module"></script>
<dotlottie-wc src="res/grimoire/lottie/owl-idle.lottie" autoplay loop style="width: 120px;"></dotlottie-wc>
```
本站可下载 `.lottie` 或 `.json`，放到 `res/grimoire/lottie/`。

---

### §L.2 Rive 互动动画素材

Rive = 比 Lottie 更先进的互动动画格式（**state machine + interaction listener**），可实现"鼠标进/出/点击"驱动的多状态动画。**适合做小林 robot 这种有人格的角色。**

| 库 | URL | License | 用途 |
|---|---|---|---|
| 🌟 **Rive Community** | https://rive.app/community/files/ | per-file（多数 Public Use / CC-BY） | 主源；标"Public Use"即可商用 |
| **Rive 官方 Awesome** | https://github.com/rive-app/awesome-rive | MIT (curated list) | 社区精选 |
| **Rive Animations repo** | https://github.com/rive-app/animations | MIT | 官方示例 |
| **LottieFiles Rive** | https://lottiefiles.com/free-animations/rive | Mixed | LottieFiles 上的 Rive 动画 |

**Runtimes**: rive-js / rive-react / rive-canvas — **MIT License**, 可商用。

**集成示例**：
```html
<canvas id="rive-canvas" width="120" height="120"></canvas>
<script src="https://unpkg.com/@rive-app/canvas"></script>
<script>
  new rive.Rive({
    src: "res/grimoire/rive/xiaolin-robot.riv",
    canvas: document.getElementById("rive-canvas"),
    autoplay: true,
    stateMachines: "Idle"
  });
</script>
```

**何时选 Rive 优于 Lottie**：需要 hover / click 触发不同状态时（小林机器人响应用户）。否则用 Lottie（更简单）。

---

### §L.3 CSS 动画预设库 (paste-and-go)

不是资产文件，而是**直接 paste 进 CSS 的 keyframes 库**。零依赖、零运行时、性能最好。

| 库 | URL | License | 描述 |
|---|---|---|---|
| 🌟 **Animate.css** | https://animate.style/ | MIT | 75+ 经典 entrance/exit/attention 动画。`<div class="animate__animated animate__fadeIn">` 即用 |
| 🌟 **Animista** | https://animista.net/ | MIT | **可视化生成器 + 下载**，按需选择，无冗余。本项目最推荐 |
| **Hover.css** | https://ianlunn.github.io/Hover/ | MIT | 60+ 鼠标悬停效果（pulse / wobble / glow / etc.） |
| **Magic Animations** | https://www.minimamente.com/project/magic/ | MIT | 魔法主题（puff / vanish / open）— 与本站 grimoire 主题 100% 契合！ |
| **AnimXYZ** | https://animxyz.com/ | MIT | CSS variables 驱动，可组合，Vue/React/SCSS 友好 |
| **Vivify** | https://vivify.mkcreative.cz/ | MIT | Animate.css 增强版，更多 effects |
| **CSS Hover Effect Ideas** (Tympanus) | https://tympanus.net/codrops/ | MIT (per-tutorial) | Codrops 的高质量 hover 效果原型 |
| **Magic Mouse** | https://github.com/dixonandmoe/rellax | MIT | 鼠标 trail 效果 |

**对本站的特殊价值**：**Magic Animations** 的 `magic`、`puffIn`、`vanishOut`、`fadeMagic`、`bombFire` 与"魔法师之书"主题完美契合，可直接替换现有 entrance/exit。

**集成示例**：
```html
<link rel="stylesheet" href="https://unpkg.com/magic.css@1.1.0/dist/magic.min.css">
<div class="magictime puffIn">魔法书内容浮现</div>
```

---

### §L.4 JavaScript 动画引擎

需要**编程控制时间轴 / 链式动画 / scroll trigger / SVG morphing** 时用。

| 引擎 | URL | License | 大小 | 何时用 |
|---|---|---|---|---|
| 🌟 **Motion (motion.dev)** | https://motion.dev | **MIT** | ~18KB | **2024+ 首选**。Framer Motion 衍生，独立开源，性能最好 |
| 🌟 **GSAP 3** | https://gsap.com/ | **2024 起 100% 免费**（含原 Club 插件 SplitText / MorphSVG / DrawSVG） | ~30KB core | 老牌之王，时间轴最强 |
| **anime.js v4** | https://animejs.com/ | MIT | ~17KB | 轻量、易用、SVG morphing |
| **Theatre.js** | https://www.theatrejs.com/ | Apache 2.0 | ~50KB | 复杂场景 + 可视化编辑器 |
| **Framer Motion** | https://www.framer.com/motion/ | MIT | ~50KB (React only) | React 生态 |
| **AutoAnimate** | https://auto-animate.formkit.com/ | MIT | ~3KB | DOM 增删自动 layout 动画 |
| **Three.js** | https://threejs.org/ | MIT | ~600KB | 真 3D，本站 force-graph 已用 D3 而非 Three |
| **Lenis** by Studio Freight | https://github.com/darkroomengineering/lenis | MIT | ~5KB | 平滑滚动（grimoire 拖拽已有，可补 wheel） |

**对本站推荐**：
- 当前 grimoire 自实现了 pan / drag / pointer / parallax — **足够，不需要引入大引擎**
- 若 v8+ 需要做 scroll-trigger 入场（如往下滚露出更多卷轴），引 Motion (~18KB) 比手写 IntersectionObserver 优雅
- 入场动画当前用 CSS keyframes，已经 OK，不用上 GSAP

---

### §L.5 Stock 视频背景

> **本站默认不用视频背景**（与 hand-drawn 世界冲突）。仅在以下场景考虑：hero 区微妙 ambient loop（如蜡烛火光 video）、welcome modal 背景。

| 库 | URL | License | 商用 | 4K |
|---|---|---|---|---|
| 🌟 **Mixkit** | https://mixkit.co/free-stock-video/ | Mixkit License (≈ CC0) | ✅ 无需署名 | ✅ |
| 🌟 **Pexels Videos** | https://www.pexels.com/videos/ | Pexels License (≈ CC0) | ✅ 无需署名 | ✅ |
| 🌟 **Coverr** | https://coverr.co/ | Coverr License | ✅ | ✅ |
| **Pixabay Video** | https://pixabay.com/videos/ | Pixabay License | ✅ | ✅ |
| **Videvo** | https://www.videvo.net/ | Mixed (filter free) | ⚠️ 检查 | ✅ |
| **Dareful** | https://dareful.com/ | CC-BY 4.0 | ✅ 需署名 | ✅ |

**优化**：下载后用 ffmpeg 转 webm + h.264 双格式，控制 < 2MB（hero 视频需要 < 1.5s 加载）：
```bash
ffmpeg -i input.mp4 -c:v libvpx-vp9 -crf 32 -b:v 0 -c:a libopus output.webm
ffmpeg -i input.mp4 -c:v libx264 -crf 28 -preset slow -c:a aac output.mp4
```

---

### §L.6 SVG spinner / loader

小型 UI 反馈动画（form submit / 加载状态 / Howler "letter sealing" 反馈）。

| 库 | URL | License | 数量 |
|---|---|---|---|
| 🌟 **n3r4zzurr0/svg-spinners** | https://github.com/n3r4zzurr0/svg-spinners | MIT | 24 个精选 24×24 SVG (CSS + SMIL) |
| 🌟 **UIVerse Loaders** | https://uiverse.io/loaders | MIT | 1183+ 社区贡献 loader（CSS / Tailwind） |
| **SamHerbert/SVG-Loaders** | https://github.com/SamHerbert/SVG-Loaders | MIT | 经典 SVG 加载图（音波 / 三点 / oval） |
| **CSS Script** SVG spinner 集 | https://www.cssscript.com/svg-loading-spinners/ | Mixed | 100+ 风格 |
| **loading.io** | https://loading.io/ | CSS spinners CC0 / SVG/PNG/GIF 免费下载 | 数百 |
| **CSSPin** | https://csspin.css-loaders.com/ | MIT | 纯 CSS pin 风格 loader |

**对本站**：当前 Howler 提交后**没有 loading 反馈** — 可以加一个 SVG spinner（比如 `n3r4zzurr0` 的 `90-ring` 用蜡封红色），这是 v8+ 的细节优化点。

---

### §L.7 Audio / 音效 / 配乐

> **当前 grimoire 有铃铛 mute toggle 但 no audio file** — 这是已知 v8+ TODO。

| 库 | URL | License | 类型 | 推荐用途 |
|---|---|---|---|---|
| 🌟 **Freesound.org** | https://freesound.org/ | per-asset (filter CC0 / CC-BY) | 综合 social audio db | 主源，搜 "page turn" / "quill writing" / "wax seal" / "owl hoot" |
| 🌟 **Pixabay Sound Effects** | https://pixabay.com/sound-effects/search/cc0/ | CC0 | 综合 | 第二选，无需 attribution |
| 🌟 **Mixkit SFX** | https://mixkit.co/free-sound-effects/ | Mixkit (≈ CC0) | UI / cinematic / nature | 优质精选 |
| **Kenney audio packs** | https://kenney.nl/assets?q=audio | CC0 | game UI / impacts | UI 反馈音 |
| **OpenGameArt audio** | https://opengameart.org/art-search?keys=&type=art&field_art_type_tid%5B%5D=12 | per-asset (filter CC0) | game music / SFX | 综合 |
| **BBC Sound Effects** | https://sound-effects.bbcrewind.co.uk/ | RemArc License (个人 + 教育 OK，商业受限) | 历史录音 | ⚠️ 商业用途有限制 |
| **ZapSplat** | https://www.zapsplat.com/ | per-asset (有 CC0 子集) | 综合 | 数量大，但需筛选 |
| **Storyblocks** | https://www.storyblocks.com/ | 订阅制 | — | 跳过（非免费） |

**针对本站的 SFX 候选**（Freesound 搜索关键词）：
- 蜡烛点燃: `match strike`, `candle ignite`
- 翻书页: `page turn`, `book flip`
- 蘸笔写字: `quill writing`, `pen scratch`
- 蜡封盖章: `wax seal`, `stamp impression`
- 信封拉开: `paper rip`, `envelope open`
- 猫头鹰: `owl hoot`, `mechanical owl`
- 铃铛: `desk bell`, `bell ding small`
- 水晶球: `magical chime`, `crystal ring`

**集成示例（Web Audio）**：
```javascript
const sfx = {};
['page-turn', 'wax-seal', 'bell-ding'].forEach(name => {
  sfx[name] = new Audio(`res/grimoire/sfx/${name}.mp3`);
  sfx[name].volume = 0.3;
});
// On Howler send: sfx['wax-seal'].play();
```

**性能**：每个 SFX MP3 应 < 30KB（短音效），用 ffmpeg 压：
```bash
ffmpeg -i input.wav -ac 1 -ar 22050 -b:a 64k output.mp3
```

---

### §L.8 本项目动效用例 (mapping)

机器可读：每个 grimoire 元素 → 它需要什么动画 → 推荐源。

| 元素 | 需要的动效 | 推荐源 (按 §L.x) | 备注 |
|---|---|---|---|
| 小林机器人 idle | 缓慢呼吸 + 偶尔抬头 | §L.2 Rive (state machine: idle / look-up / wave) | 唯一最适合 Rive 的元素 |
| 入场动画 (页面加载) | scale + fade + 卷轴展开 | §L.3 Magic Animations `puffIn` 或自家 CSS keyframes | 已有，可换 magic |
| Howler URGENT 摇晃 | shake + jiggle | 已有 CSS @keyframes howl-shake | 保留 |
| Wax-seal pulse on hover | scale 1.06 cycle | 已有 `seal-pulse` keyframes | 保留 |
| Owl bobbing | translateY 3px | 已有 `owl-bob` keyframes | 保留 |
| Candle flame flicker | opacity 0.65↔0.95 | 已有 `deco-flicker` keyframes | 保留 |
| Page hover lift | translateY -4px | CSS transition | 已有 |
| Vines fade-in (engagement) | stroke-dashoffset → 0 + opacity | 已有 SVG SMIL | 保留 |
| Atlas 力图全屏入场 | fade + scale | CSS | 已有 |
| Form submit loading | spinner | §L.6 svg-spinners `90-ring` | TODO v8+ |
| 铃铛点击音 | bell ding short | §L.7 Freesound `desk bell` | TODO v8+ |
| 翻页音 (导航切换) | page turn | §L.7 Freesound `page turn` | TODO v8+ (optional) |
| 蜡封提交音 | stamp impression | §L.7 Freesound `wax seal stamp` | TODO v8+ |
| Hero ambient bg | 蜡烛火光 ambient loop | §L.5 Mixkit `candle flame loop` | optional, 谨慎用 |
| 水晶球 idle | 内部缓慢旋转 + glow pulse | 自家 SVG + CSS keyframes | 不用引外部 |

**Hard rule**：能用 CSS keyframes 解决的，**永远不引 JS 动画引擎或外部 Lottie**。性能 + 可控性都更好。Lottie / Rive 仅用于"小林"这种**多状态有人格**的角色。

---

## 附：本月 Top-3 立刻可用素材

如果立刻要补充我们 grimoire 主页的视觉，最高 ROI 的三件事：

1. **从 Game-Icons.net 下载 ~20 个核心图标** (open-book / quill-ink / wax-seal / candle-flame / owl / crystal-ball / potion-of-madness / scroll-unfurled / wizard-face) → 替换我们目前手画的 SVG，质量瞬间提升 + 风格一致。归 CC-BY 3.0 footer 一行字搞定。

2. **从 CC0 Textures 下载 1 张 4K 羊皮纸纹理** → 替换 CSS 生成的 radial-gradient 背景，立即真实感 +50%。

3. **从 Wikimedia 公有领域下载 1 张《千里江山图》局部** (~2000px 宽) → 用作画壁走廊的真背景，立刻把那个 section 从"timeline ribbon"升级为"中国卷轴画"。

---

> Sources for this asset list:
>
> **Static assets (§A–§K, original 2026-04-27 batch):**
> - [Best Free Illustration Libraries 2026 (Muzli)](https://muz.li/blog/best-free-illustration-libraries-for-designers-2026/)
> - [25+ Free Open-Source Illustrations Library (Toolfolio)](https://toolfolio.io/productive-value/free-open-source-illustrations-library)
> - [Best Open Source Illustration Libraries (toools.design)](https://www.toools.design/free-open-source-illustrations)
> - [12 Best SVG Icon Libraries 2026 (Hugeicons)](https://hugeicons.com/blog/design/12-best-svg-icon-libraries-to-use-in-2025)
> - [25+ Best Open Source Icon Libraries (Lineicons)](https://lineicons.com/blog/best-open-source-icon-libraries)
> - [Game-Icons.net](https://game-icons.net/)
> - [OpenGameArt.org](https://opengameart.org/)
> - [Kenney.nl](https://kenney.nl/)
> - [CC0 Textures](https://cc0-textures.com/c/paper)
> - [Lost & Taken Textures](https://lostandtaken.com/textures/)
>
> **Motion + Sound (§L, added 2026-04-27 batch 2):**
> - [8 Best Free Lottie Animation Sites — MiroMiro](https://miromiro.app/blog/free-lottie-animations-best-resources)
> - [10 Best Free Lottie Animation Libraries (Moonb.io)](https://www.moonb.io/blog/free-lottie-animations)
> - [LottieFiles awesome-lottie (curated)](https://github.com/LottieFiles/awesome-lottie)
> - [Best Animation Libraries 2026 — Motion / GSAP / Lottie (Alignify)](https://alignify.co/tools/animation-library)
> - [Rive Community Marketplace](https://rive.app/community/files/)
> - [rive-app/awesome-rive](https://github.com/rive-app/awesome-rive)
> - [Top 10 JavaScript Animation Libraries (DEV)](https://dev.to/hadil/top-10-javascript-animation-libraries-in-2025-2ch5)
> - [50+ Free CSS Animation Libraries (Medium)](https://er-raj-aryan.medium.com/50-free-css-animation-libraries-that-actually-make-ui-feel-alive-24c58abc1f63)
> - [Animista — On-demand CSS animations](https://animista.net/)
> - [GSAP is now 100% free (greensock)](https://gsap.com/)
> - [Motion (motion.dev)](https://motion.dev)
> - [Mixkit free stock video](https://mixkit.co/free-stock-video/)
> - [n3r4zzurr0/svg-spinners](https://github.com/n3r4zzurr0/svg-spinners)
> - [UIVerse Loaders](https://uiverse.io/loaders)
> - [Loading.io (CC0 spinners)](https://loading.io/)
> - [Freesound.org](https://freesound.org/)
> - [Pixabay CC0 Sound Effects](https://pixabay.com/sound-effects/search/cc0/)
> - [Mixkit free SFX](https://mixkit.co/free-sound-effects/)
> - [Vecteezy Chinese Ink Painting](https://www.vecteezy.com/free-vector/chinese-ink-painting)
> - [Inkscape](https://inkscape.org/)
> - [Free open-source icon libraries (TOOOLS.design)](https://www.toools.design/free-open-source-icon-libraries)
