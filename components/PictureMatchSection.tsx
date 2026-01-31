
import React, { useState, useEffect, useMemo } from 'react';
import { Lesson, MatchQuestion } from '../types';

interface PictureMatchSectionProps {
  lesson: Lesson;
  onBack: () => void;
  onComplete: () => void;
}

const PictureMatchSection: React.FC<PictureMatchSectionProps> = ({ lesson, onBack, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedChar, setSelectedChar] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const activeQuestion = lesson.matchQuestions[currentIndex];

  // Generate 4 options: the correct one and 3 random ones from the lesson
  const options = useMemo(() => {
    if (!activeQuestion) return [];
    
    const correct = activeQuestion.correctChar;
    const others = lesson.characters
      .filter(c => c.char !== correct)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map(c => c.char);
      
    return [correct, ...others].sort(() => Math.random() - 0.5);
  }, [currentIndex, lesson.id]);

  useEffect(() => {
    setSelectedChar(null);
    setIsSuccess(false);
    setIsError(false);
  }, [currentIndex]);

  const handleOptionClick = (char: string) => {
    if (isSuccess || isError) return;
    setSelectedChar(char);
    
    // Pronounce the word even if it is incorrect
    speak(char);
    
    if (char === activeQuestion.correctChar) {
      setIsSuccess(true);
    } else {
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
        setSelectedChar(null);
      }, 1000);
    }
  };

  const speak = (txt: string) => {
    try {
      window.speechSynthesis.cancel();
      const s = new SpeechSynthesisUtterance(txt);
      s.lang = 'zh-HK';
      const voices = window.speechSynthesis.getVoices();
      const voice = voices.find(v => v.lang.includes('zh-HK'));
      if (voice) s.voice = voice;
      s.volume = 1; 
      s.rate = 1;
      window.speechSynthesis.speak(s);
    } catch (e) {
      console.error("Speech error", e);
    }
  };

  const nextQuestion = () => {
    if (currentIndex + 1 < lesson.matchQuestions.length) {
      setCurrentIndex(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  if (!activeQuestion) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-[#fffdf0]">
        <span className="text-6xl mb-4">🎨</span>
        <h2 className="text-xl font-black text-gray-400">管理員尚未為此課程設置配對題目</h2>
        <button onClick={onBack} className="mt-8 px-8 py-3 bg-gray-100 rounded-2xl font-black text-gray-500">返回地圖</button>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col items-center bg-[#fffdf0] relative overflow-hidden">
      {/* Back Button */}
      <button onClick={onBack} className="absolute top-4 left-4 z-50 w-12 h-12 bg-white border-4 border-[#ffedf0] rounded-2xl shadow-lg flex items-center justify-center hover:bg-gray-50 active:scale-95 transition-all">
        <span className="text-2xl">⬅️</span>
      </button>

      {/* Success Modal */}
      {isSuccess && (
        <div className="absolute inset-0 z-[100] bg-white/95 flex flex-col items-center justify-center p-6 animate-in zoom-in duration-300">
           <div className="text-9xl mb-6 animate-bounce">✨🖼️🌈</div>
           <h2 className="text-4xl font-black rainbow-text mb-2 text-center">答對了！</h2>
           <p className="text-2xl font-bold text-gray-600 mb-2 text-center">這就是：</p>
           <h3 className="text-7xl font-black text-blue-500 mb-8">{activeQuestion.correctChar}</h3>
           <button 
             onClick={nextQuestion}
             className="px-12 py-4 bg-gradient-to-r from-cyan-400 to-blue-500 text-white rounded-[2.5rem] font-black text-2xl shadow-2xl hover:scale-105 active:scale-95 transition-all border-4 border-white"
           >
             {currentIndex + 1 < lesson.matchQuestions.length ? '下一題挑戰 🚀' : '完成配對！🏁'}
           </button>
        </div>
      )}

      {/* Question Info */}
      <div className="w-full flex flex-col items-center pt-10 px-4 shrink-0">
        <span className="text-xs font-black text-blue-400 uppercase tracking-widest mb-1">配對大挑戰 Match Challenge</span>
        <h2 className="text-xl font-black text-gray-800 mt-2">請選擇正確的字！</h2>
        <p className="text-xs font-bold text-gray-400 mt-1">題目 {currentIndex + 1} / {lesson.matchQuestions.length}</p>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 w-full max-w-lg flex flex-col items-center justify-center p-6">
        <div className={`relative w-full aspect-video rounded-[2.5rem] border-8 border-white shadow-2xl overflow-hidden mb-12 transition-all ${isError ? 'animate-shake border-red-400' : ''}`}>
           <img src={activeQuestion.imageUrl} className="w-full h-full object-cover" />
           {isError && (
              <div className="absolute inset-0 bg-red-400/20 flex items-center justify-center">
                 <span className="text-8xl">❌</span>
              </div>
           )}
        </div>

        {/* Options Grid */}
        <div className="grid grid-cols-2 gap-4 w-full">
          {options.map((char) => (
            <button
              key={char}
              onClick={() => handleOptionClick(char)}
              disabled={isSuccess || isError}
              className={`py-6 rounded-[2rem] border-4 flex items-center justify-center text-5xl font-black transition-all shadow-[0_8px_0_rgb(0,0,0,0.1)] active:translate-y-2 active:shadow-none ${
                selectedChar === char
                  ? char === activeQuestion.correctChar 
                    ? 'bg-green-400 border-green-600 text-white' 
                    : 'bg-red-400 border-red-600 text-white'
                  : 'bg-white border-blue-50 text-gray-700 hover:scale-105'
              }`}
            >
              {char}
            </button>
          ))}
        </div>
      </div>

      <div className="w-full max-w-md px-6 pb-10 text-center shrink-0">
        <p className="text-sm font-bold text-blue-300">
           看圖識字，找出最合適的方塊吧！
        </p>
      </div>
    </div>
  );
};

export default PictureMatchSection;
