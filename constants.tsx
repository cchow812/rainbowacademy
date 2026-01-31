
import { Lesson } from './types';

export const INITIAL_LESSONS: Lesson[] = [
  {
    id: 'lesson-1',
    title: '我的家 (My Family)',
    image: 'https://images.unsplash.com/photo-1591123120675-6f7f1aae0e5b?auto=format&fit=crop&q=80&w=800',
    unlocked: true,
    enablePhrases: true,
    enableMatch: true,
    characters: [
      { char: '我', pinyin: 'wǒ', jyutping: 'ngo5', meaning: 'I / Me', unlocked: false, order: 0 },
      { char: '媽', pinyin: 'mā', jyutping: 'maa1', meaning: 'Mother', unlocked: false, order: 1 },
      { char: '爸', pinyin: 'bà', jyutping: 'baa1', meaning: 'Father', unlocked: false, order: 2 },
      { char: '的', pinyin: 'de', jyutping: 'dik1', meaning: 'My / Of', unlocked: false, order: 3 },
      { char: '家', pinyin: 'jiā', jyutping: 'gaa1', meaning: 'Home', unlocked: false, order: 4 },
      { char: '人', pinyin: 'rén', jyutping: 'jan4', meaning: 'People', unlocked: false, order: 5 },
    ],
    phrases: [
      { text: '我的家', meaning: 'My Home', pinyin: 'wǒ de jiā', jyutping: 'ngo5 dik1 gaa1' },
      { text: '我的家人', meaning: 'My Family', pinyin: 'wǒ de jiā rén', jyutping: 'ngo5 dik1 gaa1 jan4' },
      { text: '爸爸媽媽', meaning: 'Dad and Mom', pinyin: 'bà ba mā ma', jyutping: 'baa1 baa1 maa1 maa1' }
    ],
    matchQuestions: [
      { imageUrl: 'https://images.unsplash.com/photo-1536640712247-c45474d6c6a9?auto=format&fit=crop&q=80&w=400', correctChar: '家' },
      { imageUrl: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=400', correctChar: '人' }
    ]
  },
  {
    id: 'lesson-2',
    title: '小動物 (Little Animals)',
    image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=800',
    unlocked: false,
    enablePhrases: true,
    enableMatch: true,
    characters: [
      { char: '小', pinyin: 'xiǎo', jyutping: 'siu2', meaning: 'Small', unlocked: false, order: 0 },
      { char: '狗', pinyin: 'gǒu', jyutping: 'gau2', meaning: 'Dog', unlocked: false, order: 1 },
      { char: '大', pinyin: 'dà', jyutping: 'daai6', meaning: 'Big', unlocked: false, order: 2 },
      { char: '貓', pinyin: 'māo', jyutping: 'maau1', meaning: 'Cat', unlocked: false, order: 3 },
      { char: '鳥', pinyin: 'niǎo', jyutping: 'niu5', meaning: 'Bird', unlocked: false, order: 4 },
    ],
    phrases: [
      { text: '大貓小狗', meaning: 'Big cat and little dog', pinyin: 'dà māo xiǎo gǒu', jyutping: 'daai6 maau1 siu2 gau2' },
      { text: '大大小小', meaning: 'Big and small', pinyin: 'dà dà xiǎo xiǎo', jyutping: 'daai6 daai6 siu2 siu2' },
      { text: '小鳥小狗', meaning: 'Little bird and dog', pinyin: 'xiǎo niǎo xiǎo gǒu', jyutping: 'siu2 niu5 siu2 gau2' }
    ],
    matchQuestions: [
      { imageUrl: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&q=80&w=400', correctChar: '狗' },
      { imageUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=400', correctChar: '貓' }
    ]
  },
  {
    id: 'lesson-3',
    title: '大自然 (Nature)',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=800',
    unlocked: false,
    enablePhrases: true,
    enableMatch: true,
    characters: [
      { char: '山', pinyin: 'shān', jyutping: 'saan1', meaning: 'Mountain', unlocked: false, order: 0 },
      { char: '水', pinyin: 'shuǐ', jyutping: 'seoi2', meaning: 'Water', unlocked: false, order: 1 },
      { char: '月', pinyin: 'yuè', jyutping: 'jyut6', meaning: 'Moon', unlocked: false, order: 2 },
      { char: '日', pinyin: 'rì', jyutping: 'jat6', meaning: 'Sun', unlocked: false, order: 3 },
      { char: '木', pinyin: 'mù', jyutping: 'muk6', meaning: 'Wood', unlocked: false, order: 4 },
    ],
    phrases: [
      { text: '山水日月', meaning: 'Mountains, water, sun and moon', pinyin: 'shān shuǐ rì yuè', jyutping: 'saan1 seoi2 jat6 jyut6' },
      { text: '大山大水', meaning: 'Great mountains and rivers', pinyin: 'dà shān dà shuǐ', jyutping: 'daai6 saan1 daai6 seoi2' },
      { text: '木頭人', meaning: 'Wooden person / Statue game', pinyin: 'mù tou rén', jyutping: 'mù tau4 jan4' }
    ],
    matchQuestions: [
      { imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=400', correctChar: '山' },
      { imageUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=400', correctChar: '水' }
    ]
  },
  {
    id: 'lesson-4',
    title: '繽紛顏色 (Colors)',
    image: 'https://images.unsplash.com/photo-1502691876148-a84978e59af8?auto=format&fit=crop&q=80&w=800',
    unlocked: false,
    enablePhrases: true,
    enableMatch: true,
    characters: [
      { char: '紅', pinyin: 'hóng', jyutping: 'hung4', meaning: 'Red', unlocked: false, order: 0 },
      { char: '黃', pinyin: 'huáng', jyutping: 'wong4', meaning: 'Yellow', unlocked: false, order: 1 },
      { char: '藍', pinyin: 'lán', jyutping: 'laam4', meaning: 'Blue', unlocked: false, order: 2 },
      { char: '綠', pinyin: 'lǜ', jyutping: 'luk6', meaning: 'Green', unlocked: false, order: 3 },
      { char: '白', pinyin: 'bái', jyutping: 'baak6', meaning: 'White', unlocked: false, order: 4 },
      { char: '黑', pinyin: 'hēi', jyutping: 'hak1', meaning: 'Black', unlocked: false, order: 5 },
    ],
    phrases: [
      { text: '紅蘋果', meaning: 'Red apple', pinyin: 'hóng píng guǒ', jyutping: 'hung4 ping4 gwo2' },
      { text: '藍天白雲', meaning: 'Blue sky and white clouds', pinyin: 'lán tiān bái yún', jyutping: 'laam4 tin1 baak6 wan4' },
      { text: '紅綠燈', meaning: 'Traffic lights', pinyin: 'hóng lǜ dēng', jyutping: 'hung4 luk6 dang1' }
    ],
    matchQuestions: [
      { imageUrl: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&q=80&w=400', correctChar: '紅' },
      { imageUrl: 'https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80&w=400', correctChar: '藍' }
    ]
  },
  {
    id: 'lesson-5',
    title: '數一數 (Counting)',
    image: 'https://images.unsplash.com/photo-1594608661623-aa0bd3a69d98?auto=format&fit=crop&q=80&w=800',
    unlocked: false,
    enablePhrases: true,
    enableMatch: true,
    characters: [
      { char: '一', pinyin: 'yī', jyutping: 'jat1', meaning: 'One', unlocked: false, order: 0 },
      { char: '二', pinyin: 'èr', jyutping: 'ji6', meaning: 'Two', unlocked: false, order: 1 },
      { char: '三', pinyin: 'sān', jyutping: 'saam1', meaning: 'Three', unlocked: false, order: 2 },
      { char: '四', pinyin: 'sì', jyutping: 'sei3', meaning: 'Four', unlocked: false, order: 3 },
      { char: '五', pinyin: 'wǔ', jyutping: 'ng5', meaning: 'Five', unlocked: false, order: 4 },
      { char: '十', pinyin: 'shí', jyutping: 'sap6', meaning: 'Ten', unlocked: false, order: 5 },
    ],
    phrases: [
      { text: '一二三', meaning: 'One, two, three', pinyin: 'yī èr sān', jyutping: 'jat1 ji6 saam1' },
      { text: '五個人', meaning: 'Five people', pinyin: 'wǔ gè rén', jyutping: 'ng5 go3 jan4' },
      { text: '十一', meaning: 'Eleven', pinyin: 'shí yī', jyutping: 'sap6 jat1' }
    ],
    matchQuestions: [
      { imageUrl: 'https://images.unsplash.com/photo-1544256718-3bcf237f3974?auto=format&fit=crop&q=80&w=400', correctChar: '三' },
      { imageUrl: 'https://images.unsplash.com/photo-1590480597474-9be4613a02c3?auto=format&fit=crop&q=80&w=400', correctChar: '五' }
    ]
  },
  {
    id: 'lesson-6',
    title: '我的身體 (Body)',
    image: 'https://images.unsplash.com/photo-1505148230895-d9a7a6e55571?auto=format&fit=crop&q=80&w=800',
    unlocked: false,
    enablePhrases: true,
    enableMatch: true,
    characters: [
      { char: '手', pinyin: 'shǒu', jyutping: 'sau2', meaning: 'Hand', unlocked: false, order: 0 },
      { char: '足', pinyin: 'zú', jyutping: 'zuk1', meaning: 'Foot', unlocked: false, order: 1 },
      { char: '口', pinyin: 'kǒu', jyutping: 'hau2', meaning: 'Mouth', unlocked: false, order: 2 },
      { char: '耳', pinyin: 'ěr', jyutping: 'ji5', meaning: 'Ear', unlocked: false, order: 3 },
      { char: '目', pinyin: 'mù', jyutping: 'muk6', meaning: 'Eye', unlocked: false, order: 4 },
      { char: '頭', pinyin: 'tóu', jyutping: 'tau4', meaning: 'Head', unlocked: false, order: 5 },
    ],
    phrases: [
      { text: '大手小手', meaning: 'Big hand, little hand', pinyin: 'dà shǒu xiǎo shǒu', jyutping: 'daai6 sau2 siu2 sau2' },
      { text: '口耳目', meaning: 'Mouth, ear and eyes', pinyin: 'kǒu ěr mù', jyutping: 'hau2 ji5 muk6' },
      { text: '手足', meaning: 'Hands and feet / Siblings', pinyin: 'shǒu zú', jyutping: 'sau2 zuk1' }
    ],
    matchQuestions: [
      { imageUrl: 'https://images.unsplash.com/photo-1516733968668-dbdce39c46ef?auto=format&fit=crop&q=80&w=400', correctChar: '手' },
      { imageUrl: 'https://images.unsplash.com/photo-1506443434121-6a0ad609cb55?auto=format&fit=crop&q=80&w=400', correctChar: '口' }
    ]
  },
  {
    id: 'lesson-7',
    title: '天氣變幻 (Weather)',
    image: 'https://images.unsplash.com/photo-1534088568595-a066f7105a21?auto=format&fit=crop&q=80&w=800',
    unlocked: false,
    enablePhrases: true,
    enableMatch: true,
    characters: [
      { char: '雨', pinyin: 'yǔ', jyutping: 'jyu5', meaning: 'Rain', unlocked: false, order: 0 },
      { char: '雲', pinyin: 'yún', jyutping: 'wan4', meaning: 'Cloud', unlocked: false, order: 1 },
      { char: '風', pinyin: 'fēng', jyutping: 'fung1', meaning: 'Wind', unlocked: false, order: 2 },
      { char: '電', pinyin: 'diàn', jyutping: 'din6', meaning: 'Lightning / Electric', unlocked: false, order: 3 },
      { char: '雪', pinyin: 'xuě', jyutping: 'syut3', meaning: 'Snow', unlocked: false, order: 4 },
    ],
    phrases: [
      { text: '風雨', meaning: 'Wind and rain', pinyin: 'fēng yǔ', jyutping: 'fung1 jyu5' },
      { text: '白雪', meaning: 'White snow', pinyin: 'bái xuě', jyutping: 'baak6 syut3' },
      { text: '下雨天', meaning: 'Rainy day', pinyin: 'xià yǔ tiān', jyutping: 'haa6 jyu5 tin1' }
    ],
    matchQuestions: [
      { imageUrl: 'https://images.unsplash.com/photo-1514632595863-60838b383ef1?auto=format&fit=crop&q=80&w=400', correctChar: '雨' },
      { imageUrl: 'https://images.unsplash.com/photo-1483977399921-6cf3496d4acc?auto=format&fit=crop&q=80&w=400', correctChar: '雪' }
    ]
  }
];
