'use client';

import React, { useState } from 'react';
import { format } from 'date-fns';
import { it } from 'date-fns/locale';
import { createBooking } from "@/lib/api"

// ۱. ورودی‌هایی که مودال از تقویم می‌گیره
interface BookingModalProps {
    isOpen: boolean;             // آیا پنجره باز است یا بسته؟
    onClose: () => void;         // تابعی برای بستن پنجره
    selectedDate: Date | null;   // تاریخ انتخاب شده
    selectedTime: string | null; // ساعت انتخاب شده
}

export default function BookingModal({ isOpen, onClose, selectedDate, selectedTime }: BookingModalProps) {
    // حافظه برای ذخیره نام و شماره تلفن مشتری
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [isSuccess, setIsSuccess] = useState(false); // آیا رزرو موفق بود؟

    // اگر پنجره بسته است، اصلاً هیچی رندر نکن (کد متوقف میشه)
    if (!isOpen) return null;

    // تابعی که وقتی مشتری دکمه "تایید نهایی" رو میزنه اجرا میشه
    const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault()

        if(!selectedDate || !selectedTime) return

        const bookingData = {
            barberId:1,
            serviceId:"haircut",
            date: selectedDate.toISOString().split("T")[0],
            time: selectedTime,
            name,
            phone
        }

        await createBooking(bookingData)

        setIsSuccess(true)

    }

    return (
        // پس‌زمینه تاریک (overlay)
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">

            {/*// خودِ پنجره سفید رنگ مودال*/}
            <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl relative animate-fade-in">

                {/* دکمه X برای بستن */}
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700">
                    ✕
                </button>

                {isSuccess ? (
                    // -------- حالت اول: پیام موفقیت --------
                    <div className="text-center py-8">
                        <div className="text-5xl mb-4">✅</div>
                        <h3 className="text-xl font-bold text-green-600 mb-2">Prenotazione Confermata!</h3>
                        <p className="text-gray-600 text-sm">Il tuo appuntamento è stato registrato con successo.</p>
                    </div>
                ) : (
                    // -------- حالت دوم: فرم دریافت اطلاعات --------
                    <form onSubmit={handleSubmit}>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">Completa la Prenotazione</h3>

                        <p className="text-sm text-gray-500 mb-6">
                            {selectedDate && format(selectedDate, "d MMMM", { locale: it })} alle {selectedTime}
                        </p>

                        {/* اینپوت نام */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nome e Cognome</label>
                            <input
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                placeholder="es. Mario Rossi"
                            />
                        </div>

                        {/* اینپوت شماره تلفن */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Numero di Telefono</label>
                            <input
                                type="tel"
                                required
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                placeholder="es. +39 333 1234567"
                            />
                        </div>

                        {/* دکمه ارسال */}
                        <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition-colors">
                            Conferma e Prenota
                        </button>
                    </form>
                )}

            </div>
        </div>
    );
}