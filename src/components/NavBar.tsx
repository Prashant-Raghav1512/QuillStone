import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { LogoMark, Wordmark } from './Logo';
import { useScrollProgress } from '@/lib/hooks';

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/duality', label: 'Duality' },
  { to: '/publishing', label: 'Publishing' },
  { to: '/marketing', label: 'Marketing' },
  { to: '/contact', label: 'Contact' },
];

export function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const progress = useScrollProgress();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ease-cinematic ${
        scrolled || open
          ? 'border-b border-line bg-void/85 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav className="container-edge flex h-16 items-center justify-between md:h-20">
        <Link
          to="/"
          className="group flex items-center gap-2.5 text-champagne transition-transform duration-500 ease-cinematic hover:scale-[1.02]"
        >
          <span className="transition-transform duration-700 ease-cinematic group-hover:rotate-180">
            <LogoMark className="h-8 w-8" />
          </span>
          <Wordmark className="text-lg text-white transition-colors duration-500 group-hover:text-champagne md:text-xl" />
        </Link>

        <div className="hidden items-center gap-9 md:flex">
          {LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`link-underline text-sm font-medium transition-colors duration-300 hover:text-champagne ${
                pathname === l.to ? 'text-champagne' : 'text-white/70'
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/contact"
            className="btn-solid !px-5 !py-2.5 text-xs transition-transform duration-300 hover:scale-105 active:scale-95"
          >
            Query the house
          </Link>
        </div>

        <button
          className="text-white/80 transition-transform duration-300 hover:scale-110 active:scale-95 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6 animate-scaleIn" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Scroll progress bar */}
      <div className="absolute bottom-0 left-0 h-[2px] bg-champagne/60" style={{ width: `${progress * 100}%` }} />

      {/* Mobile drawer */}
      <div
        className={`overflow-hidden border-line bg-void/95 backdrop-blur-xl transition-all duration-500 ease-cinematic md:hidden ${
          open ? 'max-h-96 border-b' : 'max-h-0'
        }`}
      >
        <div className="container-edge flex flex-col gap-1 py-4">
          {LINKS.map((l, i) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              style={{
                animation: open ? `fadeLeft 0.4s var(--ease) ${i * 60}ms both` : undefined,
              }}
              className="rounded-lg px-3 py-3 text-sm font-medium text-white/75 transition-all duration-300 hover:translate-x-1 hover:bg-white/5 hover:text-champagne"
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/contact"
            onClick={() => setOpen(false)}
            className="btn-solid mt-2 !w-full"
          >
            Query the house
          </Link>
        </div>
      </div>
    </header>
  );
}
