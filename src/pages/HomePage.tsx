import { useEffect, type MouseEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { LOGO } from '@/lib/assets';
import { useRevealAndCounters } from '@/lib/useRevealAndCounters';
import { PublishingProcess } from '@/components/PublishingProcess';
import { PublishingPackages } from '@/components/PublishingPackages';
import { FeaturedReleases } from '@/components/FeaturedReleases';

const HERO_HTML = `
<!-- HERO -->
<header class="hero">
  <div class="wrap">
    <div class="logo-space" id="logoSpace"></div>
    <div class="hero-copy" id="heroCopy">
      <div class="kicker reveal">Self-Publishing for Authors</div>
      <h1 class="hero-tag reveal">Your story, <span class="c-teal">published.</span><br>Your book, <span class="c-coral">worldwide.</span></h1>
      <p class="hero-sub reveal">From editing and cover design to ISBNs and distribution on Amazon KDP, IngramSpark and Draft2Digital, we take your manuscript to readers around the world.</p>
      <div class="hero-cta reveal">
        <a href="#/contact" class="pill teal">Submit Manuscript</a>
        <a href="#/?scroll=packages" data-scroll-to="packages" class="pill ghost">View Publishing Packages</a>
        <a href="#/contact" class="plainlink">or just say hello →</a>
      </div>
      <div class="hero-trust reveal"><span class="dot"></span>Working with authors and founders since 2016.</div>
    </div>
  </div>
  <div class="scroll-cue"><span>Scroll</span><span class="bar"></span></div>
</header>
`;

const REST_HTML = `
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

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) requestAnimationFrame(() => el.scrollIntoView({ block: 'start' }));
}

export function HomePage() {
  useRevealAndCounters();
  const [params] = useSearchParams();

  // deep links like `#/?scroll=packages`
  useEffect(() => {
    const target = params.get('scroll');
    if (target) scrollToSection(target);
  }, [params]);

  // hero buttons that point at a section on this page scroll there directly,
  // so they keep working when clicked a second time (the URL wouldn't change)
  const onHeroClick = (e: MouseEvent<HTMLDivElement>) => {
    const link = (e.target as HTMLElement).closest<HTMLElement>('[data-scroll-to]');
    if (!link) return;
    e.preventDefault();
    scrollToSection(link.dataset.scrollTo!);
  };

  return (
    <>
      <div onClick={onHeroClick} dangerouslySetInnerHTML={{ __html: HERO_HTML }} />
      <PublishingProcess />
      <PublishingPackages />
      <FeaturedReleases />
      <div dangerouslySetInnerHTML={{ __html: REST_HTML }} />
    </>
  );
}
