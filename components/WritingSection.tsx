
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Character, StrokePoint } from '../types';
import { GoogleGenAI, Type } from "@google/genai";

interface WritingSectionProps {
  character: Character;
  onComplete: () => void;
  onBack: () => void;
}

type Mode = 'FREE' | 'RECORDING' | 'PRACTICING';

const WritingSection: React.FC<WritingSectionProps> = ({ character, onComplete, onBack }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const demoCanvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const isDrawingRef = useRef(false);
  const lastPosRef = useRef<{ x: number, y: number } | null>(null);

  const [mode, setMode] = useState<Mode>('FREE');
  const [hasStarted, setHasStarted] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [lang, setLang] = useState<'yue' | 'cmn'>('yue');
  const [promptMsg, setPromptMsg] = useState<string | null>(null);

  // Recording State
  const [recordedStrokes, setRecordedStrokes] = useState<StrokePoint[][]>([]);
  const [currentStrokePath, setCurrentStrokePath] = useState<StrokePoint[]>([]);
  const [currentStrokeIndex, setCurrentStrokeIndex] = useState(0);
  const [isDemoing, setIsDemoing] = useState(false);

  const STROKE_RATIO = 18;

  const setupCanvases = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const rect = container.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    if (width <= 0 || height <= 0) return;

    [canvasRef.current, demoCanvasRef.current].forEach(canvas => {
      if (canvas) {
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.lineWidth = width / STROKE_RATIO;
        }
      }
    });
  }, []);

  useEffect(() => {
    const timer = setTimeout(setupCanvases, 100);
    window.addEventListener('resize', setupCanvases);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', setupCanvases);
    };
  }, [setupCanvases]);

  const getPointerPos = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    
    let clientX, clientY;
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = (e as React.MouseEvent).clientX;
      clientY = (e as React.MouseEvent).clientY;
    }
    
    return { 
      x: clientX - rect.left, 
      y: clientY - rect.top 
    };
  };

  const onStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (isDemoing || isSuccess || isVerifying) return;
    
    const pos = getPointerPos(e);
    isDrawingRef.current = true;
    setHasStarted(true);
    lastPosRef.current = pos;

    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d')!;
      const color = mode === 'RECORDING' ? "#3b82f6" : mode === 'PRACTICING' ? "#f472b6" : "#2d3748";
      
      ctx.beginPath();
      ctx.fillStyle = color;
      ctx.arc(pos.x, pos.y, (canvas.width / STROKE_RATIO) / 2, 0, Math.PI * 2);
      ctx.fill();

      if (mode === 'RECORDING' || mode === 'PRACTICING') {
        const normalized = { x: (pos.x / canvas.width) * 100, y: (pos.y / canvas.height) * 100 };
        setCurrentStrokePath([normalized]);
      }
    }
  };

  const onMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawingRef.current || !canvasRef.current || !lastPosRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d')!;
    const pos = getPointerPos(e);
    
    const color = mode === 'RECORDING' ? "#3b82f6" : mode === 'PRACTICING' ? "#f472b6" : "#2d3748";
    
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = canvas.width / STROKE_RATIO;
    ctx.moveTo(lastPosRef.current.x, lastPosRef.current.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    
    lastPosRef.current = pos;

    if (mode === 'RECORDING' || mode === 'PRACTICING') {
      const normalized = { x: (pos.x / canvas.width) * 100, y: (pos.y / canvas.height) * 100 };
      setCurrentStrokePath(prev => [...prev, normalized]);
    }
  };

  const onEnd = () => {
    if (!isDrawingRef.current) return;
    isDrawingRef.current = false;
    lastPosRef.current = null;

    if (mode === 'RECORDING') {
      if (currentStrokePath.length > 2) {
        setRecordedStrokes(prev => [...prev, currentStrokePath]);
      }
      setCurrentStrokePath([]);
    } else if (mode === 'PRACTICING') {
      handleChildStrokeComplete();
    }
  };

  const handleChildStrokeComplete = () => {
    const nextIndex = currentStrokeIndex + 1;
    if (nextIndex < recordedStrokes.length) {
      setCurrentStrokeIndex(nextIndex);
      playSingleDemoStroke(nextIndex);
    } else {
      triggerEvaluation();
    }
  };

  const triggerEvaluation = async () => {
    if (!canvasRef.current) return;
    setIsVerifying(true);

    try {
      const base64Image = canvasRef.current.toDataURL('image/png').split(',')[1];
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [
          {
            parts: [
              { text: `You are a friendly teacher. Look at this handwritten Chinese character. Does it look like the traditional Chinese character "${character.char}"? Even if it is messy (written by a kid), is it recognizable? Answer in JSON format with "score" (0-10) and "isPass" (boolean).` },
              { inlineData: { mimeType: 'image/png', data: base64Image } }
            ]
          }
        ],
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              score: { type: Type.NUMBER },
              isPass: { type: Type.BOOLEAN },
            },
            required: ["score", "isPass"]
          }
        }
      });

      const result = JSON.parse(response.text || '{}');
      
      if (result.isPass || result.score >= 6) {
        setIsSuccess(true);
        speak();
      } else {
        setPromptMsg("再試一次看看？你可以寫得更像「" + character.char + "」喔！");
        setTimeout(() => setPromptMsg(null), 3000);
      }
    } catch (error) {
      console.error("Evaluation failed", error);
      setIsSuccess(true);
      speak();
    } finally {
      setIsVerifying(false);
    }
  };

  const playSingleDemoStroke = async (index: number) => {
    if (!demoCanvasRef.current || !recordedStrokes[index]) return;
    setIsDemoing(true);
    const ctx = demoCanvasRef.current.getContext('2d')!;
    const w = demoCanvasRef.current.width;
    const h = demoCanvasRef.current.height;
    
    ctx.clearRect(0, 0, w, h);
    await animateStroke(ctx, recordedStrokes[index], w, h, "rgba(59, 130, 246, 0.5)");
    setIsDemoing(false);
  };

  const animateStroke = (ctx: CanvasRenderingContext2D, path: StrokePoint[], w: number, h: number, color: string) => {
    return new Promise<void>((resolve) => {
      let step = 0;
      const interval = setInterval(() => {
        if (step >= path.length - 1) {
          clearInterval(interval);
          resolve();
          return;
        }
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = w / STROKE_RATIO;
        const start = path[step];
        const end = path[step + 1];
        ctx.moveTo((start.x / 100) * w, (start.y / 100) * h);
        ctx.lineTo((end.x / 100) * w, (end.y / 100) * h);
        ctx.stroke();
        step++;
      }, 12);
    });
  };

  const startPracticing = () => {
    if (recordedStrokes.length === 0) return;
    setMode('PRACTICING');
    setCurrentStrokeIndex(0);
    setIsSuccess(false);
    setHasStarted(false);
    clearCanvas(false); 
    playSingleDemoStroke(0);
    setPromptMsg("現在換你跟著寫囉！加油！💪");
    setTimeout(() => setPromptMsg(null), 3000);
  };

  const clearCanvas = (resetStrokes = true) => {
    const ctx = canvasRef.current?.getContext('2d');
    const dCtx = demoCanvasRef.current?.getContext('2d');
    if (canvasRef.current) ctx?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    if (demoCanvasRef.current) dCtx?.clearRect(0, 0, demoCanvasRef.current.width, demoCanvasRef.current.height);
    setHasStarted(false);
    setIsSuccess(false);
    if (resetStrokes) {
      setRecordedStrokes([]);
      setCurrentStrokeIndex(0);
      setMode('FREE');
    }
  };

  const speak = () => {
    window.speechSynthesis.cancel();
    const s = new SpeechSynthesisUtterance(character.char);
    s.lang = lang === 'yue' ? 'zh-HK' : 'zh-CN';
    window.speechSynthesis.speak(s);
  };

  return (
    <div className="w-full h-full flex flex-col items-center bg-[#fffdf0] relative overflow-hidden">
      {isSuccess && (
        <div className="absolute inset-0 z-[100] bg-white/95 flex flex-col items-center justify-center p-6 animate-in zoom-in duration-300">
           <div className="text-8xl mb-4 animate-bounce">🌈✨🏆</div>
           <h2 className="text-4xl font-black rainbow-text mb-2">好棒呀！</h2>
           <p className="text-xl font-bold text-gray-600 mb-8 text-center">你學會寫「{character.char}」啦！</p>
           <button 
             onClick={onComplete}
             className="px-12 py-4 bg-gradient-to-r from-pink-400 to-orange-400 text-white rounded-[2rem] font-black text-xl shadow-2xl hover:scale-105 active:scale-95 transition-all border-4 border-white"
           >
             繼續冒險 🚀
           </button>
        </div>
      )}

      {/* Floating Prompt Message */}
      {promptMsg && (
        <div className="absolute top-36 z-50 pointer-events-none w-full flex justify-center px-4">
          <div className="bg-pink-500 text-white px-6 py-3 rounded-2xl font-black shadow-2xl border-4 border-white animate-bounce text-center max-w-xs">
            {promptMsg}
          </div>
        </div>
      )}

      {/* Header */}
      <div className="w-full flex flex-col items-center px-4 pt-4 shrink-0">
        <div className="w-full flex justify-between items-center">
           <button onClick={onBack} className="p-3 bg-white border-4 border-[#ffedf0] rounded-2xl shadow-sm hover:bg-gray-50 transition-all active:scale-90">
             <span className="text-pink-500 text-xl">⬅️</span>
           </button>
           
           <div className="flex space-x-2">
             {mode !== 'RECORDING' ? (
               <>
                 <button 
                   onClick={() => { clearCanvas(true); setMode('RECORDING'); }}
                   className="px-4 py-2 border-b-4 rounded-xl font-black text-sm shadow-md transition-all bg-white border-gray-100 text-gray-500"
                 >
                   👩‍🏫 大人錄製
                 </button>
                 <button 
                   onClick={startPracticing}
                   disabled={recordedStrokes.length === 0}
                   className={`px-4 py-2 border-b-4 rounded-xl font-black text-sm shadow-md transition-all ${mode === 'PRACTICING' ? 'bg-pink-400 border-pink-600 text-white scale-105' : 'bg-white border-gray-100 text-gray-400 disabled:opacity-30'}`}
                 >
                   👧 孩子跟寫
                 </button>
               </>
             ) : (
               <div className="px-4 py-2 bg-blue-100 text-blue-700 rounded-xl font-black text-sm flex items-center shadow-inner">
                 正在錄製第 {recordedStrokes.length + 1} 筆...
               </div>
             )}
           </div>
        </div>
        
        <div className="flex flex-col items-center mt-2">
           <h2 className="text-6xl font-black text-gray-800 leading-none">{character.char}</h2>
           <div className="flex items-center space-x-2 mt-1">
              <span className="text-2xl font-black text-[#f06292]">{lang === 'yue' ? character.jyutping : character.pinyin}</span>
              <button onClick={speak} className="text-lg hover:scale-110 transition-all filter drop-shadow-sm">🔊</button>
           </div>
        </div>
      </div>

      {/* Grid Area */}
      <div className="flex-1 w-full max-w-[400px] flex flex-col items-center justify-center p-6 relative">
        <div 
          ref={containerRef} 
          className="chinese-grid relative w-full aspect-square bg-white rounded-[2rem] border-[10px] border-[#ffcfd2] shadow-2xl overflow-hidden"
          style={{ touchAction: 'none' }}
        >
          {/* Faint Guide */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.05]">
            <span className="text-[240px] font-normal leading-none" style={{ fontFamily: 'Noto Sans TC' }}>{character.char}</span>
          </div>

          <canvas ref={demoCanvasRef} className="absolute inset-0 z-10 pointer-events-none opacity-80" />
          <canvas
            ref={canvasRef}
            onMouseDown={onStart} onMouseMove={onMove} onMouseUp={onEnd} onMouseLeave={onEnd}
            onTouchStart={onStart} onTouchMove={onMove} onTouchEnd={onEnd}
            className="absolute inset-0 z-20 cursor-crosshair touch-none"
          />

          {/* Red Stroke Sequence Numbers - LAYERED SVG FOR CLEAN OUTLINE */}
          <div className="absolute inset-0 z-40 pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              {(() => {
                let activeIdx = -1;
                if (mode === 'PRACTICING' && !isSuccess) {
                  activeIdx = currentStrokeIndex;
                } else if (mode === 'RECORDING' && recordedStrokes.length > 0) {
                  activeIdx = recordedStrokes.length - 1;
                }

                const stroke = recordedStrokes[activeIdx];
                if (!stroke) return null;
                const start = stroke[0];
                if (!start) return null;

                const textX = start.x;
                const textY = start.y - 4;

                return (
                  <g className="animate-in fade-in zoom-in duration-200">
                    {/* Background Stroke (The Outline) */}
                    <text 
                      x={textX} y={textY} 
                      fill="white" 
                      stroke="white"
                      strokeWidth="3.5"
                      strokeLinejoin="round"
                      fontSize="11" 
                      fontWeight="900" 
                      textAnchor="middle"
                      style={{ fontFamily: 'Fredoka' }}
                    >
                      {activeIdx + 1}
                    </text>
                    {/* Foreground Fill */}
                    <text 
                      x={textX} y={textY} 
                      fill="#ef4444" 
                      fontSize="11" 
                      fontWeight="900" 
                      textAnchor="middle"
                      style={{ fontFamily: 'Fredoka' }}
                    >
                      {activeIdx + 1}
                    </text>
                  </g>
                );
              })()}
            </svg>
          </div>

          {isVerifying && (
             <div className="absolute inset-0 z-50 bg-white/60 backdrop-blur-[2px] flex items-center justify-center">
               <div className="flex flex-col items-center bg-white p-6 rounded-3xl shadow-2xl border-4 border-pink-400">
                 <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mb-3"></div>
                 <span className="font-black text-pink-500 text-lg animate-pulse">正在批改中...</span>
               </div>
             </div>
          )}
        </div>
      </div>

      {/* Footer Controls */}
      <div className="w-full max-w-md px-6 pb-8 flex flex-col space-y-3 shrink-0 h-28">
        {mode === 'RECORDING' ? (
          <div className="flex space-x-3 w-full h-full animate-in slide-in-from-bottom-2">
            <button 
              onClick={() => { clearCanvas(true); setMode('FREE'); }}
              className="flex-1 py-4 bg-white border-b-8 border-gray-200 text-gray-400 rounded-3xl font-black text-xl active:translate-y-1 transition-all"
            >
              ❌ 取消
            </button>
            <button 
              onClick={startPracticing}
              disabled={recordedStrokes.length === 0}
              className="flex-2 py-4 bg-blue-500 border-b-8 border-blue-700 text-white rounded-3xl font-black text-xl active:translate-y-1 transition-all disabled:opacity-50 shadow-lg flex-[2_2_0%]"
            >
              ✅ 錄好啦！
            </button>
          </div>
        ) : (
          <div className="flex space-x-3 w-full h-full">
            {mode === 'FREE' && hasStarted && !isSuccess ? (
               <button 
                 onClick={triggerEvaluation}
                 disabled={isVerifying}
                 className="flex-1 py-4 bg-gradient-to-r from-green-400 to-emerald-500 border-b-8 border-emerald-700 text-white rounded-3xl font-black text-xl shadow-lg active:translate-y-1 transition-all flex items-center justify-center"
               >
                 {isVerifying ? '批改中...' : '✅ 我寫好了！'}
               </button>
            ) : (
              <button 
                onClick={() => { setMode('FREE'); clearCanvas(false); }}
                className={`flex-1 py-4 border-b-8 rounded-3xl font-black text-xl transition-all active:translate-y-1 shadow-lg ${mode === 'FREE' ? 'bg-orange-400 border-orange-600 text-white' : 'bg-white border-gray-100 text-gray-400'}`}
              >
                🎨 自由寫
              </button>
            )}
            
            <button 
              onClick={() => clearCanvas(mode !== 'PRACTICING')}
              className="flex-1 py-4 bg-[#e9ecf3] border-b-8 border-[#cbd5e1] rounded-3xl font-black text-xl text-gray-500 active:translate-y-1 transition-all shadow-lg"
            >
              🧹 清除
            </button>

            {mode === 'PRACTICING' && (
              <button 
                onClick={() => playSingleDemoStroke(currentStrokeIndex)}
                className="p-4 bg-pink-100 border-b-8 border-pink-300 text-pink-500 rounded-3xl shadow-lg active:translate-y-1 transition-all"
              >
                🔄
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default WritingSection;
