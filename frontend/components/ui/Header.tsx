'use client';

import React from 'react';

interface HeaderProps {
    onOpenMenu: () => void;
}

export default function Header({ onOpenMenu }: HeaderProps) {
    return (
        // 👈 فقط یک کادر شناور در گوشه بالا-راست (بدون پس‌زمینه برای کل عرض صفحه)
        <div className="fixed top-6 right-5 z-40">
            <button
                onClick={onOpenMenu}
                // دکمه‌ی شیشه‌ای و تاریک با حاشیه طلایی که روی هوا معلق است
                className="group relative w-12 h-12 flex items-center justify-center rounded-full bg-stone-900/40 backdrop-blur-md border border-amber-500/30 hover:bg-stone-900/60 hover:border-amber-400 transition-all duration-300 shadow-[0_5px_15px_rgba(0,0,0,0.3)] overflow-hidden"
            >
                <div className="absolute inset-0 bg-amber-500/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <svg className="w-6 h-6 text-amber-500 group-hover:text-amber-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M4 7h16M4 12h16M4 17h16" />
                </svg>
            </button>
        </div>
    );
}