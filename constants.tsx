
import { Lesson } from './types';

export const INITIAL_LESSONS: Lesson[] = [
  {
    id: 'lesson-1',
    title: '我的家 (My Family)',
    image: 'https://images.unsplash.com/photo-1591123120675-6f7f1aae0e5b?auto=format&fit=crop&q=80&w=800',
    unlocked: true,
    characters: [
      { char: '我', pinyin: 'wǒ', jyutping: 'ngo5', meaning: 'I / Me', unlocked: false, order: 0 },
      { char: '媽', pinyin: 'mā', jyutping: 'maa1', meaning: 'Mother', unlocked: false, order: 1 },
      { char: '爸', pinyin: 'bà', jyutping: 'baa1', meaning: 'Father', unlocked: false, order: 2 },
      { char: '的', pinyin: 'de', jyutping: 'dik1', meaning: 'My / Of', unlocked: false, order: 3 },
      { char: '家', pinyin: 'jiā', jyutping: 'gaa1', meaning: 'Home', unlocked: false, order: 4 },
      { char: '人', pinyin: 'rén', jyutping: 'jan4', meaning: 'People', unlocked: false, order: 5 },
    ]
  },
  {
    id: 'lesson-2',
    title: '小動物 (Little Animals)',
    image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=800',
    unlocked: false,
    characters: [
      { char: '小', pinyin: 'xiǎo', jyutping: 'siu2', meaning: 'Small', unlocked: false, order: 0 },
      { char: '狗', pinyin: 'gǒu', jyutping: 'gau2', meaning: 'Dog', unlocked: false, order: 1 },
      { char: '大', pinyin: 'dà', jyutping: 'daai6', meaning: 'Big', unlocked: false, order: 2 },
      { char: '貓', pinyin: 'māo', jyutping: 'maau1', meaning: 'Cat', unlocked: false, order: 3 },
      { char: '鳥', pinyin: 'niǎo', jyutping: 'niu5', meaning: 'Bird', unlocked: false, order: 4 },
    ]
  },
  {
    id: 'lesson-3',
    title: '大自然 (Nature)',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=800',
    unlocked: false,
    characters: [
      { char: '山', pinyin: 'shān', jyutping: 'saan1', meaning: 'Mountain', unlocked: false, order: 0 },
      { char: '水', pinyin: 'shuǐ', jyutping: 'seoi2', meaning: 'Water', unlocked: false, order: 1 },
      { char: '月', pinyin: 'yuè', jyutping: 'jyut6', meaning: 'Moon', unlocked: false, order: 2 },
      { char: '日', pinyin: 'rì', jyutping: 'jat6', meaning: 'Sun', unlocked: false, order: 3 },
      { char: '木', pinyin: 'mù', jyutping: 'muk6', meaning: 'Wood', unlocked: false, order: 4 },
    ]
  },
  {
    id: 'lesson-4',
    title: '數字 (Numbers)',
    image: 'https://images.unsplash.com/photo-1594608661623-aa0bd3a67d28?auto=format&fit=crop&q=80&w=800',
    unlocked: false,
    characters: [
      { char: '一', pinyin: 'yī', jyutping: 'jat1', meaning: 'One', unlocked: false, order: 0 },
      { char: '二', pinyin: 'èr', jyutping: 'ji6', meaning: 'Two', unlocked: false, order: 1 },
      { char: '三', pinyin: 'sān', jyutping: 'saam1', meaning: 'Three', unlocked: false, order: 2 },
      { char: '十', pinyin: 'shí', jyutping: 'sap6', meaning: 'Ten', unlocked: false, order: 3 },
    ]
  }
];
