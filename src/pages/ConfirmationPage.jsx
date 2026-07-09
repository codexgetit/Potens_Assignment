import React, { useContext } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { ReportContext } from '../contexts/ReportContext';
import SuccessCard from '../components/SuccessCard';
import ReferenceCard from '../components/ReferenceCard';
import Button from '../components/Button';

/**
 * Confirmation Page.
 * Displays Success feedback card, reference official ticket, and reset reporting button.
 */
export const ConfirmationPage = () => {
  const { t } = useLanguage();
  const { draft, resetReport } = useContext(ReportContext);

  return (
    <div className="mx-auto max-w-xl px-4 py-8 sm:px-6 lg:px-8 space-y-6 animate-fade-in">
      {/* Dynamic Success Check block */}
      <SuccessCard />

      {/* Official ticket receipt showing all finalized draft data */}
      <ReferenceCard draft={draft} />

      {/* Action choices button panel */}
      <div className="pt-2">
        <Button
          onClick={resetReport}
          variant="primary"
          fullWidth
          size="lg"
          icon={
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
            </svg>
          }
        >
          {t('confirmation.newReport')}
        </Button>
      </div>
    </div>
  );
};

export default ConfirmationPage;
