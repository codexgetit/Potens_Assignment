import React, { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { formatDate } from '../utils/formatDate';
import { categories } from '../data/categories';
import Card from './Card';

/**
 * Official Receipt ticket display.
 * Renders category details, image attachment, stylized barcode, and copy/print buttons.
 */
export const ReferenceCard = ({ draft }) => {
  const { t, language } = useLanguage();
  const [copied, setCopied] = useState(false);

  const getCategoryInfo = (catId) => {
    return categories.find(c => c.id === catId) || {};
  };

  const catInfo = getCategoryInfo(draft.categoryId);

  const handleCopy = () => {
    if (draft.referenceId) {
      navigator.clipboard.writeText(draft.referenceId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-4 w-full">
      {/* Printable Receipt Wrapper */}
      <div id="printable-receipt" className="w-full">
        <Card className="relative overflow-hidden p-6 border-2 border-slate-200 dark:border-slate-800 shadow-lg bg-white dark:bg-slate-900 rounded-3xl animate-slide-up">
          {/* Perforated side design - left and right cutouts */}
          <div className="absolute top-1/2 -left-3 h-6 w-6 rounded-full bg-slate-50 dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 transform -translate-y-1/2"></div>
          <div className="absolute top-1/2 -right-3 h-6 w-6 rounded-full bg-slate-50 dark:bg-slate-950 border-l border-slate-200 dark:border-slate-800 transform -translate-y-1/2"></div>

          {/* Ticket Header */}
          <div className="border-b-2 border-slate-100 dark:border-slate-800/80 pb-4 flex items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-extrabold tracking-widest text-indigo-600 uppercase">
                {t('confirmation.refCardTitle')}
              </span>
              <h3 className="font-mono text-sm font-black text-slate-850 dark:text-white mt-1">
                {draft.referenceId}
              </h3>
            </div>
            
            {/* Status Stamp Badge */}
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[9px] font-black bg-emerald-600 text-white shadow-xs uppercase tracking-wider">
              OPEN
            </span>
          </div>

          {/* Ticket Details */}
          <div className="py-5 space-y-4">
            {/* Category selection detail */}
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-450 dark:text-slate-500 font-medium">
                {t('details.selectedCategory')}
              </span>
              <div className="flex items-center gap-2">
                <span className={`inline-flex items-center justify-center w-6 h-6 rounded-lg bg-gradient-to-br ${catInfo.colorClass || 'from-indigo-500 to-indigo-700'} text-white shadow-xs`}>
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d={catInfo.svgPath || ''} />
                  </svg>
                </span>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  {t(catInfo.titleKey)}
                </span>
              </div>
            </div>

            {/* Date Reported */}
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-450 dark:text-slate-500 font-medium">
                {t('confirmation.dateReported')}
              </span>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                {formatDate(draft.timestamp || Date.now(), language)}
              </span>
            </div>

            {/* Reporter details if present */}
            {(draft.reporterName || draft.reporterPhone) && (
              <div className="border-t border-slate-100 dark:border-slate-800/50 pt-3 space-y-1.5">
                <span className="text-[10px] font-extrabold uppercase text-slate-400">
                  Reporter Contact Info
                </span>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-450 dark:text-slate-500">{t('details.reporterName')}</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{draft.reporterName || 'Anonymous'}</span>
                </div>
                {draft.reporterPhone && (
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-450 dark:text-slate-500">{t('details.reporterPhone')}</span>
                    <span className="font-bold text-slate-850 dark:text-slate-200">{draft.reporterPhone}</span>
                  </div>
                )}
              </div>
            )}

            {/* Photo Attachment if present */}
            {draft.image && (
              <div className="border-t border-slate-100 dark:border-slate-800/50 pt-3">
                <span className="text-[10px] font-extrabold uppercase text-slate-400 block mb-2">
                  Photo Attachment
                </span>
                <img
                  src={draft.image}
                  alt="Issue Proof"
                  className="w-full h-32 object-cover rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm"
                />
              </div>
            )}

            {/* Complaint Text Details */}
            <div className="border-t border-slate-100 dark:border-slate-800/50 pt-3">
              <span className="text-[10px] font-extrabold uppercase text-slate-400 block mb-1">
                {t('details.description')}
              </span>
              <p className="text-xs text-slate-700 dark:text-slate-350 leading-relaxed font-semibold">
                {draft.description}
              </p>
            </div>
          </div>

          {/* Ticket Barcode section */}
          <div className="flex flex-col items-center pt-5 border-t-2 border-dashed border-slate-100 dark:border-slate-800/80">
            <div className="h-7 w-48 flex items-center justify-between text-slate-800 dark:text-slate-300 font-mono tracking-widest text-[9px] opacity-70">
              {/* Barcode line mock elements */}
              <div className="flex h-5 w-full items-stretch justify-between">
                {[1, 3, 1, 2, 4, 1, 3, 2, 1, 4, 2, 1, 3, 1, 2, 4, 1, 2, 3, 1, 2].map((w, idx) => (
                  <div
                    key={idx}
                    className="bg-current"
                    style={{ width: `${w}px` }}
                  />
                ))}
              </div>
            </div>
            <span className="text-[9px] font-bold font-mono text-slate-400 dark:text-slate-500 mt-1 uppercase tracking-widest">
              Generated by Describe Issue
            </span>
          </div>
        </Card>
      </div>

      {/* Share / Copy / Print Options panel */}
      <div className="flex items-center gap-3">
        {/* Copy Reference Button */}
        <button
          onClick={handleCopy}
          className="flex-1 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 text-slate-750 dark:text-slate-250 font-bold text-xs bg-white dark:bg-slate-900/60 hover:bg-slate-50 dark:hover:bg-slate-850 hover:shadow-xs transition flex items-center justify-center gap-1.5 cursor-pointer active:scale-[0.98]"
        >
          {copied ? (
            <>
              <svg className="h-4.5 w-4.5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-emerald-600 font-extrabold">{t('confirmation.copied')}</span>
            </>
          ) : (
            <>
              <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m-7 4h7m-7 4h7M5 8h0" />
              </svg>
              <span>{t('confirmation.copy')}</span>
            </>
          )}
        </button>

        {/* Print Receipt Button */}
        <button
          onClick={handlePrint}
          className="flex-1 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 text-slate-755 dark:text-slate-250 font-bold text-xs bg-white dark:bg-slate-900/60 hover:bg-slate-50 dark:hover:bg-slate-850 hover:shadow-xs transition flex items-center justify-center gap-1.5 cursor-pointer active:scale-[0.98]"
        >
          <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-3a2 2 0 00-2-2H9a2 2 0 00-2 2v3a2 2 0 002 2zm5-14V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M9 3h6" />
          </svg>
          <span>{t('confirmation.download')}</span>
        </button>
      </div>
    </div>
  );
};

export default ReferenceCard;
