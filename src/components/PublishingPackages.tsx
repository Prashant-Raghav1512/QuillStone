import { Link } from 'react-router-dom';

interface PublishingPackage {
  name: string;
  tagline: string;
  price: string;
  /** shown above the feature list, e.g. "Everything in Essential, plus:" */
  includes?: string;
  features: string[];
  popular?: boolean;
}

// PLACEHOLDER content: the prices below are illustrative only. Replace them
// (and the currency) with the real figures before this goes live.
const PACKAGES: PublishingPackage[] = [
  {
    name: 'Essential',
    tagline: 'For manuscripts that are nearly there.',
    price: '$299',
    includes: 'What’s included:',
    features: [
      'Proofreading',
      'Custom eBook front cover design',
      'EPUB & print-ready PDF formatting',
      'One ISBN',
      'Amazon KDP setup',
    ],
  },
  {
    name: 'Premium',
    tagline: 'The complete path from draft to print.',
    price: '$599',
    popular: true,
    includes: 'Everything in Essential, plus:',
    features: [
      'Copy editing',
      'Full wraparound print cover (front, spine, back)',
      'ISBNs for every format',
      'Metadata, blurb & BISAC optimization',
      'IngramSpark & Draft2Digital distribution',
    ],
  },
  {
    name: 'Elite',
    tagline: 'Full-service publishing, start to finish.',
    price: '$1,199',
    includes: 'Everything in Premium, plus:',
    features: [
      'Developmental editing',
      'Manuscript prep & beta reader guidance',
      'Author website setup',
      'Advance review team & launch campaign',
      'Targeted ad campaign setup',
    ],
  },
];

/**
 * Three-tier pricing grid. The middle (popular) tier is highlighted.
 * `.reveal` wraps each card rather than sitting on it so the card's own hover
 * transition isn't overridden by the reveal transition.
 */
export function PublishingPackages() {
  return (
    <section className="packages" id="packages">
      <div className="wrap">
        <div className="section-head centered reveal">
          <div className="eyebrow">Publishing packages</div>
          <h2>
            Choose your <em>path to print.</em>
          </h2>
          <p>Three ways to publish. Every package ends with your book on sale worldwide.</p>
        </div>

        <div className="package-grid">
          {PACKAGES.map((pkg) => (
            <div className="package-slot reveal" key={pkg.name}>
              <article className={'package' + (pkg.popular ? ' is-popular' : '')}>
                {pkg.popular && <div className="package-badge">Most Popular</div>}
                <h3 className="package-name serif">{pkg.name}</h3>
                <p className="package-tagline">{pkg.tagline}</p>
                <div className="package-price serif">{pkg.price}</div>
                {pkg.includes && <p className="package-includes">{pkg.includes}</p>}
                <ul className="package-features">
                  {pkg.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  className={'package-cta pill' + (pkg.popular ? '' : ' ghost')}
                >
                  Choose {pkg.name}
                </Link>
              </article>
            </div>
          ))}
        </div>

        <p className="package-foot reveal">
          Not sure which fits your book? <Link to="/contact">Tell us about it →</Link>
        </p>
      </div>
    </section>
  );
}
