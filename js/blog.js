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
      'blog.search': 'Search posts…', 'blog.all': 'All', 'blog.noresults': 'No posts match your search.',
      'sort.newest': 'Newest', 'sort.oldest': 'Oldest', 'sort.reading': 'Reading time', 'sort.title': 'Title A–Z',
      'blog.cite': 'Cite this post', 'blog.edit': 'Edit on GitHub', 'blog.updated': 'Updated', 'blog.comments': 'Comments',
      'blog.history': 'Edit history', 'blog.edits': 'edits', 'blog.fullhistory': 'Full history on GitHub', 'blog.viewver': 'View this version', 'blog.compare': 'Diff', 'blog.backlatest': 'Back to latest version', 'blog.viewingver': "You're viewing the version from {DATE}", 'blog.diffvs': 'Changes since {DATE}',
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
      'blog.search': '搜索文章…', 'blog.all': '全部', 'blog.noresults': '没有匹配的文章。',
      'sort.newest': '最新', 'sort.oldest': '最早', 'sort.reading': '阅读时长', 'sort.title': '标题 A–Z',
      'blog.cite': '引用本文', 'blog.edit': '在 GitHub 编辑', 'blog.updated': '更新于', 'blog.comments': '评论',
      'blog.history': '编辑记录', 'blog.edits': '次编辑', 'blog.fullhistory': 'GitHub 完整历史', 'blog.viewver': '查看此版本', 'blog.compare': '差异', 'blog.backlatest': '返回最新版本', 'blog.viewingver': '正在查看 {DATE} 的版本', 'blog.diffvs': '自 {DATE} 以来的改动',
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
      'blog.search': 'Rechercher…', 'blog.all': 'Tous', 'blog.noresults': 'Aucun article ne correspond.',
      'sort.newest': 'Plus récents', 'sort.oldest': 'Plus anciens', 'sort.reading': 'Temps de lecture', 'sort.title': 'Titre A–Z',
      'blog.cite': 'Citer cet article', 'blog.edit': 'Éditer sur GitHub', 'blog.updated': 'Mis à jour', 'blog.comments': 'Commentaires',
      'blog.history': 'Historique', 'blog.edits': 'modifications', 'blog.fullhistory': 'Historique complet sur GitHub', 'blog.viewver': 'Voir cette version', 'blog.compare': 'Diff', 'blog.backlatest': 'Revenir à la dernière version', 'blog.viewingver': 'Vous consultez la version du {DATE}', 'blog.diffvs': 'Modifications depuis le {DATE}',
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
      'blog.search': 'Beiträge suchen…', 'blog.all': 'Alle', 'blog.noresults': 'Keine passenden Beiträge.',
      'sort.newest': 'Neueste', 'sort.oldest': 'Älteste', 'sort.reading': 'Lesezeit', 'sort.title': 'Titel A–Z',
      'blog.cite': 'Diesen Beitrag zitieren', 'blog.edit': 'Auf GitHub bearbeiten', 'blog.updated': 'Aktualisiert', 'blog.comments': 'Kommentare',
      'blog.history': 'Verlauf', 'blog.edits': 'Änderungen', 'blog.fullhistory': 'Vollständiger Verlauf auf GitHub', 'blog.viewver': 'Diese Version ansehen', 'blog.compare': 'Diff', 'blog.backlatest': 'Zur aktuellen Version', 'blog.viewingver': 'Sie sehen die Version vom {DATE}', 'blog.diffvs': 'Änderungen seit {DATE}',
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
      // text / plaintext / no-language → soft-wrap; real code keeps structure (h-scroll)
      const isText = !lng || /^(text|plaintext|plain|txt|nohighlight|none)$/i.test(lng);
      if (isText) pre.classList.add('wrap');
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

  // ---- Index: search · tag filter · sort · 3 view modes -------------------
  const indexState = { q: '', tag: null, sort: 'newest', view: localStorage.getItem('blogView') || 'list' };
  let indexWired = false;

  function allTags() {
    const m = new Map();
    (registry.posts || []).forEach(p => (p.tags || []).forEach(tg => m.set(tg, (m.get(tg) || 0) + 1)));
    return [...m.entries()].sort((a, b) => b[1] - a[1]);
  }
  function sortOptions() {
    return [['newest', t('sort.newest')], ['oldest', t('sort.oldest')],
            ['reading', t('sort.reading')], ['title', t('sort.title')]];
  }
  function rmOf(p) {
    if (!p.readingMinutes) return 0;
    return p.readingMinutes[lang] || Object.values(p.readingMinutes)[0] || 0;
  }
  function titleOf(p) {
    const cl = pickLang(p);
    return (p.title && (p.title[lang] || p.title[cl])) || p.slug;
  }

  function buildControls() {
    const controls = document.getElementById('blogControls');
    const tagWrap = document.getElementById('blogTagFilter');
    const sortSel = document.getElementById('blogSort');
    const search = document.getElementById('blogSearch');
    const vmodes = document.getElementById('blogViewModes');
    if (!controls) return;
    controls.hidden = false;
    sortSel.innerHTML = sortOptions().map(([v, l]) => `<option value="${v}">${l}</option>`).join('');
    sortSel.value = indexState.sort;
    if (search) { search.placeholder = t('blog.search'); search.value = indexState.q; }
    const tags = allTags();
    if (tags.length) {
      tagWrap.hidden = false;
      tagWrap.innerHTML =
        `<button class="blog-filterchip ${!indexState.tag ? 'active' : ''}" data-tag="">${t('blog.all')}</button>` +
        tags.map(([tg, n]) => `<button class="blog-filterchip ${indexState.tag === tg ? 'active' : ''}" data-tag="${tg}">${tg} <small>${n}</small></button>`).join('');
    }
    vmodes.querySelectorAll('button').forEach(b => b.classList.toggle('active', b.dataset.view === indexState.view));

    if (indexWired) return;
    indexWired = true;
    if (search) search.addEventListener('input', e => { indexState.q = e.target.value.trim().toLowerCase(); renderCards(); });
    sortSel.addEventListener('change', e => { indexState.sort = e.target.value; renderCards(); });
    vmodes.addEventListener('click', e => {
      const b = e.target.closest('button[data-view]'); if (!b) return;
      indexState.view = b.dataset.view; localStorage.setItem('blogView', indexState.view);
      vmodes.querySelectorAll('button').forEach(x => x.classList.toggle('active', x === b));
      renderCards();
    });
    tagWrap.addEventListener('click', e => {
      const b = e.target.closest('button[data-tag]'); if (!b) return;
      indexState.tag = b.dataset.tag || null;
      tagWrap.querySelectorAll('button').forEach(x => x.classList.toggle('active', x === b));
      renderCards();
    });
  }

  function filteredPosts() {
    let posts = (registry.posts || []).slice();
    if (indexState.tag) posts = posts.filter(p => (p.tags || []).includes(indexState.tag));
    if (indexState.q) {
      posts = posts.filter(p => {
        const cl = pickLang(p);
        const hay = [
          (p.title && (p.title[lang] || p.title[cl])) || '',
          (p.excerpt && (p.excerpt[lang] || p.excerpt[cl])) || '',
          (p.tags || []).join(' ')
        ].join(' ').toLowerCase();
        return hay.includes(indexState.q);
      });
    }
    const s = indexState.sort;
    posts.sort((a, b) => {
      if (s === 'oldest') return (a.date || '').localeCompare(b.date || '');
      if (s === 'reading') return rmOf(b) - rmOf(a);
      if (s === 'title') return titleOf(a).localeCompare(titleOf(b));
      return (b.date || '').localeCompare(a.date || '');
    });
    return posts;
  }

  function cardHTML(p, view) {
    const cl = pickLang(p);
    const title = titleOf(p);
    const excerpt = (p.excerpt && (p.excerpt[lang] || p.excerpt[cl])) || '';
    const cover = p.cover ? `blog-posts/${p.slug}/${p.cover}` : '';
    const rm = (p.readingMinutes && (p.readingMinutes[lang] || p.readingMinutes[cl])) || null;
    const tags = (p.tags || []).slice(0, 5).map(tg => `<span class="blog-tag">${tg}</span>`).join('');
    const status = (p.translationStatus && p.translationStatus[lang]) || null;
    const fallbackNote = (!p.langs.includes(lang))
      ? `<span class="blog-fallback-chip">${t('blog.fallback').replace('{LANG}', t('lang.' + cl))}</span>` : '';
    const href = `blog.html?post=${encodeURIComponent(p.slug)}&lang=${lang}`;
    if (view === 'compact') {
      return `<a class="blog-card blog-card-compact" href="${href}">
        <time class="blog-card-date">${p.date || ''}</time>
        <h2 class="blog-card-title">${title}</h2>
        <div class="blog-card-tags">${tags}</div>
      </a>`;
    }
    return `<a class="blog-card" href="${href}">
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
  }

  function renderCards() {
    const list = document.getElementById('blogPostList');
    const posts = filteredPosts();
    list.setAttribute('data-view', indexState.view);
    list.innerHTML = posts.length
      ? posts.map(p => cardHTML(p, indexState.view)).join('')
      : `<p class="blog-empty">${t('blog.noresults')}</p>`;
  }

  function renderIndex() {
    document.getElementById('blogPost').hidden = true;
    resetChrome();   // hide TOC + reading-progress on the index
    document.getElementById('blogIndex').hidden = false;
    const list = document.getElementById('blogPostList');
    if (!registry || !registry.posts || !registry.posts.length) {
      const c = document.getElementById('blogControls'); if (c) c.hidden = true;
      const tf = document.getElementById('blogTagFilter'); if (tf) tf.hidden = true;
      list.innerHTML = `<p class="blog-empty">${t('blog.empty')}</p>`;
      return;
    }
    buildControls();
    renderCards();
  }

  async function renderPost(slug) {
    const post = registry.posts.find(p => p.slug === slug);
    if (!post) { renderIndex(); return; }
    document.getElementById('blogIndex').hidden = true;
    const art = document.getElementById('blogPost');
    art.hidden = false;
    const rd = document.getElementById('blogReading'); if (rd) rd.hidden = false;  // reading-size toggle: post view only

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
      buildPostFoot(post, cl, title);   // cite · history · edit-on-GitHub · comments
      // Permalink to a specific revision (?rev=<sha>) → open that version in-page
      const _rev = new URLSearchParams(location.search).get('rev');
      if (_rev) { const r = (post.revisions || []).find(x => x.sha === _rev || x.sha.indexOf(_rev) === 0); if (r && r !== (post.revisions || [])[0]) showVersion(post, cl, r.sha, r.date); }
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

  // ---- Post footer: cite · edit-on-GitHub · comments ----------------------
  const REPO = 'jajupmochi/jajupmochi.github.io';
  // Giscus (GitHub Discussions-powered comments). repoId/categoryId from the
  // GitHub API for this repo; "Announcements" category = only the giscus app +
  // maintainers can open threads (spam-resistant). Mapping is 'specific' keyed
  // by post slug because the blog routes via ?post=<slug> (every post shares
  // the /blog.html pathname, so 'pathname' mapping would merge all threads).
  const GISCUS = { repo: REPO, repoId: 'MDEwOlJlcG9zaXRvcnk3ODI1NDg1Ng==', category: 'Announcements', categoryId: 'DIC_kwDOBKoTCM4C-GDD' };

  function copyButtonHandler(btn, text) {
    const done = () => {
      btn.textContent = t('blog.copied'); btn.classList.add('copied');
      setTimeout(() => { btn.textContent = t('blog.copy'); btn.classList.remove('copied'); }, 1600);
    };
    if (navigator.clipboard && navigator.clipboard.writeText)
      navigator.clipboard.writeText(text).then(done).catch(() => fallbackCopy(text, done));
    else fallbackCopy(text, done);
  }

  function buildPostFoot(post, cl, title) {
    const foot = document.getElementById('blogPostFoot');
    if (!foot) return;
    const year = (post.date || '').slice(0, 4) || String(new Date().getFullYear());
    const url = `https://jajupmochi.github.io/blog.html?post=${post.slug}&lang=${cl}`;
    const key = 'jia' + year + post.slug.replace(/[^a-z0-9]/gi, '');
    const bib = `@misc{${key},\n  author       = {Linlin Jia},\n  title        = {${title}},\n  year         = {${year}},\n  howpublished = {\\url{${url}}},\n  note         = {Blog post, jajupmochi.github.io}\n}`;
    const apa = `Jia, L. (${year}). ${title}. Linlin Jia's Blog. ${url}`;
    const ghEdit = `https://github.com/${REPO}/edit/master/blog-posts/${post.slug}/${cl}.md`;
    const updated = post.updated || post.date || '';
    const revs = post.revisions || [];
    const ghHist = `https://github.com/${REPO}/commits/master/blog-posts/${post.slug}/${cl}.md`;

    foot.innerHTML = `
      <section class="blog-cite">
        <h3 class="blog-foot-h">${t('blog.cite')}</h3>
        <div class="blog-cite-block">
          <div class="blog-cite-head"><span>BibTeX</span><button type="button" class="code-copy" data-cite="bib">${t('blog.copy')}</button></div>
          <pre class="blog-cite-pre" data-cite-out="bib"></pre>
        </div>
        <div class="blog-cite-block">
          <div class="blog-cite-head"><span>APA</span><button type="button" class="code-copy" data-cite="apa">${t('blog.copy')}</button></div>
          <pre class="blog-cite-pre" data-cite-out="apa"></pre>
        </div>
      </section>
      <p class="blog-foot-meta">
        ${updated ? `<span class="blog-foot-updated">${t('blog.updated')}: ${updated}</span>` : ''}
        ${revs.length > 1 ? `<span class="blog-foot-sep">·</span><span class="blog-foot-edits">${revs.length} ${t('blog.edits')}</span>` : ''}
        <span class="blog-foot-sep">·</span><a href="${ghHist}" target="_blank" rel="noopener">${t('blog.fullhistory')} <i class="fas fa-arrow-up-right-from-square" aria-hidden="true"></i></a>
        <span class="blog-foot-sep">·</span><a href="${ghEdit}" target="_blank" rel="noopener"><i class="fas fa-pen" aria-hidden="true"></i> ${t('blog.edit')}</a>
      </p>
      <section class="blog-history" id="blogHistory"></section>
      <section class="blog-comments" id="blogComments"></section>`;
    foot.querySelector('[data-cite-out="bib"]').textContent = bib;
    foot.querySelector('[data-cite-out="apa"]').textContent = apa;
    foot.querySelector('[data-cite="bib"]').addEventListener('click', e => copyButtonHandler(e.currentTarget, bib));
    foot.querySelector('[data-cite="apa"]').addEventListener('click', e => copyButtonHandler(e.currentTarget, apa));
    buildHistory(post, cl);
    mountGiscus(post);
  }

  // ---- Version history (registry-driven; old content/diff via raw.githubusercontent, no API/rate limit) ----
  const _verCache = {};
  async function versionMd(slug, cl, sha) {
    const k = slug + '@' + sha + '@' + cl;
    if (_verCache[k] != null) return _verCache[k];
    const url = `https://raw.githubusercontent.com/${REPO}/${sha}/blog-posts/${slug}/${cl}.md`;
    const res = await fetch(url, { cache: 'force-cache' });
    if (!res.ok) throw new Error('version fetch ' + res.status);
    const md = await res.text();
    _verCache[k] = md;
    return md;
  }

  function buildHistory(post, cl) {
    const host = document.getElementById('blogHistory');
    if (!host) return;
    const revs = post.revisions || [];
    if (!revs.length) { host.innerHTML = ''; return; }
    const sumOf = r => (r.summary && (r.summary[cl] || r.summary[post.primaryLang] || r.summary.en)) || '';
    const rows = revs.map((r, i) => {
      const latest = i === 0;
      const ghCommit = `https://github.com/${REPO}/commit/${r.sha}`;
      const acts = latest
        ? `<span class="blog-rev-cur">${t('blog.updated')}</span>`
        : `<button type="button" class="blog-rev-btn" data-act="view" data-sha="${r.sha}" data-date="${r.date}">${t('blog.viewver')}</button>` +
          `<button type="button" class="blog-rev-btn" data-act="diff" data-sha="${r.sha}" data-date="${r.date}">${t('blog.compare')}</button>`;
      return `<li class="blog-rev${latest ? ' is-latest' : ''}">
        <span class="blog-rev-date">${r.date}</span>
        <span class="blog-rev-sum">${sumOf(r)}</span>
        ${r.by ? `<span class="blog-rev-by">${r.by}</span>` : ''}
        <span class="blog-rev-acts">${acts}<a class="blog-rev-link" href="${ghCommit}" target="_blank" rel="noopener" title="${t('blog.compare')} · GitHub"><i class="fab fa-github" aria-hidden="true"></i></a></span>
      </li>`;
    }).join('');
    host.innerHTML = `<h3 class="blog-foot-h">${t('blog.history')}</h3><ol class="blog-rev-list">${rows}</ol><div id="blogDiff" class="blog-diff" hidden></div>`;
    host.querySelectorAll('.blog-rev-btn').forEach(b => b.addEventListener('click', () => {
      if (b.dataset.act === 'view') showVersion(post, cl, b.dataset.sha, b.dataset.date);
      else showDiff(post, cl, b.dataset.sha, b.dataset.date);
    }));
  }

  async function showVersion(post, cl, sha, date) {
    const body = document.getElementById('blogPostBody');
    body.innerHTML = `<p class="blog-loading">${t('blog.loading')}</p>`;
    try {
      const md = await versionMd(post.slug, cl, sha);
      body.innerHTML = renderMarkdown(md, post.slug);
      postProcess(body, post.slug);
      const banner = document.createElement('div');
      banner.className = 'blog-ver-banner';
      banner.innerHTML = `<span><i class="fas fa-clock-rotate-left" aria-hidden="true"></i> ${t('blog.viewingver').replace('{DATE}', date)}</span> <button type="button" class="blog-rev-btn" id="blogBackLatest">${t('blog.backlatest')}</button>`;
      body.insertBefore(banner, body.firstChild);
      document.getElementById('blogBackLatest').addEventListener('click', () => renderPost(post.slug));
      buildTOC(body);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (e) { body.innerHTML = `<p class="blog-error">Failed to load that version (${e.message}).</p>`; }
  }

  async function showDiff(post, cl, sha, date) {
    const panel = document.getElementById('blogDiff');
    if (!panel) return;
    panel.hidden = false;
    panel.innerHTML = `<p class="blog-loading">${t('blog.loading')}</p>`;
    try {
      if (typeof Diff === 'undefined' || typeof Diff2Html === 'undefined') {
        panel.innerHTML = `<p class="blog-error">Diff viewer not loaded.</p>`; return;
      }
      const [oldMd, newRes] = await Promise.all([
        versionMd(post.slug, cl, sha),
        fetch(`blog-posts/${post.slug}/${cl}.md`, { cache: 'no-cache' }).then(r => r.text())
      ]);
      const fname = `${post.slug}/${cl}.md`;
      const patch = Diff.createTwoFilesPatch(`${fname} (${date})`, `${fname} (latest)`, oldMd, newRes, '', '');
      const out = Diff2Html.html(patch, { drawFileList: false, matching: 'words', outputFormat: 'side-by-side' });
      panel.innerHTML = `<div class="blog-diff-head">${t('blog.diffvs').replace('{DATE}', date)}</div>${out}`;
      panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } catch (e) { panel.innerHTML = `<p class="blog-error">Diff failed (${e.message}).</p>`; }
  }

  function mountGiscus(post) {
    const mount = document.getElementById('blogComments');
    if (!mount || !GISCUS.repoId || !GISCUS.categoryId) return;  // not configured → no comments UI
    mount.innerHTML = `<h3 class="blog-foot-h">${t('blog.comments')}</h3>`;
    const term = post ? 'post:' + post.slug : (location.pathname + location.search);
    const s = document.createElement('script');
    s.src = 'https://giscus.app/client.js';
    s.async = true; s.crossOrigin = 'anonymous';
    Object.entries({
      'data-repo': GISCUS.repo, 'data-repo-id': GISCUS.repoId,
      'data-category': GISCUS.category, 'data-category-id': GISCUS.categoryId,
      'data-mapping': 'specific', 'data-term': term, 'data-strict': '1', 'data-reactions-enabled': '1',
      'data-emit-metadata': '0', 'data-input-position': 'top', 'data-theme': 'light',
      'data-lang': lang
    }).forEach(([k, v]) => s.setAttribute(k, v));
    mount.appendChild(s);
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
    const rd = document.getElementById('blogReading'); if (rd) rd.hidden = true;
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

  // ---- Reading size: Standard (default) / Comfort ----
  function applyReadingMode(mode) {
    const comfort = mode === 'comfort';
    document.body.classList.toggle('reading-comfort', comfort);
    document.querySelectorAll('#blogReading button').forEach(b =>
      b.classList.toggle('active', b.dataset.fs === (comfort ? 'comfort' : 'standard')));
    try { localStorage.setItem('blogReading', comfort ? 'comfort' : 'standard'); } catch (e) {}
  }
  function wireReadingToggle() {
    const box = document.getElementById('blogReading');
    if (!box) return;
    box.addEventListener('click', e => {
      const b = e.target.closest('button[data-fs]'); if (!b) return;
      applyReadingMode(b.dataset.fs);
    });
  }

  async function init() {
    const yearEl = document.getElementById('blogYear');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
    applyChromeI18n();
    wireLangSwitch();
    wireReadingToggle();
    applyReadingMode(localStorage.getItem('blogReading') || 'standard');
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
