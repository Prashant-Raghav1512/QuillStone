import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Loader2, Mail, MapPin, Clock, ChevronDown } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { useReveal, useStaggerReveal } from '@/lib/hooks';

type Status = 'idle' | 'loading' | 'success' | 'error';

const INTERESTS = ['Publishing', 'Marketing', 'General'] as const;

const FAQS = [
  {
    q: 'Do I need an agent to submit a manuscript?',
    a: 'No. We accept submissions directly from authors and read every manuscript that arrives, in the order it arrives. If you do have an agent, they are welcome to submit on your behalf — but it is not required.',
  },
  {
    q: 'How long does it take to hear back about a manuscript?',
    a: 'We aim to respond within six weeks. If a manuscript has passed the initial reading stage and is under serious consideration, we will let you know and give you a detailed timeline.',
  },
  {
    q: 'What does a typical marketing engagement look like?',
    a: 'Most engagements start with a Strategy Sprint (4–6 weeks) to define positioning and narrative. From there, we either move into a Brand Build (3–4 months) or an ongoing monthly retainer, depending on what you need.',
  },
  {
    q: 'Do you work with brands outside the publishing and arts sectors?',
    a: 'Yes. While our roots are in publishing, we work with brands across technology, consumer goods, hospitality, and the non-profit sector. The discipline is the same — narrative first, channels second.',
  },
  {
    q: 'How many manuscripts and brand engagements do you take on each year?',
    a: 'We acquire six to eight manuscripts a year and take on a limited number of brand engagements — never more than we can give our full attention. This is deliberate. We would rather do fewer things well.',
  },
  {
    q: 'Where are you based, and do you work remotely?',
    a: 'We have studios in London and Edinburgh, and we work with clients and authors around the world. Most of our process can be handled remotely, though we prefer an initial in-person or video meeting.',
  },
];

const OFFICES = [
  { city: 'London', address: '14 Blackfriars Lane, London EC4', note: 'Editorial & Marketing' },
  { city: 'Edinburgh', address: '7 Candlemaker Row, Edinburgh EH1', note: 'Design & Production' },
];

function FaqItem({ item, index }: { item: { q: string; a: string }; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-line">
      <button
        onClick={() => setOpen((v) => !v)}
        className="group flex w-full items-center justify-between py-5 text-left transition-colors duration-300 hover:text-champagne"
        style={{ animation: `fadeUp 0.6s var(--ease) ${index * 80}ms both` }}
      >
        <span className="font-serif text-lg text-white transition-colors duration-300 group-hover:text-champagne">{item.q}</span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-champagne/60 transition-transform duration-400 ease-cinematic ${
            open ? 'rotate-180' : ''
          } group-hover:scale-110`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-500 ease-cinematic ${
          open ? 'max-h-60 pb-5' : 'max-h-0'
        }`}
      >
        <p className="text-sm leading-relaxed text-white/55" style={{ opacity: open ? 1 : 0, transition: 'opacity 0.3s ease 0.1s' }}>
          {item.a}
        </p>
      </div>
    </div>
  );
}

export function ContactPage() {
  const formRef = useReveal<HTMLDivElement>();
  const faqRef = useStaggerReveal<HTMLDivElement>(80);
  const officesRef = useStaggerReveal<HTMLDivElement>(120);
  const ctaRef = useReveal<HTMLDivElement>();

  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [form, setForm] = useState({ name: '', email: '', interest: 'Publishing', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'loading') return;
    setStatus('loading');
    setErrorMsg('');
    try {
      const res = await fetch('/api/queries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          interest: form.interest,
          message: form.message.trim(),
        }),
      });
      if (!res.ok) throw new Error('Request failed');
      setStatus('success');
      setForm({ name: '', email: '', interest: 'Publishing', message: '' });
    } catch {
      setStatus('error');
      setErrorMsg('Something went wrong sending your query. Please try again.');
    }
  };

  return (
    <>
      <PageHero
        eyebrow="Query the House"
        title="Manuscripts and brands,"
        titleAccent="both welcome."
        subtitle="Tell us what you're working on. A manuscript seeking a publisher, a brand seeking a voice, or simply an idea not yet shaped — we read every query."
      />

      {/* Form + info */}
      <section className="py-16 md:py-20">
        <div className="container-edge">
          <div ref={formRef} className="reveal grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
            {/* Left — contact info */}
            <div>
              <h2 className="font-serif text-2xl text-white sm:text-3xl">
                Reach the <em className="italic text-champagne shimmer-text">house.</em>
              </h2>
              <p className="mt-5 max-w-md text-base leading-relaxed text-white/60">
                Whether you're an author with a finished manuscript or a brand
                with a story to tell, start here. We respond to every query
                within five working days.
              </p>

              <div className="mt-10 space-y-6">
                <div
                  className="group flex items-start gap-4 transition-transform duration-300 hover:translate-x-1"
                  style={{ animation: 'fadeLeft 0.6s var(--ease) 0.2s both' }}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-champagne/30 text-champagne transition-all duration-500 group-hover:rotate-12 group-hover:scale-110 group-hover:border-champagne/60 group-hover:shadow-[0_0_20px_-4px_rgba(200,168,120,0.4)]">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-white/40">Email</p>
                    <div className="mt-1.5 space-y-1 text-sm text-white/65">
                      <p className="transition-colors duration-300 hover:text-champagne"><span className="text-white/85">Editorial</span> — editorial@quillstones.example</p>
                      <p className="transition-colors duration-300 hover:text-champagne"><span className="text-white/85">Marketing</span> — studio@quillstones.example</p>
                      <p className="transition-colors duration-300 hover:text-champagne"><span className="text-white/85">Press</span> — press@quillstones.example</p>
                    </div>
                  </div>
                </div>

                <div
                  className="group flex items-start gap-4 transition-transform duration-300 hover:translate-x-1"
                  style={{ animation: 'fadeLeft 0.6s var(--ease) 0.4s both' }}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-champagne/30 text-champagne transition-all duration-500 group-hover:rotate-12 group-hover:scale-110 group-hover:border-champagne/60">
                    <Clock className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-white/40">Response Time</p>
                    <p className="mt-1.5 text-sm text-white/65">Within five working days</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right — form */}
            <div className="cell card-lift !p-8 md:!p-10 hover:shadow-[0_0_50px_-12px_rgba(200,168,120,0.15)]">
              {status === 'success' ? (
                <div className="flex min-h-[24rem] flex-col items-center justify-center text-center">
                  <div className="flex h-14 w-14 animate-scaleIn items-center justify-center rounded-full border border-champagne/40 text-champagne">
                    <Check className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 font-serif text-2xl text-white animate-fadeUp" style={{ animationDelay: '0.2s', opacity: 0 }}>
                    Query received.
                  </h3>
                  <p className="mt-3 max-w-xs animate-fadeUp text-sm text-white/55" style={{ animationDelay: '0.4s', opacity: 0 }}>
                    Thank you. The house will read your note and reply within five
                    working days.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="btn-ghost mt-8 animate-fadeUp text-xs transition-transform duration-300 hover:scale-105 active:scale-95"
                    style={{ animationDelay: '0.6s', opacity: 0 }}
                  >
                    Send another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <Field
                      label="Name"
                      value={form.name}
                      onChange={(v) => setForm({ ...form, name: v })}
                      required
                      placeholder="Your name"
                    />
                    <Field
                      label="Email"
                      type="email"
                      value={form.email}
                      onChange={(v) => setForm({ ...form, email: v })}
                      required
                      placeholder="you@example.com"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-xs uppercase tracking-[0.18em] text-white/50">
                      Interest
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {INTERESTS.map((it) => (
                        <button
                          key={it}
                          type="button"
                          onClick={() => setForm({ ...form, interest: it })}
                          className={`rounded-full border px-4 py-2 text-xs font-medium transition-all duration-300 ease-cinematic hover:scale-105 active:scale-95 ${
                            form.interest === it
                              ? 'border-champagne bg-champagne/15 text-champagne shadow-[0_0_16px_-4px_rgba(200,168,120,0.4)]'
                              : 'border-line text-white/55 hover:border-champagne/40 hover:text-white'
                          }`}
                        >
                          {it}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-xs uppercase tracking-[0.18em] text-white/50">
                      Message
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Tell us about your manuscript or brand…"
                      className="w-full resize-none rounded-xl border border-line bg-void/40 px-4 py-3 text-sm text-white placeholder-white/30 transition-all duration-300 focus:border-champagne/50 focus:bg-void/60 focus:shadow-[0_0_20px_-8px_rgba(200,168,120,0.2)] focus:outline-none"
                    />
                  </div>

                  {status === 'error' && (
                    <p className="animate-fadeUp text-sm text-rust">{errorMsg}</p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="btn-solid group w-full transition-transform duration-300 hover:scale-[1.02] active:scale-95 disabled:opacity-60"
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        Send query
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Offices */}
      <section className="py-20 md:py-24">
        <div className="container-edge">
          <div className="mx-auto mb-14 max-w-2xl">
            <p className="eyebrow mb-5">Studios</p>
            <h2 className="font-serif text-3xl leading-tight text-white sm:text-4xl">
              Where the house <em className="italic text-champagne shimmer-text">works.</em>
            </h2>
          </div>
          <div ref={officesRef} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {OFFICES.map((o) => (
              <div
                key={o.city}
                data-stagger
                className="reveal-scale cell card-lift group hover:shadow-[0_0_50px_-12px_rgba(200,168,120,0.2)]"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-champagne/30 text-champagne transition-all duration-500 group-hover:rotate-12 group-hover:scale-110 group-hover:border-champagne/60 group-hover:shadow-[0_0_24px_-6px_rgba(200,168,120,0.5)]">
                  <MapPin className="h-5 w-5" />
                </div>
                <h3 className="font-serif text-2xl text-white transition-transform duration-500 group-hover:translate-x-1">{o.city}</h3>
                <p className="mt-2 text-sm text-white/60">{o.address}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.15em] text-champagne/70">{o.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-24">
        <div className="container-edge">
          <div className="mx-auto mb-14 max-w-2xl">
            <p className="eyebrow mb-5">Common Questions</p>
            <h2 className="font-serif text-3xl leading-tight text-white sm:text-4xl">
              Before you <em className="italic text-champagne shimmer-text">ask.</em>
            </h2>
          </div>
          <div ref={faqRef} className="mx-auto max-w-2xl">
            {FAQS.map((item, i) => (
              <div key={item.q} data-stagger>
                <FaqItem item={item} index={i} />
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
              Still <em className="italic text-champagne shimmer-text">thinking?</em>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-white/60">
              Browse the shelf or read about our philosophy. The house is in no
              rush — and neither should you be.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link to="/publishing" className="btn-solid group transition-transform duration-300 hover:scale-105 active:scale-95">
                Explore the shelf
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

function Field({
  label,
  value,
  onChange,
  type = 'text',
  required,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div className="group">
      <label className="mb-2 block text-xs uppercase tracking-[0.18em] text-white/50 transition-colors duration-300 group-focus-within:text-champagne/70">
        {label}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-line bg-void/40 px-4 py-3 text-sm text-white placeholder-white/30 transition-all duration-300 focus:border-champagne/50 focus:bg-void/60 focus:shadow-[0_0_20px_-8px_rgba(200,168,120,0.2)] focus:outline-none"
      />
    </div>
  );
}
