/*
 * projects-data.js — single source of truth for projects. DATA ONLY.
 * Consumed by js/projects-render.js for both the App Gallery (English) and the
 * homepage Projects section (i18n via the `home` block). Loaded synchronously
 * before the render module so window.PROJECTS is ready (no fetch races).
 *
 * Gallery fields (English): titleFull/Short, blurb, bullets, tagLabels, links, images, why, badge*…
 * Homepage block `home`: { slug, chips:[{label,key}], links:[{label,href,icon,key,onclick}], stats? }
 *   — title/date/desc come from `proj.{slug}.{title|date|desc}`, badge from `proj_badge.{badge}`.
 *   — chips/link labels are English fallbacks; data-i18n keys drive the 4-language text.
 * images: { src, alt }. A single `.svg` is rendered as <object> on the homepage (SEO: indexable text).
 * show: { gallery, home } — which surfaces include the project.
 */
window.PROJECTS = [
  {
    id: 'liulian', slug: 'liulian', year: 2026, priority: 320, featured: true, size: 'lg',
    badge: 'dual', badgeText: 'Academia + Industry', date: '2026 - Present',
    titleFull: 'LIULIAN: Liquid Intelligence and Unified Logic for Interactive Adaptive Networks',
    titleShort: 'LIULIAN',
    tags: ['academia', 'industry', 'llm', 'agents', 'graph', 'software', 'spatio-temporal'],
    tagLabels: ['Python', 'Platform', 'LLMs', 'Agents', 'Spatio-Temporal'],
    images: [
      { src: 'res/portfolio/img/liulian_studio.webp', alt: 'LIULIAN Studio data platform UI' },
      { src: 'res/portfolio/img/liulian_mobile.webp', alt: 'LIULIAN mobile forecast view' }
    ],
    blurb: 'Spatio-temporal data platform under active development: LLM-driven interfaces and multimodal scientific graph benchmarks. Live demo.',
    bullets: [
      '<strong>Spatio-temporal data platform</strong> under active development: collection, processing, analysis, and visualization (time-series pipeline working; graph-structure support next).',
      '<strong>Multimodal scientific graph benchmarks</strong> and <strong>LLM-driven data interfaces</strong>.',
      'Consolidates years of graph-ML research into one open-source Python codebase; Innosuisse Innovation Project in preparation.'
    ],
    primaryHref: 'https://liulian-ai.github.io/liulian-web/',
    links: [
      { label: 'Online Demo', href: 'https://liulian-ai.github.io/liulian-web/', icon: 'fas fa-arrow-up-right-from-square' },
      { label: 'Code', href: 'https://github.com/jajupmochi/liulian-python', icon: 'fab fa-github' }
    ],
    show: { gallery: true, home: true },
    home: {
      chips: [{ label: 'Platform', key: 'proj_tag.platform' }, { label: 'Spatio-Temporal', key: 'proj_tag.spatio_temporal' }, { label: 'Graph ML', key: 'proj_tag.graph_ml' }, { label: 'LLMs', key: 'proj_tag.llms' }, { label: 'Agents', key: 'proj_tag.agents' }],
      links: [
        { label: 'Online Demo', href: 'https://liulian-ai.github.io/liulian-web/', icon: 'fas fa-arrow-up-right-from-square', key: 'proj_link.online_demo' },
        { label: 'Code', href: 'https://github.com/jajupmochi/liulian-python', icon: 'fab fa-github', key: 'proj_link.code' }
      ]
    }
  },
  {
    id: 'swissriver', slug: 'river', year: 2025, priority: 305, featured: true, size: 'md',
    badge: 'academia', badgeText: 'Academia', date: '2025 - Present',
    titleFull: 'Spatio-Temporal Graph Convolutional Networks for River Temperature Forecasting',
    titleShort: 'Swiss River Forecasting',
    tags: ['academia', 'graph', 'spatio-temporal', 'software'],
    tagLabels: ['GNNs', 'Transformers', 'Spatio-Temporal', 'Benchmark'],
    images: [{ src: 'res/figures/2026_icpr_swissriver_diagram.svg', alt: 'Spatio-temporal transformer for Swiss river water temperature forecasting' }],
    blurb: 'SNSF spatio-temporal transformer / LLM forecasting; benchmark open-sourced. ICPR 2026.',
    bullets: [
      '<strong>SNSF-funded</strong> graph-based Swiss river water-temperature forecasting.',
      'Built <strong>spatio-temporal transformer + LLM architectures</strong> with entity embeddings + graph structure.',
      '<strong>Benchmark open-sourced</strong>; paper accepted at ICPR 2026.',
      'Currently exploring <strong>spatio-temporal LLMs</strong> (fine-tuning + structure-based GRPO); research stage.'
    ],
    primaryHref: 'https://github.com/jajupmochi/swiss-river-network-benchmark',
    links: [
      { label: 'Code', href: 'https://github.com/jajupmochi/swiss-river-network-benchmark', icon: 'fab fa-github' },
      { label: 'Funding', href: 'https://data.snf.ch/grants/grant/206352', icon: 'fas fa-file-signature' }
    ],
    show: { gallery: true, home: true },
    home: {
      chips: [{ label: 'GNNs', key: 'proj_tag.gnns' }, { label: 'Spatio-Temporal', key: 'proj_tag.spatio_temporal' }, { label: 'Transformers', key: 'proj_tag.transformers' }, { label: 'TimeLLMs', key: 'proj_tag.timellms' }, { label: 'ST-LLMs', key: 'proj_tag.stllms' }],
      links: [
        { label: 'Funding', href: 'https://data.snf.ch/grants/grant/206352', icon: 'fas fa-file-signature', key: 'proj_link.funding' },
        { label: 'Code', href: 'https://github.com/jajupmochi/swiss-river-network-benchmark', icon: 'fab fa-github', key: 'proj_link.code' },
        { label: 'Paper', href: '#publications', icon: 'fas fa-file-lines', key: 'proj_link.paper' }
      ]
    }
  },
  {
    id: 'neobanker', slug: 'nbanker', year: 2024, priority: 315, featured: true, size: 'md',
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
    show: { gallery: true, home: true },
    home: {
      chips: [{ label: 'LLMs', key: 'proj_tag.llms' }, { label: 'RAG', key: 'proj_tag.rag' }, { label: 'Agents', key: 'proj_tag.agents' }, { label: 'FinTech', key: 'proj_tag.fintech' }],
      links: [
        { label: 'Platform', href: "javascript:void(0);", icon: 'fas fa-globe', key: 'proj_link.platform', onclick: "showComingSoon('platform'); return false;" },
        { label: 'Partner', href: 'https://www.polyu.edu.hk/kteo/entrepreneurship/start-ups/polyu-start-ups-list/mf/2023/digital-financial-services-research-center-limited/', icon: 'fas fa-handshake', key: 'proj_link.partner' }
      ]
    }
  },
  {
    id: 'gklearn', slug: 'gklearn', year: 2020, priority: 310, featured: true, size: 'md',
    badge: 'software', badgeText: 'Software', date: '2020 - Present',
    titleFull: 'graphkit-learn',
    titleShort: 'graphkit-learn',
    tags: ['software', 'academia', 'graph'],
    tagLabels: ['Python', 'Graph Kernels', 'Open Source'],
    images: [{ src: 'res/figures/2021_prl_gklearn_accuracy.svg', alt: 'graphkit-learn accuracy benchmark on graph kernels' }],
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
    show: { gallery: true, home: true },
    home: {
      chips: [{ label: 'Python', key: 'proj_tag.python' }, { label: 'Graph Kernels', key: 'proj_tag.graph_kernels' }, { label: 'Open Source', key: 'proj_tag.open_source' }],
      stats: [
        { html: '<i class="fab fa-github" aria-hidden="true"></i> <strong>128</strong> ⭐', href: 'https://github.com/jajupmochi/graphkit-learn/stargazers', title: 'GitHub stars' },
        { html: '<i class="fas fa-cube" aria-hidden="true"></i> PyPI', href: 'https://pypi.org/project/graphkit-learn/', title: 'PyPI package' }
      ],
      links: [
        { label: 'Code', href: 'https://github.com/jajupmochi/graphkit-learn', icon: 'fab fa-github', key: 'proj_link.code' },
        { label: 'Paper', href: '#publications', icon: 'fas fa-file-lines', key: 'proj_link.paper' }
      ]
    }
  },
  {
    id: 'homepage', slug: null, year: 2026, priority: 300, featured: false, size: 'md',
    badge: 'software', badgeText: 'Software', date: '2026 - Present',
    titleFull: "Linlin's homepage", titleShort: "Linlin's homepage",
    tags: ['software', 'fun', 'llm'], tagLabels: ['HTML/CSS/JS', 'i18n', 'Static'],
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
    id: 'translator', slug: 'translator', year: 2026, priority: 220, featured: false, size: 'md',
    badge: 'fun', badgeText: 'Fun', date: '2026 - Present',
    titleFull: 'Local Confidential Translator', titleShort: 'Local Confidential Translator',
    tags: ['fun', 'llm', 'software'], tagLabels: ['Local LLM', 'Docker', 'Privacy'],
    images: [{ src: 'res/figures/2026_confidential_translator_presentation.gif', alt: 'Local Confidential Translator demo' }],
    blurb: 'Offline, privacy-first document translation via local LLMs; one-command Docker deploy.',
    bullets: [
      '<strong>Fully offline, privacy-first document translation</strong> powered by local LLMs.',
      '<strong>MIT-licensed open source</strong>, deployable via a single Docker command.',
      'Built end-to-end via AI-assisted (vibe) coding; MVP1 public.'
    ],
    primaryHref: 'https://github.com/jajupmochi/confidential-translator',
    links: [{ label: 'Code', href: 'https://github.com/jajupmochi/confidential-translator', icon: 'fab fa-github' }],
    show: { gallery: true, home: true },
    home: {
      chips: [{ label: 'Local LLM', key: 'proj_tag.local_llm' }, { label: 'Privacy', key: 'proj_tag.privacy' }, { label: 'Docker', key: 'proj_tag.docker' }, { label: 'Fun', key: 'proj_tag.fun' }],
      links: [{ label: 'Code', href: 'https://github.com/jajupmochi/confidential-translator', icon: 'fab fa-github', key: 'proj_link.code' }]
    }
  },
  {
    id: 'octopussy', slug: 'octopussy', year: 2021, priority: 210, featured: false, size: 'md',
    badge: 'academia', badgeText: 'Software', date: '2021 - 2024',
    titleFull: 'OCTOPUSSY — RedoxPrediction', titleShort: 'OCTOPUSSY — RedoxPrediction',
    tags: ['academia', 'graph', 'chemoinformatics', 'software'], tagLabels: ['Python', 'GNNs', 'Chemoinformatics'],
    images: [{ src: 'res/figures/2023_jcc_redox_framework.svg', alt: 'Graph-based redox potential prediction pipeline' }],
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
    show: { gallery: true, home: true },
    home: {
      chips: [{ label: 'Chemoinformatics', key: 'proj_tag.chemoinformatics' }, { label: 'GNNs', key: 'proj_tag.gnns' }, { label: 'Materials', key: 'proj_tag.materials' }],
      links: [
        { label: 'Code', href: 'https://github.com/jajupmochi/RedoxPrediction', icon: 'fab fa-github', key: 'proj_link.code' },
        { label: 'Paper', href: 'https://doi.org/10.1002/jcc.27380', icon: 'fas fa-file-lines', key: 'proj_link.paper' }
      ]
    }
  },
  {
    id: 'planalyser', slug: 'planalyser', year: 2024, priority: 120, featured: false, size: 'md',
    badge: 'dual', badgeText: 'Academia + Industry', date: '2024 - 2025',
    titleFull: 'PLANALYSER: Automated HVAC-Concept Audit using AI', titleShort: 'PLANALYSER',
    tags: ['academia', 'industry', 'vision', 'graph'], tagLabels: ['CV', 'GNNs'],
    images: [{ src: 'res/figures/2024_planalyser_company_page.png', alt: 'PLANALYSER Innosuisse grant page' }],
    blurb: 'Innosuisse AI auditing HVAC concepts from engineering drawings (symbol / topology extraction).',
    bullets: [
      '<strong>Innosuisse-funded</strong> AI audit + optimization of HVAC concepts on engineering drawings.',
      'Built the ML pipeline: <strong>symbol detection (YOLO + Vision Transformer)</strong>, <strong>edge detection (Segment Anything)</strong>, graph topology extraction, custom HVAC block recognition, and semantic graph reconstruction.'
    ],
    why: 'Industrial NDA project — code and data are private.',
    links: [{ label: 'Funding', href: 'https://www.aramis.admin.ch/Grunddaten/?ProjectID=53900', icon: 'fas fa-file-signature' }],
    show: { gallery: true, home: true },
    home: {
      chips: [{ label: 'CV', key: 'proj_tag.cv' }, { label: 'GNNs', key: 'proj_tag.gnns' }, { label: 'Smart Engineering', key: 'proj_tag.smart_engineering' }],
      links: [
        { label: 'Funding', href: 'https://www.aramis.admin.ch/Grunddaten/?ProjectID=53900', icon: 'fas fa-file-signature', key: 'proj_link.funding' },
        { label: 'Partner', href: 'https://www.startup.ch/WATTELSE', icon: 'fas fa-handshake', key: 'proj_link.partner' }
      ]
    }
  },
  {
    id: 'graphink', slug: 'graphink', year: 2024, priority: 110, featured: false, size: 'md',
    badge: 'academia', badgeText: 'Academia', date: '2024 - Present',
    titleFull: 'GraphInk: Image + Graph Networks for Handwriting Recognition', titleShort: 'GraphInk',
    tags: ['academia', 'graph', 'vision'], tagLabels: ['CV', 'GNNs', 'Docs'],
    images: [{ src: 'res/figures/2025_graphink_framework.svg', alt: 'GraphInk: image + graph-based neural networks for handwriting recognition' }],
    blurb: 'SNSF image + graph networks for handwriting recognition on historical documents.',
    bullets: [
      '<strong>SNSF-funded</strong> handwritten historical-document analysis.',
      'Combines <strong>image semantics with graph topology</strong> for deep learning.'
    ],
    why: 'Research in progress — the library is not released yet.',
    links: [{ label: 'Funding', href: 'https://data.snf.ch/grants/grant/217594', icon: 'fas fa-file-signature' }],
    show: { gallery: true, home: true },
    home: {
      chips: [{ label: 'CV', key: 'proj_tag.cv' }, { label: 'GNNs', key: 'proj_tag.gnns' }, { label: 'Document Analysis', key: 'proj_tag.document_analysis' }],
      links: [{ label: 'Funding', href: 'https://data.snf.ch/grants/grant/217594', icon: 'fas fa-file-signature', key: 'proj_link.funding' }]
    }
  },
  /* ---- homepage-only projects (not in the App Gallery) ---- */
  {
    id: 'gmatch', slug: 'gmatch', year: 2023, priority: 50, featured: false, size: 'md',
    badge: 'academia', badgeText: 'Academia', date: '2023 - 2024',
    titleFull: 'Novel State-of-the-Art Graph Matching Algorithms', titleShort: 'Graph Matching',
    tags: ['academia', 'graph'], tagLabels: ['Graph Matching', 'GED', 'Graph Kernels'],
    images: [{ src: 'res/figures/2023_acpr_gecl_framework.png', alt: 'Graph embedding-and-classification learning framework bridging distinct graph spaces' }],
    primaryHref: 'https://data.snf.ch/grants/grant/188496',
    show: { gallery: false, home: true },
    home: {
      chips: [{ label: 'Graph Matching', key: 'proj_tag.graph_matching' }, { label: 'GED', key: 'proj_tag.ged' }, { label: 'Graph Kernels', key: 'proj_tag.graph_kernels' }],
      links: [
        { label: 'Funding', href: 'https://data.snf.ch/grants/grant/188496', icon: 'fas fa-file-signature', key: 'proj_link.funding' },
        { label: 'Code', href: 'https://github.com/jajupmochi/ged-cost-learn-framework', icon: 'fab fa-github', key: 'proj_link.code' },
        { label: 'Paper', href: '#publications', icon: 'fas fa-file-lines', key: 'proj_link.paper' }
      ]
    }
  },
  {
    id: 'api', slug: 'api', year: 2018, priority: 50, featured: false, size: 'md',
    badge: 'academia', badgeText: 'Academia', date: '2018 - 2021',
    titleFull: 'APi: Apprivoiser la Pré-image', titleShort: 'APi: Apprivoiser la Pré-image',
    tags: ['academia', 'graph', 'chemoinformatics'], tagLabels: ['Pre-image', 'Graph Kernels', 'GED'],
    images: [{ src: 'res/figures/2021_sspr_preimage_intro.svg', alt: 'Graph pre-image problem: reconstructing graphs from embeddings' }],
    primaryHref: 'https://projets.litislab.fr/api/',
    show: { gallery: false, home: true },
    home: {
      chips: [{ label: 'Pre-image', key: 'proj_tag.preimage' }, { label: 'Graph Kernels', key: 'proj_tag.graph_kernels' }, { label: 'GED', key: 'proj_tag.ged' }],
      links: [
        { label: 'Funding', href: 'https://anr.fr/en/funded-projects-and-impact/funded-projects/project/funded/project/b2d9d3668f92a3b9fbbf7866072501ef-42fc4c7786/?tx_anrprojects_funded%5Bcontroller%5D=Funded&cHash=9e18367cdd653e41d2cee1ac6fcd8e0e', icon: 'fas fa-file-signature', key: 'proj_link.funding' },
        { label: 'Project page', href: 'https://projets.litislab.fr/api/', icon: 'fas fa-globe', key: 'proj_link.project_page' },
        { label: 'Papers', href: '#publications', icon: 'fas fa-file-lines', key: 'proj_link.papers' }
      ]
    }
  },
  {
    id: 'sdn', slug: 'sdn', year: 2014, priority: 50, featured: false, size: 'md',
    badge: 'academia', badgeText: 'Academia', date: '2014 - 2017',
    titleFull: 'Service-oriented Programmable Control and Scheduling for Software Defined Network', titleShort: 'SDN Control + Scheduling',
    tags: ['academia', 'industry'], tagLabels: ['ELM', 'SDN', 'Patent'],
    images: [{ src: 'res/figures/2016_patent_elm_google_patent_page.png', alt: 'Google Patents page for China patent CN106376041B on SDN mobility prediction using ELM' }],
    primaryHref: 'https://patents.google.com/patent/CN106376041B/en',
    show: { gallery: false, home: true },
    home: {
      chips: [{ label: 'ELM', key: 'proj_tag.elm' }, { label: 'SDN', key: 'proj_tag.sdn' }, { label: 'Patent', key: 'proj_tag.patent' }],
      links: [{ label: 'Patent', href: 'https://patents.google.com/patent/CN106376041B/en', icon: 'fas fa-certificate', key: 'proj_link.patent' }]
    }
  }
];
