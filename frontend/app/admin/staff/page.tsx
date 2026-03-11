'use client';

import React, { useState } from 'react';

// دیتای تستی کارکنان (دقت کن که خدمات هر شخص بهش وصل شده)
const initialStaff = [
    {
        id: 1,
        name: 'Alessandro Russo',
        role: 'Master Barber',
        phone: '+39 333 1112233',
        status: 'Attivo', // فعال
        services: ['Taglio Capelli', 'Regolazione Barba'] // خدماتی که این شخص انجام میده
    },
    {
        id: 2,
        name: 'Marco Ferrari',
        role: 'Colorist & Stylist',
        phone: '+39 338 4445566',
        status: 'Attivo',
        services: ['Colore e Taglio', 'Trattamento Viso']
    },
    {
        id: 3,
        name: 'Lorenzo Costa',
        role: 'Junior Barber',
        phone: '+39 331 7778899',
        status: 'In ferie', // مرخصی
        services: ['Taglio Capelli', 'Taglio Bambino']
    },
];

export default function StaffPage() {
    const [staffMembers, setStaffMembers] = useState(initialStaff);

    // تابع حذف ظاهری
    const handleDelete = (id: number) => {
        if (confirm('Sei sicuro di voler eliminare questo membro dello staff? (آیا مطمئن هستید؟)')) {
            setStaffMembers(staffMembers.filter(s => s.id !== id));
        }
    };

    return (
        <div className="space-y-8 animate-fade-in pb-10">

            {/* هدر صفحه */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-[#1A1F2B] tracking-tight">Il Tuo Team</h1>
                    <p className="text-gray-500 font-medium mt-1">Gestisci i membri dello staff e i servizi che offrono.</p>
                </div>

                {/* دکمه اضافه کردن آرایشگر جدید */}
                <button className="bg-[#1A1F2B] text-white font-bold py-3 px-6 rounded-2xl hover:bg-black transition-all shadow-md hover:-translate-y-1 flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4"></path>
                    </svg>
                    Nuovo Membro
                </button>
            </div>

            {/* گرید کارت‌های کارکنان */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {staffMembers.map((staff) => (
                    <div key={staff.id} className="bg-white rounded-[1.5rem] p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 hover:shadow-lg transition-all duration-300 group flex flex-col relative overflow-hidden">

                        {/* نوار رنگی بالای کارت (بسته به وضعیت فعال یا مرخصی) */}
                        <div className={`absolute top-0 left-0 w-full h-1.5 ${staff.status === 'Attivo' ? 'bg-[#D4A373]' : 'bg-gray-300'}`}></div>

                        {/* بخش مشخصات اصلی (آواتار، اسم، سمت) */}
                        <div className="flex items-center gap-4 mb-6 mt-2">
                            <div className="w-16 h-16 rounded-full bg-[#1A1F2B] text-[#D4A373] flex items-center justify-center text-2xl font-black shadow-md">
                                {staff.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                                <h3 className="text-xl font-black text-[#1A1F2B]">{staff.name}</h3>
                                <p className="text-sm font-bold text-gray-500">{staff.role}</p>
                            </div>
                        </div>

                        {/* بخش خدمات اختصاص یافته (نمایش ارتباط با خدمات) */}
                        <div className="mb-6 flex-1">
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Servizi Assegnati</p>
                            <div className="flex flex-wrap gap-2">
                                {staff.services.map((service, index) => (
                                    <span key={index} className="bg-gray-50 border border-gray-100 text-gray-600 text-xs font-bold px-3 py-1.5 rounded-xl">
                                        {service}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* خط جداکننده */}
                        <div className="w-full h-px bg-gray-100 mb-4"></div>

                        {/* بخش پایین (شماره تماس و دکمه‌های عملیات) */}
                        <div className="flex items-center justify-between">

                            {/* وضعیت و شماره تماس */}
                            <div className="flex items-center gap-2">
                                <span className={`w-2.5 h-2.5 rounded-full ${staff.status === 'Attivo' ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                                <span className="text-xs font-bold text-gray-400">{staff.status}</span>
                            </div>

                            {/* دکمه‌ها */}
                            <div className="flex items-center gap-1.5">
                                {/* دکمه ویرایش (تنظیم خدمات این شخص) */}
                                <button title="Modifica servizi (تغییر خدمات/مشخصات)" className="p-2 text-blue-500 bg-blue-50 hover:bg-blue-500 hover:text-white rounded-xl transition-all duration-300 shadow-sm">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                                    </svg>
                                </button>

                                {/* دکمه حذف */}
                                <button onClick={() => handleDelete(staff.id)} title="Elimina Staff (حذف)" className="p-2 text-red-500 bg-red-50 hover:bg-red-500 hover:text-white rounded-xl transition-all duration-300 shadow-sm">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                    </svg>
                                </button>
                            </div>

                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
}