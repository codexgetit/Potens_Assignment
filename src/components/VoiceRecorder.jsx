import React, { useState, useEffect } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';

/**
 * Voice dictation recorder module utilizing the Web Speech API.
 * Animates waveform and appends spoken text to description.
 */
export const VoiceRecorder = ({
  onTranscriptChange,
  id
}) => {
  const { t, language } = useLanguage();
  const [speechLang, setSpeechLang] = useState(language); // defaults to current app language
  const {
    isListening,
    transcript,
    error,
    supported,
    startListening,
    stopListening,
    resetTranscript
  } = useSpeechRecognition();

  // Sync speech language when app language changes
  useEffect(() => {
    setSpeechLang(language);
  }, [language]);

  // Feed new transcription to description field
  useEffect(() => {
    if (transcript) {
      onTranscriptChange(transcript);
    }
  }, [transcript]);

  const handleToggleRecord = () => {
    if (isListening) {
      stopListening();
    } else {
      // Start fresh or build upon existing
      resetTranscript();
      startListening(speechLang);
    }
  };

  if (!supported) {
    return (
      <div className="rounded-2xl border border-rose-100 dark:border-rose-950/20 bg-rose-50/50 dark:bg-rose-950/5 p-4 flex gap-3 text-rose-700 dark:text-rose-400">
        <svg className="h-5 w-5 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <div className="text-xs font-semibold">
          <p>{t('details.voiceUnsupported')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-900/10 p-5" id={id}>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold text-slate-800 dark:text-slate-250 flex items-center gap-1.5">
            {/* Mic icon */}
            <svg className="h-4.5 w-4.5 text-indigo-650" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
            {t('details.voiceRecord')}
          </h4>
          <p className="text-[11px] text-slate-450 dark:text-slate-500 mt-0.5 leading-relaxed font-medium">
            {t('details.voiceHelper')}
          </p>
        </div>

        {/* Dictation Speaking Language Selector */}
        <div className="flex bg-white dark:bg-slate-800 p-0.5 rounded-lg border border-slate-150 dark:border-slate-700/60 shadow-sm shrink-0">
          <button
            type="button"
            disabled={isListening}
            onClick={() => setSpeechLang('en')}
            className={`px-2 py-1 text-[10px] font-bold rounded-md transition ${
              speechLang === 'en'
                ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400'
                : 'text-slate-400 hover:text-slate-650'
            }`}
          >
            EN
          </button>
          <button
            type="button"
            disabled={isListening}
            onClick={() => setSpeechLang('hi')}
            className={`px-2 py-1 text-[10px] font-bold rounded-md transition ${
              speechLang === 'hi'
                ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400'
                : 'text-slate-400 hover:text-slate-650'
            }`}
          >
            हिं
          </button>
        </div>
      </div>

      {/* Recording status triggers */}
      <div className="mt-4 flex items-center gap-4">
        {/* Rounded dictation mic clicker */}
        <button
          type="button"
          onClick={handleToggleRecord}
          className={`flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300 shadow-md cursor-pointer border
            ${isListening
              ? 'bg-rose-600 border-rose-700 text-white animate-pulse shadow-rose-200'
              : 'bg-indigo-600 border-indigo-700 text-white shadow-indigo-200 hover:bg-indigo-700'
            }
          `}
        >
          {isListening ? (
            /* Stop Square */
            <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
              <path d="M6 19h12V5H6v14z" />
            </svg>
          ) : (
            /* Record Mic */
            <svg className="h-5.5 w-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
          )}
        </button>

        {/* Dictation Listening waves or status */}
        <div className="flex-1">
          {isListening ? (
            <div className="flex items-center gap-3">
              {/* Sound waves container */}
              <div className="flex items-center h-8">
                <span className="wave-bar" />
                <span className="wave-bar" />
                <span className="wave-bar" />
                <span className="wave-bar" />
                <span className="wave-bar" />
                <span className="wave-bar" />
                <span className="wave-bar" />
                <span className="wave-bar" />
              </div>
              <span className="text-xs font-bold text-rose-600 dark:text-rose-450 animate-pulse">
                {t('details.voiceListening')} ({speechLang === 'hi' ? 'Hindi' : 'English'})
              </span>
            </div>
          ) : (
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              {t('details.voiceReady')}
            </span>
          )}
        </div>
      </div>

      {error && (
        <div className="mt-3 text-[10px] font-bold text-rose-600 bg-rose-50 dark:bg-rose-950/20 px-3 py-1.5 rounded-lg border border-rose-100 dark:border-rose-900/30">
          Speech error: {error}
        </div>
      )}
    </div>
  );
};

export default VoiceRecorder;
