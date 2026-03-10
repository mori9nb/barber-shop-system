// components/booking/steps/DashboardStep.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { Menu } from 'lucide-react';
import { getServices, Service, getBarbers, Barber } from '@/lib/api';

interface DashboardStepProps {
    next: () => void;
    back: () => void;
    setService: (val: string) => void;
    userName: string;
    bookings: { serviceId: string, barberId: number, date: string, time: string }[];
    onCancelBooking: (serviceId: string) => void;
    onLogout: () => void; // 👈 پراپ خروج اضافه شد
}

export default function DashboardStep({
                                          next, back, setService, userName, bookings, onCancelBooking, onLogout
                                      }: DashboardStepProps) {

    const [services, setServices] = useState<Service[]>([]);
    const [allBarbers, setAllBarbers] = useState<Barber[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // 👈 استیت برای باز و بسته بودن منوی همبرگری
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        Promise.all([getServices(), getBarbers()]).then(([srvs, brbrs]) => {
            setServices(srvs);
            setAllBarbers(brbrs);
            setIsLoading(false);
        }).catch(() => setIsLoading(false));
    }, []);

    const handleServiceClick = (srvId: string) => {
        const isAlreadyBooked = bookings.some(b => b.serviceId === srvId);
        if (isAlreadyBooked) {
            alert("You have already booked this service! Please cancel it below if you want to change the time.");
            return;
        }
        setService(srvId);
        next();
    }

    return (
        // 👈 به کلاس‌های اصلی relative و overflow-hidden رو اضافه کردم که منو بیرون نزنه
        <div className="bg-[#F8F9FA] min-h-[700px] rounded-[2rem] p-6 flex flex-col relative overflow-hidden">

            {/* 👈 هدر آپدیت شد: دکمه Back حذف شد، منو اومد سمت راست */}
            <div className="flex justify-end items-center mb-6">
                <button onClick={() => setIsMenuOpen(true)} className="text-gray-800 hover:text-black transition-colors p-1">
                    <Menu size={28} />
                </button>
            </div>

            <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 leading-tight">Hello!</h2>
                <h1 className="text-3xl font-black text-[#D4A373] leading-tight capitalize tracking-wide">
                    {userName || 'Guest'}
                </h1>
            </div>

            <h2 className="text-2xl font-black text-[#1A1F2B] mb-6 tracking-tight">Categories</h2>

            {isLoading ? (
                <div className="grid grid-cols-3 gap-3 mb-8">
                    {[1, 2, 3].map(i => <div key={i} className="bg-white p-4 rounded-2xl h-[100px] animate-pulse border border-gray-100"></div>)}
                </div>
            ) : (
                <div className="grid grid-cols-3 gap-3 mb-8">
                    {services.map((srv) => {
                        const isBooked = bookings.some(b => b.serviceId === srv.id);
                        return (
                            <button
                                key={srv.id}
                                onClick={() => handleServiceClick(srv.id)}
                                className={`relative bg-white p-4 rounded-3xl flex flex-col items-center justify-center transition-all duration-300 ${
                                    isBooked
                                        ? 'border-2 border-green-500 bg-green-50 shadow-sm opacity-90'
                                        : 'border-2 border-transparent hover:border-gray-200 shadow-[0_2px_15px_rgb(0,0,0,0.03)] cursor-pointer hover:scale-105'
                                }`}
                            >
                                {isBooked && (
                                    <div className="absolute top-2 right-2 text-green-500 font-bold text-xs bg-white rounded-full w-4 h-4 flex items-center justify-center shadow-sm">✓</div>
                                )}
                                <div className={`text-3xl mb-2 grayscale ${isBooked ? 'opacity-100' : 'opacity-80'}`}>{srv.icon}</div>
                                <span className={`text-[11px] font-bold text-center leading-tight ${isBooked ? 'text-green-700' : 'text-[#1A1F2B]'}`}>
                                    {srv.name}
                                </span>
                            </button>
                        )
                    })}
                </div>
            )}

            <div className="mt-auto mb-4">
                <h2 className="text-2xl font-black text-[#1A1F2B] mb-6 tracking-tight">Your orders</h2>

                {bookings.length > 0 ? (
                    <div className="space-y-4 max-h-[220px] overflow-y-auto scrollbar-hide pb-2">
                        {bookings.map((booking) => {
                            const srv = services.find(s => s.id === booking.serviceId);
                            const brb = allBarbers.find(b => b.id === booking.barberId);
                            if (!srv || !brb) return null;

                            return (
                                <div key={booking.serviceId} className="bg-white p-4 rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.05)] border border-gray-100 animate-fade-in">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <p className="text-sm font-bold text-gray-900">{srv.name}</p>
                                            <p className="text-xs text-gray-500 mt-1">With {brb.name}</p>
                                            <span className="text-[10px] bg-[#1A1F2B] text-white px-2 py-1 rounded-md mt-2 inline-block font-medium shadow-sm">
                                                🕒 {booking.date} at {booking.time}
                                            </span>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xl font-extrabold text-gray-900">${brb.price}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => {
                                            if(confirm(`Cancel your ${srv.name} booking?`)) onCancelBooking(booking.serviceId);
                                        }}
                                        className="w-full py-2 rounded-xl border border-red-200 text-red-500 text-xs font-bold hover:bg-red-50 transition-colors"
                                    >
                                        Cancel {srv.name}
                                    </button>
                                </div>
                            )
                        })}
                    </div>
                ) : (
                    <div className="bg-white p-6 rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.05)] border border-gray-100 text-center animate-fade-in">
                        <p className="text-sm text-gray-800 font-bold mb-1">No active bookings.</p>
                        <p className="text-xs text-gray-400 font-medium">Tap a service above to book your time.</p>
                    </div>
                )}
            </div>

            {/* ========================================= */}
            {/* 🔴 بخش منوی کشویی (Sidebar) اضافه شد 🔴 */}
            {/* ========================================= */}

            {/* پس‌زمینه تاریک (Overlay) */}
            <div
                className={`absolute inset-0 bg-black/50 backdrop-blur-[2px] z-40 transition-opacity duration-300 ${
                    isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
                onClick={() => setIsMenuOpen(false)}
            ></div>

            {/* خودِ پنل منو */}
            <div
                className={`absolute top-0 right-0 h-full w-[260px] bg-white z-50 shadow-2xl transition-transform duration-300 ease-out flex flex-col ${
                    isMenuOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                <div className="p-6 flex flex-col h-full">
                    <div className="flex justify-between items-center mb-10">
                        <h2 className="text-2xl font-black text-[#1A1F2B]">Menu</h2>
                        <button onClick={() => setIsMenuOpen(false)} className="text-gray-400 hover:text-black font-bold text-xl transition-colors">
                            ✕
                        </button>
                    </div>

                    <div className="space-y-2 flex-1">
                        <button className="w-full text-left font-bold text-gray-600 hover:text-[#1A1F2B] hover:bg-gray-50 py-3 px-4 rounded-xl transition-all flex items-center gap-3">
                            <span className="text-xl">📞</span> Contact Us
                        </button>
                        <button
                            onClick={onLogout}
                            className="w-full text-left font-bold text-red-500 hover:text-red-600 hover:bg-red-50 py-3 px-4 rounded-xl transition-all flex items-center gap-3 mt-auto"
                        >
                            <span className="text-xl">🚪</span> Log Out
                        </button>
                    </div>

                    {/* کپی‌رایت / تبلیغ شما */}
                    <div className="mt-auto pt-6 border-t border-gray-100 text-center">
                        <p className="text-[10px] text-gray-400 font-medium mb-1">Powered by</p>
                        <p className="text-sm font-black text-[#1A1F2B] tracking-widest uppercase">
                            Persia <span className="text-[#D4A373]">Tech</span>
                        </p>
                    </div>
                </div>
            </div>

        </div>
    );
}