# About me — Backup before V12 restructure (2026-04-29)

> Snapshot of the `#about` section state immediately before the A1+B1+C1+D1+E1
> overhaul (9 bullets → 5, mixed font, tighter spacing, mobile stats reorder).

## How to restore

Three restore paths, fastest first:

1. **Git** — `git diff HEAD css/parchment-overrides.css index_parchment.html locales/`
   then `git checkout HEAD -- <file>` for the file you want back.
2. **Manual paste** — copy the blocks below into the matching files.
3. **i18n re-derive** — only `en.json` + `zh.json` are essential; `fr.json` /
   `de.json` can be re-translated from those.

## Master TOC

- [How to restore](#how-to-restore)
- [HTML — `#about` section (index_parchment.html line 1100–1132)](#html--about-section-index_parchmenthtml-line-11001132)
- [CSS — relevant rules (parchment-overrides.css)](#css--relevant-rules-parchment-overridescss)
- [i18n — `about` blocks for all 4 locales](#i18n--about-blocks-for-all-4-locales)
  - [en.json](#enjson)
  - [zh.json](#zhjson)
  - [fr.json](#frjson)
  - [de.json](#dejson)

## HTML — `#about` section (index_parchment.html line 1100–1132)

```html
<section class="section" id="about">
    <div class="container">
        <h2 class="section-title"><i class="fas fa-user" aria-hidden="true"></i> <span data-i18n="sections.about">About Me</span></h2>
        <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 2rem; align-items: start;">
            <div>
                <p class="about-headline" data-i18n-html="about.headline">
                    Building <strong>graph representation learning</strong> across domains: <strong>open-source tools</strong>, <strong>models</strong>, and <strong>AI systems</strong> for research &amp; industry.
                </p>
                <ul class="about-bullets">
                    <li data-i18n-html="about.b1"><span class="about-emoji" aria-hidden="true">📍</span> <a href="https://prg.inf.unibe.ch/" target="_blank" rel="noopener">🇨🇭 Pattern Recognition Group (PRG), University of Bern</a>: <strong>Postdoc</strong>.</li>
                    <li data-i18n-html="about.b2"><span class="about-emoji" aria-hidden="true">🧠</span> Academic focus: <strong>graph representation learning</strong>: graph kernels, graph edit distances, GNNs, transformers, pre-image &amp; generation.</li>
                    <li data-i18n-html="about.b3"><span class="about-emoji" aria-hidden="true">🧪</span> Application focus: <strong>redox potential prediction</strong> (foundation for drug discovery &amp; polymer optimization), <strong>spatio-temporal hydrology</strong> (Swiss river water temperature), and <strong>engineering diagram analysis</strong> (<a href="https://www.aramis.admin.ch/Grunddaten/?ProjectID=53900" target="_blank" rel="noopener">PLANALYSER</a>).</li>
                    <li data-i18n-html="about.b4"><span class="about-emoji" aria-hidden="true">🤝</span> Industry collaborations: <strong>AI strategy &amp; LLM agents</strong> with <strong>N-Banker</strong> FinTech startup; <strong>HVAC-concept audit</strong> with <a href="https://www.startup.ch/WATTELSE" target="_blank" rel="noopener">WATTELSE</a> (PLANALYSER).</li>
                    <li data-i18n-html="about.b5"><span class="about-emoji" aria-hidden="true">🛠</span> Open-source libraries: <a href="https://github.com/jajupmochi/graphkit-learn" target="_blank" rel="noopener"><code>graphkit-learn</code></a>, <a href="https://github.com/jajupmochi/liulian-python" target="_blank" rel="noopener"><code>liulian</code></a>, <a href="https://github.com/jajupmochi/RedoxPrediction" target="_blank" rel="noopener"><code>redoxprediction</code></a>, etc.</li>
                    <li data-i18n-html="about.b6"><span class="about-emoji" aria-hidden="true">🎓</span> Ph.D. (2021), <a href="https://www.litislab.fr/" target="_blank" rel="noopener">🇫🇷 LITIS Lab</a>, INSA Rouen: thesis <em>Apprivoiser la Pré-image</em>: graph kernels, graph edit distances &amp; ML for structured data (advisors: <a href="http://honeine.fr/wp/" target="_blank" rel="noopener">Prof. Paul Honeine</a> &amp; <a href="https://bgauzere.github.io/" target="_blank" rel="noopener">Prof. Benoit Gaüzère</a>).</li>
                    <li data-i18n-html="about.b7"><span class="about-emoji" aria-hidden="true">🎓</span> M.Sc. Software Engineering (2017) &amp; B.Sc. Information Engineering (2014), <strong>🇨🇳 Xi'an Jiaotong University</strong>, China.</li>
                    <li data-i18n-html="about.b8"><span class="about-emoji" aria-hidden="true">👥</span> Supervised <strong>20+ students</strong> and co-led / participated in <strong>multiple SNSF, Innosuisse, ANR, and UniBE-funded projects</strong>.</li>
                    <li data-i18n-html="about.b9"><span class="about-emoji" aria-hidden="true">🎯</span> Open to <strong>ML Research Scientist / Research Engineer</strong> roles: academia &amp; industry, on-site / hybrid / remote.</li>
                </ul>
            </div>
            <div class="stats-grid" style="grid-template-columns: repeat(2, 1fr);">
                <div class="stat-card"><div class="stat-number">9</div><div class="stat-label" data-i18n="stats.publications">Publications</div></div>
                <div class="stat-card"><div class="stat-number">8+</div><div class="stat-label" data-i18n="stats.projects">Projects</div></div>
                <div class="stat-card"><div class="stat-number">5+</div><div class="stat-label" data-i18n="stats.grants">Grants</div></div>
                <div class="stat-card"><div class="stat-number">15+</div><div class="stat-label" data-i18n="stats.collaborations">Collaborators</div></div>
                <div class="stat-card"><div class="stat-number">20+</div><div class="stat-label" data-i18n="stats.students">Students Mentored</div></div>
                <div class="stat-card"><div class="stat-number">8+</div><div class="stat-label" data-i18n="stats.years">Industry Experience</div></div>
                <div class="stat-card"><div class="stat-number">130</div><div class="stat-label" data-i18n="stats.citations">Citations</div></div>
                <div class="stat-card"><div class="stat-number">6</div><div class="stat-label" data-i18n="stats.h_index">H-index</div></div>
            </div>
        </div>
    </div>
</section>
```

## CSS — relevant rules (parchment-overrides.css)

These are the exact rules in effect just before the restructure. If you only
restore the HTML you may also want to revert these (or leave them — the new
CSS will scope itself to a different selector tree).

```css
/* ----- Ph1.A — body / list / stat font sizes ----- */
.about-bullets > li {
    font-size: 1.10em !important;       /* was implicit 1.25em → 24.6px; now ~19.3px */
    line-height: 1.75 !important;
    margin-bottom: 0.45em !important;
}
.stat-label, .stat-card .stat-label,
.stats .label, .stat .label {
    font-size: 15.5px !important;       /* was 13.6px — readable under big numbers */
    color: oklch(0.42 0.05 30) !important;
    opacity: 0.95 !important;
}

/* From line 832-839 — font inheritance hand-off */
.news-content, .news-content *, .news-row,
.contact-details, .contact-details *,
.about-bullets, .about-bullets *,
.timeline-card *, .pub-card *, .project-card *,
.award-card *, .talk-card *, .stat-card * {
    font-family: inherit;
}

/* From line 583-595 — strong / em ink-bleed treatment (applies to .about-bullets strong) */
strong, b, em, .news-content strong, .pub-card strong, .pub-card em,
.about-text strong, .timeline-card strong, .stat-card strong,
.hero-subtitle strong, .hero-tagline strong,
.about-bullets strong, .news-content em,
.skill-tag.highlight, .award-card strong, .talk-card strong {
    color: var(--maroon-orig) !important;
    font-weight: 800 !important;
    text-shadow:
         0   0   2.5px rgba(120, 30, 30, 0.55),
         0   1px 1px   rgba(60, 10, 10, 0.5) !important;
}
```

## i18n — `about` blocks for all 4 locales

### en.json

```json
"about": {
  "p1": "I am a <strong>Postdoctoral Researcher</strong> at the University of Bern, Switzerland, working at the <a href=\"https://prg.inf.unibe.ch/\" target=\"_blank\" rel=\"noopener\">Pattern Recognition Group</a>. My expertise spans <strong>graph representation learning</strong>, <strong>spatio-temporal deep learning</strong>, and <strong>LLM-based AI systems</strong>.",
  "p2": "I received my Ph.D. in Computer Science in 2021 from the <a href=\"https://www.litislab.fr/\" target=\"_blank\" rel=\"noopener\">LITIS Lab</a>, INSA Rouen, Normandy University, France, under the supervision of Prof. <a href=\"http://honeine.fr/wp/\" target=\"_blank\" rel=\"noopener\">Paul Honeine</a> and Prof. <a href=\"https://bgauzere.github.io/\" target=\"_blank\" rel=\"noopener\">Benoit Gaüzère</a>, focusing on graph machine learning and pattern recognition in chemoinformatics. Since then, I've contributed to projects in graph ML for computational chemistry (polymer optimization, redox prediction), document analysis (historical papyri, engineering drawings), and environmental science (river-temperature forecasting). I've supervised 20+ students and contributed to multiple scientific grants. Prior to that, I earned my <strong>M.Sc. in Software Engineering</strong> (2017) and <strong>B.S. in Information Engineering</strong> (2014), both from <strong>Xi'an Jiaotong University</strong>, China.",
  "p3": "Beyond academia, I serve as the <strong>key AI advisor</strong> at N-Banker, a FinTech startup, where I lead AI strategy and LLM-agent development. I have also built and contributed to multiple open-source libraries, ML toolkits, and LLM-agent systems.",
  "p4": "I am actively seeking <strong>ML Research Scientist / Engineer</strong> opportunities in both academia and industry, with a focus on graph-based learning, spatio-temporal learning, scientific computing, and AI-driven discovery and industrial applications.",
  "headline": "Building <strong>graph representation learning</strong> across domains: <strong>open-source tools</strong>, <strong>models</strong>, and <strong>AI systems</strong> for research &amp; industry.",
  "b1": "<span class=\"about-emoji\" aria-hidden=\"true\">📍</span> <a href=\"https://prg.inf.unibe.ch/\" target=\"_blank\" rel=\"noopener\">🇨🇭 Pattern Recognition Group (PRG), University of Bern</a>: <strong>Postdoc</strong>.",
  "b2": "<span class=\"about-emoji\" aria-hidden=\"true\">🧠</span> Academic focus: <strong>graph representation learning</strong>: graph kernels, graph edit distances, GNNs, transformers, pre-image &amp; generation.",
  "b3": "<span class=\"about-emoji\" aria-hidden=\"true\">🧪</span> Application focus: <strong>redox potential prediction</strong> (foundation for drug discovery &amp; polymer optimization), <strong>spatio-temporal hydrology</strong> (Swiss river water temperature), and <strong>engineering diagram analysis</strong> (<a href=\"https://www.aramis.admin.ch/Grunddaten/?ProjectID=53900\" target=\"_blank\" rel=\"noopener\">PLANALYSER</a>).",
  "b4": "<span class=\"about-emoji\" aria-hidden=\"true\">🤝</span> Industry collaborations: <strong>AI strategy &amp; LLM agents</strong> with <strong>N-Banker</strong> FinTech startup; <strong>HVAC-concept audit</strong> with <a href=\"https://www.startup.ch/WATTELSE\" target=\"_blank\" rel=\"noopener\">WATTELSE</a> (PLANALYSER).",
  "b5": "<span class=\"about-emoji\" aria-hidden=\"true\">🛠</span> Open-source libraries: <a href=\"https://github.com/jajupmochi/graphkit-learn\" target=\"_blank\" rel=\"noopener\"><code>graphkit-learn</code></a>, <a href=\"https://github.com/jajupmochi/liulian-python\" target=\"_blank\" rel=\"noopener\"><code>liulian</code></a>, <a href=\"https://github.com/jajupmochi/RedoxPrediction\" target=\"_blank\" rel=\"noopener\"><code>RedoxPrediction</code></a>, etc.",
  "b6": "<span class=\"about-emoji\" aria-hidden=\"true\">🎓</span> Ph.D. (2021), <a href=\"https://www.litislab.fr/\" target=\"_blank\" rel=\"noopener\">🇫🇷 LITIS Lab</a>, INSA Rouen: thesis <em>Bridging graph and kernel spaces: a pre-image perspective</em>: graph kernels, graph edit distances &amp; ML for structured data (advisors: <a href=\"http://honeine.fr/wp/\" target=\"_blank\" rel=\"noopener\">Prof. Paul Honeine</a> &amp; <a href=\"https://bgauzere.github.io/\" target=\"_blank\" rel=\"noopener\">Prof. Benoit Gaüzère</a>).",
  "b7": "<span class=\"about-emoji\" aria-hidden=\"true\">🎓</span> M.Sc. Software Engineering (2017) &amp; B.Sc. Information Engineering (2014), <strong>🇨🇳 Xi'an Jiaotong University</strong>, China.",
  "b8": "<span class=\"about-emoji\" aria-hidden=\"true\">👥</span> Supervised <strong>20+ students</strong> and participated in / applied for <strong>multiple SNSF, Innosuisse, ANR, and UniBE-funded projects</strong>.",
  "b9": "<span class=\"about-emoji\" aria-hidden=\"true\">🎯</span> Open to <strong>ML Research Scientist / Research Engineer</strong> roles: academia &amp; industry, on-site / hybrid / remote."
}
```

### zh.json

```json
"about": {
  "p1": "我是瑞士<strong>伯尔尼大学博士后研究员</strong>，在<a href=\"https://prg.inf.unibe.ch/\" target=\"_blank\" rel=\"noopener\">模式识别组</a>从事 SNSF 资助的研究。研究方向涵盖<strong>图表示学习</strong>、<strong>时空深度学习</strong>以及<strong>基于大语言模型的 AI 系统</strong>。",
  "p2": "我于 2021 年在法国诺曼底大学国立鲁昂应用科学学院 <a href=\"https://www.litislab.fr/\" target=\"_blank\" rel=\"noopener\">LITIS 实验室</a>获得计算机科学博士学位，师从 <a href=\"http://honeine.fr/wp/\" target=\"_blank\" rel=\"noopener\">Paul Honeine</a> 教授与 <a href=\"https://bgauzere.github.io/\" target=\"_blank\" rel=\"noopener\">Benoit Gaüzère</a> 教授，聚焦于图机器学习与化学信息学中的模式识别。此后，我先后参与了多个项目：计算化学方向的图机器学习（聚合物优化、氧化还原预测）、文档分析（古代莎草纸、工程图纸）以及环境科学（河水温度预测）。我已指导 20 余位学生，并参与多项科研基金。此前，我于 2017 年获得<strong>软件工程硕士学位</strong>，于 2014 年获得<strong>信息工程学士学位</strong>，均毕业于<strong>西安交通大学</strong>。",
  "p3": "学术之外，我在金融科技创业公司 N-Banker 担任<strong>关键 AI 顾问</strong>，主导 AI 战略与大模型智能体研发。我也构建并参与过多个开源库、机器学习工具箱与 LLM 智能体系统。",
  "p4": "我正在积极寻求学术界与工业界的<strong>机器学习研究科学家 / 工程师</strong>职位，聚焦于图机器学习、时空学习、科学计算与 AI 驱动的科学发现及工业应用。",
  "headline": "从事<strong>图表示学习</strong>研究及跨领域应用，构建<strong>开源工具</strong>、<strong>模型</strong>以及面向研究与产业的 <strong>AI 系统</strong>。",
  "b1": "<span class=\"about-emoji\" aria-hidden=\"true\">📍</span> <a href=\"https://prg.inf.unibe.ch/\" target=\"_blank\" rel=\"noopener\">🇨🇭 伯尔尼大学模式识别研究组（PRG）</a>，<strong>博士后</strong>。",
  "b2": "<span class=\"about-emoji\" aria-hidden=\"true\">🧠</span> 学术方向：<strong>图表示学习</strong>，涵盖图核、图编辑距离、图神经网络、Transformer，以及图预映射与生成。",
  "b3": "<span class=\"about-emoji\" aria-hidden=\"true\">🧪</span> 应用方向：<strong>氧化还原电位预测</strong>（药物发现与聚合物优化的前置基座工作）、<strong>时空水文学</strong>（瑞士河流水温预测）以及<strong>工程图分析</strong>（<a href=\"https://www.aramis.admin.ch/Grunddaten/?ProjectID=53900\" target=\"_blank\" rel=\"noopener\">PLANALYSER</a>）。",
  "b4": "<span class=\"about-emoji\" aria-hidden=\"true\">🤝</span> 产业合作：与 <strong>N-Banker</strong> 金融科技初创合作，主导 <strong>AI 策略与 LLM Agent</strong>；与 <a href=\"https://www.startup.ch/WATTELSE\" target=\"_blank\" rel=\"noopener\">WATTELSE</a> 合作 <strong>暖通空调方案审核</strong>（PLANALYSER）。",
  "b5": "<span class=\"about-emoji\" aria-hidden=\"true\">🛠</span> 开源库：<a href=\"https://github.com/jajupmochi/graphkit-learn\" target=\"_blank\" rel=\"noopener\"><code>graphkit-learn</code></a>、<a href=\"https://github.com/jajupmochi/liulian-python\" target=\"_blank\" rel=\"noopener\"><code>liulian</code></a>、<a href=\"https://github.com/jajupmochi/RedoxPrediction\" target=\"_blank\" rel=\"noopener\"><code>RedoxPrediction</code></a> 等。",
  "b6": "<span class=\"about-emoji\" aria-hidden=\"true\">🎓</span> 博士（2021），<a href=\"https://www.litislab.fr/\" target=\"_blank\" rel=\"noopener\">🇫🇷 LITIS 实验室</a>，法国鲁昂 INSA。博士论文 <em>桥接图结构与核空间：预映射视角</em>：聚焦图核、图编辑距离与结构化数据的机器学习（导师：<a href=\"http://honeine.fr/wp/\" target=\"_blank\" rel=\"noopener\">Paul Honeine 教授</a> 与 <a href=\"https://bgauzere.github.io/\" target=\"_blank\" rel=\"noopener\">Benoit Gaüzère 教授</a>）。",
  "b7": "<span class=\"about-emoji\" aria-hidden=\"true\">🎓</span> 软件工程硕士（2017）与信息工程学士（2014），<strong>🇨🇳 西安交通大学</strong>。",
  "b8": "<span class=\"about-emoji\" aria-hidden=\"true\">👥</span> 指导 <strong>20+ 学生</strong>，参与 / 申请 <strong>多项 SNSF、Innosuisse、ANR 与伯尔尼大学基金项目</strong>。",
  "b9": "<span class=\"about-emoji\" aria-hidden=\"true\">🎯</span> 求职方向：<strong>机器学习研究科学家 / 研究工程师</strong>（学界与产业；现场 / 混合 / 远程均可）。"
}
```

### fr.json

```json
"about": {
  "p1": "Je suis <strong>chercheur postdoctoral avancé</strong> à l'Université de Berne, en Suisse, au sein du <a href=\"https://prg.inf.unibe.ch/\" target=\"_blank\" rel=\"noopener\">groupe Pattern Recognition</a>. Mon expertise couvre <strong>l'apprentissage de représentations sur graphes</strong>, <strong>l'apprentissage profond spatio-temporel</strong> et les <strong>systèmes d'IA basés sur les LLM</strong>.",
  "p2": "J'ai obtenu mon doctorat en informatique en 2021 au <a href=\"https://www.litislab.fr/\" target=\"_blank\" rel=\"noopener\">laboratoire LITIS</a>, INSA Rouen, Université de Normandie (France), sous la direction des Prof. <a href=\"http://honeine.fr/wp/\" target=\"_blank\" rel=\"noopener\">Paul Honeine</a> et <a href=\"https://bgauzere.github.io/\" target=\"_blank\" rel=\"noopener\">Benoit Gaüzère</a>, en me concentrant sur le machine learning sur graphes et la reconnaissance de motifs en chimio-informatique. Depuis, j'ai contribué à des projets en ML sur graphes pour la chimie computationnelle (optimisation de polymères, prédiction redox), l'analyse de documents (papyri anciens, plans techniques) et les sciences de l'environnement (prévision de température des rivières). J'ai encadré plus de 20 étudiant·e·s et contribué à plusieurs financements scientifiques. Auparavant, j'ai obtenu mon <strong>M.Sc. en génie logiciel</strong> (2017) et ma <strong>licence en génie de l'information</strong> (2014), tous deux à l'<strong>Université Jiaotong de Xi'an</strong>, en Chine.",
  "p3": "Au-delà du monde académique, j'interviens comme <strong>conseiller IA clé</strong> chez N-Banker, une startup FinTech, où je pilote la stratégie IA et le développement d'agents LLM. J'ai également conçu et contribué à plusieurs bibliothèques open source, boîtes à outils ML et systèmes d'agents LLM.",
  "p4": "Je recherche activement des opportunités de <strong>ML Research Scientist / Engineer</strong>, en milieu académique comme industriel, avec un accent sur l'apprentissage sur graphes, l'apprentissage spatio-temporel, le calcul scientifique, et la découverte et les applications industrielles pilotées par l'IA.",
  "headline": "Recherche en <strong>apprentissage de représentations sur graphes</strong> et applications inter-domaines: <strong>outils open source</strong>, <strong>modèles</strong> et <strong>systèmes IA</strong> pour la recherche &amp; l'industrie.",
  "b1": "<span class=\"about-emoji\" aria-hidden=\"true\">📍</span> <a href=\"https://prg.inf.unibe.ch/\" target=\"_blank\" rel=\"noopener\">🇨🇭 Pattern Recognition Group (PRG), Université de Berne</a>: <strong>Postdoc</strong>.",
  "b2": "<span class=\"about-emoji\" aria-hidden=\"true\">🧠</span> Axe académique : <strong>apprentissage de représentations sur graphes</strong>: noyaux de graphes, distances d'édition, GNN, transformers, pré-image &amp; génération.",
  "b3": "<span class=\"about-emoji\" aria-hidden=\"true\">🧪</span> Axe applicatif : <strong>prédiction de potentiel redox</strong> (base pour découverte de médicaments &amp; optimisation de polymères), <strong>hydrologie spatio-temporelle</strong> (température des rivières suisses) et <strong>analyse de schémas d'ingénierie</strong> (<a href=\"https://www.aramis.admin.ch/Grunddaten/?ProjectID=53900\" target=\"_blank\" rel=\"noopener\">PLANALYSER</a>).",
  "b4": "<span class=\"about-emoji\" aria-hidden=\"true\">🤝</span> Collaborations industrielles : <strong>stratégie IA &amp; agents LLM</strong> avec la startup FinTech <strong>N-Banker</strong> ; <strong>audit de concepts CVC</strong> avec <a href=\"https://www.startup.ch/WATTELSE\" target=\"_blank\" rel=\"noopener\">WATTELSE</a> (PLANALYSER).",
  "b5": "<span class=\"about-emoji\" aria-hidden=\"true\">🛠</span> Bibliothèques open source : <a href=\"https://github.com/jajupmochi/graphkit-learn\" target=\"_blank\" rel=\"noopener\"><code>graphkit-learn</code></a>, <a href=\"https://github.com/jajupmochi/liulian-python\" target=\"_blank\" rel=\"noopener\"><code>liulian</code></a>, <a href=\"https://github.com/jajupmochi/RedoxPrediction\" target=\"_blank\" rel=\"noopener\"><code>RedoxPrediction</code></a>, etc.",
  "b6": "<span class=\"about-emoji\" aria-hidden=\"true\">🎓</span> Doctorat (2021), <a href=\"https://www.litislab.fr/\" target=\"_blank\" rel=\"noopener\">🇫🇷 LITIS Lab</a>, INSA Rouen: thèse <em>Construire un pont entre graphes et noyaux : une perspective de pré-image</em> : noyaux de graphes, distances d'édition &amp; ML pour données structurées (directeurs : <a href=\"http://honeine.fr/wp/\" target=\"_blank\" rel=\"noopener\">Prof. Paul Honeine</a> &amp; <a href=\"https://bgauzere.github.io/\" target=\"_blank\" rel=\"noopener\">Prof. Benoit Gaüzère</a>).",
  "b7": "<span class=\"about-emoji\" aria-hidden=\"true\">🎓</span> M.Sc. en génie logiciel (2017) &amp; Licence en génie de l'information (2014), <strong>🇨🇳 Université Jiaotong de Xi'an</strong>, Chine.",
  "b8": "<span class=\"about-emoji\" aria-hidden=\"true\">👥</span> Encadrement de <strong>20+ étudiants</strong> ; participation / candidature à <strong>plusieurs projets financés par SNSF, Innosuisse, ANR et UniBE</strong>.",
  "b9": "<span class=\"about-emoji\" aria-hidden=\"true\">🎯</span> Disponible pour postes de <strong>ML Research Scientist / Research Engineer</strong>: académique &amp; industrie, sur site / hybride / à distance."
}
```

### de.json

```json
"about": {
  "p1": "Ich bin <strong>Postdoctoral Researcher</strong> an der Universität Bern, Schweiz, und arbeite in der <a href=\"https://prg.inf.unibe.ch/\" target=\"_blank\" rel=\"noopener\">Pattern Recognition Group</a>. Meine Expertise umfasst <strong>Graph-Repräsentationslernen</strong>, <strong>räumlich-zeitliches Deep Learning</strong> und <strong>LLM-basierte KI-Systeme</strong>.",
  "p2": "Meinen Ph.D. in Informatik habe ich 2021 am <a href=\"https://www.litislab.fr/\" target=\"_blank\" rel=\"noopener\">LITIS Lab</a> der INSA Rouen, Normandy University (Frankreich) erworben: unter Betreuung von Prof. <a href=\"http://honeine.fr/wp/\" target=\"_blank\" rel=\"noopener\">Paul Honeine</a> und Prof. <a href=\"https://bgauzere.github.io/\" target=\"_blank\" rel=\"noopener\">Benoit Gaüzère</a>, mit Fokus auf Graph-Machine-Learning und Mustererkennung in der Chemieinformatik. Seither habe ich an Projekten zu Graph-ML für Computerchemie (Polymeroptimierung, Redox-Vorhersage), Dokumentenanalyse (historische Papyri, Konstruktionszeichnungen) und Umweltwissenschaften (Flusswassertemperatur-Prognose) mitgewirkt. Ich habe über 20 Studierende betreut und zu mehreren Drittmittelprojekten beigetragen. Zuvor erwarb ich meinen <strong>M.Sc. in Software Engineering</strong> (2017) und meinen <strong>B.Sc. in Information Engineering</strong> (2014), beide an der <strong>Xi'an Jiaotong University</strong>, China.",
  "p3": "Neben der Wissenschaft wirke ich als <strong>Key AI Advisor</strong> bei N-Banker, einem FinTech-Startup, und verantworte dort die KI-Strategie und die Entwicklung von LLM-Agenten. Darüber hinaus habe ich mehrere Open-Source-Bibliotheken, ML-Toolkits und LLM-Agent-Systeme aufgebaut bzw. dazu beigetragen.",
  "p4": "Ich suche aktiv <strong>ML Research Scientist / Engineer</strong>-Positionen in Wissenschaft und Industrie: mit Schwerpunkt auf graphbasiertem Lernen, raumzeitlichem Lernen, wissenschaftlichem Rechnen sowie KI-gestützter Entdeckung und industriellen Anwendungen.",
  "headline": "Forschung zu <strong>Graph-Repräsentationslernen</strong> und domänenübergreifenden Anwendungen: <strong>Open-Source-Tools</strong>, <strong>Modelle</strong> und <strong>KI-Systeme</strong> für Wissenschaft &amp; Industrie.",
  "b1": "<span class=\"about-emoji\" aria-hidden=\"true\">📍</span> <a href=\"https://prg.inf.unibe.ch/\" target=\"_blank\" rel=\"noopener\">🇨🇭 Pattern Recognition Group (PRG), Universität Bern</a>: <strong>Postdoc</strong>.",
  "b2": "<span class=\"about-emoji\" aria-hidden=\"true\">🧠</span> Akademischer Schwerpunkt: <strong>Graph-Repräsentationslernen</strong>: Graph-Kerne, Graph-Edit-Distanzen, GNNs, Transformer, Pre-Image &amp; Generierung.",
  "b3": "<span class=\"about-emoji\" aria-hidden=\"true\">🧪</span> Anwendungsschwerpunkte: <strong>Redoxpotentialvorhersage</strong> (Grundlage für Wirkstoffforschung &amp; Polymeroptimierung), <strong>raumzeitliche Hydrologie</strong> (Schweizer Flusswassertemperaturen) und <strong>technische Zeichnungsanalyse</strong> (<a href=\"https://www.aramis.admin.ch/Grunddaten/?ProjectID=53900\" target=\"_blank\" rel=\"noopener\">PLANALYSER</a>).",
  "b4": "<span class=\"about-emoji\" aria-hidden=\"true\">🤝</span> Industriekooperationen: <strong>KI-Strategie &amp; LLM-Agenten</strong> mit dem FinTech-Startup <strong>N-Banker</strong>; <strong>HLK-Konzept-Audit</strong> mit <a href=\"https://www.startup.ch/WATTELSE\" target=\"_blank\" rel=\"noopener\">WATTELSE</a> (PLANALYSER).",
  "b5": "<span class=\"about-emoji\" aria-hidden=\"true\">🛠</span> Open-Source-Bibliotheken: <a href=\"https://github.com/jajupmochi/graphkit-learn\" target=\"_blank\" rel=\"noopener\"><code>graphkit-learn</code></a>, <a href=\"https://github.com/jajupmochi/liulian-python\" target=\"_blank\" rel=\"noopener\"><code>liulian</code></a>, <a href=\"https://github.com/jajupmochi/RedoxPrediction\" target=\"_blank\" rel=\"noopener\"><code>RedoxPrediction</code></a> usw.",
  "b6": "<span class=\"about-emoji\" aria-hidden=\"true\">🎓</span> Promotion (2021), <a href=\"https://www.litislab.fr/\" target=\"_blank\" rel=\"noopener\">🇫🇷 LITIS Lab</a>, INSA Rouen: Dissertation <em>Graph- und Kernräume verbinden: eine Pre-Image-Perspektive</em>: Graph-Kerne, Graph-Edit-Distanzen &amp; ML für strukturierte Daten (Betreuer: <a href=\"http://honeine.fr/wp/\" target=\"_blank\" rel=\"noopener\">Prof. Paul Honeine</a> &amp; <a href=\"https://bgauzere.github.io/\" target=\"_blank\" rel=\"noopener\">Prof. Benoit Gaüzère</a>).",
  "b7": "<span class=\"about-emoji\" aria-hidden=\"true\">🎓</span> M.Sc. Software Engineering (2017) &amp; B.Sc. Information Engineering (2014), <strong>🇨🇳 Xi'an Jiaotong University</strong>, China.",
  "b8": "<span class=\"about-emoji\" aria-hidden=\"true\">👥</span> Betreuung von <strong>20+ Studierenden</strong> ; Mitwirkung / Antragstellung an <strong>mehreren durch SNSF, Innosuisse, ANR und UniBE finanzierten Projekten</strong>.",
  "b9": "<span class=\"about-emoji\" aria-hidden=\"true\">🎯</span> Offen für <strong>ML Research Scientist / Research Engineer</strong>-Stellen: Akademie &amp; Industrie, vor Ort / hybrid / remote."
}
```
