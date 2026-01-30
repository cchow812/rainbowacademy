
import React, { useState } from 'react';
import { Lesson } from '../types';

interface StorySectionProps {
  lesson: Lesson;
}

const StorySection: React.FC<StorySectionProps> = ({ lesson }) => {
  const [selectedChars, setSelectedChars] = useState<string[]>([]);
  
  const addChar = (char: string) => {
    setSelectedChars(prev => [...prev, char]);
  };

  const removeChar = (index: number) => {
    const newChars = [...selectedChars];
    newChars.splice(index, 1);
    setSelectedChars(newChars);
  };

  const clearStory = () => setSelectedChars([]);

  const playSentence = () => {
    const sentence = selectedChars.join('');
    if (!sentence) return;
    const speech = new SpeechSynthesisUtterance(sentence);
    speech.lang = 'zh-HK';
    window.speechSynthesis.speak(speech);
  };

  return (
    <div className="w-full h-full p-8 flex flex-col items-center bg-blue-50 overflow-y-auto">
      <h2 className="text-4xl font-black text-blue-900 mb-8">我的故事板</h2>
      
      {/* Visual Image for Context */}
      <div className="w-full max-w-2xl bg-white rounded-3xl p-6 border-8 border-white shadow-xl mb-8 relative overflow-hidden">
        <img src={lesson.image} alt="Context" className="w-full h-64 object-cover rounded-2xl mb-6 shadow-md" />
        
        {/* Sentence Display Area */}
        <div className="min-h-[100px] border-4 border-dashed border-blue-200 rounded-2xl p-4 flex flex-wrap gap-4 items-center bg-blue-50/50">
          {selectedChars.length === 0 ? (
            <span className="text-blue-300 text-xl font-bold w-full text-center">點擊下面的漢字來組成句子吧！</span>
          ) : (
            selectedChars.map((char, i) => (
              <button
                key={i}
                onClick={() => removeChar(i)}
                className="w-16 h-16 bg-white border-2 border-blue-400 rounded-xl shadow flex items-center justify-center text-3xl font-bold text-blue-800 hover:bg-red-50 hover:border-red-400 transition-all group"
              >
                {char}
                <span className="hidden group-hover:block absolute -top-2 -right-2 text-xs bg-red-500 text-white rounded-full w-5 h-5">✕</span>
              </button>
            ))
          )}
        </div>

        <div className="mt-6 flex justify-end space-x-4">
          <button 
            onClick={clearStory}
            className="px-6 py-2 bg-gray-100 text-gray-600 rounded-full font-bold hover:bg-gray-200"
          >
            🗑️ 清空
          </button>
          <button 
            onClick={playSentence}
            disabled={selectedChars.length === 0}
            className="px-8 py-2 bg-blue-500 text-white rounded-full font-bold shadow-lg hover:bg-blue-600 active:translate-y-1 transition-all flex items-center space-x-2"
          >
            <span>🔊 朗讀</span>
          </button>
        </div>
      </div>

      {/* Available Characters Bank */}
      <div className="w-full max-w-4xl">
        <h3 className="text-xl font-bold text-blue-800 mb-4 ml-2">可用漢字庫:</h3>
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4">
          {lesson.characters.filter(c => c.unlocked).map((c) => (
            <button
              key={c.char}
              onClick={() => addChar(c.char)}
              className="aspect-square bg-yellow-400 border-b-4 border-yellow-600 text-white rounded-2xl flex items-center justify-center text-3xl font-bold shadow-lg hover:translate-y-[-4px] transition-all"
            >
              {c.char}
            </button>
          ))}
          {!lesson.characters.some(c => c.unlocked) && (
            <div className="col-span-full p-8 text-center bg-gray-100 rounded-2xl border-2 border-dashed border-gray-300">
              <span className="text-gray-500 font-bold">先去地圖關卡學習漢字吧！🔒</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StorySection;
