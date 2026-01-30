
import React, { useState } from 'react';
import { GameView, Lesson, Character } from './types';
import { INITIAL_LESSONS } from './constants';
import SagaMap from './components/GameMap'; // Re-using GameMap.tsx file path but logic is Saga
import WritingSection from './components/WritingSection';
import StorySection from './components/StorySection';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<GameView>(GameView.MAP);
  const [lessons, setLessons] = useState<Lesson[]>(INITIAL_LESSONS);
  const [activeLesson, setActiveLesson] = useState<Lesson>(INITIAL_LESSONS[0]);
  const [activeChar, setActiveChar] = useState<Character | null>(null);

  const handleCharClick = (char: Character) => {
    // Find which lesson this character belongs to
    const lesson = lessons.find(l => l.characters.some(c => c.char === char.char));
    if (!lesson) return;

    setActiveLesson(lesson);
    setActiveChar(char);
    setCurrentView(GameView.WRITING);
  };

  const completeWriting = () => {
    if (!activeChar) return;

    const nextLessons = lessons.map(l => ({
      ...l,
      characters: l.characters.map(c => ({ ...c }))
    }));

    // Find lesson and character to unlock
    let targetLesson = nextLessons.find(l => l.characters.some(c => c.char === activeChar.char));
    if (!targetLesson) return;

    const charIndex = targetLesson.characters.findIndex(c => c.char === activeChar.char);
    targetLesson.characters[charIndex].unlocked = true;

    // Check if whole lesson is done to unlock next lesson
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
      {/* Top Header */}
      <header className="bg-white/90 backdrop-blur border-b-8 border-[#ffedf0] p-4 flex justify-between items-center shadow-lg z-20">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-2xl flex items-center justify-center border-4 border-white shadow-lg rotate-3">
            <span className="text-2xl">🖌️</span>
          </div>
          <div className="flex flex-col">
            <h1 className="text-2xl font-black rainbow-text tracking-wider leading-none">彩虹毛筆學堂</h1>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Rainbow Brush Academy</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => setCurrentView(GameView.MAP)}
            className={`px-4 py-2 rounded-2xl font-black text-sm transition-all border-b-4 ${currentView === GameView.MAP ? 'bg-pink-400 border-pink-600 text-white scale-105' : 'bg-gray-100 border-gray-300 text-gray-500 hover:bg-white'}`}
          >
            🗺️ 冒險地圖
          </button>
          <button 
            onClick={() => setCurrentView(GameView.STORY)}
            className={`px-4 py-2 rounded-2xl font-black text-sm transition-all border-b-4 ${currentView === GameView.STORY ? 'bg-blue-400 border-blue-600 text-white scale-105' : 'bg-gray-100 border-gray-300 text-gray-500 hover:bg-white'}`}
          >
            📖 故事書
          </button>
        </div>
      </header>

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
        {currentView === GameView.STORY && (
          <StorySection lesson={activeLesson} />
        )}
      </main>
    </div>
  );
};

export default App;
