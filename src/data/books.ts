export interface Book {
  title: string;
  author: string;
  /** small label above the title, e.g. 'Literary fiction' or 'New release' */
  tag?: string;
  synopsis: string;
  /** cover image URL, e.g. `${BASE}books/cover.jpg` for a file in public/books/. Typographic jacket when omitted. */
  cover?: string;
  /** retailer link for the Buy Now button. The button shows as inactive when omitted. */
  buyUrl?: string;
  /** also show it in "Featured releases" on the home page */
  featured?: boolean;
}

// TODO(real data): add books Quillstones has actually published, with their
// real synopsis, cover and buy link (for example The Last Leftist Historian,
// once those are final). Our work lists every entry; home shows the ones
// marked `featured`. Both sections stay hidden while this list is empty.
export const BOOKS: Book[] = [];
