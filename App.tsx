
import React, { useState, useEffect } from 'react';
import { GameView, Lesson, Character } from './types';
import { INITIAL_LESSONS } from './constants';
import SagaMap from './components/GameMap';
import WritingSection from './components/WritingSection';
import PhraseSection from './components/PhraseSection';
import PictureMatchSection from './components/PictureMatchSection';
import AdminSection from './components/AdminSection';

const STORAGE_KEY = 'rainbow_academy_curriculum';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<GameView>(GameView.MAP);
  
  // Persistence logic
  const [lessons, setLessons] = useState<Lesson[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Migration: Ensure new fields exist
        return parsed.map((l: any) => ({
          ...l,
          enablePhrases: l.enablePhrases ?? true,
          enableMatch: l.enableMatch ?? true,
          matchQuestions: l.matchQuestions ?? []
        }));
      } catch (e) {
        return INITIAL_LESSONS;
      }
    }
    return INITIAL_LESSONS;
  });

  const [activeLesson, setActiveLesson] = useState<Lesson>(lessons[0]);
  const [activeChar, setActiveChar] = useState<Character | null>(null);
  
  const [isUnlockModalOpen, setIsUnlockModalOpen] = useState(false);
  const [unlockInput, setUnlockInput] = useState("");
  const [unlockError, setUnlockError] = useState(false);
  const [audioPrimed, setAudioPrimed] = useState(false);

  // Sync to local storage whenever lessons change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lessons));
  }, [lessons]);

  // iOS 18 / Safari fix: Prime the speech engine on first interaction
  const primeAudio = () => {
    if (audioPrimed) return;
    
    // 1. Prime SpeechSynthesis
    const utterance = new SpeechSynthesisUtterance('');
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    
    // 2. Prime Web Audio context if needed
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContext) {
      const ctx = new AudioContext();
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
    }
    
    setAudioPrimed(true);
    console.log("Audio engine primed for iOS");
  };

  const handleCharClick = (char: Character) => {
    primeAudio();
    const lesson = lessons.find(l => l.characters.some(c => c.char === char.char));
    if (!lesson) return;
    setActiveLesson(lesson);
    setActiveChar(char);
    setCurrentView(GameView.WRITING);
  };

  const handlePhraseChallenge = (lesson: Lesson) => {
    primeAudio();
    setActiveLesson(lesson);
    setCurrentView(GameView.PHRASE);
  };

  const handleMatchChallenge = (lesson: Lesson) => {
    primeAudio();
    setActiveLesson(lesson);
    setCurrentView(GameView.PICTURE_MATCH);
  };

  const openUnlockModal = () => {
    primeAudio();
    setUnlockInput("");
    setUnlockError(false);
    setIsUnlockModalOpen(true);
  };

  const handleUnlockSubmit = () => {
    if (unlockInput === "Rainbow888") {
      // Unlock All Stages logic
      const allUnlocked = lessons.map(l => ({
        ...l,
        unlocked: true,
        characters: l.characters.map(c => ({ ...c, unlocked: true }))
      }));
      setLessons(allUnlocked);
      // Ensure the active lesson is also updated to the new unlocked state
      const updatedActiveLesson = allUnlocked.find(l => l.id === activeLesson.id) || allUnlocked[0];
      setActiveLesson(updatedActiveLesson);
      setIsUnlockModalOpen(false);
    } else if (unlockInput === "Admin999") {
      // Enter Admin Module
      setCurrentView(GameView.ADMIN);
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
    <div 
      className="h-screen w-screen flex flex-col relative overflow-hidden bg-[#fffdf0]"
      onClick={primeAudio} // Global capture to prime sound on any touch
    >
      {currentView === GameView.MAP && (
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
            <button onClick={openUnlockModal} className="w-10 h-10 flex items-center justify-center bg-gray-100 text-gray-400 rounded-xl border-b-4 border-gray-200 hover:bg-gray-200 transition-all active:translate-y-1">🔑</button>
            <button onClick={() => { primeAudio(); setCurrentView(GameView.MAP); }} className="px-4 py-2 bg-pink-400 border-b-4 border-pink-600 rounded-xl font-black text-xs text-white shadow-sm hover:scale-105 active:translate-y-1 transition-all">🗺️ 地圖</button>
          </div>
        </header>
      )}

      {isUnlockModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsUnlockModalOpen(false)}></div>
          <div className="relative bg-white rounded-[2.5rem] p-8 w-full max-w-sm border-8 border-orange-100 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center text-3xl mb-2">🔑</div>
              <h2 className="text-2xl font-black text-gray-800">輸入密碼</h2>
              <input 
                type="text" value={unlockInput} onChange={(e) => setUnlockInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleUnlockSubmit()}
                placeholder="輸入代碼..." autoFocus
                className={`w-full p-4 bg-gray-50 border-4 rounded-2xl text-center text-xl font-black focus:outline-none transition-colors ${unlockError ? 'border-red-400 text-red-500 animate-shake' : 'border-gray-100 focus:border-orange-400 text-gray-700'}`}
              />
              <div className="flex space-x-3 w-full pt-2">
                <button onClick={() => setIsUnlockModalOpen(false)} className="flex-1 py-3 bg-gray-100 text-gray-400 font-black rounded-2xl">取消</button>
                <button onClick={handleUnlockSubmit} className="flex-[2_2_0%] py-3 bg-gradient-to-r from-orange-400 to-pink-400 text-white font-black rounded-2xl shadow-lg border-b-4 border-orange-600">進入 🚀</button>
              </div>
              <p className="text-[10px] text-gray-300 font-bold uppercase tracking-widest text-center mt-2">Passcode: Admin999 for Management</p>
            </div>
          </div>
        </div>
      )}

      <main className="flex-1 relative overflow-hidden">
        {currentView === GameView.MAP && (
          <SagaMap 
            lesson={activeLesson} lessons={lessons}
            onCharClick={handleCharClick}
            onLessonSelect={(l) => { primeAudio(); setActiveLesson(l); }}
            onPhraseClick={() => handlePhraseChallenge(activeLesson)}
            onMatchClick={() => handleMatchChallenge(activeLesson)}
          />
        )}
        {currentView === GameView.WRITING && activeChar && (
          <WritingSection character={activeChar} onComplete={completeWriting} onBack={() => { primeAudio(); setCurrentView(GameView.MAP); }} />
        )}
        {currentView === GameView.PHRASE && (
          <PhraseSection lesson={activeLesson} onBack={() => { primeAudio(); setCurrentView(GameView.MAP); }} onComplete={() => setCurrentView(GameView.MAP)} />
        )}
        {currentView === GameView.PICTURE_MATCH && (
          <PictureMatchSection lesson={activeLesson} onBack={() => { primeAudio(); setCurrentView(GameView.MAP); }} onComplete={() => setCurrentView(GameView.MAP)} />
        )}
        {currentView === GameView.ADMIN && (
          <AdminSection 
            lessons={lessons} 
            onSave={(updated) => { setLessons(updated); if (updated.length > 0) setActiveLesson(updated[0]); }} 
            onExit={() => setCurrentView(GameView.MAP)} 
          />
        )}
      </main>
    </div>
  );
};

export default App;
