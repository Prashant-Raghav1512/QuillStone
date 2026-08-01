import { Link } from 'react-router-dom';
import { ArrowRight, Compass, Megaphone, Newspaper, Check, TrendingUp, Target, BarChart3 } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { useReveal, useStaggerReveal, useCountUp } from '@/lib/hooks';

const SERVICES = [
  {
    icon: Compass,
    name: 'Brand Strategy',
    tagline: 'Positioning · Identity · Voice',
    desc: 'Positioning, naming, and narrative systems — the architecture beneath every signal a brand sends. We define what a brand stands for before we decide how to talk about it.',
    deliverables: ['Market & competitor analysis', 'Positioning statement', 'Naming & verbal identity', 'Brand narrative architecture', 'Tone of voice guidelines'],
  },
  {
    icon: Megaphone,
    name: 'Digital Presence',
    tagline: 'Channels · Content · Analytics',
    desc: 'Channel architecture, content engines, and analytics — built so reach follows narrative, not the other way around. We build the system, then teach your team to run it.',
    deliverables: ['Channel strategy & setup', 'Content calendar & production', 'Social media management', 'SEO & paid media', 'Monthly analytics & reporting'],
  },
  {
    icon: Newspaper,
    name: 'Public Relations',
    tagline: 'Press · Launches · Partnerships',
    desc: "Earned media, launches, and partnerships — placed with the same editorial judgement we bring to a manuscript. We don't blast press releases; we pitch stories.",
    deliverables: ['Press list & media outreach', 'Launch strategy & event support', 'Thought leadership placement', 'Partnership brokering', 'Crisis communications readiness'],
  },
];

const STATS = [
  { target: 120, suffix: '%', label: 'Avg. engagement lift' },
  { target: 94, suffix: '%', label: 'Client retention' },
  { target: 38, suffix: '', label: 'Brands led' },
  { target: 12, suffix: '', label: 'Design awards' },
];

const CASE_STUDIES = [
  {
    client: 'Lumen Press',
    sector: 'Independent Publishing',
    challenge: 'A respected independent press with strong titles but no digital presence. Sales relied entirely on retail distribution.',
    result: '120% increase in direct-to-reader sales',
    metric: '6 months',
  },
  {
    client: 'Atelier Voss',
    sector: 'Architecture & Design',
    challenge: 'A boutique architecture studio with a distinctive voice but inconsistent messaging across proposals, website, and social.',
    result: 'Unified brand system across all touchpoints',
    metric: '3 months',
  },
  {
    client: 'Northbound Coffee',
    sector: 'Consumer Goods',
    challenge: 'A specialty coffee roaster preparing to expand from regional to national retail. Needed a brand that could scale without losing its character.',
    result: 'National retail launch in 240 stores',
    metric: '8 months',
  },
];

const PROCESS = [
  { step: '01', title: 'Discovery', icon: Target, desc: 'We start by listening. Interviews, audits, and market analysis to understand where your brand sits and where it could go.' },
  { step: '02', title: 'Strategy', icon: Compass, desc: 'Positioning, narrative architecture, and channel plan. The blueprint for everything that follows — signed off before any creative work begins.' },
  { step: '03', title: 'Creative', icon: Megaphone, desc: 'Identity, content, and campaigns produced by the same team that wrote the strategy. No handoff, no dilution.' },
  { step: '04', title: 'Launch & measure', icon: BarChart3, desc: 'We launch, then we measure — and adjust. Monthly reporting tied to the metrics that matter to your business, not vanity numbers.' },
];

const TIERS = [
  {
    name: 'Strategy Sprint',
    duration: '4–6 weeks',
    price: 'From £8,000',
    desc: 'A focused engagement for brands that need clarity before they need campaigns.',
    features: ['Market & competitor analysis', 'Positioning & narrative workshop', 'Brand strategy document', '90-day action plan', 'One revision round'],
    highlighted: false,
  },
  {
    name: 'Brand Build',
    duration: '3–4 months',
    price: 'From £24,000',
    desc: 'Full brand system — strategy, identity, and digital presence built from the ground up.',
    features: ['Everything in Strategy Sprint', 'Visual identity & design system', 'Website design & build', 'Content & channel setup', 'Team training & handoff', 'Three months of support'],
    highlighted: true,
  },
  {
    name: 'Retainer',
    duration: 'Ongoing, monthly',
    price: 'From £4,500/mo',
    desc: 'Continuous marketing partnership for brands that need an embedded creative team.',
    features: ['Content production & calendar', 'Social media management', 'Monthly analytics & reporting', 'Campaign development', 'Quarterly strategy review', 'Priority access to full team'],
    highlighted: false,
  },
];

function Stat({ target, suffix, label }: { target: number; suffix: string; label: string }) {
  const { ref, display } = useCountUp(target, 1800, '', suffix);
  return (
    <div className="cell card-lift group text-center hover:shadow-[0_0_40px_-12px_rgba(200,168,120,0.25)]">
      <span ref={ref} className="font-serif text-4xl text-champagne transition-transform duration-500 group-hover:scale-110 group-hover:text-champagne-soft md:text-5xl">
        {display}
      </span>
      <p className="mt-3 text-xs uppercase tracking-[0.18em] text-white/50">{label}</p>
    </div>
  );
}

export function MarketingPage() {
  const servicesRef = useStaggerReveal<HTMLDivElement>(120);
  const statsRef = useReveal<HTMLDivElement>();
  const casesRef = useStaggerReveal<HTMLDivElement>(130);
  const processRef = useStaggerReveal<HTMLDivElement>(100);
  const tiersRef = useStaggerReveal<HTMLDivElement>(130);
  const ctaRef = useReveal<HTMLDivElement>();

  return (
    <>
      <PageHero
        eyebrow="The Signal"
        title="Marketing with"
        titleAccent="restraint."
        subtitle="We treat brands the way we treat manuscripts — starting with the sentence, not the megaphone. Strategy before noise. Narrative before reach. Three disciplines, one standard."
      />

      {/* Stats */}
      <section className="py-16 md:py-20">
        <div className="container-edge">
          <div ref={statsRef} className="reveal grid grid-cols-2 gap-4 md:grid-cols-4">
            {STATS.map((s) => (
              <Stat key={s.label} target={s.target} suffix={s.suffix} label={s.label} />
            ))}
          </div>
        </div>
      </section>

      {/* Services with deliverables */}
      <section className="py-20 md:py-24">
        <div className="container-edge">
          <div className="mx-auto mb-14 max-w-2xl">
            <p className="eyebrow mb-5">Disciplines</p>
            <h2 className="font-serif text-3xl leading-tight text-white sm:text-4xl">
              Three services, one <em className="italic text-champagne shimmer-text">standard.</em>
            </h2>
          </div>
          <div ref={servicesRef} className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {SERVICES.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.name}
                  data-stagger
                  className="reveal-scale cell card-lift group flex flex-col hover:shadow-[0_0_50px_-12px_rgba(200,168,120,0.2)]"
                >
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full border border-champagne/30 text-champagne transition-all duration-500 group-hover:rotate-12 group-hover:scale-110 group-hover:border-champagne/60 group-hover:shadow-[0_0_24px_-6px_rgba(200,168,120,0.5)]">
                    <Icon className="h-5 w-5 transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  <h3 className="font-serif text-2xl text-white">{s.name}</h3>
                  <p className="mt-2 text-xs uppercase tracking-[0.18em] text-champagne/70">{s.tagline}</p>
                  <p className="mt-4 text-sm leading-relaxed text-white/55">{s.desc}</p>
                  <div className="mt-6 border-t border-line pt-5">
                    <p className="mb-3 text-xs uppercase tracking-[0.15em] text-white/40">Deliverables</p>
                    <ul className="space-y-2">
                      {s.deliverables.map((d) => (
                        <li key={d} className="flex items-start gap-2.5 text-sm text-white/60 transition-transform duration-300 hover:translate-x-1">
                          <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-champagne/50 transition-colors duration-300 hover:text-champagne" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Case studies */}
      <section className="py-20 md:py-24">
        <div className="container-edge">
          <div className="mx-auto mb-14 max-w-2xl">
            <p className="eyebrow mb-5">Selected Work</p>
            <h2 className="font-serif text-3xl leading-tight text-white sm:text-4xl">
              Recent <em className="italic text-champagne shimmer-text">engagements.</em>
            </h2>
          </div>
          <div ref={casesRef} className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {CASE_STUDIES.map((c) => (
              <div
                key={c.client}
                data-stagger
                className="reveal-left cell card-lift group flex flex-col hover:shadow-[0_0_50px_-12px_rgba(200,168,120,0.2)]"
              >
                <span className="text-xs uppercase tracking-[0.18em] text-champagne/70">{c.sector}</span>
                <h3 className="mt-3 font-serif text-2xl text-white transition-transform duration-500 group-hover:translate-x-1">{c.client}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/55">{c.challenge}</p>
                <div className="mt-auto pt-6">
                  <div className="hairline mb-4 transition-colors duration-500 group-hover:bg-champagne/20" />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-white/40">Result</p>
                      <p className="mt-1 text-sm font-medium text-champagne transition-transform duration-500 group-hover:scale-105">{c.result}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-white/40">Timeline</p>
                      <p className="mt-1 text-sm text-white/70">{c.metric}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 md:py-24">
        <div className="container-edge">
          <div className="mx-auto mb-14 max-w-2xl">
            <p className="eyebrow mb-5">How We Work</p>
            <h2 className="font-serif text-3xl leading-tight text-white sm:text-4xl">
              Four phases, no <em className="italic text-champagne shimmer-text">surprises.</em>
            </h2>
          </div>
          <div ref={processRef} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.step}
                  data-stagger
                  className="reveal-scale cell card-lift group hover:shadow-[0_0_40px_-12px_rgba(200,168,120,0.15)]"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <span className="font-serif text-3xl text-champagne/30 transition-all duration-500 group-hover:text-champagne/60 group-hover:scale-110">{p.step}</span>
                    <Icon className="h-5 w-5 text-champagne/50 transition-all duration-500 group-hover:rotate-12 group-hover:scale-110" />
                  </div>
                  <h3 className="font-serif text-lg text-white">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/55">{p.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing tiers */}
      <section className="py-20 md:py-24">
        <div className="container-edge">
          <div className="mx-auto mb-14 max-w-2xl">
            <p className="eyebrow mb-5">Ways to Work Together</p>
            <h2 className="font-serif text-3xl leading-tight text-white sm:text-4xl">
              Three engagement <em className="italic text-champagne shimmer-text">models.</em>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/55">
              Every engagement is scoped to your needs, but these are the three
              most common starting points.
            </p>
          </div>
          <div ref={tiersRef} className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {TIERS.map((t) => (
              <div
                key={t.name}
                data-stagger
                className={`reveal-scale cell card-lift group flex flex-col ${
                  t.highlighted ? 'border-champagne/40 bg-champagne/[0.03] animate-glowPulse' : ''
                }`}
              >
                {t.highlighted && (
                  <span className="mb-4 inline-flex w-fit rounded-full bg-champagne/15 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-champagne">
                    Most popular
                  </span>
                )}
                <h3 className="font-serif text-2xl text-white transition-transform duration-500 group-hover:scale-105">{t.name}</h3>
                <p className="mt-1 text-xs uppercase tracking-[0.15em] text-champagne/70">{t.duration}</p>
                <p className="mt-3 font-serif text-xl text-white/80">{t.price}</p>
                <p className="mt-3 text-sm leading-relaxed text-white/55">{t.desc}</p>
                <ul className="mt-6 space-y-3 border-t border-line pt-5">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-white/65 transition-transform duration-300 hover:translate-x-1">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-champagne/50 transition-colors duration-300 hover:text-champagne" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  className={`mt-6 ${t.highlighted ? 'btn-solid' : 'btn-ghost'} w-full transition-transform duration-300 hover:scale-[1.02] active:scale-95`}
                >
                  Request a proposal
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32">
        <div className="container-edge">
          <div ref={ctaRef} className="reveal mx-auto max-w-2xl text-center">
            <TrendingUp className="mx-auto mb-6 h-8 w-8 animate-floatYSlow text-champagne/40" />
            <h2 className="font-serif text-3xl leading-tight text-white sm:text-4xl">
              Ready to build something <em className="italic text-champagne shimmer-text">worth reading?</em>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-white/60">
              We take on a limited number of brand engagements each year. Tell
              us about your brand and we'll tell you if we're the right house.
            </p>
            <Link to="/contact" className="btn-solid group mt-8 transition-transform duration-300 hover:scale-105 active:scale-95">
              Request a proposal
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
