
import { Lesson } from './types';

export const INITIAL_LESSONS: Lesson[] = [
  // LEVEL 1
  {
    id: 'L1-1',
    title: '基礎數字 (L1 Basics)',
    image: 'https://images.unsplash.com/photo-1594608661623-aa0bd3a69d98?auto=format&fit=crop&q=80&w=800',
    unlocked: true,
    enablePhrases: true,
    enableMatch: true,
    characters: [
      { char: '一', pinyin: 'yī', jyutping: 'jat1', meaning: 'One', unlocked: false, order: 0 },
      { char: '二', pinyin: 'èr', jyutping: 'ji6', meaning: 'Two', unlocked: false, order: 1 },
      { char: '三', pinyin: 'sān', jyutping: 'saam1', meaning: 'Three', unlocked: false, order: 2 },
      { char: '十', pinyin: 'shí', jyutping: 'sap6', meaning: 'Ten', unlocked: false, order: 3 },
      { char: '人', pinyin: 'rén', jyutping: 'jan4', meaning: 'Person', unlocked: false, order: 4 },
      { char: '口', pinyin: 'kǒu', jyutping: 'hau2', meaning: 'Mouth', unlocked: false, order: 5 },
    ],
    phrases: [
      { text: '十人', meaning: 'Ten people', pinyin: 'shí rén', jyutping: 'sap6 jan4' },
      { text: '三口', meaning: 'Three mouths', pinyin: 'sān kǒu', jyutping: 'saam1 hau2' },
      { text: '一人', meaning: 'One person', pinyin: 'yī rén', jyutping: 'jat1 jan4' }
    ],
    matchQuestions: [
      { imageUrl: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=400', correctChar: '人' },
      { imageUrl: 'https://images.unsplash.com/photo-1506443434121-6a0ad609cb55?auto=format&fit=crop&q=80&w=400', correctChar: '口' }
    ]
  },
  {
    id: 'L1-2',
    title: '天地五行 (L1 Nature)',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=800',
    unlocked: false,
    enablePhrases: true,
    enableMatch: true,
    characters: [
      { char: '木', pinyin: 'mù', jyutping: 'muk6', meaning: 'Wood', unlocked: false, order: 0 },
      { char: '山', pinyin: 'shān', jyutping: 'saan1', meaning: 'Mountain', unlocked: false, order: 1 },
      { char: '水', pinyin: 'shuǐ', jyutping: 'seoi2', meaning: 'Water', unlocked: false, order: 2 },
      { char: '火', pinyin: 'huǒ', jyutping: 'fo2', meaning: 'Fire', unlocked: false, order: 3 },
      { char: '土', pinyin: 'tǔ', jyutping: 'tou2', meaning: 'Earth / Soil', unlocked: false, order: 4 },
      { char: '天', pinyin: 'tiān', jyutping: 'tin1', meaning: 'Sky / Heaven', unlocked: false, order: 5 },
    ],
    phrases: [
      { text: '山水', meaning: 'Landscape (Mountain & Water)', pinyin: 'shān shuǐ', jyutping: 'saan1 seoi2' },
      { text: '水土', meaning: 'Climate (Water & Soil)', pinyin: 'shuǐ tǔ', jyutping: 'seoi2 tou2' },
      { text: '火山', meaning: 'Volcano', pinyin: 'huǒ shān', jyutping: 'fo2 saan1' }
    ],
    matchQuestions: [
      { imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=400', correctChar: '山' },
      { imageUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=400', correctChar: '水' }
    ]
  },
  {
    id: 'L1-3',
    title: '日月大小 (L1 Opposite)',
    image: 'https://images.unsplash.com/photo-1534088568595-a066f7105a21?auto=format&fit=crop&q=80&w=800',
    unlocked: false,
    enablePhrases: true,
    enableMatch: true,
    characters: [
      { char: '日', pinyin: 'rì', jyutping: 'jat6', meaning: 'Sun', unlocked: false, order: 0 },
      { char: '月', pinyin: 'yuè', jyutping: 'jyut6', meaning: 'Moon', unlocked: false, order: 1 },
      { char: '大', pinyin: 'dà', jyutping: 'daai6', meaning: 'Big', unlocked: false, order: 2 },
      { char: '小', pinyin: 'xiǎo', jyutping: 'siu2', meaning: 'Small', unlocked: false, order: 3 },
      { char: '上', pinyin: 'shàng', jyutping: 'soeng6', meaning: 'Up', unlocked: false, order: 4 },
      { char: '下', pinyin: 'xià', jyutping: 'haa6', meaning: 'Down', unlocked: false, order: 5 },
    ],
    phrases: [
      { text: '大小', meaning: 'Size', pinyin: 'dà xiǎo', jyutping: 'daai6 siu2' },
      { text: '上下', meaning: 'Above and below', pinyin: 'shàng xià', jyutping: 'soeng6 haa6' },
      { text: '日月', meaning: 'Sun and Moon / Time', pinyin: 'rì yuè', jyutping: 'jat6 jyut6' }
    ],
    matchQuestions: [
      { imageUrl: 'https://images.unsplash.com/photo-1495195129352-aec329a2d7ea?auto=format&fit=crop&q=80&w=400', correctChar: '日' },
      { imageUrl: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=400', correctChar: '月' }
    ]
  },
  {
    id: 'L1-4',
    title: '你我他 (L1 Grammar)',
    image: 'https://images.unsplash.com/photo-1591123120675-6f7f1aae0e5b?auto=format&fit=crop&q=80&w=800',
    unlocked: false,
    enablePhrases: true,
    enableMatch: true,
    characters: [
      { char: '我', pinyin: 'wǒ', jyutping: 'ngo5', meaning: 'I / Me', unlocked: false, order: 0 },
      { char: '你', pinyin: 'nǐ', jyutping: 'nei5', meaning: 'You', unlocked: false, order: 1 },
      { char: '他', pinyin: 'tā', jyutping: 'taa1', meaning: 'He / Him', unlocked: false, order: 2 },
      { char: '的', pinyin: 'de', jyutping: 'dik1', meaning: "Possessive ('s)", unlocked: false, order: 3 },
      { char: '是', pinyin: 'shì', jyutping: 'si6', meaning: 'Is / Am / Are', unlocked: false, order: 4 },
      { char: '有', pinyin: 'yǒu', jyutping: 'jau5', meaning: 'To have', unlocked: false, order: 5 },
    ],
    phrases: [
      { text: '我的', meaning: 'Mine', pinyin: 'wǒ de', jyutping: 'ngo5 dik1' },
      { text: '你是', meaning: 'You are', pinyin: 'nǐ shì', jyutping: 'nei5 si6' },
      { text: '他有', meaning: 'He has', pinyin: 'tā yǒu', jyutping: 'taa1 jau5' }
    ],
    matchQuestions: [
      { imageUrl: 'https://images.unsplash.com/photo-1542027959157-98e6745f4ba7?auto=format&fit=crop&q=80&w=400', correctChar: '我' },
      { imageUrl: 'https://images.unsplash.com/photo-1582213726893-ed9e0ff31859?auto=format&fit=crop&q=80&w=400', correctChar: '你' }
    ]
  },

  // LEVEL 2
  {
    id: 'L2-1',
    title: '左右心力 (L2 Body)',
    image: 'https://images.unsplash.com/photo-1505148230895-d9a7a6e55571?auto=format&fit=crop&q=80&w=800',
    unlocked: false,
    enablePhrases: true,
    enableMatch: true,
    characters: [
      { char: '左', pinyin: 'zuǒ', jyutping: 'zo2', meaning: 'Left', unlocked: false, order: 0 },
      { char: '右', pinyin: 'yòu', jyutping: 'jau6', meaning: 'Right', unlocked: false, order: 1 },
      { char: '心', pinyin: 'xīn', jyutping: 'sam1', meaning: 'Heart', unlocked: false, order: 2 },
      { char: '王', pinyin: 'wáng', jyutping: 'wong4', meaning: 'King', unlocked: false, order: 3 },
      { char: '女', pinyin: 'nǚ', jyutping: 'neoi5', meaning: 'Female', unlocked: false, order: 4 },
      { char: '力', pinyin: 'lì', jyutping: 'lik6', meaning: 'Power / Strength', unlocked: false, order: 5 },
    ],
    phrases: [
      { text: '左右', meaning: 'Left and Right', pinyin: 'zuǒ yòu', jyutping: 'zo2 jau6' },
      { text: '用力', meaning: 'Use strength', pinyin: 'yòng lì', jyutping: 'jung6 lik6' },
      { text: '女王', meaning: 'Queen', pinyin: 'nǚ wáng', jyutping: 'neoi5 wong4' }
    ],
    matchQuestions: [
      { imageUrl: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=400', correctChar: '左' },
      { imageUrl: 'https://images.unsplash.com/photo-1531983412531-1f49a365ffed?auto=format&fit=crop&q=80&w=400', correctChar: '心' }
    ]
  },
  {
    id: 'L2-2',
    title: '田木耳目 (L2 Senses)',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800',
    unlocked: false,
    enablePhrases: true,
    enableMatch: true,
    characters: [
      { char: '石', pinyin: 'shí', jyutping: 'sek6', meaning: 'Stone', unlocked: false, order: 0 },
      { char: '田', pinyin: 'tián', jyutping: 'tin4', meaning: 'Field', unlocked: false, order: 1 },
      { char: '白', pinyin: 'bái', jyutping: 'baak6', meaning: 'White', unlocked: false, order: 2 },
      { char: '目', pinyin: 'mù', jyutping: 'muk6', meaning: 'Eye', unlocked: false, order: 3 },
      { char: '耳', pinyin: 'ěr', jyutping: 'ji5', meaning: 'Ear', unlocked: false, order: 4 },
      { char: '米', pinyin: 'mǐ', jyutping: 'mai5', meaning: 'Rice', unlocked: false, order: 5 },
    ],
    phrases: [
      { text: '白米', meaning: 'White rice', pinyin: 'bái mǐ', jyutping: 'baak6 mai5' },
      { text: '目耳', meaning: 'Eyes and Ears', pinyin: 'mù ěr', jyutping: 'muk6 ji5' },
      { text: '田石', meaning: 'Field and stone', pinyin: 'tián shí', jyutping: 'tin4 sek6' }
    ],
    matchQuestions: [
      { imageUrl: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&q=80&w=400', correctChar: '田' },
      { imageUrl: 'https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?auto=format&fit=crop&q=80&w=400', correctChar: '耳' }
    ]
  },
  {
    id: 'L2-3',
    title: '雲風好早 (L2 Daily)',
    image: 'https://images.unsplash.com/photo-1517483000871-1dbf6b9e4aed?auto=format&fit=crop&q=80&w=800',
    unlocked: false,
    enablePhrases: true,
    enableMatch: true,
    characters: [
      { char: '好', pinyin: 'hǎo', jyutping: 'hou2', meaning: 'Good', unlocked: false, order: 0 },
      { char: '早', pinyin: 'zǎo', jyutping: 'zou2', meaning: 'Early', unlocked: false, order: 1 },
      { char: '回', pinyin: 'huí', jyutping: 'wui4', meaning: 'Return', unlocked: false, order: 2 },
      { char: '開', pinyin: 'kāi', jyutping: 'hoi1', meaning: 'Open', unlocked: false, order: 3 },
      { char: '見', pinyin: 'jiàn', jyutping: 'gin3', meaning: 'See', unlocked: false, order: 4 },
      { char: '雲', pinyin: 'yún', jyutping: 'wan4', meaning: 'Cloud', unlocked: false, order: 5 },
      { char: '風', pinyin: 'fēng', jyutping: 'fung1', meaning: 'Wind', unlocked: false, order: 6 },
    ],
    phrases: [
      { text: '早安', meaning: 'Good morning', pinyin: 'zǎo ān', jyutping: 'zou2 on1' },
      { text: '回家', meaning: 'Go home', pinyin: 'huí jiā', jyutping: 'wui4 gaa1' },
      { text: '雲風', meaning: 'Clouds and wind', pinyin: 'yún fēng', jyutping: 'wan4 fung1' }
    ],
    matchQuestions: [
      { imageUrl: 'https://images.unsplash.com/photo-1532178910-7815d675f541?auto=format&fit=crop&q=80&w=400', correctChar: '雲' },
      { imageUrl: 'https://images.unsplash.com/photo-1496309732348-3627f3f040ee?auto=format&fit=crop&q=80&w=400', correctChar: '風' }
    ]
  },

  // LEVEL 3
  {
    id: 'L3-1',
    title: '聽說讀寫 (L3 Skills)',
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=800',
    unlocked: false,
    enablePhrases: true,
    enableMatch: true,
    characters: [
      { char: '看', pinyin: 'kàn', jyutping: 'hon3', meaning: 'See / Look', unlocked: false, order: 0 },
      { char: '聽', pinyin: 'tīng', jyutping: 'ting1', meaning: 'Listen', unlocked: false, order: 1 },
      { char: '說', pinyin: 'shuō', jyutping: 'syut3', meaning: 'Speak', unlocked: false, order: 2 },
      { char: '寫', pinyin: 'xiě', jyutping: 'se2', meaning: 'Write', unlocked: false, order: 3 },
      { char: '讀', pinyin: 'dú', jyutping: 'duk6', meaning: 'Read', unlocked: false, order: 4 },
      { char: '坐', pinyin: 'zuò', jyutping: 'zo6', meaning: 'Sit', unlocked: false, order: 5 },
      { char: '立', pinyin: 'lì', jyutping: 'lap6', meaning: 'Stand', unlocked: false, order: 6 },
    ],
    phrases: [
      { text: '看書', meaning: 'Read a book', pinyin: 'kàn shū', jyutping: 'hon3 syu1' },
      { text: '聽說', meaning: 'Hear of', pinyin: 'tīng shuō', jyutping: 'ting1 syut3' },
      { text: '讀寫', meaning: 'Reading and writing', pinyin: 'dú xiě', jyutping: 'duk6 se2' }
    ],
    matchQuestions: [
      { imageUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=400', correctChar: '讀' },
      { imageUrl: 'https://images.unsplash.com/photo-1491843384429-1834e72599b0?auto=format&fit=crop&q=80&w=400', correctChar: '坐' }
    ]
  },
  {
    id: 'L3-2',
    title: '長高紅青 (L3 Appearance)',
    image: 'https://images.unsplash.com/photo-1502691876148-a84978e59af8?auto=format&fit=crop&q=80&w=800',
    unlocked: false,
    enablePhrases: true,
    enableMatch: true,
    characters: [
      { char: '紅', pinyin: 'hóng', jyutping: 'hung4', meaning: 'Red', unlocked: false, order: 0 },
      { char: '青', pinyin: 'qīng', jyutping: 'cing1', meaning: 'Green / Cyan', unlocked: false, order: 1 },
      { char: '長', pinyin: 'cháng', jyutping: 'coeng4', meaning: 'Long', unlocked: false, order: 2 },
      { char: '高', pinyin: 'gāo', jyutping: 'gou1', meaning: 'High / Tall', unlocked: false, order: 3 },
      { char: '生', pinyin: 'shēng', jyutping: 'sang1', meaning: 'Life / Birth', unlocked: false, order: 4 },
      { char: '老', pinyin: 'lǎo', jyutping: 'lou5', meaning: 'Old', unlocked: false, order: 5 },
    ],
    phrases: [
      { text: '長高', meaning: 'Grow tall', pinyin: 'cháng gāo', jyutping: 'coeng4 gou1' },
      { text: '紅花', meaning: 'Red flower', pinyin: 'hóng huā', jyutping: 'hung4 faa1' },
      { text: '老老師', meaning: 'Senior teacher', pinyin: 'lǎo lǎo shī', jyutping: 'lou5 lou5 si1' }
    ],
    matchQuestions: [
      { imageUrl: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&q=80&w=400', correctChar: '紅' },
      { imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=400', correctChar: '青' }
    ]
  },
  {
    id: 'L3-3',
    title: '雨雪草花 (L3 Growth)',
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=800',
    unlocked: false,
    enablePhrases: true,
    enableMatch: true,
    characters: [
      { char: '雨', pinyin: 'yǔ', jyutping: 'jyu5', meaning: 'Rain', unlocked: false, order: 0 },
      { char: '雪', pinyin: 'xuě', jyutping: 'syut3', meaning: 'Snow', unlocked: false, order: 1 },
      { char: '草', pinyin: 'cǎo', jyutping: 'cou2', meaning: 'Grass', unlocked: false, order: 2 },
      { char: '花', pinyin: 'huā', jyutping: 'faa1', meaning: 'Flower', unlocked: false, order: 3 },
      { char: '葉', pinyin: 'yè', jyutping: 'jip6', meaning: 'Leaf', unlocked: false, order: 4 },
      { char: '師', pinyin: 'shī', jyutping: 'si1', meaning: 'Master / Teacher', unlocked: false, order: 5 },
      { char: '學', pinyin: 'xué', jyutping: 'hok6', meaning: 'Learn / Study', unlocked: false, order: 6 },
      { char: '校', pinyin: 'xiào', jyutping: 'haau6', meaning: 'School', unlocked: false, order: 7 },
    ],
    phrases: [
      { text: '學校', meaning: 'School', pinyin: 'xué xiào', jyutping: 'hok6 haau6' },
      { text: '老師', meaning: 'Teacher', pinyin: 'lǎo shī', jyutping: 'lou5 si1' },
      { text: '花草', meaning: 'Flowers and plants', pinyin: 'huā cǎo', jyutping: 'faa1 cou2' }
    ],
    matchQuestions: [
      { imageUrl: 'https://images.unsplash.com/photo-1514632595863-60838b383ef1?auto=format&fit=crop&q=80&w=400', correctChar: '雨' },
      { imageUrl: 'https://images.unsplash.com/photo-1483977399921-6cf3496d4acc?auto=format&fit=crop&q=80&w=400', correctChar: '雪' }
    ]
  },

  // LEVEL 4
  {
    id: 'L4-1',
    title: '鳥魚蟲牛 (L4 Animals)',
    image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=800',
    unlocked: false,
    enablePhrases: true,
    enableMatch: true,
    characters: [
      { char: '鳥', pinyin: 'niǎo', jyutping: 'niu5', meaning: 'Bird', unlocked: false, order: 0 },
      { char: '魚', pinyin: 'yú', jyutping: 'jyu4', meaning: 'Fish', unlocked: false, order: 1 },
      { char: '蟲', pinyin: 'chóng', jyutping: 'cung4', meaning: 'Insect', unlocked: false, order: 2 },
      { char: '牛', pinyin: 'niú', jyutping: 'ngau4', meaning: 'Cow', unlocked: false, order: 3 },
      { char: '馬', pinyin: 'mǎ', jyutping: 'maa5', meaning: 'Horse', unlocked: false, order: 4 },
      { char: '貓', pinyin: 'māo', jyutping: 'maau1', meaning: 'Cat', unlocked: false, order: 5 },
      { char: '狗', pinyin: 'gǒu', jyutping: 'gau2', meaning: 'Dog', unlocked: false, order: 6 },
    ],
    phrases: [
      { text: '小鳥', meaning: 'Little bird', pinyin: 'xiǎo niǎo', jyutping: 'siu2 niu5' },
      { text: '小狗小貓', meaning: 'Little dog and cat', pinyin: 'xiǎo gǒu xiǎo māo', jyutping: 'siu2 gau2 siu2 maau1' },
      { text: '馬車', meaning: 'Horse carriage', pinyin: 'mǎ chē', jyutping: 'maa5 ce1' }
    ],
    matchQuestions: [
      { imageUrl: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&q=80&w=400', correctChar: '狗' },
      { imageUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=400', correctChar: '貓' }
    ]
  },
  {
    id: 'L4-2',
    title: '年月星時 (L4 Time)',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=800',
    unlocked: false,
    enablePhrases: true,
    enableMatch: true,
    characters: [
      { char: '年', pinyin: 'nián', jyutping: 'nin4', meaning: 'Year', unlocked: false, order: 0 },
      { char: '星', pinyin: 'xīng', jyutping: 'sing1', meaning: 'Star', unlocked: false, order: 1 },
      { char: '時', pinyin: 'shí', jyutping: 'si4', meaning: 'Hour / Time', unlocked: false, order: 2 },
      { char: '分', pinyin: 'fēn', jyutping: 'fan1', meaning: 'Minute', unlocked: false, order: 3 },
      { char: '點', pinyin: 'diǎn', jyutping: 'dim2', meaning: 'Oclock / Point', unlocked: false, order: 4 },
      { char: '今', pinyin: 'jīn', jyutping: 'gam1', meaning: 'Today / Present', unlocked: false, order: 5 },
      { char: '明', pinyin: 'míng', jyutping: 'ming4', meaning: 'Tomorrow / Bright', unlocked: false, order: 6 },
    ],
    phrases: [
      { text: '明年', meaning: 'Next year', pinyin: 'míng nián', jyutping: 'ming4 nin4' },
      { text: '星點', meaning: 'Star point', pinyin: 'xīng diǎn', jyutping: 'sing1 dim2' },
      { text: '十分', meaning: 'Ten minutes / Very', pinyin: 'shí fēn', jyutping: 'sap6 fan1' }
    ],
    matchQuestions: [
      { imageUrl: 'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?auto=format&fit=crop&q=80&w=400', correctChar: '星' },
      { imageUrl: 'https://images.unsplash.com/photo-1508921334179-46399484dec4?auto=format&fit=crop&q=80&w=400', correctChar: '時' }
    ]
  },
  {
    id: 'L4-3',
    title: '書畫國母 (L4 Home)',
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=800',
    unlocked: false,
    enablePhrases: true,
    enableMatch: true,
    characters: [
      { char: '車', pinyin: 'chē', jyutping: 'ce1', meaning: 'Car / Vehicle', unlocked: false, order: 0 },
      { char: '書', pinyin: 'shū', jyutping: 'syu1', meaning: 'Book', unlocked: false, order: 1 },
      { char: '紙', pinyin: 'zhǐ', jyutping: 'zi2', meaning: 'Paper', unlocked: false, order: 2 },
      { char: '筆', pinyin: 'bǐ', jyutping: 'bat1', meaning: 'Pen', unlocked: false, order: 3 },
      { char: '畫', pinyin: 'huà', jyutping: 'waa2', meaning: 'Draw / Painting', unlocked: false, order: 4 },
      { char: '國', pinyin: 'guó', jyutping: 'gwok3', meaning: 'Country', unlocked: false, order: 5 },
      { char: '爸', pinyin: 'bà', jyutping: 'baa1', meaning: 'Father', unlocked: false, order: 6 },
      { char: '媽', pinyin: 'mā', jyutping: 'maa1', meaning: 'Mother', unlocked: false, order: 7 },
    ],
    phrases: [
      { text: '畫畫', meaning: 'Drawing', pinyin: 'huà huà', jyutping: 'waa2 waa2' },
      { text: '書房', meaning: 'Study room', pinyin: 'shū fáng', jyutping: 'syu1 fong4' },
      { text: '國畫', meaning: 'Traditional Chinese painting', pinyin: 'guó huà', jyutping: 'gwok3 waa2' }
    ],
    matchQuestions: [
      { imageUrl: 'https://images.unsplash.com/photo-1513475382585-d06e58bc7e21?auto=format&fit=crop&q=80&w=400', correctChar: '書' },
      { imageUrl: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&q=80&w=400', correctChar: '筆' }
    ]
  },

  // LEVEL 5
  {
    id: 'L5-1',
    title: '想能會做 (L5 Action)',
    image: 'https://images.unsplash.com/photo-1499209974431-9dac3adaf471?auto=format&fit=crop&q=80&w=800',
    unlocked: false,
    enablePhrases: true,
    enableMatch: true,
    characters: [
      { char: '想', pinyin: 'xiǎng', jyutping: 'soeng2', meaning: 'Think / Want', unlocked: false, order: 0 },
      { char: '能', pinyin: 'néng', jyutping: 'nang4', meaning: 'Can / Able', unlocked: false, order: 1 },
      { char: '會', pinyin: 'huì', jyutping: 'wui6', meaning: 'Will / Know how', unlocked: false, order: 2 },
      { char: '做', pinyin: 'zuò', jyutping: 'zou6', meaning: 'To do', unlocked: false, order: 3 },
      { char: '對', pinyin: 'duì', jyutping: 'deoi3', meaning: 'Correct / To face', unlocked: false, order: 4 },
      { char: '和', pinyin: 'hé', jyutping: 'wo4', meaning: 'And / Peace', unlocked: false, order: 5 },
      { char: '用', pinyin: 'yòng', jyutping: 'jung6', meaning: 'To use', unlocked: false, order: 6 },
      { char: '真', pinyin: 'zhēn', jyutping: 'zan1', meaning: 'True / Really', unlocked: false, order: 7 },
    ],
    phrases: [
      { text: '想做', meaning: 'Want to do', pinyin: 'xiǎng zuò', jyutping: 'soeng2 zou6' },
      { text: '能做', meaning: 'Can do', pinyin: 'néng zuò', jyutping: 'nang4 zou6' },
      { text: '真的', meaning: 'Really / True', pinyin: 'zhēn de', jyutping: 'zan1 dik1' }
    ],
    matchQuestions: [
      { imageUrl: 'https://images.unsplash.com/photo-1494597564530-897f7a219577?auto=format&fit=crop&q=80&w=400', correctChar: '想' },
      { imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=400', correctChar: '會' }
    ]
  },
  {
    id: 'L5-2',
    title: '歡喜謝話 (L5 Social)',
    image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&q=80&w=800',
    unlocked: false,
    enablePhrases: true,
    enableMatch: true,
    characters: [
      { char: '歡', pinyin: 'huān', jyutping: 'fun1', meaning: 'Happy / Joy', unlocked: false, order: 0 },
      { char: '喜', pinyin: 'xǐ', jyutping: 'hei2', meaning: 'Like / Joy', unlocked: false, order: 1 },
      { char: '謝', pinyin: 'xiè', jyutping: 'ze6', meaning: 'Thank', unlocked: false, order: 2 },
      { char: '再', pinyin: 'zài', jyutping: 'zoi3', meaning: 'Again', unlocked: false, order: 3 },
      { char: '話', pinyin: 'huà', jyutping: 'waa6', meaning: 'Words / Talk', unlocked: false, order: 4 },
      { char: '請', pinyin: 'qǐng', jyutping: 'cing2', meaning: 'Please / Invite', unlocked: false, order: 5 },
      { char: '覺', pinyin: 'jué', jyutping: 'gok3', meaning: 'Feel / Sleep', unlocked: false, order: 6 },
      { char: '樣', pinyin: 'yàng', jyutping: 'joeng6', meaning: 'Appearance / Way', unlocked: false, order: 7 },
    ],
    phrases: [
      { text: '歡喜', meaning: 'Happy / Like', pinyin: 'huān xǐ', jyutping: 'fun1 hei2' },
      { text: '謝謝', meaning: 'Thank you', pinyin: 'xiè xiè', jyutping: 'ze6 ze6' },
      { text: '請說', meaning: 'Please speak', pinyin: 'qǐng shuō', jyutping: 'cing2 syut3' },
      { text: '再見', meaning: 'Goodbye', pinyin: 'zài jiàn', jyutping: 'zoi3 gin3' }
    ],
    matchQuestions: [
      { imageUrl: 'https://images.unsplash.com/photo-1528605105345-5344ea20e269?auto=format&fit=crop&q=80&w=400', correctChar: '歡' },
      { imageUrl: 'https://images.unsplash.com/photo-1473280025148-641f341e7f57?auto=format&fit=crop&q=80&w=400', correctChar: '樣' }
    ]
  }
];
