/**
 * Low-level Service helper for Speech Recognition.
 */

// Browser vendor prefixes check
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition || null;

export const speechService = {
  /**
   * Checks if speech recognition is supported in the current browser.
   */
  isSupported() {
    return SpeechRecognition !== null;
  },

  /**
   * Returns the constructor if supported.
   */
  getConstructor() {
    return SpeechRecognition;
  },

  /**
   * Maps app language keys ('en', 'hi') to Web Speech API locale tags.
   */
  getLocaleCode(lang) {
    if (lang === 'hi') {
      return 'hi-IN'; // Hindi (India)
    }
    return 'en-IN'; // English (India) - fits Indian accents better, fallback to en-US otherwise
  }
};

export default speechService;
