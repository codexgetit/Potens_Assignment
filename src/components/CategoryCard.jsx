import React from 'react';

/**
 * Card for category item.
 * Supports dark/light mode highlights and dynamic gradients.
 */
export const CategoryCard = ({
  category,
  onClick,
  title,
  desc,
  selected = false
}) => {
  const { colorClass, bgClass, iconColor, svgPath } = category;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative flex flex-col text-left p-5 rounded-2xl border transition-all duration-300 w-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 dark:focus:ring-offset-slate-900
        ${selected 
          ? 'border-indigo-600 ring-1 ring-indigo-600 bg-white dark:bg-slate-900 shadow-md translate-y-[-2px]' 
          : `${bgClass} hover:translate-y-[-2px] hover:shadow-md hover:border-slate-350 dark:hover:border-slate-700/60`
        }
      `}
    >
      {/* Dynamic Gradient glow behind icon */}
      <div className={`absolute top-5 right-5 w-12 h-12 rounded-xl bg-gradient-to-br ${colorClass} opacity-10 group-hover:opacity-20 transition-opacity duration-300`} />

      {/* SVG Icon Container */}
      <span className={`inline-flex items-center justify-center p-3 rounded-xl bg-white dark:bg-slate-900/60 shadow-sm border border-slate-100 dark:border-slate-800/40 group-hover:scale-105 transition-transform duration-300 ${iconColor}`}>
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={svgPath} />
        </svg>
      </span>

      {/* Text Info */}
      <h3 className="mt-4 font-display text-base font-bold text-slate-850 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
        {title}
      </h3>
      <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
        {desc}
      </p>
    </button>
  );
};

export default CategoryCard;
