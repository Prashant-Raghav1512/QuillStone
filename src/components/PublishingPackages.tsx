import { Link } from 'react-router-dom';
import { PACKAGES } from '@/lib/packages';
import { SITE, formatPrice } from '@/config/site';
import { QuoteForm } from '@/components/QuoteForm';

/**
 * Three-tier pricing grid. The middle (popular) tier is highlighted, and each
 * "Choose" button jumps to the submission form with that package preselected.
 * Prices come from lib/packages.ts in the currency set in config/site.ts, and
 * read "Price on request" until both are filled in.
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
          {PACKAGES.map((pkg) => {
            const price = formatPrice(pkg.price);
            return (
              <div className="package-slot reveal" key={pkg.name}>
                <article className={'package' + (pkg.popular ? ' is-popular' : '')}>
                  {pkg.popular && <div className="package-badge">Most Popular</div>}
                  <h3 className="package-name serif">{pkg.name}</h3>
                  <p className="package-tagline">{pkg.tagline}</p>
                  <div className={'package-price serif' + (price ? '' : ' is-on-request')}>
                    {price ?? 'Price on request'}
                    {price && SITE.taxNote && <span className="package-tax">{SITE.taxNote}</span>}
                  </div>
                  {pkg.includes && <p className="package-includes">{pkg.includes}</p>}
                  <ul className="package-features">
                    {pkg.features.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                  <Link
                    to={`/?scroll=submit&package=${encodeURIComponent(pkg.name)}`}
                    className={'package-cta pill' + (pkg.popular ? '' : ' ghost')}
                  >
                    Choose {pkg.name}
                  </Link>
                </article>
              </div>
            );
          })}
        </div>

        <div className="package-quote reveal">
          <QuoteForm
            placement="packages"
            headingLevel="h3"
            title={
              <>
                Not sure which <em>fits your book?</em>
              </>
            }
            intro={
              <>
                Tell us a little and we’ll recommend a package, with a free quote. Ready to send
                your manuscript? <Link to="/?scroll=submit">Submit it here →</Link>
              </>
            }
          />
        </div>
      </div>
    </section>
  );
}
