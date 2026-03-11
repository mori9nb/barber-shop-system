'use client';

import React, { useState } from 'react';

// دیتای تستی بیشتر برای اینکه لیست پرتر به نظر بیاد
const allBookings = [
    { id: 1, customer: 'Marco Rossi', service: 'Taglio Capelli', date: '11 Marzo 2026', time: '10:00', phone: '+39 333 1234567' },
    { id: 2, customer: 'Luca Bianchi', service: 'Regolazione Barba', date: '11 Marzo 2026', time: '12:30', phone: '+39 333 7654321' },
    { id: 3, customer: 'Giovanni Verdi', service: 'Colore e Taglio', date: '11 Marzo 2026', time: '14:00', phone: '+39 338 9988776' },
    { id: 4, customer: 'Andrea Romano', service: 'Taglio Bambino', date: '12 Marzo 2026', time: '09:00', phone: '+39 331 2233445' },
    { id: 5, customer: 'Matteo Ferrari', service: 'Trattamento Viso', date: '12 Marzo 2026', time: '16:00', phone: '+39 340 5566778' },
];

export default function BookingsPage() {
    // استیت برای سرچ کردن اسم مشتری
    const [searchTerm, setSearchTerm] = useState('');

    // فیلتر کردن لیست بر اساس سرچ
    const filteredBookings = allBookings.filter(booking =>
        booking.customer.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8 animate-fade-in pb-10">

            {/* هدر صفحه */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-[#1A1F2B] tracking-tight">Tutti gli Appuntamenti</h1>
                    <p className="text-gray-500 font-medium mt-1">Gestisci e filtra tutte le prenotazioni del salone.</p>
                </div>

                {/* دکمه اضافه کردن نوبت دستی (مثلاً مشتری زنگ زده) */}
                <button className="bg-[#1A1F2B] text-white font-bold py-3 px-6 rounded-2xl hover:bg-black transition-all shadow-[0_8px_20px_rgba(26,31,43,0.2)] hover:-translate-y-1 flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4"></path>
                    </svg>
                    Nuova Prenotazione
                </button>
            </div>

            {/* باکس اصلی جدول و فیلترها */}
            <div className="bg-white rounded-[1.5rem] p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100">

                {/* نوار ابزار (سرچ و فیلتر تاریخ) */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">

                    {/* باکس سرچ */}
                    <div className="relative w-full md:w-96">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Cerca cliente..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-[#F8F9FA] border border-transparent rounded-2xl pl-12 pr-4 py-3 focus:bg-white focus:ring-2 focus:ring-[#D4A373] focus:border-transparent outline-none transition-all font-medium text-[#1A1F2B]"
                        />
                    </div>

                    {/* دکمه‌های فیلتر سریع */}
                    <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
                        <button className="whitespace-nowrap px-5 py-2.5 bg-[#1A1F2B] text-white text-sm font-bold rounded-xl shadow-md">Tutti</button>
                        <button className="whitespace-nowrap px-5 py-2.5 bg-[#F8F9FA] text-gray-500 hover:text-[#1A1F2B] text-sm font-bold rounded-xl hover:bg-gray-100 transition-colors">Oggi</button>
                        <button className="whitespace-nowrap px-5 py-2.5 bg-[#F8F9FA] text-gray-500 hover:text-[#1A1F2B] text-sm font-bold rounded-xl hover:bg-gray-100 transition-colors">Domani</button>
                    </div>

                </div>

                {/* جدول نوبت‌ها */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                        <tr className="border-b-2 border-gray-100 text-xs uppercase tracking-widest text-gray-400">
                            <th className="pb-4 font-black">Cliente</th>
                            <th className="pb-4 font-black">Contatto</th>
                            <th className="pb-4 font-black">Servizio</th>
                            <th className="pb-4 font-black">Data e Ora</th>
                            <th className="pb-4 font-black text-right">Azioni</th>
                        </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-50">
                        {filteredBookings.length > 0 ? (
                            filteredBookings.map((booking) => (
                                <tr key={booking.id} className="hover:bg-gray-50/50 transition-colors group">

                                    <td className="py-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-11 h-11 rounded-2xl bg-[#F8F9FA] flex items-center justify-center text-[#1A1F2B] font-black border border-gray-100 shadow-sm group-hover:bg-white transition-colors">
                                                {booking.customer.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <span className="font-bold text-[#1A1F2B] text-sm">{booking.customer}</span>
                                        </div>
                                    </td>

                                    <td className="py-4 text-sm font-bold text-gray-500">{booking.phone}</td>

                                    <td className="py-4 text-sm font-bold text-[#D4A373]">{booking.service}</td>

                                    <td className="py-4">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-black text-[#1A1F2B]">{booking.time}</span>
                                            <span className="text-xs font-bold text-gray-400 mt-0.5">{booking.date}</span>
                                        </div>
                                    </td>

                                    <td className="py-4 text-right">
                                        <div className="flex items-center justify-end gap-2 flex-wrap">
                                            <button title="Annulla appuntamento" className="flex items-center gap-1.5 px-3 py-2 bg-red-50 text-red-600 rounded-xl text-xs font-bold hover:bg-red-500 hover:text-white transition-all shadow-sm hover:-translate-y-0.5">
                                                Annulla
                                            </button>
                                            <button title="Assente" className="flex items-center gap-1.5 px-3 py-2 bg-orange-50 text-orange-600 rounded-xl text-xs font-bold hover:bg-orange-500 hover:text-white transition-all shadow-sm hover:-translate-y-0.5">
                                                Assente
                                            </button>
                                            <button title="Servizio completato" className="flex items-center gap-1.5 px-3 py-2 bg-green-50 text-green-600 rounded-xl text-xs font-bold hover:bg-green-500 hover:text-white transition-all shadow-sm hover:-translate-y-0.5">
                                                Fatto
                                            </button>
                                        </div>
                                    </td>

                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="py-12 text-center text-gray-400 font-bold">
                                    Nessuna prenotazione trovata (هیچ نوبتی یافت نشد)
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
}