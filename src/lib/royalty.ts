/**
 * Royalty maths for the calculator, following Amazon KDP's published terms for
 * the Amazon.com (US) marketplace, in USD.
 *
 * Checked against the KDP help pages in October 2026. KDP changes these terms
 * (the eBook 70% price band widened from $9.99 to $12.99 on 7 July 2026), so
 * re-check every figure below before relying on it.
 *
 * eBook     70% x (list price - delivery cost) when the list price is inside the
 *           70% band, otherwise 35% x list price.
 *           https://kdp.amazon.com/en_US/help/topic/G200634500
 * Paperback (rate x list price) - printing cost, where the rate is 50% up to
 *           $9.98 and 60% from $9.99.
 *           https://kdp.amazon.com/en_US/help/topic/G201834340
 */
export const KDP_TERMS_CHECKED = 'October 2026';

export const EBOOK = {
  bandMin: 2.99,
  bandMax: 12.99,
  bandRate: 0.7,
  outsideRate: 0.35,
  deliveryPerMB: 0.15,
  /** a text-only novel is typically around 1 MB */
  assumedFileMB: 1,
};

/** Black-and-white interior, standard trim. */
export const PAPERBACK = {
  lowRate: 0.5,
  highRate: 0.6,
  highRateFrom: 9.99,
  shortBookMaxPages: 110,
  shortBookCost: 2.3,
  fixedCost: 1,
  perPage: 0.012,
};

export type Format = 'ebook' | 'paperback';

export interface RoyaltyBreakdown {
  /** the author's earnings on one sale */
  perCopy: number;
  /** delivery fee (eBook) or printing cost (paperback) per sale */
  cost: number;
  /** the retailer's share of what is left */
  retailerShare: number;
  /** the royalty rate that applied (0.7, 0.35, 0.6 or 0.5) */
  rate: number;
}

const ceilToCent = (n: number) => Math.ceil(n * 100 - 1e-9) / 100;

export function printingCost(pages: number) {
  return pages <= PAPERBACK.shortBookMaxPages
    ? PAPERBACK.shortBookCost
    : PAPERBACK.fixedCost + PAPERBACK.perPage * pages;
}

export function paperbackRate(listPrice: number) {
  return listPrice >= PAPERBACK.highRateFrom ? PAPERBACK.highRate : PAPERBACK.lowRate;
}

/** The lowest list price at which the royalty still covers the printing cost. */
export function minPaperbackPrice(pages: number) {
  const cost = printingCost(pages);
  const atLowRate = cost / PAPERBACK.lowRate;
  if (atLowRate < PAPERBACK.highRateFrom) return ceilToCent(atLowRate);
  return Math.max(ceilToCent(cost / PAPERBACK.highRate), PAPERBACK.highRateFrom);
}

export function ebookRoyalty(listPrice: number): RoyaltyBreakdown {
  const inBand = listPrice >= EBOOK.bandMin && listPrice <= EBOOK.bandMax;
  const rate = inBand ? EBOOK.bandRate : EBOOK.outsideRate;
  const cost = inBand ? EBOOK.deliveryPerMB * EBOOK.assumedFileMB : 0;
  const perCopy = rate * (listPrice - cost);
  return { perCopy, cost, retailerShare: listPrice - cost - perCopy, rate };
}

export function paperbackRoyalty(listPrice: number, pages: number): RoyaltyBreakdown {
  const rate = paperbackRate(listPrice);
  const cost = printingCost(pages);
  const perCopy = Math.max(0, rate * listPrice - cost);
  return { perCopy, cost, retailerShare: listPrice * (1 - rate), rate };
}

const usd = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
const usdWhole = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

/** $4.60, or $12,400 once the amount is large enough that cents are noise. */
export const money = (n: number) => (n >= 1000 ? usdWhole : usd).format(n);
