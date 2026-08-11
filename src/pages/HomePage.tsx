import { LOGO } from '@/lib/assets';
import { useRevealAndCounters } from '@/lib/useRevealAndCounters';

const BODY_HTML = `
<!-- HERO -->
<header class="hero">
  <div class="wrap">
    <div class="logo-space" id="logoSpace"></div>
    <div class="hero-copy" id="heroCopy">
      <div class="kicker reveal">Publishing House × Media Marketing</div>
      <h1 class="hero-tag reveal">Narratives that <span class="c-teal">endure.</span><br>Brands that <span class="c-coral">lead.</span></h1>
      <p class="hero-sub reveal">A dual-discipline house. We edit and publish literary work, and we build brands with the same editorial discipline — two crafts, held to one standard.</p>
      <div class="hero-cta reveal">
        <a href="#/what-we-do?scroll=publishing" class="pill teal">I have a manuscript</a>
        <a href="#/what-we-do?scroll=marketing" class="pill coral">I need brand help</a>
        <a href="#/contact" class="plainlink">or just say hello →</a>
      </div>
      <div class="hero-trust reveal"><span class="dot"></span>Working with authors and founders since 2016.</div>
    </div>
  </div>
  <div class="scroll-cue"><span>Scroll</span><span class="bar"></span></div>
</header>

<!-- MONOGRAM INTERLUDE -->
<section class="interlude">
  <div class="wrap reveal">
    <img class="mono" data-dust-anchor src="${LOGO}" alt="">
    <blockquote>A quill for the <span>word.</span> A stone for the <span>weight</span> it carries.</blockquote>
    <div class="attrib">The mark, explained</div>
  </div>
</section>

<!-- STATS -->
<section class="stats">
  <div class="wrap">
    <div class="stats-head reveal"><span class="eyebrow">By the numbers</span><p>A decade of building things meant to last.</p></div>
    <div class="stat-row">
      <div class="stat reveal"><div class="num serif" data-count="40" data-suffix="+">40+</div><div class="lbl">Titles in print</div></div>
      <div class="stat reveal"><div class="num serif" data-count="17">17</div><div class="lbl">Languages licensed</div></div>
      <div class="stat reveal"><div class="num serif" data-count="60" data-suffix="+">60+</div><div class="lbl">Campaigns delivered</div></div>
      <div class="stat reveal"><div class="num serif" data-count="12">12</div><div class="lbl">Design awards</div></div>
    </div>
  </div>
</section>
`;

export function HomePage() {
  useRevealAndCounters();
  return <div dangerouslySetInnerHTML={{ __html: BODY_HTML }} />;
}
