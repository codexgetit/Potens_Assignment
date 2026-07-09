import { useState, useEffect, useRef } from 'react';
import speechService from '../services/speech.service';

/**
 * Hook for speech recognition in React components.
 */
export const useSpeechRecognition = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState(null);
  const [supported, setSupported] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    const isSupported = speechService.isSupported();
    setSupported(isSupported);
    
    if (isSupported) {
      const SpeechConstructor = speechService.getConstructor();
      const rec = new SpeechConstructor();
      rec.continuous = true;
      rec.interimResults = true;
      recognitionRef.current = rec;
    }
  }, []);

  const startListening = (lang = 'en') => {
    if (!supported || !recognitionRef.current) return;
    
    setError(null);
    const rec = recognitionRef.current;
    rec.lang = speechService.getLocaleCode(lang);
    
    rec.onstart = () => {
      setIsListening(true);
    };

    rec.onresult = (event) => {
      let finalTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        }
      }
      
      if (finalTranscript) {
        setTranscript(prev => {
          const space = prev ? ' ' : '';
          return prev + space + finalTranscript.trim();
        });
      }
    };

    rec.onerror = (event) => {
      // Ignore 'no-speech' error to prevent interrupting UI flow
      if (event.error !== 'no-speech') {
        setError(event.error);
      }
      setIsListening(false);
    };

    rec.onend = () => {
      setIsListening(false);
    };

    try {
      rec.start();
    } catch (e) {
      console.warn('Speech recognition start call error:', e);
      // Already running or failed
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        console.warn('Speech recognition stop call error:', e);
      }
      setIsListening(false);
    }
  };

  const resetTranscript = () => {
    setTranscript('');
  };

  return {
    isListening,
    transcript,
    setTranscript,
    error,
    supported,
    startListening,
    stopListening,
    resetTranscript
  };
};

export default useSpeechRecognition;
