// components/booking/steps/WelcomeStep.tsx
'use client';

import React from 'react';

export default function WelcomeStep({ onAction }: { onAction: (mode: 'login' | 'register') => void }) {
    return (
        <div className="h-full flex flex-col items-center justify-between p-8 bg-[#F8F9FA] min-h-[700px] rounded-[2rem]">
            <div className="flex-1 flex flex-col items-center justify-center w-full">
                <div className="w-32 h-32 bg-[#EFC4A4] rounded-full flex items-center justify-center mb-6 overflow-hidden border-4 border-[#F8F9FA] shadow-sm">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&backgroundColor=transparent" alt="avatar" className="w-24 h-24 mt-4" />
                </div>
                <div className="flex items-baseline justify-center gap-1 mb-1">
                    <span className="text-[#D4A373] text-sm font-bold tracking-widest uppercase">The</span>
                    <h1 className="text-4xl font-black text-[#1A1F2B] tracking-wider">BARBER</h1>
                    <span className="text-orange-500 text-4xl leading-none">.</span>
                </div>
                <p className="text-gray-400 text-xs font-medium tracking-wide">
                    Get the Best Haircut Here
                </p>
            </div>

            <div className="w-full mt-auto space-y-4 pb-4">
                {/* دکمه Book Now میره برای ثبت‌نام */}
                <button
                    onClick={() => onAction('register')}
                    className="w-full bg-[#1A1F2B] text-white py-4 rounded-2xl font-semibold text-sm shadow-[0_8px_20px_rgba(26,31,43,0.2)] hover:bg-black transition-all"
                >
                    Register Now
                </button>

                {/* دکمه Login میره برای ورود */}
                <button
                    onClick={() => onAction('login')}
                    className="w-full bg-transparent border border-gray-300 text-[#1A1F2B] py-4 rounded-2xl font-semibold text-sm hover:bg-white transition-all"
                >
                    Login
                </button>
            </div>
        </div>
    );
}