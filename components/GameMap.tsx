
import React, { useMemo, useState, useEffect } from 'react';
import { Lesson, Character } from '../types';

interface GameMapProps {
  lesson: Lesson;
  lessons: Lesson[];
  onCharClick: (char: Character) => void;
  onLessonSelect: (lesson: Lesson) => void;
  onPhraseClick: () => void;
  onMatchClick: () => void;
}

const SagaMap: React.FC<GameMapProps> = ({ lesson, lessons, onCharClick, onLessonSelect, onPhraseClick, onMatchClick }) => {
  const [showSelector, setShowSelector] = useState(false);
  const [showCompletionModal, setShowCompletionModal] = useState(true);

  const isLessonComplete = useMemo(() => {
    return lesson.characters.every(c => c.unlocked);
  }, [lesson]);

  const unlockedCount = useMemo(() => lesson.characters.filter(c => c.unlocked).length, [lesson]);

  useEffect(() => {
    setShowCompletionModal(true);
  }, [lesson.id]);

  const nextLesson = useMemo(() => {
    const currentIndex = lessons.findIndex(l => l.id === lesson.id);
    return lessons[currentIndex + 1] || null;
  }, [lesson, lessons]);

  const arcConfig = { xBase: 22, rx: 52, yCenter: 54, ry: 28 };

  const allSteps = useMemo(() => {
    const total = lesson.characters.length;
    if (total === 0) return [];
    return lesson.characters.map((c, index) => {
      const t = total > 1 ? (index / (total - 1)) * Math.PI : Math.PI / 2;
      const left = arcConfig.xBase + arcConfig.rx * Math.sin(t);
      const top = arcConfig.yCenter - arcConfig.ry * Math.cos(t);
      return { ...c, left, top };
    });
  }, [lesson, arcConfig]);

  const pathData = useMemo(() => {
    const samples = 60;
    let d = "";
    for (let i = 0; i <= samples; i++) {
      const t = (i / samples) * Math.PI;
      const x = arcConfig.xBase + arcConfig.rx * Math.sin(t);
      const y = arcConfig.yCenter - arcConfig.ry * Math.cos(t);
      d += (i === 0 ? "M" : "L") + ` ${x} ${y}`;
    }
    return d;
  }, [arcConfig]);

  return (
    <div className="w-full h-full relative overflow-hidden bg-[#e0f7fa] flex flex-col">
      <div 
        className="absolute inset-0 z-0 opacity-40 bg-cover bg-center"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?auto=format&fit=crop&q=80&w=1200")' }}
      ></div>
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/handmade-paper.png")' }}></div>

      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full z-10 pointer-events-none">
        <path d={pathData} fill="none" stroke="rgba(255, 255, 255, 0.7)" strokeWidth="4" strokeLinecap="round" strokeDasharray="0.1, 5" />
        <path d={pathData} fill="none" stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="3, 4" />
      </svg>

      <div className="relative z-20 w-full h-full pointer-events-none">
        {allSteps.map((step, index) => {
          const isUnlocked = step.unlocked;
          const isNext = !step.unlocked && (index === 0 || (index > 0 && allSteps[index - 1].unlocked));
          const isClickable = isUnlocked || isNext;

          return (
            <div key={step.char} className="absolute pointer-events-auto transition-all duration-700 ease-out" style={{ left: `${step.left}%`, top: `${step.top}%`, transform: 'translate(-50%, -50%)' }}>
              <div className="flex flex-col items-center">
                <button
                  onClick={() => isClickable && onCharClick(step)}
                  className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center text-3xl sm:text-4xl font-black transition-all duration-300 shadow-[0_6px_0_rgb(0,0,0,0.15)] active:translate-y-1.5 active:shadow-none ${isUnlocked ? 'bg-gradient-to-br from-yellow-300 to-orange-500 border-4 border-white text-white shadow-lg' : isNext ? 'bg-white border-4 border-yellow-400 text-yellow-600 animate-bounce-gentle ring-4 ring-yellow-400/20 shadow-xl' : 'bg-white/60 border-4 border-white text-gray-400 opacity-80 cursor-not-allowed'}`}
                >
                  <span className={isUnlocked ? 'scale-90 flex flex-col items-center' : 'scale-100'}>
                    {isUnlocked ? (<><span className="text-xl sm:text-2xl leading-none">{step.char}</span><span className="text-lg sm:text-xl -mt-1">⭐</span></>) : step.char}
                  </span>
                  {isNext && <div className="absolute -top-12 left-1/2 -translate-x-1/2 text-4xl sm:text-5xl drop-shadow-lg z-30 animate-bounce">👧</div>}
                </button>
                <div className={`mt-2 px-3 py-1 rounded-full text-xs sm:text-sm font-black transition-all shadow-md whitespace-nowrap ${isClickable ? 'bg-white text-gray-700' : 'bg-white/40 text-gray-400'}`}>
                   {isUnlocked ? `${step.char} (已學)` : step.char}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Challenge Area */}
      <div className="absolute bottom-32 left-8 z-30 flex flex-col space-y-4 animate-in slide-in-from-left-10 duration-500 pointer-events-none">
        {/* Phrase Challenge Button - Appears when enabled and criteria met */}
        {lesson.enablePhrases && (unlockedCount >= 2 || isLessonComplete) && (
          <button 
            onClick={onPhraseClick}
            className="group flex items-center space-x-3 pointer-events-auto"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-500 rounded-2xl border-4 border-white shadow-xl flex items-center justify-center text-3xl transform group-hover:scale-110 group-active:scale-95 transition-all rotate-3">
              🧩
            </div>
            <div className="bg-white px-4 py-1.5 rounded-full border-2 border-pink-100 shadow-md">
              <span className="text-xs font-black text-pink-500">詞語拼拼樂</span>
            </div>
          </button>
        )}

        {/* Picture Match Button - Appears when enabled and criteria met */}
        {lesson.enableMatch && (unlockedCount >= 1 || isLessonComplete) && (
          <button 
            onClick={onMatchClick}
            className="group flex items-center space-x-3 pointer-events-auto"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl border-4 border-white shadow-xl flex items-center justify-center text-3xl transform group-hover:scale-110 group-active:scale-95 transition-all -rotate-3">
              🖼️
            </div>
            <div className="bg-white px-4 py-1.5 rounded-full border-2 border-blue-100 shadow-md">
              <span className="text-xs font-black text-blue-500">配對大挑戰</span>
            </div>
          </button>
        )}
      </div>

      {isLessonComplete && nextLesson && showCompletionModal && (
        <div className="absolute bottom-24 right-6 sm:right-10 z-50 animate-in slide-in-from-bottom-10 duration-500">
           <div className="bg-white/95 backdrop-blur-md p-6 rounded-[2.5rem] border-4 border-orange-400 shadow-2xl flex flex-col items-center space-y-4 w-72 relative">
              <button onClick={() => setShowCompletionModal(false)} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center font-bold">✕</button>
              <div className="text-5xl">🏆</div>
              <h3 className="text-xl font-black text-gray-800">主題已完成！</h3>
              <button onClick={() => onLessonSelect(nextLesson)} className="w-full py-3 bg-orange-500 text-white rounded-2xl font-black text-lg shadow-lg hover:bg-orange-600 active:translate-y-1">下一個冒險！🚀</button>
           </div>
        </div>
      )}

      {/* Theme Selector */}
      <div className="absolute top-6 left-6 z-50 flex flex-col pointer-events-none" style={{ maxHeight: 'calc(100vh - 80px)' }}>
        <button 
          onClick={() => setShowSelector(!showSelector)} 
          className="bg-white/95 backdrop-blur-md p-3 rounded-2xl border-4 border-white shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center space-x-2 shrink-0 self-start pointer-events-auto"
        >
          <span className="text-2xl">{showSelector ? '❌' : '🌍'}</span>
          <span className="font-black text-gray-700 hidden sm:inline">{showSelector ? '關閉選單' : '切換主題'}</span>
        </button>
        
        {showSelector && (
          <div 
            className="mt-4 bg-white/95 backdrop-blur-lg p-2 rounded-[2rem] border-4 border-white shadow-2xl flex flex-col w-64 animate-in fade-in slide-in-from-top-4 duration-300 pointer-events-auto overflow-hidden"
            style={{ maxHeight: 'calc(100vh - 160px)' }}
          >
            <p className="px-5 py-3 text-[10px] font-black text-orange-400 uppercase tracking-widest bg-white/50 backdrop-blur shrink-0">選擇主題 Select Theme</p>
            <div className="overflow-y-auto px-2 pb-4 space-y-2 custom-scrollbar flex-1">
              {lessons.map(l => (
                <button
                  key={l.id} 
                  disabled={!l.unlocked && l.id !== lesson.id} 
                  onClick={() => { onLessonSelect(l); setShowSelector(false); }}
                  className={`flex items-center space-x-3 p-3 rounded-2xl transition-all border-b-4 shrink-0 text-left w-full ${l.id === lesson.id ? 'bg-orange-100 border-orange-300 scale-102 ring-2 ring-orange-200' : l.unlocked ? 'bg-gray-50 border-gray-200 hover:bg-white active:translate-y-1 active:border-b-0' : 'opacity-40 grayscale cursor-not-allowed border-transparent'}`}
                >
                  <div className="relative shrink-0">
                    <img src={l.image} className="w-10 h-10 rounded-lg object-cover border-2 border-white shadow-sm" />
                    {!l.unlocked && l.id !== lesson.id && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-lg">
                        <span className="text-xs">🔒</span>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col items-start min-w-0">
                     <span className="font-black text-sm text-gray-800 truncate w-full">{l.title}</span>
                     {l.unlocked && l.id !== lesson.id && (
                       <span className="text-[10px] font-bold text-green-500">已解鎖 ✨</span>
                     )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="absolute top-6 right-6 sm:right-10 z-40">
        <div className="bg-white/95 backdrop-blur-md px-8 sm:px-10 py-3 rounded-full border-4 border-white shadow-2xl flex items-center space-x-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-400 rounded-xl flex items-center justify-center text-white text-lg sm:text-xl rotate-3 shadow-sm">🏫</div>
          <h2 className="text-xl sm:text-2xl font-black text-gray-800 tracking-tighter">{lesson.title}</h2>
        </div>
      </div>
    </div>
  );
};

export default SagaMap;
