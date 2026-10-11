/**
 * Contact details and business facts shown around the site.
 *
 * Every empty value is a TODO(real data): the element that uses it stays hidden
 * until you fill it in, so the site never shows a made-up number or address.
 * Fill in only details that are real and current.
 */

export interface SocialLink {
  label: string;
  url: string;
}

export const SITE = {
  name: 'Quillstones',

  /** Already published on the site. Make sure this inbox is monitored. */
  email: 'hello@quillstones.com',

  // TODO(real data): phone number in international format, e.g. '+44 20 7946 0000'.
  // Shown in the header, footer and mobile menu once set.
  phone: '',

  // TODO(real data): WhatsApp number, digits only with the country code and no
  // '+', spaces or leading zeros, e.g. '447700900000'. Turns on the floating
  // WhatsApp button and the WhatsApp links in the header and footer.
  whatsapp: '',

  /** Pre-filled text when a visitor opens WhatsApp from the site. */
  whatsappMessage: 'Hi Quillstones, I’d like to know more about publishing my book.',

  // TODO(real data): postal address, one line per entry. Shown in the footer once set.
  address: [] as string[],

  // TODO(real data): social profiles, e.g. { label: 'Instagram', url: 'https://instagram.com/…' }.
  social: [] as SocialLink[],

  // TODO(real data): ISO 4217 code for package prices, e.g. 'INR', 'USD' or 'GBP'.
  // Package prices stay hidden until both this and the prices in lib/packages.ts are set.
  currency: '',

  // TODO(real data): shown under package prices, e.g. 'Prices include GST.'
  taxNote: '',

  // TODO(real data): the year Quillstones started working with authors. The
  // "since …" line under the hero stays hidden until it is set.
  foundedYear: null as number | null,
};

/** Strips everything but digits, so wa.me links work however the number was typed. */
const digits = (s: string) => s.replace(/\D/g, '');

export const hasWhatsApp = digits(SITE.whatsapp).length >= 8;
export const hasPhone = digits(SITE.phone).length >= 7;

export function whatsappHref(message = SITE.whatsappMessage) {
  return `https://wa.me/${digits(SITE.whatsapp)}?text=${encodeURIComponent(message)}`;
}

export const phoneHref = () => `tel:${SITE.phone.replace(/[^\d+]/g, '')}`;

/** The WhatsApp number as visitors will read it, e.g. +447700900000. */
export const whatsappDisplay = () => '+' + digits(SITE.whatsapp);

/** Formats a package price in the configured currency, or null if prices aren't set up yet. */
export function formatPrice(amount: number | undefined) {
  if (amount === undefined || !SITE.currency) return null;
  try {
    return new Intl.NumberFormat(SITE.currency === 'INR' ? 'en-IN' : 'en', {
      style: 'currency',
      currency: SITE.currency,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return null;
  }
}
