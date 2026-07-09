import React from 'react';
import { useLanguage } from '../hooks/useLanguage';

/**
 * Visual progress stepper tracking wizard state.
 * Supports en/hi translations.
 */
export const ProgressStepper = ({ currentStep = 0 }) => {
  const { t } = useLanguage();

  const steps = [
    { label: t('stepper.step1'), stepIndex: 0 },
    { label: t('stepper.step2'), stepIndex: 1 },
    { label: t('stepper.step3'), stepIndex: 2 }
  ];

  return (
    <div className="mx-auto max-w-xl px-4 py-6">
      <div className="flex items-center justify-between">
        {steps.map((step, idx) => {
          const isActive = currentStep === step.stepIndex;
          const isCompleted = currentStep > step.stepIndex;
          
          return (
            <React.Fragment key={step.stepIndex}>
              {/* Stepper Node */}
              <div className="flex flex-col items-center flex-1 relative">
                {/* Node circle */}
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold transition-all duration-500 border-2 z-10
                    ${isCompleted
                      ? 'bg-[#0288d1] border-[#0288d1] text-white shadow-sm'
                      : isActive
                        ? 'bg-[#0288d1] border-[#0277bd] text-white shadow-md shadow-sky-200 animate-pulse-slow'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400'
                    }
                  `}
                >
                  {isCompleted ? (
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    step.stepIndex + 1
                  )}
                </div>

                {/* Node label */}
                <span
                  className={`mt-2 text-[11px] font-bold tracking-wide uppercase transition-colors duration-300
                    ${isActive 
                      ? 'text-[#0288d1] dark:text-sky-400 font-extrabold' 
                      : isCompleted 
                        ? 'text-[#0288d1] dark:text-sky-400' 
                        : 'text-slate-400'
                    }
                  `}
                >
                  {step.label}
                </span>
              </div>

              {/* Connecting line */}
              {idx < steps.length - 1 && (
                <div className="flex-1 h-0.5 bg-slate-200 dark:bg-slate-800 mx-2 relative -top-3">
                  {/* Fill progress inside connection */}
                  <div
                    className="absolute inset-y-0 left-0 bg-[#0288d1] transition-all duration-500"
                    style={{ width: currentStep > step.stepIndex ? '100%' : '0%' }}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressStepper;
