/* ═══════════════════════════════════════════════════════════════════
   SCROLL FX — GSAP ScrollTrigger, additive only.
   Everything here is scroll-linked (scrub); nothing changes the
   existing load-in animations, content, or layout.
   ═══════════════════════════════════════════════════════════════════ */
(function () {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  gsap.registerPlugin(ScrollTrigger);

  function init() {
    // Keep ScrollTrigger in step with Lenis' smooth scroll
    if (window.lenis && typeof window.lenis.on === 'function') {
      window.lenis.on('scroll', ScrollTrigger.update);
    }

    // ── 1. Hero particle-field parallax ─────────────────────────────
    // The binary-particle canvas lags behind the scroll so the hero
    // gains depth as you leave it.
    gsap.to('#hero-canvas', {
      yPercent: 26,
      ease: 'none',
      scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true },
    });

    // Skews the row wrappers; the CSS marquee loop on the inner tracks
    // is untouched (separate transform).
    const rows = gsap.utils.toArray('.marquee-row');
    if (rows.length) {
      const clampSkew = gsap.utils.clamp(-7, 7);
      const proxy = { skew: 0 };
      const setSkew = gsap.quickSetter('.marquee-row', 'skewX', 'deg');

      ScrollTrigger.create({
        trigger: '.marquee-container',
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          const skew = clampSkew(self.getVelocity() / -350);
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

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Web-font load can shift trigger positions
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => ScrollTrigger.refresh());
  }
})();
