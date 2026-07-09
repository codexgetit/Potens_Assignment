/**
 * Generates a unique, professional reference ID for a civic issue report.
 * Format: POTENS-YYYYMMDD-[5 random alphanumeric characters]
 */
export const generateReference = () => {
  const prefix = 'POTENS';
  
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const dateStr = `${year}${month}${day}`;
  
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Excluded similar looking chars like 1, I, 0, O
  let randomStr = '';
  for (let i = 0; i < 5; i++) {
    randomStr += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  return `${prefix}-${dateStr}-${randomStr}`;
};
