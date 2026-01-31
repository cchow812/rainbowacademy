
import React, { useState } from 'react';
import { Lesson, Character, Phrase, MatchQuestion } from '../types';
import { GoogleGenAI, Type } from "@google/genai";

interface AdminSectionProps {
  lessons: Lesson[];
  onSave: (lessons: Lesson[]) => void;
  onExit: () => void;
}

interface ModalState {
  isOpen: boolean;
  title: string;
  message: string;
  type: 'info' | 'confirm' | 'ai_prompt';
  onConfirm: (data?: string) => void;
}

const AdminSection: React.FC<AdminSectionProps> = ({ lessons, onSave, onExit }) => {
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(lessons.length > 0 ? lessons[0].id : null);
  const [localLessons, setLocalLessons] = useState<Lesson[]>(JSON.parse(JSON.stringify(lessons))); // Deep clone
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiPromptInput, setAiPromptInput] = useState("");
  
  const [modal, setModal] = useState<ModalState>({
    isOpen: false,
    title: '',
    message: '',
    type: 'info',
    onConfirm: () => {},
  });

  const activeLesson = localLessons.find(l => l.id === selectedLessonId);

  const showAlert = (title: string, message: string) => {
    setModal({
      isOpen: true,
      title,
      message,
      type: 'info',
      onConfirm: () => setModal(prev => ({ ...prev, isOpen: false })),
    });
  };

  const showConfirm = (title: string, message: string, onConfirm: () => void) => {
    setModal({
      isOpen: true,
      title,
      message,
      type: 'confirm',
      onConfirm: () => {
        onConfirm();
        setModal(prev => ({ ...prev, isOpen: false }));
      },
    });
  };

  const openAiGenerator = () => {
    setAiPromptInput("");
    setModal({
      isOpen: true,
      title: 'AI 智能課程生成',
      message: '請輸入一個主題（例如：海洋生物、水果店、太空）：',
      type: 'ai_prompt',
      onConfirm: (prompt) => handleAiGenerate(prompt || ""),
    });
  };

  // AI Logic: Generate Entire Lesson
  const handleAiGenerate = async (prompt: string) => {
    if (!prompt.trim()) return;
    setIsAiLoading(true);
    setModal(prev => ({ ...prev, isOpen: false }));

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-pro-preview",
        contents: `Generate a Traditional Chinese learning lesson for children about the topic: "${prompt}". 
        The output must be a JSON object with: 
        - title (Chinese and English, e.g. "海洋生物 (Sea Life)")
        - characters (array of 5 objects: {char, pinyin, jyutping, meaning})
        - phrases (array of 3 objects: {text, pinyin, jyutping, meaning})`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              characters: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    char: { type: Type.STRING },
                    pinyin: { type: Type.STRING },
                    jyutping: { type: Type.STRING },
                    meaning: { type: Type.STRING }
                  },
                  required: ["char", "pinyin", "jyutping", "meaning"]
                }
              },
              phrases: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    text: { type: Type.STRING },
                    pinyin: { type: Type.STRING },
                    jyutping: { type: Type.STRING },
                    meaning: { type: Type.STRING }
                  },
                  required: ["text", "pinyin", "jyutping", "meaning"]
                }
              }
            },
            required: ["title", "characters", "phrases"]
          }
        }
      });

      const data = JSON.parse(response.text || "{}");
      const newId = `lesson-ai-${Date.now()}`;
      
      const newLesson: Lesson = {
        id: newId,
        title: data.title,
        image: `https://images.unsplash.com/photo-1591123120675-6f7f1aae0e5b`,
        unlocked: false,
        enablePhrases: true,
        enableMatch: true,
        characters: data.characters.map((c: any, i: number) => ({ ...c, unlocked: false, order: i })),
        phrases: data.phrases,
        matchQuestions: []
      };

      setLocalLessons(prev => [...prev, newLesson]);
      setSelectedLessonId(newId);
      showAlert('生成成功', `AI 已為您準備好「${data.title}」課程！`);
    } catch (err) {
      console.error(err);
      showAlert('生成失敗', 'AI 暫時無法處理您的請求，請稍後再試。');
    } finally {
      setIsAiLoading(false);
    }
  };

  const saveChanges = () => {
    onSave(localLessons);
    showAlert('儲存成功', '所有課程內容已成功更新！');
  };

  const exportData = () => {
    const dataStr = JSON.stringify(localLessons, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'rainbow_academy_curriculum.json';
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const importData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        if (Array.isArray(json)) {
          setLocalLessons(json);
          if (json.length > 0) setSelectedLessonId(json[0].id);
          showAlert('導入成功', '數據導入成功！記得點擊「儲存」以永久生效。');
        }
      } catch (err) {
        showAlert('導入失敗', 'JSON 格式錯誤，請檢查文件。');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const updateLesson = (id: string, updates: Partial<Lesson>) => {
    setLocalLessons(prev => prev.map(l => l.id === id ? { ...l, ...updates } : l));
  };

  const addLesson = () => {
    const newId = `lesson-${Date.now()}`;
    const newLesson: Lesson = {
      id: newId,
      title: '新課程 New Lesson',
      image: 'https://images.unsplash.com/photo-1591123120675-6f7f1aae0e5b',
      unlocked: false,
      enablePhrases: true,
      enableMatch: true,
      characters: [],
      phrases: [],
      matchQuestions: []
    };
    setLocalLessons([...localLessons, newLesson]);
    setSelectedLessonId(newId);
  };

  const deleteLesson = (id: string) => {
    showConfirm(
      '確認刪除',
      '確定要刪除整個課程主題嗎？此操作無法撤銷。',
      () => {
        const next = localLessons.filter(l => l.id !== id);
        setLocalLessons(next);
        if (next.length > 0) setSelectedLessonId(next[0].id);
        else setSelectedLessonId(null);
      }
    );
  };

  const moveLesson = (index: number, direction: 'up' | 'down') => {
    const nextLessons = [...localLessons];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= nextLessons.length) return;
    
    [nextLessons[index], nextLessons[targetIndex]] = [nextLessons[targetIndex], nextLessons[index]];
    setLocalLessons(nextLessons);
  };

  // Character Management
  const addCharacter = () => {
    if (!selectedLessonId) return;
    const char: Character = {
      char: '新', pinyin: 'xīn', jyutping: 'san1', meaning: 'New', unlocked: false, order: activeLesson?.characters.length || 0
    };
    updateLesson(selectedLessonId, { characters: [...(activeLesson?.characters || []), char] });
  };

  const updateCharacter = (idx: number, updates: Partial<Character>) => {
    if (!selectedLessonId || !activeLesson) return;
    const chars = [...activeLesson.characters];
    chars[idx] = { ...chars[idx], ...updates };
    updateLesson(selectedLessonId, { characters: chars });
  };

  const deleteCharacter = (idx: number) => {
    if (!selectedLessonId || !activeLesson) return;
    const chars = activeLesson.characters.filter((_, i) => i !== idx);
    updateLesson(selectedLessonId, { characters: chars });
  };

  // Phrase Management
  const addPhrase = () => {
    if (!selectedLessonId) return;
    const phrase: Phrase = { text: '詞語', meaning: 'Phrase', pinyin: 'cí yǔ', jyutping: 'ci4 jyu5' };
    updateLesson(selectedLessonId, { phrases: [...(activeLesson?.phrases || []), phrase] });
  };

  const updatePhrase = (idx: number, updates: Partial<Phrase>) => {
    if (!selectedLessonId || !activeLesson) return;
    const phrases = [...activeLesson.phrases];
    phrases[idx] = { ...phrases[idx], ...updates };
    updateLesson(selectedLessonId, { phrases: phrases });
  };

  const deletePhrase = (idx: number) => {
    if (!selectedLessonId || !activeLesson) return;
    const phrases = activeLesson.phrases.filter((_, i) => i !== idx);
    updateLesson(selectedLessonId, { phrases: phrases });
  };

  // Match Management
  const addMatchQuestion = () => {
    if (!selectedLessonId) return;
    const mq: MatchQuestion = { imageUrl: 'https://images.unsplash.com/photo-1591123120675-6f7f1aae0e5b', correctChar: '' };
    updateLesson(selectedLessonId, { matchQuestions: [...(activeLesson?.matchQuestions || []), mq] });
  };

  const updateMatchQuestion = (idx: number, updates: Partial<MatchQuestion>) => {
    if (!selectedLessonId || !activeLesson) return;
    const questions = [...activeLesson.matchQuestions];
    questions[idx] = { ...questions[idx], ...updates };
    updateLesson(selectedLessonId, { matchQuestions: questions });
  };

  const deleteMatchQuestion = (idx: number) => {
    if (!selectedLessonId || !activeLesson) return;
    const questions = activeLesson.matchQuestions.filter((_, i) => i !== idx);
    updateLesson(selectedLessonId, { matchQuestions: questions });
  };

  return (
    <div className="w-full h-full flex flex-col bg-gray-50 text-gray-800 relative">
      {/* AI Loading Overlay */}
      {isAiLoading && (
        <div className="fixed inset-0 z-[300] bg-black/60 backdrop-blur-md flex flex-col items-center justify-center text-white">
           <div className="w-24 h-24 relative mb-6">
              <div className="absolute inset-0 border-8 border-white/20 rounded-full"></div>
              <div className="absolute inset-0 border-8 border-t-pink-400 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center text-4xl">✨</div>
           </div>
           <h2 className="text-2xl font-black mb-2 animate-pulse">AI 正在編寫課程...</h2>
           <p className="text-white/60 font-bold">這可能需要幾秒鐘時間</p>
        </div>
      )}

      {/* Custom Admin Modal */}
      {modal.isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => modal.type === 'info' && setModal(prev => ({ ...prev, isOpen: false }))}></div>
          <div className="relative bg-white rounded-3xl p-6 w-full max-w-sm border-2 border-gray-100 shadow-2xl animate-in zoom-in-95 duration-200">
            <h3 className="text-xl font-black mb-2 text-gray-900">{modal.title}</h3>
            <p className="text-gray-600 mb-4 text-sm">{modal.message}</p>
            
            {modal.type === 'ai_prompt' && (
              <input 
                type="text" autoFocus value={aiPromptInput} onChange={(e) => setAiPromptInput(e.target.value)}
                placeholder="輸入課程主題..."
                className="w-full p-4 bg-gray-50 border-2 border-gray-100 rounded-2xl mb-6 focus:outline-none focus:border-pink-400 font-bold"
              />
            )}

            <div className="flex space-x-3">
              {(modal.type === 'confirm' || modal.type === 'ai_prompt') && (
                <button 
                  onClick={() => setModal(prev => ({ ...prev, isOpen: false }))}
                  className="flex-1 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-500 font-bold rounded-xl transition-colors"
                >
                  取消
                </button>
              )}
              <button 
                onClick={() => modal.onConfirm(aiPromptInput)}
                className={`flex-[2_2_0%] py-2.5 text-white font-bold rounded-xl shadow-lg transition-colors ${modal.type === 'ai_prompt' ? 'bg-gradient-to-r from-pink-500 to-purple-600' : 'bg-gray-900 hover:bg-black'}`}
              >
                {modal.type === 'confirm' ? '確認' : modal.type === 'ai_prompt' ? '開始生成 ✨' : '知道了'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Admin Top Bar */}
      <div className="bg-white border-b-2 border-gray-200 px-6 py-4 flex justify-between items-center shrink-0 shadow-sm z-40">
        <div className="flex items-center space-x-4">
          <button onClick={onExit} className="text-2xl hover:scale-110 active:scale-95 transition-all">🏠</button>
          <h1 className="text-xl font-black flex items-center">
            <span className="bg-gray-800 text-white p-1 rounded mr-2 text-xs">ADMIN</span>
            課程管理器
          </h1>
        </div>
        <div className="flex space-x-2">
          <label className="bg-white border-2 border-gray-200 px-4 py-2 rounded-xl font-bold text-sm cursor-pointer hover:bg-gray-50 flex items-center">
            📥 導入 JSON
            <input type="file" accept=".json" onChange={importData} className="hidden" />
          </label>
          <button onClick={exportData} className="bg-white border-2 border-gray-200 px-4 py-2 rounded-xl font-bold text-sm hover:bg-gray-50">📤 導出 JSON</button>
          <button onClick={saveChanges} className="bg-orange-500 text-white px-6 py-2 rounded-xl font-black text-sm shadow-lg hover:bg-orange-600 transition-all">💾 儲存所有更改</button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar: Lesson List */}
        <div className="w-80 border-r-2 border-gray-200 flex flex-col bg-white shrink-0">
          <div className="p-4 border-b border-gray-100 flex justify-between items-center shrink-0">
             <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">課程主題 Lessons</span>
             <div className="flex space-x-2">
               <button onClick={openAiGenerator} className="text-pink-500 font-black text-xs hover:underline flex items-center">✨ AI 生成</button>
               <span className="text-gray-200">|</span>
               <button onClick={addLesson} className="text-blue-500 font-black text-xs hover:underline">+ 手動新增</button>
             </div>
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-2">
            {localLessons.map((l, idx) => (
              <div key={l.id} className="flex items-center group space-x-1">
                <div className="flex flex-col opacity-0 group-hover:opacity-100 transition-opacity">
                   <button onClick={() => moveLesson(idx, 'up')} disabled={idx === 0} className="p-1 text-gray-400 hover:text-gray-800 disabled:opacity-20">⬆️</button>
                   <button onClick={() => moveLesson(idx, 'down')} disabled={idx === localLessons.length - 1} className="p-1 text-gray-400 hover:text-gray-800 disabled:opacity-20">⬇️</button>
                </div>
                <button
                  onClick={() => setSelectedLessonId(l.id)}
                  className={`flex-1 text-left p-3 rounded-xl transition-all flex items-center space-x-3 ${selectedLessonId === l.id ? 'bg-gray-100 ring-2 ring-gray-200 shadow-inner' : 'hover:bg-gray-50'}`}
                >
                  <img src={l.image} className="w-10 h-10 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm truncate">{l.title}</p>
                    <p className="text-[10px] text-gray-400">{l.characters.length} 字 | {l.phrases.length} 詞</p>
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Workspace */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-8 bg-gray-50">
          {activeLesson ? (
            <div className="max-w-4xl mx-auto space-y-12 pb-20">
              {/* Lesson General Info */}
              <section className="bg-white p-6 rounded-3xl shadow-sm border border-gray-200 space-y-6">
                <div className="flex justify-between items-start">
                  <h2 className="text-lg font-black text-gray-400 uppercase tracking-wider">基本資料 General</h2>
                  <button onClick={() => deleteLesson(activeLesson.id)} className="text-red-400 hover:text-red-600 text-xs font-bold">🗑️ 刪除此主題</button>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400">主題名稱 Title</label>
                    <input 
                      type="text" value={activeLesson.title} onChange={(e) => updateLesson(activeLesson.id, { title: e.target.value })}
                      className="w-full p-3 bg-gray-50 border-2 border-gray-100 rounded-xl focus:outline-none focus:border-orange-400 font-bold"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-bold text-gray-400">封面圖片 URL Image</label>
                    </div>
                    <input 
                      type="text" value={activeLesson.image} onChange={(e) => updateLesson(activeLesson.id, { image: e.target.value })}
                      className="w-full p-3 bg-gray-50 border-2 border-gray-100 rounded-xl focus:outline-none focus:border-orange-400 text-xs font-mono"
                    />
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-2xl border-2 border-gray-100">
                  <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">遊戲模式設定 Game Modes</h3>
                  <div className="flex space-x-6">
                    <div className="flex items-center space-x-2">
                       <input 
                        type="checkbox" checked={activeLesson.unlocked} onChange={(e) => updateLesson(activeLesson.id, { unlocked: e.target.checked })}
                        className="w-4 h-4 rounded text-orange-500 focus:ring-orange-400"
                       />
                       <label className="text-sm font-bold text-gray-600">預設解鎖</label>
                    </div>
                    <div className="flex items-center space-x-2">
                       <input 
                        type="checkbox" checked={activeLesson.enablePhrases} onChange={(e) => updateLesson(activeLesson.id, { enablePhrases: e.target.checked })}
                        className="w-4 h-4 rounded text-pink-500 focus:ring-pink-400"
                       />
                       <label className="text-sm font-bold text-gray-600">詞語拼拼樂 (Phrases)</label>
                    </div>
                    <div className="flex items-center space-x-2">
                       <input 
                        type="checkbox" checked={activeLesson.enableMatch} onChange={(e) => updateLesson(activeLesson.id, { enableMatch: e.target.checked })}
                        className="w-4 h-4 rounded text-blue-500 focus:ring-blue-400"
                       />
                       <label className="text-sm font-bold text-gray-600">配對大挑戰 (Match)</label>
                    </div>
                  </div>
                </div>
              </section>

              {/* Characters Section */}
              <section className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-black text-gray-400 uppercase tracking-wider">文字庫 Characters ({activeLesson.characters.length})</h2>
                  <button onClick={addCharacter} className="bg-white border-2 border-blue-100 text-blue-500 px-4 py-1 rounded-full text-xs font-black hover:bg-blue-50">+ 新增字元</button>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {activeLesson.characters.map((c, i) => (
                    <div key={i} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200 flex items-center space-x-4 group">
                      <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center border-2 border-gray-100 shrink-0">
                         <input 
                          type="text" value={c.char} onChange={(e) => updateCharacter(i, { char: e.target.value })}
                          className="w-full text-center bg-transparent font-black text-xl focus:outline-none"
                         />
                      </div>
                      <div className="grid grid-cols-4 gap-4 flex-1">
                        <input 
                          placeholder="Jyutping" value={c.jyutping} onChange={(e) => updateCharacter(i, { jyutping: e.target.value })}
                          className="p-2 bg-gray-50 border-b-2 border-transparent focus:border-orange-400 focus:outline-none text-xs font-bold"
                        />
                        <input 
                          placeholder="Pinyin" value={c.pinyin} onChange={(e) => updateCharacter(i, { pinyin: e.target.value })}
                          className="p-2 bg-gray-50 border-b-2 border-transparent focus:border-orange-400 focus:outline-none text-xs font-bold"
                        />
                        <input 
                          placeholder="Meaning" value={c.meaning} onChange={(e) => updateCharacter(i, { meaning: e.target.value })}
                          className="p-2 bg-gray-50 border-b-2 border-transparent focus:border-orange-400 focus:outline-none text-xs font-bold"
                        />
                        <div className="flex items-center space-x-4">
                           <div className="flex items-center space-x-1">
                             <input type="checkbox" checked={c.unlocked} onChange={(e) => updateCharacter(i, { unlocked: e.target.checked })} className="rounded" />
                             <span className="text-[10px] font-bold text-gray-400">已學</span>
                           </div>
                           <button onClick={() => deleteCharacter(i)} className="text-red-300 opacity-0 group-hover:opacity-100 hover:text-red-500 transition-opacity">🗑️</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Phrases Section */}
              <section className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-black text-gray-400 uppercase tracking-wider">詞語挑戰 Phrases ({activeLesson.phrases.length})</h2>
                  <button onClick={addPhrase} className="bg-white border-2 border-pink-100 text-pink-500 px-4 py-1 rounded-full text-xs font-black hover:bg-pink-50">+ 新增詞語</button>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {activeLesson.phrases.map((p, i) => (
                    <div key={i} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200 flex items-center space-x-4 group">
                      <input 
                        type="text" value={p.text} onChange={(e) => updatePhrase(i, { text: e.target.value })}
                        className="w-24 p-2 bg-gray-50 rounded-lg font-black focus:outline-none focus:ring-2 focus:ring-pink-200"
                      />
                      <div className="grid grid-cols-3 gap-4 flex-1">
                        <input 
                          placeholder="Jyutping" value={p.jyutping} onChange={(e) => updatePhrase(i, { jyutping: e.target.value })}
                          className="p-2 bg-gray-50 border-b-2 border-transparent focus:border-orange-400 focus:outline-none text-xs font-bold"
                        />
                        <input 
                          placeholder="Meaning" value={p.meaning} onChange={(e) => updatePhrase(i, { meaning: e.target.value })}
                          className="p-2 bg-gray-50 border-b-2 border-transparent focus:border-orange-400 focus:outline-none text-xs font-bold"
                        />
                        <button onClick={() => deletePhrase(i)} className="text-red-300 opacity-0 group-hover:opacity-100 hover:text-red-500 transition-opacity text-right pr-2">🗑️</button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Match Questions Section */}
              <section className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-black text-gray-400 uppercase tracking-wider">配對挑戰 Match ({activeLesson.matchQuestions.length})</h2>
                  <button onClick={addMatchQuestion} className="bg-white border-2 border-cyan-100 text-cyan-500 px-4 py-1 rounded-full text-xs font-black hover:bg-cyan-50">+ 新增配對題目</button>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {activeLesson.matchQuestions.map((mq, i) => (
                    <div key={i} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200 flex items-center space-x-4 group">
                      <div className="w-16 h-16 bg-gray-50 rounded-xl overflow-hidden border-2 border-gray-100 shrink-0">
                         <img src={mq.imageUrl} className="w-full h-full object-cover" />
                      </div>
                      <div className="grid grid-cols-2 gap-4 flex-1">
                        <input 
                          placeholder="圖片 URL" value={mq.imageUrl} onChange={(e) => updateMatchQuestion(i, { imageUrl: e.target.value })}
                          className="p-2 bg-gray-50 border-b-2 border-transparent focus:border-cyan-400 focus:outline-none text-xs font-mono"
                        />
                        <div className="flex items-center space-x-2">
                          <select 
                            value={mq.correctChar} 
                            onChange={(e) => updateMatchQuestion(i, { correctChar: e.target.value })}
                            className="flex-1 p-2 bg-gray-50 border-b-2 border-transparent focus:border-cyan-400 focus:outline-none text-xs font-bold"
                          >
                            <option value="">選擇正確字元...</option>
                            {activeLesson.characters.map(c => (
                              <option key={c.char} value={c.char}>{c.char}</option>
                            ))}
                          </select>
                          <button onClick={() => deleteMatchQuestion(i)} className="text-red-300 opacity-0 group-hover:opacity-100 hover:text-red-500 transition-opacity">🗑️</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-gray-300 space-y-4">
              <span className="text-6xl">📝</span>
              <p className="font-black text-lg">請選擇或建立一個課程主題</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminSection;
