import React from 'react';
import { useLanguage } from '../hooks/useLanguage';
import Card from './Card';

/**
 * Success card featuring animated green tick checkmark.
 */
export const SuccessCard = () => {
  const { t } = useLanguage();

  return (
    <Card className="flex flex-col items-center justify-center text-center p-8 animate-success-pop shadow-md">
      {/* Circle Icon wrapping green check tick */}
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-450 border border-emerald-100 dark:border-emerald-900/40 relative">
        {/* Pulsing ring */}
        <div className="absolute inset-0 rounded-full border-4 border-emerald-500/20 animate-pulse-slow"></div>
        <svg className="h-9 w-9" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <h2 className="mt-5 font-display text-xl font-black text-slate-850 dark:text-white leading-tight">
        {t('confirmation.success')}
      </h2>
      <p className="mt-2 text-xs font-semibold text-slate-550 dark:text-slate-400 leading-relaxed max-w-sm">
        {t('confirmation.message')}
      </p>
    </Card>
  );
};

export default SuccessCard;
