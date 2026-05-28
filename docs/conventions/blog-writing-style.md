# Blog writing style — rules for Linlin's site

> **Language:** English | [中文](blog-writing-style.zh.md)
>
> How blog posts on this site must be written. Distilled from Linlin's explicit
> instructions in the "杂活 / chores_by_claude" Claude Code session (the fcitx5
> tutorial) and confirmed as a standing rule for Claude **and** this website.
> Claude MUST follow this when drafting or editing any `blog-posts/**` content.

## Master TOC

- [Voice & tone](#voice--tone)
- [Structure](#structure)
- [Make it reproducible](#make-it-reproducible)
- [Document our own design, not just the steps](#document-our-own-design-not-just-the-steps)
- [The AI-agent affordances](#the-ai-agent-affordances)
- [Authorship & person](#authorship--person)
- [Media & diagrams](#media--diagrams)
- [Bilingual delivery](#bilingual-delivery)
- [Checklist](#checklist)
- [Style references](#style-references)

## Voice & tone

- **Technical-blog voice, natural and personal.** Write like a practitioner
  sharing what they actually did, not a documentation generator.
- **De-AI the prose.** No filler, no throat-clearing, no padded transitions, not
  verbose. If a sentence does not add information, cut it. (Linlin's recurring
  note: "文风去 AI 化", "有点 ai 且啰嗦".)
- **Open with the problem**, first person, relatable. The fcitx5 post opens:
  *"I'd been using Sogou on Ubuntu, but…"*. Lead with the itch, then the fix.
- **Explain the *why* from real experience**, not just the *what*. Example: say
  why Wayland over Xorg because the author found it noticeably smoother (file
  manager, browser, IDE), not as an abstract claim.
- No em dashes in user-facing copy (site-wide rule); no emoji unless they carry
  real meaning.

## Structure

- **Multi-level table of contents.** The big structure must be obvious and easy
  to scan; a reader should find any part fast.
- Under that skeleton, the actual content is **very detailed** — every command,
  dependency, snippet, step, and gotcha spelled out.

## Make it reproducible

- A reader should be able to **copy-paste and follow blindly** to the same
  result. Every command, dependency, code block, and operation from our real
  process goes in, in order, with the small details that actually matter.
- Prefer copy-ready fenced code blocks (the blog renderer gives each a language
  label + copy button).

## Document our own design, not just the steps

- Detail **our own configuration and design choices**: what we changed, **why**
  (the rationale), and **where** (the exact files / code / locations).
- Cover the **resources** we used and **how they were made** — e.g. the running
  dog asset was "Claude Code first draft + Claude design polish"; fonts; the
  UniBE colour source and how we adjusted it.
- **Package / point to every asset.** If an asset needs to be inserted or
  referenced separately, say so explicitly and ask Linlin to confirm / supply it
  rather than inventing it.

## The AI-agent affordances

- **Start with an AI prompt** a reader can paste into an AI agent to drive the
  whole tutorial.
- Include a short paragraph addressed **to an AI agent**, telling it to read the
  article's URL directly (or paste the rest), so the post doubles as an
  agent-runnable script.
- Teach readers to **reproduce the customisations themselves**: first list what
  is configurable (assets, background colour, fonts, every change we made), then
  exactly how to change each. Write it so an AI agent can follow it directly,
  and say so.

## Authorship & person

- **Separate the human author from Claude in every personal reference.** The
  author byline is the human + "Claude Code (Opus 4.7)".
- Phrase human-specific facts as the human author: e.g. not "I study at the
  University of Bern" but "the post's human author works at the University of
  Bern at this time".
- Authorship status is honest (see the registry's `translationStatus` ladder:
  `ai` / `ai_edited` / `checked` / `human`). AI-drafted, human-edited but
  unreviewed = `ai_edited`, surfaced as "AI draft · edited, unreviewed".

## Media & diagrams

- **Image + text throughout.** Reuse the real screenshots from the work where
  they help; place them next to the step they illustrate.
- **Architecture / flow diagrams use Mermaid or SVG**, authored in the post (the
  renderer supports ` ```mermaid ` fenced blocks), not raster mockups.

## Bilingual delivery

- Ship **Chinese and English as two files** (`blog-posts/<slug>/zh.md` +
  `en.md`), registered in `blog-posts/registry.json`.
- Destination is the site blog **and** Zhihu (知乎) — keep the prose portable to
  both.

## Checklist

Before a post is "done", confirm:

- [ ] Problem-first, first-person opening
- [ ] Multi-level TOC + scannable structure
- [ ] Every command / dep / step copy-pasteable, in order
- [ ] Our config + design choices documented (what / why / where)
- [ ] All assets included or explicitly flagged for Linlin to supply
- [ ] "How to make this yourself" section (configurable list, then how-to)
- [ ] AI prompt at the top + an agent-read-this-URL paragraph
- [ ] Human author vs Claude disambiguated everywhere
- [ ] Diagrams in Mermaid / SVG; relevant screenshots placed inline
- [ ] zh + en files registered; honest `translationStatus`
- [ ] De-AI'd: no filler, not verbose, no em dashes, no decorative emoji

## Style references

The author's own Zhihu posts set the target voice:

- <https://zhuanlan.zhihu.com/p/717690930>
- <https://zhuanlan.zhihu.com/p/716667966>
- <https://zhuanlan.zhihu.com/p/634250809>
