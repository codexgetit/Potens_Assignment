import React from 'react';

/**
 * Animated Loading spinner/overlay.
 */
export const Loader = ({
  message = '',
  overlay = false
}) => {
  const content = (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="relative flex items-center justify-center">
        {/* Outer glowing pulsing ring */}
        <div className="absolute w-12 h-12 rounded-full border-4 border-indigo-100 dark:border-indigo-950 animate-pulse-slow"></div>
        {/* Spinning indicator */}
        <div className="w-12 h-12 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin"></div>
      </div>
      {message && (
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400 animate-pulse">
          {message}
        </p>
      )}
    </div>
  );

  if (overlay) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs">
        <div className="glass-panel p-8 rounded-2xl shadow-xl max-w-xs w-full mx-4">
          {content}
        </div>
      </div>
    );
  }

  return <div className="py-8">{content}</div>;
};

export default Loader;
