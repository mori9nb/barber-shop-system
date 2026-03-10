// این بخش فایل‌های JSON رو به صورت داینامیک لود می‌کنه
const dictionaries = {
    en: () => import('./en.json').then((module) => module.default),
    it: () => import('./it.json').then((module) => module.default),
};

// این تابع اصلی ماست که زبان رو می‌گیره و لغت‌نامه رو برمی‌گردونه
export const getDictionary = async (locale: 'en' | 'it') => {
    return dictionaries[locale]();
};