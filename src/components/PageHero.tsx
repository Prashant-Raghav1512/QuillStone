import { useReveal } from '@/lib/hooks';
import { useTextReveal } from '@/lib/useTextReveal';

/**
 * Shared page-header hero used at the top of each interior page.
 * Includes ambient champagne blobs, fine-grain overlay, animated
 * text reveal, and a parallax accent line.
 */
export function PageHero({
  eyebrow,
  title,
  titleAccent,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  titleAccent: string;
  subtitle: string;
}) {
  const ref = useReveal<HTMLDivElement>();
  const titleReveal = useTextReveal(title);
  const accentReveal = useTextReveal(titleAccent, 'italic text-champagne');

  return (
    <section className="relative overflow-hidden pb-12 pt-36 md:pt-44 md:pb-16">
      {/* Ambient blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-32 top-0 h-[28rem] w-[28rem] rounded-full bg-champagne/8 blur-[120px] animate-blobDrift" />
        <div
          className="absolute -right-24 bottom-0 h-[24rem] w-[24rem] rounded-full bg-champagne/6 blur-[110px] animate-blobDrift"
          style={{ animationDelay: '-6s' }}
        />
        <div
          className="absolute left-1/3 top-1/2 h-[20rem] w-[20rem] rounded-full bg-white/[0.02] blur-[90px] animate-blobDrift"
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

      <div className="container-edge">
        <div ref={ref} className="reveal max-w-3xl">
          <p
            className="eyebrow mb-6 animate-fadeUp"
            style={{ animationDelay: '0.1s', opacity: 0 }}
          >
            {eyebrow}
          </p>
          <h1 className="font-serif text-4xl leading-[1.08] tracking-tightest text-white sm:text-5xl md:text-6xl lg:text-7xl">
            {titleReveal.content} {accentReveal.content}
          </h1>
          <p
            className="mt-7 max-w-xl animate-fadeUp text-base leading-relaxed text-white/60 md:text-lg"
            style={{ animationDelay: '0.6s', opacity: 0 }}
          >
            {subtitle}
          </p>
          {/* Animated accent line */}
          <div
            className="mt-8 h-px w-24 origin-left bg-gradient-to-r from-champagne to-transparent"
            style={{ animation: 'drawLine 1s var(--ease) 0.8s both' }}
          />
        </div>
      </div>
    </section>
  );
}
