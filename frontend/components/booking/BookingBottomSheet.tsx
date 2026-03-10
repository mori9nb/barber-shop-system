// components/booking/BookingBottomSheet.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { getAvailableTimeSlots } from '@/lib/api';


interface Props {
    isOpen: boolean;
    onClose: () => void;
    barberId: number | null;
    serviceId: string | null; // 👈 این خط اضافه شد
    onConfirm: (date: string, time: string) => void;
}

export default function BookingBottomSheet({ isOpen, onClose, barberId,serviceId, onConfirm }: Props) {
    const [date, setDate] = useState<Date | null>(null);
    const [time, setTime] = useState<string | null>(null);
    const [availableTimes, setAvailableTimes] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    // وقتی تاریخ عوض میشه، ساعت‌های خالی رو از API (تستی) می‌گیریم
    useEffect(() => {
        if (date && barberId && serviceId) { // 👈 serviceId رو هم چک کن
            setIsLoading(true);
            setTime(null);
            const dateString = date.toISOString().split('T')[0];

            // 👈 حالا هم آیدی آرایشگر رو می‌فرسته هم سرویس رو
            getAvailableTimeSlots(barberId, serviceId, dateString).then(times => {
                setAvailableTimes(times);
                setIsLoading(false);
            });
        }
    }, [date, barberId, serviceId]);

    // اگر پنل بسته است، با انیمیشن مخفیش کن
    return (
        <>
            {/* پس‌زمینه تاریک (Overlay) */}
            <div
                className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
            ></div>

            {/* خود پنل کشویی که از پایین میاد بالا */}
            <div
                className={`fixed bottom-0 left-0 right-0 max-w-[360px] mx-auto bg-white rounded-t-[2rem] p-6 z-50 transition-transform duration-500 ease-out shadow-2xl ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}
                style={{ maxHeight: '85vh', overflowY: 'auto' }}
            >
                {/* خط توسی کوچیک بالای پنل (دسته کشیدن) */}
                <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6"></div>

                <h3 className="text-xl font-black text-[#1A1F2B] mb-4 text-center">Select Date & Time</h3>

                {/* تقویم */}
                <div className="flex justify-center mb-6 [&_.react-calendar]:border-none [&_.react-calendar]:font-sans [&_.react-calendar__tile--active]:bg-[#1A1F2B] [&_.react-calendar__tile--active]:rounded-xl">
                    <Calendar
                        onChange={(val) => setDate(val as Date)}
                        value={date}
                        minDate={new Date()} // کاربر نتونه روزهای گذشته رو انتخاب کنه
                    />
                </div>

                {/* ساعت‌ها */}
                {date && (
                    <div className="mb-6 animate-fade-in">
                        <h4 className="text-sm font-bold text-gray-800 mb-3">Available Times</h4>
                        {isLoading ? (
                            <div className="grid grid-cols-3 gap-2">
                                {[1, 2, 3].map(i => <div key={i} className="h-10 bg-gray-100 rounded-xl animate-pulse"></div>)}
                            </div>
                        ) : availableTimes.length > 0 ? (
                            <div className="grid grid-cols-3 gap-2">
                                {availableTimes.map((t) => (
                                    <button
                                        key={t}
                                        onClick={() => setTime(t)}
                                        className={`py-2 rounded-xl text-xs font-bold transition-all ${
                                            time === t
                                                ? 'bg-[#1A1F2B] text-white shadow-md'
                                                : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-400'
                                        }`}
                                    >
                                        {t}
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <p className="text-xs text-red-500 font-medium">No slots available for this date.</p>
                        )}
                    </div>
                )}

                {/* دکمه تایید نهایی */}
                <button
                    disabled={!date || !time}
                    onClick={() => onConfirm(date!.toISOString().split('T')[0], time!)}
                    className={`w-full py-4 rounded-2xl font-bold text-sm transition-all ${
                        date && time
                            ? 'bg-[#1A1F2B] text-white shadow-[0_8px_20px_rgba(26,31,43,0.3)] hover:bg-black'
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                >
                    Confirm Booking
                </button>
            </div>
        </>
    );
}