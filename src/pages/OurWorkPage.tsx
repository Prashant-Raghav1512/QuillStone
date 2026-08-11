import { useRevealAndCounters } from '@/lib/useRevealAndCounters';

const BODY_HTML = `
<!-- SHELF -->
<section class="shelf-sec page-head" id="work">
  <div class="wrap">
    <div class="head-row reveal">
      <div><div class="eyebrow">From the shelf</div><h2 class="serif">Recently <em>published.</em></h2></div>
      <a class="viewall" href="#/our-work">View all titles <span>→</span></a>
    </div>
    <div class="shelf">
      <a class="card featured reveal" href="#/our-work">
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
        <a class="card compact reveal" href="#/our-work">
          <div class="jacket b"><div><div class="jacket-imprint">Quillstones</div><div class="jacket-rule"></div></div><div class="jacket-title serif">Salt &amp; Cedar</div></div>
          <div class="compact-body"><div class="tag">Essays</div><h3 class="serif">Salt &amp; Cedar</h3><div class="byline">Noor El-Amin</div><span class="excerpt">Read an excerpt →</span></div>
        </a>
        <a class="card compact reveal" href="#/our-work">
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
`;

export function OurWorkPage() {
  useRevealAndCounters();
  return <div dangerouslySetInnerHTML={{ __html: BODY_HTML }} />;
}
