export const BASE = import.meta.env.BASE_URL;
export const LOGO = `${BASE}logo-mark.png`;
export const BG_TOTAL_FRAMES = 145;
export const bgFrameSrc = (i: number) =>
  `${BASE}quill-anim/frame_${String(i).padStart(3, '0')}.jpg`;
