/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Add any VITE_* env vars used by the frontend here
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

