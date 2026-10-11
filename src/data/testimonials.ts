export interface Testimonial {
  quote: string;
  name: string;
  /** e.g. 'author', 'educator' */
  role?: string;
  /** the book or project they worked on with us, shown in italics */
  work?: string;
}

// Intentionally empty for now: Quillstones is new and has no testimonials yet.
// Later, add real quotes only, with each person's written permission, e.g.
//   { quote: '…', name: 'Full Name', role: 'author', work: 'Book Title' },
// The "Author stories" section (home page and Our work page) stays hidden
// while this list is empty, so the site never shows invented testimonials.
export const TESTIMONIALS: Testimonial[] = [];
