import { useContext } from 'react';
import { ReportContext } from '../contexts/ReportContext';
import HomePage from '../pages/HomePage';
import DetailsPage from '../pages/DetailsPage';
import ConfirmationPage from '../pages/ConfirmationPage';
import ProgressStepper from '../components/ProgressStepper';
import LanguageToggle from '../components/LanguageToggle';

/**
 * App routing – switches between the homepage and reporting wizard.
 * Step 0 = Full Homepage (self-contained: navbar + hero + services + footer)
 * Step 1 = Details form (simple header + stepper)
 * Step 2 = Confirmation receipt (simple header + stepper)
 */
export const AppRoutes = () => {
  const { currentStep, setStep } = useContext(ReportContext);
  const navbarBgClass = 'bg-brand-600';

  // Homepage renders everything itself (no external Navbar)
  if (currentStep === 0) {
    return <HomePage />;
  }

  // Wizard pages get a simple header + stepper + content
  return (
    <>
      <header className={`${navbarBgClass} text-white shadow-md sticky top-0 z-40`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8" style={{ height: '60px' }}>
          <div className="flex items-center gap-2 cursor-pointer bg-white/95 px-3 py-1.5 rounded-lg shadow-xs" onClick={() => setStep(0)}>
            <img src="/logoDescribeIssue1.png" alt="Describe Issue Logo" className="h-[28px] object-contain" />
          </div>
          <LanguageToggle />
        </div>
      </header>

      <div className="flex flex-col bg-brand-50" style={{ minHeight: 'calc(100vh - 60px)' }}>
        <div className="bg-brand-50 border-b border-brand-100 shrink-0">
          <ProgressStepper currentStep={currentStep} />
        </div>
        <main className="flex-1 pb-12">
          {currentStep === 1 && <DetailsPage />}
          {currentStep === 2 && <ConfirmationPage />}
        </main>
      </div>
    </>
  );
};

export default AppRoutes;
