import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Feather, PenLine, Mail, FileText, Globe, Check } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { useReveal, useStaggerReveal } from '@/lib/hooks';

type Book = {
  title: string;
  author: string;
  genre: string;
  year: string;
  accent: string;
};

const BOOKS: Book[] = [
  { title: 'The Weight of Quiet Hours', author: 'Amara Osei', genre: 'Literary Fiction', year: '2024', accent: '#c8a878' },
  { title: 'Letters from a Late Century', author: 'Julian Marsh', genre: 'Epistolary', year: '2023', accent: '#8a9a8a' },
  { title: 'Salt & Cedar', author: 'Noor El-Amin', genre: 'Essays', year: '2023', accent: '#b06a5a' },
  { title: "The Cartographer's Silence", author: 'Elena Vasquez', genre: 'Literary Fiction', year: '2022', accent: '#7a8aa8' },
  { title: 'Midnight Arithmetic', author: 'Tomas Riel', genre: 'Essays', year: '2022', accent: '#a88858' },
  { title: 'The Hour Before Snow', author: 'Kira Lindqvist', genre: 'Literary Fiction', year: '2021', accent: '#9a8a6a' },
  { title: 'Postcards from the Interior', author: 'Diego Salas', genre: 'Epistolary', year: '2021', accent: '#6a8a9a' },
  { title: 'A Field of Unmarked Graves', author: 'Aaliyah Brooks', genre: 'Essays', year: '2020', accent: '#9a7a8a' },
  { title: 'The Lantern Keeper', author: 'Renji Tanaka', genre: 'Literary Fiction', year: '2020', accent: '#c8a878' },
];

const GENRES = [
  { icon: BookOpen, name: 'Literary Fiction', count: '18 titles', desc: 'Novels and short fiction where the sentence matters as much as the plot.' },
  { icon: FileText, name: 'Essays', count: '12 titles', desc: 'Long-form essays and collected nonfiction — cultural, political, personal.' },
  { icon: Mail, name: 'Epistolary', count: '6 titles', desc: 'Letters, correspondence, and works built from exchanged words.' },
  { icon: Feather, name: 'Poetry', count: '4 titles', desc: 'A small, selective poetry list — one or two collections a year.' },
];

const PROCESS = [
  { step: '01', title: 'Submission', desc: 'We accept submissions year-round through our query form. Every manuscript is read — in the order it arrives — by a senior editor.' },
  { step: '02', title: 'Editorial assessment', desc: 'If a manuscript speaks to us, we respond within six weeks with a detailed editorial assessment — not a form letter.' },
  { step: '03', title: 'Acquisition', desc: 'We acquire six to eight titles a year. Our advances are modest but our editorial investment is deep — we mean what we publish.' },
  { step: '04', title: 'Editing', desc: 'Structural editing, line editing, and copy-editing — often three passes. We treat the sentence as the unit of meaning.' },
  { step: '05', title: 'Design & typesetting', desc: 'Cover design and interior typography by our in-house design team. Every book is set with the care it deserves.' },
  { step: '06', title: 'Publication & licensing', desc: 'We publish in print and digital, and actively license translation rights — seventeen languages to date.' },
];

const ROYALTIES = [
  'Industry-standard royalties, paid twice yearly',
  'Author retains all rights not explicitly granted',
  'Translation and audio rights handled in-house',
  'No agent required to submit — we read everything',
  'Marketing and PR included for every title',
  'Print runs calibrated to demand — no remainder piles',
];

export function PublishingPage() {
  const genresRef = useStaggerReveal<HTMLDivElement>(100);
  const gridRef = useStaggerReveal<HTMLDivElement>(60);
  const processRef = useStaggerReveal<HTMLDivElement>(80);
  const royaltiesRef = useReveal<HTMLDivElement>();
  const ctaRef = useReveal<HTMLDivElement>();

  return (
    <>
      <PageHero
        eyebrow="The Shelf"
        title="A curated"
        titleAccent="catalogue."
        subtitle="Literary fiction, essays, and letters — selected with editorial patience, set with typographic care. We acquire six to eight manuscripts a year and give each one our full attention."
      />

      {/* Catalogue grid */}
      <section className="py-16 md:py-20">
        <div className="container-edge">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="eyebrow mb-4">The Catalogue</p>
              <h2 className="font-serif text-3xl text-white sm:text-4xl">
                40+ titles in <em className="italic text-champagne shimmer-text">print.</em>
              </h2>
            </div>
            <span className="hidden text-sm text-white/50 sm:block">17 languages licensed worldwide</span>
          </div>
          <div ref={gridRef} className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {BOOKS.map((b) => (
              <div
                key={b.title}
                data-stagger
                className="reveal-scale book-tilt group relative aspect-[2/3] overflow-hidden rounded-md border border-line bg-gradient-to-b from-carbon to-void transition-all duration-500 ease-cinematic hover:border-champagne/40 hover:shadow-[0_20px_60px_-12px_rgba(200,168,120,0.3)]"
              >
                <div className="absolute left-0 top-0 h-full w-[3px] bg-white/5 transition-colors duration-500 group-hover:bg-champagne/20" />
                {/* Floating accent dot */}
                <div
                  className="absolute right-3 top-3 h-1.5 w-1.5 rounded-full animate-floatY"
                  style={{ backgroundColor: b.accent, animationDelay: `${Math.random() * 3}s` }}
                />
                <div className="flex h-full flex-col justify-between p-5">
                  <div>
                    <span
                      className="text-[9px] uppercase tracking-[0.3em] transition-colors duration-500 group-hover:text-champagne-soft"
                      style={{ color: b.accent }}
                    >
                      Quillstones
                    </span>
                    <div
                      className="mt-2 h-px w-8 transition-all duration-500 group-hover:w-14"
                      style={{ backgroundColor: b.accent }}
                    />
                  </div>
                  <div>
                    <h4 className="font-serif text-base leading-snug text-white transition-transform duration-500 group-hover:translate-x-1">
                      {b.title}
                    </h4>
                    <p className="mt-1.5 text-[10px] text-white/45">{b.genre}</p>
                  </div>
                  <div>
                    <div className="h-px w-full bg-white/[0.08]" />
                    <div className="mt-2 flex items-center justify-between">
                      <p className="text-[10px] font-medium tracking-wide text-white/70 transition-colors duration-500 group-hover:text-champagne">
                        {b.author}
                      </p>
                      <p className="text-[10px] text-white/35">{b.year}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {/* CTA card */}
            <Link
              to="/contact"
              className="group flex aspect-[2/3] flex-col items-center justify-center rounded-md border border-dashed border-line p-5 text-center transition-all duration-500 hover:border-champagne/40 hover:shadow-[0_0_30px_-8px_rgba(200,168,120,0.2)]"
            >
              <span className="font-serif text-xl italic text-champagne transition-transform duration-500 group-hover:scale-105">Your manuscript,</span>
              <span className="font-serif text-xl italic text-white">perhaps.</span>
              <span className="mt-4 inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-white/50 transition-all duration-300 group-hover:gap-3 group-hover:text-champagne">
                Query the house <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Genres */}
      <section className="py-20 md:py-24">
        <div className="container-edge">
          <div className="mx-auto mb-14 max-w-2xl">
            <p className="eyebrow mb-5">What We Publish</p>
            <h2 className="font-serif text-3xl leading-tight text-white sm:text-4xl">
              Four genres, one <em className="italic text-champagne shimmer-text">standard.</em>
            </h2>
          </div>
          <div ref={genresRef} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {GENRES.map((g) => {
              const Icon = g.icon;
              return (
                <div
                  key={g.name}
                  data-stagger
                  className="reveal-blur cell card-lift group flex flex-col hover:shadow-[0_0_50px_-12px_rgba(200,168,120,0.2)]"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-champagne/30 text-champagne transition-all duration-500 group-hover:rotate-12 group-hover:scale-110 group-hover:border-champagne/60">
                    <Icon className="h-5 w-5 transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  <h3 className="font-serif text-lg text-white">{g.name}</h3>
                  <p className="mt-1 text-xs uppercase tracking-[0.15em] text-champagne/70">{g.count}</p>
                  <p className="mt-3 text-sm leading-relaxed text-white/55">{g.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 md:py-24">
        <div className="container-edge">
          <div className="mx-auto mb-14 max-w-2xl">
            <p className="eyebrow mb-5">From Manuscript to Shelf</p>
            <h2 className="font-serif text-3xl leading-tight text-white sm:text-4xl">
              The publishing <em className="italic text-champagne shimmer-text">process.</em>
            </h2>
          </div>
          <div ref={processRef} className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {PROCESS.map((p) => (
              <div
                key={p.step}
                data-stagger
                className="reveal-scale cell card-lift group hover:shadow-[0_0_40px_-12px_rgba(200,168,120,0.15)]"
              >
                <span className="font-serif text-3xl text-champagne/30 transition-all duration-500 group-hover:text-champagne/60 group-hover:scale-110">{p.step}</span>
                <h3 className="mt-3 font-serif text-lg text-white">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/55">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Author terms */}
      <section className="py-20 md:py-24">
        <div className="container-edge">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <p className="eyebrow mb-5">For Authors</p>
              <h2 className="font-serif text-3xl leading-tight text-white sm:text-4xl">
                What you can <em className="italic text-champagne shimmer-text">expect.</em>
              </h2>
              <p className="mt-5 text-base leading-relaxed text-white/60">
                We believe a publisher's job is to serve the book, not the other
                way around. Our terms reflect that. Here's what we offer every
                author we publish.
              </p>
              <div className="mt-8 flex items-center gap-3 text-sm text-white/50">
                <Globe className="h-4 w-4 animate-floatY text-champagne/60" />
                <span>17 languages licensed worldwide</span>
              </div>
            </div>
            <div ref={royaltiesRef} className="reveal-right cell">
              <ul className="space-y-4">
                {ROYALTIES.map((r, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 transition-transform duration-300 hover:translate-x-1"
                    style={{ transitionDelay: `${i * 50}ms` }}
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-champagne/30 text-champagne transition-all duration-300 hover:border-champagne/60 hover:shadow-[0_0_12px_-2px_rgba(200,168,120,0.4)]">
                      <Check className="h-3 w-3" />
                    </span>
                    <span className="text-sm leading-relaxed text-white/70">{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32">
        <div className="container-edge">
          <div ref={ctaRef} className="reveal mx-auto max-w-2xl text-center">
            <PenLine className="mx-auto mb-6 h-8 w-8 animate-floatYSlow text-champagne/40" />
            <h2 className="font-serif text-3xl leading-tight text-white sm:text-4xl">
              Have a manuscript <em className="italic text-champagne shimmer-text">for us?</em>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-white/60">
              We read every submission, in the order it arrives. No agent
              required. Tell us about your work.
            </p>
            <Link to="/contact" className="btn-solid group mt-8 transition-transform duration-300 hover:scale-105 active:scale-95">
              Submit a manuscript
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
