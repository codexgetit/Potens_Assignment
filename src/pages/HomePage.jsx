import React, { useState, useContext } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { ReportContext } from '../contexts/ReportContext';
import { categories } from '../data/categories';
import { formatDate } from '../utils/formatDate';
import LanguageToggle from '../components/LanguageToggle';

// Hero background
const HERO_BG = 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1920&q=80';

/* ──────────────────────────────────────────────
   Reusable inline SVG – CiviCare flower logo
   ────────────────────────────────────────────── */
const FlowerLogo = ({ className = 'h-9 w-9' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
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
);

/**
 * HomePage – single self-contained landing page.
 * Contains: Navbar · Hero · Services · Footer · History Drawer · Language Toggle
 * No external layout components are imported.
 */
const HomePage = () => {
  const { t, language, setLanguage } = useLanguage();
  const { setCategory, submittedReports, clearHistory, deleteReport, setStep, updateDraft } = useContext(ReportContext);
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
      {/* ╔══════════════════════════════════════════════╗
          ║               NAVBAR                        ║
          ╚══════════════════════════════════════════════╝ */}
      <header className="sticky top-0 z-40 w-full bg-[#0288d1] text-white shadow-md">
        <div className="mx-auto flex h-[70px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer shrink-0" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <FlowerLogo className="h-9 w-9 text-white" />
            <div>
              <h1 className="font-display text-[22px] font-light tracking-[0.15em] leading-none uppercase">CIVICARE</h1>
              <p className="text-[10px] text-white/70 tracking-wider mt-0.5">a helping hand</p>
            </div>
          </div>

          {/* Center Nav Links */}
          <nav className="hidden md:flex items-center gap-0 text-[13px] font-semibold tracking-wide">
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="px-4 py-1 hover:text-blue-200 transition cursor-pointer">Home</button>
            <span className="text-white/40">|</span>
            <button onClick={() => scrollTo('services-section')} className="px-4 py-1 hover:text-blue-200 transition cursor-pointer">Services</button>
            <span className="text-white/40">|</span>
            <button onClick={() => scrollTo('footer-section')} className="px-4 py-1 hover:text-blue-200 transition cursor-pointer">Contact Us</button>
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Phone pill */}
            <a href="tel:01905770110" className="hidden sm:flex items-center gap-2 px-5 py-2 bg-slate-900/60 hover:bg-slate-900/80 rounded-full transition text-sm font-bold tracking-wide">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              01905 770110
            </a>

            <LanguageToggle />

            {/* History button */}
            <button onClick={() => setShowHistory(true)} className="relative flex items-center justify-center p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition cursor-pointer" title={t('nav.history')}>
              <svg className="h-5.5 w-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
              {submittedReports.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-white text-[9px] font-black text-[#0288d1] shadow">{submittedReports.length}</span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* ╔══════════════════════════════════════════════╗
          ║            HERO SECTION                     ║
          ╚══════════════════════════════════════════════╝ */}
      <section className="relative w-full min-h-[85vh] flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-[#0288d1]" style={{ backgroundImage: `url(${HERO_BG})` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-[#0288d1]/60" />

        {/* Center text */}
        <div className="relative z-10 text-center px-6 space-y-5 pb-20">
          <p className="text-xs sm:text-sm tracking-[0.3em] uppercase text-white/80 font-medium">WELCOME TO CIVICARE</p>
          <h2 className="font-display text-3xl sm:text-5xl md:text-[3.4rem] font-bold text-white leading-tight max-w-2xl mx-auto">
            We're here to provide<br />a helping hand
          </h2>
        </div>

        {/* Anniversary badge strip */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-center">
          <div className="flex items-center max-w-3xl w-full mx-6">
            <div className="relative shrink-0 -mb-4 z-10">
              <div className="w-24 h-24 rounded-full bg-gradient-to-b from-slate-100 to-slate-200 border-4 border-slate-300 shadow-lg flex flex-col items-center justify-center">
                <span className="text-[8px] font-bold text-slate-500 uppercase tracking-wider leading-none">Serving the</span>
                <span className="text-[8px] font-bold text-slate-500 uppercase tracking-wider leading-none">Local Community</span>
                <span className="text-2xl font-black text-[#0288d1] leading-none mt-0.5">25</span>
                <span className="text-[7px] font-extrabold text-slate-500 uppercase tracking-widest leading-none">Years</span>
                <span className="text-[7px] font-black text-[#0288d1] uppercase tracking-widest leading-none mt-0.5">ANNIVERSARY</span>
              </div>
            </div>
            <div className="bg-[#0288d1] text-white text-xs sm:text-sm font-medium py-4 px-6 sm:px-8 leading-relaxed rounded-r-lg shadow-lg flex-1">
              A family-owned health and social care company since 1997, with the important values of dignity, respect, and passion at the heart of everything we do.
            </div>
          </div>
        </div>
      </section>

      {/* ╔══════════════════════════════════════════════╗
          ║          SERVICES SECTION                   ║
          ╚══════════════════════════════════════════════╝ */}
      <section id="services-section" className="py-20 px-6 bg-[#f5f8fb]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14 space-y-3">
            <p className="text-xs tracking-[0.25em] uppercase text-[#0288d1] font-bold">What We Offer</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900">Our Services</h2>
            <p className="text-sm text-slate-500 max-w-xl mx-auto leading-relaxed">We provide a wide range of care services to support you and your family, delivered with dignity, respect, and compassion.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setCategory(cat.id)}
                className="group relative flex flex-col text-left bg-white rounded-2xl shadow-sm hover:shadow-xl border border-slate-100 overflow-hidden transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              >
                <div className={`h-1.5 w-full bg-gradient-to-r ${cat.colorClass}`} />
                <div className="p-7 flex flex-col flex-1">
                  <div className={`flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${cat.colorClass} text-white shadow-md mb-5`}>
                    <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={cat.svgPath} /></svg>
                  </div>
                  <h3 className="text-lg font-bold text-slate-850 group-hover:text-[#0288d1] transition-colors mb-2">{t(cat.titleKey)}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed flex-1">{t(cat.descKey)}</p>
                  <div className="mt-5 flex items-center gap-1.5 text-[#0288d1] text-sm font-bold group-hover:gap-2.5 transition-all">
                    <span>Learn More</span>
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ╔══════════════════════════════════════════════╗
          ║               FOOTER                        ║
          ╚══════════════════════════════════════════════╝ */}
      <footer id="footer-section">
        <div className="border-t border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-6 py-14 grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">

            {/* Column 1 – Logo & Association */}
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <FlowerLogo className="h-10 w-10 text-[#0288d1]" />
                <div>
                  <h3 className="font-display text-xl font-light tracking-[0.15em] text-[#0288d1] uppercase leading-none">CIVICARE</h3>
                  <p className="text-[10px] text-slate-400 tracking-wider mt-0.5">a helping hand</p>
                </div>
              </div>
              <div className="inline-block">
                <div className="bg-[#0288d1] text-white rounded-lg overflow-hidden shadow-md max-w-[220px]">
                  <div className="bg-white text-[#0288d1] text-[10px] font-bold text-center py-1 tracking-wider uppercase">Member Of</div>
                  <div className="px-4 py-3 text-center">
                    <p className="text-sm font-extrabold leading-tight">West Midlands Care</p>
                    <p className="text-sm font-extrabold leading-tight">Association</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Column 2 – Contact Us */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-[#0288d1] underline underline-offset-4 decoration-[#0288d1]/30">Contact Us</h4>
              <div className="space-y-2 text-sm text-slate-600">
                <p><span className="font-bold text-slate-800">T:</span> 01905 770110</p>
                <p><span className="font-bold text-slate-800">E:</span> info.central@civicare.co.uk</p>
                <p className="font-bold text-slate-800 pt-1">Civicare Central Ltd</p>
                <p>Office 9A 40 St Andrews Square,<br />Droitwich, WR9 8HE</p>
              </div>
              <div className="flex items-center gap-3 pt-2">
                <a href="#" className="flex items-center justify-center w-9 h-9 rounded-full bg-slate-100 text-slate-500 hover:bg-[#0288d1] hover:text-white transition">
                  <svg className="h-4.5 w-4.5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                </a>
                <a href="#" className="flex items-center justify-center w-9 h-9 rounded-full bg-slate-100 text-slate-500 hover:bg-[#0288d1] hover:text-white transition">
                  <svg className="h-4.5 w-4.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                </a>
              </div>
            </div>

            {/* Column 3 – Quick Links */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-[#0288d1] underline underline-offset-4 decoration-[#0288d1]/30">Quick Links</h4>
              <div className="grid grid-cols-2 gap-x-8 gap-y-2.5 text-sm">
                <a href="#" className="text-slate-600 hover:text-[#0288d1] transition font-medium">Home</a>
                <a href="#" className="text-slate-600 hover:text-[#0288d1] transition font-medium">About Us</a>
                <a href="#" className="text-slate-600 hover:text-[#0288d1] transition font-medium">Services</a>
                <a href="#" className="text-slate-600 hover:text-[#0288d1] transition font-medium">Work for Us</a>
                <a href="#" className="text-slate-600 hover:text-[#0288d1] transition font-medium">Contact Us</a>
                <a href="#" className="text-slate-600 hover:text-[#0288d1] transition font-medium">Privacy Policy</a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright bar */}
        <div className="bg-[#0288d1] text-white text-center py-3.5 text-xs font-medium tracking-wide">
          © 2022 Civicare Care Central Limited
        </div>
      </footer>

      {/* ╔══════════════════════════════════════════════╗
          ║          HISTORY DRAWER (modal)             ║
          ╚══════════════════════════════════════════════╝ */}
      {showHistory && (
        <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs" onClick={() => setShowHistory(false)} />
          <div className="absolute inset-y-0 right-0 flex max-w-full pl-10">
            <div className="w-screen max-w-md bg-white p-6 shadow-2xl border-l border-slate-200">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <h2 className="font-display text-lg font-bold text-slate-900 flex items-center gap-2">
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

export default HomePage;
