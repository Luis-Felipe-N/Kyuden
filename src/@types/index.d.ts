export {};

declare global {
  interface Window {
    timeout: any; // 👈️ turn off type checking
  }
}