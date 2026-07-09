import { useContext, useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { ReportContext } from '../contexts/ReportContext';
import { validateDescription, validatePhone } from '../utils/validators';
import Button from '../components/Button';
import Card from '../components/Card';
import ImageUploader from '../components/ImageUploader';
import VoiceRecorder from '../components/VoiceRecorder';
import MapSelector from '../components/MapSelector';
import { categories } from '../data/categories';

/**
 * Report Details Form Page.
 * Collects voice/text description, image files, and contact details.
 */
export const DetailsPage = () => {
  const { t } = useLanguage();
  const { draft, updateDraft, submitReport, setStep } = useContext(ReportContext);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getCategoryInfo = (catId) => {
    return categories.find(c => c.id === catId) || {};
  };

  const catInfo = getCategoryInfo(draft.categoryId);

  // Voice transcript receiver
  const handleVoiceTranscript = (text) => {
    if (text) {
      // Append voice transcript to description with spacing
      updateDraft({
        description: draft.description ? `${draft.description.trim()} ${text}` : text
      });
      // Clear description validation error if typed/spoken
      if (errors.description) {
        setErrors(prev => ({ ...prev, description: null }));
      }
    }
  };

  const handleDescChange = (e) => {
    updateDraft({ description: e.target.value });
    if (errors.description) {
      setErrors(prev => ({ ...prev, description: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate inputs
    const descVal = validateDescription(draft.description);
    const phoneVal = validatePhone(draft.reporterPhone);

    const newErrors = {};
    if (!descVal.isValid) newErrors.description = t(descVal.errorKey);
    if (!phoneVal.isValid) newErrors.phone = t(phoneVal.errorKey);

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Submit report simulation
    setIsSubmitting(true);
    setTimeout(() => {
      submitReport();
      setIsSubmitting(false);
    }, 1200); // 1.2s spinner simulation
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 lg:px-8 space-y-6 animate-fade-in">
      {/* Header and selected category info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <h2 className="font-display text-xl sm:text-2xl font-black text-brand-600 dark:text-accent-500">
            {t('details.title')}
          </h2>
          <p className="text-xs text-brand-500/85 dark:text-accent-500/85 font-semibold mt-0.5">
            {t('details.subtitle')}
          </p>
        </div>

        {/* Category Selected tag */}
        <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800/80 p-2 rounded-2xl border border-slate-200/50 dark:border-slate-700/50 self-start sm:self-center shadow-xs">
          <span className={`inline-flex items-center justify-center w-7 h-7 rounded-xl bg-linear-to-br from-brand-600 to-brand-500 text-white shadow-xs`}>
            <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d={catInfo.svgPath || ''} />
            </svg>
          </span>
          <div className="text-left">
            <span className="text-[10px] text-slate-400 font-bold block leading-none">
              {t('details.selectedCategory')}
            </span>
            <span className="text-xs font-bold text-slate-855 dark:text-slate-150 leading-tight">
              {t(catInfo.titleKey)}
            </span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Step Wizard Form Details Card */}
        <Card className="space-y-6 shadow-sm">
          {/* Interactive map location selector */}
          <div className="space-y-2 border-b border-slate-100 dark:border-slate-800/60 pb-5">
            <label className="block text-[10px] font-black text-slate-400 dark:text-slate-550 uppercase tracking-widest">
              Selected Location (Set on Map)
            </label>
            <MapSelector />
          </div>

          {/* Voice dictation block */}
          <VoiceRecorder onTranscriptChange={handleVoiceTranscript} />

          {/* Text Description Box */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label htmlFor="desc-box" className="block text-sm font-bold text-brand-600 dark:text-accent-500">
                {t('details.description')} <span className="text-rose-500">*</span>
              </label>
              <span className={`text-[10px] font-bold ${draft.description.trim().length >= 10 ? 'text-slate-400' : 'text-rose-550'}`}>
                {draft.description.trim().length} / Min 10 chars
              </span>
            </div>
            
            <textarea
              id="desc-box"
              rows={4}
              value={draft.description}
              onChange={handleDescChange}
              placeholder={t('details.descriptionPlaceholder')}
              className={`w-full px-4 py-3 rounded-2xl border text-sm font-medium text-black transition duration-200 outline-none focus:ring-3 focus:ring-accent-500/30 bg-white dark:bg-slate-905
                ${errors.description 
                  ? 'border-rose-500 focus:ring-rose-50 dark:focus:ring-rose-950/20' 
                  : 'border-slate-200 dark:border-slate-800 focus:border-brand-500 dark:focus:border-accent-500'
                }
              `}
            />
            {errors.description && (
              <p className="text-xs font-bold text-rose-650 flex items-center gap-1">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                {errors.description}
              </p>
            )}
          </div>

          {/* Image Upload module */}
          <ImageUploader
            imageValue={draft.image}
            onImageChange={(base64) => updateDraft({ image: base64 })}
            id="image-file"
          />

          {/* Contact Details Fields */}
          <div className="border-t border-slate-100 dark:border-slate-800/80 pt-5 space-y-4">
            <h4 className="text-sm font-bold text-brand-600 dark:text-accent-500 flex items-center gap-1.5">
              <svg className="h-4.5 w-4.5 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              {t('details.reporterDetails')}
            </h4>
            
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Name Field */}
              <div className="space-y-1.5">
                <label htmlFor="reporter-name" className="block text-xs font-bold text-brand-500/85 dark:text-accent-500/85">
                  {t('details.reporterName')}
                </label>
                <input
                  id="reporter-name"
                  type="text"
                  value={draft.reporterName}
                  onChange={(e) => updateDraft({ reporterName: e.target.value })}
                  placeholder="e.g. John Doe"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-sm font-semibold text-black transition bg-white dark:bg-slate-905 outline-none focus:ring-3 focus:ring-accent-500/30 focus:border-brand-500"
                />
              </div>

              {/* Phone Field */}
              <div className="space-y-1.5">
                <label htmlFor="reporter-phone" className="block text-xs font-bold text-brand-500/85 dark:text-accent-500/85">
                  {t('details.reporterPhone')}
                </label>
                <input
                  id="reporter-phone"
                  type="tel"
                  value={draft.reporterPhone}
                  onChange={(e) => {
                    updateDraft({ reporterPhone: e.target.value });
                    if (errors.phone) setErrors(prev => ({ ...prev, phone: null }));
                  }}
                  placeholder="e.g. 9876543210"
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm font-semibold text-black transition bg-white dark:bg-slate-905 outline-none focus:ring-3 focus:ring-accent-500/30
                    ${errors.phone 
                      ? 'border-rose-500 focus:ring-rose-50 dark:focus:ring-rose-950/20' 
                      : 'border-slate-200 dark:border-slate-800 focus:border-brand-500'
                    }
                  `}
                />
                {errors.phone && (
                  <p className="text-xs font-bold text-rose-650 flex items-center gap-1">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    {errors.phone}
                  </p>
                )}
              </div>
            </div>
          </div>
        </Card>

        {/* Navigation wizard controls */}
        <div className="flex items-center justify-between gap-4">
          <Button
            variant="secondary"
            onClick={() => setStep(0)}
            disabled={isSubmitting}
            icon={
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
              </svg>
            }
          >
            {t('details.back')}
          </Button>

          <Button
            type="submit"
            variant="primary"
            isLoading={isSubmitting}
            className="px-8"
          >
            {t('details.submit')}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default DetailsPage;
