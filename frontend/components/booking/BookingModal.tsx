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
    barberId: number;   // 👈 اضافه شد
    serviceId: string;  // 👈 اضافه شد
}

export default function BookingModal({ isOpen, onClose, selectedDate, selectedTime, barberId, serviceId }: BookingModalProps) {
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
            barberId: barberId,
            serviceId: serviceId,
            date: selectedDate.toISOString().split("T")[0],
            time: selectedTime,
            name,
            phone
        }

        await createBooking(bookingData)

        setIsSuccess(true)

    }

    return (
        <div
            className="fixed inset-0 bg-[#1A1F2B]/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all">

            <div
                className="bg-white rounded-[2rem] p-8 w-full max-w-sm shadow-[0_10px_40px_rgba(0,0,0,0.2)] relative animate-fade-in">

                {!isSuccess && (
                    <button onClick={onClose}
                            className="absolute top-5 right-5 text-gray-400 hover:text-[#1A1F2B] transition-colors">
                        ✕
                    </button>
                )}

                {isSuccess ? (
                    // -------- حالت اول: پیام موفقیت لوکس --------
                    <div className="text-center py-6">
                        <div
                            className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-green-100">
                            <span className="text-4xl">✨</span>
                        </div>
                        <h3 className="text-2xl font-black text-[#1A1F2B] mb-2 tracking-tight">Confermata!</h3>
                        <p className="text-gray-500 text-sm font-medium mb-8 leading-relaxed">
                            Il tuo appuntamento è stato registrato con successo. Ti aspettiamo!
                        </p>
                        <button
                            onClick={onClose} // 👈 می‌تونی اینجا رو طوری تنظیم کنی که برگرده داشبورد
                            className="w-full bg-[#1A1F2B] text-white font-bold py-4 rounded-2xl hover:bg-black transition-all shadow-lg"
                        >
                            Torna alla Home
                        </button>
                    </div>
                ) : (
                    // -------- حالت دوم: فرم دریافت اطلاعات --------
                    <form onSubmit={handleSubmit}>
                        <h3 className="text-2xl font-black text-[#1A1F2B] mb-1 tracking-tight">Dettagli</h3>
                        <p className="text-sm font-bold text-[#D4A373] mb-8">
                            {selectedDate && format(selectedDate, "d MMMM", {locale: it})} alle {selectedTime}
                        </p>

                        <div className="mb-5">
                            <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">Nome
                                e Cognome</label>
                            <input
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-[#F8F9FA] border border-transparent rounded-2xl px-4 py-3 focus:bg-white focus:ring-2 focus:ring-[#D4A373] focus:border-transparent outline-none transition-all font-medium text-[#1A1F2B]"
                                placeholder="es. Mario Rossi"
                            />
                        </div>

                        <div className="mb-8">
                            <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">Numero
                                di Telefono</label>
                            <input
                                type="tel"
                                required
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full bg-[#F8F9FA] border border-transparent rounded-2xl px-4 py-3 focus:bg-white focus:ring-2 focus:ring-[#D4A373] focus:border-transparent outline-none transition-all font-medium text-[#1A1F2B]"
                                placeholder="es. +39 333 1234567"
                            />
                        </div>

                        <button type="submit"
                                className="w-full bg-[#D4A373] text-white font-bold py-4 rounded-2xl hover:bg-[#c29161] transition-all shadow-[0_8px_20px_rgba(212,163,115,0.3)] hover:-translate-y-1">
                            Conferma e Prenota
                        </button>
                    </form>
                )}

            </div>
        </div>
    );
}