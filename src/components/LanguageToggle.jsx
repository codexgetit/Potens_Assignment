import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../hooks/useLanguage';

/**
 * Premium Language selector dropdown.
 * Default is English. Clicking opens a dropdown with English and Hindi choices.
 */
export const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left z-50" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-full border border-white/20 bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
      >
        <span>{language === 'en' ? 'English' : 'हिंदी'}</span>
        <svg className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-32 origin-top-right rounded-xl bg-white shadow-lg ring-1 ring-black/5 focus:outline-none overflow-hidden animate-fade-in">
          <div className="py-1">
            <button
              onClick={() => {
                setLanguage('en');
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-2.5 text-xs font-bold transition cursor-pointer ${
                language === 'en'
                  ? 'bg-brand-100 text-brand-600'
                  : 'text-slate-700 hover:bg-brand-50'
              }`}
            >
              English
            </button>
            <button
              onClick={() => {
                setLanguage('hi');
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-2.5 text-xs font-bold transition cursor-pointer ${
                language === 'hi'
                  ? 'bg-brand-100 text-brand-600'
                  : 'text-slate-700 hover:bg-brand-50'
              }`}
            >
              हिंदी
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageToggle;
