'use client';

import React, { useState, useEffect } from 'react';
import { getBarbers, Barber } from '@/lib/api';

interface BarberListProps {
    serviceId: string | null; // 👈 آیدی سرویس
    selectedBarberId: number | null;
    onSelect: (id: number | null) => void;
}

export default function BarberList({ serviceId, selectedBarberId, onSelect }: BarberListProps) {
    const [barbers, setBarbers] = useState<Barber[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        if (!serviceId) return; // اگه سرویسی نبود کاری نکن

        const fetchBarbers = async () => {
            setIsLoading(true);
            try {
                // 👈 حالا فقط آرایشگرهای مربوط به همون سرویس رو می‌گیریم
                const data = await getBarbers(serviceId);
                setBarbers(data);
            } catch (error) {
                console.error("Error", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBarbers();
    }, [serviceId]);

    if (isLoading) {
        return (
            <div className="space-y-4">
                {[1, 2].map((skeleton) => (
                    <div key={skeleton} className="flex items-center bg-white rounded-3xl p-4 shadow-sm animate-pulse h-[104px]">
                        <div className="w-[72px] h-[72px] rounded-full bg-gray-200"></div>
                        <div className="ml-4 flex-1 space-y-2">
                            <div className="h-4 bg-gray-200 rounded w-24"></div>
                            <div className="h-3 bg-gray-200 rounded w-16"></div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (barbers.length === 0) {
        return <p className="text-center text-gray-400 text-sm mt-8">No barbers found for this service.</p>;
    }

    return (
        <div className="space-y-4">
            {barbers.map((barber) => (
                <div
                    key={barber.id}
                    className={`flex items-center bg-white rounded-3xl p-4 shadow-[0_4px_20px_rgb(0,0,0,0.05)] transition-all ${
                        selectedBarberId === barber.id ? 'ring-2 ring-[#1A1F2B]' : ''
                    }`}
                >
                    <img src={barber.image} alt={barber.name} className="w-[72px] h-[72px] rounded-full object-cover bg-slate-200" />

                    <div className="ml-4 flex-1">
                        <div className="flex items-center gap-1">
                            <p className="font-bold text-gray-900 text-lg">{barber.name}</p>
                            <div className="w-[14px] h-[14px] bg-orange-400 rounded-full flex items-center justify-center">
                                <span className="text-white text-[8px]">★</span>
                            </div>
                        </div>
                        <div className="flex items-center text-orange-400 text-[10px] mt-0.5 gap-0.5">
                            {[...Array(barber.rating)].map((_, i) => <span key={i}>⭐</span>)}
                        </div>
                        <p className="text-xs text-orange-300 font-medium mt-1">{barber.clients} clients</p>
                    </div>

                    <div className="text-right flex flex-col items-end">
                        <p className="text-[32px] font-extrabold text-gray-900 leading-none mb-1">${barber.price}</p>
                        <button
                            onClick={() => onSelect(barber.id)}
                            className="mt-1 bg-[#1A1F2B] text-white text-xs px-5 py-2.5 rounded-xl font-medium transition-colors hover:bg-black"
                        >
                            Book Now
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}