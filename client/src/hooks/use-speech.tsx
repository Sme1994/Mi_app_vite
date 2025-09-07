import { useCallback, useEffect, useState } from 'react';
import { useLanguage } from './use-language';

interface SpeechOptions {
  rate?: number;
  pitch?: number;
  volume?: number;
}

export function useSpeech() {
  const { language } = useLanguage();
  const [isSupported, setIsSupported] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  const playBingSound = useCallback(() => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // Create a pleasant two-tone chime
      const playTone = (frequency: number, startTime: number, duration: number) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(frequency, startTime);
        oscillator.type = 'sine';
        
        // Envelope for smooth sound
        gainNode.gain.setValueAtTime(0, startTime);
        gainNode.gain.linearRampToValueAtTime(0.3, startTime + 0.05);
        gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
        
        oscillator.start(startTime);
        oscillator.stop(startTime + duration);
      };
      
      // Two-tone chime: high tone followed by lower tone
      const currentTime = audioContext.currentTime;
      playTone(800, currentTime, 0.3); // High tone
      playTone(600, currentTime + 0.3, 0.4); // Lower tone
      
    } catch (error) {
      console.warn('Could not play bing sound:', error);
    }
  }, []);

  useEffect(() => {
    if ('speechSynthesis' in window) {
      setIsSupported(true);
      
      const loadVoices = () => {
        const availableVoices = speechSynthesis.getVoices();
        setVoices(availableVoices);
      };

      loadVoices();
      speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  const speak = useCallback((text: string, options: SpeechOptions = {}) => {
    if (!isSupported || !text) return;

    // Cancel any ongoing speech
    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Set language code based on app language with Latin American Spanish preference
    const languageCode = language === 'en' ? 'en-US' : 
                        language === 'es' ? 'es-MX' : // Prefer Latin American Spanish
                        language === 'pt' ? 'pt-BR' : 
                        language === 'fr' ? 'fr-FR' : 'en-US';
    
    utterance.lang = languageCode;

    // Find voices that match the current language with specific regional priorities
    let languageVoices = voices.filter(voice => {
      if (language === 'es') {
        // Prioritize Mexican Spanish voices specifically
        return voice.lang === 'es-MX' || voice.lang === 'es-US' || voice.lang === 'es-419' || 
               voice.lang.includes('MX') || voice.lang.includes('Mexico') || voice.lang.includes('mexican') ||
               voice.lang === 'es-AR' || voice.lang === 'es-CO' || voice.lang === 'es-CL' || voice.lang === 'es-PE' ||
               voice.lang.includes('US') || voice.lang.includes('AR') || voice.lang.includes('CO') || 
               voice.lang.includes('CL') || voice.lang.includes('PE') || voice.lang.startsWith('es');
      }
      
      if (language === 'en') {
        // Prioritize US English voices specifically
        return voice.lang === 'en-US' || voice.lang.includes('US') || voice.lang.includes('United States') ||
               voice.lang.includes('America') || voice.lang.includes('american') ||
               voice.lang === 'en-CA' || voice.lang.includes('CA') || // North American English
               voice.lang.startsWith('en');
      }
      
      // Match exact language code or specific language variants for other languages
      return voice.lang === languageCode || 
             voice.lang.startsWith(language) ||
             (language === 'pt' && (voice.lang.startsWith('pt') || voice.lang.includes('BR') || voice.lang.includes('PT'))) ||
             (language === 'fr' && (voice.lang.startsWith('fr') || voice.lang.includes('FR') || voice.lang.includes('CA')));
    });

    // Sort voices to prioritize regional variants
    if (language === 'es') {
      languageVoices.sort((a, b) => {
        const mexicanCodes = ['es-MX', 'MX', 'Mexico', 'mexican'];
        const aIsMexican = mexicanCodes.some(code => a.lang.includes(code) || a.name.toLowerCase().includes(code.toLowerCase()));
        const bIsMexican = mexicanCodes.some(code => b.lang.includes(code) || b.name.toLowerCase().includes(code.toLowerCase()));
        
        if (aIsMexican && !bIsMexican) return -1;
        if (!aIsMexican && bIsMexican) return 1;
        
        // Secondary preference for other Latin American variants
        const latinCodes = ['es-US', 'es-419', 'es-AR', 'es-CO', 'es-CL', 'es-PE'];
        const aIsLatin = latinCodes.some(code => a.lang.includes(code.split('-')[1]));
        const bIsLatin = latinCodes.some(code => b.lang.includes(code.split('-')[1]));
        
        if (aIsLatin && !bIsLatin) return -1;
        if (!aIsLatin && bIsLatin) return 1;
        return 0;
      });
    }
    
    if (language === 'en') {
      languageVoices.sort((a, b) => {
        const americanCodes = ['en-US', 'US', 'United States', 'America', 'american'];
        const aIsAmerican = americanCodes.some(code => a.lang.includes(code) || a.name.toLowerCase().includes(code.toLowerCase()));
        const bIsAmerican = americanCodes.some(code => b.lang.includes(code) || b.name.toLowerCase().includes(code.toLowerCase()));
        
        if (aIsAmerican && !bIsAmerican) return -1;
        if (!aIsAmerican && bIsAmerican) return 1;
        
        // Secondary preference for North American English (Canadian)
        const northAmericanCodes = ['en-CA', 'CA', 'Canada'];
        const aIsNorthAmerican = northAmericanCodes.some(code => a.lang.includes(code));
        const bIsNorthAmerican = northAmericanCodes.some(code => b.lang.includes(code));
        
        if (aIsNorthAmerican && !bIsNorthAmerican) return -1;
        if (!aIsNorthAmerican && bIsNorthAmerican) return 1;
        return 0;
      });
    }

    // Filter for female voices within the language voices with better detection
    const femaleVoices = languageVoices.filter(voice => {
      const voiceName = voice.name.toLowerCase();
      
      // Language-specific female voice patterns
      const englishFemaleNames = ['samantha', 'serena', 'victoria', 'sophia', 'allison', 'ava', 'susan', 'karen', 'moira', 'tessa', 'veena', 'fiona', 'kate', 'alice', 'emma', 'grace', 'heather', 'jennifer', 'linda', 'melissa', 'nicole', 'olivia', 'rachel', 'sarah', 'tiffany', 'zoe', 'jessica', 'ashley', 'brittany', 'amanda', 'stephanie', 'michelle', 'christina', 'kimberly', 'amy', 'angela', 'brenda', 'emma', 'madison', 'hannah', 'taylor', 'megan', 'jasmine', 'destiny', 'sydney', 'courtney', 'morgan', 'alexis', 'lauren', 'danielle', 'amber', 'mary', 'elizabeth', 'anna', 'margaret', 'helen', 'dorothy', 'lisa', 'nancy', 'karen', 'betty', 'sandra', 'donna', 'carol', 'ruth', 'sharon', 'michelle', 'laura', 'emily', 'kimberly', 'deborah', 'dorothy', 'amy', 'angela', 'us', 'usa', 'american', 'america', 'united states'];
      
      const spanishFemaleNames = ['monica', 'carmen', 'maria', 'lucia', 'isabel', 'esperanza', 'pilar', 'elena', 'cristina', 'alejandra', 'beatriz', 'dolores', 'fernanda', 'guadalupe', 'ines', 'josefina', 'leticia', 'marisol', 'natalia', 'patricia', 'rosario', 'soledad', 'veronica', 'ximena', 'sofia', 'valeria', 'camila', 'valentina', 'andrea', 'daniela', 'gabriela', 'paola', 'carolina', 'adriana', 'mariana', 'claudia', 'sandra', 'martha', 'diana', 'rosa', 'ana', 'silvia', 'lourdes', 'gloria', 'blanca', 'yolanda', 'teresa', 'juanita', 'paulina', 'karina', 'azucena', 'araceli', 'concepcion', 'remedios', 'refugio', 'socorro', 'amparo', 'mercedes', 'consuelo', 'maricela', 'nayeli', 'itzel', 'xochitl', 'citlali', 'frida', 'alma', 'esperanza', 'luz', 'lupe', 'chelo', 'chela', 'lupita', 'mexican', 'mexico'];
      
      const portugueseFemaleNames = ['joana', 'luciana', 'catarina', 'ana', 'beatriz', 'camila', 'daniela', 'eduarda', 'fernanda', 'gabriela', 'helena', 'isabela', 'julia', 'larissa', 'mariana', 'natalia', 'patricia', 'rafaela', 'sabrina', 'tatiana', 'viviane'];
      
      const frenchFemaleNames = ['claire', 'julie', 'audrey', 'celine', 'amelie', 'brigitte', 'caroline', 'delphine', 'emmanuelle', 'florence', 'genevieve', 'helene', 'isabelle', 'jacqueline', 'louise', 'madeleine', 'nathalie', 'odette', 'pascale', 'sylvie', 'valerie'];
      
      // Check for explicit female indicators
      const explicitFemale = voiceName.includes('female') || voiceName.includes('woman') || voiceName.includes('femme');
      
      // Check for language-specific female names
      const isNamedFemale = [...englishFemaleNames, ...spanishFemaleNames, ...portugueseFemaleNames, ...frenchFemaleNames].some(name => voiceName.includes(name));
      
      // Check for quality indicators (often female voices)
      const hasQualityIndicator = voiceName.includes('enhanced') || voiceName.includes('premium') || voiceName.includes('natural') || voiceName.includes('neural') || voiceName.includes('melodic') || voiceName.includes('expressive');
      
      // Exclude explicitly male voices
      const isNotMale = !voiceName.includes('male') && 
                       !voiceName.includes('man') &&
                       !voiceName.includes('masculin') &&
                       !voiceName.includes('homme') &&
                       !voiceName.includes('hombre') &&
                       !voiceName.includes('homem');
      
      return (explicitFemale || isNamedFemale || (hasQualityIndicator && isNotMale)) && isNotMale;
    });

    // Set voice priority: 1) Female voice in language, 2) Any voice in language, 3) Female voice in any language
    if (femaleVoices.length > 0) {
      utterance.voice = femaleVoices[0];
    } else if (languageVoices.length > 0) {
      utterance.voice = languageVoices[0];
    } else {
      // Fallback to any female voice
      const fallbackFemaleVoices = voices.filter(voice => {
        const voiceName = voice.name.toLowerCase();
        return voiceName.includes('female') || 
               voiceName.includes('woman') ||
               (!voiceName.includes('male') && !voiceName.includes('man'));
      });
      
      if (fallbackFemaleVoices.length > 0) {
        utterance.voice = fallbackFemaleVoices[0];
      }
    }

    // Set speech parameters with natural language-specific adjustments
    const naturalParams = {
      en: { rate: 0.88, pitch: 0.98, volume: 0.88 }, // Clear American English - professional but warm
      es: { rate: 0.72, pitch: 0.95, volume: 0.92 }, // Mexican Spanish - slower, warmer tone
      pt: { rate: 0.85, pitch: 1.05, volume: 0.9 }, // Warm Portuguese tone
      fr: { rate: 0.88, pitch: 1.15, volume: 0.85 } // Elegant French intonation
    };
    
    const params = naturalParams[language] || naturalParams.en;
    utterance.rate = options.rate || params.rate;
    utterance.pitch = options.pitch || params.pitch;
    utterance.volume = options.volume || params.volume;

    // Play bing sound before announcement
    playBingSound();
    
    // Delay the speech slightly to let the bing sound finish
    setTimeout(() => {
      speechSynthesis.speak(utterance);
    }, 800); // Wait for the bing sound to complete
  }, [isSupported, voices, language, playBingSound]);

  const stop = useCallback(() => {
    if (isSupported) {
      speechSynthesis.cancel();
    }
  }, [isSupported]);

  return {
    speak,
    stop,
    isSupported,
    voices,
    playBingSound
  };
}