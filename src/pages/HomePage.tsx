import { useEffect } from 'react';

const BASE = import.meta.env.BASE_URL;
const LOGO = `${BASE}logo-mark.png`;
const BG_TOTAL_FRAMES = 145;
const bgFrameSrc = (i: number) =>
  `${BASE}quill-anim/frame_${String(i).padStart(3, '0')}.jpg`;

// The entire page markup, ported verbatim from the supplied design file.
// It's rendered as raw HTML (rather than hand-converted to JSX) so nothing
// about the structure the imperative script below expects — ids, classes,
// data attributes — can drift from the original during conversion.
const BODY_HTML = `
<canvas id="bgframes" aria-hidden="true"></canvas>
<canvas id="dust" aria-hidden="true"></canvas>

<!-- the logo lives here, above the page, and travels -->
<div class="stage" aria-hidden="true">
  <div class="flier" id="flier">
    <div class="flier-in" id="flierIn">
      <div class="aura"></div>
      <div class="ring"></div>
      <div class="ring two"></div>
      <div class="sheen"></div>
      <img id="flierImg" src="${LOGO}" alt="">
    </div>
  </div>
</div>

<nav id="nav">
  <a class="brand" href="#top">
    <img class="nav-mono" src="${LOGO}" alt="Quillstones">
  </a>
  <div class="nav-links">
    <a href="#paths">What we do</a><a href="#work">Our work</a><a href="#process">How it works</a><a href="#contact">Contact</a>
  </div>
  <a href="#contact" class="pill">Get in touch</a>
  <button class="menu-btn" aria-label="Go to contact" onclick="location.hash='#contact'">☰</button>
</nav>

<main>

  <!-- HERO -->
  <header class="hero">
    <div class="wrap">
      <div class="logo-space" id="logoSpace"></div>
      <div class="hero-copy" id="heroCopy">
        <div class="kicker reveal">Publishing House × Media Marketing</div>
        <h1 class="hero-tag reveal">Narratives that <span class="c-teal">endure.</span><br>Brands that <span class="c-coral">lead.</span></h1>
        <p class="hero-sub reveal">A dual-discipline house. We edit and publish literary work, and we build brands with the same editorial discipline — two crafts, held to one standard.</p>
        <div class="hero-cta reveal">
          <a href="#publishing" class="pill teal">I have a manuscript</a>
          <a href="#marketing" class="pill coral">I need brand help</a>
          <a href="#contact" class="plainlink">or just say hello →</a>
        </div>
        <div class="hero-trust reveal"><span class="dot"></span>Working with authors and founders since 2016.</div>
      </div>
    </div>
    <div class="scroll-cue"><span>Scroll</span><span class="bar"></span></div>
  </header>

  <!-- PATHS -->
  <section class="paths" id="paths">
    <div class="wrap">
      <div class="lead reveal">
        <div class="eyebrow">What we do</div>
        <h2>Two doors into <em>one house.</em></h2>
        <p>Tell us which you are, and we'll point you the right way. The craft behind both is the same.</p>
      </div>
      <div class="path-grid">
        <div class="path pub reveal" id="publishing">
          <div class="tagline">The Word — Publishing</div>
          <h3>You have a manuscript.</h3>
          <p>We acquire, edit, design, and publish literary fiction, essays, and epistolary work — with the typographic care a sentence deserves, and honest guidance at every stage.</p>
          <a class="go" href="#contact">Submit a manuscript →</a>
        </div>
        <div class="path mkt reveal" id="marketing">
          <div class="tagline">The Signal — Marketing</div>
          <h3>You're building a brand.</h3>
          <p>Positioning, identity, and voice — then content, channels, and analytics. Strategy before noise, narrative before reach. We start with what you actually need.</p>
          <a class="go" href="#contact">Request a proposal →</a>
        </div>
      </div>
    </div>
  </section>

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

  <!-- PROCESS -->
  <section class="process" id="process">
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

  <!-- SHELF -->
  <section class="shelf-sec" id="work">
    <div class="wrap">
      <div class="head-row reveal">
        <div><div class="eyebrow">From the shelf</div><h2 class="serif">Recently <em>published.</em></h2></div>
        <a class="viewall" href="#">View all titles <span>→</span></a>
      </div>
      <div class="shelf">
        <a class="card featured reveal" href="#">
          <div class="jacket a"><div><div class="jacket-imprint">Quillstones</div><div class="jacket-rule"></div></div><div class="jacket-title serif">The Weight of Quiet Hours</div><div class="jacket-foot">Amara Osei</div></div>
          <div class="meta">
            <div class="tag">Literary fiction · Lead title</div>
            <h3 class="serif">The Weight of Quiet Hours</h3>
            <div class="byline">Amara Osei</div>
            <p class="blurb">A slow-burning novel of memory and inheritance, told across three generations of a family that never learned to say what it meant.</p>
            <span class="excerpt">Read an excerpt →</span>
          </div>
        </a>
        <div class="stack">
          <a class="card compact reveal" href="#">
            <div class="jacket b"><div><div class="jacket-imprint">Quillstones</div><div class="jacket-rule"></div></div><div class="jacket-title serif">Salt &amp; Cedar</div></div>
            <div class="compact-body"><div class="tag">Essays</div><h3 class="serif">Salt &amp; Cedar</h3><div class="byline">Noor El-Amin</div><span class="excerpt">Read an excerpt →</span></div>
          </a>
          <a class="card compact reveal" href="#">
            <div class="jacket c"><div><div class="jacket-imprint">Quillstones</div><div class="jacket-rule"></div></div><div class="jacket-title serif">The Cartographer's Silence</div></div>
            <div class="compact-body"><div class="tag">Novel</div><h3 class="serif">The Cartographer's Silence</h3><div class="byline">Elena Vasquez</div><span class="excerpt">Read an excerpt →</span></div>
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- PROOF -->
  <section class="proof">
    <div class="wrap">
      <div class="eyebrow reveal">In their words</div>
      <div class="quotes">
        <div class="qcard reveal"><p>"They edited my novel like it was theirs — and marketed it like it was ours. Rare to find both under one roof."</p><div class="who"><b>Amara Osei</b> — author, <em>The Weight of Quiet Hours</em></div></div>
        <div class="qcard reveal"><p>"We came for a logo and left with a voice. Six months on, our launch is still the thing people quote back to us."</p><div class="who"><b>Devi Rao</b> — founder, Meridian Coffee</div></div>
      </div>
      <div class="logos reveal"><span>Meridian</span><span>North &amp; Vale</span><span>Studio Ora</span><span>Halcyon Press</span><span>Field Notes Co.</span></div>
    </div>
  </section>

  <!-- CONTACT -->
  <section class="contact" id="contact">
    <div class="wrap">
      <div class="contact-grid">
        <div class="reveal">
          <div class="eyebrow">Get in touch</div>
          <h2>Start a <em>conversation.</em></h2>
          <p class="intro">Whether it's a manuscript, a brand, or a half-formed idea — tell us what you're working on. A real person reads every message.</p>
          <p class="direct">Prefer email? <a href="mailto:hello@quillstones.com">hello@quillstones.com</a></p>
        </div>
        <form class="reveal" id="contactForm" novalidate>
          <div class="row">
            <div><label for="name">Your name</label><input id="name" name="name" type="text" placeholder="Jane Doe"></div>
            <div><label for="email">Email</label><input id="email" name="email" type="email" placeholder="jane@email.com"></div>
          </div>
          <div><label for="topic">I'm reaching out about</label>
            <select id="topic" name="topic"><option>Publishing a manuscript</option><option>Brand &amp; marketing work</option><option>Both / not sure yet</option><option>Something else</option></select>
          </div>
          <div><label for="msg">Your message</label><textarea id="msg" name="msg" placeholder="Tell us a little about your project…"></textarea></div>
          <button class="submit" type="submit">Send message</button>
          <p class="formnote" id="formnote" role="status"></p>
        </form>
      </div>
    </div>
  </section>

</main>

<footer>
  <div class="wrap">
    <div class="foot-top">
      <div class="foot-brand">
        <img class="foot-logo" data-dust-anchor src="${LOGO}" alt="Quillstones">
        <p>A dual-discipline house. Narratives that endure. Brands that lead.</p>
        <a class="email" href="mailto:hello@quillstones.com">hello@quillstones.com</a>
      </div>
      <div class="foot-links">
        <a href="#top">Home</a><a href="#paths">What we do</a><a href="#work">Our work</a><a href="#process">How it works</a><a href="#contact">Contact</a>
      </div>
    </div>
    <div class="foot-bottom"><p>© 2026 Quillstones. All rights reserved.</p><p class="set">Set in Playfair Display &amp; Inter.</p></div>
  </div>
</footer>
`;

/**
 * Single-page Quillstones site. The markup above is static HTML (see
 * BODY_HTML); this effect ports the page's vanilla-JS behaviour — the
 * scroll-linked travelling logo, the canvas dust field, nav/scroll
 * reveals, counters, and the contact form — onto that markup once it's
 * in the DOM.
 */
export function HomePage() {
  useEffect(() => {
    const cleanups: Array<() => void> = [];
    const on = (
      target: EventTarget,
      type: string,
      handler: EventListenerOrEventListenerObject,
      opts?: AddEventListenerOptions,
    ) => {
      target.addEventListener(type, handler, opts);
      cleanups.push(() => target.removeEventListener(type, handler, opts));
    };

    /* ============================================================
       TUNING — everything you'd want to change lives here
       ============================================================ */
    const CFG = {
      heroWidth: 440,
      markWidth: 880,
      markOpacity: 0.075,
      markBlur: 1.1,
      markDrift: 38,
      markSpin: 1.8,
      markBreathe: 0.035,
      markPulse: 0.28,
      handoff: 0.62,
      dust: 340,
      dustMobile: 140,
      gather: 0.66,
      orbitMin: 0.42,
      orbitMax: 1.35,
      scrollPush: 0.6,
      streak: 1.0,
      repel: 120,
    };

    let disposed = false;

    /* ---------- 0. the scroll-scrubbed frame background ---------- */
    (function () {
      const cv = document.getElementById('bgframes') as HTMLCanvasElement | null;
      const ctx = cv?.getContext('2d');
      if (!cv || !ctx) return;
      const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

      const images: (HTMLImageElement | null)[] = new Array(BG_TOTAL_FRAMES + 1).fill(null);
      const loaded: boolean[] = new Array(BG_TOTAL_FRAMES + 1).fill(false);
      const loadFrame = (i: number) => {
        if (images[i]) return;
        const img = new Image();
        img.decoding = 'async';
        img.src = bgFrameSrc(i);
        img.onload = () => {
          loaded[i] = true;
        };
        images[i] = img;
      };
      // Load the first screenful now; stream the rest in during idle time so
      // 145 requests don't all land on the main thread/network at once.
      for (let i = 1; i <= Math.min(12, BG_TOTAL_FRAMES); i++) loadFrame(i);
      let streamNext = 13;
      const idle: (cb: () => void) => number =
        (window as unknown as { requestIdleCallback?: typeof requestIdleCallback }).requestIdleCallback ||
        ((cb: () => void) => window.setTimeout(cb, 120));
      const streamRest = () => {
        if (disposed || streamNext > BG_TOTAL_FRAMES) return;
        const end = Math.min(streamNext + 4, BG_TOTAL_FRAMES);
        for (let i = streamNext; i <= end; i++) loadFrame(i);
        streamNext = end + 1;
        idle(streamRest);
      };
      idle(streamRest);

      const nearestLoadedFrame = (target: number) => {
        const t = Math.round(target);
        for (let d = 0; d <= BG_TOTAL_FRAMES; d++) {
          const lo = t - d;
          const hi = t + d;
          if (lo >= 1 && loaded[lo]) return lo;
          if (hi <= BG_TOTAL_FRAMES && loaded[hi]) return hi;
        }
        return null;
      };

      let width = innerWidth;
      let height = innerHeight;

      /* the source frames are 848x480 on black; letterbox them into a
         buffer at their native aspect, then feather the edges with a
         radial mask so the rectangle blends into the page. */
      const AR = 480 / 848;
      const bufW = 640;
      const bufH = Math.round(bufW * AR);
      const buffer = document.createElement('canvas');
      buffer.width = bufW;
      buffer.height = bufH;
      const bctx = buffer.getContext('2d')!;

      const mask = document.createElement('canvas');
      mask.width = bufW;
      mask.height = bufH;
      const mctx = mask.getContext('2d')!;
      const g = mctx.createRadialGradient(bufW / 2, bufH / 2, bufH * 0.16, bufW / 2, bufH / 2, bufH * 0.62);
      g.addColorStop(0, 'rgba(0,0,0,1)');
      g.addColorStop(1, 'rgba(0,0,0,0)');
      mctx.fillStyle = g;
      mctx.fillRect(0, 0, bufW, bufH);

      const resize = () => {
        width = innerWidth;
        height = innerHeight;
        // this layer is soft-edged and low-alpha, so full retina density
        // buys nothing visible — cap it to keep the pixel count down.
        const dpr = Math.min(devicePixelRatio || 1, 1.5);
        cv!.width = width * dpr;
        cv!.height = height * dpr;
        cv!.style.width = width + 'px';
        cv!.style.height = height + 'px';
        ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      };
      resize();
      let rrt: number;
      const onResize = () => {
        clearTimeout(rrt);
        rrt = window.setTimeout(resize, 150);
      };
      on(window, 'resize', onResize, { passive: true });

      const getMaxScroll = () =>
        Math.max(1, document.documentElement.scrollHeight - innerHeight);
      let maxScroll = getMaxScroll();
      const ro = new ResizeObserver(() => {
        maxScroll = getMaxScroll();
      });
      ro.observe(document.documentElement);
      cleanups.push(() => ro.disconnect());

      let targetFrame = 1;
      const onScroll = () => {
        const progress = Math.min(1, Math.max(0, scrollY / maxScroll));
        targetFrame = 1 + progress * (BG_TOTAL_FRAMES - 1);
      };
      on(window, 'scroll', onScroll, { passive: true });
      onScroll();

      const drawFrame = (frameIndex: number) => {
        const img = images[frameIndex];
        if (!img) return;
        ctx!.clearRect(0, 0, width, height);

        bctx.clearRect(0, 0, bufW, bufH);
        const scale = Math.min(bufW / img.naturalWidth, bufH / img.naturalHeight);
        const dw = img.naturalWidth * scale;
        const dh = img.naturalHeight * scale;
        bctx.drawImage(img, (bufW - dw) / 2, (bufH - dh) / 2, dw, dh);
        bctx.globalCompositeOperation = 'destination-in';
        bctx.drawImage(mask, 0, 0);
        bctx.globalCompositeOperation = 'source-over';

        const w = Math.min(1100, Math.max(480, width * 0.78));
        const h = w * AR;
        ctx!.globalAlpha = 0.42;
        ctx!.drawImage(buffer, (width - w) / 2, (height - h) / 2, w, h);
        ctx!.globalAlpha = 1;
      };

      if (reduce) {
        const img = images[BG_TOTAL_FRAMES]!;
        const draw = () => drawFrame(BG_TOTAL_FRAMES);
        if (img.complete) draw();
        else on(img, 'load', draw, { once: true } as AddEventListenerOptions);
        return;
      }

      let raf = 0;
      let running = true;
      let currentFrame = 1;
      let lastDrawn = -1;

      const tick = () => {
        if (!running) return;
        currentFrame += (targetFrame - currentFrame) * 0.09;
        if (Math.abs(currentFrame - targetFrame) < 0.05) currentFrame = targetFrame;

        const frameToShow = nearestLoadedFrame(currentFrame);
        if (frameToShow !== null && frameToShow !== lastDrawn) {
          drawFrame(frameToShow);
          lastDrawn = frameToShow;
        }
        raf = requestAnimationFrame(tick);
      };

      const onVisibility = () => {
        if (document.visibilityState === 'hidden') {
          running = false;
          cancelAnimationFrame(raf);
        } else if (!running) {
          running = true;
          raf = requestAnimationFrame(tick);
        }
      };
      on(document, 'visibilitychange', onVisibility);

      raf = requestAnimationFrame(tick);
      cleanups.push(() => cancelAnimationFrame(raf));
    })();

    /* ---------- 1. the travelling logo ---------- */
    const Logo = (function () {
      const flier = document.getElementById('flier') as HTMLElement | null;
      const inner = document.getElementById('flierIn') as HTMLElement | null;
      const img = document.getElementById('flierImg') as HTMLImageElement | null;
      const space = document.getElementById('logoSpace') as HTMLElement | null;
      const hero = document.querySelector<HTMLElement>('.hero');
      let state = { x: 0, y: 0, w: 0 };
      if (!flier || !inner || !img || !space || !hero) {
        return { get: () => state };
      }

      const aura = inner.querySelector<HTMLElement>('.aura')!;
      const rings = inner.querySelectorAll<HTMLElement>('.ring');
      const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

      // the lockup's height ÷ width; refined once the real image reports its size
      let AR = 1;
      let base = CFG.heroWidth;
      state = { x: 0, y: 0, w: base };
      let mx = 0, my = 0, tmx = 0, tmy = 0;
      let raf = 0;

      function layout() {
        base = Math.min(CFG.heroWidth, innerWidth * 0.62);
        inner!.style.width = base + 'px';
        inner!.style.height = base * AR + 'px';
        space!.style.height = base * AR + 'px';
      }

      const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
      const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

      function frame() {
        if (disposed) return;
        const y = scrollY;
        const heroH = hero!.offsetHeight || innerHeight;

        /* 0 = full lockup in the hero, 1 = faint watermark behind the page */
        let t = Math.min(1, Math.max(0, y / (heroH * CFG.handoff)));
        t = ease(t);

        /* where it starts: the reserved slot in the hero */
        const r = space!.getBoundingClientRect();
        const hx = r.left + r.width / 2;
        const hy = r.top + r.height / 2;

        /* where it ends up: adrift in the middle of the viewport, never quite still */
        const now = performance.now();
        const markW = Math.min(CFG.markWidth, innerWidth * 0.96);
        const D = reduce ? 0 : CFG.markDrift;
        const wx =
          innerWidth / 2 +
          Math.sin(now * 0.000073) * D +
          Math.sin(now * 0.000041 + 1.7) * D * 0.45;
        const wy =
          innerHeight / 2 +
          Math.cos(now * 0.000056) * D * 0.72 +
          Math.sin(y * 0.0006) * 18;

        let cx = lerp(hx, wx, t);
        let cy = lerp(hy, wy, t);
        let w = lerp(base, markW, t);

        /* a little parallax while it's still the hero */
        if (!reduce) {
          mx += (tmx - mx) * 0.06;
          my += (tmy - my) * 0.06;
          const k = (1 - t) * (1 - t);
          cx += mx * 14 * k;
          cy += my * 10 * k;
        }

        /* tilt and breath — only once it's a watermark, so the hero stays composed */
        const spin = reduce ? 0 : Math.sin(now * 0.000061) * CFG.markSpin * t;
        const swell = reduce ? 1 : 1 + Math.sin(now * 0.00011 + 0.9) * CFG.markBreathe * t;

        const s = (w / base) * swell;
        flier!.style.transform =
          'translate3d(' + (cx - base / 2) + 'px,' + (cy - (base * AR) / 2) + 'px,0)' +
          ' rotate(' + spin.toFixed(3) + 'deg)' +
          ' scale(' + s.toFixed(4) + ')';

        let op = lerp(1, CFG.markOpacity, t);
        if (!reduce) op *= 1 + Math.sin(now * 0.000094 + 2.2) * CFG.markPulse * t;
        inner!.style.opacity = op.toFixed(3);
        inner!.style.filter =
          t > 0.02
            ? 'blur(' + (CFG.markBlur * t).toFixed(2) + 'px)'
            : 'drop-shadow(0 0 34px rgba(203,176,120,.28))';

        /* the halo belongs to the hero, not the watermark */
        const fade = Math.max(0, 1 - t * 1.6);
        aura.style.opacity = (0.35 + fade * 0.65).toFixed(3);
        rings.forEach((el) => (el.style.opacity = fade.toFixed(3)));

        state = { x: cx, y: cy, w: w };
        raf = requestAnimationFrame(frame);
      }

      const onPointerMove = (e: PointerEvent) => {
        tmx = (e.clientX / innerWidth - 0.5) * 2;
        tmy = (e.clientY / innerHeight - 0.5) * 2;
      };
      on(window, 'pointermove', onPointerMove as EventListener, { passive: true });

      let rt: number;
      const onResize = () => {
        clearTimeout(rt);
        rt = window.setTimeout(layout, 140);
      };
      on(window, 'resize', onResize, { passive: true });

      const applyAR = () => {
        if (img!.naturalWidth && img!.naturalHeight) {
          AR = img!.naturalHeight / img!.naturalWidth;
        }
      };

      layout();
      if (img.complete) {
        applyAR();
        layout();
        raf = requestAnimationFrame(frame);
      } else {
        const onLoad = () => {
          applyAR();
          layout();
          raf = requestAnimationFrame(frame);
        };
        on(img, 'load', onLoad, { once: true } as AddEventListenerOptions);
      }

      cleanups.push(() => cancelAnimationFrame(raf));

      return { get: () => state };
    })();

    /* ---------- 2. the dust ---------- */
    (function () {
      const cv = document.getElementById('dust') as HTMLCanvasElement | null;
      const ctx = cv?.getContext('2d');
      if (!cv || !ctx) return;
      const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
      let W = 0,
        H = 0;
      let P: Array<{
        x: number; y: number; z: number; a: number; rr: number; sp: number; ph: number; w: number; hot: boolean;
      }> = [];
      let lastY = scrollY,
        vel = 0;
      const mouse = { x: -9e9, y: -9e9 };
      let raf = 0;

      function resize() {
        // hundreds of tiny particles redraw every frame forever, not just
        // while scrolling, so this canvas's pixel count matters a lot more
        // than a one-shot layer's; cap it below full retina density.
        const DPR = Math.min(devicePixelRatio || 1, 1.5);
        W = innerWidth;
        H = innerHeight;
        cv!.width = W * DPR;
        cv!.height = H * DPR;
        ctx!.setTransform(DPR, 0, 0, DPR, 0, 0);
      }
      function build() {
        const n = innerWidth < 780 ? CFG.dustMobile : CFG.dust;
        P = [];
        for (let i = 0; i < n; i++)
          P.push({
            x: Math.random() * W,
            y: Math.random() * H,
            z: 0.3 + Math.random() * 0.7,
            a: Math.random() * Math.PI * 2,
            rr: CFG.orbitMin + Math.random() * (CFG.orbitMax - CFG.orbitMin),
            sp: (Math.random() < 0.5 ? -1 : 1) * (0.5 + Math.random() * 1.1),
            ph: Math.random() * Math.PI * 2,
            w: 0.2 + Math.random() * 0.8,
            hot: Math.random() < 0.09,
          });
      }

      /* the flier is the primary attractor; the monogram takes over when it's centred.
         The candidate elements are static once mounted, so the query runs once
         here rather than on every animation frame. */
      const anchorEls = Array.from(document.querySelectorAll<HTMLElement>('[data-dust-anchor]'));
      function anchor() {
        const L = Logo.get();
        let best = { x: L.x, y: L.y, w: Math.min(L.w, 430), pull: 1 };
        let bestP = 0;
        anchorEls.forEach((m) => {
          const r = m.getBoundingClientRect();
          if (r.bottom <= 0 || r.top >= H) return;
          const cy = r.top + r.height / 2;
          const p = Math.max(0, 1 - Math.abs(cy - H * 0.5) / (H * 0.55));
          if (p > 0.25 && p > bestP) {
            bestP = p;
            best = { x: r.left + r.width / 2, y: cy, w: r.width * 2.1, pull: p };
          }
        });
        return best;
      }

      const t0 = performance.now();
      function frame(now: number) {
        if (disposed) return;
        const t = now - t0,
          y = scrollY;
        let d = y - lastY;
        lastY = y;
        if (Math.abs(d) > 220) d = 0;
        vel += (d - vel) * 0.22;

        ctx!.clearRect(0, 0, W, H);
        const A = reduce ? null : anchor();
        const streak = Math.min(Math.abs(vel) * CFG.streak, 30);
        ctx!.globalCompositeOperation = 'lighter';

        for (const p of P) {
          p.y -= vel * CFG.scrollPush * p.z;
          p.x += Math.sin(t * 0.00013 + p.ph) * 0.18 * p.z;
          p.y += Math.cos(t * 0.0001 + p.ph * 1.4) * 0.12 * p.z;
          if (p.y < -70) p.y = H + 70;
          else if (p.y > H + 70) p.y = -70;
          if (p.x < -70) p.x = W + 70;
          else if (p.x > W + 70) p.x = -70;

          let x = p.x,
            yy = p.y;

          if (A && A.pull > 0.02) {
            p.a += 0.0022 * p.sp;
            const R = A.w * p.rr;
            const ox = A.x + Math.cos(p.a) * R;
            const oy = A.y + Math.sin(p.a) * R * 0.72;
            const k = CFG.gather * A.pull * p.w;
            x = p.x + (ox - p.x) * k;
            yy = p.y + (oy - p.y) * k;
          }

          const dx = x - mouse.x,
            dy = yy - mouse.y,
            d2 = dx * dx + dy * dy,
            R = CFG.repel;
          if (d2 < R * R) {
            const dd = Math.sqrt(d2) || 0.001,
              f = 1 - dd / R;
            x += (dx / dd) * f * f * 26;
            yy += (dy / dd) * f * f * 26;
          }

          const alpha = (0.14 + p.z * 0.5) * (p.hot ? 1.5 : 1);
          const size = 1.4 * p.z * (p.hot ? 1.7 : 1);
          if (streak > 1.3) {
            // A thin filled rect reads identically to a capped line at this
            // size but skips path construction + stroking, which is what
            // made fast scrolling (streak active on ~every particle) heavy.
            const len = vel > 0 ? -streak * p.z : streak * p.z;
            ctx!.fillStyle = 'rgba(203,176,120,' + (alpha * 0.8).toFixed(3) + ')';
            ctx!.fillRect(x - size / 2, len < 0 ? yy + len : yy, size, Math.abs(len));
          } else {
            ctx!.fillStyle = p.hot
              ? 'rgba(240,224,189,' + alpha.toFixed(3) + ')'
              : 'rgba(224,203,158,' + alpha.toFixed(3) + ')';
            ctx!.fillRect(x - size / 2, yy - size / 2, size, size);
          }
        }
        ctx!.globalCompositeOperation = 'source-over';
        raf = requestAnimationFrame(frame);
      }

      const onMove = (e: PointerEvent) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
      };
      const onLeave = () => {
        mouse.x = mouse.y = -9e9;
      };
      on(window, 'pointermove', onMove as EventListener, { passive: true });
      on(window, 'pointerleave', onLeave);

      let rt: number;
      const onResize = () => {
        clearTimeout(rt);
        rt = window.setTimeout(() => {
          resize();
          build();
        }, 160);
      };
      on(window, 'resize', onResize, { passive: true });

      resize();
      build();
      raf = requestAnimationFrame(frame);
      cleanups.push(() => cancelAnimationFrame(raf));
    })();

    /* ---------- 3. nav, reveals, counters, form ---------- */
    (function () {
      const nav = document.getElementById('nav');
      if (!nav) return;
      const onScroll = () => nav.classList.toggle('scrolled', scrollY > 40);
      onScroll();
      on(window, 'scroll', onScroll, { passive: true });

      const io = new IntersectionObserver(
        (es) => {
          es.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add('in');
              io.unobserve(e.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
      );
      document.querySelectorAll<HTMLElement>('.reveal').forEach((el, i) => {
        el.style.transitionDelay = Math.min((i % 4) * 0.06, 0.24) + 's';
        io.observe(el);
      });
      cleanups.push(() => io.disconnect());

      const co = new IntersectionObserver(
        (es) => {
          es.forEach((e) => {
            if (!e.isIntersecting) return;
            const el = e.target as HTMLElement;
            const end = +(el.dataset.count || 0);
            const suf = el.dataset.suffix || '';
            const start = performance.now();
            (function tick(now: number) {
              const k = Math.min(1, (now - start) / 1100);
              const v = Math.round(end * (1 - Math.pow(1 - k, 3)));
              el.textContent = v + suf;
              if (k < 1) requestAnimationFrame(tick);
            })(start);
            co.unobserve(el);
          });
        },
        { threshold: 0.6 },
      );
      document.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => co.observe(el));
      cleanups.push(() => co.disconnect());

      const form = document.getElementById('contactForm') as HTMLFormElement | null;
      const note = document.getElementById('formnote');
      if (!form || !note) return;

      const onSubmit = async (e: Event) => {
        e.preventDefault();
        const els = form.elements as typeof form.elements & {
          name: HTMLInputElement;
          email: HTMLInputElement;
          topic: HTMLSelectElement;
          msg: HTMLTextAreaElement;
        };
        const name = els.name.value.trim();
        const email = els.email.value.trim();
        const topic = els.topic.value;
        const message = els.msg.value.trim();

        if (!name || !email || !message) {
          note.textContent = 'Add your name, email and a message so we can reply.';
          return;
        }

        const submitBtn = form.querySelector<HTMLButtonElement>('.submit');
        if (submitBtn) submitBtn.disabled = true;
        note.textContent = 'Sending…';

        try {
          const res = await fetch('/api/queries', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, interest: topic, message }),
          });
          if (!res.ok) throw new Error('request failed');
          note.textContent = 'Thank you — the house will read your note and reply soon.';
          form.reset();
        } catch {
          // No API to reach (e.g. the static production build) — fall back
          // to opening the visitor's email client, same as a plain mailto link.
          note.textContent = 'Opening your email app…';
          const s = encodeURIComponent('New enquiry — ' + topic);
          const b = encodeURIComponent(
            'Name: ' + name + '\nEmail: ' + email + '\nTopic: ' + topic + '\n\n' + message,
          );
          location.href = 'mailto:hello@quillstones.com?subject=' + s + '&body=' + b;
        } finally {
          if (submitBtn) submitBtn.disabled = false;
        }
      };
      on(form, 'submit', onSubmit);
    })();

    return () => {
      disposed = true;
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: BODY_HTML }} />;
}
