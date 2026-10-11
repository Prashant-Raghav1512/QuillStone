import { SITE, hasPhone, hasWhatsApp, phoneHref, whatsappDisplay, whatsappHref } from '@/config/site';

/**
 * Phone, WhatsApp and (optionally) email links from config/site.ts. Each one
 * only appears once its value is filled in; with nothing set this renders
 * nothing at all.
 */
export function ContactLinks({ className, withEmail = false }: { className?: string; withEmail?: boolean }) {
  if (!hasPhone && !hasWhatsApp && !withEmail) return null;

  return (
    <ul className={'contact-links' + (className ? ' ' + className : '')}>
      {hasPhone && (
        <li>
          <a href={phoneHref()} data-cta="Phone">
            <span className="contact-links-label">Call</span> {SITE.phone}
          </a>
        </li>
      )}
      {hasWhatsApp && (
        <li>
          <a
            href={whatsappHref()}
            target="_blank"
            rel="noopener noreferrer"
            data-cta="WhatsApp"
            aria-label={`WhatsApp ${whatsappDisplay()} (opens in a new tab)`}
          >
            <span className="contact-links-label">WhatsApp</span>
            {!hasPhone && ' ' + whatsappDisplay()}
          </a>
        </li>
      )}
      {withEmail && (
        <li>
          <a href={`mailto:${SITE.email}`} data-cta="Email">
            {SITE.email}
          </a>
        </li>
      )}
    </ul>
  );
}
