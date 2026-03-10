'use client';

import React, { useState } from 'react';

interface SideDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SideDrawer({ isOpen, onClose }: SideDrawerProps) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [phone, setPhone] = useState('');

    const [appointments, setAppointments] = useState([
        { id: 1, service: 'Taglio Capelli VIP', date: '12 Marzo', time: '10:00', barber: 'Alessandro' },
    ]);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (phone.length > 5) setIsLoggedIn(true);
    };

    return (
        <>
            <div
                className={`fixed inset-0 bg-black/70 backdrop-blur-sm z-40 transition-opacity duration-300 ${
                    isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                }`}
                onClick={onClose}
            ></div>

            {/* 👈 رنگ پس‌زمینه منو شد زغالیِ خیلی تیره (stone-950) */}
            <div
                className={`fixed top-0 right-0 h-full w-[80%] max-w-[320px] bg-stone-950 shadow-2xl z-50 overflow-y-auto transform transition-transform duration-500 ease-in-out border-l border-stone-800/50 ${
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
                onClick={(e) => e.stopPropagation()}
            >

                {/* هدرِ منو */}
                <div className="bg-stone-900/50 p-5 border-b border-stone-800 flex justify-between items-center sticky top-0 z-10 backdrop-blur-md">
                    <h2 className="text-lg font-serif text-amber-500 tracking-widest uppercase">Menu</h2>
                    <button onClick={onClose} className="p-2 text-stone-400 hover:text-white bg-stone-800 rounded-full text-sm transition-colors">
                        ✕
                    </button>
                </div>

                <div className="p-5 flex flex-col min-h-[calc(100%-70px)]">

                    {isLoggedIn ? (
                        <div className="space-y-6">
                            <div className="bg-stone-900 p-5 rounded-2xl border border-stone-800 shadow-inner">
                                <p className="text-xs text-stone-400 tracking-widest uppercase mb-1">Bentornato,</p>
                                <p className="font-serif text-xl text-white">{phone}</p>
                            </div>

                            <div>
                                <h3 className="font-serif text-amber-500 mb-4 text-sm uppercase tracking-[0.2em]">I Miei Appuntamenti</h3>
                                <div className="space-y-4">
                                    {appointments.map(app => (
                                        <div key={app.id} className="bg-stone-900 p-5 rounded-2xl border border-stone-800 relative overflow-hidden group">
                                            <div className="absolute top-0 left-0 w-1 h-full bg-amber-500"></div>
                                            <h4 className="font-serif text-white text-lg mb-2">{app.service}</h4>
                                            <p className="text-xs text-stone-400 tracking-widest uppercase mb-1">📅 {app.date} | ⏰ {app.time}</p>
                                            <p className="text-xs text-stone-400 tracking-widest uppercase">✂️ Barbiere: {app.barber}</p>

                                            <div className="flex gap-2 mt-5">
                                                <button className="flex-1 border border-stone-700 text-stone-300 bg-stone-800 py-2.5 rounded-xl text-xs font-bold hover:bg-stone-700 hover:text-white transition-colors tracking-widest uppercase">
                                                    Modifica
                                                </button>
                                                <button className="flex-1 border border-red-900/50 text-red-400 bg-red-950/30 py-2.5 rounded-xl text-xs font-bold hover:bg-red-900/50 transition-colors tracking-widest uppercase">
                                                    Annulla
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <form onSubmit={handleLogin} className="bg-stone-900 p-6 rounded-3xl border border-stone-800 shadow-xl">
                            <div className="text-center mb-6">
                                <div className="w-16 h-16 bg-stone-800 border border-stone-700 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl shadow-inner">👑</div>
                                <h3 className="font-serif text-xl text-white mb-1">Accedi</h3>
                                <p className="text-xs text-stone-400 tracking-widest uppercase">Area Riservata VIP</p>
                            </div>
                            <input
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="es. +39..."
                                className="w-full bg-stone-950 border border-stone-700 text-white rounded-xl px-4 py-3.5 mb-5 focus:ring-1 focus:ring-amber-500 focus:border-amber-500 outline-none text-sm placeholder-stone-600 transition-all"
                                required
                            />
                            <button type="submit" className="w-full bg-amber-600 text-stone-950 font-bold py-3.5 rounded-xl hover:bg-amber-500 transition-all text-sm tracking-widest uppercase shadow-[0_0_15px_rgba(217,119,6,0.4)]">
                                Entra
                            </button>
                        </form>
                    )}

                    <div className="mt-auto space-y-3 pt-8 border-t border-stone-800/50">
                        <a href="tel:+391234567" className="flex items-center justify-center gap-3 p-3.5 bg-stone-900 rounded-xl border border-stone-800 hover:bg-stone-800 transition-colors">
                            <span className="text-lg">📞</span>
                            <span className="text-xs font-bold text-stone-300 tracking-widest uppercase">Contattaci</span>
                        </a>

                        {isLoggedIn ? (
                            <button onClick={() => {setIsLoggedIn(false); setPhone('');}} className="w-full text-center p-3.5 text-stone-400 text-xs font-bold bg-transparent border border-stone-800 rounded-xl hover:bg-stone-900 hover:text-white transition-colors tracking-widest uppercase">
                                Logout
                            </button>
                        ) : (
                            <button onClick={() => handleLogin({ preventDefault: () => {} } as any)} className="w-full text-center p-3.5 text-amber-600/70 text-xs font-bold bg-transparent border border-stone-800 rounded-xl hover:bg-stone-900 hover:text-amber-500 transition-colors tracking-widest uppercase">
                                Accedi Rapido (Test)
                            </button>
                        )}
                    </div>

                </div>
            </div>
        </>
    );
}