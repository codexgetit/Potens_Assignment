/**
 * Simple validators for reporting form inputs.
 */

export const validateDescription = (desc) => {
  if (!desc || typeof desc !== 'string') {
    return { isValid: false, errorKey: 'validation.descRequired' };
  }
  
  const trimmed = desc.trim();
  if (trimmed.length < 10) {
    return { isValid: false, errorKey: 'validation.descTooShort' };
  }
  
  return { isValid: true };
};

export const validateCategory = (categoryId) => {
  if (!categoryId) {
    return { isValid: false, errorKey: 'validation.categoryRequired' };
  }
  return { isValid: true };
};

export const validatePhone = (phone) => {
  if (!phone) {
    return { isValid: true }; // Optional field
  }
  
  const cleanPhone = phone.replace(/[\s-()]/g, '');
  const phoneRegex = /^[0-9]{10}$/; // Standard 10 digit phone check
  
  if (!phoneRegex.test(cleanPhone)) {
    return { isValid: false, errorKey: 'validation.phoneInvalid' };
  }
  
  return { isValid: true };
};
