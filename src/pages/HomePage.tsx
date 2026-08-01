import { Link } from 'react-router-dom';
import { ArrowDown, BookOpen, Sparkles, ArrowRight, Quote } from 'lucide-react';
import { useReveal, useParallax, useMouseTrack } from '@/lib/hooks';
import { useTextReveal } from '@/lib/useTextReveal';

const STATS = [
  { value: '40', suffix: '+', label: 'Titles in print' },
  { value: '17', suffix: '', label: 'Languages licensed' },
  { value: '60', suffix: '+', label: 'Campaigns delivered' },
  { value: '12', suffix: '', label: 'Design awards' },
];

const PREVIEW_BOOKS = [
  { title: 'The Weight of Quiet Hours', author: 'Amara Osei', accent: '#c8a878', delay: '0s' },
  { title: 'Salt & Cedar', author: 'Noor El-Amin', accent: '#b06a5a', delay: '1.5s' },
  { title: "The Cartographer's Silence", author: 'Elena Vasquez', accent: '#7a8aa8', delay: '3s' },
];

export function HomePage() {
  const statsRef = useReveal<HTMLDivElement>();
  const splitRef = useReveal<HTMLDivElement>();
  const shelfRef = useReveal<HTMLDivElement>();
  const ctaRef = useReveal<HTMLDivElement>();
  const heroText = useTextReveal('Narratives that');
  const heroText2 = useTextReveal('Brands that');

  const blobParallax = useParallax<HTMLDivElement>(0.08);
  const blobParallax2 = useParallax<HTMLDivElement>(0.12);
  const quoteParallax = useParallax<HTMLDivElement>(0.05);
  const heroMouse = useMouseTrack<HTMLDivElement>();

  return (
    <>
      {/* Hero */}
      <section
        ref={heroMouse.ref}
        className="relative flex min-h-screen items-center overflow-hidden"
      >
        {/* Ambient blobs with parallax */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div
            ref={blobParallax.ref}
            className="absolute -left-32 top-1/4 h-[34rem] w-[34rem] rounded-full bg-champagne/10 blur-[120px] animate-blobDrift"
            style={{
              transform: `translateY(${blobParallax.offset}px) translate(${heroMouse.pos.x * 20}px, ${heroMouse.pos.y * 20}px)`,
            }}
          />
          <div
            ref={blobParallax2.ref}
            className="absolute -right-24 bottom-0 h-[30rem] w-[30rem] rounded-full bg-champagne/8 blur-[110px] animate-blobDrift"
            style={{
              animationDelay: '-6s',
              transform: `translateY(${blobParallax2.offset}px) translate(${heroMouse.pos.x * -15}px, ${heroMouse.pos.y * -15}px)`,
            }}
          />
          <div
            className="absolute left-1/2 top-1/2 h-[24rem] w-[24rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.03] blur-[90px] animate-blobDrift"
            style={{ animationDelay: '-12s' }}
          />
        </div>

        {/* Fine grain overlay */}
        <div
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.04]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />

        <div className="container-edge w-full pt-28 pb-24 md:pt-32">
          <div className="max-w-4xl">
            <p
              className="eyebrow mb-7 animate-fadeUp"
              style={{ animationDelay: '0.1s', opacity: 0 }}
            >
              Publishing House × Media Marketing
            </p>

            <h1 className="font-serif text-5xl leading-[1.05] tracking-tightest text-white sm:text-6xl md:text-7xl lg:text-[5.4rem]">
              {heroText.content} <em className="italic text-champagne shimmer-text">endure.</em>
              <br />
              {heroText2.content} <em className="italic text-champagne shimmer-text">lead.</em>
            </h1>

            <p
              className="mt-8 max-w-xl animate-fadeUp text-base leading-relaxed text-white/65 md:text-lg"
              style={{ animationDelay: '0.8s', opacity: 0 }}
            >
              A dual-discipline house — applying editorial patience to manuscripts,
              and the same restraint to brands. Strategy before noise. Narrative
              before reach.
            </p>

            <div
              className="mt-10 flex flex-wrap items-center gap-4 animate-fadeUp"
              style={{ animationDelay: '1s', opacity: 0 }}
            >
              <Link to="/publishing" className="btn-solid group transition-transform duration-300 hover:scale-105 active:scale-95">
                <BookOpen className="h-4 w-4 transition-transform duration-500 group-hover:rotate-12" />
                Explore the shelf
              </Link>
              <Link to="/marketing" className="btn-ghost group transition-transform duration-300 hover:scale-105 active:scale-95">
                <Sparkles className="h-4 w-4 transition-transform duration-500 group-hover:scale-125" />
                Request a proposal
              </Link>
            </div>

            <p
              className="mt-12 max-w-md animate-fadeUp font-serif text-lg italic text-white/45"
              style={{ animationDelay: '1.2s', opacity: 0 }}
            >
              "A story well told outlives the moment it was made for."
            </p>
          </div>
        </div>

        {/* Scroll cue */}
        <Link
          to="/duality"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 transition-colors duration-300 hover:text-champagne"
          aria-label="Scroll to content"
        >
          <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <ArrowDown className="h-4 w-4 animate-cuePulse" />
        </Link>
      </section>

      {/* Stats */}
      <section className="py-20 md:py-24">
        <div className="container-edge">
          <div ref={statsRef} className="reveal grid grid-cols-2 gap-4 lg:grid-cols-4">
            {STATS.map((s, i) => (
              <div
                key={s.label}
                className="cell card-lift group flex flex-col justify-between hover:shadow-[0_0_40px_-12px_rgba(200,168,120,0.25)]"
                style={{ transitionDelay: `${i * 90}ms` }}
              >
                <span className="font-serif text-5xl text-champagne transition-transform duration-500 group-hover:scale-110 group-hover:text-champagne-soft md:text-6xl">
                  {s.value}{s.suffix}
                </span>
                <span className="mt-4 text-sm text-white/55">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Word / Signal split */}
      <section className="py-20 md:py-24">
        <div className="container-edge">
          <div ref={splitRef} className="reveal grid grid-cols-1 gap-4 md:grid-cols-2">
            <Link to="/publishing" className="cell card-lift group block hover:shadow-[0_0_50px_-12px_rgba(200,168,120,0.2)]">
              <p className="eyebrow mb-4">The Word</p>
              <h3 className="font-serif text-2xl text-white">
                Editorial patience for manuscripts.
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/55">
                We acquire, edit, and publish literary fiction, essays, and
                epistolary work — with the typographic care a sentence deserves.
              </p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-champagne/70 transition-all duration-300 group-hover:gap-3 group-hover:text-champagne">
                Enter the shelf <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Link>
            <Link to="/marketing" className="cell card-lift group block hover:shadow-[0_0_50px_-12px_rgba(200,168,120,0.2)]">
              <p className="eyebrow mb-4">The Signal</p>
              <h3 className="font-serif text-2xl text-white">
                The same restraint, applied to brands.
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/55">
                Positioning, identity, voice — then channels, content, and
                analytics. Strategy before noise. Narrative before reach.
              </p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-champagne/70 transition-all duration-300 group-hover:gap-3 group-hover:text-champagne">
                See the work <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Shelf preview */}
      <section className="py-20 md:py-24">
        <div className="container-edge">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="eyebrow mb-4">From the Shelf</p>
              <h2 className="font-serif text-3xl text-white sm:text-4xl">
                Recently <em className="italic text-champagne">published.</em>
              </h2>
            </div>
            <Link to="/publishing" className="group hidden items-center gap-1.5 text-sm text-champagne/70 transition-colors hover:text-champagne sm:flex">
              View all <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
          <div ref={shelfRef} className="reveal grid grid-cols-1 gap-4 sm:grid-cols-3">
            {PREVIEW_BOOKS.map((b, i) => (
              <div
                key={b.title}
                className="book-tilt group relative aspect-[2/3] overflow-hidden rounded-md border border-line bg-gradient-to-b from-carbon to-void transition-all duration-500 hover:border-champagne/40 hover:shadow-[0_20px_60px_-12px_rgba(200,168,120,0.3)]"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="absolute left-0 top-0 h-full w-[3px] bg-white/5 transition-colors duration-500 group-hover:bg-champagne/20" />
                {/* Floating accent dot */}
                <div
                  className="absolute right-4 top-4 h-2 w-2 rounded-full animate-floatY"
                  style={{ backgroundColor: b.accent, animationDelay: b.delay }}
                />
                <div className="flex h-full flex-col justify-between p-6">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.3em] transition-colors duration-500 group-hover:text-champagne-soft" style={{ color: b.accent }}>
                      Quillstones
                    </span>
                    <div className="mt-3 h-px w-10 transition-all duration-500 group-hover:w-16" style={{ backgroundColor: b.accent }} />
                  </div>
                  <div>
                    <h4 className="font-serif text-lg leading-snug text-white transition-transform duration-500 group-hover:translate-x-1">{b.title}</h4>
                  </div>
                  <div>
                    <div className="h-px w-full bg-white/[0.08]" />
                    <p className="mt-3 text-xs font-medium tracking-wide text-white/70 transition-colors duration-500 group-hover:text-champagne">{b.author}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pull quote / CTA */}
      <section className="py-24 md:py-32">
        <div className="container-edge">
          <div ref={ctaRef} className="reveal mx-auto max-w-3xl text-center">
            <div ref={quoteParallax.ref} style={{ transform: `translateY(${quoteParallax.offset}px)` }}>
              <Quote className="mx-auto mb-8 h-8 w-8 text-champagne/40 animate-floatYSlow" />
            </div>
            <p className="font-serif text-2xl leading-relaxed text-white/80 md:text-3xl">
              "We believe a brand, like a book, is a promise made to its reader.
              The work is keeping that promise — in every chapter, every campaign,
              every sentence."
            </p>
            <p className="mt-6 text-sm uppercase tracking-[0.2em] text-white/40">
              — The House
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link to="/contact" className="btn-solid group transition-transform duration-300 hover:scale-105 active:scale-95">
                Query the house
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link to="/duality" className="btn-ghost transition-transform duration-300 hover:scale-105 active:scale-95">
                Our philosophy
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
