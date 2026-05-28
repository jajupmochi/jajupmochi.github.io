/*
 * projects-data.js — single source of truth for the App Gallery (and, later,
 * the homepage Projects section). DATA ONLY: no rendering, no styling.
 * Loaded as a plain <script> before the render module so window.PROJECTS is
 * available synchronously (no fetch/timing races).
 *
 * Field reference
 *   id          stable slug
 *   year        number — for "newest/oldest" sort
 *   priority    number — higher = earlier in "featured" sort
 *   featured    bool   — washi "Featured" tape + larger bento tile
 *   size        "lg" | "md" — bento span hint for the Cards view
 *   badge       academia | industry | dual | software | fun
 *   badgeText   label shown on the badge (Detailed view)
 *   date        e.g. "2026 - Present"
 *   titleFull   long title (Detailed view)
 *   titleShort  short title (Cards view caption + overlay)
 *   tags        filter keys (lowercase)
 *   tagLabels   display chips
 *   images      [{ src, alt }] — 1+; >1 → in-card carousel (dots + swipe)
 *   blurb       one-line summary (Cards hover overlay)
 *   bullets     [html] — Detailed view description list
 *   why         NDA / "no public link" note (Cards + Detailed)
 *   primaryHref card-click target (omit → click opens lightbox)
 *   links       [{ label, href, icon }] — action links
 *   show        { gallery, home } — which surfaces include this project
 */
window.PROJECTS = [
  {
    id: 'liulian', year: 2026, priority: 320, featured: true, size: 'lg',
    badge: 'dual', badgeText: 'Academia + Industry', date: '2026 - Present',
    titleFull: 'LIULIAN: Liquid Intelligence and Unified Logic for Interactive Adaptive Networks',
    titleShort: 'LIULIAN',
    tags: ['academia', 'industry', 'llm', 'agents', 'graph', 'software', 'spatio-temporal'],
    tagLabels: ['Python', 'Platform', 'LLMs', 'Agents', 'Spatio-Temporal'],
    images: [
      { src: 'res/portfolio/img/liulian_studio.webp', alt: 'LIULIAN Studio data platform UI' },
      { src: 'res/portfolio/img/liulian_mobile.webp', alt: 'LIULIAN mobile forecast view' }
    ],
    blurb: 'Spatio-temporal data platform with LLM-driven interfaces and BI agent systems. Live web app.',
    bullets: [
      '<strong>Spatio-temporal data platform</strong>: collection, processing, analysis, and visualization.',
      '<strong>Multimodal scientific graph benchmarks</strong> and <strong>LLM-driven data interfaces + BI agent systems</strong>.',
      'Consolidates years of graph-ML research into one productizable Python codebase.'
    ],
    primaryHref: 'https://liulian-ai.github.io/liulian-web/',
    links: [
      { label: 'Online Demo', href: 'https://liulian-ai.github.io/liulian-web/', icon: 'fas fa-arrow-up-right-from-square' },
      { label: 'Code', href: 'https://github.com/jajupmochi/liulian-python', icon: 'fab fa-github' }
    ],
    show: { gallery: true, home: true }
  },
  {
    id: 'neobanker', year: 2024, priority: 315, featured: true, size: 'md',
    badge: 'industry', badgeText: 'Industry', date: '2024 - Present',
    titleFull: 'N-Banker: 1st Global Neobank Research Center',
    titleShort: 'N-Banker',
    tags: ['industry', 'llm', 'agents'],
    tagLabels: ['LLMs', 'RAG', 'Agents', 'FinTech'],
    images: [
      { src: 'res/portfolio/img/neobanker_chat.webp', alt: 'N-Banker agentic neobank assistant' },
      { src: 'res/portfolio/img/neobanker_canvas.webp', alt: 'N-Banker canvas dashboard' }
    ],
    blurb: 'AI strategy and LLM-agent development for a neobank research center (RAG, agents, FinTech).',
    bullets: [
      '<strong>Leading AI strategy and LLM-agent development</strong> for the Neobank Research Center platform.',
      'Automated <strong>information retrieval, analysis, and strategic consultation</strong> for business partners.',
      'Built on an <strong>ML + LLM stack</strong> (RAG, agents, FinTech pipelines).'
    ],
    why: 'Private / NDA engagement — no public repo or live demo.',
    links: [],
    show: { gallery: true, home: true }
  },
  {
    id: 'gklearn', year: 2020, priority: 310, featured: true, size: 'md',
    badge: 'software', badgeText: 'Software', date: '2020 - Present',
    titleFull: 'graphkit-learn',
    titleShort: 'graphkit-learn',
    tags: ['software', 'academia', 'graph'],
    tagLabels: ['Python', 'Graph Kernels', 'Open Source'],
    images: [
      { src: 'res/figures/2021_prl_gklearn_accuracy.svg', alt: 'graphkit-learn accuracy benchmark on graph kernels' }
    ],
    blurb: 'Python library for graph kernels, GED, and the graph pre-image problem. 128★, on PyPI.',
    bullets: [
      '<strong>Python library</strong> for graph kernels, graph edit distances, and the graph pre-image problem.',
      'Used <strong>worldwide</strong> for graph classification and regression.',
      '<strong>Open-source output</strong> of the APi (ANR) grant.'
    ],
    primaryHref: 'https://github.com/jajupmochi/graphkit-learn',
    links: [
      { label: 'Code', href: 'https://github.com/jajupmochi/graphkit-learn', icon: 'fab fa-github' },
      { label: 'PyPI', href: 'https://pypi.org/project/graphkit-learn/', icon: 'fas fa-cube' }
    ],
    show: { gallery: true, home: true }
  },
  {
    id: 'swissriver', year: 2025, priority: 305, featured: true, size: 'md',
    badge: 'academia', badgeText: 'Academia', date: '2025 - Present',
    titleFull: 'Spatio-Temporal Graph Networks for River Temperature Forecasting',
    titleShort: 'Swiss River Forecasting',
    tags: ['academia', 'graph', 'spatio-temporal', 'software'],
    tagLabels: ['GNNs', 'Transformers', 'Spatio-Temporal', 'Benchmark'],
    images: [
      { src: 'res/figures/2026_icpr_swissriver_diagram.svg', alt: 'Spatio-temporal transformer for Swiss river water temperature forecasting' }
    ],
    blurb: 'SNSF spatio-temporal transformer / LLM forecasting; benchmark open-sourced. ICPR 2026.',
    bullets: [
      '<strong>SNSF-funded</strong> graph-based Swiss river water-temperature forecasting.',
      'Built <strong>spatio-temporal transformer + LLM architectures</strong> with entity embeddings + graph structure.',
      '<strong>Benchmark open-sourced</strong>; paper accepted at ICPR 2026.'
    ],
    primaryHref: 'https://github.com/jajupmochi/swiss-river-network-benchmark',
    links: [
      { label: 'Code', href: 'https://github.com/jajupmochi/swiss-river-network-benchmark', icon: 'fab fa-github' },
      { label: 'Funding', href: 'https://data.snf.ch/grants/grant/206352', icon: 'fas fa-file-signature' }
    ],
    show: { gallery: true, home: true }
  },
  {
    id: 'homepage', year: 2026, priority: 300, featured: false, size: 'md',
    badge: 'software', badgeText: 'Software', date: '2026 - Present',
    titleFull: "Linlin's homepage",
    titleShort: "Linlin's homepage",
    tags: ['software', 'fun', 'llm'],
    tagLabels: ['HTML/CSS/JS', 'i18n', 'Static'],
    images: [
      { src: 'res/portfolio/img/personal_site.webp', alt: "Linlin's homepage" },
      { src: 'res/figures/2026_blog.webp', alt: "Linlin's blog" }
    ],
    blurb: 'Static 4-language site + client-rendered blog engine on GitHub Pages, built human × AI.',
    bullets: [
      '<strong>Static personal site + blog</strong> on GitHub Pages — no backend, no build step.',
      '<strong>4-language i18n</strong>, a hand-built parchment design system, and a <strong>client-rendered blog engine</strong> (Markdown · LaTeX · Jupyter · Mermaid).',
      'Designed and built <strong>human × AI</strong>; fully open source.'
    ],
    primaryHref: 'https://jajupmochi.github.io/index_en.html',
    links: [
      { label: 'Open site', href: 'https://jajupmochi.github.io/index_en.html', icon: 'fas fa-arrow-up-right-from-square' },
      { label: 'Code', href: 'https://github.com/jajupmochi/jajupmochi.github.io', icon: 'fab fa-github' }
    ],
    show: { gallery: true, home: false }
  },
  {
    id: 'translator', year: 2026, priority: 220, featured: false, size: 'md',
    badge: 'fun', badgeText: 'Software', date: '2026 - Present',
    titleFull: 'Local Confidential Translator',
    titleShort: 'Local Confidential Translator',
    tags: ['fun', 'llm', 'software'],
    tagLabels: ['Local LLM', 'Docker', 'Privacy'],
    images: [
      { src: 'res/figures/2026_confidential_translator_presentation.gif', alt: 'Local Confidential Translator demo' }
    ],
    blurb: 'Offline, privacy-first document translation via local LLMs; one-command Docker deploy.',
    bullets: [
      '<strong>Fully offline, privacy-first document translation</strong> powered by local LLMs.',
      '<strong>MIT-licensed open source</strong>, deployable via a single Docker command.',
      'Built end-to-end via AI-assisted (vibe) coding; MVP in testing.'
    ],
    primaryHref: 'https://github.com/jajupmochi/confidential-translator',
    links: [
      { label: 'Code', href: 'https://github.com/jajupmochi/confidential-translator', icon: 'fab fa-github' }
    ],
    show: { gallery: true, home: true }
  },
  {
    id: 'octopussy', year: 2021, priority: 210, featured: false, size: 'md',
    badge: 'academia', badgeText: 'Software', date: '2021 - 2024',
    titleFull: 'OCTOPUSSY — RedoxPrediction',
    titleShort: 'OCTOPUSSY — RedoxPrediction',
    tags: ['academia', 'graph', 'chemoinformatics', 'software'],
    tagLabels: ['Python', 'GNNs', 'Chemoinformatics'],
    images: [
      { src: 'res/figures/2023_jcc_redox_framework.svg', alt: 'Graph-based redox potential prediction pipeline' }
    ],
    blurb: 'Graph-based ML for polymer / redox-potential prediction; open-sourced package, J. Comp. Chem.',
    bullets: [
      '<strong>Graph-based ML</strong> + chemical-descriptor design for polymer optimization and redox-potential prediction.',
      '<strong>RedoxPrediction</strong> package open-sources the implementation; published in J. Comp. Chem. (2024).'
    ],
    primaryHref: 'https://github.com/jajupmochi/RedoxPrediction',
    links: [
      { label: 'Code', href: 'https://github.com/jajupmochi/RedoxPrediction', icon: 'fab fa-github' },
      { label: 'Paper', href: 'https://doi.org/10.1002/jcc.27380', icon: 'fas fa-file-lines' }
    ],
    show: { gallery: true, home: true }
  },
  {
    id: 'planalyser', year: 2024, priority: 120, featured: false, size: 'md',
    badge: 'dual', badgeText: 'Academia + Industry', date: '2024 - 2025',
    titleFull: 'PLANALYSER: Automated HVAC-Concept Audit using AI',
    titleShort: 'PLANALYSER',
    tags: ['academia', 'industry', 'vision', 'graph'],
    tagLabels: ['CV', 'GNNs'],
    images: [
      { src: 'res/figures/2024_planalyser_company_page.png', alt: 'PLANALYSER Innosuisse grant page' }
    ],
    blurb: 'Innosuisse AI auditing HVAC concepts from engineering drawings (symbol / topology extraction).',
    bullets: [
      '<strong>Innosuisse-funded</strong> AI audit + optimization of HVAC concepts on engineering drawings.',
      'Built the ML pipeline: <strong>data preprocessing, symbol / edge / topology extraction</strong>, training.'
    ],
    why: 'Industrial NDA project — code and data are private.',
    links: [
      { label: 'Funding', href: 'https://www.aramis.admin.ch/Grunddaten/?ProjectID=53900', icon: 'fas fa-file-signature' }
    ],
    show: { gallery: true, home: true }
  },
  {
    id: 'graphink', year: 2024, priority: 110, featured: false, size: 'md',
    badge: 'academia', badgeText: 'Academia', date: '2024 - Present',
    titleFull: 'GraphInk: Image + Graph Networks for Handwriting Recognition',
    titleShort: 'GraphInk',
    tags: ['academia', 'graph', 'vision'],
    tagLabels: ['CV', 'GNNs', 'Docs'],
    images: [
      { src: 'res/figures/2025_graphink_framework.svg', alt: 'GraphInk: image + graph-based neural networks for handwriting recognition' }
    ],
    blurb: 'SNSF image + graph networks for handwriting recognition on historical documents.',
    bullets: [
      '<strong>SNSF-funded</strong> handwritten historical-document analysis.',
      'Combines <strong>image semantics with graph topology</strong> for deep learning.'
    ],
    why: 'Research in progress — the library is not released yet.',
    links: [
      { label: 'Funding', href: 'https://data.snf.ch/grants/grant/217594', icon: 'fas fa-file-signature' }
    ],
    show: { gallery: true, home: true }
  }
];
