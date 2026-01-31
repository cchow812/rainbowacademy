
import React, { useState, useEffect, useMemo } from 'react';
import { Lesson, Phrase } from '../types';

interface PhraseSectionProps {
  lesson: Lesson;
  onBack: () => void;
  onComplete: () => void;
}

const PhraseSection: React.FC<PhraseSectionProps> = ({ lesson, onBack, onComplete }) => {
  const [activePhraseIndex, setActivePhraseIndex] = useState(0);
  const [placedIndices, setPlacedIndices] = useState<number[]>([]); // Indices into the scrambled pool
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const activePhrase = lesson.phrases[activePhraseIndex];

  // Scramble the characters of the current phrase
  // Explicitly depend on activePhraseIndex to ensure re-scramble only when word changes
  const scrambledPool = useMemo(() => {
    if (!activePhrase) return [];
    return activePhrase.text
      .split('')
      .map((char, originalIndex) => ({ char, originalIndex }))
      .sort(() => Math.random() - 0.5);
  }, [activePhraseIndex, lesson.id]);

  // Reset state when phrase changes (Safety fallback)
  useEffect(() => {
    setPlacedIndices([]);
    setIsSuccess(false);
    setIsError(false);
  }, [activePhraseIndex]);

  const handleTileClick = (poolIndex: number) => {
    if (isSuccess || isError) return;

    // If already placed, remove it
    if (placedIndices.includes(poolIndex)) {
      setPlacedIndices(prev => prev.filter(idx => idx !== poolIndex));
      setIsError(false);
      return;
    }

    // Add to placed
    const newPlaced = [...placedIndices, poolIndex];
    setPlacedIndices(newPlaced);

    // Check if phrase is complete
    if (newPlaced.length === activePhrase.text.length) {
      const currentText = newPlaced
        .map(idx => scrambledPool[idx]?.char || '')
        .join('');
        
      if (currentText === activePhrase.text) {
        setIsSuccess(true);
        speak(activePhrase.text);
      } else {
        setIsError(true);
        // Buzz effect and clear after a bit
        setTimeout(() => {
          setIsError(false);
          setPlacedIndices([]);
        }, 1000);
      }
    }
  };

  const speak = (txt: string) => {
    try {
      window.speechSynthesis.cancel();
      
      const s = new SpeechSynthesisUtterance(txt);
      const targetLang = 'zh-HK';
      s.lang = targetLang;

      // iOS 18 fix: Manually find a voice that matches the lang
      const voices = window.speechSynthesis.getVoices();
      const voice = voices.find(v => v.lang.includes(targetLang));
      if (voice) s.voice = voice;

      // Essential for iOS: set volume and rate explicitly
      s.volume = 1; 
      s.rate = 1;

      window.speechSynthesis.speak(s);
    } catch (e) {
      console.error("Speech error", e);
    }
  };

  const nextPhrase = () => {
    if (activePhraseIndex + 1 < lesson.phrases.length) {
      // Synchronous reset of order state before index change to prevent out-of-bounds access in the next frame
      setPlacedIndices([]);
      setIsSuccess(false);
      setIsError(false);
      setActivePhraseIndex(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  if (!activePhrase) return null;

  return (
    <div className="w-full h-full flex flex-col items-center bg-[#fffdf0] relative overflow-hidden">
      {/* Back Button */}
      <button onClick={onBack} className="absolute top-4 left-4 z-50 w-12 h-12 bg-white border-4 border-[#ffedf0] rounded-2xl shadow-lg flex items-center justify-center hover:bg-gray-50 active:scale-95 transition-all">
        <span className="text-2xl">⬅️</span>
      </button>

      {/* Success Modal */}
      {isSuccess && (
        <div className="absolute inset-0 z-[100] bg-white/95 flex flex-col items-center justify-center p-6 animate-in zoom-in duration-300">
           <div className="text-9xl mb-6 animate-bounce">🎊🌈✨</div>
           <h2 className="text-4xl font-black rainbow-text mb-2 text-center">太棒了！</h2>
           <p className="text-2xl font-bold text-gray-600 mb-2 text-center">你組成了詞語：</p>
           <h3 className="text-6xl font-black text-pink-500 mb-8">{activePhrase.text}</h3>
           <div className="text-center mb-8">
              <p className="text-xl font-bold text-gray-400 italic">"{activePhrase.meaning}"</p>
           </div>
           <button 
             onClick={nextPhrase}
             className="px-12 py-4 bg-gradient-to-r from-orange-400 to-pink-400 text-white rounded-[2.5rem] font-black text-2xl shadow-2xl hover:scale-105 active:scale-95 transition-all border-4 border-white"
           >
             下一組挑戰 🚀
           </button>
        </div>
      )}

      {/* Header Info */}
      <div className="w-full flex flex-col items-center pt-10 px-4 shrink-0">
        <span className="text-xs font-black text-orange-400 uppercase tracking-widest mb-1">詞語拼拼樂 Word Puzzle</span>
        <div className="text-center mt-4 mb-8">
          <p className="text-3xl font-black text-gray-800 mb-1">{activePhrase.meaning}</p>
          <p className="text-sm font-bold text-gray-400">{activePhrase.jyutping} | {activePhrase.pinyin}</p>
          <button onClick={() => speak(activePhrase.text)} className="mt-2 text-2xl hover:scale-110 active:scale-90 transition-transform">🔊</button>
        </div>
      </div>

      {/* Target Slots Area */}
      <div className={`flex-1 w-full max-w-[500px] flex flex-col items-center justify-center p-6 transition-all ${isError ? 'animate-shake' : ''}`}>
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {activePhrase.text.split('').map((_, idx) => {
            const placedIdx = placedIndices[idx];
            // Safety check: ensure the index refers to a valid pool item even during render transitions
            const poolItem = (placedIdx !== undefined && scrambledPool) ? scrambledPool[placedIdx] : null;
            const char = poolItem?.char || null;
            
            return (
              <div 
                key={idx}
                onClick={() => char && handleTileClick(placedIdx)}
                className={`w-16 h-16 sm:w-20 sm:h-20 rounded-[1.5rem] border-4 flex items-center justify-center text-3xl sm:text-4xl font-black transition-all shadow-lg relative ${
                  char 
                    ? 'border-orange-400 bg-white text-gray-800 scale-100 cursor-pointer active:scale-95' 
                    : 'border-dashed border-gray-200 bg-gray-50/50 text-transparent'
                } ${isError ? 'border-red-400 bg-red-50' : ''}`}
              >
                {char}
                {char && (
                   <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-400 text-white rounded-full flex items-center justify-center text-[10px] shadow-sm">✕</div>
                )}
              </div>
            );
          })}
        </div>

        {/* Character Pool */}
        <div className="bg-white/40 p-6 rounded-[2.5rem] border-4 border-white/60 shadow-inner w-full">
           <p className="text-center text-xs font-black text-gray-400 uppercase tracking-widest mb-4">點擊方塊來組合詞語</p>
           <div className="flex flex-wrap justify-center gap-4">
             {scrambledPool.map((item, idx) => {
               const isPlaced = placedIndices.includes(idx);
               return (
                 <button
                   key={idx}
                   disabled={isPlaced}
                   onClick={() => handleTileClick(idx)}
                   className={`w-16 h-16 sm:w-20 sm:h-20 rounded-[1.5rem] border-4 flex items-center justify-center text-3xl sm:text-4xl font-black transition-all shadow-[0_6px_0_rgb(0,0,0,0.1)] active:translate-y-1 active:shadow-none ${
                     isPlaced 
                       ? 'opacity-0 scale-50 pointer-events-none' 
                       : 'border-white bg-white text-gray-700 hover:scale-105 active:scale-90'
                   }`}
                 >
                   {item?.char}
                 </button>
               );
             })}
           </div>
        </div>
      </div>

      {/* Instructions Footer */}
      <div className="w-full max-w-md px-6 pb-10 text-center shrink-0">
        <p className="text-sm font-bold text-orange-300">
           依照意思把字按順序排列吧！
        </p>
      </div>
    </div>
  );
};

export default PhraseSection;
