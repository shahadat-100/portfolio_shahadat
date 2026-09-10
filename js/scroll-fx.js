/* ═══════════════════════════════════════════════════════════════════
   SCROLL FX — GSAP ScrollTrigger. The site's motion system:
   scroll-reveal entrances, masked heading lines, cinematic parallax,
   and the marquee skew-on-velocity.

   Reduced motion: the matchMedia block never runs, no DOM is touched,
   and CSS leaves every reveal target fully visible.
   ═══════════════════════════════════════════════════════════════════ */
(function () {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  // Keep ScrollTrigger in step with Lenis (window.lenis is set by the module
  // in index.html, which runs after this classic script).
  (function wireLenis(tries) {
    if (window.lenis && typeof window.lenis.on === 'function') {
      window.lenis.on('scroll', ScrollTrigger.update);
    } else if (tries < 60) {
      setTimeout(() => wireLenis(tries + 1), 50);
    }
  })(0);

  const mm = gsap.matchMedia();

  mm.add(
    {
      reduce: '(prefers-reduced-motion: reduce)',
      desktop: '(min-width: 769px)',
    },
    (ctx) => {
      if (ctx.conditions.reduce) return;
      const isDesktop = ctx.conditions.desktop;
      const D = isDesktop ? 1 : 0.62; // travel distance multiplier

      const EXPO = 'expo.out';
      const SOFT = 'power4.out';

      // ── A. Masked heading line reveal ──────────────────────────────
      gsap.utils.toArray('h1:not([data-no-reveal]), h2').forEach((h) => {
        if (h.dataset.split) return;
        h.dataset.split = '1';
        h.innerHTML = h.innerHTML
          .split(/<br\s*\/?>/i)
          .map((s) => `<span class="line-mask"><span class="line-inner">${s.trim()}</span></span>`)
          .join('');

        gsap.from(h.querySelectorAll('.line-inner'), {
          yPercent: 118,
          duration: 1.15,
          ease: EXPO,
          stagger: 0.12,
          scrollTrigger: { trigger: h, start: 'top 82%', once: true },
        });
      });

      // ── B. Directional / generic block reveals ─────────────────────
      const blockReveal = (sel, vars) =>
        gsap.utils.toArray(sel).forEach((el) => {
          gsap.from(el, {
            ...vars,
            autoAlpha: 0,
            duration: 1.25,
            ease: SOFT,
            scrollTrigger: { trigger: el, start: 'top 85%', once: true },
          });
        });
      blockReveal('.reveal', { y: 96 * D });
      blockReveal('.reveal-left', { x: -100 * D });
      blockReveal('.reveal-right', { x: 100 * D });

      // ── C. Staggered items below the hero (cards, timeline rows) ────
      const scrollStaggers = gsap.utils
        .toArray('.stagger-item')
        .filter((el) => !el.closest('#hero'));

      ScrollTrigger.batch(scrollStaggers, {
        start: 'top 88%',
        once: true,
        onEnter: (batch) =>
          gsap.from(batch, {
            y: 80 * D,
            opacity: 0,
            duration: 1.1,
            ease: 'power3.out',
            stagger: { each: 0.09, from: 'start' },
            overwrite: true,
          }),
      });

      // ── C2. Hero spec list — reveal when the preloader wipes away ──
      const heroStaggers = gsap.utils.toArray('#hero .stagger-item');
      if (heroStaggers.length) {
        gsap.set(heroStaggers, { y: 44, opacity: 0 });
        let specDone = false;
        const revealSpec = () => {
          if (specDone) return;
          specDone = true;
          gsap.to(heroStaggers, {
            y: 0, opacity: 1, duration: 1, ease: 'power3.out', stagger: 0.09,
          });
        };
        const loader = document.getElementById('loading-screen');
        if (!loader || loader.classList.contains('hidden')) {
          revealSpec();
        } else {
          window.addEventListener('preloader:done', () => setTimeout(revealSpec, 250), { once: true });
          setTimeout(revealSpec, 5000); // failsafe
        }
      }

      // ── D. Cinematic parallax (scrubbed) ──────────────────────────
      gsap.to('#hero-canvas', {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true },
      });

      const heroInner = document.querySelector('#hero > div:not(.hero-orb)');
      if (heroInner && isDesktop) {
        gsap.to(heroInner, {
          yPercent: -14,
          ease: 'none',
          scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true },
        });
      }

      // ── E. Marquee skew on scroll velocity ───────────────────────
      const rows = gsap.utils.toArray('.marquee-row');
      if (rows.length) {
        const clampSkew = gsap.utils.clamp(-8, 8);
        const proxy = { skew: 0 };
        const setSkew = gsap.quickSetter('.marquee-row', 'skewX', 'deg');

        ScrollTrigger.create({
          trigger: '.marquee-container',
          start: 'top bottom',
          end: 'bottom top',
          onUpdate: (self) => {
            const skew = clampSkew(self.getVelocity() / -320);
            if (Math.abs(skew) > Math.abs(proxy.skew)) {
              proxy.skew = skew;
              gsap.to(proxy, {
                skew: 0,
                duration: 0.7,
                ease: 'power3',
                overwrite: true,
                onUpdate: () => setSkew(proxy.skew),
              });
            }
          },
        });
      }

      ScrollTrigger.refresh();
    }
  );

  // Web-font load shifts trigger positions
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => ScrollTrigger.refresh());
  }
})();
