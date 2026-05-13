# About — v1 (paragraph form, archived)

> **Language:** English | [中文](about_v1_old.zh.md)

> Snapshot of the paragraph-form **About Me** copy that ran on the homepage before the v3 round-3 rewrite (2026-04-24) into a tight headline + short bullet list.

## Master TOC

- [Why archived](#why-archived)
- [Original paragraphs (en)](#original-paragraphs-en)
    - [p1 — current role](#p1--current-role)
    - [p2 — academic background](#p2--academic-background)
    - [p3 — beyond academia](#p3--beyond-academia)
    - [p4 — what I'm looking for](#p4--what-im-looking-for)
- [Recovery notes](#recovery-notes)

## Why archived

The previous "About Me" rendered as four wall-of-text paragraphs (`about.p1` … `about.p4` in `locales/*.json`). For a recruiter scanning the site this read slowly and buried the proof points. The 2026-04-24 redesign replaced it with:

- one strong headline (`about.headline`)
- six short bullets with emoji + bolded keywords (`about.b1` … `about.b6`)
- a seventh "Open to roles" bullet (`about.b7`)

The original paragraphs were good prose — kept here so the long-form bio can still be reached if needed (CV cover letter, recruiter pitch, About-page expansion later).

## Original paragraphs (en)

### p1 — current role

> I am an **Advanced Postdoctoral Researcher** at the University of Bern, Switzerland, working at the [Pattern Recognition Group](https://prg.inf.unibe.ch/). My expertise spans **graph representation learning**, **spatio-temporal deep learning**, and **LLM-based AI systems**.

(Note: "Advanced" was dropped in the 2026-04-24 pass per Linlin's request.)

### p2 — academic background

> I received my Ph.D. in Computer Science in 2021 from the [LITIS Lab](https://www.litislab.fr/), INSA Rouen, Normandy University, France, under the supervision of Prof. [Paul Honeine](http://honeine.fr/wp/) and Prof. [Benoit Gaüzère](https://bgauzere.github.io/), focusing on graph machine learning and pattern recognition in chemoinformatics. Since then, I've contributed to projects in graph ML for computational chemistry (polymer optimization, redox prediction), document analysis (historical papyri, engineering drawings), and environmental science (river-temperature forecasting). I've supervised 20+ students and contributed to multiple scientific grants. Prior to that, I earned my **M.Sc. in Software Engineering** (2017) and **B.S. in Information Engineering** (2014), both from **Xi'an Jiaotong University**, China.

### p3 — beyond academia

> Beyond academia, I serve as the **key AI advisor** at N-Banker, a FinTech startup, where I lead AI strategy and LLM-agent development. I have also built and contributed to multiple open-source libraries, ML toolkits, and LLM-agent systems.

### p4 — what I'm looking for

> I am actively seeking **ML Research Scientist / Engineer** opportunities in both academia and industry, with a focus on graph-based learning, spatio-temporal learning, scientific computing, and AI-driven discovery and industrial applications.

## Recovery notes

If a future iteration wants the long form back:

- the live JSON keys are gone (`about.p1`–`about.p4` were removed in the 2026-04-24 batch); restore from this file or from `git show <pre-2026-04-24-commit>:locales/en.json`.
- mirror in `locales/zh.json` / `fr.json` / `de.json` was removed in the same batch — see `git log -- locales/en.json` for exact commit ranges.
- collaborator names that previously lived in an even older `about.p5` were already moved out (to project & publication cards) in task A2 — do **not** re-add a p5 here.
