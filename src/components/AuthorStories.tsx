import { TESTIMONIALS } from '@/data/testimonials';

/**
 * Testimonials from data/testimonials.ts, reusing the site's quote-card
 * styling. Renders nothing until there is at least one real entry.
 */
export function AuthorStories() {
  if (TESTIMONIALS.length === 0) return null;

  return (
    <section className="proof" id="stories">
      <div className="wrap">
        <div className="eyebrow reveal">Author stories</div>
        <div className="quotes">
          {TESTIMONIALS.map((t) => (
            <figure className="qcard reveal" key={t.name + t.quote}>
              <blockquote>
                <p>“{t.quote}”</p>
              </blockquote>
              <figcaption className="who">
                <b>{t.name}</b>
                {(t.role || t.work) && (
                  <>
                    {' '}
                    — {t.role}
                    {t.role && t.work && ', '}
                    {t.work && <em>{t.work}</em>}
                  </>
                )}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
