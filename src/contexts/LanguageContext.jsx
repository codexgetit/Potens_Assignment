import React, { createContext, useState, useEffect } from 'react';
import enTranslations from '../locales/en.json';
import hiTranslations from '../locales/hi.json';

export const LanguageContext = createContext(null);

const translations = {
  en: enTranslations,
  hi: hiTranslations
};

export const LanguageProvider = ({ children }) => {
  // Load initial language from localStorage or default to 'en'
  const [language, setLanguageState] = useState(() => {
    const saved = localStorage.getItem('potens_lang');
    return saved === 'hi' || saved === 'en' ? saved : 'en';
  });

  const setLanguage = (lang) => {
    if (lang === 'en' || lang === 'hi') {
      setLanguageState(lang);
      localStorage.setItem('potens_lang', lang);
    }
  };

  // Translation helper: t("nav.title")
  const t = (keyPath) => {
    if (!keyPath) return '';
    
    const keys = keyPath.split('.');
    let result = translations[language];
    
    for (const key of keys) {
      if (result && Object.prototype.hasOwnProperty.call(result, key)) {
        result = result[key];
      } else {
        // Fallback to English if translation is missing in Hindi
        let englishResult = translations['en'];
        for (const engKey of keys) {
          if (englishResult && Object.prototype.hasOwnProperty.call(englishResult, engKey)) {
            englishResult = englishResult[engKey];
          } else {
            englishResult = keyPath; // Ultimate fallback is the path itself
            break;
          }
        }
        return englishResult;
      }
    }
    
    return typeof result === 'string' ? result : keyPath;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
