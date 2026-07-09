/**
 * Registers the Service Worker for offline PWA caching.
 */
export const registerSW = () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      // sw.js is located in the public root folder
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('CivicCare Service Worker registered with scope:', registration.scope);
        })
        .catch((error) => {
          console.error('CivicCare Service Worker registration failed:', error);
        });
    });
  }
};

export default registerSW;
