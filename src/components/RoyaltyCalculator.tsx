import { useId, useState, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import {
  EBOOK,
  KDP_TERMS_CHECKED,
  PAPERBACK,
  ebookRoyalty,
  minPaperbackPrice,
  money,
  paperbackRoyalty,
  type Format,
} from '@/lib/royalty';

const FORMATS: { id: Format; label: string }[] = [
  { id: 'ebook', label: 'eBook' },
  { id: 'paperback', label: 'Paperback' },
];

// Prices move in $1 steps with a .99 ending, the way books are usually priced.
const DOLLARS = { ebook: { min: 1, max: 20 }, paperback: { min: 6, max: 40 } };
const PAGES = { min: 50, max: 600, step: 10 };
const COPIES = { min: 0, max: 500, step: 5 };

/** How far along its track a slider is, as a CSS percentage (drives the gold fill). */
const fillOf = (value: number, min: number, max: number): CSSProperties =>
  ({ '--fill': `${((value - min) / (max - min)) * 100}%` }) as CSSProperties;

/**
 * Royalty estimator based on Amazon KDP's published terms (see lib/royalty.ts).
 * The sales figure is the visitor's own assumption, and the copy says so: this
 * is an illustration of how royalties work, not a forecast.
 * `.reveal` sits on a static wrapper; the dynamic content lives inside it.
 */
export function RoyaltyCalculator() {
  const uid = useId();
  const [format, setFormat] = useState<Format>('ebook');
  const [dollars, setDollars] = useState({ ebook: 5, paperback: 15 });
  const [pages, setPages] = useState(300);
  const [copies, setCopies] = useState(20);

  const isEbook = format === 'ebook';

  // paperbacks can't be listed below the price at which the royalty covers printing
  const minPrice = minPaperbackPrice(pages);
  const minDollar = Math.max(DOLLARS.paperback.min, Math.ceil(minPrice + 0.01 - 1e-9));
  const range = isEbook ? DOLLARS.ebook : { min: minDollar, max: DOLLARS.paperback.max };
  const dollar = Math.min(range.max, Math.max(range.min, dollars[format]));
  const listPrice = dollar - 0.01;

  const result = isEbook ? ebookRoyalty(listPrice) : paperbackRoyalty(listPrice, pages);
  const monthly = result.perCopy * copies;
  const yearly = monthly * 12;

  const earnPct = (result.perCopy / listPrice) * 100;
  const costPct = (result.cost / listPrice) * 100;
  const retailerPct = Math.max(0, 100 - earnPct - costPct);

  let tip: string;
  if (isEbook) {
    if (listPrice > EBOOK.bandMax) {
      tip = `Above ${money(EBOOK.bandMax)} Amazon pays ${EBOOK.outsideRate * 100}% instead of ${EBOOK.bandRate * 100}%. Pricing at ${money(EBOOK.bandMax)} would earn you ${money(ebookRoyalty(EBOOK.bandMax).perCopy)} a copy.`;
    } else if (listPrice < EBOOK.bandMin) {
      tip = `Below ${money(EBOOK.bandMin)} Amazon pays ${EBOOK.outsideRate * 100}% instead of ${EBOOK.bandRate * 100}%. At ${money(EBOOK.bandMin)} you would earn ${money(ebookRoyalty(EBOOK.bandMin).perCopy)} a copy.`;
    } else {
      tip = `Between ${money(EBOOK.bandMin)} and ${money(EBOOK.bandMax)} Amazon pays its ${EBOOK.bandRate * 100}% rate, after a small delivery fee.`;
    }
  } else {
    tip = `Printing ${pages} pages costs about ${money(result.cost)} a copy, so Amazon's minimum list price at this length is ${money(minPrice)}.`;
    if (listPrice < PAPERBACK.highRateFrom) {
      tip += ` Listed at ${money(PAPERBACK.highRateFrom)} or more, paperbacks earn ${PAPERBACK.highRate * 100}% instead of ${PAPERBACK.lowRate * 100}%.`;
    }
  }

  const priceId = `${uid}-price`;
  const pagesId = `${uid}-pages`;
  const copiesId = `${uid}-copies`;

  return (
    <section className="calculator" id="calculator">
      <div className="wrap">
        <div className="section-head centered reveal">
          <div className="eyebrow">Royalty calculator</div>
          <h2>
            What could your book <em>earn?</em>
          </h2>
          <p>
            Move the sliders to see how price and format change what you keep from each sale. The
            number of sales is your own guess, not a forecast.
          </p>
        </div>

        <div className="calc-slot reveal">
          <div className="calc">
            <div className="calc-controls">
              <div className="calc-tabs" role="radiogroup" aria-label="Book format">
                {FORMATS.map((f) => (
                  <label className={'calc-tab' + (format === f.id ? ' is-active' : '')} key={f.id}>
                    <input
                      type="radio"
                      name={`${uid}-format`}
                      value={f.id}
                      checked={format === f.id}
                      onChange={() => setFormat(f.id)}
                    />
                    {f.label}
                  </label>
                ))}
              </div>

              <div className="calc-field">
                <div className="calc-label">
                  <label htmlFor={priceId}>List price</label>
                  <span className="calc-value">{money(listPrice)}</span>
                </div>
                <input
                  id={priceId}
                  type="range"
                  min={range.min}
                  max={range.max}
                  step={1}
                  value={dollar}
                  style={fillOf(dollar, range.min, range.max)}
                  aria-valuetext={money(listPrice)}
                  onChange={(e) => setDollars((d) => ({ ...d, [format]: Number(e.target.value) }))}
                />
              </div>

              {!isEbook && (
                <div className="calc-field">
                  <div className="calc-label">
                    <label htmlFor={pagesId}>Page count</label>
                    <span className="calc-value">{pages} pages</span>
                  </div>
                  <input
                    id={pagesId}
                    type="range"
                    min={PAGES.min}
                    max={PAGES.max}
                    step={PAGES.step}
                    value={pages}
                    style={fillOf(pages, PAGES.min, PAGES.max)}
                    onChange={(e) => setPages(Number(e.target.value))}
                  />
                </div>
              )}

              <div className="calc-field">
                <div className="calc-label">
                  <label htmlFor={copiesId}>Copies sold per month</label>
                  <span className="calc-value">{copies}</span>
                </div>
                <input
                  id={copiesId}
                  type="range"
                  min={COPIES.min}
                  max={COPIES.max}
                  step={COPIES.step}
                  value={copies}
                  style={fillOf(copies, COPIES.min, COPIES.max)}
                  onChange={(e) => setCopies(Number(e.target.value))}
                />
              </div>

              <p className="calc-tip">{tip}</p>
            </div>

            <div className="calc-results">
              <div className="calc-kicker">Estimated yearly royalties</div>
              <div className="calc-total serif">{money(yearly)}</div>

              <div className="calc-stats">
                <div>
                  <span className="calc-stat-value">{money(result.perCopy)}</span>
                  <span className="calc-stat-label">per copy</span>
                </div>
                <div>
                  <span className="calc-stat-value">{money(monthly)}</span>
                  <span className="calc-stat-label">per month</span>
                </div>
                <div>
                  <span className="calc-stat-value">{Math.round(earnPct)}%</span>
                  <span className="calc-stat-label">of list price</span>
                </div>
              </div>

              <div
                className="calc-split"
                role="img"
                aria-label={`Of each ${money(listPrice)} sale you earn ${money(result.perCopy)}`}
              >
                <span className="mine" style={{ width: `${earnPct}%` }}></span>
                {result.cost > 0 && <span className="cost" style={{ width: `${costPct}%` }}></span>}
                <span className="retailer" style={{ width: `${retailerPct}%` }}></span>
              </div>
              <ul className="calc-legend">
                <li className="mine">
                  <span>You earn</span>
                  <b>{money(result.perCopy)}</b>
                </li>
                {result.cost > 0 && (
                  <li className="cost">
                    <span>{isEbook ? 'Delivery fee' : 'Printing cost'}</span>
                    <b>{money(result.cost)}</b>
                  </li>
                )}
                <li className="retailer">
                  <span>Amazon’s share</span>
                  <b>{money(result.retailerShare)}</b>
                </li>
              </ul>

              <p className="calc-fine">
                Estimates for Amazon.com (US) under Amazon KDP’s published terms as of{' '}
                {KDP_TERMS_CHECKED}, before tax. We assume a {EBOOK.assumedFileMB} MB eBook file and
                a black-and-white, standard-trim paperback. Other retailers, regions and your actual
                sales will differ.
              </p>
              <Link className="pill" to="/?scroll=packages">
                See publishing packages
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
