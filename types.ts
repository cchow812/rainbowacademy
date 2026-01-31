
export enum GameView {
  MAP = 'MAP',
  WRITING = 'WRITING',
  STORY = 'STORY',
  PHRASE = 'PHRASE',
  PICTURE_MATCH = 'PICTURE_MATCH',
  ADMIN = 'ADMIN'
}

export interface StrokePoint {
  x: number; // 0-100
  y: number; // 0-100
}

export interface StrokeInfo {
  order: number;
  name: string;
  description: string;
  path: StrokePoint[]; 
}

export interface Character {
  char: string;
  pinyin: string;
  jyutping: string;
  meaning: string;
  unlocked: boolean;
  order: number;
  strokes?: StrokeInfo[];
}

export interface Phrase {
  text: string;
  meaning: string;
  pinyin: string;
  jyutping: string;
}

export interface MatchQuestion {
  imageUrl: string;
  correctChar: string;
}

export interface Lesson {
  id: string;
  title: string;
  characters: Character[];
  phrases: Phrase[];
  matchQuestions: MatchQuestion[];
  enablePhrases: boolean;
  enableMatch: boolean;
  image: string;
  unlocked: boolean;
}
