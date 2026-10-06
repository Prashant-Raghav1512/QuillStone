import { useEffect, useId, useRef, useState } from 'react';

interface ProcessStep {
  title: string;
  subtitle: string;
  text: string;
}

const STEPS: ProcessStep[] = [
  {
    title: 'Manuscript Prep & Beta Reading',
    subtitle: 'Perfecting the foundation.',
    text: 'Before the financial investment begins, we guide you through self-editing and gathering beta reader feedback to ensure your pacing, plot, and character arcs are structurally sound.',
  },
  {
    title: 'Professional Editing',
    subtitle: 'The most critical investment.',
    text: 'We push your manuscript through three distinct phases: Developmental Editing for big-picture structure, Copy Editing for sentence-level flow, and a final Proofreading polish to catch typos.',
  },
  {
    title: 'Cover Design',
    subtitle: 'Competing with traditional publishers.',
    text: 'Custom, market-researched front cover designs for eBooks, and full wraparound covers (front, spine, back) for print.',
  },
  {
    title: 'Formatting & Typesetting',
    subtitle: 'Pixel-perfect interiors.',
    text: 'Converting your finalized text into flawless EPUB files for e-readers, and precisely typeset print-ready PDFs.',
  },
  {
    title: 'Metadata & ISBN Allocation',
    subtitle: 'Your publishing identity.',
    text: 'Assigning official ISBNs to each format and optimizing your book’s blurb, BISAC categories, and backend keywords.',
  },
  {
    title: 'Global Distribution Setup',
    subtitle: 'Available worldwide.',
    text: 'Seamlessly uploading your book to major retailers like Amazon KDP, plus aggregators like IngramSpark and Draft2Digital.',
  },
  {
    title: 'Pre-Launch & Marketing',
    subtitle: 'Finding your readers.',
    text: 'Building an advance review team to secure day-one ratings, setting up your author web presence, and structuring targeted ad campaigns.',
  },
];

const pad = (n: number) => String(n).padStart(2, '0');

/**
 * Vertical timeline + accordion for the self-publishing journey.
 *
 * - Click a step to open it (one open at a time; click again to close).
 * - A gold rail fills as the reader scrolls and each marker lights up once
 *   the rail passes it, with a "03 / 07" tracker beside it on wide screens.
 *
 * `.reveal` sits on elements whose class never changes, because the shared
 * reveal hook adds `.in` straight to the DOM and a React className update on
 * the same node would wipe it. Stateful classes live on inner elements.
 */
export function PublishingProcess() {
  const uid = useId();
  const listRef = useRef<HTMLOListElement>(null);
  const [openIndex, setOpenIndex] = useState(0);
  // index of the last step the progress rail has passed (-1 = none yet)
  const [reached, setReached] = useState(-1);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    // marker centres in px from the top of the list; offsetTop ignores the
    // reveal transform, so these stay stable while steps fade in
    let centres: number[] = [];
    let frame = 0;

    const measure = () => {
      centres = Array.from(list.children).map((item) => {
        const li = item as HTMLElement;
        const marker = li.querySelector<HTMLElement>('.timeline-marker')!;
        return li.offsetTop + marker.offsetTop + marker.offsetHeight / 2;
      });
      const first = centres[0] ?? 0;
      const last = centres[centres.length - 1] ?? 0;
      list.style.setProperty('--rail-top', `${first}px`);
      list.style.setProperty('--rail-height', `${last - first}px`);
    };

    const update = () => {
      frame = 0;
      const first = centres[0] ?? 0;
      const last = centres[centres.length - 1] ?? 0;
      // the "reading line": a little below the middle of the viewport
      const y = window.innerHeight * 0.55 - list.getBoundingClientRect().top;
      list.style.setProperty('--rail-fill', `${Math.min(last - first, Math.max(0, y - first))}px`);
      let n = -1;
      centres.forEach((c, i) => {
        if (y >= c) n = i;
      });
      setReached(n);
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    // re-measure whenever steps open/close, text re-wraps or fonts finish loading
    const ro = new ResizeObserver(() => {
      measure();
      schedule();
    });
    ro.observe(list);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });

    measure();
    update();

    return () => {
      ro.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      cancelAnimationFrame(frame);
    };
  }, []);

  const current = Math.max(0, reached);

  return (
    <section className="publishing-process" id="process-timeline">
      <div className="wrap publishing-process-grid">
        <div className="section-head publishing-process-intro reveal">
          <div className="eyebrow">The process</div>
          <h2>
            End-to-end <em className="nowrap">self-publishing.</em>
          </h2>
          <p>
            Seven steps from first draft to a book on sale worldwide. Open any step to see exactly
            what we do.
          </p>
          <div className="timeline-tracker" aria-hidden="true">
            <span className="timeline-tracker-num" key={current}>
              {pad(current + 1)}
            </span>
            <span className="timeline-tracker-total">/ {pad(STEPS.length)}</span>
            <span className="timeline-tracker-name">{STEPS[current].title}</span>
          </div>
        </div>

        <ol className="timeline" ref={listRef}>
          {STEPS.map((step, i) => {
            const isOpen = openIndex === i;
            const panelId = `${uid}-panel-${i}`;
            return (
              <li className="timeline-item reveal" key={step.title}>
                <div
                  className={
                    'timeline-marker' +
                    (i <= reached ? ' is-reached' : '') +
                    (i === reached ? ' is-current' : '')
                  }
                  aria-hidden="true"
                >
                  {pad(i + 1)}
                </div>
                <div className={'timeline-card' + (isOpen ? ' is-open' : '')}>
                  <h3 className="timeline-title">
                    <button
                      type="button"
                      className="timeline-toggle"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpenIndex(isOpen ? -1 : i)}
                    >
                      <span className="timeline-heading">
                        <span className="timeline-name serif">{step.title}</span>
                        <span className="timeline-subtitle">{step.subtitle}</span>
                      </span>
                      <span className="timeline-icon" aria-hidden="true"></span>
                    </button>
                  </h3>
                  <div className="timeline-panel" id={panelId}>
                    <div className="timeline-panel-inner">
                      <p className="timeline-text">{step.text}</p>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
