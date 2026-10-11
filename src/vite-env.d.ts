/// <reference types="vite/client" />

/** Build-time settings; see .env.example. All optional. */
interface ImportMetaEnv {
  readonly VITE_FORM_ENDPOINT?: string;
  readonly VITE_FORM_ACCESS_KEY?: string;
  readonly VITE_ANALYTICS_ID?: string;
  readonly VITE_ANALYTICS_SRC?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
