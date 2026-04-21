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
                'hero.title': '图机器学习 · 时空学习 · 图 AI 用于科学与工业 · LLM 系统与智能体',
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
        
        // ========================================
        // NEW WELCOME SYSTEM - CELEBRATION STYLE
        // ========================================
        function openGiftBox() {
            // Big confetti burst (lazy-loads canvas-confetti on first use)
            loadConfetti().then(fn => fn({
                particleCount: 150,
                spread: 100,
                origin: { x: 0.1, y: 0.8 }
            }));
            
            // Show the postcard popup
            setTimeout(() => {
                document.getElementById('welcomeOverlay').classList.add('active');
            }, 300);
            
            // Hide the trigger
            document.getElementById('celebrationTrigger').classList.add('hidden');
        }
        
        function showWelcome() {
            const hasVisited = localStorage.getItem('hasVisitedBefore');
            if (hasVisited) {
                // Returning visitor: hide celebration, show chatbot
                document.getElementById('celebrationTrigger').classList.add('hidden');
                document.getElementById('chatbotTrigger').classList.add('active');
                updateChatbotIcon();
            }
            // New visitors see the celebration trigger
        }
        
        function updateChatbotIcon() {
            const theme = document.body.getAttribute('data-theme') || 'ai';
            const icons = {
                'ai': '👩‍💻',      // AI girl
                'academic': '👨‍🔬', // Researcher
                'industrial': '🤖', // Robot
                'fancy': '😺'       // Cheshire cat
            };
            const iconEl = document.getElementById('chatbotIcon');
            if (iconEl) iconEl.textContent = icons[theme] || '🤖';
        }
        
        function closeWelcome() {
            document.getElementById('welcomeOverlay').classList.remove('active');
            localStorage.setItem('hasVisitedBefore', 'true');
            // Show chatbot button
            document.getElementById('chatbotTrigger').classList.add('active');
            updateChatbotIcon();
        }
        
        function closeWelcomeWithBottle() {
            const overlay = document.getElementById('welcomeOverlay');
            overlay.classList.add('closing');
            
            // Small confetti for the bottle effect
            setTimeout(() => {
                loadConfetti().then(fn => fn({
                    particleCount: 30,
                    spread: 40,
                    origin: { x: 0.7, y: 0.6 },
                    colors: ['#3b82f6', '#06b6d4', '#10b981']
                }));
            }, 500);
            
            setTimeout(() => {
                overlay.classList.remove('active', 'closing');
                localStorage.setItem('hasVisitedBefore', 'true');
                // Show chatbot button
                document.getElementById('chatbotTrigger').classList.add('active');
                updateChatbotIcon();
            }, 1000);
        }
        
        // Welcome-form backend endpoint (Google Apps Script Web App URL).
        // See setup/form-backend-google-sheets.md for how to create it.
        const WELCOME_FORM_ENDPOINT = 'PASTE_YOUR_APPS_SCRIPT_WEB_APP_URL_HERE';

        async function submitWelcome(e) {
            e.preventDefault();

            const payload = {
                name: document.getElementById('visitorName').value.trim(),
                profession: document.getElementById('visitorProfession').value,
                message: document.getElementById('visitorMessage').value.trim(),
                theme: document.body.getAttribute('data-theme') || 'ai',
                locale: (typeof currentLang !== 'undefined' ? currentLang : document.documentElement.lang) || 'en',
                userAgent: navigator.userAgent,
                referrer: document.referrer || '',
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

            // Big celebration confetti
            loadConfetti().then(fn => fn({
                particleCount: 200,
                spread: 120,
                origin: { y: 0.5 }
            }));

            // Thank you message — inherits theme colors from .welcome-postcard vars.
            const [thanksTitle, thanksSubtitle] = await Promise.all([
                t('welcome.thanks_title'),
                t('welcome.thanks_subtitle')
            ]);
            const postcard = document.querySelector('.welcome-postcard');
            postcard.innerHTML = `
                <div style="text-align:center;padding:1.5rem 1rem;">
                    <div style="font-size:2.5rem;margin-bottom:0.75rem;">✉️</div>
                    <h2 style="color:var(--pc-text);margin:0 0 0.35rem;font-family:var(--font-display,inherit);font-weight:600;">${thanksTitle}</h2>
                    <p style="color:var(--pc-text-muted);margin:0;font-size:0.9rem;">${thanksSubtitle}</p>
                </div>
            `;

            // Close after delay with bottle effect
            setTimeout(closeWelcomeWithBottle, 2000);
        }
        
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
            showToast({
                icon: '🤖',
                title: 'AI chat coming soon',
                html: 'For now, the human version replies fast &rarr; <a href="mailto:linlin.jia@unibe.ch">linlin.jia@unibe.ch</a>',
                duration: 7000
            });
        }
        
        // ========================================
        // THEME & LANGUAGE SWITCHERS
        // ========================================
        const themeNames = { 'ai': 'AI', 'academic': 'Academic', 'industrial': 'Industrial', 'fancy': 'Wonderland' };

        // Tab identity ("林" monogram) — background + ink colors track the active theme.
        const FAVICON_THEMES = {
            ai:         { bg: '#1e3a8a', fg: '#ffffff' },
            academic:   { bg: '#1e40af', fg: '#ffffff' },
            industrial: { bg: '#0f172a', fg: '#f97316' },
            fancy:      { bg: '#be185d', fg: '#ffffff' }
        };
        function updateFavicon(theme) {
            const c = FAVICON_THEMES[theme] || FAVICON_THEMES.ai;
            const svg = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'>"
                + "<rect fill='" + c.bg + "' width='32' height='32' rx='7'/>"
                + "<text x='50%' y='74%' text-anchor='middle' fill='" + c.fg + "' "
                + "font-family='PingFang SC,Microsoft YaHei,Noto Sans CJK SC,sans-serif' "
                + "font-size='22' font-weight='900'>林</text></svg>";
            const el = document.getElementById('favicon');
            if (el) el.setAttribute('href', 'data:image/svg+xml,' + encodeURIComponent(svg));
        }

        function setTheme(theme) {
            document.body.setAttribute('data-theme', theme);
            document.getElementById('currentTheme').textContent = themeNames[theme];
            document.querySelectorAll('#themeDropdown .dropdown-item').forEach(item => item.classList.remove('active'));
            event.target.classList.add('active');
            closeAllDropdowns();
            localStorage.setItem('theme', theme);
            
            updateFavicon(theme);

            // Update chatbot icon based on theme
            updateChatbotIcon();
            
            // Initialize Wonderland effects if fancy theme
            if (theme === 'fancy') {
                initWonderlandEffects();
            } else {
                stopWonderlandEffects();
            }
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
            document.getElementById('currentLang').textContent = langNames[lang];
            document.querySelectorAll('#langDropdown .dropdown-item').forEach(item => item.classList.remove('active'));
            event.target.classList.add('active');
            closeAllDropdowns();
            localStorage.setItem('language', lang);
            
            // Apply translations instead of redirecting
            applyTranslations(lang);
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
        
        // ========================================
        // INIT ON LOAD
        // ========================================
        document.addEventListener('DOMContentLoaded', function() {
            // Load saved theme and initialize effects
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme) {
                document.body.setAttribute('data-theme', savedTheme);
                document.getElementById('currentTheme').textContent = themeNames[savedTheme];
                updateFavicon(savedTheme);
                if (savedTheme === 'fancy') {
                    initWonderlandEffects();
                }
            } else {
                updateFavicon('ai');
            }
            
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
                document.getElementById('currentLang').textContent = langNames[savedLang];
                applyTranslations(savedLang);
                if (urlLang) localStorage.setItem('language', urlLang);
            }
            
            // ICPR celebration confetti - only on hover and not seen before
            const icprNews = document.getElementById('icprNews');
            if (icprNews) {
                icprNews.addEventListener('mouseenter', function() {
                    if (!sessionStorage.getItem('icprConfettiShown')) {
                        const rect = icprNews.getBoundingClientRect();
                        const x = (rect.left + rect.width / 2) / window.innerWidth;
                        const y = (rect.top + rect.height / 2) / window.innerHeight;
                        loadConfetti().then(fn => fn({
                            particleCount: 80,
                            spread: 70,
                            origin: { x: x, y: y }
                        }));
                        sessionStorage.setItem('icprConfettiShown', 'true');
                    }
                });
            }
            
            // Load dynamic citations from JSON
            loadCitations();
            
            showWelcome();
        });
        
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
        function initFilterableCarousel(containerId, trackId, prevId, nextId, dotsId, filterBtns, searchInput, sortSelect) {
            const track = document.getElementById(trackId);
            if (!track) return;
            const allCards = Array.from(track.querySelectorAll('.project-card, .pub-card'));
            const prevBtn = document.getElementById(prevId);
            const nextBtn = document.getElementById(nextId);
            const dotsContainer = document.getElementById(dotsId);
            
            let currentPage = 0;
            const cardsPerPage = 3;
            let visibleCards = [...allCards];
            
            function updateCarousel() {
                const totalPages = Math.max(1, Math.ceil(visibleCards.length / cardsPerPage));
                currentPage = Math.min(currentPage, totalPages - 1);
                
                // Hide all, show visible
                allCards.forEach(c => c.style.display = 'none');
                visibleCards.forEach(c => c.style.display = '');
                
                // Calculate offset
                const offset = -currentPage * 100;
                track.style.transform = `translateX(${offset}%)`;
                
                // Update dots
                dotsContainer.innerHTML = '';
                for (let i = 0; i < totalPages; i++) {
                    const dot = document.createElement('div');
                    dot.className = 'carousel-dot' + (i === currentPage ? ' active' : '');
                    dot.addEventListener('click', () => { currentPage = i; updateCarousel(); });
                    dotsContainer.appendChild(dot);
                }
                
                // Update buttons
                prevBtn.disabled = currentPage === 0;
                nextBtn.disabled = currentPage >= totalPages - 1;
            }
            
            function filterCards(tag) {
                if (tag === 'all') {
                    visibleCards = [...allCards];
                } else {
                    visibleCards = allCards.filter(c => c.dataset.tags && c.dataset.tags.includes(tag));
                }
                currentPage = 0;
                updateCarousel();
            }
            
            function searchCards(query) {
                const q = query.toLowerCase().trim();
                if (!q) {
                    visibleCards = [...allCards];
                } else {
                    visibleCards = allCards.filter(c => c.textContent.toLowerCase().includes(q));
                }
                currentPage = 0;
                updateCarousel();
            }
            
            function sortCards(sortBy) {
                if (sortBy === 'newest') {
                    visibleCards.sort((a, b) => (b.dataset.year || 0) - (a.dataset.year || 0));
                } else if (sortBy === 'oldest') {
                    visibleCards.sort((a, b) => (a.dataset.year || 0) - (b.dataset.year || 0));
                } else if (sortBy === 'citations') {
                    visibleCards.sort((a, b) => (b.dataset.citations || 0) - (a.dataset.citations || 0));
                }
                // Re-order in DOM
                visibleCards.forEach(c => track.appendChild(c));
                updateCarousel();
            }
            
            // Bind filter buttons
            filterBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    filterBtns.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    filterCards(btn.dataset.filter);
                });
            });
            
            // Bind search
            if (searchInput) {
                searchInput.addEventListener('input', (e) => searchCards(e.target.value));
            }
            
            // Bind sort
            if (sortSelect) {
                sortSelect.addEventListener('change', (e) => sortCards(e.target.value));
            }
            
            // Navigation buttons
            prevBtn.addEventListener('click', () => { currentPage = Math.max(0, currentPage - 1); updateCarousel(); });
            nextBtn.addEventListener('click', () => { currentPage++; updateCarousel(); });
            
            updateCarousel();
        }
        
        // Initialize carousels when DOM ready
        setTimeout(() => {
            // Projects carousel
            initFilterableCarousel(
                'projectsCarousel', 'projectsTrack', 'projectsPrev', 'projectsNext', 'projectsDots',
                document.querySelectorAll('#projects .filter-tag'),
                document.querySelector('#projects .search-box input'),
                document.querySelector('#projects .sort-select')
            );
            
            // Publications list (vertical, not carousel)
            initFilterableList(
                'pubsList',
                document.querySelectorAll('#publications .filter-tag'),
                document.querySelector('#publications .search-box input'),
                document.querySelector('#publications .sort-select')
            );
        }, 100);
        
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
                if (sortBy === 'newest') {
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
            
            if (searchInput) {
                searchInput.addEventListener('input', (e) => searchCards(e.target.value));
            }
            
            if (sortSelect) {
                sortSelect.addEventListener('change', (e) => sortCards(e.target.value));
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
