import React from 'react';

/**
 * Premium container card component.
 */
export const Card = ({
  children,
  className = '',
  hoverable = false,
  onClick = null,
  id
}) => {
  const isClickable = !!onClick;
  
  const cardStyles = `
    glass-panel rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-800/40
    transition-all duration-300 ease-out
    ${hoverable ? 'hover:shadow-md hover:-translate-y-0.5 hover:border-slate-200 dark:hover:border-slate-700/60' : ''}
    ${isClickable ? 'cursor-pointer select-none active:scale-[0.99]' : ''}
    ${className}
  `;

  return (
    <div
      id={id}
      onClick={onClick}
      className={cardStyles}
    >
      {children}
    </div>
  );
};

export default Card;
