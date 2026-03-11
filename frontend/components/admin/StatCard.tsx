import React from 'react';

// ورودی‌هایی که هر کارت نیاز داره
interface StatCardProps {
    title: string;
    value: string | number;
    icon: string;
    colorClass: string; // برای اینکه هر آیکون رنگ خودش رو داشته باشه
}

export default function StatCard({ title, value, icon, colorClass }: StatCardProps) {
    return (
        <div className="bg-white rounded-[1.5rem] p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 flex items-center justify-between transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-1">
            <div>
                {/* عنوان کارت */}
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                    {title}
                </p>
                {/* مقدار (عدد) */}
                <h3 className="text-3xl font-black text-[#1A1F2B]">
                    {value}
                </h3>
            </div>
            {/* باکسِ آیکون */}
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-sm ${colorClass}`}>
                {icon}
            </div>
        </div>
    );
}