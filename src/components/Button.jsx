/**
 * A premium, reusable Button component.
 */
export const Button = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  isLoading = false,
  fullWidth = false,
  icon = null,
  className = '',
  id
}) => {
  // Styles for different variants
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 cursor-pointer select-none focus:outline-none focus:ring-3 focus:ring-[#95ccdd]/60 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100';
  
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-7 py-3.5 text-base'
  };

  const variantStyles = {
    primary: 'bg-[#4274d9] text-white hover:bg-[#293681] shadow-md shadow-[#95ccdd]/50 hover:shadow-lg',
    secondary: 'bg-[#d0e7e6] text-[#1f275f] hover:bg-[#95ccdd]/40 border border-[#95ccdd]',
    accent: 'bg-[#293681] text-white hover:bg-[#1f275f] shadow-md shadow-[#95ccdd]/40 hover:shadow-lg',
    outline: 'bg-transparent border border-[#4274d9] text-[#4274d9] hover:bg-[#eef6f8]',
    danger: 'bg-[#293681] text-white hover:bg-[#1f275f] shadow-md shadow-[#95ccdd]/40 hover:shadow-lg',
    text: 'bg-transparent text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-900/50'
  };

  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <button
      id={id}
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${widthStyle} ${className}`}
    >
      {isLoading ? (
        <svg className="animate-spin -ml-1 mr-2 h-4.5 w-4.5 text-current" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      ) : icon ? (
        <span className="mr-2 inline-flex items-center">{icon}</span>
      ) : null}
      {children}
    </button>
  );
};

export default Button;
