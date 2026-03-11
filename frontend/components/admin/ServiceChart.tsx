'use client';

import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

// دیتای تستی برای اینکه ببینیم کدوم خدمات بیشتر طرفدار داشته
const data = [
    { name: 'Taglio Capelli', value: 45 },    // کوتاهی مو
    { name: 'Regolazione Barba', value: 30 }, // تنظیم ریش
    { name: 'Colore', value: 15 },            // رنگ
    { name: 'Trattamento', value: 10 },       // کراتین/پوست
];

// رنگ‌های پریمیوم و مچ با تم پروژه (سرمه‌ای، طلایی، طوسی، کرم)
const COLORS = ['#1A1F2B', '#D4A373', '#9CA3AF', '#E5E7EB'];

export default function ServiceChart() {
    return (
        <div className="w-full h-[300px] flex flex-col items-center justify-center">

            {/* کانتینر ریسپانسیو برای نمودار */}
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%" // مرکز در عرض
                        cy="50%" // مرکز در طول
                        innerRadius={60} // این باعث میشه وسطش خالی بشه (شبیه دونات)
                        outerRadius={100}
                        paddingAngle={5} // فاصله بین تکه‌های نمودار
                        dataKey="value"
                        stroke="none" // حذف خطوط دور تکه‌ها
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>

                    {/* تولتیپ: باکسی که با هاور کردن موس باز میشه */}
                    <Tooltip
                        contentStyle={{
                            borderRadius: '1rem',
                            border: 'none',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                            fontWeight: 'bold',
                            color: '#1A1F2B'
                        }}
                        itemStyle={{ color: '#D4A373' }}
                    />
                </PieChart>
            </ResponsiveContainer>

            {/* راهنمای رنگ‌ها (Legend) در پایین نمودار */}
            <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
                {data.map((entry, index) => (
                    <div key={index} className="flex items-center gap-1.5">
                        <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        />
                        <span className="text-xs font-bold text-gray-500">{entry.name}</span>
                    </div>
                ))}
            </div>

        </div>
    );
}