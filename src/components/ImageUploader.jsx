import React, { useState, useRef } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { compressImage } from '../utils/compressImage';
import { fileToBase64 } from '../utils/fileToBase64';

/**
 * Image uploader supporting Drag and Drop, client-side canvas compression, and base64 conversion.
 */
export const ImageUploader = ({
  imageValue = null,
  onImageChange,
  id
}) => {
  const { t } = useLanguage();
  const [isDragActive, setIsDragActive] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef(null);

  const processFile = async (file) => {
    if (!file) return;
    
    // Only accept images
    if (!file.type.startsWith('image/')) {
      alert('Only image files are allowed.');
      return;
    }

    setIsProcessing(true);
    try {
      // 1. Compress Image Canvas-side
      const compressedFile = await compressImage(file, 800, 800, 0.7);
      
      // 2. Convert compressed File to Base64 String
      const base64Str = await fileToBase64(compressedFile);
      
      // 3. Callback update
      onImageChange(base64Str);
    } catch (e) {
      console.error('Failed to compress and load image:', e);
      alert('Failed to process image. Please try another photo.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true);
    } else if (e.type === 'dragleave') {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const triggerSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    onImageChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-bold text-slate-700 dark:text-slate-350 mb-2">
        {t('details.imageUpload')}
      </label>
      
      <input
        ref={fileInputRef}
        type="file"
        id={id}
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {imageValue ? (
        /* Image Preview State */
        <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-md group h-56 w-full">
          <img
            src={imageValue}
            alt="Complaint Attachment"
            className="w-full h-full object-cover"
          />
          {/* Overlay gradient & delete button */}
          <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <button
              type="button"
              onClick={handleRemove}
              className="p-3 bg-rose-650 hover:bg-rose-700 rounded-full text-white shadow-lg transform translate-y-2 group-hover:translate-y-0 transition duration-300 cursor-pointer"
              title="Remove image"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      ) : (
        /* Empty Upload Zone State */
        <div
          onClick={triggerSelect}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          className={`flex flex-col items-center justify-center border-2 border-dashed rounded-2xl p-6 h-48 text-center cursor-pointer transition-all duration-300 select-none
            ${isDragActive
              ? 'border-[#1a56db] bg-[#eff6ff] dark:bg-indigo-950/10'
              : 'border-slate-300 dark:border-slate-800 hover:border-[#1a56db] bg-slate-50/50 dark:bg-slate-900/10 hover:bg-slate-50 dark:hover:bg-slate-900/30'
            }
          `}
        >
          {isProcessing ? (
            <div className="flex flex-col items-center justify-center space-y-3">
              <svg className="animate-spin h-8 w-8 text-[#1a56db]" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                {t('details.compressing')}
              </p>
            </div>
          ) : (
            <>
              {/* Upload Cloud Icon */}
              <span className="p-2.5 bg-white dark:bg-slate-850 rounded-xl shadow-sm border border-slate-100 dark:border-slate-850 mb-2.5 text-slate-400">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </span>
              <p className="text-sm font-bold text-slate-850 dark:text-slate-200">
                Drag photos here or <span className="text-[#1a56db] hover:underline">browse photos</span>
              </p>
              <p className="text-[11px] text-slate-450 dark:text-slate-500 mt-0.5">
                {t('details.imageHelper')}
              </p>
            </>
          )}
        </div>
      )}

      {/* Checklist Tips below uploader */}
      <div className="mt-3.5 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-bold">
        <div className="space-y-1.5">
          <p className="text-emerald-650 flex items-start gap-1.5 leading-tight">
            <span className="shrink-0 text-xs font-black">✓</span>
            Reports with photos tend to get fixed more quickly
          </p>
          <p className="text-emerald-650 flex items-start gap-1.5 leading-tight">
            <span className="shrink-0 text-xs font-black">✓</span>
            For best results include a close-up and a wide shot
          </p>
        </div>
        <p className="text-rose-650 flex items-start gap-1.5 leading-tight sm:justify-self-end">
          <span className="shrink-0 text-xs font-black">✖</span>
          Avoid personal info & number plates
        </p>
      </div>
    </div>
  );
};

export default ImageUploader;
