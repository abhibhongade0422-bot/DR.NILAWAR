// =========================================
// NILAWAR SMILE CARE — SHARED JAVASCRIPT
// GSAP ScrollTrigger + Dental Animations
// =========================================

gsap.registerPlugin(ScrollTrigger);

// --- NAVBAR SCROLL ---
const navbar = document.querySelector('.navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 60);
    });
    // Trigger on load for inner pages
    if (window.scrollY > 60) navbar.classList.add('scrolled');
}

// --- REVEAL ANIMATIONS ---
gsap.utils.toArray('.reveal').forEach((el) => {
    gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none reverse'
        }
    });
});

// --- HERO ENTRANCE ---
const heroTL = gsap.timeline({ defaults: { ease: 'power3.out' } });
if (document.querySelector('.hero')) {
    heroTL
        .fromTo('.nav-inner', { y: -40, opacity: 0 }, { y: 0, opacity: 1, duration: 1, delay: 0.1 })
        .fromTo('.hero-text > *', { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, stagger: 0.15 }, '-=0.6')
        .fromTo('.hero-img-wrapper', { scale: 0.85, opacity: 0, y: 40 }, { scale: 1, opacity: 1, y: 0, duration: 1.2 }, '-=0.7')
        .fromTo('.float-badge', { scale: 0.5, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, stagger: 0.15, ease: 'back.out(1.7)' }, '-=0.4')
        .fromTo('.dental-float', { opacity: 0, scale: 0 }, { opacity: 0.15, scale: 1, duration: 0.8, stagger: 0.1 }, '-=0.3');
}

// --- STAGGERED CARD ANIMATIONS ---
gsap.utils.toArray('.service-card, .testimonial-card, .gallery-item, .info-card').forEach((card, i) => {
    gsap.fromTo(card,
        { y: 60, opacity: 0, scale: 0.95 },
        {
            y: 0, opacity: 1, scale: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: card,
                start: 'top 88%',
                toggleActions: 'play none none reverse'
            },
            delay: (i % 3) * 0.12
        }
    );
});

// --- STATS COUNTER ANIMATION ---
gsap.utils.toArray('.stat-number').forEach((stat) => {
    const target = parseInt(stat.getAttribute('data-count')) || 0;
    const suffix = stat.getAttribute('data-suffix') || '';
    ScrollTrigger.create({
        trigger: stat,
        start: 'top 85%',
        once: true,
        onEnter: () => {
            gsap.to({ val: 0 }, {
                val: target,
                duration: 2,
                ease: 'power2.out',
                onUpdate: function () {
                    stat.textContent = Math.round(this.targets()[0].val) + suffix;
                }
            });
        }
    });
});

// --- ABOUT SECTION PARALLAX ---
if (document.querySelector('.about-image')) {
    gsap.fromTo('.about-image .img-frame', 
        { y: 50 },
        {
            y: -30,
            ease: 'none',
            scrollTrigger: {
                trigger: '.about-grid',
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.5
            }
        }
    );
}

// --- ANIMATED DENTAL SVG ELEMENTS ---
function injectDentalElements() {
    const toothSVG = `<svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 5C30 5 15 20 15 40C15 55 20 65 25 80C30 95 35 115 40 115C45 115 47 95 50 85C53 95 55 115 60 115C65 115 70 95 75 80C80 65 85 55 85 40C85 20 70 5 50 5Z" 
              stroke="currentColor" stroke-width="3" fill="none" opacity="0.6"/>
    </svg>`;

    const sparkleSVG = `<svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
        <path d="M25 0L30 20L50 25L30 30L25 50L20 30L0 25L20 20Z" fill="currentColor" opacity="0.4"/>
    </svg>`;

    const toothbrushSVG = `<svg viewBox="0 0 120 30" xmlns="http://www.w3.org/2000/svg">
        <rect x="40" y="10" width="80" height="10" rx="5" fill="currentColor" opacity="0.3"/>
        <rect x="0" y="5" width="45" height="20" rx="5" fill="currentColor" opacity="0.4"/>
        <line x1="5" y1="8" x2="5" y2="22" stroke="white" stroke-width="1.5" opacity="0.3"/>
        <line x1="12" y1="8" x2="12" y2="22" stroke="white" stroke-width="1.5" opacity="0.3"/>
        <line x1="19" y1="8" x2="19" y2="22" stroke="white" stroke-width="1.5" opacity="0.3"/>
        <line x1="26" y1="8" x2="26" y2="22" stroke="white" stroke-width="1.5" opacity="0.3"/>
        <line x1="33" y1="8" x2="33" y2="22" stroke="white" stroke-width="1.5" opacity="0.3"/>
    </svg>`;

    const sections = document.querySelectorAll('.hero, .page-header, .testimonials-section, .cta-banner');
    sections.forEach(section => {
        const positions = [
            { top: '10%', left: '5%', size: 80, cls: 'tooth-icon', svg: toothSVG },
            { top: '70%', right: '8%', size: 60, cls: 'tooth-icon-2', svg: toothSVG },
            { top: '20%', right: '15%', size: 30, cls: 'tooth-icon', svg: sparkleSVG },
            { bottom: '15%', left: '12%', size: 25, cls: 'tooth-icon-2', svg: sparkleSVG },
            { top: '50%', left: '2%', size: 100, cls: 'tooth-icon-3', svg: toothbrushSVG },
        ];

        positions.forEach(pos => {
            const el = document.createElement('div');
            el.className = `dental-float ${pos.cls}`;
            el.innerHTML = pos.svg;
            el.style.width = pos.size + 'px';
            el.style.height = pos.size + 'px';
            el.style.color = 'var(--accent)';
            if (pos.top) el.style.top = pos.top;
            if (pos.bottom) el.style.bottom = pos.bottom;
            if (pos.left) el.style.left = pos.left;
            if (pos.right) el.style.right = pos.right;
            section.appendChild(el);
        });
    });

    // Sparkle dots on light sections
    const lightSections = document.querySelectorAll('.section-padding:not(.testimonials-section)');
    lightSections.forEach(section => {
        if (section.querySelector('.sparkle-dot')) return;
        for (let i = 0; i < 5; i++) {
            const dot = document.createElement('div');
            dot.className = 'sparkle-dot';
            dot.style.top = (Math.random() * 80 + 10) + '%';
            dot.style.left = (Math.random() * 90 + 5) + '%';
            dot.style.animationDelay = (Math.random() * 3) + 's';
            dot.style.animationDuration = (1.5 + Math.random() * 2) + 's';
            section.style.position = 'relative';
            section.appendChild(dot);
        }
    });
}

// --- SCROLL-DRIVEN TOOTH ROTATION ---
function initScrollDentalEffects() {
    gsap.utils.toArray('.tooth-icon-3').forEach((el) => {
        gsap.to(el, {
            rotation: 360,
            ease: 'none',
            scrollTrigger: {
                trigger: el.closest('section') || el.parentElement,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 2
            }
        });
    });

    gsap.utils.toArray('.tooth-icon, .tooth-icon-2').forEach((el) => {
        gsap.to(el, {
            y: -40,
            ease: 'none',
            scrollTrigger: {
                trigger: el.closest('section') || el.parentElement,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1
            }
        });
    });
}

// --- GALLERY LIGHTBOX ---
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;
    const lbImg = lightbox.querySelector('img');

    document.querySelectorAll('.gallery-item img').forEach(img => {
        img.addEventListener('click', () => {
            lbImg.src = img.src;
            lightbox.classList.add('active');
        });
    });

    lightbox.addEventListener('click', () => {
        lightbox.classList.remove('active');
    });
}

// --- MOBILE MENU ---
function initMobileMenu() {
    const toggle = document.querySelector('.mobile-toggle');
    const links = document.querySelector('.nav-links');
    if (!toggle || !links) return;

    toggle.addEventListener('click', () => {
        links.style.display = links.style.display === 'flex' ? 'none' : 'flex';
        links.style.flexDirection = 'column';
        links.style.position = 'absolute';
        links.style.top = '100%';
        links.style.left = '0';
        links.style.width = '100%';
        links.style.background = 'rgba(10,22,40,0.95)';
        links.style.padding = '20px';
        links.style.borderRadius = '0 0 20px 20px';
    });
}

// --- INIT ---
document.addEventListener('DOMContentLoaded', () => {
    injectDentalElements();
    initScrollDentalEffects();
    initLightbox();
    initMobileMenu();
});

// =========================================
// SMILE HEALTH SCORE QUIZ
// =========================================
let quizScore = 0;
let currentQ = 0;
const totalQ = 5;

function selectOption(btn) {
    // Mark selected
    btn.parentElement.querySelectorAll('.quiz-option').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');

    // Add score
    quizScore += parseInt(btn.getAttribute('data-score'));
    currentQ++;

    // Delay then advance
    setTimeout(() => {
        if (currentQ < totalQ) {
            // Hide current, show next
            document.querySelector(`.quiz-question[data-q="${currentQ - 1}"]`).classList.remove('active');
            document.querySelector(`.quiz-question[data-q="${currentQ}"]`).classList.add('active');

            // Update progress
            const pct = ((currentQ + 1) / totalQ) * 100;
            document.getElementById('quizProgressFill').style.width = pct + '%';
            document.getElementById('quizProgressText').textContent = `Question ${currentQ + 1} of ${totalQ}`;
        } else {
            showResult();
        }
    }, 400);
}

function showResult() {
    // Hide questions, progress
    document.getElementById('quizQuestions').style.display = 'none';
    document.querySelector('.quiz-progress-bar').style.display = 'none';
    document.getElementById('quizProgressText').style.display = 'none';

    // Show result
    const resultDiv = document.getElementById('quizResult');
    resultDiv.style.display = 'block';

    // Animate score ring
    const circumference = 389.56;
    const offset = circumference - (quizScore / 50) * circumference;
    const circle = document.getElementById('scoreCircle');

    gsap.to(circle, {
        strokeDashoffset: offset,
        duration: 1.5,
        ease: 'power2.out'
    });

    // Animate counter
    gsap.to({ val: 0 }, {
        val: quizScore,
        duration: 1.5,
        ease: 'power2.out',
        onUpdate: function() {
            document.getElementById('scoreValue').textContent = Math.round(this.targets()[0].val);
        }
    });

    // Score messages
    const titleEl = document.getElementById('scoreTitle');
    const msgEl = document.getElementById('scoreMessage');

    if (quizScore >= 40) {
        titleEl.textContent = '🌟 Excellent Dental Health!';
        titleEl.style.color = '#10b981';
        msgEl.textContent = 'Your dental habits are outstanding! Keep it up and schedule your routine checkup to maintain your perfect smile.';
    } else if (quizScore >= 25) {
        titleEl.textContent = '😊 Good, But Room to Improve';
        titleEl.style.color = '#f59e0b';
        msgEl.textContent = 'You\'re on the right track, but there are areas that need attention. A professional consultation can help you level up your dental health.';
    } else {
        titleEl.textContent = '⚠️ Your Smile Needs Attention';
        titleEl.style.color = '#ef4444';
        msgEl.textContent = 'Your dental health needs professional care. Don\'t worry — Dr. Nilawar can create a personalized treatment plan to restore your smile. Book now!';
    }
}

function resetQuiz() {
    quizScore = 0;
    currentQ = 0;

    // Reset UI
    document.getElementById('quizQuestions').style.display = 'block';
    document.querySelector('.quiz-progress-bar').style.display = 'block';
    document.getElementById('quizProgressText').style.display = 'block';
    document.getElementById('quizResult').style.display = 'none';
    document.getElementById('quizProgressFill').style.width = '20%';
    document.getElementById('quizProgressText').textContent = 'Question 1 of 5';

    // Reset score circle
    document.getElementById('scoreCircle').style.strokeDashoffset = '389.56';
    document.getElementById('scoreValue').textContent = '0';

    // Reset questions
    document.querySelectorAll('.quiz-question').forEach(q => q.classList.remove('active'));
    document.querySelector('.quiz-question[data-q="0"]').classList.add('active');
    document.querySelectorAll('.quiz-option').forEach(b => b.classList.remove('selected'));
}
