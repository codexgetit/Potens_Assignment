import React, { createContext, useState, useEffect } from 'react';
import { generateReference } from '../utils/generateReference';

export const ReportContext = createContext(null);

const INITIAL_DRAFT = {
  categoryId: null,
  description: '',
  image: null, // Base64 string of compressed image
  reporterName: '',
  reporterPhone: '',
  referenceId: null,
  timestamp: null
};

export const ReportProvider = ({ children }) => {
  // Navigation wizard step (0: Category Selection, 1: Details Form, 2: Confirmation Receipt)
  const [currentStep, setCurrentStep] = useState(0);

  // Active report being filled
  const [draft, setDraft] = useState(() => {
    const savedDraft = localStorage.getItem('potens_draft');
    return savedDraft ? JSON.parse(savedDraft) : { ...INITIAL_DRAFT };
  });

  // History of all submitted reports
  const [submittedReports, setSubmittedReports] = useState(() => {
    const savedHistory = localStorage.getItem('potens_history');
    return savedHistory ? JSON.parse(savedHistory) : [];
  });

  // Sync draft to localStorage on change
  useEffect(() => {
    localStorage.setItem('potens_draft', JSON.stringify(draft));
  }, [draft]);

  // Sync history to localStorage on change
  useEffect(() => {
    localStorage.setItem('potens_history', JSON.stringify(submittedReports));
  }, [submittedReports]);

  // Actions
  const setCategory = (categoryId) => {
    setDraft(prev => ({ ...prev, categoryId }));
    setCurrentStep(1); // Auto-advance to details step when category is clicked
  };

  const updateDraft = (fields) => {
    setDraft(prev => ({ ...prev, ...fields }));
  };

  const setStep = (step) => {
    setCurrentStep(step);
  };

  const submitReport = () => {
    if (!draft.categoryId || !draft.description.trim()) {
      return { success: false, error: 'Category and description are required.' };
    }

    const refId = generateReference();
    const timestamp = Date.now();
    
    const finalizedReport = {
      ...draft,
      referenceId: refId,
      timestamp
    };

    // Save finalized report to history
    setSubmittedReports(prev => [finalizedReport, ...prev]);

    // Keep the details of the submitted report in the draft momentarily for the Success/Confirmation page
    setDraft(finalizedReport);
    
    // Clear the active editing state from localStorage draft, keeping the finalized info only
    localStorage.removeItem('potens_draft');

    // Go to step 2 (Success/Confirmation)
    setCurrentStep(2);
    return { success: true, referenceId: refId };
  };

  const resetReport = () => {
    setDraft({ ...INITIAL_DRAFT });
    setCurrentStep(0);
  };

  const clearHistory = () => {
    setSubmittedReports([]);
    localStorage.removeItem('potens_history');
  };

  const deleteReport = (refId) => {
    setSubmittedReports(prev => prev.filter(r => r.referenceId !== refId));
  };

  return (
    <ReportContext.Provider value={{
      currentStep,
      setStep,
      draft,
      setCategory,
      updateDraft,
      submitReport,
      resetReport,
      submittedReports,
      clearHistory,
      deleteReport
    }}>
      {children}
    </ReportContext.Provider>
  );
};
