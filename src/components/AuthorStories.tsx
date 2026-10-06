interface Story {
  quote: string;
  author: string;
  /** title of the author's book, shown in italics after their name */
  book?: string;
}

// Add real author quotes here, with the author's permission. Until there is at
// least one entry the whole section stays hidden, so the page never shows
// invented testimonials.
const STORIES: Story[] = [];

/** Author testimonials, reusing the site's existing quote-card styling. */
export function AuthorStories() {
  if (STORIES.length === 0) return null;

  return (
    <section className="proof" id="stories">
      <div className="wrap">
        <div className="eyebrow reveal">Author stories</div>
        <div className="quotes">
          {STORIES.map((story) => (
            <div className="qcard reveal" key={story.author + story.quote}>
              <p>“{story.quote}”</p>
              <div className="who">
                <b>{story.author}</b>
                {story.book && (
                  <>
                    {' '}
                    — author, <em>{story.book}</em>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
