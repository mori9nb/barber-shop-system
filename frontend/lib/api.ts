// lib/api.ts

export interface Service { id: string; name: string; icon: string; duration: string; }
export interface Barber { id: number; name: string; price: number; rating: number; clients: number; image: string; services: string[]; }

const MOCK_SERVICES: Service[] = [
    { id: 'haircut', name: 'Haircut', icon: '✂️', duration: '30 minutes' },
    { id: 'beard', name: 'Beard Trimming', icon: '〰️', duration: '20 minutes' },
    { id: 'styling', name: 'Hair Styling', icon: '💈', duration: '45 minutes' }
];

// 👈 به هر آرایشگر گفتیم چه سرویس‌هایی رو ارائه میده
const MOCK_BARBERS: Barber[] = [
    { id: 1, name: "Tom Marelli", price: 45, rating: 5, clients: 120, image: "https://i.pravatar.cc/150?u=tom", services: ['haircut', 'beard'] },
    { id: 2, name: "Dean Scott", price: 65, rating: 5, clients: 210, image: "https://i.pravatar.cc/150?u=dean", services: ['haircut', 'styling'] },
    { id: 3, name: "Melisa Bart", price: 70, rating: 5, clients: 356, image: "https://i.pravatar.cc/150?u=melisa", services: ['beard', 'styling'] }
];

export const getServices = async (): Promise<Service[]> => {
    return new Promise((resolve) => { setTimeout(() => resolve(MOCK_SERVICES), 500); });
};

// 👈 حالا این تابع آیدیِ سرویس رو می‌گیره و فقط آرایشگرهای مرتبط رو میده
export const getBarbers = async (serviceId?: string): Promise<Barber[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            // اگه آیدی سرویس رو نداده بودیم (مثل تو داشبورد)، همه آرایشگرها رو برگردون
            if (!serviceId) {
                resolve(MOCK_BARBERS);
                return;
            }
            // اگه آیدی سرویس رو داده بودیم (مثل تو صفحه انتخاب)، فیلترشون کن
            const filteredBarbers = MOCK_BARBERS.filter(b => b.services && b.services.includes(serviceId));
            resolve(filteredBarbers);
        }, 500);
    });
};

// 👈 این تابع هم حالا دقیقاً می‌دونه کدوم آرایشگر، برای کدوم سرویس و تو چه روزی تایم خالی داره
export const getAvailableTimeSlots = async (barberId: number, serviceId: string, date: string): Promise<string[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            // شبیه‌سازی رندوم برای اینکه نشون بدیم روزهای مختلف تایم‌های مختلف دارن
            const slots = ["10:00 AM", "11:30 AM", "02:00 PM", "04:30 PM", "06:00 PM"];
            resolve(slots.sort(() => 0.5 - Math.random()).slice(0, 3)); // ۳ تا تایم رندوم برمی‌گردونه
        }, 800);
    });
};