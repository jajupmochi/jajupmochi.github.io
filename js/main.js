        // ========================================
        // AMAP (高德地图) CREDENTIALS
        // Only consumed when a China visitor is detected (see applyChinaMap).
        // Register a Web/JS API app at https://console.amap.com/dev/key/app,
        // then paste the Key + security jscode below. Domain whitelist MUST
        // include 127.0.0.1 (Amap rejects the literal "localhost") plus the
        // production domain — see docs/setup/local-dev.md for details.
        // Placeholder values (starting with PASTE_) are treated as "not
        // configured" at runtime and fall back to the existing link card.
        // ========================================
        const AMAP_KEY = '121b09d33c5728732431469ab110ba4d';
        const AMAP_JSCODE = '4686de423b4ec5ab915a657cec212a78';

        // ========================================
        // INTERNATIONALIZATION (i18n) SYSTEM
        // JSON-based translations with inline fallback
        // ========================================
        const translationsCache = {};
        let currentLang = 'en';
        
        // Inline fallback translations (used when JSON files cannot be loaded).
        // Keep hero.role + hero.title in sync with locales/*.json so no stale
        // "Machine Learning Research Scientist" line appears when fetch fails.
        const inlineFallback = {
            en: {
                'nav.home': 'Home', 'nav.about': 'About', 'nav.research': 'Research',
                'nav.projects': 'Projects', 'nav.publications': 'Publications',
                'nav.services': 'Services', 'nav.personal': 'Personal', 'nav.blog': 'Blog',
                'hero.badge': 'Open to ML Research Scientist Opportunities',
                'hero.name': 'Linlin Jia, Ph.D.',
                'hero.role': '<strong class="role-primary">Machine Learning Research Scientist</strong><wbr><span class="hero-h1-sep" aria-hidden="true">|</span><wbr><span class="role-secondary">Advanced Postdoc @ University of Bern</span>',
                'hero.title': 'Graph Machine Learning · Spatio-Temporal Learning · Graph AI for Science & Industry · LLM Systems & Agents',
                'hero.contact': 'Get in Touch', 'hero.cv': 'Download CV'
            },
            zh: {
                'nav.home': '首页', 'nav.about': '关于', 'nav.research': '研究',
                'nav.projects': '项目', 'nav.publications': '论文',
                'nav.services': '服务', 'nav.personal': '个人', 'nav.blog': '博客',
                'hero.badge': '开放 ML 研究科学家职位',
                'hero.name': '贾林林 博士',
                'hero.role': '<strong class="role-primary">机器学习研究科学家</strong><wbr><span class="hero-h1-sep" aria-hidden="true">|</span><wbr><span class="role-secondary">伯尔尼大学高级博士后</span>',
                'hero.title': '图机器学习 · 时空学习 · 科学与工业中的图智能 · LLM 系统与智能体',
                'hero.contact': '联系我', 'hero.cv': '下载简历'
            },
            fr: {
                'nav.home': 'Accueil', 'nav.about': 'À propos', 'nav.research': 'Recherche',
                'nav.projects': 'Projets', 'nav.publications': 'Publications',
                'nav.services': 'Services', 'nav.personal': 'Personnel', 'nav.blog': 'Blog',
                'hero.badge': 'Ouvert à des postes de ML Research Scientist',
                'hero.name': 'Linlin Jia, Ph.D.',
                'hero.role': '<strong class="role-primary">Chercheur en Machine Learning</strong><wbr><span class="hero-h1-sep" aria-hidden="true">|</span><wbr><span class="role-secondary">Postdoctorant senior à l\'Université de Berne</span>',
                'hero.title': 'ML sur graphes · Apprentissage spatio-temporel · IA sur graphes pour la science et l\'industrie · Systèmes & agents LLM',
                'hero.contact': 'Me contacter', 'hero.cv': 'Télécharger le CV'
            },
            de: {
                'nav.home': 'Start', 'nav.about': 'Über', 'nav.research': 'Forschung',
                'nav.projects': 'Projekte', 'nav.publications': 'Publikationen',
                'nav.services': 'Dienste', 'nav.personal': 'Persönlich', 'nav.blog': 'Blog',
                'hero.badge': 'Offen für ML-Research-Scientist-Stellen',
                'hero.name': 'Linlin Jia, Ph.D.',
                'hero.role': '<strong class="role-primary">Machine Learning Research Scientist</strong><wbr><span class="hero-h1-sep" aria-hidden="true">|</span><wbr><span class="role-secondary">Senior-Postdoc an der Universität Bern</span>',
                'hero.title': 'Graph-ML · Räumlich-zeitliches Lernen · Graph-KI für Wissenschaft & Industrie · LLM-Systeme & -Agenten',
                'hero.contact': 'Kontakt aufnehmen', 'hero.cv': 'CV herunterladen'
            }
        };
        
        // Flatten nested JSON to dot notation keys
        function flattenTranslations(obj, prefix = '') {
            return Object.keys(obj).reduce((acc, key) => {
                const newKey = prefix ? `${prefix}.${key}` : key;
                if (typeof obj[key] === 'object' && obj[key] !== null) {
                    Object.assign(acc, flattenTranslations(obj[key], newKey));
                } else {
                    acc[newKey] = obj[key];
                }
                return acc;
            }, {});
        }
        
        // Load translations from JSON file with inline fallback
        async function loadTranslations(lang) {
            if (translationsCache[lang]) {
                return translationsCache[lang];
            }
            
            try {
                const response = await fetch(`locales/${lang}.json`);
                if (!response.ok) throw new Error(`Failed to load ${lang}.json`);
                const data = await response.json();
                translationsCache[lang] = flattenTranslations(data);
                return translationsCache[lang];
            } catch (error) {
                console.warn(`Could not load translations for ${lang}, using inline fallback:`, error.message);
                // Use inline fallback
                if (inlineFallback[lang]) {
                    translationsCache[lang] = inlineFallback[lang];
                    return inlineFallback[lang];
                }
                // Fallback to English
                return inlineFallback['en'] || {};
            }
        }
        
        // Apply translations to DOM
        async function applyTranslations(lang) {
            currentLang = lang;
            // Sync html[lang] so CSS :lang() / html[lang="zh"] selectors (e.g. CJK punctuation palt) take effect
            try { document.documentElement.lang = lang; } catch (_) {}
            const t = await loadTranslations(lang);
            
            // Apply to elements with data-i18n attribute (text content)
            document.querySelectorAll('[data-i18n]').forEach(el => {
                const key = el.getAttribute('data-i18n');
                if (t[key]) {
                    el.textContent = t[key];
                }
            });

            // Apply to elements with data-i18n-html (HTML content — allows inline <strong>, <a>, etc.)
            document.querySelectorAll('[data-i18n-html]').forEach(el => {
                const key = el.getAttribute('data-i18n-html');
                if (t[key]) {
                    el.innerHTML = t[key];
                }
            });

            // Apply to placeholders
            document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
                const key = el.getAttribute('data-i18n-placeholder');
                if (t[key]) {
                    el.placeholder = t[key];
                }
            });

            // Apply to aria-labels
            document.querySelectorAll('[data-i18n-aria]').forEach(el => {
                const key = el.getAttribute('data-i18n-aria');
                if (t[key]) {
                    el.setAttribute('aria-label', t[key]);
                }
            });

            // Apply per-locale href swaps (e.g. patent link: zh → Chinese page, others → /en)
            document.querySelectorAll('[data-i18n-href-map]').forEach(el => {
                try {
                    const map = JSON.parse(el.getAttribute('data-i18n-href-map'));
                    if (map && map[lang]) {
                        el.setAttribute('href', map[lang]);
                    }
                } catch (e) {
                    // Malformed JSON in data-i18n-href-map — leave href unchanged.
                }
            });

            // Apply per-locale src swaps (e.g. Google Maps embed iframe: hl=<lang>)
            document.querySelectorAll('[data-i18n-src-map]').forEach(el => {
                try {
                    const map = JSON.parse(el.getAttribute('data-i18n-src-map'));
                    if (map && map[lang]) {
                        el.setAttribute('src', map[lang]);
                    }
                } catch (e) {
                    // Malformed JSON in data-i18n-src-map — leave src unchanged.
                }
            });

            // Broadcast so any widget that depends on localized string widths
            // (hero ticker marquee, carousels, etc.) can re-measure.
            try { document.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } })); } catch (_) {}
        }
        
        // Translation helper function (for JS code)
        async function t(key, lang = currentLang) {
            const translations = await loadTranslations(lang);
            return translations[key] || key;
        }
        
        // ========================================
        // PAGE NAVIGATION
        // ========================================
        function showPage(page) {
            // Hide all pages
            document.querySelectorAll('.page-content').forEach(p => p.classList.remove('active'));
            document.querySelectorAll('.nav-link').forEach(a => a.classList.remove('active'));
            
            // Show selected page
            document.getElementById(page + 'Page').classList.add('active');
            document.querySelectorAll(`.nav-link[data-page="${page}"]`).forEach(a => a.classList.add('active'));
            
            // Scroll to top
            window.scrollTo(0, 0);
        }

        // Coming-soon toast for pages not yet ready (Personal, Blog).
        let comingSoonTimer = null;
        function showComingSoon(page) {
            const toast = document.getElementById('comingSoonToast');
            if (!toast) return;
            if (comingSoonTimer) { clearTimeout(comingSoonTimer); comingSoonTimer = null; }
            toast.setAttribute('aria-hidden', 'false');
            comingSoonTimer = setTimeout(() => {
                toast.setAttribute('aria-hidden', 'true');
                comingSoonTimer = null;
            }, 2500);
        }

        // ========================================
        // SMOOTH SCROLL FOR ANCHOR LINKS
        // ========================================
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;
                e.preventDefault();
                showPage('main'); // Ensure we're on main page
                setTimeout(() => {
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }, 100);
            });
        });
        
        // ============================================================
        // Welcome system — Howler envelope + Postcard (Claude Design 2Mve6nAdi82KG0RjWST3QQ).
        //
        // Phases (mirror React design):
        //   Howler:    idle → opening → gone   (or returns to idle on skip)
        //   Postcard:  closed → active → exiting    (skip path)
        //                                  ↘ sending → sealing → owl → closed   (submit path)
        //
        // Backwards-compatible exports: `openGiftBox`, `submitWelcome`,
        // `closeWelcomeWithBottle` keep their names so existing onclick=""
        // attributes elsewhere in the page stay valid.
        // ============================================================
        // Tiny stamp SVG per theme — rendered into #welcomeStamp on open and
        // when theme changes. Mirrors the design's <Stamp theme=... /> art.
        const WP_STAMPS = {
            ai: '<svg viewBox="0 0 40 48" width="40" height="48" aria-hidden="true"><defs><linearGradient id="sg-ai" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#818cf8"/><stop offset="100%" stop-color="#4f46e5"/></linearGradient></defs><rect x="2" y="2" width="36" height="44" rx="1" fill="url(#sg-ai)"/><g fill="none" stroke="#fff" stroke-width="1.2"><circle cx="12" cy="16" r="2.5"/><circle cx="28" cy="14" r="2.5"/><circle cx="20" cy="30" r="2.5"/><circle cx="30" cy="34" r="2.5"/><line x1="12" y1="16" x2="20" y2="30"/><line x1="28" y1="14" x2="20" y2="30"/><line x1="20" y1="30" x2="30" y2="34"/><line x1="28" y1="14" x2="12" y2="16"/></g></svg>',
            academic: '<svg viewBox="0 0 40 48" width="40" height="48" aria-hidden="true"><rect x="2" y="2" width="36" height="44" rx="0" fill="#1e3a8a"/><rect x="4" y="4" width="32" height="40" rx="0" fill="none" stroke="#fdfbf5" stroke-width="0.5" stroke-dasharray="1 1"/><g fill="#fdfbf5"><path d="M8 22 L20 16 L32 22 L20 28 Z"/><path d="M12 26 V32 Q20 36 28 32 V26" fill="none" stroke="#fdfbf5" stroke-width="1.2"/><circle cx="30" cy="22" r="1.2"/></g></svg>',
            industrial: '<svg viewBox="0 0 40 48" width="40" height="48" aria-hidden="true"><rect x="2" y="2" width="36" height="44" rx="0" fill="#f97316"/><g fill="none" stroke="#18181b" stroke-width="1.5"><circle cx="20" cy="24" r="10"/><path d="M20 12 V16 M20 32 V36 M8 24 H12 M28 24 H32 M11.5 15.5 L14 18 M26 30 L28.5 32.5 M11.5 32.5 L14 30 M26 18 L28.5 15.5"/><circle cx="20" cy="24" r="3" fill="#18181b"/></g></svg>',
            fancy: '<svg viewBox="0 0 40 48" width="40" height="48" aria-hidden="true"><defs><linearGradient id="sg-fancy" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#f472b6"/><stop offset="100%" stop-color="#a855f7"/></linearGradient></defs><rect x="2" y="2" width="36" height="44" rx="3" fill="url(#sg-fancy)"/><g fill="#fff"><path d="M20 16 c -3 -6 -10 0 -6 4 c 2 2 6 6 6 10 c 0 -4 4 -8 6 -10 c 4 -4 -3 -10 -6 -4 Z"/><circle cx="12" cy="36" r="1"/><circle cx="28" cy="36" r="1.2"/><circle cx="16" cy="40" r="0.8"/></g></svg>',
        };

        function paintWelcomeStamp() {
            const stampEl = document.getElementById('welcomeStamp');
            if (!stampEl) return;
            const theme = document.body.getAttribute('data-theme') || 'academic';
            stampEl.innerHTML = WP_STAMPS[theme] || WP_STAMPS.ai;
        }

        function openGiftBox() {
            const trigger = document.getElementById('celebrationTrigger');
            const overlay = document.getElementById('welcomeOverlay');
            if (!trigger || !overlay) return;

            // Already open? bail.
            if (overlay.classList.contains('active')) return;

            // Envelope burst → 550ms later show the postcard rising into view.
            trigger.classList.remove('idle');
            trigger.classList.add('opening');

            setTimeout(() => {
                paintWelcomeStamp();
                overlay.dataset.renderedAt = String(Date.now());
                overlay.classList.add('active');
                // Keep the envelope hidden underneath while postcard is open.
                trigger.classList.add('hidden');
            }, 550);
        }

        function showWelcome() {
            // Returning visitors: hide the Howler entirely.
            const trigger = document.getElementById('celebrationTrigger');
            if (localStorage.getItem('hasVisitedBefore') && trigger) {
                trigger.classList.add('hidden');
            }
        }

        function closeWelcomeWithBottle(submitted = false) {
            const overlay = document.getElementById('welcomeOverlay');
            const trigger = document.getElementById('celebrationTrigger');
            if (!overlay) return;

            // If we're already animating the post-submit sequence, don't restart.
            if (overlay.classList.contains('sending') || overlay.classList.contains('sealing') || overlay.classList.contains('owl')) {
                return;
            }

            // Skip path: slide the postcard back, return Howler to idle for retry.
            overlay.classList.remove('active');
            overlay.classList.add('exiting');

            setTimeout(() => {
                overlay.classList.remove('exiting');
                if (submitted && trigger) {
                    // Submitted: remember the visit, keep Howler gone.
                    localStorage.setItem('hasVisitedBefore', 'true');
                    trigger.classList.add('gone');
                    trigger.classList.remove('hidden', 'opening', 'closing', 'idle');
                } else if (trigger) {
                    // Skipped: Howler returns to its idle shake for another try.
                    trigger.classList.remove('hidden', 'opening', 'gone');
                    trigger.classList.add('closing');
                    requestAnimationFrame(() => {
                        // Strip closing → idle so it shakes again.
                        setTimeout(() => {
                            trigger.classList.remove('closing');
                            trigger.classList.add('idle');
                        }, 700);
                    });
                }
            }, 850);
        }

        // Welcome-form backend endpoint (Google Apps Script Web App URL).
        // See setup/form-backend-google-sheets.md for how to create it.
        const WELCOME_FORM_ENDPOINT = 'https://script.google.com/macros/s/AKfycbyAib-TkLQCntXowHS4b9kOj2xYToCgD00PVRu4tR5JXSqC8uG-jGxFf5NDUYJWdX2MKg/exec';

        function submitWelcome(e) {
            if (e && e.preventDefault) e.preventDefault();

            const overlay = document.getElementById('welcomeOverlay');
            const trigger = document.getElementById('celebrationTrigger');
            if (!overlay) return false;

            // Anti-spam signals evaluated server-side in welcome-form-backend.gs.
            // See docs/setup/form-backend-google-sheets.md → "Security & privacy".
            const renderedAt = parseInt(overlay.dataset.renderedAt || '0', 10);
            const dwellMs = renderedAt > 0 ? (Date.now() - renderedAt) : 0;

            const payload = {
                name: document.getElementById('visitorName')?.value.trim() || '',
                profession: document.getElementById('visitorProfession')?.value.trim() || '',
                message: document.getElementById('visitorMessage')?.value.trim() || '',
                signature: document.getElementById('visitorSignature')?.value.trim() || '',
                contact: document.getElementById('visitorContact')?.value.trim() || '',
                theme: document.body.getAttribute('data-theme') || 'academic',
                locale: (typeof currentLang !== 'undefined' ? currentLang : document.documentElement.lang) || 'en',
                userAgent: navigator.userAgent,
                referrer: document.referrer || '',
                origin: window.location.origin || '',
                website: document.getElementById('visitorWebsite')?.value || '',
                dwellMs,
            };

            // Fire-and-forget POST. text/plain avoids CORS preflight on GAS Web Apps.
            if (WELCOME_FORM_ENDPOINT && !WELCOME_FORM_ENDPOINT.startsWith('PASTE_')) {
                fetch(WELCOME_FORM_ENDPOINT, {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                    body: JSON.stringify(payload),
                }).catch(err => console.warn('[welcome-form] submit failed', err));
            } else {
                console.info('[welcome-form] endpoint not configured — submission discarded', payload);
            }

            // Animation timeline (mirrors EnvelopeTrigger/WelcomePostcard React):
            //   0ms     postcard folds (1.0s `wp-fold`)
            //   1000ms  letter rises + wax stamp drops + presses + ring + text
            //   2400ms  owl flies in, snatches letter (2.3s `wp-owl-fly`)
            //   4700ms  cleanup, mark visited, Howler stays "gone"
            overlay.classList.remove('active');
            overlay.classList.add('sending');

            setTimeout(() => {
                overlay.classList.remove('sending');
                overlay.classList.add('sealing');
            }, 1000);

            setTimeout(() => {
                overlay.classList.remove('sealing');
                overlay.classList.add('owl');
            }, 2400);

            setTimeout(() => {
                overlay.classList.remove('owl');
                localStorage.setItem('hasVisitedBefore', 'true');
                if (trigger) {
                    trigger.classList.add('gone');
                    trigger.classList.remove('hidden', 'opening', 'closing', 'idle');
                }
            }, 4700);

            return false;
        }

        // Esc closes the postcard while it's open (skip path only — Esc during
        // sending/sealing/owl is ignored so the animation finishes cleanly).
        document.addEventListener('keydown', (e) => {
            if (e.key !== 'Escape') return;
            const overlay = document.getElementById('welcomeOverlay');
            if (!overlay || !overlay.classList.contains('active')) return;
            closeWelcomeWithBottle(false);
        });
        
        // ========================================
        // V7 ROUND2: Confetti lazy-load + Toast helper
        // ========================================
        let _confettiPromise;
        function loadConfetti() {
            if (!_confettiPromise) {
                _confettiPromise = new Promise((resolve, reject) => {
                    const s = document.createElement('script');
                    s.src = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js';
                    s.onload = () => resolve(window.confetti);
                    s.onerror = reject;
                    document.head.appendChild(s);
                });
            }
            return _confettiPromise;
        }

        function showToast({ icon = '💬', title = '', html = '', duration = 6000 } = {}) {
            let container = document.getElementById('toastContainer');
            if (!container) {
                container = document.createElement('div');
                container.id = 'toastContainer';
                container.className = 'toast-container';
                container.setAttribute('aria-live', 'polite');
                container.setAttribute('aria-atomic', 'true');
                document.body.appendChild(container);
            }
            const toast = document.createElement('div');
            toast.className = 'toast';
            toast.innerHTML =
                '<span class="toast-icon" aria-hidden="true">' + icon + '</span>' +
                '<div class="toast-body">' + (title ? '<strong>' + title + '</strong>' : '') + html + '</div>' +
                '<button class="toast-close" aria-label="Dismiss">✕</button>';
            container.appendChild(toast);
            requestAnimationFrame(() => toast.classList.add('toast-show'));
            const close = () => {
                toast.classList.remove('toast-show');
                setTimeout(() => toast.remove(), 400);
            };
            toast.querySelector('.toast-close').addEventListener('click', close);
            if (duration > 0) setTimeout(close, duration);
        }

        function openChatbot() {
            const t = translationsCache && translationsCache[currentLang] || {};
            showToast({
                icon: '🤖',
                title: t['chatbot.toast_title'] || 'AI chat coming soon',
                html: t['chatbot.toast_html'] || 'For now, please reach out via email &rarr; <a href="mailto:linlin.jia@unibe.ch">linlin.jia@unibe.ch</a>',
                duration: 7000
            });
        }
        
        // ========================================
        // THEME & LANGUAGE SWITCHERS
        // ========================================
        // Theme system temporarily collapsed to single 'academic' fallback while
        // the new magic-graph theme is being designed (see docs/vibe/mindstorm-01).
        // Old ai/industrial/fancy entries kept dormant for parity until D7.
        const THEME_NAME_FALLBACK = { 'academic': 'Academic' };
        function getThemeName(theme) {
            const t = translationsCache[currentLang] || {};
            return t['themes.' + theme] || THEME_NAME_FALLBACK[theme] || 'Academic';
        }

        // Tab identity ("林" monogram) — single academic palette for now.
        const FAVICON_THEMES = {
            academic:   { bg: '#1e40af', fg: '#ffffff' }
        };
        function updateFavicon(theme) {
            const c = FAVICON_THEMES[theme] || FAVICON_THEMES.academic;
            const svg = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'>"
                + "<rect fill='" + c.bg + "' width='32' height='32' rx='7'/>"
                + "<text x='50%' y='74%' text-anchor='middle' fill='" + c.fg + "' "
                + "font-family='PingFang SC,Microsoft YaHei,Noto Sans CJK SC,sans-serif' "
                + "font-size='22' font-weight='900'>林</text></svg>";
            const el = document.getElementById('favicon');
            if (el) el.setAttribute('href', 'data:image/svg+xml,' + encodeURIComponent(svg));
        }

        function setTheme(theme) {
            // Only academic is wired right now; force-fallback any other input.
            const safe = (theme === 'academic') ? 'academic' : 'academic';
            document.body.setAttribute('data-theme', safe);
            const ctEl = document.getElementById('currentTheme');
            if (ctEl) ctEl.textContent = getThemeName(safe);
            document.querySelectorAll('#themeDropdown .dropdown-item').forEach(item => item.classList.remove('active'));
            const tgt = (typeof event !== 'undefined' && event && event.target) ? event.target : null;
            if (tgt && tgt.classList) tgt.classList.add('active');
            closeAllDropdowns && closeAllDropdowns();
            localStorage.setItem('theme', safe);
            updateFavicon(safe);
            updateChatbotIcon();
        }
        
        // Wonderland Effects Manager
        let wonderlandInterval = null;
        let scrollHandler = null;
        
        function initWonderlandEffects() {
            // Scroll-based vine growth
            scrollHandler = () => {
                const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight);
                const vines = document.querySelectorAll('.vine');
                vines.forEach((vine, i) => {
                    const maxHeight = 60 + (i * 20); // Different heights
                    vine.style.height = (scrollPercent * maxHeight) + 'vh';
                });
            };
            window.addEventListener('scroll', scrollHandler);
            scrollHandler(); // Initial call
            
            // Random dragon appearance
            wonderlandInterval = setInterval(() => {
                const dragon = document.getElementById('dragon1');
                if (Math.random() > 0.85) {
                    dragon.classList.add('visible');
                    setTimeout(() => dragon.classList.remove('visible'), 20000);
                }
            }, 10000);
            
            // Floating particles
            createFloatingParticles();
        }
        
        function stopWonderlandEffects() {
            if (scrollHandler) {
                window.removeEventListener('scroll', scrollHandler);
                scrollHandler = null;
            }
            if (wonderlandInterval) {
                clearInterval(wonderlandInterval);
                wonderlandInterval = null;
            }
            // Remove floating particles
            document.querySelectorAll('.wonderland-particle').forEach(p => p.remove());
            document.querySelectorAll('.mouse-sparkle').forEach(s => s.remove());
            document.removeEventListener('mousemove', createMouseSparkle);
        }
        
        function createFloatingParticles() {
            const particles = ['🦋', '✨', '🌸', '🍄', '🌺', '🌷', '💫'];
            const container = document.getElementById('wonderlandEffects');
            
            for (let i = 0; i < 12; i++) {
                const particle = document.createElement('div');
                particle.className = 'wonderland-particle';
                particle.textContent = particles[Math.floor(Math.random() * particles.length)];
                particle.style.left = (Math.random() * 100) + 'vw';
                particle.style.animationDelay = (Math.random() * 15) + 's';
                particle.style.fontSize = (1 + Math.random() * 1.5) + 'rem';
                container.appendChild(particle);
            }
            
            // Add mouse sparkle effect
            document.addEventListener('mousemove', createMouseSparkle);
            
            // Initialize pretext-style text wrapping
            initPretextWords();
        }
        
        let lastSparkleTime = 0;
        function createMouseSparkle(e) {
            if (document.body.getAttribute('data-theme') !== 'fancy') return;
            
            const now = Date.now();
            if (now - lastSparkleTime < 100) return; // Throttle
            lastSparkleTime = now;
            
            if (Math.random() > 0.7) { // Only 30% of movements
                const sparkle = document.createElement('div');
                sparkle.className = 'mouse-sparkle';
                sparkle.textContent = ['✨', '⭐', '💫', '🌟'][Math.floor(Math.random() * 4)];
                sparkle.style.left = e.clientX + 'px';
                sparkle.style.top = e.clientY + 'px';
                document.body.appendChild(sparkle);
                
                setTimeout(() => sparkle.remove(), 1000);
            }
        }
        
        function initPretextWords() {
            // Wrap words in hero tagline for pretext effect
            const tagline = document.querySelector('.hero-tagline');
            if (tagline && document.body.getAttribute('data-theme') === 'fancy') {
                const text = tagline.innerHTML;
                const wrapped = text.replace(/(\w+)/g, '<span class="pretext-word">$1</span>');
                tagline.innerHTML = wrapped;
            }
        }
        
        const langNames = { 'en': 'EN', 'zh': '中文', 'fr': 'FR', 'de': 'DE' };
        
        function setLanguage(lang) {
            localStorage.setItem('language', lang);

            // Cross-site redirect:
            //   * EN canonical site = parchment (`index_en.html`, has `data-site="parchment"`)
            //   * zh/fr/de live on the clear backup (`index_en_clear.html`).
            // Switch sites instead of trying to re-translate parchment in zh/fr/de
            // (parchment HTML has English-only content baked in; non-EN translations
            // are kept on the clear site for now).
            const site = document.documentElement.getAttribute('data-site') || 'clear';
            if (site === 'parchment' && lang !== 'en') {
                location.href = 'index_en_clear.html';
                return;
            }
            if (site === 'clear' && lang === 'en') {
                location.href = 'index_en.html';
                return;
            }

            document.getElementById('currentLang').textContent = langNames[lang];
            document.querySelectorAll('#langDropdown .dropdown-item').forEach(item => item.classList.remove('active'));
            if (typeof event !== 'undefined' && event && event.target) event.target.classList.add('active');
            closeAllDropdowns();

            // Apply translations instead of redirecting
            applyTranslations(lang).then(() => {
                // Refresh currentTheme display since theme name is locale-dependent
                const activeTheme = document.body.getAttribute('data-theme') || 'academic';
                const ct = document.getElementById('currentTheme');
                if (ct) ct.textContent = getThemeName(activeTheme);
                // Re-translate dynamically rendered widgets (visit map top-countries list)
                if (typeof window.__refreshVisitStats === 'function') {
                    try { window.__refreshVisitStats(); } catch (e) { /* non-fatal */ }
                }
            });
        }
        
        function toggleDropdown(id) {
            const dropdown = document.getElementById(id);
            const isOpen = dropdown.classList.contains('open');
            closeAllDropdowns();
            if (!isOpen) dropdown.classList.add('open');
        }

        function closeAllDropdowns() {
            document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('open'));
        }

        document.addEventListener('click', (e) => {
            if (!e.target.closest('.dropdown')) closeAllDropdowns();
        });

        // Mobile hamburger menu toggle.
        function toggleMobileNav() {
            const navbar = document.getElementById('navbar');
            const btn = document.getElementById('navHamburger');
            const open = navbar.classList.toggle('nav-open');
            btn.setAttribute('aria-expanded', String(open));
            btn.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
            const icon = btn.querySelector('i');
            if (icon) icon.className = open ? 'fas fa-times' : 'fas fa-bars';
        }
        function closeMobileNav() {
            const navbar = document.getElementById('navbar');
            if (!navbar.classList.contains('nav-open')) return;
            navbar.classList.remove('nav-open');
            const btn = document.getElementById('navHamburger');
            btn.setAttribute('aria-expanded', 'false');
            btn.setAttribute('aria-label', 'Open navigation menu');
            const icon = btn.querySelector('i');
            if (icon) icon.className = 'fas fa-bars';
        }
        // Close mobile nav when clicking outside.
        document.addEventListener('click', (e) => {
            const navbar = document.getElementById('navbar');
            if (!navbar || !navbar.classList.contains('nav-open')) return;
            if (!e.target.closest('#navbar')) closeMobileNav();
        });
        
        // ========================================
        // NEWS TOGGLE
        // ========================================
        let newsExpanded = false;
        function toggleNews() {
            newsExpanded = !newsExpanded;
            const container = document.getElementById('newsContainer');
            const text = document.getElementById('newsToggleText');
            const icon = document.getElementById('newsToggleIcon');
            if (newsExpanded) {
                container.classList.add('news-expanded');
                text.textContent = 'Show less';
                icon.style.transform = 'rotate(180deg)';
            } else {
                container.classList.remove('news-expanded');
                text.textContent = 'Show more';
                icon.style.transform = 'rotate(0deg)';
            }
        }
        
        // ========================================
        // NAVBAR SCROLL
        // ========================================
        window.addEventListener('scroll', function() {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 50) navbar.classList.add('scrolled');
            else navbar.classList.remove('scrolled');
        });
        
        // ========================================
        // SMOOTH SCROLL
        // ========================================
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                if (this.getAttribute('href') === '#') return;
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        });
        
        // Project cards: <div> with data-primary-href. Body click → navigate to primary.
        // Clicks inside .project-links (footer icon strip) bubble to their own <a>.
        // Supports cmd/ctrl/middle-click → new tab, keyboard Enter/Space for a11y.
        document.addEventListener('click', function(e) {
            const card = e.target.closest('.project-card[data-primary-href]');
            if (!card) return;
            if (e.target.closest('.project-links a, a, button')) return;
            const href = card.dataset.primaryHref;
            if (!href) return;
            const external = /^https?:/i.test(href);
            if (e.metaKey || e.ctrlKey || e.button === 1) {
                window.open(href, '_blank', 'noopener,noreferrer');
            } else if (external) {
                window.open(href, '_blank', 'noopener,noreferrer');
            } else {
                window.location.href = href;
            }
        });
        document.addEventListener('keydown', function(e) {
            if (e.key !== 'Enter' && e.key !== ' ') return;
            const card = e.target.closest('.project-card[data-primary-href]');
            if (!card || card !== e.target) return;
            e.preventDefault();
            const href = card.dataset.primaryHref;
            if (/^https?:/i.test(href)) {
                window.open(href, '_blank', 'noopener,noreferrer');
            } else {
                window.location.href = href;
            }
        });

        // ========================================
        // AMAP SDK LOADER + INLINE MAP
        // Dynamically load the Amap JS API only when we actually need it (CN
        // visitor detected AND a real key is configured). `_AMapSecurityConfig`
        // MUST be set on window *before* the SDK script tag is appended — that's
        // how v2.0 of the SDK picks up the jscode.
        // ========================================
        let amapSdkPromise = null;
        function isAmapConfigured() {
            return AMAP_KEY && !AMAP_KEY.startsWith('PASTE_')
                && AMAP_JSCODE && !AMAP_JSCODE.startsWith('PASTE_');
        }
        function loadAmapSdk() {
            if (amapSdkPromise) return amapSdkPromise;
            if (!isAmapConfigured()) {
                return Promise.reject(new Error('Amap key not configured'));
            }
            window._AMapSecurityConfig = { securityJsCode: AMAP_JSCODE };
            amapSdkPromise = new Promise((resolve, reject) => {
                const s = document.createElement('script');
                s.src = 'https://webapi.amap.com/maps?v=2.0'
                    + '&key=' + encodeURIComponent(AMAP_KEY)
                    + '&plugin=AMap.ToolBar,AMap.Scale';
                s.async = true;
                s.onload = () => window.AMap
                    ? resolve(window.AMap)
                    : reject(new Error('AMap global missing after load'));
                s.onerror = () => reject(new Error('Amap SDK script failed'));
                document.head.appendChild(s);
            });
            return amapSdkPromise;
        }
        let amapInitialized = false;
        function initAmapInline() {
            const host = document.getElementById('amapContainer');
            if (!host) return Promise.resolve(false);
            if (amapInitialized) return Promise.resolve(true);
            return loadAmapSdk().then(AMap => {
                // PRG @ Neubrückstrasse 10, Bern — WGS-84. Amap uses
                // GCJ-02 internally, but the GCJ-02 vs WGS-84 offset is only
                // applied inside CN borders, so Swiss coords render correctly.
                const lngLat = [7.4398, 46.9535];
                // Amap SDK supports only `zh_cn` and `en` for labels.
                const amapLang = (currentLang === 'zh') ? 'zh_cn' : 'en';
                const map = new AMap.Map(host, {
                    zoom: 15,
                    center: lngLat,
                    viewMode: '2D',
                    lang: amapLang
                });
                const marker = new AMap.Marker({
                    position: lngLat,
                    title: '伯尔尼大学模式识别研究组（PRG）',
                    anchor: 'bottom-center'
                });
                map.add(marker);
                try { map.addControl(new AMap.ToolBar({ position: { top: '10px', right: '10px' } })); } catch (_) {}
                try { map.addControl(new AMap.Scale()); } catch (_) {}
                amapInitialized = true;
                return true;
            }).catch(err => {
                console.warn('[amap] inline load failed, keeping fallback card:', err.message);
                return false;
            });
        }

        // ========================================
        // INIT ON LOAD
        // ========================================
        // Swap to the Amap map (inline, if key configured) or the Amap/Baidu
        // link-card fallback when the visitor is likely in mainland China.
        // Primary signal is IP geolocation (country.is is CORS-friendly and
        // free). Timezone acts as a zero-network fallback — less reliable (a
        // user can be abroad with a CN-timezone laptop) but still better than
        // assuming everyone has Google access. Result is cached in
        // sessionStorage to avoid hitting the API on every page.
        async function applyChinaMap() {
            const mapGoogle = document.querySelector('.contact-map');
            const mapAmap = document.querySelector('.contact-map-amap');
            const mapCn = document.querySelector('.contact-map-cn');
            if (!mapGoogle || !mapCn) return;

            const CN_TIMEZONES = new Set([
                'Asia/Shanghai', 'Asia/Chongqing', 'Asia/Harbin',
                'Asia/Urumqi', 'Asia/Kashgar', 'Asia/Chungking'
            ]);

            function applyFlag(isChina) {
                console.log('[map] visitor is', isChina ? 'CN' : 'non-CN', '— amapConfigured:', isAmapConfigured());
                if (!isChina) {
                    // Non-CN visitor: show Google, hide both CN variants.
                    mapGoogle.removeAttribute('hidden');
                    if (mapAmap) mapAmap.setAttribute('hidden', '');
                    mapCn.setAttribute('hidden', '');
                    return;
                }
                // CN visitor: hide Google. Prefer the inline Amap if a real
                // key is configured; otherwise keep the link-card fallback.
                mapGoogle.setAttribute('hidden', '');
                if (mapAmap && isAmapConfigured()) {
                    mapAmap.removeAttribute('hidden');
                    mapCn.setAttribute('hidden', '');
                    console.log('[map] loading inline Amap…');
                    initAmapInline().then(ok => {
                        if (!ok) {
                            console.warn('[map] Amap SDK failed → link-card fallback');
                            mapAmap.setAttribute('hidden', '');
                            mapCn.removeAttribute('hidden');
                        } else {
                            console.log('[map] Amap inline ready');
                        }
                    });
                } else {
                    mapCn.removeAttribute('hidden');
                    if (mapAmap) mapAmap.setAttribute('hidden', '');
                }
            }

            // 0. Dev override: `?cn=1` forces CN mode (handy for visual verify
            //    on a non-CN IP). `?cn=0` forces non-CN. Also bypasses cache.
            try {
                const p = new URLSearchParams(window.location.search).get('cn');
                if (p === '1' || p === '0') {
                    console.log('[map] ?cn=' + p + ' override active');
                    applyFlag(p === '1');
                    return;
                }
            } catch (_) { /* no URL API — continue */ }

            // 1. Session-cached result wins.
            try {
                const cached = sessionStorage.getItem('visitorCountryIsCN');
                if (cached !== null) {
                    applyFlag(cached === 'true');
                    return;
                }
            } catch (e) { /* storage blocked — continue */ }

            // 2. Timezone heuristic up front so we render something sane fast,
            //    then refine with the IP API (which may take a few hundred ms).
            let tzGuess = false;
            try {
                const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
                tzGuess = CN_TIMEZONES.has(tz);
            } catch (e) { /* bail */ }
            applyFlag(tzGuess);

            // 3. IP-based confirmation. 2.5 s timeout; any failure falls back to
            //    the timezone guess we already applied.
            try {
                const ctrl = new AbortController();
                const timer = setTimeout(() => ctrl.abort(), 2500);
                const resp = await fetch('https://api.country.is', { signal: ctrl.signal });
                clearTimeout(timer);
                if (resp.ok) {
                    const data = await resp.json();
                    const isCN = data && data.country === 'CN';
                    applyFlag(isCN);
                    try { sessionStorage.setItem('visitorCountryIsCN', String(isCN)); } catch (e) {}
                }
            } catch (e) {
                // Network / abort — keep the timezone-based guess and cache it
                // for this session so we don't retry on every page.
                try { sessionStorage.setItem('visitorCountryIsCN', String(tzGuess)); } catch (e2) {}
            }
        }

        document.addEventListener('DOMContentLoaded', function() {
            // Single 'academic' theme until the new magic-graph theme ships (D7).
            // Any legacy localStorage value (ai / industrial / fancy) is normalized.
            const savedTheme = 'academic';
            document.body.setAttribute('data-theme', savedTheme);
            const ctEl = document.getElementById('currentTheme');
            if (ctEl) ctEl.textContent = getThemeName(savedTheme);
            updateFavicon(savedTheme);
            localStorage.setItem('theme', savedTheme);
            
            // Load saved language and apply. Priority: URL ?lang= param > localStorage > system detect.
            // The ?lang= param gives each locale a distinct crawlable entry point — matches the
            // hreflang alternates declared in index_en.html <head>.
            const urlLang = (function () {
                try {
                    const p = new URLSearchParams(window.location.search).get('lang');
                    return p && ['en', 'zh', 'fr', 'de'].includes(p) ? p : null;
                } catch (e) {
                    return null;
                }
            })();
            const savedLang = urlLang || localStorage.getItem('language') || detectSystemLanguage();
            if (savedLang) {
                // Initial-load cross-site redirect: send user to the right site for their lang
                // BEFORE applying translations (avoids briefly rendering the wrong page).
                const __site = document.documentElement.getAttribute('data-site') || 'clear';
                if (__site === 'parchment' && savedLang !== 'en') {
                    location.replace('index_en_clear.html');
                    return;
                }
                if (__site === 'clear' && savedLang === 'en') {
                    location.replace('index_en.html');
                    return;
                }
                document.getElementById('currentLang').textContent = langNames[savedLang];
                applyTranslations(savedLang);
                if (urlLang) localStorage.setItem('language', urlLang);
            }
            
            // Celebration confetti on hover — any element tagged [data-celebration="true"]
            // (news rows + hero ticker items). Fires once per element per session.
            document.querySelectorAll('[data-celebration="true"]').forEach((el, idx) => {
                const cKey = el.id ? `confetti:${el.id}` : `confetti:${idx}:${(el.textContent || '').slice(0, 24)}`;
                el.addEventListener('mouseenter', () => {
                    if (sessionStorage.getItem(cKey)) return;
                    const rect = el.getBoundingClientRect();
                    if (!rect.width) return;
                    const x = (rect.left + rect.width / 2) / window.innerWidth;
                    const y = (rect.top + rect.height / 2) / window.innerHeight;
                    loadConfetti().then(fn => fn({
                        particleCount: 60,
                        spread: 65,
                        origin: { x, y }
                    }));
                    sessionStorage.setItem(cKey, 'true');
                });
            });
            
            // Swap Google Maps → Amap/Baidu card if the visitor is in mainland China
            // (Google Maps is routinely blocked there). Timezone is a cheap first
            // check; a best-effort IP lookup refines it when available.
            applyChinaMap();

            // Load dynamic citations from JSON
            loadCitations();

            // Scroll-spy: highlight the nav-link for the section the reader is on.
            // Observes the main-page sections and toggles `.active` on the matching
            // anchor link as each section crosses the upper viewport band.
            initScrollSpy();

            showWelcome();
        });

        function initScrollSpy() {
            // Sections with their own nav item are keys of `links`. Sub-sections
            // that logically belong to an existing nav item (experience / skills
            // / awards roll up under Research) are aliased so the matching nav
            // item stays highlighted as the reader scrolls through them.
            const sectionIds = ['about', 'publications', 'projects', 'research',
                                'experience', 'skills', 'awards', 'services'];
            const aliasTo = { experience: 'research', skills: 'research', awards: 'research' };
            const links = {};
            sectionIds.forEach(id => {
                const linkId = aliasTo[id] || id;
                const link = document.querySelector(`.navbar-center a[href="#${linkId}"]`);
                if (link) links[id] = link;
            });
            if (Object.keys(links).length === 0) return;
            const homeLink = document.querySelector('.navbar-center a[data-page="main"]');
            function onMainPage() {
                const main = document.getElementById('mainPage');
                return main && main.classList.contains('active');
            }
            function clearCenterActive() {
                document.querySelectorAll('.navbar-center .nav-link').forEach(l => l.classList.remove('active'));
            }
            const observer = new IntersectionObserver((entries) => {
                if (!onMainPage()) return;
                const visible = entries.filter(e => e.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
                if (visible.length === 0) return;
                const id = visible[0].target.id;
                if (!links[id]) return;
                if (window.scrollY < 120) return; // keep Home active near top
                clearCenterActive();
                links[id].classList.add('active');
            }, { rootMargin: '-35% 0px -55% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] });
            sectionIds.forEach(id => {
                const sec = document.getElementById(id);
                if (sec) observer.observe(sec);
            });
            window.addEventListener('scroll', () => {
                if (!onMainPage()) return;
                if (window.scrollY < 120) {
                    clearCenterActive();
                    if (homeLink) homeLink.classList.add('active');
                }
            }, { passive: true });
        }
        
        // Load citations from data/citations.json
        async function loadCitations() {
            try {
                const response = await fetch('data/citations.json');
                if (!response.ok) return;
                const data = await response.json();
                
                // Update total citations in stats
                const totalCitationsEls = document.querySelectorAll('[data-stat="citations"]');
                totalCitationsEls.forEach(el => {
                    el.textContent = data.total_citations + '+';
                });
                
                // Update per-publication citations
                data.publications.forEach(pub => {
                    if (pub.doi) {
                        const card = document.querySelector(`[data-doi="${pub.doi}"]`);
                        if (card) {
                            const citationEl = card.querySelector('.citation-count');
                            if (citationEl) citationEl.textContent = pub.citations;
                        }
                    }
                });
                
                console.log('Citations loaded from data/citations.json');
            } catch (err) {
                console.warn('Could not load citations:', err);
            }
        }
        
        // Detect system language
        function detectSystemLanguage() {
            const browserLang = navigator.language || navigator.userLanguage;
            const langCode = browserLang.split('-')[0];
            return ['en', 'zh', 'fr', 'de'].includes(langCode) ? langCode : 'en';
        }
        
        // Projects and Publications Filter/Search/Sort
        function initFilterableCarousel(containerId, trackId, prevId, nextId, dotsId, filterBtns, searchInput, sortSelect, autoAdvanceMs) {
            const container = document.getElementById(containerId);
            const track = document.getElementById(trackId);
            if (!track) return;
            const allCards = Array.from(track.querySelectorAll('.project-card, .pub-card'));
            const prevBtn = document.getElementById(prevId);
            const nextBtn = document.getElementById(nextId);
            const dotsContainer = document.getElementById(dotsId);

            // Scroll by one card at a time (not one page). `currentIdx` is the
            // left-most visible card index; the viewport still shows `perPage`
            // cards so there are `visibleCards.length - perPage + 1` positions.
            let currentIdx = 0;
            let visibleCards = [...allCards];

            function cardsPerPage() {
                const w = window.innerWidth;
                if (w <= 600) return 1;
                if (w <= 900) return 2;
                return 3;
            }

            function updateCarousel() {
                const perPage = cardsPerPage();
                const totalPositions = Math.max(1, visibleCards.length - perPage + 1);
                currentIdx = Math.min(currentIdx, totalPositions - 1);

                // Hide all, show visible
                allCards.forEach(c => c.style.display = 'none');
                visibleCards.forEach(c => c.style.display = '');

                // One-card step = (containerWidth + gap) / perPage
                const gapPx = parseFloat(getComputedStyle(track).gap) || 0;
                const containerWidth = container ? container.clientWidth : track.parentElement.clientWidth;
                const stepPx = (containerWidth + gapPx) / perPage;
                track.style.transform = `translateX(-${currentIdx * stepPx}px)`;

                // One dot per scroll position
                dotsContainer.innerHTML = '';
                for (let i = 0; i < totalPositions; i++) {
                    const dot = document.createElement('div');
                    dot.className = 'carousel-dot' + (i === currentIdx ? ' active' : '');
                    dot.addEventListener('click', () => { currentIdx = i; updateCarousel(); });
                    dotsContainer.appendChild(dot);
                }

                // Update buttons
                prevBtn.disabled = currentIdx === 0;
                nextBtn.disabled = currentIdx >= totalPositions - 1;
            }

            function filterCards(tag) {
                if (tag === 'all') {
                    // Exclude Fun category from the default All view
                    visibleCards = allCards.filter(c => !(c.dataset.tags && c.dataset.tags.split(',').map(s => s.trim()).includes('fun')));
                } else {
                    visibleCards = allCards.filter(c => c.dataset.tags && c.dataset.tags.split(',').map(s => s.trim()).includes(tag));
                }
                currentIdx = 0;
                updateCarousel();
            }

            function searchCards(query) {
                const q = query.toLowerCase().trim();
                if (!q) {
                    visibleCards = allCards.filter(c => !(c.dataset.tags && c.dataset.tags.split(',').map(s => s.trim()).includes('fun')));
                } else {
                    visibleCards = allCards.filter(c => c.textContent.toLowerCase().includes(q));
                }
                currentIdx = 0;
                updateCarousel();
            }

            function sortCards(sortBy) {
                if (sortBy === 'featured') {
                    visibleCards.sort((a, b) => {
                        const pa = parseInt(a.dataset.priority || 0, 10);
                        const pb = parseInt(b.dataset.priority || 0, 10);
                        if (pb !== pa) return pb - pa;
                        return (b.dataset.year || 0) - (a.dataset.year || 0);
                    });
                } else if (sortBy === 'newest') {
                    visibleCards.sort((a, b) => (b.dataset.year || 0) - (a.dataset.year || 0));
                } else if (sortBy === 'oldest') {
                    visibleCards.sort((a, b) => (a.dataset.year || 0) - (b.dataset.year || 0));
                } else if (sortBy === 'citations') {
                    visibleCards.sort((a, b) => (b.dataset.citations || 0) - (a.dataset.citations || 0));
                }
                visibleCards.forEach(c => track.appendChild(c));
                updateCarousel();
            }

            // Default visible = exclude Fun
            visibleCards = allCards.filter(c => !(c.dataset.tags && c.dataset.tags.split(',').map(s => s.trim()).includes('fun')));

            // Bind filter buttons
            filterBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    filterBtns.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    filterCards(btn.dataset.filter);
                });
            });

            // Disable filter buttons whose category currently has zero cards
            filterBtns.forEach(btn => {
                const tag = btn.dataset.filter;
                if (tag === 'all') return;
                const matchCount = allCards.filter(c =>
                    c.dataset.tags && c.dataset.tags.split(',').map(s => s.trim()).includes(tag)
                ).length;
                if (matchCount === 0) {
                    btn.disabled = true;
                    btn.setAttribute('aria-disabled', 'true');
                }
            });

            if (searchInput) {
                searchInput.addEventListener('input', (e) => searchCards(e.target.value));
            }

            if (sortSelect) {
                sortSelect.addEventListener('change', (e) => sortCards(e.target.value));
                sortCards(sortSelect.value);
            }

            // Navigation buttons — manual click advances by one screen (perPage),
            // while auto-advance (further below) ticks one card at a time.
            prevBtn.addEventListener('click', () => {
                const perPage = cardsPerPage();
                currentIdx = Math.max(0, currentIdx - perPage);
                updateCarousel();
            });
            nextBtn.addEventListener('click', () => {
                const perPage = cardsPerPage();
                const totalPositions = Math.max(1, visibleCards.length - perPage + 1);
                currentIdx = Math.min(totalPositions - 1, currentIdx + perPage);
                updateCarousel();
            });

            // Keyboard navigation (← →) when the carousel area has focus
            if (container) {
                if (!container.hasAttribute('tabindex')) container.setAttribute('tabindex', '0');
                container.addEventListener('keydown', (e) => {
                    if (e.key === 'ArrowLeft') { prevBtn.click(); e.preventDefault(); }
                    else if (e.key === 'ArrowRight') { nextBtn.click(); e.preventDefault(); }
                });

                // Horizontal wheel / trackpad swipe / shift+wheel
                let wheelLock = false;
                container.addEventListener('wheel', (e) => {
                    const absX = Math.abs(e.deltaX);
                    const absY = Math.abs(e.deltaY);
                    const horizontal = absX > absY || e.shiftKey;
                    if (!horizontal) return;
                    e.preventDefault();
                    if (wheelLock) return;
                    wheelLock = true;
                    setTimeout(() => { wheelLock = false; }, 450);
                    const delta = e.shiftKey ? e.deltaY : e.deltaX;
                    if (delta > 0) nextBtn.click(); else prevBtn.click();
                }, { passive: false });

                // ----- Touch swipe (mobile / tablet) -----
                // Finger drag horizontally → triggers prev/next. Threshold: 40px.
                // Vertical drags pass through (page can still scroll).
                let touchStartX = 0, touchStartY = 0, touchActive = false;
                container.addEventListener('touchstart', (e) => {
                    if (!e.touches || e.touches.length !== 1) return;
                    touchStartX = e.touches[0].clientX;
                    touchStartY = e.touches[0].clientY;
                    touchActive = true;
                }, { passive: true });
                container.addEventListener('touchend', (e) => {
                    if (!touchActive) return;
                    touchActive = false;
                    const t = (e.changedTouches && e.changedTouches[0]);
                    if (!t) return;
                    const dx = t.clientX - touchStartX;
                    const dy = t.clientY - touchStartY;
                    if (Math.abs(dx) < 40) return;            // too small — ignore
                    if (Math.abs(dy) > Math.abs(dx)) return;  // vertical swipe — let page scroll
                    if (dx < 0) nextBtn.click(); else prevBtn.click();
                }, { passive: true });
                container.addEventListener('touchcancel', () => { touchActive = false; }, { passive: true });
            }

            // Keep offset accurate when the viewport resizes (perPage can change)
            window.addEventListener('resize', () => updateCarousel());

            updateCarousel();

            // Optional auto-advance — wraps back to page 0 at the end.
            // Pauses on hover/focus, when the document is hidden, or if the user
            // prefers reduced motion.
            if (autoAdvanceMs > 0 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                let autoPaused = false;
                if (container) {
                    container.addEventListener('mouseenter', () => autoPaused = true);
                    container.addEventListener('mouseleave', () => autoPaused = false);
                    container.addEventListener('focusin', () => autoPaused = true);
                    container.addEventListener('focusout', () => autoPaused = false);
                }
                setInterval(() => {
                    if (autoPaused || document.hidden) return;
                    const perPage = cardsPerPage();
                    const totalPositions = Math.max(1, visibleCards.length - perPage + 1);
                    if (totalPositions < 2) return;
                    currentIdx = (currentIdx + 1) % totalPositions;
                    updateCarousel();
                }, autoAdvanceMs);
            }
        }
        
        // Initialize carousels when DOM ready
        setTimeout(() => {
            // Projects carousel — auto-advance every 7s (pauses on hover/focus)
            initFilterableCarousel(
                'projectsCarousel', 'projectsTrack', 'projectsPrev', 'projectsNext', 'projectsDots',
                document.querySelectorAll('#projects .filter-tag'),
                document.querySelector('#projects .search-box input'),
                document.querySelector('#projects .sort-select'),
                7000
            );

            // Publications list (vertical, not carousel)
            initFilterableList(
                'pubsList',
                document.querySelectorAll('#publications .filter-tag'),
                document.querySelector('#publications .search-box input'),
                document.querySelector('#publications .sort-select')
            );

            // Hero ticker — vertical one-line rotation. Pauses on hover or when
            // the document is hidden; respects prefers-reduced-motion (no rotation,
            // first item stays visible).
            initHeroTicker();
        }, 100);

        function initHeroTicker() {
            const list = document.querySelector('.hero-ticker-list');
            if (!list) return;
            const items = Array.from(list.querySelectorAll('.hero-ticker-item'));
            if (items.length === 0) return;
            function applyMarquee(item) {
                if (!item) return;
                const content = item.querySelector('.ticker-content');
                if (!content) return;
                // Reset first so we measure the natural (non-translated) width.
                item.classList.remove('is-marquee');
                content.style.removeProperty('--marquee-shift');
                content.style.removeProperty('--marquee-duration');
                const shift = content.scrollWidth - content.clientWidth;
                if (shift > 6) {
                    const duration = Math.max(8, Math.min(22, 4 + shift / 40));
                    content.style.setProperty('--marquee-shift', shift + 'px');
                    content.style.setProperty('--marquee-duration', duration.toFixed(1) + 's');
                    item.classList.add('is-marquee');
                }
            }
            items[0].classList.add('is-active');
            requestAnimationFrame(() => applyMarquee(items[0]));
            if (items.length < 2) return;
            const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            if (reduced) return;
            let idx = 0;
            let paused = false;
            list.addEventListener('mouseenter', () => paused = true);
            list.addEventListener('mouseleave', () => paused = false);
            list.addEventListener('focusin', () => paused = true);
            list.addEventListener('focusout', () => paused = false);
            // Sequential rotation: each news fills a 7s slot —
            //   1.5s disperse out → 1.5s coalesce in (next) → 4.0s steady.
            // The next item's coalesce STARTS only after the current item's disperse
            // ENDS, so there's no parallel overlap (which was perceived as "empty
            // gap in the middle"). User asked for: A's output animation ends → B's
            // input animation immediately begins.
            const DISPERSE_MS = 1500;
            const COALESCE_MS = 1500;
            const STEADY_MS   = 4000;
            const TOTAL_CYCLE = DISPERSE_MS + COALESCE_MS + STEADY_MS;  // 7000ms
            setInterval(() => {
                if (paused || document.hidden) return;
                const cur = items[idx];
                idx = (idx + 1) % items.length;
                const next = items[idx];
                // Phase 1: disperse current item
                cur.classList.remove('is-active', 'is-marquee');
                cur.classList.add('is-leaving');
                // Phase 2 (after disperse fully done): hide cur, coalesce next in
                setTimeout(() => {
                    cur.classList.remove('is-leaving');
                    next.classList.add('is-active');
                    requestAnimationFrame(() => applyMarquee(next));
                }, DISPERSE_MS);
            }, TOTAL_CYCLE);
            // Re-measure after locale change (content widths shift).
            window.addEventListener('resize', () => applyMarquee(items[idx]));
            document.addEventListener('languageChanged', () => applyMarquee(items[idx]));
        }
        
        // Filterable vertical list for publications
        function initFilterableList(listId, filterBtns, searchInput, sortSelect) {
            const list = document.getElementById(listId);
            if (!list) return;
            const allCards = Array.from(list.querySelectorAll('.pub-card'));
            let visibleCards = [...allCards];
            
            function updateList() {
                allCards.forEach(c => c.style.display = 'none');
                visibleCards.forEach(c => c.style.display = '');
            }
            
            function filterCards(tag) {
                if (tag === 'all') {
                    visibleCards = [...allCards];
                } else {
                    visibleCards = allCards.filter(c => c.dataset.tags && c.dataset.tags.includes(tag));
                }
                updateList();
            }
            
            function searchCards(query) {
                const q = query.toLowerCase().trim();
                if (!q) {
                    visibleCards = [...allCards];
                } else {
                    visibleCards = allCards.filter(c => c.textContent.toLowerCase().includes(q));
                }
                updateList();
            }
            
            function sortCards(sortBy) {
                if (sortBy === 'featured') {
                    // Accepted-first, then priority desc, then year desc
                    visibleCards.sort((a, b) => {
                        const aAcc = a.dataset.status === 'accepted' ? 1 : 0;
                        const bAcc = b.dataset.status === 'accepted' ? 1 : 0;
                        if (bAcc !== aAcc) return bAcc - aAcc;
                        const pa = parseInt(a.dataset.priority || 0, 10);
                        const pb = parseInt(b.dataset.priority || 0, 10);
                        if (pb !== pa) return pb - pa;
                        return (b.dataset.year || 0) - (a.dataset.year || 0);
                    });
                } else if (sortBy === 'newest') {
                    visibleCards.sort((a, b) => (b.dataset.year || 0) - (a.dataset.year || 0));
                } else if (sortBy === 'oldest') {
                    visibleCards.sort((a, b) => (a.dataset.year || 0) - (b.dataset.year || 0));
                } else if (sortBy === 'citations') {
                    visibleCards.sort((a, b) => (b.dataset.citations || 0) - (a.dataset.citations || 0));
                }
                visibleCards.forEach(c => list.appendChild(c));
                updateList();
            }


            filterBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    filterBtns.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    filterCards(btn.dataset.filter);
                });
            });

            // Disable filter buttons whose category currently has zero cards
            filterBtns.forEach(btn => {
                const tag = btn.dataset.filter;
                if (tag === 'all') return;
                const matchCount = allCards.filter(c =>
                    c.dataset.tags && c.dataset.tags.split(',').map(s => s.trim()).includes(tag)
                ).length;
                if (matchCount === 0) {
                    btn.disabled = true;
                    btn.setAttribute('aria-disabled', 'true');
                }
            });

            if (searchInput) {
                searchInput.addEventListener('input', (e) => searchCards(e.target.value));
            }

            if (sortSelect) {
                sortSelect.addEventListener('change', (e) => sortCards(e.target.value));
                sortCards(sortSelect.value);
            }

            updateList();
        }

        // ========================================
        // IMAGE LIGHTBOX
        // Injects a zoom button into every .project-image / .pub-thumbnail
        // that wraps a real figure (<object data=…> or <img>). Clicking the
        // button (or the image area itself) opens a fullscreen modal. ESC or
        // backdrop click closes. Returns focus to the trigger on close.
        // ========================================
        (function initImageLightbox() {
            const lightbox = document.getElementById('lightbox');
            if (!lightbox) return;
            const imgEl   = lightbox.querySelector('.lightbox-img');
            const capEl   = lightbox.querySelector('.lightbox-caption');
            const closeEl = lightbox.querySelector('.lightbox-close');
            let lastFocused = null;

            function openLightbox(src, alt) {
                lastFocused = document.activeElement;
                imgEl.src = src;
                imgEl.alt = alt || '';
                capEl.textContent = alt || '';
                lightbox.classList.add('is-open');
                lightbox.setAttribute('aria-hidden', 'false');
                document.body.classList.add('lightbox-open');
                closeEl.focus();
            }
            function closeLightbox() {
                if (!lightbox.classList.contains('is-open')) return;
                lightbox.classList.remove('is-open');
                lightbox.setAttribute('aria-hidden', 'true');
                document.body.classList.remove('lightbox-open');
                imgEl.src = '';
                if (lastFocused && typeof lastFocused.focus === 'function') {
                    lastFocused.focus();
                }
            }

            closeEl.addEventListener('click', closeLightbox);
            lightbox.addEventListener('click', (e) => {
                if (e.target === lightbox) closeLightbox();
            });
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') closeLightbox();
            });

            function attach(container) {
                const picture = container.querySelector('object[data], img');
                if (!picture) return;
                let src, alt;
                if (picture.tagName === 'OBJECT') {
                    src = picture.getAttribute('data');
                    const inner = picture.querySelector('img');
                    alt = (inner && inner.getAttribute('alt'))
                        || picture.getAttribute('aria-label') || '';
                } else {
                    src = picture.getAttribute('src');
                    alt = picture.getAttribute('alt') || '';
                }
                if (!src) return;

                container.classList.add('has-zoom');

                const btn = document.createElement('button');
                btn.type = 'button';
                btn.className = 'img-zoom-btn';
                btn.setAttribute('aria-label', 'Enlarge image');
                btn.innerHTML = '<i class="fas fa-search-plus" aria-hidden="true"></i>';
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    openLightbox(src, alt);
                });
                container.appendChild(btn);
            }

            document.querySelectorAll('.project-image, .pub-thumbnail').forEach(attach);
        })();

        // ========================================
        // Multi-image project cards: in-card carousel (gallery-style dots + swipe).
        // stopPropagation so the outer projects carousel doesn't page and a
        // swipe doesn't fire the card's delegated navigate-click.
        // ========================================
        (function initProjectImageCarousels() {
            document.querySelectorAll('.project-image.pimg-carousel').forEach(function(wrap) {
                const track = wrap.querySelector('.pimg-track');
                const slides = Array.from(wrap.querySelectorAll('.pimg-slide'));
                const dotsWrap = wrap.querySelector('.pimg-dots');
                if (!track || slides.length < 2 || !dotsWrap) return;
                let idx = 0;
                function go(n) {
                    idx = (n + slides.length) % slides.length;
                    track.style.transform = 'translateX(' + (-idx * 100) + '%)';
                    Array.from(dotsWrap.children).forEach((d, i) => d.classList.toggle('on', i === idx));
                    wrap.dataset.idx = String(idx);
                }
                slides.forEach(function(_, i) {
                    const d = document.createElement('i');
                    d.addEventListener('click', function(e) { e.stopPropagation(); go(i); });
                    dotsWrap.appendChild(d);
                });
                go(0);
                let sx = null, swiped = false;
                wrap.addEventListener('pointerdown', function(e) { sx = e.clientX; swiped = false; });
                wrap.addEventListener('pointerup', function(e) {
                    if (sx == null) return;
                    const dx = e.clientX - sx; sx = null;
                    if (Math.abs(dx) > 35) { swiped = true; go(idx + (dx < 0 ? 1 : -1)); }
                });
                // a swipe must not trigger the card's navigate-click (capture phase)
                wrap.addEventListener('click', function(e) { if (swiped) { e.stopPropagation(); e.preventDefault(); swiped = false; } }, true);
                // keep touch swipes from bubbling to the outer projects carousel
                wrap.addEventListener('touchstart', function(e) { e.stopPropagation(); }, { passive: true });
                wrap.addEventListener('touchend', function(e) { e.stopPropagation(); }, { passive: true });
            });
        })();

        // ========================================
        // Site-wide search (Cmd/Ctrl+K)
        // Indexes About/News/Projects/Publications/Experience/Services/Beyond/Thesis
        // Keyboard nav, scroll-to + flash highlight on select.
        // ========================================
        (function initSiteSearch() {
            const btn      = document.getElementById('navSearchBtn');
            const modal    = document.getElementById('siteSearchModal');
            const backdrop = document.getElementById('siteSearchBackdrop');
            const input    = document.getElementById('siteSearchInput');
            const results  = document.getElementById('siteSearchResults');
            const closeBtn = document.getElementById('siteSearchClose');
            if (!btn || !modal || !input || !results) return;

            const SECTION_LABELS = {
                about: 'About', news: 'News', projects: 'Projects',
                publications: 'Publications', experience: 'Experience',
                services: 'Services', beyond: 'Beyond', thesis: 'Thesis'
            };
            // Locale-aware label lookup. Falls through to English baseline above.
            const getSectionLabel = (section) => {
                try {
                    const t = translationsCache && translationsCache[currentLang];
                    return (t && t['search.section_' + section]) || SECTION_LABELS[section] || section;
                } catch (e) { return SECTION_LABELS[section] || section; }
            };

            let index = [];
            let currentMatches = [];
            let activeIdx = -1;
            let lastFocused = null;

            const clean = (text) => (text || '').replace(/\s+/g, ' ').trim();
            const pick = (el, sel) => el && el.querySelector(sel);
            const text = (el, sel) => clean(pick(el, sel)?.textContent);

            function pushItem(items, section, title, snippet, target) {
                if (!target) return;
                if (!title && !snippet) return;
                items.push({ section, title: title || getSectionLabel(section),
                             snippet: (snippet || '').slice(0, 180), target });
            }

            function buildIndex() {
                const items = [];
                // About
                document.querySelectorAll('#about .about-p').forEach((el) => {
                    pushItem(items, 'about', 'About Me', clean(el.textContent),
                             document.getElementById('about'));
                });
                // News
                document.querySelectorAll('#news .news-row').forEach((el) => {
                    const date = text(el, '.news-date');
                    const content = text(el, '.news-content');
                    pushItem(items, 'news', date ? `News · ${date}` : 'News', content, el);
                });
                // Projects
                document.querySelectorAll('#projects .project-card').forEach((el) => {
                    const title = text(el, '.project-title');
                    const desc = clean(el.textContent).replace(title, '').trim();
                    pushItem(items, 'projects', title, desc, el);
                });
                // Publications
                document.querySelectorAll('#publications .pub-entry').forEach((el) => {
                    const title = text(el, '.pub-title');
                    const authors = text(el, '.pub-authors');
                    const venue = text(el, '.pub-venue') || text(el, '.pub-meta');
                    pushItem(items, 'publications', title,
                             [authors, venue].filter(Boolean).join(' · '), el);
                });
                // Experience
                document.querySelectorAll('#experience .timeline-item').forEach((el) => {
                    const role = text(el, '.timeline-title');
                    const org = text(el, '.timeline-org');
                    const desc = text(el, '.timeline-desc');
                    pushItem(items, 'experience', role, [org, desc].filter(Boolean).join(' — '), el);
                });
                // Services
                document.querySelectorAll('#services .service-card').forEach((el) => {
                    const title = text(el, 'h3');
                    pushItem(items, 'services', title, clean(el.textContent).replace(title, '').trim(), el);
                });
                // Beyond: personal-cards + hobby items
                document.querySelectorAll('.personal-section .personal-card').forEach((el) => {
                    const title = text(el, '.personal-card-header h3');
                    pushItem(items, 'beyond', title, clean(el.textContent).replace(title, '').trim(), el);
                });
                document.querySelectorAll('.personal-section .hobby-item').forEach((el) => {
                    const title = text(el, '.hobby-info h4');
                    const desc = text(el, '.hobby-info p');
                    pushItem(items, 'beyond', title, desc, el);
                });
                // Thesis
                document.querySelectorAll('.thesis-highlight').forEach((el) => {
                    const title = text(el, '.thesis-highlight-title');
                    const desc = text(el, '.thesis-highlight-desc');
                    pushItem(items, 'thesis', title, desc, el);
                });
                index = items;
            }

            function escapeHtml(s) {
                return (s || '').replace(/[&<>"']/g, c => ({
                    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
                }[c]));
            }
            function highlight(raw, q) {
                const s = raw || '';
                if (!q) return escapeHtml(s);
                const lo = s.toLowerCase();
                const qLo = q.toLowerCase();
                const idx = lo.indexOf(qLo);
                if (idx < 0) return escapeHtml(s);
                return escapeHtml(s.slice(0, idx)) +
                       '<mark>' + escapeHtml(s.slice(idx, idx + q.length)) + '</mark>' +
                       escapeHtml(s.slice(idx + q.length));
            }

            function match(query) {
                const q = (query || '').toLowerCase().trim();
                if (!q) return [];
                const scored = [];
                for (const item of index) {
                    const title = (item.title || '').toLowerCase();
                    const snippet = (item.snippet || '').toLowerCase();
                    let score = 0;
                    if (title.includes(q)) score += 10;
                    if (title.startsWith(q)) score += 5;
                    if (snippet.includes(q)) score += 2;
                    if (score > 0) scored.push({ ...item, score });
                }
                return scored.sort((a, b) => b.score - a.score).slice(0, 12);
            }

            function i18nText(key, fallback) {
                try {
                    const t = translationsCache && translationsCache[currentLang];
                    return (t && t[key]) || fallback;
                } catch (e) { return fallback; }
            }

            function renderResults(query) {
                const q = query || '';
                currentMatches = match(q);
                activeIdx = currentMatches.length ? 0 : -1;
                if (!q.trim()) {
                    results.innerHTML = `<div class="site-search-empty">${escapeHtml(
                        i18nText('search.empty', 'Start typing to search across the site…'))}</div>`;
                    return;
                }
                if (!currentMatches.length) {
                    results.innerHTML = `<div class="site-search-empty">${escapeHtml(
                        i18nText('search.no_results', 'No matches found.'))}</div>`;
                    return;
                }
                results.innerHTML = currentMatches.map((m, i) => `
                    <button type="button" class="site-search-result${i === 0 ? ' is-active' : ''}" role="option" data-idx="${i}">
                        <span class="site-search-result-section">${escapeHtml(getSectionLabel(m.section))}</span>
                        <span class="site-search-result-title">${highlight(m.title, q)}</span>
                        <span class="site-search-result-snippet">${highlight(m.snippet, q)}</span>
                    </button>`).join('');
                results.querySelectorAll('.site-search-result').forEach(r => {
                    r.addEventListener('click', () => {
                        activeIdx = parseInt(r.dataset.idx, 10);
                        go();
                    });
                    r.addEventListener('mouseenter', () => {
                        setActive(parseInt(r.dataset.idx, 10));
                    });
                });
            }

            function setActive(i) {
                if (!currentMatches.length) return;
                const n = currentMatches.length;
                activeIdx = ((i % n) + n) % n;
                const rows = results.querySelectorAll('.site-search-result');
                rows.forEach((el, idx) => {
                    el.classList.toggle('is-active', idx === activeIdx);
                    if (idx === activeIdx) el.scrollIntoView({ block: 'nearest' });
                });
            }

            function go() {
                if (activeIdx < 0 || !currentMatches[activeIdx]) return;
                const target = currentMatches[activeIdx].target;
                close();
                if (!target) return;
                try { if (typeof showPage === 'function') showPage('main'); } catch (e) {}
                setTimeout(() => {
                    target.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    target.classList.add('site-search-flash');
                    setTimeout(() => target.classList.remove('site-search-flash'), 1800);
                }, 60);
            }

            function open() {
                lastFocused = document.activeElement;
                buildIndex();
                modal.hidden = false;
                document.body.classList.add('site-search-open');
                input.value = '';
                renderResults('');
                setTimeout(() => input.focus(), 30);
            }

            function close() {
                modal.hidden = true;
                document.body.classList.remove('site-search-open');
                if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
            }

            btn.addEventListener('click', open);
            if (closeBtn) closeBtn.addEventListener('click', close);
            if (backdrop) backdrop.addEventListener('click', close);

            input.addEventListener('input', () => renderResults(input.value));

            input.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowDown') { e.preventDefault(); setActive(activeIdx + 1); }
                else if (e.key === 'ArrowUp') { e.preventDefault(); setActive(activeIdx - 1); }
                else if (e.key === 'Enter')   { e.preventDefault(); go(); }
                else if (e.key === 'Escape')  { e.preventDefault(); close(); }
            });

            // Global shortcut: Cmd+K (mac) / Ctrl+K (win/linux)
            document.addEventListener('keydown', (e) => {
                if ((e.metaKey || e.ctrlKey) && e.key && e.key.toLowerCase() === 'k') {
                    e.preventDefault();
                    if (modal.hidden) open(); else close();
                }
            });
        })();

        // ========================================
        // VISIT MAP — choropleth of visitor countries
        // Data: latest data/analytics/clarity-YYYY-MM-DD.json (weekly Clarity backup).
        // World atlas is bundled locally (data/world-atlas/countries-110m.json) so the
        // CSP connect-src allowlist can stay tight (no jsDelivr fetch). D3 + topojson
        // load via <script> from jsDelivr (already permitted in script-src).
        // Block stays hidden if no snapshot is found, so the section degrades silently.
        // ========================================
        (function initVisitMap() {
            const block = document.getElementById('visitMapBlock');
            if (!block) return;

            const D3_URL = 'https://cdn.jsdelivr.net/npm/d3@7.9.0/dist/d3.min.js';
            const TOPOJSON_URL = 'https://cdn.jsdelivr.net/npm/topojson-client@3.1.0/dist/topojson-client.min.js';
            const ATLAS_URL = 'data/world-atlas/countries-110m.json';
            const SNAPSHOT_DIR = 'data/analytics/';
            const SEARCH_DAYS = 90; // Look back at most 90 days for the most recent snapshot

            // ISO-3166 alpha-2 → country name aliases used in world-atlas (English short).
            // Clarity may emit either codes or names; we normalize to atlas names.
            // Only countries we expect to plausibly appear are listed; others fall through to raw value.
            const COUNTRY_ALIAS = {
                'US': 'United States of America', 'USA': 'United States of America', 'United States': 'United States of America',
                'UK': 'United Kingdom', 'GB': 'United Kingdom',
                'CN': 'China', 'TW': 'Taiwan', 'HK': 'Hong Kong S.A.R.',
                'CH': 'Switzerland', 'DE': 'Germany', 'FR': 'France', 'IT': 'Italy', 'ES': 'Spain',
                'NL': 'Netherlands', 'BE': 'Belgium', 'AT': 'Austria', 'PT': 'Portugal',
                'PL': 'Poland', 'CZ': 'Czechia', 'SE': 'Sweden', 'NO': 'Norway', 'FI': 'Finland', 'DK': 'Denmark',
                'IE': 'Ireland', 'RO': 'Romania', 'GR': 'Greece', 'HU': 'Hungary',
                'CA': 'Canada', 'MX': 'Mexico', 'BR': 'Brazil', 'AR': 'Argentina',
                'JP': 'Japan', 'KR': 'South Korea', 'IN': 'India', 'SG': 'Singapore',
                'AU': 'Australia', 'NZ': 'New Zealand',
                'RU': 'Russia', 'UA': 'Ukraine', 'TR': 'Turkey',
                'IL': 'Israel', 'SA': 'Saudi Arabia', 'AE': 'United Arab Emirates',
                'ZA': 'South Africa', 'EG': 'Egypt'
            };

            // Try snapshot files newest-first via HEAD requests until one resolves 200.
            async function findLatestSnapshotPath() {
                const today = new Date();
                for (let i = 0; i < SEARCH_DAYS; i++) {
                    const d = new Date(today.getTime() - i * 86400000);
                    const iso = d.toISOString().slice(0, 10);
                    const path = `${SNAPSHOT_DIR}clarity-${iso}.json`;
                    try {
                        const res = await fetch(path, { method: 'HEAD', cache: 'no-store' });
                        if (res.ok) return path;
                    } catch (_) { /* keep walking back */ }
                }
                return null;
            }

            // Walk Clarity payload and aggregate session counts by atlas-friendly country name.
            function extractCountryCounts(snapshot) {
                const counts = new Map();
                const data = snapshot && snapshot.data;
                if (!Array.isArray(data)) return counts;
                for (const entry of data) {
                    if (!entry || !Array.isArray(entry.information)) continue;
                    for (const row of entry.information) {
                        const raw = row.Country || row.country || row.dimension2 || row.dimension1;
                        if (!raw || raw === 'Unknown' || raw === '') continue;
                        const sessions = parseInt(
                            row.totalSessionCount || row.sessions || row.totalSession || row.sessionCount || '0',
                            10
                        ) || 0;
                        if (!sessions) continue;
                        const name = COUNTRY_ALIAS[raw] || raw;
                        counts.set(name, (counts.get(name) || 0) + sessions);
                    }
                }
                return counts;
            }

            function loadScriptOnce(url) {
                return new Promise((resolve, reject) => {
                    if (document.querySelector(`script[data-src="${url}"]`)) { resolve(); return; }
                    const s = document.createElement('script');
                    s.src = url;
                    s.dataset.src = url;
                    s.onload = () => resolve();
                    s.onerror = () => reject(new Error(`failed to load ${url}`));
                    document.head.appendChild(s);
                });
            }

            function escapeHtml(s) {
                return String(s).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
            }

            function renderChoropleth(world, countries) {
                const svg = window.d3.select('#visitMapSvg');
                const width = 960, height = 480;
                const features = window.topojson.feature(world, world.objects.countries).features;
                const maxCount = Math.max(...countries.values(), 1);

                // Lighten/darken from CSS var --primary so the choropleth picks up the theme.
                // Fallback: a calm steel-blue.
                const themeColor = (getComputedStyle(document.documentElement).getPropertyValue('--primary').trim()
                    || getComputedStyle(document.body).getPropertyValue('--primary').trim()
                    || '#3b82f6');
                const colorScale = window.d3.scaleSequential()
                    .domain([0, maxCount])
                    .interpolator(window.d3.interpolateRgb('rgba(120,144,180,0.18)', themeColor));

                const projection = window.d3.geoNaturalEarth1().fitSize([width, height - 10], { type: 'Sphere' });
                const path = window.d3.geoPath(projection);

                svg.selectAll('path').remove();
                svg.append('g')
                    .selectAll('path')
                    .data(features)
                    .enter().append('path')
                    .attr('d', path)
                    .attr('class', d => {
                        const name = d.properties && d.properties.name;
                        return countries.has(name) ? 'country-fill' : 'country-base';
                    })
                    .attr('fill', d => {
                        const name = d.properties && d.properties.name;
                        const c = countries.get(name);
                        return c ? colorScale(c) : null;
                    })
                    .append('title')
                    .text(d => {
                        const name = d.properties && d.properties.name;
                        const c = countries.get(name);
                        return name + (c ? ` — ${c}` : '');
                    });
            }

            // Look up locale-specific country display name; fall through to atlas English.
            function localizeCountry(name) {
                try {
                    const t = translationsCache && translationsCache[currentLang];
                    return (t && t['countries.' + name]) || name;
                } catch (e) { return name; }
            }

            function renderStats(countries) {
                const total = Array.from(countries.values()).reduce((a, b) => a + b, 0);
                const totalEl = document.getElementById('visitTotalCount');
                const countriesEl = document.getElementById('visitCountriesCount');
                if (totalEl) totalEl.textContent = total.toLocaleString();
                if (countriesEl) countriesEl.textContent = countries.size.toLocaleString();

                const ol = document.getElementById('visitTopList');
                if (!ol) return;
                ol.innerHTML = '';
                Array.from(countries.entries())
                    .sort((a, b) => b[1] - a[1])
                    .slice(0, 5)
                    .forEach(([name, count]) => {
                        const li = document.createElement('li');
                        li.innerHTML =
                            `<span class="country-name">${escapeHtml(localizeCountry(name))}</span>` +
                            `<span class="country-count">${count.toLocaleString()}</span>`;
                        ol.appendChild(li);
                    });
            }

            async function run() {
                const snapshotPath = await findLatestSnapshotPath();
                if (!snapshotPath) return;

                let snapshot;
                try {
                    const r = await fetch(snapshotPath, { cache: 'no-store' });
                    if (!r.ok) return;
                    snapshot = await r.json();
                } catch (_) { return; }

                const countries = extractCountryCounts(snapshot);
                if (!countries.size) return;

                try {
                    await loadScriptOnce(D3_URL);
                    await loadScriptOnce(TOPOJSON_URL);
                } catch (e) {
                    console.warn('visit-map: failed to load D3/topojson', e);
                    return;
                }

                let world;
                try {
                    const r = await fetch(ATLAS_URL);
                    if (!r.ok) return;
                    world = await r.json();
                } catch (_) { return; }

                renderChoropleth(world, countries);
                renderStats(countries);
                // Expose a hook so language switches re-translate the top-countries list
                // (choropleth tooltips re-render naturally on next hover; the side-panel list does not).
                window.__refreshVisitStats = () => renderStats(countries);
                block.hidden = false;
            }

            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', run, { once: true });
            } else {
                run();
            }
        })();
