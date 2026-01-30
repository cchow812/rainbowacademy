
import React, { useState } from 'react';
import { GameView, Lesson, Character } from './types';
import { INITIAL_LESSONS } from './constants';
import SagaMap from './components/GameMap';
import WritingSection from './components/WritingSection';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<GameView>(GameView.MAP);
  const [lessons, setLessons] = useState<Lesson[]>(INITIAL_LESSONS);
  const [activeLesson, setActiveLesson] = useState<Lesson>(INITIAL_LESSONS[0]);
  const [activeChar, setActiveChar] = useState<Character | null>(null);
  
  // Dev Unlock Modal State
  const [isUnlockModalOpen, setIsUnlockModalOpen] = useState(false);
  const [unlockInput, setUnlockInput] = useState("");
  const [unlockError, setUnlockError] = useState(false);

  const handleCharClick = (char: Character) => {
    const lesson = lessons.find(l => l.characters.some(c => c.char === char.char));
    if (!lesson) return;

    setActiveLesson(lesson);
    setActiveChar(char);
    setCurrentView(GameView.WRITING);
  };

  const openUnlockModal = () => {
    setUnlockInput("");
    setUnlockError(false);
    setIsUnlockModalOpen(true);
  };

  const handleUnlockSubmit = () => {
    if (unlockInput === "Rainbow888") {
      const allUnlocked = lessons.map(l => ({
        ...l,
        unlocked: true,
        characters: l.characters.map(c => ({ ...c, unlocked: true }))
      }));
      setLessons(allUnlocked);
      setActiveLesson(allUnlocked.find(l => l.id === activeLesson.id) || allUnlocked[0]);
      setIsUnlockModalOpen(false);
    } else {
      setUnlockError(true);
      setTimeout(() => setUnlockError(false), 2000);
    }
  };

  const completeWriting = () => {
    if (!activeChar) return;

    const nextLessons = lessons.map(l => ({
      ...l,
      characters: l.characters.map(c => ({ ...c }))
    }));

    let targetLesson = nextLessons.find(l => l.characters.some(c => c.char === activeChar.char));
    if (!targetLesson) return;

    const charIndex = targetLesson.characters.findIndex(c => c.char === activeChar.char);
    targetLesson.characters[charIndex].unlocked = true;

    const allCharsInLessonDone = targetLesson.characters.every(c => c.unlocked);
    if (allCharsInLessonDone) {
      const lessonIndex = nextLessons.findIndex(l => l.id === targetLesson.id);
      if (lessonIndex + 1 < nextLessons.length) {
        nextLessons[lessonIndex + 1].unlocked = true;
      }
    }

    setLessons(nextLessons);
    setActiveLesson(nextLessons.find(l => l.id === targetLesson.id)!);
    setCurrentView(GameView.MAP);
    setActiveChar(null);
  };

  return (
    <div className="h-screen w-screen flex flex-col relative overflow-hidden bg-[#fffdf0]">
      {/* Global Header - Hidden in Writing mode to save space */}
      {currentView !== GameView.WRITING && (
        <header className="bg-white/95 backdrop-blur border-b-4 border-[#ffedf0] p-3 flex justify-between items-center shadow-md z-50 shrink-0">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-xl flex items-center justify-center border-2 border-white shadow-sm rotate-3">
              <span className="text-xl">🖌️</span>
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl font-black rainbow-text tracking-tight leading-none">彩虹毛筆學堂</h1>
              <span className="text-[8px] font-bold text-gray-400 uppercase tracking-tighter">Rainbow Brush Academy</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button 
              onClick={openUnlockModal}
              className="w-10 h-10 flex items-center justify-center bg-gray-100 text-gray-400 rounded-xl border-b-4 border-gray-200 hover:bg-gray-200 transition-all active:translate-y-1 active:border-b-0"
              title="Debug Unlock"
            >
              🔑
            </button>
            <button 
              onClick={() => setCurrentView(GameView.MAP)}
              className="px-4 py-2 bg-pink-400 border-b-4 border-pink-600 rounded-xl font-black text-xs text-white shadow-sm hover:scale-105 active:translate-y-1 active:border-b-0 transition-all"
            >
              🗺️ 冒險地圖
            </button>
          </div>
        </header>
      )}

      {/* Dev Unlock Modal */}
      {isUnlockModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsUnlockModalOpen(false)}></div>
          <div className="relative bg-white rounded-[2.5rem] p-8 w-full max-w-sm border-8 border-orange-100 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center text-3xl mb-2">🔑</div>
              <h2 className="text-2xl font-black text-gray-800">開發者解鎖</h2>
              <p className="text-sm text-gray-400 font-bold">請輸入解鎖碼以開啟所有冒險！</p>
              
              <input 
                type="text" 
                value={unlockInput}
                onChange={(e) => setUnlockInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleUnlockSubmit()}
                placeholder="輸入代碼..."
                autoFocus
                className={`w-full p-4 bg-gray-50 border-4 rounded-2xl text-center text-xl font-black focus:outline-none transition-colors ${unlockError ? 'border-red-400 text-red-500 animate-shake' : 'border-gray-100 focus:border-orange-400 text-gray-700'}`}
              />

              {unlockError && <p className="text-red-500 font-black text-xs animate-pulse">代碼錯誤，請再試一次！</p>}

              <div className="flex space-x-3 w-full pt-2">
                <button 
                  onClick={() => setIsUnlockModalOpen(false)}
                  className="flex-1 py-3 bg-gray-100 text-gray-400 font-black rounded-2xl hover:bg-gray-200 transition-all active:translate-y-1"
                >
                  取消
                </button>
                <button 
                  onClick={handleUnlockSubmit}
                  className="flex-[2_2_0%] py-3 bg-gradient-to-r from-orange-400 to-pink-400 text-white font-black rounded-2xl shadow-lg hover:shadow-xl transition-all active:translate-y-1 border-b-4 border-orange-600"
                >
                  解鎖 🚀
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 relative overflow-hidden">
        {currentView === GameView.MAP && (
          <SagaMap 
            lesson={activeLesson} 
            lessons={lessons}
            onCharClick={handleCharClick}
            onLessonSelect={(l) => setActiveLesson(l)}
          />
        )}
        {currentView === GameView.WRITING && activeChar && (
          <WritingSection 
            character={activeChar} 
            onComplete={completeWriting}
            onBack={() => setCurrentView(GameView.MAP)}
          />
        )}
      </main>
    </div>
  );
};

export default App;
