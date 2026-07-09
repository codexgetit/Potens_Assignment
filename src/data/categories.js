import potholeImg from '../assets/pothole.png';
import garbageImg from '../assets/garbage.png';
import streetlightImg from '../assets/streetlight.png';
import waterImg from '../assets/waterL.png';

export const categories = [
  {
    id: 'pothole',
    titleKey: 'category.pothole',
    descKey: 'category.potholeDesc',
    colorClass: 'from-[#293681] to-[#4274d9]',
    bgClass: 'bg-[#d0e7e6] border-[#95ccdd]',
    svgPath: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7',
    image: potholeImg,
  },
  {
    id: 'garbage',
    titleKey: 'category.garbage',
    descKey: 'category.garbageDesc',
    colorClass: 'from-[#4274d9] to-[#95ccdd]',
    bgClass: 'bg-[#eef6f8] border-[#d0e7e6]',
    svgPath: 'M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16',
    image: garbageImg,
  },
  {
    id: 'streetlight',
    titleKey: 'category.streetlight',
    descKey: 'category.streetlightDesc',
    colorClass: 'from-[#95ccdd] to-[#d0e7e6]',
    bgClass: 'bg-[#f2f7fb] border-[#d0e7e6]',
    svgPath: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
    image: streetlightImg,
  },
  {
    id: 'water',
    titleKey: 'category.water',
    descKey: 'category.waterDesc',
    colorClass: 'from-[#293681] to-[#95ccdd]',
    bgClass: 'bg-[#eef6f8] border-[#95ccdd]',
    svgPath: 'M5.636 18.364a9 9 0 010-12.728m12.728 0a9 9 0 010 12.728m-9.9-2.829a5 5 0 010-7.07m7.072 0a5 5 0 010 7.07M13 12a1 1 0 11-2 0 1 1 0 012 0z',
    image: waterImg,
  },
  {
    id: 'other',
    titleKey: 'category.other',
    descKey: 'category.otherDesc',
    colorClass: 'from-[#4274d9] to-[#293681]',
    bgClass: 'bg-[#f2f7fb] border-[#d0e7e6]',
    svgPath: 'M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80',
  },
];

export default categories;
