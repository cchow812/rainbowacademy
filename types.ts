
export enum GameView {
  MAP = 'MAP',
  WRITING = 'WRITING',
  STORY = 'STORY'
}

export interface StrokePoint {
  x: number; // 0-100
  y: number; // 0-100
}

export interface StrokeInfo {
  order: number;
  name: string;
  description: string;
  path: StrokePoint[]; // Sequence of points defining the stroke curve
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

export interface Lesson {
  id: string;
  title: string;
  characters: Character[];
  image: string;
  unlocked: boolean;
}
