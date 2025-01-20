/// <reference types="vite/client" />

declare namespace NodeJS {
  interface ProcessEnv {
    VITE_API_URL: string;
    VITE_YOUTUBE_API_URL: string;
    VITE_API_KEY: string;
  }
}
