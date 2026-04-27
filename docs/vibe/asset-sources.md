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
- [§G · 3D / Lottie / Rive (motion)](#g--3d--lottie--rive-motion)
- [§H · Photos (only when essential)](#h--photos-only-when-essential)
- [§I · Tools (creation, conversion, optimization)](#i--tools-creation-conversion-optimization)
- [§J · 我们项目本地资产库 (现状)](#j--我们项目本地资产库-现状)
- [§K · 用法手册 (机器可读)](#k--用法手册-机器可读)

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

## §G · 3D / Lottie / Rive (motion)

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

## 附：本月 Top-3 立刻可用素材

如果立刻要补充我们 grimoire 主页的视觉，最高 ROI 的三件事：

1. **从 Game-Icons.net 下载 ~20 个核心图标** (open-book / quill-ink / wax-seal / candle-flame / owl / crystal-ball / potion-of-madness / scroll-unfurled / wizard-face) → 替换我们目前手画的 SVG，质量瞬间提升 + 风格一致。归 CC-BY 3.0 footer 一行字搞定。

2. **从 CC0 Textures 下载 1 张 4K 羊皮纸纹理** → 替换 CSS 生成的 radial-gradient 背景，立即真实感 +50%。

3. **从 Wikimedia 公有领域下载 1 张《千里江山图》局部** (~2000px 宽) → 用作画壁走廊的真背景，立刻把那个 section 从"timeline ribbon"升级为"中国卷轴画"。

---

> Sources for this asset list:
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
> - [Vecteezy Chinese Ink Painting](https://www.vecteezy.com/free-vector/chinese-ink-painting)
> - [Inkscape](https://inkscape.org/)
> - [Free open-source icon libraries (TOOOLS.design)](https://www.toools.design/free-open-source-icon-libraries)
