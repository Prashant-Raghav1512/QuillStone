import { Link } from 'react-router-dom';
import { LogoMark, Wordmark } from './Logo';
import { useReveal } from '@/lib/hooks';

export function Footer() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <footer className="relative overflow-hidden border-t border-line py-16">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute -bottom-24 left-1/2 h-48 w-96 -translate-x-1/2 rounded-full bg-champagne/5 blur-[100px]" />

      <div className="container-edge">
        <div ref={ref} className="reveal flex flex-col items-start justify-between gap-10 md:flex-row md:items-center">
          <Link
            to="/"
            className="group flex items-center gap-2.5 text-champagne transition-transform duration-500 hover:scale-[1.02]"
          >
            <span className="transition-transform duration-700 ease-cinematic group-hover:rotate-180">
              <LogoMark className="h-8 w-8" />
            </span>
            <Wordmark className="text-lg text-white transition-colors duration-500 group-hover:text-champagne" />
          </Link>

          <nav className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-white/55">
            {[
              { to: '/', label: 'Home' },
              { to: '/duality', label: 'Duality' },
              { to: '/publishing', label: 'Publishing' },
              { to: '/marketing', label: 'Marketing' },
              { to: '/contact', label: 'Contact' },
            ].map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="link-underline transition-colors duration-300 hover:text-champagne"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Animated hairline */}
        <div className="relative mt-10 h-px w-full bg-line">
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-champagne/40 to-transparent"
            style={{ animation: 'shimmer 4s linear infinite', backgroundSize: '200% 100%' }}
          />
        </div>

        <div className="mt-6 flex flex-col gap-3 text-xs text-white/40 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Quillstones. Narratives that endure. Brands that lead.</p>
          <p className="font-serif italic">Set in Playfair Display &amp; Inter.</p>
        </div>
      </div>
    </footer>
  );
}
