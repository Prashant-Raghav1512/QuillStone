import { Link } from 'react-router-dom';

interface Release {
  title: string;
  tag?: string;
  author?: string;
  synopsis: string;
  /** cover image URL, e.g. `${BASE}books/cover.jpg` for a file in public/books/. Typographic jacket when omitted. */
  cover?: string;
  /** retailer link for the Buy Now button. The button shows as inactive when omitted. */
  buyUrl?: string;
}

// PLACEHOLDER content for the initial mockup. To publish a real title, fill in
// `author`, `synopsis`, `cover` and `buyUrl`; add more entries to grow the grid.
const RELEASES: Release[] = [
  {
    title: 'The Last Leftist Historian',
    tag: 'Featured release',
    synopsis:
      'Synopsis placeholder: a short description of the book, its story, its themes and why readers will want to open it, goes here.',
  },
];

/** Bookstore showcase: one card per release, reusing the site's `.card` / `.jacket` styling. */
export function FeaturedReleases() {
  return (
    <section className="releases" id="releases">
      <div className="wrap">
        <div className="head-row reveal">
          <div>
            <div className="eyebrow">Featured releases</div>
            <h2 className="serif">
              From our <em>bookstore.</em>
            </h2>
          </div>
          <Link className="viewall" to="/our-work">
            View all titles <span>→</span>
          </Link>
        </div>

        <div className="release-grid">
          {RELEASES.map((book) => (
            <div className="release-slot reveal" key={book.title}>
              <article className="card release">
                <div className="release-cover">
                  {book.cover ? (
                    <img src={book.cover} alt={`Cover of ${book.title}`} loading="lazy" />
                  ) : (
                    <div className="jacket c">
                      <div>
                        <div className="jacket-imprint">Quillstones</div>
                        <div className="jacket-rule"></div>
                      </div>
                      <div className="jacket-title serif">{book.title}</div>
                      {book.author && <div className="jacket-foot">{book.author}</div>}
                    </div>
                  )}
                </div>
                <div className="release-body">
                  {book.tag && <div className="tag">{book.tag}</div>}
                  <h3 className="serif">{book.title}</h3>
                  {book.author && <div className="byline">{book.author}</div>}
                  <p className="blurb release-synopsis">{book.synopsis}</p>
                  {book.buyUrl ? (
                    <a
                      className="pill release-buy"
                      href={book.buyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Buy Now
                    </a>
                  ) : (
                    <a className="pill release-buy is-disabled" aria-disabled="true">
                      Buy Now
                    </a>
                  )}
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
