import { useEffect } from 'react';
import { useRevealAndCounters } from '@/lib/useRevealAndCounters';

const BODY_HTML = `
<section class="contact page-head" id="contact">
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
`;

export function ContactPage() {
  useRevealAndCounters();

  useEffect(() => {
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

    form.addEventListener('submit', onSubmit);
    return () => form.removeEventListener('submit', onSubmit);
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: BODY_HTML }} />;
}
