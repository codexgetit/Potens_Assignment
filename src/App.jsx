import React from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import { ReportProvider } from './contexts/ReportContext';
import AppRoutes from './routes/AppRoutes';

export const App = () => {
  return (
    <LanguageProvider>
      <ReportProvider>
        <div className="min-h-screen bg-white text-slate-900 flex flex-col">
          {/* AppRoutes handles its own Navbar per page */}
          <AppRoutes />
        </div>
      </ReportProvider>
    </LanguageProvider>
  );
};

export default App;