/* ============================================================================
 * blog.js — static, client-rendered blog engine for jajupmochi.github.io
 *
 * Responsibilities:
 *   - Router: ?post=<slug> → single-post view; otherwise → index (post list).
 *   - i18n: UI chrome in en/zh/fr/de (URL ?lang= > localStorage > en).
 *   - Render Markdown (GFM) via marked, with:
 *       · GitHub-style heading anchor IDs (TOC links work)
 *       · highlight.js syntax highlighting
 *       · KaTeX math ($…$, $$…$$)
 *       · Mermaid diagrams (```mermaid fenced blocks)
 *       · relative image paths rewritten to blog-posts/<slug>/…
 *   - Per-post language availability + translation-status badges
 *     (human / AI-translated / AI+human-checked / pending).
 *
 * No build step: posts live as blog-posts/<slug>/<lang>.md and are fetched
 * and rendered in the browser, mirroring the site's locales/*.json pattern.
 * ========================================================================= */
(function () {
  'use strict';

  const REGISTRY_URL = 'blog-posts/registry.json';
  const SUPPORTED = ['en', 'zh', 'fr', 'de'];

  // ---- UI chrome strings (chrome only; post bodies come from .md files) ----
  const I18N = {
    en: {
      'blog.title': 'Blog',
      'blog.tagline': 'Notes on ML, tooling, and building things — written human × AI, in four languages.',
      'blog.nav_home': '← Home',
      'blog.back': '← All posts',
      'blog.loading': 'Loading posts…',
      'blog.foot_note': 'Built as a static, client-rendered blog — Markdown · LaTeX · Jupyter · Mermaid.',
      'blog.read': 'min read',
      'blog.available': 'Available in',
      'blog.fallback': 'Not translated to this language yet — showing {LANG}.',
      'blog.empty': 'No posts yet. Check back soon.',
      'blog.readmore': 'Read →',
      'blog.copy': 'Copy', 'blog.copied': 'Copied!', 'blog.contents': 'Contents',
      'st.human': 'human-written',
      'st.ai': 'AI-translated',
      'st.ai_edited': 'AI draft · edited, unreviewed',
      'st.checked': 'AI + human-checked',
      'st.pending': 'translation pending',
      'lang.en': 'English', 'lang.zh': '中文', 'lang.fr': 'Français', 'lang.de': 'Deutsch'
    },
    zh: {
      'blog.title': '博客',
      'blog.tagline': '关于机器学习、工具与折腾的笔记 —— 人类 × AI 合写，四种语言。',
      'blog.nav_home': '← 主页',
      'blog.back': '← 所有文章',
      'blog.loading': '正在加载文章…',
      'blog.foot_note': '纯静态、客户端渲染的博客 —— Markdown · LaTeX · Jupyter · Mermaid。',
      'blog.read': '分钟阅读',
      'blog.available': '可用语言',
      'blog.fallback': '本文尚未翻译为该语言 —— 显示{LANG}版本。',
      'blog.empty': '还没有文章，敬请期待。',
      'blog.readmore': '阅读 →',
      'blog.copy': '复制', 'blog.copied': '已复制!', 'blog.contents': '目录',
      'st.human': '人类撰写',
      'st.ai': 'AI 翻译',
      'st.ai_edited': 'AI 起草 · 人工编辑 · 未审阅',
      'st.checked': 'AI + 人类校验',
      'st.pending': '翻译待补',
      'lang.en': 'English', 'lang.zh': '中文', 'lang.fr': 'Français', 'lang.de': 'Deutsch'
    },
    fr: {
      'blog.title': 'Blog',
      'blog.tagline': 'Notes sur le ML, l\'outillage et le bricolage — écrites humain × IA, en quatre langues.',
      'blog.nav_home': '← Accueil',
      'blog.back': '← Tous les articles',
      'blog.loading': 'Chargement des articles…',
      'blog.foot_note': 'Blog statique rendu côté client — Markdown · LaTeX · Jupyter · Mermaid.',
      'blog.read': 'min de lecture',
      'blog.available': 'Disponible en',
      'blog.fallback': 'Pas encore traduit dans cette langue — affichage en {LANG}.',
      'blog.empty': 'Pas encore d\'articles. Revenez bientôt.',
      'blog.readmore': 'Lire →',
      'blog.copy': 'Copier', 'blog.copied': 'Copié !', 'blog.contents': 'Sommaire',
      'st.human': 'écrit par un humain',
      'st.ai': 'traduit par IA',
      'st.ai_edited': 'brouillon IA · édité, non relu',
      'st.checked': 'IA + vérifié par un humain',
      'st.pending': 'traduction à venir',
      'lang.en': 'English', 'lang.zh': '中文', 'lang.fr': 'Français', 'lang.de': 'Deutsch'
    },
    de: {
      'blog.title': 'Blog',
      'blog.tagline': 'Notizen zu ML, Tooling und Basteln — geschrieben Mensch × KI, in vier Sprachen.',
      'blog.nav_home': '← Startseite',
      'blog.back': '← Alle Beiträge',
      'blog.loading': 'Beiträge werden geladen…',
      'blog.foot_note': 'Statischer, clientseitig gerenderter Blog — Markdown · LaTeX · Jupyter · Mermaid.',
      'blog.read': 'Min. Lesezeit',
      'blog.available': 'Verfügbar in',
      'blog.fallback': 'Noch nicht in diese Sprache übersetzt — zeige {LANG}.',
      'blog.empty': 'Noch keine Beiträge. Schau bald wieder vorbei.',
      'blog.readmore': 'Lesen →',
      'blog.copy': 'Kopieren', 'blog.copied': 'Kopiert!', 'blog.contents': 'Inhalt',
      'st.human': 'von Menschen geschrieben',
      'st.ai': 'KI-übersetzt',
      'st.ai_edited': 'KI-Entwurf · bearbeitet, ungeprüft',
      'st.checked': 'KI + von Menschen geprüft',
      'st.pending': 'Übersetzung ausstehend',
      'lang.en': 'English', 'lang.zh': '中文', 'lang.fr': 'Français', 'lang.de': 'Deutsch'
    }
  };

  let lang = resolveLang();
  let registry = null;

  function resolveLang() {
    try {
      const u = new URLSearchParams(location.search).get('lang');
      if (u && SUPPORTED.includes(u)) return u;
    } catch (e) {}
    const saved = localStorage.getItem('language');
    if (saved && SUPPORTED.includes(saved)) return saved;
    const nav = (navigator.language || 'en').slice(0, 2);
    return SUPPORTED.includes(nav) ? nav : 'en';
  }

  function t(key) {
    return (I18N[lang] && I18N[lang][key]) || I18N.en[key] || key;
  }

  function applyChromeI18n() {
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const k = el.getAttribute('data-i18n');
      if (I18N[lang] && I18N[lang][k]) el.textContent = I18N[lang][k];
    });
    document.querySelectorAll('.blog-lang-switch button').forEach(b => {
      b.classList.toggle('active', b.dataset.lang === lang);
    });
  }

  // ---- Markdown rendering --------------------------------------------------
  // Configure marked exactly ONCE (repeated marked.use() corrupts parser state
  // in v12 → "parseInline of undefined"). Image base paths + mermaid handling
  // are done as DOM post-processing instead of renderer overrides.
  let markedReady = false;
  function ensureMarked() {
    if (markedReady) return;
    // NOTE: do NOT use marked-gfm-heading-id — its v4 build is incompatible with
    // marked v12's renderer API and corrupts the parser. We assign heading IDs
    // ourselves in postProcess() with a GitHub-compatible slugger (so the manual
    // TOC anchor links inside posts resolve correctly, incl. CJK headings).
    try { marked.setOptions({ gfm: true, breaks: false }); } catch (e) {}
    markedReady = true;
  }

  // Clipboard fallback for non-secure contexts / older browsers.
  function fallbackCopy(text, done) {
    try {
      const ta = document.createElement('textarea');
      ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      document.execCommand('copy'); document.body.removeChild(ta);
      if (done) done();
    } catch (e) {}
  }

  // GitHub-compatible heading slugger (matches github-slugger output, incl. CJK).
  function ghSlug(text) {
    return text.normalize('NFKD').toLowerCase().trim()
      .replace(/[^\p{L}\p{N}\p{M}\s-]/gu, '')  // keep letters/numbers/marks/space/hyphen
      .replace(/\s+/g, '-');
  }

  function renderMarkdown(md /*, slug */) {
    ensureMarked();
    return marked.parse(md);
  }

  function postProcess(container, slug) {
    const base = `blog-posts/${slug}/`;
    // -1. Assign GitHub-style heading IDs (dedup with -1/-2 suffixes) so in-post
    //     TOC anchor links work.
    const seen = {};
    container.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(h => {
      let id = ghSlug(h.textContent || '');
      if (!id) return;
      if (seen[id] != null) { seen[id]++; id = id + '-' + seen[id]; }
      else { seen[id] = 0; }
      h.id = id;
    });
    // 0. Rewrite relative image paths to the post's own asset folder.
    container.querySelectorAll('img').forEach(img => {
      const src = img.getAttribute('src') || '';
      if (src && !/^(https?:)?\/\//.test(src) && !src.startsWith('data:') && !src.startsWith('/') && !src.startsWith('blog-posts/')) {
        img.setAttribute('src', base + src);
      }
      img.setAttribute('loading', 'lazy');
    });
    // 1. Mermaid: convert <code class="language-mermaid"> into <div class="mermaid">
    container.querySelectorAll('pre code.language-mermaid, code.language-mermaid').forEach(code => {
      const pre = code.closest('pre') || code;
      const div = document.createElement('div');
      div.className = 'mermaid';
      div.textContent = code.textContent;
      pre.replaceWith(div);
    });
    // 2. Syntax highlight remaining code blocks
    if (window.hljs) {
      container.querySelectorAll('pre code').forEach(block => {
        try { hljs.highlightElement(block); } catch (e) {}
      });
    }
    // 2b. Code-block toolbar: language label (left) + copy button (right)
    container.querySelectorAll('pre').forEach(pre => {
      if (pre.querySelector('.code-bar')) return;
      const code = pre.querySelector('code');
      if (!code) return;
      let lng = '';
      const m = (code.className || '').match(/language-([\w+#.-]+)/i);
      if (m) lng = m[1];
      const bar = document.createElement('div');
      bar.className = 'code-bar';
      bar.contentEditable = 'false';
      const label = document.createElement('span');
      label.className = 'code-lang';
      label.textContent = lng || 'text';
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'code-copy';
      btn.textContent = t('blog.copy');
      btn.addEventListener('click', () => {
        const text = code.innerText.replace(/\n$/, '');
        const done = () => {
          btn.textContent = t('blog.copied');
          btn.classList.add('copied');
          setTimeout(() => { btn.textContent = t('blog.copy'); btn.classList.remove('copied'); }, 1600);
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(done).catch(() => fallbackCopy(text, done));
        } else { fallbackCopy(text, done); }
      });
      bar.appendChild(label);
      bar.appendChild(btn);
      pre.insertBefore(bar, pre.firstChild);
    });
    // 3. KaTeX math
    if (window.renderMathInElement) {
      try {
        renderMathInElement(container, {
          delimiters: [
            { left: '$$', right: '$$', display: true },
            { left: '$', right: '$', display: false },
            { left: '\\[', right: '\\]', display: true },
            { left: '\\(', right: '\\)', display: false }
          ],
          throwOnError: false
        });
      } catch (e) {}
    }
    // 4. Mermaid render
    if (window.mermaid) {
      try {
        mermaid.initialize({ startOnLoad: false, theme: 'neutral', securityLevel: 'strict' });
        mermaid.run({ nodes: container.querySelectorAll('.mermaid') });
      } catch (e) {}
    }
    // 5. External links open in new tab
    container.querySelectorAll('a[href^="http"]').forEach(a => {
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
    });
  }

  // ---- Views ---------------------------------------------------------------
  function statusBadge(status) {
    const map = { human: 'st.human', ai: 'st.ai', ai_edited: 'st.ai_edited', checked: 'st.checked', pending: 'st.pending' };
    const key = map[status] || 'st.pending';
    return `<span class="blog-badge blog-badge-${status}">${t(key)}</span>`;
  }

  function pickLang(post) {
    // Choose the content language: requested lang if available, else primary, else first.
    if (post.langs.includes(lang)) return lang;
    if (post.primaryLang && post.langs.includes(post.primaryLang)) return post.primaryLang;
    return post.langs[0];
  }

  function renderIndex() {
    document.getElementById('blogPost').hidden = true;
    resetChrome();   // hide TOC + reading-progress on the index
    const idx = document.getElementById('blogIndex');
    idx.hidden = false;
    const list = document.getElementById('blogPostList');
    if (!registry || !registry.posts || !registry.posts.length) {
      list.innerHTML = `<p class="blog-empty">${t('blog.empty')}</p>`;
      return;
    }
    const posts = registry.posts.slice().sort((a, b) => (b.date || '').localeCompare(a.date || ''));
    list.innerHTML = posts.map(p => {
      const cl = pickLang(p);
      const title = (p.title && (p.title[lang] || p.title[cl])) || p.slug;
      const excerpt = (p.excerpt && (p.excerpt[lang] || p.excerpt[cl])) || '';
      const cover = p.cover ? `blog-posts/${p.slug}/${p.cover}` : '';
      const rm = (p.readingMinutes && (p.readingMinutes[lang] || p.readingMinutes[cl])) || null;
      const tags = (p.tags || []).slice(0, 5).map(tg => `<span class="blog-tag">${tg}</span>`).join('');
      const status = (p.translationStatus && p.translationStatus[lang]) || null;
      const fallbackNote = (!p.langs.includes(lang))
        ? `<span class="blog-fallback-chip">${t('blog.fallback').replace('{LANG}', t('lang.' + cl))}</span>` : '';
      return `
        <a class="blog-card" href="blog.html?post=${encodeURIComponent(p.slug)}&lang=${lang}">
          ${cover ? `<div class="blog-card-cover"><img src="${cover}" alt="" loading="lazy"></div>` : ''}
          <div class="blog-card-body">
            <div class="blog-card-metarow">
              <time class="blog-card-date">${p.date || ''}</time>
              ${rm ? `<span class="blog-card-read">${rm} ${t('blog.read')}</span>` : ''}
              ${status ? statusBadge(status) : ''}
            </div>
            <h2 class="blog-card-title">${title}</h2>
            <p class="blog-card-excerpt">${excerpt}</p>
            <div class="blog-card-tags">${tags}</div>
            ${fallbackNote}
            <span class="blog-card-more">${t('blog.readmore')}</span>
          </div>
        </a>`;
    }).join('');
  }

  async function renderPost(slug) {
    const post = registry.posts.find(p => p.slug === slug);
    if (!post) { renderIndex(); return; }
    document.getElementById('blogIndex').hidden = true;
    const art = document.getElementById('blogPost');
    art.hidden = false;

    const cl = pickLang(post);
    const status = (post.translationStatus && post.translationStatus[cl]) || null;

    // Meta chips
    const rm = (post.readingMinutes && (post.readingMinutes[cl])) || null;
    const tags = (post.tags || []).map(tg => `<span class="blog-tag">${tg}</span>`).join('');
    document.getElementById('blogPostMeta').innerHTML = `
      <time class="blog-card-date">${post.date || ''}</time>
      ${post.author ? `<span class="blog-post-author">${post.author}</span>` : ''}
      ${rm ? `<span class="blog-card-read">${rm} ${t('blog.read')}</span>` : ''}
      ${status ? statusBadge(status) : ''}
      <div class="blog-card-tags">${tags}</div>`;

    // Language availability bar
    const langbar = document.getElementById('blogPostLangbar');
    const avail = post.langs.map(lc => {
      const st = (post.translationStatus && post.translationStatus[lc]) || '';
      const cls = (lc === cl) ? 'active' : '';
      return `<a class="blog-langpill ${cls}" href="blog.html?post=${encodeURIComponent(slug)}&lang=${lc}" title="${st ? t('st.' + statusKey(st)) : ''}">${t('lang.' + lc)}</a>`;
    }).join('');
    let fallbackMsg = '';
    if (cl !== lang) {
      fallbackMsg = `<p class="blog-fallback-note">${t('blog.fallback').replace('{LANG}', t('lang.' + cl))}</p>`;
    }
    langbar.innerHTML = `<span class="blog-avail-label">${t('blog.available')}:</span> ${avail} ${fallbackMsg}`;

    // Fetch + render the markdown
    const body = document.getElementById('blogPostBody');
    body.innerHTML = `<p class="blog-loading">${t('blog.loading')}</p>`;
    try {
      const res = await fetch(`blog-posts/${slug}/${cl}.md`, { cache: 'no-cache' });
      if (!res.ok) throw new Error('md fetch failed: ' + res.status);
      const md = await res.text();
      body.innerHTML = renderMarkdown(md, slug);
      postProcess(body, slug);
      buildTOC(body);          // floating table of contents + scroll-spy
      initReadingProgress();   // ink-trail progress bar
      // Title for browser tab
      const title = (post.title && (post.title[cl] || post.title[lang])) || slug;
      document.title = title + ' — Linlin Jia';
      // Scroll to anchor if present in hash
      if (location.hash) {
        const target = document.getElementById(location.hash.slice(1));
        if (target) target.scrollIntoView();
      }
    } catch (e) {
      body.innerHTML = `<p class="blog-error">Failed to load this post (${e.message}).</p>`;
    }
  }

  function statusKey(st) {
    return ({ human: 'human', ai: 'ai', ai_edited: 'ai_edited', checked: 'checked', pending: 'pending' })[st] || 'pending';
  }

  // ---- Table of contents (h2 + h3) + scroll-spy ---------------------------
  let tocObserver = null;
  function buildTOC(body) {
    const toc = document.getElementById('blogToc');
    const nav = document.getElementById('blogTocNav');
    if (!toc || !nav) return;
    const heads = [...body.querySelectorAll('h2, h3')].filter(h => h.id);
    if (heads.length < 2) { toc.hidden = true; return; }
    nav.innerHTML = heads.map(h =>
      `<a href="#${encodeURIComponent(h.id)}" class="toc-link toc-${h.tagName.toLowerCase()}" data-target="${h.id}">${h.textContent}</a>`
    ).join('');
    toc.hidden = false;
    // Collapsed by default on narrow screens (where it overlays content)
    if (window.innerWidth < 1180) toc.classList.add('collapsed');
    else toc.classList.remove('collapsed');
    // Smooth-scroll + active state on click
    nav.querySelectorAll('.toc-link').forEach(a => {
      a.addEventListener('click', (e) => {
        const el = document.getElementById(a.dataset.target);
        if (el) { e.preventDefault(); el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          history.replaceState(null, '', '#' + encodeURIComponent(a.dataset.target)); }
      });
    });
    // Scroll-spy: highlight the heading currently in view
    if (tocObserver) tocObserver.disconnect();
    const linkFor = {};
    nav.querySelectorAll('.toc-link').forEach(a => { linkFor[a.dataset.target] = a; });
    tocObserver = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        const a = linkFor[en.target.id];
        if (!a) return;
        if (en.isIntersecting) {
          nav.querySelectorAll('.toc-link.active').forEach(x => x.classList.remove('active'));
          a.classList.add('active');
        }
      });
    }, { rootMargin: '-80px 0px -70% 0px', threshold: 0 });
    heads.forEach(h => tocObserver.observe(h));
    // Collapse toggle
    const toggle = document.getElementById('blogTocToggle');
    if (toggle && !toggle.dataset.wired) {
      toggle.dataset.wired = '1';
      toggle.addEventListener('click', () => {
        const collapsed = toc.classList.toggle('collapsed');
        toggle.setAttribute('aria-expanded', String(!collapsed));
      });
    }
  }

  // ---- Reading progress (ink trail) ---------------------------------------
  let progressWired = false;
  function initReadingProgress() {
    const bar = document.getElementById('blogProgress');
    if (!bar) return;
    bar.classList.add('visible');
    const fill = bar.querySelector('i');
    const update = () => {
      const doc = document.documentElement;
      const max = (doc.scrollHeight - doc.clientHeight) || 1;
      const pct = Math.min(100, Math.max(0, (window.scrollY / max) * 100));
      if (fill) fill.style.width = pct + '%';
    };
    if (!progressWired) {
      window.addEventListener('scroll', update, { passive: true });
      window.addEventListener('resize', update, { passive: true });
      progressWired = true;
    }
    update();
  }
  function resetChrome() {
    const toc = document.getElementById('blogToc');
    if (toc) toc.hidden = true;
    const bar = document.getElementById('blogProgress');
    if (bar) bar.classList.remove('visible');
    if (tocObserver) tocObserver.disconnect();
  }

  // ---- Boot ---------------------------------------------------------------
  function route() {
    const params = new URLSearchParams(location.search);
    const slug = params.get('post');
    if (slug) renderPost(slug);
    else renderIndex();
  }

  function wireLangSwitch() {
    document.querySelectorAll('.blog-lang-switch button').forEach(btn => {
      btn.addEventListener('click', () => {
        lang = btn.dataset.lang;
        localStorage.setItem('language', lang);
        const params = new URLSearchParams(location.search);
        params.set('lang', lang);
        history.replaceState(null, '', 'blog.html?' + params.toString());
        applyChromeI18n();
        route();
      });
    });
  }

  async function init() {
    const yearEl = document.getElementById('blogYear');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
    applyChromeI18n();
    wireLangSwitch();
    try {
      const res = await fetch(REGISTRY_URL, { cache: 'no-cache' });
      registry = await res.json();
    } catch (e) {
      registry = { posts: [] };
    }
    route();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
