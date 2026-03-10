'use client';

import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { format } from 'date-fns';
import { it } from 'date-fns/locale';
import BookingModal from './BookingModal';
import { getAvailableTimeSlots } from '@/lib/api';

interface BookingCalendarProps {
    selectedBarberId: number;
}

export default function BookingCalendar({ selectedBarberId }: BookingCalendarProps) {
    const [date, setDate] = useState<Date | null>(null);
    const [time, setTime] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [availableTimes, setAvailableTimes] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (date && selectedBarberId) {
            const fetchTimes = async () => {
                setIsLoading(true);
                const dateString = format(date, 'yyyy-MM-dd');
                const times = await getAvailableTimeSlots(selectedBarberId, dateString);
                setAvailableTimes(times);
                setIsLoading(false);
            };

            fetchTimes();
        }
    }, [date, selectedBarberId]);

    return (
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mt-2 animate-fade-in origin-top">

            <h2 className="text-md font-bold text-gray-800 mb-3 text-center">
                Seleziona una data
            </h2>

            <div className="flex justify-center flex-col items-center">
                <Calendar
                    onChange={(value) => {
                        setDate(value as Date);
                        setTime(null);
                    }}
                    value={date}
                    minDate={new Date()}
                    locale="it-IT"
                    className="rounded-lg border-none shadow-sm font-sans"
                />
            </div>

            {/* 👈 جادوی اول: انیمیشن کشویی و نرم برای باز شدن ساعت‌ها */}
            <div
                className={`grid transition-all duration-500 ease-in-out ${
                    date ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
            >
                <div className="overflow-hidden">
                    <div className="mt-4 border-t border-gray-100 pt-4">
                        <h3 className="text-sm font-bold text-gray-800 mb-3 text-center">
                            Orari per {date ? format(date, "d MMMM", { locale: it }) : ''}
                        </h3>

                        {isLoading ? (
                            <div className="text-center text-gray-500 my-4 animate-pulse text-sm">Caricamento orari...</div>
                        ) : availableTimes.length > 0 ? (
                            <div className="grid grid-cols-3 gap-2">
                                {availableTimes.map((t) => (
                                    <button
                                        key={t}
                                        onClick={() => setTime(t)}
                                        // 👇 افکت ترنزیشن به خود دکمه‌ها اضافه شد (بزرگ شدن جزئی)
                                        className={`py-2 rounded-lg border text-sm font-medium transition-all duration-300 ${
                                            time === t
                                                ? 'bg-blue-600 text-white border-blue-600 shadow-md transform scale-105'
                                                : 'bg-white text-gray-700 border-gray-200 hover:border-blue-400'
                                        }`}
                                    >
                                        {t}
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center text-red-500 my-4 font-semibold text-sm">Nessun orario disponibile.</div>
                        )}
                    </div>
                </div>
            </div>

            {/* 👈 جادوی دوم: انیمیشن کشویی و فوق‌العاده نرم برای دکمه تایید نهایی */}
            <div
                className={`grid transition-all duration-500 ease-in-out ${
                    date && time ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
            >
                <div className="overflow-hidden">
                    <div className="mt-6 pb-2">
                        <button
                            onClick={() => setIsModalOpen(true)}
                            // 👇 یک افکت هاور جذاب که دکمه رو یکم میاره بالا (translate-y)
                            className="w-full bg-green-600 text-white font-bold py-3 rounded-xl hover:bg-green-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
                        >
                            Conferma Prenotazione
                        </button>
                    </div>
                </div>
            </div>

            <BookingModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                selectedDate={date}
                selectedTime={time}
            />
        </div>
    );
}