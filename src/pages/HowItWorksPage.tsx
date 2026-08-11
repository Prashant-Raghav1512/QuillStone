import { useRevealAndCounters } from '@/lib/useRevealAndCounters';

const BODY_HTML = `
<section class="process page-head" id="process">
  <div class="wrap">
    <div class="eyebrow reveal">How it works</div>
    <h2 class="reveal">Clear steps, <em>no mystery.</em></h2>
    <div class="steps">
      <div class="step reveal"><div class="n serif">01</div><h4>Send it over</h4><p>Share your manuscript or your brand brief through the form. We read everything ourselves — no gatekeepers, no auto-replies.</p></div>
      <div class="step reveal"><div class="n serif">02</div><h4>We respond with a plan</h4><p>Within a week you get an honest read: whether we're a fit, what we'd do, a rough timeline, and what it costs. No obligation.</p></div>
      <div class="step reveal"><div class="n serif">03</div><h4>We do the work</h4><p>If we go ahead, you get one team and one standard from first draft to final launch — and a point of contact who actually answers.</p></div>
    </div>
  </div>
</section>
`;

export function HowItWorksPage() {
  useRevealAndCounters();
  return <div dangerouslySetInnerHTML={{ __html: BODY_HTML }} />;
}
