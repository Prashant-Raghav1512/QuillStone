export interface Stat {
  /** the number the counter animates up to */
  value: number;
  /** shown after the number, e.g. '+' */
  suffix?: string;
  label: string;
}

// TODO(real data): add verified figures only, e.g.
//   { value: 25, suffix: '+', label: 'Books published' },
// The "By the numbers" section on the home page stays hidden while this list
// is empty. One to four entries fit the row.
export const STATS: Stat[] = [];
