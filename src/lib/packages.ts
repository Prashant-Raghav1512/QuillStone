export interface PublishingPackage {
  name: string;
  tagline: string;
  price: string;
  /** shown above the feature list, e.g. "Everything in Essential, plus:" */
  includes?: string;
  features: string[];
  popular?: boolean;
}

// PLACEHOLDER content: the prices below are illustrative only. Replace them
// (and the currency) with the real figures before relying on them.
export const PACKAGES: PublishingPackage[] = [
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

/** Choices for the "package" field on the manuscript submission form. */
export const NOT_SURE = 'Not sure yet';
export const PACKAGE_CHOICES = [...PACKAGES.map((p) => p.name), NOT_SURE];
