
import React, { useMemo, useState } from 'react';
import { Lesson, Character } from '../types';

interface GameMapProps {
  lesson: Lesson;
  lessons: Lesson[];
  onCharClick: (char: Character) => void;
  onLessonSelect: (lesson: Lesson) => void;
}

const SagaMap: React.FC<GameMapProps> = ({ lesson, lessons, onCharClick, onLessonSelect }) => {
  const [showSelector, setShowSelector] = useState(false);

  // Check if all characters in the current lesson are unlocked
  const isLessonComplete = useMemo(() => {
    return lesson.characters.every(c => c.unlocked);
  }, [lesson]);

  // Find the next lesson if current is complete
  const nextLesson = useMemo(() => {
    const currentIndex = lessons.findIndex(l => l.id === lesson.id);
    return lessons[currentIndex + 1] || null;
  }, [lesson, lessons]);

  const arcConfig = {
    xBase: 22,    
    rx: 52,       
    yCenter: 54,  
    ry: 28,       
  };

  const allSteps = useMemo(() => {
    const total = lesson.characters.length;
    if (total === 0) return [];
    
    return lesson.characters.map((c, index) => {
      const t = total > 1 ? (index / (total - 1)) * Math.PI : Math.PI / 2;
      const left = arcConfig.xBase + arcConfig.rx * Math.sin(t);
      const top = arcConfig.yCenter - arcConfig.ry * Math.cos(t);

      return {
        ...c,
        left,
        top,
      };
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
      {/* Cartoon Background Layer */}
      <div 
        className="absolute inset-0 z-0 opacity-40 bg-cover bg-center"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?auto=format&fit=crop&q=80&w=1200")' }}
      ></div>
      
      {/* Texture Overlay */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/handmade-paper.png")' }}></div>

      {/* Floats */}
      <div className="absolute top-32 left-1/4 text-8xl opacity-30 select-none animate-bounce-gentle">☁️</div>
      <div className="absolute top-20 right-1/4 text-6xl opacity-20 select-none animate-pulse">☁️</div>
      <div className="absolute bottom-40 left-10 text-9xl opacity-40 select-none">🌳</div>
      <div className="absolute bottom-20 right-10 text-9xl opacity-40 select-none">🌲</div>

      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full z-10 pointer-events-none">
        <defs>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        <path d={pathData} fill="none" stroke="rgba(255, 255, 255, 0.7)" strokeWidth="4" strokeLinecap="round" strokeDasharray="0.1, 5" />
        <path d={pathData} fill="none" stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="3, 4" filter="url(#glow)" />
      </svg>

      {/* Character Stages */}
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
                  className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center text-3xl sm:text-4xl font-black transition-all duration-300 shadow-[0_6px_0_rgb(0,0,0,0.15)] active:translate-y-1.5 active:shadow-none ${isUnlocked ? 'bg-gradient-to-br from-yellow-300 to-orange-500 border-4 border-white text-white' : isNext ? 'bg-white border-4 border-yellow-400 text-yellow-600 animate-bounce-gentle ring-4 ring-yellow-400/20 shadow-xl' : 'bg-white/60 border-4 border-white text-gray-400 opacity-80 cursor-not-allowed'}`}
                >
                  <span className={isUnlocked ? 'opacity-90 scale-75' : 'scale-100'}>{isUnlocked ? '⭐' : step.char}</span>
                  {isNext && <div className="absolute -top-12 left-1/2 -translate-x-1/2 text-4xl sm:text-5xl drop-shadow-lg z-30 animate-bounce">👧</div>}
                  {!isClickable && <div className="absolute inset-0 flex items-center justify-center bg-black/5 rounded-full"><span className="text-lg opacity-40">🔒</span></div>}
                </button>
                <div className={`mt-2 px-3 py-1 rounded-full text-xs sm:text-sm font-black transition-all shadow-md whitespace-nowrap ${isClickable ? 'bg-white text-gray-700' : 'bg-white/40 text-gray-400'}`}>
                   {isUnlocked ? '學習完成' : step.char}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Next Adventure Overlay */}
      {isLessonComplete && nextLesson && (
        <div className="absolute bottom-24 right-6 sm:right-10 z-50 animate-in slide-in-from-bottom-10">
           <div className="bg-white/95 backdrop-blur-md p-6 rounded-[2.5rem] border-4 border-orange-400 shadow-2xl flex flex-col items-center space-y-4 w-72">
              <div className="text-5xl">🏆</div>
              <h3 className="text-xl font-black text-gray-800">主題已完成！</h3>
              <p className="text-sm text-gray-500 font-bold text-center">太棒了！你想開始下一個冒險「{nextLesson.title}」嗎？</p>
              <button 
                onClick={() => onLessonSelect(nextLesson)}
                className="w-full py-3 bg-orange-500 text-white rounded-2xl font-black text-lg shadow-lg hover:bg-orange-600 transition-all active:translate-y-1"
              >
                出發！🚀
              </button>
           </div>
        </div>
      )}

      {/* Lesson Selector */}
      <div className="absolute top-6 left-6 z-50">
        <button 
          onClick={() => setShowSelector(!showSelector)}
          className="bg-white/95 backdrop-blur-md p-3 rounded-2xl border-4 border-white shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center space-x-2"
        >
          <span className="text-2xl">🌍</span>
          <span className="font-black text-gray-700 hidden sm:inline">切換主題</span>
        </button>
        
        {showSelector && (
          <div className="mt-4 bg-white/95 backdrop-blur-lg p-4 rounded-3xl border-4 border-white shadow-2xl flex flex-col space-y-3 w-64 animate-in fade-in slide-in-from-top-4 duration-300">
            <h3 className="font-black text-gray-400 text-xs uppercase tracking-widest px-2">冒險主題</h3>
            {lessons.map(l => (
              <button
                key={l.id}
                disabled={!l.unlocked && l.id !== lesson.id}
                onClick={() => { onLessonSelect(l); setShowSelector(false); }}
                className={`flex items-center space-x-3 p-3 rounded-2xl transition-all border-b-4 ${l.id === lesson.id ? 'bg-orange-100 border-orange-300 scale-105' : l.unlocked ? 'bg-gray-50 border-gray-200 hover:bg-white' : 'opacity-50 grayscale cursor-not-allowed'}`}
              >
                <img src={l.image} className="w-10 h-10 rounded-lg object-cover" />
                <div className="flex flex-col items-start overflow-hidden">
                   <span className="font-black text-sm text-gray-800 truncate w-full">{l.title}</span>
                   <span className="text-[10px] text-gray-400">{l.unlocked ? '已解鎖' : '尚未解鎖'}</span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Header - TOP RIGHT */}
      <div className="absolute top-6 right-6 sm:right-10 z-40">
        <div className="bg-white/95 backdrop-blur-md px-8 sm:px-10 py-3 rounded-full border-4 border-white shadow-2xl flex items-center space-x-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-400 rounded-xl flex items-center justify-center text-white text-lg sm:text-xl rotate-3 shadow-sm">🏫</div>
          <h2 className="text-xl sm:text-2xl font-black text-gray-800 tracking-tighter">{lesson.title}</h2>
        </div>
      </div>

      {/* Progress Footer Card - BOTTOM RIGHT */}
      <div className="absolute bottom-6 right-6 sm:right-10 z-40">
        <div className="bg-white/90 p-3 sm:p-4 rounded-[2rem] border-4 border-white shadow-2xl flex items-center space-x-3 sm:space-x-4">
          <div className="relative">
             <svg className="w-12 h-12 sm:w-14 sm:h-14 transform -rotate-90">
                <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-gray-100" />
                <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="6" fill="transparent" 
                        strokeDasharray={126} 
                        strokeDashoffset={126 * (1 - (lesson.characters.filter(c => c.unlocked).length / (lesson.characters.length || 1)))}
                        className="text-pink-400 transition-all duration-1000" />
             </svg>
             <div className="absolute inset-0 flex items-center justify-center font-black text-pink-500 text-[10px] sm:text-xs">
                {Math.round((lesson.characters.filter(c => c.unlocked).length / (lesson.characters.length || 1)) * 100)}%
             </div>
          </div>
          <div className="flex flex-col">
            <span className="text-[8px] sm:text-[10px] font-black text-pink-400 uppercase tracking-widest leading-none mb-1">冒險進度</span>
            <span className="text-lg sm:text-xl font-black text-gray-700 leading-none">
              已學 {lesson.characters.filter(c => c.unlocked).length} 字
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SagaMap;
