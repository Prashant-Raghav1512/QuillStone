import type { CSSProperties } from 'react';
import { STATS } from '@/data/stats';

/**
 * "By the numbers", from data/stats.ts. The numbers count up via the shared
 * reveal hook (`data-count`). Renders nothing until there is a real entry.
 */
export function Stats() {
  if (STATS.length === 0) return null;
  const cols = { '--cols': Math.min(STATS.length, 4) } as CSSProperties;

  return (
    <section className="stats">
      <div className="wrap">
        <div className="stats-head reveal">
          <span className="eyebrow">By the numbers</span>
        </div>
        <div className="stat-row" style={cols}>
          {STATS.map((s) => (
            <div className="stat reveal" key={s.label}>
              <div className="num serif" data-count={s.value} data-suffix={s.suffix ?? ''}>
                {s.value}
                {s.suffix}
              </div>
              <div className="lbl">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
