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
    serviceId: string;
}

export default function BookingCalendar({ selectedBarberId, serviceId }: BookingCalendarProps) {
    const [date, setDate] = useState<Date | null>(null);
    const [time, setTime] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [availableTimes, setAvailableTimes] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (date && selectedBarberId && serviceId) {
            const fetchTimes = async () => {
                setIsLoading(true);
                const dateString = format(date, 'yyyy-MM-dd');
                const times = await getAvailableTimeSlots(selectedBarberId,serviceId, dateString);
                setAvailableTimes(times);
                setIsLoading(false);
            };

            fetchTimes();
        }
    }, [date, selectedBarberId]);

    /* 👈 این خط اضافه بشه */
    return (
        <div className="bg-white p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 animate-fade-in origin-top w-full">

            <h2 className="text-xl font-black text-[#1A1F2B] mb-6 tracking-tight text-center">
                Seleziona una data
            </h2>

            <div className="flex justify-center flex-col items-center w-full">
                {/* جادوی Tailwind: با این کلاس‌ها، تمام استایل‌های پیش‌فرض react-calendar
                  رو اورراید می‌کنیم تا لوکس و شبیه iOS بشه
                */}
                <div className="w-full
                    [&_.react-calendar]:w-full [&_.react-calendar]:border-none [&_.react-calendar]:font-sans [&_.react-calendar]:bg-transparent
                    [&_.react-calendar__navigation]:mb-4
                    [&_.react-calendar__navigation_button]:text-[#1A1F2B] [&_.react-calendar__navigation_button]:font-bold [&_.react-calendar__navigation_button]:text-lg [&_.react-calendar__navigation_button]:rounded-2xl [&_.react-calendar__navigation_button:hover]:bg-[#F8F9FA] [&_.react-calendar__navigation_button:disabled]:opacity-50
                    [&_.react-calendar__month-view__weekdays]:mb-2
                    [&_.react-calendar__month-view__weekdays__weekday]:text-gray-400 [&_.react-calendar__month-view__weekdays__weekday]:font-black [&_.react-calendar__month-view__weekdays__weekday]:text-[10px] [&_.react-calendar__month-view__weekdays__weekday]:uppercase [&_.react-calendar__month-view__weekdays__weekday_abbr]:no-underline
                    [&_.react-calendar__tile]:rounded-2xl [&_.react-calendar__tile]:p-3 [&_.react-calendar__tile]:text-sm [&_.react-calendar__tile]:font-bold [&_.react-calendar__tile]:text-[#1A1F2B] [&_.react-calendar__tile]:transition-all [&_.react-calendar__tile]:duration-300
                    [&_.react-calendar__tile:hover]:bg-[#F8F9FA] [&_.react-calendar__tile:hover]:text-[#D4A373]
                    [&_.react-calendar__tile--now]:text-[#D4A373] [&_.react-calendar__tile--now]:bg-transparent [&_.react-calendar__tile--now]:border-2 [&_.react-calendar__tile--now]:border-[#D4A373] [&_.react-calendar__tile--now:hover]:bg-[#D4A373] [&_.react-calendar__tile--now:hover]:text-white
                    [&_.react-calendar__tile--active]:!bg-[#1A1F2B] [&_.react-calendar__tile--active]:!text-white [&_.react-calendar__tile--active]:shadow-[0_4px_15px_rgba(26,31,43,0.3)] [&_.react-calendar__tile--active]:scale-105
                    [&_.react-calendar__tile:disabled]:text-gray-300 [&_.react-calendar__tile:disabled]:bg-transparent
                ">
                    <Calendar
                        onChange={(value) => {
                            setDate(value as Date);
                            setTime(null);
                        }}
                        value={date}
                        minDate={new Date()}
                        locale="it-IT"
                        next2Label={null} // حذف دکمه‌های پرش سال برای خلوت شدن هدر
                        prev2Label={null}
                    />
                </div>
            </div>

            {/* بخش انتخاب ساعت */}
            <div
                className={`grid transition-all duration-500 ease-in-out ${
                    date ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
            >
                <div className="overflow-hidden">
                    <div className="mt-6 border-t border-gray-100 pt-6">
                        <h3 className="text-sm font-bold text-gray-800 mb-4 text-center">
                            Orari per <span className="text-[#D4A373]">{date ? format(date, "d MMMM", { locale: it }) : ''}</span>
                        </h3>

                        {isLoading ? (
                            <div className="text-center text-[#D4A373] my-4 animate-pulse text-sm font-bold">Caricamento orari...</div>
                        ) : availableTimes.length > 0 ? (
                            <div className="grid grid-cols-3 gap-3">
                                {availableTimes.map((t) => (
                                    <button
                                        key={t}
                                        onClick={() => setTime(t)}
                                        className={`py-3 rounded-2xl border text-sm font-bold transition-all duration-300 ${
                                            time === t
                                                ? 'bg-[#1A1F2B] text-white border-[#1A1F2B] shadow-[0_4px_15px_rgba(26,31,43,0.3)] scale-105'
                                                : 'bg-white text-gray-600 border-gray-200 hover:border-[#1A1F2B] hover:text-[#1A1F2B]'
                                        }`}
                                    >
                                        {t}
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center text-red-400 my-4 font-semibold text-sm">Nessun orario disponibile.</div>
                        )}
                    </div>
                </div>
            </div>

            {/* دکمه تایید نهایی */}
            <div
                className={`grid transition-all duration-500 ease-in-out ${
                    date && time ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
            >
                <div className="overflow-hidden">
                    <div className="mt-8 pb-2">
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="w-full bg-[#1A1F2B] text-white font-bold py-4 rounded-2xl hover:bg-black transition-all duration-300 shadow-[0_8px_20px_rgba(26,31,43,0.3)] hover:-translate-y-1"
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
                barberId={selectedBarberId}
                serviceId={serviceId}
            />
        </div>
    );
}