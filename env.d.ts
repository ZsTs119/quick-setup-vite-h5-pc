
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_NODE_ENV: string;
  readonly VITE_APP_TITLE: string;
  readonly VITE_APP_MODE: string;
  readonly VITE_API_BASE_URL: string;
  readonly VITE_PRO_URL: string;
  readonly VITE_TEST_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}