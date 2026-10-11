export interface PublishingPackage {
  name: string;
  tagline: string;
  /** in the currency set in config/site.ts, e.g. 24999. Shows "Price on request" when omitted. */
  price?: number;
  /** shown above the feature list, e.g. "Everything in Essential, plus:" */
  includes?: string;
  features: string[];
  popular?: boolean;
}

// TODO(real data): add each package's real price as a number (e.g. price: 24999)
// and set SITE.currency in config/site.ts. Until both are set, the cards show
// "Price on request" instead of a figure.
export const PACKAGES: PublishingPackage[] = [
  {
    name: 'Essential',
    tagline: 'For manuscripts that are nearly there.',
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

/** Choices for the "package" field on the manuscript submission form. */
export const NOT_SURE = 'Not sure yet';
export const PACKAGE_CHOICES = [...PACKAGES.map((p) => p.name), NOT_SURE];
