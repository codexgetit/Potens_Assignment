/**
 * Formats a date string or timestamp in a human-readable format.
 * Supports locale styling for English and Hindi.
 * 
 * @param {string|number|Date} dateVal - Date to format
 * @param {string} locale - 'en' or 'hi'
 */
export const formatDate = (dateVal, locale = 'en') => {
  if (!dateVal) return '';
  const date = new Date(dateVal);
  
  if (isNaN(date.getTime())) return '';

  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  };

  try {
    return date.toLocaleDateString(locale === 'hi' ? 'hi-IN' : 'en-US', options);
  } catch (e) {
    // Fallback if locale is unsupported
    return date.toLocaleString();
  }
};
