import { useId, useState } from 'react';
import { Link } from 'react-router-dom';

interface Faq {
  q: string;
  a: string;
}

// REVIEW before relying on these: answers 1 to 4, 7 and 8 describe how Quillstones works with
// authors (rights, timing, quotes, revisions), and the royalty figures in answer 5 are Amazon's
// published terms as of October 2026 (see lib/royalty.ts). Edit any answer to match your actual
// contracts and policies.
const FAQS: Faq[] = [
  {
    q: 'Who owns the copyright to my book?',
    a: 'You do. Self-publishing means you keep ownership of your work and the rights to it. We provide the editing, design, formatting and distribution services, and we don’t take your copyright.',
  },
  {
    q: 'Do I need a literary agent?',
    a: 'No. Agents mainly matter if you want to submit to traditional publishers. When you self-publish you can send your manuscript straight to us, with no agent and no gatekeeper.',
  },
  {
    q: 'How long does it take to publish my book?',
    a: 'It depends on your manuscript’s length, how much editing it needs and how quickly you review each stage. Within a week of your submission we send an honest read, a rough timeline and a quote, so you know what to expect before you commit to anything.',
  },
  {
    q: 'What does it cost, and is there any obligation?',
    a: 'Our packages list exactly what’s included, and every submission gets a quote with no obligation. Editing needs vary from book to book, so we confirm the final scope and price before any work begins.',
  },
  {
    q: 'How much will I earn from each sale?',
    a: 'Retailers set their own royalty rates. Amazon KDP, for example, pays 70% on eBooks priced from $2.99 to $12.99 (after a small delivery fee), and 50% to 60% on paperbacks minus printing costs. Try the royalty calculator above to estimate yours.',
  },
  {
    q: 'Will my book be in bookstores and libraries?',
    a: 'Your book is listed with major online retailers, and through distributors such as IngramSpark it can be offered to bookshops and libraries that order from their catalogues. Bookshops decide for themselves what to stock, so online retail is where we focus your launch.',
  },
  {
    q: 'What if I’m not sure my manuscript is ready?',
    a: 'Send it anyway. We’ll tell you honestly where it stands, including whether more self-editing or beta reading would help first. That’s step one of our process, and it means you don’t pay for services too early.',
  },
  {
    q: 'Can I update my book after it’s published?',
    a: 'Yes. You can upload a corrected or updated file at any time, and retailers generally show the new version within a few days. Tell us if you’d like us to handle revisions for you.',
  },
];

/**
 * Accordion of the questions authors most often worry about. One answer is open
 * at a time; clicking the open one closes it.
 */
export function AuthorFAQ() {
  const uid = useId();
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="faq" id="faq">
      <div className="wrap">
        <div className="section-head centered reveal">
          <div className="eyebrow">Author questions</div>
          <h2>
            Good questions, <em>straight answers.</em>
          </h2>
          <p>What most authors want to know before they hand over a manuscript.</p>
        </div>

        <div className="faq-list reveal">
          {FAQS.map((item, i) => {
            const isOpen = openIndex === i;
            const panelId = `${uid}-panel-${i}`;
            return (
              <div className={'faq-item' + (isOpen ? ' is-open' : '')} key={item.q}>
                <h3 className="faq-question">
                  <button
                    type="button"
                    className="faq-toggle"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  >
                    <span>{item.q}</span>
                    <span className="faq-icon" aria-hidden="true"></span>
                  </button>
                </h3>
                <div className="faq-panel" id={panelId}>
                  <div className="faq-panel-inner">
                    <p className="faq-answer">{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <p className="section-foot reveal">
          Still have a question? <Link to="/contact">Ask us directly →</Link>
        </p>
      </div>
    </section>
  );
}
