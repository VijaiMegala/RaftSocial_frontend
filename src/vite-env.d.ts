/// <reference types="vite/client" />
interface ImportMetaEnv {
    VITE_CLOUD_NAME: string;
    VITE_UPLOAD_PRESET: string;
  }
  
interface ImportMeta {
    readonly env: ImportMetaEnv;
}