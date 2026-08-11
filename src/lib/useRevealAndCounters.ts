import { useEffect } from 'react';

/**
 * Scroll-reveal for `.reveal` elements and count-up animation for
 * `[data-count]` elements, scoped to whatever page calls this — each page
 * only has the elements it renders, so the queries below naturally only
 * ever match that page's own markup.
 */
export function useRevealAndCounters() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => {
        es.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    );
    document.querySelectorAll<HTMLElement>('.reveal').forEach((el, i) => {
      el.style.transitionDelay = Math.min((i % 4) * 0.06, 0.24) + 's';
      io.observe(el);
    });

    const co = new IntersectionObserver(
      (es) => {
        es.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          const end = +(el.dataset.count || 0);
          const suf = el.dataset.suffix || '';
          const start = performance.now();
          (function tick(now: number) {
            const k = Math.min(1, (now - start) / 1100);
            const v = Math.round(end * (1 - Math.pow(1 - k, 3)));
            el.textContent = v + suf;
            if (k < 1) requestAnimationFrame(tick);
          })(start);
          co.unobserve(el);
        });
      },
      { threshold: 0.6 },
    );
    document.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => co.observe(el));

    return () => {
      io.disconnect();
      co.disconnect();
    };
  }, []);
}
