'use client';

import React, { useState } from 'react';

// دیتای تستی مشتریان
const mockCustomers = [
    { id: 1, name: 'Marco Rossi', phone: '+39 333 1234567', totalVisits: 12, lastVisit: 'Oggi (امروز)' },
    { id: 2, name: 'Luca Bianchi', phone: '+39 333 7654321', totalVisits: 5, lastVisit: '10 Febbraio 2026' },
    { id: 3, name: 'Giovanni Verdi', phone: '+39 338 9988776', totalVisits: 24, lastVisit: '01 Marzo 2026' },
    { id: 4, name: 'Andrea Romano', phone: '+39 331 2233445', totalVisits: 1, lastVisit: 'Ieri (دیروز)' },
    { id: 5, name: 'Matteo Ferrari', phone: '+39 340 5566778', totalVisits: 8, lastVisit: '15 Gennaio 2026' },
];

export default function CustomersPage() {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredCustomers = mockCustomers.filter(customer =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.phone.includes(searchTerm)
    );

    return (
        <div className="space-y-8 animate-fade-in pb-10">

            {/* هدر صفحه (دکمه مشتری جدید حذف شد) */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-[#1A1F2B] tracking-tight">I Tuoi Clienti</h1>
                    <p className="text-gray-500 font-medium mt-1">Consulta l'anagrafica e lo storico dei tuoi clienti.</p>
                </div>
            </div>

            {/* باکس اصلی جدول */}
            <div className="bg-white rounded-[1.5rem] p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100">

                {/* نوار جستجو */}
                <div className="mb-8">
                    <div className="relative w-full md:w-96">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Cerca per nome o telefono..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-[#F8F9FA] border border-transparent rounded-2xl pl-12 pr-4 py-3 focus:bg-white focus:ring-2 focus:ring-[#D4A373] focus:border-transparent outline-none transition-all font-medium text-[#1A1F2B]"
                        />
                    </div>
                </div>

                {/* جدول مشتریان */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                        <tr className="border-b-2 border-gray-100 text-xs uppercase tracking-widest text-gray-400">
                            <th className="pb-4 font-black">Cliente</th>
                            <th className="pb-4 font-black">Telefono</th>
                            <th className="pb-4 font-black text-center">Appuntamenti Totali</th>
                            <th className="pb-4 font-black">Ultima Visita</th>
                            <th className="pb-4 font-black text-right">Azioni</th>
                        </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-50">
                        {filteredCustomers.length > 0 ? (
                            filteredCustomers.map((customer) => (
                                <tr key={customer.id} className="hover:bg-gray-50/50 transition-colors group">

                                    {/* اسم و آواتار */}
                                    <td className="py-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-11 h-11 rounded-2xl bg-[#F8F9FA] flex items-center justify-center text-[#1A1F2B] font-black border border-gray-100 shadow-sm group-hover:bg-white transition-colors">
                                                {customer.name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <span className="font-bold text-[#1A1F2B] text-sm">{customer.name}</span>
                                        </div>
                                    </td>

                                    {/* شماره تماس */}
                                    <td className="py-4 text-sm font-bold text-gray-500">{customer.phone}</td>

                                    {/* تعداد مراجعات */}
                                    <td className="py-4 text-center">
                                            <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold ${
                                                customer.totalVisits > 10
                                                    ? 'bg-[#D4A373]/20 text-[#D4A373]'
                                                    : 'bg-gray-100 text-gray-600'
                                            }`}>
                                                {customer.totalVisits}
                                            </span>
                                    </td>

                                    {/* آخرین بازدید */}
                                    <td className="py-4 text-sm font-bold text-gray-500">{customer.lastVisit}</td>

                                    {/* دکمه‌های عملیات (فقط دکمه تماس موند) */}
                                    <td className="py-4 text-right">
                                        <div className="flex items-center justify-end">
                                            <button title="Contatta Cliente" className="p-2 text-green-500 hover:text-white hover:bg-green-500 rounded-xl transition-all shadow-sm hover:shadow-md">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                                                </svg>
                                            </button>
                                        </div>
                                    </td>

                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="py-12 text-center text-gray-400 font-bold">
                                    Nessun cliente trovato
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