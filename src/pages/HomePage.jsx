import { useState, useContext } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { ReportContext } from '../contexts/ReportContext';
import { categories } from '../data/categories';
import { formatDate } from '../utils/formatDate';
import LanguageToggle from '../components/LanguageToggle';
import heroBg from '../assets/HomeI.png';

/**
 * HomePage – single self-contained landing page.
 * Contains: Navbar · Hero · Services · Footer · History Drawer · Language Toggle
 * No external layout components are imported.
 */
const HomePage = () => {
  const { t, language } = useLanguage();
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
      <header className="sticky top-0 z-40 w-full bg-brand-600 text-white shadow-md">
        <div className="mx-auto flex h-[70px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer shrink-0 bg-white/95 px-4 py-1.5 rounded-xl shadow-xs" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <img src="/logoDescribeIssue1.png" alt="Describe Issue Logo" className="h-[32px] sm:h-[36px] object-contain" />
          </div>

          {/* Center Nav Links */}
          <nav className="hidden md:flex items-center gap-1 text-[15px] font-semibold tracking-wide">
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="px-5 py-1 hover:text-brand-100 transition cursor-pointer">Home</button>
            <span className="text-white/40">|</span>
            <button onClick={() => scrollTo('services-section')} className="px-4 py-1 hover:text-brand-100 transition cursor-pointer">Services</button>
            <span className="text-white/40">|</span>
            <button onClick={() => scrollTo('footer-section')} className="px-4 py-1 hover:text-brand-100 transition cursor-pointer">Contact Us</button>
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3 shrink-0">
            

            <LanguageToggle />

            {/* History button */}
            <button onClick={() => setShowHistory(true)} className="relative flex items-center justify-center p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition cursor-pointer" title={t('nav.history')}>
              <svg className="h-5.5 w-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
              {submittedReports.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-white text-[9px] font-black text-brand-600 shadow">{submittedReports.length}</span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* ╔══════════════════════════════════════════════╗
          ║            HERO SECTION                     ║
          ╚══════════════════════════════════════════════╝ */}
      <section className="relative w-full min-h-[85vh] flex flex-col items-start justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-brand-500" style={{ backgroundImage: `url(${heroBg})` }} />
        <div className="absolute inset-0 bg-linear-to-b from-brand-600/65 via-brand-500/45 to-accent-500/55" />

        {/* Center text */}
        <div className="relative z-10 w-full max-w-7xl px-6 sm:px-8 lg:px-10 xl:px-12 space-y-5 pb-20 text-left">
          <p className="text-xs sm:text-sm tracking-[0.3em] uppercase text-amber-50 font-semibold drop-shadow-[0_2px_6px_rgba(0,0,0,0.75)]">WELCOME TO DESCRIBE ISSUE</p>
          <h2 className="font-display text-3xl sm:text-5xl md:text-[3.4rem] font-bold text-white leading-tight max-w-2xl drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
            Report local issues in seconds.<br />We ensure they get solved.
          </h2>
        </div>

      </section>

      {/* ╔══════════════════════════════════════════════╗
          ║          SERVICES SECTION                   ║
          ╚══════════════════════════════════════════════╝ */}
      <section id="services-section" className="py-20 px-6 bg-brand-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14 space-y-3">
            <p className="text-xs tracking-[0.25em] uppercase text-brand-600 font-bold">What We Offer</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-brand-700">Our Services</h2>
            <p className="text-sm text-slate-500 max-w-xl mx-auto leading-relaxed">Report road damage, garbage accumulation, water leakages, streetlight issues, or any other civic concern in your neighborhood instantly.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setCategory(cat.id)}
                className="group relative flex flex-col text-left bg-white rounded-2xl shadow-sm hover:shadow-xl border border-brand-100/80 overflow-hidden transition-all duration-350 hover:-translate-y-1.5 cursor-pointer"
              >
                {/* Visual Category Image Banner */}
                <div className="w-full h-[180px] overflow-hidden relative bg-slate-100 shrink-0">
                  <img 
                    src={cat.image} 
                    alt={t(cat.titleKey)} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-brand-600/35 via-transparent to-transparent" />
                  
                  {/* Floating Action/Category Icon */}
                  <div className={`absolute bottom-3 right-3 flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br ${cat.colorClass} text-white shadow-md z-10`}>
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d={cat.svgPath} />
                    </svg>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  {/* Title */}
                  <h3 className="text-lg font-bold text-slate-850 group-hover:text-brand-500 transition-colors mb-2">
                    {t(cat.titleKey)}
                  </h3>

                  {/* Description */}
                  <p className="text-xs font-semibold text-slate-500 leading-relaxed flex-1">
                    {t(cat.descKey)}
                  </p>

                  {/* Learn More link */}
                  <div className="mt-5 flex items-center gap-1 text-brand-500 text-xs font-black group-hover:gap-2 transition-all">
                    <span>{t('stepper.step2')} &rarr;</span>
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
        <div className="border-t border-brand-100 bg-white">
          <div className="mx-auto max-w-7xl px-6 py-14 grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">

            {/* Column 1 – Logo & Association */}
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <img src="/logoDescribeIssue1.png" alt="Describe Issue Logo" className="h-40 w-40 object-contain" />
               
              </div>
            </div>

            {/* Column 2 – Contact Us */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-brand-600 underline underline-offset-4 decoration-accent-500/70">Contact Us</h4>
              <div className="space-y-2 text-sm text-slate-600">
                <p><span className="font-bold text-slate-800">Phone No:</span> 01905 770110</p>
                <p><span className="font-bold text-slate-800">Email:</span> dashrath11@gmail.com</p>
                <p className="font-bold text-slate-800 pt-1">Describe Issue</p>
                <p>Office at Pune,<br />xyz</p>
              </div>
              
            </div>

            {/* Column 3 – Quick Links */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-brand-600 underline underline-offset-4 decoration-accent-500/70">Quick Links</h4>
              <div className="grid grid-cols-2 gap-x-8 gap-y-2.5 text-sm">
                <a href="#" className="text-slate-600 hover:text-brand-500 transition font-medium">Home</a>
                <a href="#" className="text-slate-600 hover:text-brand-500 transition font-medium">About Us</a>
                <a href="#" className="text-slate-600 hover:text-brand-500 transition font-medium">Services</a>
                <a href="#" className="text-slate-600 hover:text-brand-500 transition font-medium">Work for Us</a>
                <a href="#" className="text-slate-600 hover:text-brand-500 transition font-medium">Contact Us</a>
                <a href="#" className="text-slate-600 hover:text-brand-500 transition font-medium">Privacy Policy</a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright bar */}
        <div className="bg-brand-600 text-white text-center py-3.5 text-xs font-medium tracking-wide">
          © 2026 
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
                  <svg className="h-5 w-5 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
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
                              <button onClick={() => handleViewReceipt(report)} className="p-1 rounded-lg hover:bg-accent-50 text-slate-400 hover:text-brand-500 transition"><svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg></button>
                              <button onClick={() => deleteReport(report.referenceId)} className="p-1 rounded-lg hover:bg-accent-50 text-slate-400 hover:text-brand-600 transition"><svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
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
