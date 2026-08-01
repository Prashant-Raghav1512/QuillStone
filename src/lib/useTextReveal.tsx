import { useEffect, useRef } from 'react';

/**
 * Animated word-by-word text reveal.
 * Splits a string into word spans inside .text-mask wrappers
 * that slide up when scrolled into view.
 */
export function useTextReveal(text: string, className = '') {
  const ref = useRef<HTMLSpanElement>(null);
  const words = text.split(' ');

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const masks = entry.target.querySelectorAll('.text-mask');
            masks.forEach((m, i) => {
              setTimeout(() => m.classList.add('is-visible'), i * 80);
            });
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return {
    ref,
    content: (
      <span ref={ref} className={className}>
        {words.map((w, i) => (
          <span key={i} className="text-mask">
            <span style={{ transitionDelay: `${i * 60}ms` }}>{w}</span>
            {i < words.length - 1 ? '\u00A0' : ''}
          </span>
        ))}
      </span>
    ),
  };
}
