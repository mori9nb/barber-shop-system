'use client';

import { useState } from 'react';
import Sidebar from '@/components/admin/Sidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        // حذف rtl برای چپ‌چین شدن استاندارد
        <div className="flex h-screen bg-[#F8F9FA] overflow-hidden" dir="ltr">

            <Sidebar
                isOpen={isMobileMenuOpen}
                onClose={() => setIsMobileMenuOpen(false)}
            />

            <div className="flex-1 flex flex-col h-screen overflow-hidden">

                {/* هدر موبایل */}
                <header className="md:hidden bg-white shadow-sm border-b border-gray-100 p-4 flex justify-between items-center z-10">
                    <button
                        onClick={() => setIsMobileMenuOpen(true)}
                        className="text-[#1A1F2B] hover:text-[#D4A373] focus:outline-none transition-colors"
                    >
                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                    <span className="font-black text-[#1A1F2B] tracking-tight text-lg">Dashboard</span>
                    {/* این div خالی برای وسط‌چین موندن کلمه Dashboard تو گوشیه */}
                    <div className="w-7"></div>
                </header>

                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#F8F9FA] p-4 md:p-8">
                    {children}
                </main>

            </div>
        </div>
    );
}