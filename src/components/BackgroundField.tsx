import { useEffect, useRef } from 'react';

const TOTAL_FRAMES = 240;
const frameSrc = (i: number) =>
  `${import.meta.env.BASE_URL}quill-anim/frame_${String(i).padStart(3, '0')}.jpg`;

/**
 * Fixed, full-viewport canvas that scrubs through the Quillstones logo
 * rotation sequence as the page scrolls (frame 1 at the top of the page,
 * frame 240 at the bottom). Sits behind all page content.
 */
export function BackgroundField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    // Frame images, loaded progressively; drawing falls back to the
    // nearest already-loaded frame so the canvas never goes blank.
    const images: (HTMLImageElement | null)[] = new Array(TOTAL_FRAMES + 1).fill(
      null,
    );
    const loaded: boolean[] = new Array(TOTAL_FRAMES + 1).fill(false);

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.decoding = 'async';
      img.src = frameSrc(i);
      img.onload = () => {
        loaded[i] = true;
      };
      images[i] = img;
    }

    const nearestLoadedFrame = (target: number) => {
      const t = Math.round(target);
      for (let d = 0; d <= TOTAL_FRAMES; d++) {
        const lo = t - d;
        const hi = t + d;
        if (lo >= 1 && loaded[lo]) return lo;
        if (hi <= TOTAL_FRAMES && loaded[hi]) return hi;
      }
      return null;
    };

    let width = window.innerWidth;
    let height = window.innerHeight;

    // Offscreen square buffer: the source frame is cover-cropped into it,
    // then a radial gradient fades its edges to transparent so the frame's
    // own dark background blends seamlessly into the page instead of
    // showing a hard rectangle.
    const buffer = document.createElement('canvas');
    const bufferSize = 900;
    buffer.width = bufferSize;
    buffer.height = bufferSize;
    const bctx = buffer.getContext('2d')!;

    const mask = document.createElement('canvas');
    mask.width = bufferSize;
    mask.height = bufferSize;
    const mctx = mask.getContext('2d')!;
    const g = mctx.createRadialGradient(
      bufferSize / 2,
      bufferSize / 2,
      bufferSize * 0.18,
      bufferSize / 2,
      bufferSize / 2,
      bufferSize * 0.5,
    );
    g.addColorStop(0, 'rgba(0,0,0,1)');
    g.addColorStop(1, 'rgba(0,0,0,0)');
    mctx.fillStyle = g;
    mctx.fillRect(0, 0, bufferSize, bufferSize);

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const getMaxScroll = () =>
      Math.max(1, document.documentElement.scrollHeight - window.innerHeight);

    let maxScroll = getMaxScroll();
    const ro = new ResizeObserver(() => {
      maxScroll = getMaxScroll();
    });
    ro.observe(document.documentElement);

    let targetFrame = 1;
    const onScroll = () => {
      const progress = Math.min(1, Math.max(0, window.scrollY / maxScroll));
      targetFrame = 1 + progress * (TOTAL_FRAMES - 1);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    const drawFrame = (frameIndex: number) => {
      const img = images[frameIndex];
      if (!img) return;

      ctx.clearRect(0, 0, width, height);

      // Cover-crop the 16:9 frame into the square buffer.
      bctx.clearRect(0, 0, bufferSize, bufferSize);
      const scale = Math.max(
        bufferSize / img.naturalWidth,
        bufferSize / img.naturalHeight,
      );
      const dw = img.naturalWidth * scale;
      const dh = img.naturalHeight * scale;
      bctx.drawImage(
        img,
        (bufferSize - dw) / 2,
        (bufferSize - dh) / 2,
        dw,
        dh,
      );
      bctx.globalCompositeOperation = 'destination-in';
      bctx.drawImage(mask, 0, 0);
      bctx.globalCompositeOperation = 'source-over';

      const size = Math.min(860, Math.max(420, Math.min(width, height) * 0.8));
      ctx.globalAlpha = 0.55;
      ctx.drawImage(
        buffer,
        (width - size) / 2,
        (height - size) / 2,
        size,
        size,
      );
      ctx.globalAlpha = 1;
    };

    if (reduceMotion) {
      const img = images[1]!;
      img.onload = () => drawFrame(1);
      if (img.complete) drawFrame(1);
      return () => {
        window.removeEventListener('resize', resize);
        window.removeEventListener('scroll', onScroll);
        ro.disconnect();
      };
    }

    let raf = 0;
    let running = true;
    let currentFrame = 1;
    let lastDrawn = -1;

    const tick = () => {
      if (!running) return;
      currentFrame += (targetFrame - currentFrame) * 0.12;
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
    document.addEventListener('visibilitychange', onVisibility);

    raf = requestAnimationFrame(tick);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVisibility);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
    />
  );
}
