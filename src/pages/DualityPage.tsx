import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Megaphone, Scale } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { useReveal, useStaggerReveal } from '@/lib/hooks';

const STATS = [
  { value: '40', suffix: '+', label: 'Titles in print' },
  { value: '17', suffix: '', label: 'Languages licensed' },
  { value: '60', suffix: '+', label: 'Campaigns delivered' },
  { value: '12', suffix: '', label: 'Design awards' },
];

const PRINCIPLES = [
  {
    icon: Scale,
    title: 'Restraint over noise',
    desc: "We resist the temptation to fill every silence. In publishing, that means cutting a chapter that doesn't earn its place. In marketing, it means choosing one channel done well over five done poorly.",
  },
  {
    icon: BookOpen,
    title: 'The sentence first',
    desc: 'Before a cover is designed, before a campaign is launched, we ask one question: is the sentence right? Everything else — typography, channel, timing — follows from the answer.',
  },
  {
    icon: Megaphone,
    title: 'Narrative before reach',
    desc: 'Reach is a consequence, not a strategy. We build the narrative first, then let it find its audience. A manuscript finds its readers; a brand finds its market.',
  },
];

const TIMELINE = [
  { year: '2015', title: 'The first manuscript', desc: 'Quillstones opens its doors with a single literary fiction acquisition — a debut novel that sells into six languages within its first year.' },
  { year: '2017', title: 'The marketing wing', desc: 'Authors begin asking for help reaching readers. The marketing discipline is born — not as a separate agency, but as the same editorial instinct turned outward.' },
  { year: '2019', title: 'Brands come calling', desc: "A publisher's reputation for narrative discipline attracts its first brand client. The dual-discipline model is formalized." },
  { year: '2021', title: 'Forty titles, thirty-eight brands', desc: 'The catalogue crosses forty titles in print. The marketing roster grows to thirty-eight brands across publishing, arts, and technology.' },
  { year: '2024', title: 'The house today', desc: 'Two disciplines, one standard. We acquire six to eight manuscripts a year and take on a limited number of brand engagements — never more than we can give our full attention.' },
];

const TEAM = [
  { name: 'Mara Vance', role: 'Publisher & Editorial Director', bio: 'Twenty years in literary publishing. Former senior editor at an independent press. Believes a good manuscript teaches its editor how to read it.' },
  { name: 'Idris Kael', role: 'Creative Director, Marketing', bio: 'Brand strategist who started as a copywriter. Built campaigns for publishers, arts organisations, and technology companies. Insists strategy is just editing at a larger scale.' },
  { name: 'Sofia Ren', role: 'Head of Design', bio: 'Typographer and art director. Oversees cover design, brand identity, and every piece of visual output the house produces. Will debate kerning at length.' },
  { name: 'Thomas Achebe', role: 'Senior Editor', bio: 'Acquires literary fiction and essays. Previously taught contemporary literature. Reads submissions in the order they arrive — no exceptions.' },
];

export function DualityPage() {
  const statsRef = useReveal<HTMLDivElement>();
  const principlesRef = useStaggerReveal<HTMLDivElement>(120);
  const timelineRef = useStaggerReveal<HTMLDivElement>(150);
  const teamRef = useReveal<HTMLDivElement>();
  const ctaRef = useReveal<HTMLDivElement>();

  return (
    <>
      <PageHero
        eyebrow="The Duality"
        title="Two disciplines, one"
        titleAccent="house."
        subtitle="Literature and marketing are mirror disciplines. Both start with an audience. Both live or die by the strength of a sentence. The publishing side applies editorial patience to manuscripts; the marketing side applies the same restraint to brands."
      />

      {/* Stats */}
      <section className="py-16 md:py-20">
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

      {/* Principles */}
      <section className="py-20 md:py-24">
        <div className="container-edge">
          <div className="mx-auto mb-14 max-w-2xl">
            <p className="eyebrow mb-5">Operating Principles</p>
            <h2 className="font-serif text-3xl leading-tight text-white sm:text-4xl">
              Three rules the house <em className="italic text-champagne shimmer-text">lives by.</em>
            </h2>
          </div>
          <div ref={principlesRef} className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {PRINCIPLES.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.title}
                  data-stagger
                  className="reveal-scale cell card-lift group flex flex-col hover:shadow-[0_0_50px_-12px_rgba(200,168,120,0.2)]"
                >
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full border border-champagne/30 text-champagne transition-all duration-500 group-hover:rotate-12 group-hover:border-champagne/60 group-hover:shadow-[0_0_24px_-6px_rgba(200,168,120,0.5)]">
                    <Icon className="h-5 w-5 transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  <h3 className="font-serif text-xl text-white">{p.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/55">{p.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 md:py-24">
        <div className="container-edge">
          <div className="mx-auto mb-14 max-w-2xl">
            <p className="eyebrow mb-5">House History</p>
            <h2 className="font-serif text-3xl leading-tight text-white sm:text-4xl">
              A decade of <em className="italic text-champagne shimmer-text">narrative work.</em>
            </h2>
          </div>
          <div ref={timelineRef} className="relative">
            {/* Vertical line */}
            <div className="absolute left-[7px] top-2 bottom-2 w-px bg-line md:left-1/2 md:-translate-x-1/2">
              <div
                className="h-full bg-gradient-to-b from-champagne/40 via-champagne/20 to-transparent"
                style={{ animation: 'drawLine 1.5s var(--ease) 0.3s both', transformOrigin: 'top' }}
              />
            </div>
            <div className="space-y-10">
              {TIMELINE.map((t, i) => (
                <div
                  key={t.year}
                  data-stagger
                  className={`reveal-left relative flex gap-6 md:gap-0 ${
                    i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Dot with pulse */}
                  <div className="absolute left-0 top-1.5 z-10 md:left-1/2 md:-translate-x-1/2">
                    <div className="relative h-4 w-4 rounded-full border-2 border-champagne bg-void">
                      <div className="absolute inset-0 rounded-full border border-champagne/40 animate-pulseRing" />
                    </div>
                  </div>
                  {/* Spacer for md */}
                  <div className="hidden md:block md:w-1/2" />
                  {/* Content */}
                  <div
                    className={`ml-10 md:ml-0 md:w-1/2 ${
                      i % 2 === 0 ? 'md:pl-12' : 'md:pr-12 md:text-right'
                    }`}
                  >
                    <div className="cell card-lift group hover:shadow-[0_0_40px_-12px_rgba(200,168,120,0.2)]">
                      <span className="font-serif text-2xl text-champagne transition-transform duration-500 group-hover:scale-110">{t.year}</span>
                      <h3 className="mt-2 font-serif text-lg text-white">{t.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-white/55">{t.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 md:py-24">
        <div className="container-edge">
          <div className="mx-auto mb-14 max-w-2xl">
            <p className="eyebrow mb-5">The House</p>
            <h2 className="font-serif text-3xl leading-tight text-white sm:text-4xl">
              The people who <em className="italic text-champagne shimmer-text">read everything.</em>
            </h2>
          </div>
          <div ref={teamRef} className="reveal grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {TEAM.map((m, i) => (
              <div
                key={m.name}
                className="cell card-lift group flex flex-col hover:shadow-[0_0_50px_-12px_rgba(200,168,120,0.2)]"
                style={{ transitionDelay: `${i * 90}ms` }}
              >
                {/* Avatar with initials */}
                <div className="relative mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-champagne/30 bg-champagne/5 font-serif text-xl text-champagne transition-all duration-500 group-hover:scale-110 group-hover:border-champagne/60 group-hover:shadow-[0_0_24px_-6px_rgba(200,168,120,0.4)]">
                  {m.name.split(' ').map((n) => n[0]).join('')}
                  {/* Rotating ring */}
                  <div className="absolute inset-0 rounded-full border border-champagne/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-hover:animate-spinSlow" />
                </div>
                <h3 className="font-serif text-lg text-white">{m.name}</h3>
                <p className="mt-1 text-xs uppercase tracking-[0.15em] text-champagne/70">{m.role}</p>
                <p className="mt-3 text-sm leading-relaxed text-white/55">{m.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32">
        <div className="container-edge">
          <div ref={ctaRef} className="reveal mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-3xl leading-tight text-white sm:text-4xl">
              Want to work <em className="italic text-champagne shimmer-text">with the house?</em>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-white/60">
              We acquire six to eight manuscripts a year and take on a limited
              number of brand engagements. Tell us what you're working on.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link to="/contact" className="btn-solid group transition-transform duration-300 hover:scale-105 active:scale-95">
                Query the house
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link to="/publishing" className="btn-ghost transition-transform duration-300 hover:scale-105 active:scale-95">
                See the shelf
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
