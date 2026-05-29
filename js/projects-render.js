/*
 * projects-render.js — render LOGIC for projects (App Gallery + homepage).
 * Reads window.PROJECTS (data) and produces DOM. No styling here (CSS owns
 * design); no data here (projects-data.js owns content). Exposes window.Projects.
 */
(function () {
  'use strict';

  function el(tag, cls, html) {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }
  // content is author-controlled (projects-data.js), so inline HTML is safe here
  const linksHTML = (p, cls) => (p.links || [])
    .map(l => `<a href="${l.href}" target="_blank" rel="noopener noreferrer"${cls ? ` class="${cls}"` : ''}><i class="${l.icon}"></i> ${l.label}</a>`)
    .join('');
  const slidesHTML = (p) => (p.images || [])
    .map(im => `<img class="g-slide" src="${im.src}" alt="${im.alt || ''}" loading="lazy" decoding="async">`)
    .join('');
  const searchText = (p) => [p.titleFull, p.titleShort, p.blurb, (p.bullets || []).join(' '), (p.tagLabels || []).join(' ')].join(' ').toLowerCase();

  // ---- Cards view: image-forward tile (hover overlay) ----
  function cardEl(p) {
    const c = el('div', 'g-card' + (p.featured ? ' g-card--featured' : '') + (p.size === 'lg' ? ' g-card--lg' : ''));
    c.dataset.tags = (p.tags || []).join(',');
    c.dataset.year = p.year;
    c.dataset.priority = p.priority;
    c.dataset.search = searchText(p);
    if (p.primaryHref) c.dataset.href = p.primaryHref;
    const tags = (p.tagLabels || []).map(t => `<span class="tag">${t}</span>`).join('');
    c.innerHTML =
      (p.featured ? '<span class="g-tape">Featured</span>' : '') +
      `<div class="g-imgwrap"><div class="g-track">${slidesHTML(p)}</div></div>` +
      '<div class="g-dots"></div>' +
      `<div class="g-cap">${p.titleShort}</div>` +
      '<div class="g-over">' +
        `<h3>${p.titleShort}</h3>` +
        `<p>${p.blurb}</p>` +
        (p.why ? `<p class="why">${p.why}</p>` : '') +
        `<div class="tags">${tags}</div>` +
        `<div class="acts">${linksHTML(p)}<button class="zoom" type="button"><i class="fas fa-expand"></i> Zoom</button></div>` +
      '</div>';
    return c;
  }

  // ---- Detailed view: project-card with bullet list ----
  function detailedEl(p) {
    const c = el('div', 'project-card' + (p.featured ? ' is-featured' : ''));
    c.dataset.tags = (p.tags || []).join(',');
    c.dataset.year = p.year;
    c.dataset.priority = p.priority;
    c.dataset.search = searchText(p);
    if (p.primaryHref) { c.dataset.primaryHref = p.primaryHref; c.setAttribute('role', 'link'); c.tabIndex = 0; }
    const badgeCls = p.badge === 'dual' ? 'project-badge project-badge--dual'
      : p.badge === 'fun' ? 'project-badge project-badge--fun' : 'project-badge';
    const bullets = (p.bullets || []).map(b => `<li>${b}</li>`).join('');
    const tags = (p.tagLabels || []).map(t => `<span class="project-tag">${t}</span>`).join('');
    c.innerHTML =
      (p.featured ? '<span class="pf-tape">Featured</span>' : '') +
      `<div class="project-image pimg-carousel"><div class="pimg-track">${slidesHTML(p)}</div><div class="pimg-dots"></div></div>` +
      '<div class="project-content">' +
        `<div class="project-meta"><span class="${badgeCls}">${p.badgeText}</span><span class="project-date">${p.date}</span></div>` +
        `<h3 class="project-title">${p.titleFull}</h3>` +
        `<ul class="project-desc-list">${bullets}</ul>` +
        (p.why ? `<p class="proj-why"><em>${p.why}</em></p>` : '') +
        `<div class="project-tags">${tags}</div>` +
        `<div class="project-links">${linksHTML(p, 'project-link')}</div>` +
      '</div>';
    return c;
  }

  // ---- In-card image carousel (dots + swipe). Shared by both views. ----
  // Pass the CARD: track/dots/slides are found within it; swipe binds to the
  // image area (track's parent: .g-imgwrap for cards, .project-image for detailed).
  function initCarousel(card) {
    const track = card.querySelector('.g-track, .pimg-track');
    if (!track) return;
    const dots = card.querySelector('.g-dots, .pimg-dots');
    const slides = Array.from(track.querySelectorAll('.g-slide'));
    if (!dots || slides.length < 2) return;
    const area = track.parentElement;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let idx = 0, timer = null, paused = false;
    function schedule() { if (reduce || paused) return; clearTimeout(timer); timer = setTimeout(function () { go(idx + 1); }, 4200); }
    function go(n) {
      idx = (n + slides.length) % slides.length;
      track.style.transform = 'translateX(' + (-idx * 100) + '%)';
      Array.from(dots.children).forEach((d, i) => d.classList.toggle('on', i === idx));
      area.dataset.idx = String(idx);
      schedule();
    }
    slides.forEach((_, i) => {
      const d = document.createElement('i');
      d.addEventListener('click', e => { e.stopPropagation(); go(i); });
      dots.appendChild(d);
    });
    go(0);
    card.addEventListener('pointerenter', function () { paused = true; clearTimeout(timer); });
    card.addEventListener('pointerleave', function () { paused = false; schedule(); });
    let sx = null, swiped = false;
    area.addEventListener('pointerdown', e => { sx = e.clientX; swiped = false; });
    area.addEventListener('pointerup', e => {
      if (sx == null) return; const dx = e.clientX - sx; sx = null;
      if (Math.abs(dx) > 35) { swiped = true; go(idx + (dx < 0 ? 1 : -1)); }
    });
    area.addEventListener('click', e => { if (swiped) { e.stopPropagation(); e.preventDefault(); swiped = false; } }, true);
    area.addEventListener('touchstart', e => { e.stopPropagation(); }, { passive: true });
    area.addEventListener('touchend', e => { e.stopPropagation(); }, { passive: true });
  }

  // ---- Lightbox (array + prev/next + keyboard). One per page. ----
  function makeLightbox() {
    let lb = document.getElementById('lb');
    if (!lb) {
      lb = el('div', 'lb');
      lb.id = 'lb';
      lb.innerHTML =
        '<button class="x" id="lbx" aria-label="Close">&times;</button>' +
        '<button class="nav prev" id="lbprev" aria-label="Previous">&#8249;</button>' +
        '<img id="lbimg" src="" alt="">' +
        '<button class="nav next" id="lbnext" aria-label="Next">&#8250;</button>' +
        '<div class="lbcount" id="lbcount" aria-hidden="true"></div>';
      document.body.appendChild(lb);
    }
    const img = lb.querySelector('#lbimg');
    let imgs = [], i = 0;
    function show() {
      img.src = imgs[i];
      const multi = imgs.length > 1;
      lb.querySelector('#lbprev').style.display = multi ? '' : 'none';
      lb.querySelector('#lbnext').style.display = multi ? '' : 'none';
      lb.querySelector('#lbcount').textContent = multi ? (i + 1) + ' / ' + imgs.length : '';
    }
    function open(list, start) { imgs = list; i = start || 0; show(); lb.classList.add('on'); document.body.style.overflow = 'hidden'; }
    function close() { lb.classList.remove('on'); img.src = ''; document.body.style.overflow = ''; }
    function go(n) { if (!imgs.length) return; i = (n + imgs.length) % imgs.length; show(); }
    lb.querySelector('#lbx').addEventListener('click', close);
    lb.querySelector('#lbprev').addEventListener('click', e => { e.stopPropagation(); go(i - 1); });
    lb.querySelector('#lbnext').addEventListener('click', e => { e.stopPropagation(); go(i + 1); });
    lb.addEventListener('click', e => { if (e.target === lb) close(); });
    document.addEventListener('keydown', e => {
      if (!lb.classList.contains('on')) return;
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') go(i - 1);
      else if (e.key === 'ArrowRight') go(i + 1);
    });
    return { open };
  }

  // ---- Card behaviours: carousel + click-to-open + zoom + keyboard ----
  function wireCard(card, lightbox) {
    initCarousel(card);
    const wrap = card.querySelector('.g-imgwrap, .project-image');
    const slides = Array.from(card.querySelectorAll('.g-slide'));
    const srcs = slides.map(s => s.getAttribute('src'));
    const openSelf = () => { const h = card.dataset.href || card.dataset.primaryHref; if (h) window.open(h, '_blank', 'noopener'); };
    const curIdx = () => parseInt((wrap && wrap.dataset.idx) || '0', 10) || 0;
    card.addEventListener('click', e => {
      if (e.target.closest('a') || e.target.closest('.g-dots, .pimg-dots')) return;
      if (e.target.closest('.zoom')) { if (srcs.length) lightbox.open(srcs, curIdx()); return; }
      if (matchMedia('(hover: none)').matches && !card.classList.contains('is-open')) { card.classList.add('is-open'); return; }
      openSelf();
    });
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (card.dataset.href || card.dataset.primaryHref) openSelf();
        else if (srcs.length) lightbox.open(srcs, curIdx());
      }
    });
  }

  // ---- Public: mount the full gallery (cards/detailed + controls) ----
  function mountGallery(cfg) {
    const mount = document.querySelector(cfg.mount);
    const projects = (window.PROJECTS || []).filter(p => p.show && p.show.gallery);
    const lightbox = makeLightbox();
    let view = cfg.view || 'cards';
    let activeTag = 'all';
    let q = '';
    let sort = 'featured';

    function ordered() {
      const a = projects.slice();
      a.sort((x, y) => sort === 'newest' ? y.year - x.year
        : sort === 'oldest' ? x.year - y.year
        : (y.priority || 0) - (x.priority || 0));
      return a;
    }
    function render() {
      mount.innerHTML = '';
      mount.className = 'gal' + (view === 'detailed' ? ' gal--detailed' : ' gal--cards');
      let shown = 0;
      ordered().forEach(p => {
        const hit = (activeTag === 'all' || (p.tags || []).includes(activeTag)) &&
          (!q || searchText(p).includes(q));
        if (!hit) return;
        shown++;
        const node = view === 'detailed' ? detailedEl(p) : cardEl(p);
        if (!card_tabbable(node)) { node.tabIndex = 0; node.setAttribute('role', node.dataset.href ? 'link' : 'button'); }
        if (view === 'cards') node.setAttribute('aria-label', p.titleShort + (node.dataset.href ? ' — open project' : ' — view details'));
        mount.appendChild(node);
        wireCard(node, lightbox);
      });
      let empty = document.getElementById('galEmpty');
      if (!empty) { empty = el('div', 'gal-empty'); empty.id = 'galEmpty'; empty.textContent = 'No apps match that filter.'; mount.appendChild(empty); }
      else mount.appendChild(empty);
      empty.classList.toggle('on', shown === 0);
    }
    function card_tabbable(n) { return n.tabIndex === 0; }

    // controls
    const filter = cfg.filter && document.querySelector(cfg.filter);
    if (filter) filter.addEventListener('click', e => {
      const b = e.target.closest('[data-filter]'); if (!b) return;
      filter.querySelectorAll('[data-filter]').forEach(x => x.classList.toggle('active', x === b));
      activeTag = b.dataset.filter; render();
    });
    const search = cfg.search && document.querySelector(cfg.search);
    if (search) search.addEventListener('input', () => { q = (search.value || '').trim().toLowerCase(); render(); });
    const sortSel = cfg.sort && document.querySelector(cfg.sort);
    if (sortSel) sortSel.addEventListener('change', () => { sort = sortSel.value; render(); });
    const modeWrap = cfg.toggle && document.querySelector(cfg.toggle);
    if (modeWrap) modeWrap.addEventListener('click', e => {
      const b = e.target.closest('[data-view]'); if (!b) return;
      e.preventDefault();
      view = b.dataset.view;
      modeWrap.querySelectorAll('[data-view]').forEach(x => x.classList.toggle('on', x === b));
      try { localStorage.setItem('galleryView', view); } catch (_) {}
      render();
    });
    try { const saved = localStorage.getItem('galleryView'); if (saved) { view = saved; if (modeWrap) modeWrap.querySelectorAll('[data-view]').forEach(x => x.classList.toggle('on', x.dataset.view === view)); } } catch (_) {}

    render();
  }

  // ---- Homepage card (i18n via data-i18n; SEO <object> for single SVG) ----
  // Produces the homepage's existing .project-card structure so main.js's own
  // handlers (carousel, lightbox, card-click, filter, applyTranslations) wire it.
  function homeImage(p) {
    const imgs = p.images || [];
    if (imgs.length > 1) {
      return '<div class="project-image pimg-carousel"><div class="pimg-track">' +
        imgs.map(im => `<img class="pimg-slide" src="${im.src}" alt="${im.alt || ''}" loading="lazy" decoding="async">`).join('') +
        '</div><div class="pimg-dots"></div></div>';
    }
    const im = imgs[0] || {};
    if (/\.svg(\?|$)/.test(im.src)) {
      return `<div class="project-image"><object type="image/svg+xml" data="${im.src}" aria-label="${im.alt || ''}"><img src="${im.src}" alt="${im.alt || ''}" loading="lazy" width="400" height="180"></object></div>`;
    }
    return `<div class="project-image"><img src="${im.src}" alt="${im.alt || ''}" loading="lazy" decoding="async" width="400" height="180"></div>`;
  }
  function homeCardHTML(p) {
    const h = p.home || {};
    const badgeCls = p.badge === 'dual' ? 'project-badge project-badge--dual'
      : p.badge === 'fun' ? 'project-badge project-badge--fun' : 'project-badge';
    const bullets = (p.bullets || []).map(b => `<li>${b}</li>`).join('');
    const chips = (h.chips || []).map(c => `<span class="project-tag" data-i18n="${c.key}">${c.label}</span>`).join('');
    const stats = h.stats
      ? `<div class="project-stats" aria-label="Live project metrics">${h.stats.map(s => `<a href="${s.href}" target="_blank" rel="noopener noreferrer" class="project-stat-pill" title="${s.title}">${s.html}</a>`).join('')}</div>`
      : '';
    const links = (h.links || []).map(l =>
      `<a href="${l.href}"${l.onclick ? ` onclick="${l.onclick}"` : ' target="_blank" rel="noopener noreferrer"'} class="project-link" title="${l.label}"><i class="${l.icon}"></i> <span data-i18n="${l.key}">${l.label}</span></a>`).join('');
    const hrefAttr = p.primaryHref ? ` data-primary-href="${p.primaryHref}"` : '';
    const interactive = p.primaryHref ? ' tabindex="0" role="link"' : '';
    return `<div class="project-card" data-tags="${(p.tags || []).join(',')}" data-year="${p.year}" data-priority="${p.priority}"${hrefAttr}${interactive} aria-label="Project: ${p.titleShort}">` +
      homeImage(p) +
      '<div class="project-content">' +
        `<div class="project-meta"><span class="${badgeCls}" data-i18n="proj_badge.${p.badge}">${p.badgeText}</span><span class="project-date" data-i18n="proj.${p.slug}.date">${p.date}</span></div>` +
        `<h3 class="project-title" data-i18n="proj.${p.slug}.title">${p.titleFull}</h3>` +
        `<ul class="project-desc-list" data-i18n-html="proj.${p.slug}.desc">${bullets}</ul>` +
        stats +
        `<div class="project-tags">${chips}</div>` +
        `<div class="project-links">${links}</div>` +
      '</div></div>';
  }
  function mountHome(sel) {
    const track = document.querySelector(sel);
    if (!track || !window.PROJECTS) return;
    const list = window.PROJECTS.filter(p => p.show && p.show.home)
      .sort((a, b) => (b.priority || 0) - (a.priority || 0));
    track.innerHTML = list.map(homeCardHTML).join('');
  }

  window.Projects = { cardEl, detailedEl, initCarousel, makeLightbox, wireCard, mountGallery, homeCardHTML, mountHome };
})();
