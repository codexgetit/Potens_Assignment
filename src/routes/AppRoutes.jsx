import React, { useContext } from 'react';
import { ReportContext } from '../contexts/ReportContext';
import HomePage from '../pages/HomePage';
import DetailsPage from '../pages/DetailsPage';
import ConfirmationPage from '../pages/ConfirmationPage';
import ProgressStepper from '../components/ProgressStepper';
import Navbar from '../components/Navbar';

/**
 * App routing – switches between the homepage and reporting wizard.
 * Step 0 = Full CiviCare Homepage (self-contained: navbar + hero + services + footer)
 * Step 1 = Details form (separate Navbar + stepper)
 * Step 2 = Confirmation receipt (separate Navbar + stepper)
 */
export const AppRoutes = () => {
  const { currentStep } = useContext(ReportContext);

  // Homepage renders everything itself (no external Navbar)
  if (currentStep === 0) {
    return <HomePage />;
  }

  // Wizard pages get the shared Navbar + stepper + centered content
  return (
    <>
      <Navbar />
      <div className="flex flex-col min-h-[calc(100vh-70px)] bg-[#f5f8fb]">
        <div className="bg-white border-b border-slate-200 shrink-0">
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
