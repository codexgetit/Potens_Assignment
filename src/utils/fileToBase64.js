/**
 * Converts a File object into a base64 encoded data URL string.
 * Returns a Promise that resolves to the base64 string.
 * 
 * @param {File} file - The file to convert
 */
export const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};
