import React, { useState, useContext } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { ReportContext } from '../contexts/ReportContext';
import { LanguageToggle } from './LanguageToggle';
import { formatDate } from '../utils/formatDate';
import { categories } from '../data/categories';

export const Navbar = () => {
  const { t, language } = useLanguage();
  const { submittedReports, clearHistory, deleteReport, setStep, updateDraft } = useContext(ReportContext);
  const [showHistory, setShowHistory] = useState(false);

  const getCategoryInfo = (catId) => categories.find(c => c.id === catId) || {};

  const handleViewReceipt = (report) => {
    updateDraft(report);
    setStep(2);
    setShowHistory(false);
  };

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* ── CiviCare Blue Header Bar ── */}
      <header className="sticky top-0 z-40 w-full bg-[#0288d1] text-white shadow-md">
        <div className="mx-auto flex h-[70px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer shrink-0" onClick={() => setStep(0)}>
            {/* Flower / asterisk icon */}
            <svg className="h-9 w-9 text-white" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="12" r="2" />
              <circle cx="12" cy="6" r="2.5" />
              <circle cx="12" cy="18" r="2.5" />
              <circle cx="6" cy="12" r="2.5" />
              <circle cx="18" cy="12" r="2.5" />
              <circle cx="7.8" cy="7.8" r="2" />
              <circle cx="16.2" cy="7.8" r="2" />
              <circle cx="7.8" cy="16.2" r="2" />
              <circle cx="16.2" cy="16.2" r="2" />
            </svg>
            <div>
              <h1 className="font-display text-[22px] font-light tracking-[0.15em] leading-none uppercase">
                CIVICARE
              </h1>
              <p className="text-[10px] text-white/70 tracking-wider mt-0.5">a helping hand</p>
            </div>
          </div>

          {/* Center Navigation Links */}
          <nav className="hidden md:flex items-center gap-0 text-[13px] font-semibold tracking-wide">
            <button onClick={() => { setStep(0); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="px-4 py-1 hover:text-blue-200 transition cursor-pointer">Home</button>
            <span className="text-white/40">|</span>
            <button onClick={() => scrollTo('about-section')} className="px-4 py-1 hover:text-blue-200 transition cursor-pointer">About Us</button>
            <span className="text-white/40">|</span>
            <button onClick={() => scrollTo('services-section')} className="px-4 py-1 hover:text-blue-200 transition cursor-pointer">Services</button>
            <span className="text-white/40">|</span>
            <button onClick={() => scrollTo('footer-section')} className="px-4 py-1 hover:text-blue-200 transition cursor-pointer">Work for Us</button>
            <span className="text-white/40">|</span>
            <button onClick={() => scrollTo('footer-section')} className="px-4 py-1 hover:text-blue-200 transition cursor-pointer">Contact Us</button>
          </nav>

          {/* Right side: Phone pill + Language + History */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Phone pill */}
            <a href="tel:01905770110" className="hidden sm:flex items-center gap-2 px-5 py-2 bg-slate-900/60 hover:bg-slate-900/80 rounded-full transition text-sm font-bold tracking-wide">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              01905 770110
            </a>

            <LanguageToggle />

            {/* History button */}
            <button
              onClick={() => setShowHistory(true)}
              className="relative flex items-center justify-center p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition cursor-pointer"
              title={t('nav.history')}
            >
              <svg className="h-5.5 w-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
              {submittedReports.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-white text-[9px] font-black text-[#0288d1] shadow">
                  {submittedReports.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* ── History Drawer ── */}
      {showHistory && (
        <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs" onClick={() => setShowHistory(false)} />
          <div className="absolute inset-y-0 right-0 flex max-w-full pl-10">
            <div className="w-screen max-w-md bg-white dark:bg-slate-950 p-6 shadow-2xl border-l border-slate-200 dark:border-slate-800/80">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/60 pb-4">
                <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <svg className="h-5 w-5 text-[#0288d1]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  {t('nav.historyTitle')}
                </h2>
                <button onClick={() => setShowHistory(false)} className="rounded-lg p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>

              <div className="mt-4 overflow-y-auto max-h-[calc(100vh-200px)]">
                {submittedReports.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-20 text-center text-slate-400">
                    <svg className="h-12 w-12 text-slate-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <p className="text-sm font-medium">{t('history.empty')}</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {submittedReports.map((report) => {
                      const catInfo = getCategoryInfo(report.categoryId);
                      return (
                        <div key={report.referenceId} className="group flex flex-col p-4 rounded-xl border border-slate-150 bg-slate-50/50 hover:bg-white hover:shadow-md transition-all">
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-center gap-2">
                              <span className={`inline-flex items-center justify-center w-7 h-7 rounded-lg bg-gradient-to-br ${catInfo.colorClass || 'from-blue-500 to-blue-700'} text-white shadow-sm`}>
                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d={catInfo.svgPath || ''} /></svg>
                              </span>
                              <span className="text-sm font-bold text-slate-800">{t(catInfo.titleKey)}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <button onClick={() => handleViewReceipt(report)} className="p-1 rounded-lg hover:bg-blue-50 text-slate-400 hover:text-[#0288d1] transition"><svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg></button>
                              <button onClick={() => deleteReport(report.referenceId)} className="p-1 rounded-lg hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition"><svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                            </div>
                          </div>
                          <div className="mt-2 flex items-center gap-3">
                            {report.image && <img src={report.image} alt="" className="h-10 w-10 object-cover rounded-lg border border-slate-200" />}
                            <div className="flex-1 min-w-0">
                              <p className="text-[10px] font-mono text-slate-400">{report.referenceId}</p>
                              <p className="text-xs text-slate-600 truncate mt-0.5">{report.description}</p>
                            </div>
                          </div>
                          <div className="mt-2 border-t border-slate-100 pt-2 flex items-center justify-between">
                            <span className="text-[10px] text-slate-400">{formatDate(report.timestamp, language)}</span>
                            <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-50 text-emerald-600">OPEN</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {submittedReports.length > 0 && (
                <div className="absolute bottom-0 left-0 right-0 border-t border-slate-100 bg-white p-4">
                  <button onClick={() => { if (window.confirm('Clear all reports history?')) clearHistory(); }} className="w-full py-2.5 rounded-xl border border-rose-200 text-rose-600 font-semibold text-xs hover:bg-rose-50 transition">Clear History</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
