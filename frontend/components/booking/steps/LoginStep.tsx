// components/booking/steps/LoginStep.tsx
'use client';

import React, { useState, useEffect } from 'react';

interface LoginStepProps {
    onLogin: (name: string) => void;
    back: () => void;
    initialMode: 'login' | 'register';
}

export default function LoginStep({ onLogin, back, initialMode }: LoginStepProps) {
    // آیا در حالت ورود هستیم یا ثبت‌نام؟
    const [isLoginMode, setIsLoginMode] = useState(initialMode === 'login');

    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [password, setPassword] = useState('');

    // اگر از بیرون (صفحه اول) حالت تغییر کرد، اینجا هم آپدیت بشه
    useEffect(() => {
        setIsLoginMode(initialMode === 'login');
    }, [initialMode]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // اگر تو حالت لاگین بودیم و فیلد اسم نداشتیم، از روی ایمیل/شماره یه اسم فرضی درمیاریم
        const finalName = isLoginMode
            ? (contact.split('@')[0] || 'User') // قسمت قبل از @ ایمیل رو برمیداره
            : name;

        // اسم رو می‌فرستیم برای صفحه اصلی
        onLogin(finalName);
    };

    return (
        <div className="bg-[#F8F9FA] min-h-[700px] rounded-[2rem] p-6 flex flex-col">
            <button onClick={back} className="text-gray-800 hover:text-black font-bold text-xl mb-6">
                {'<'}
            </button>

            <div className="flex-1 flex flex-col justify-center">
                {/* تغییر داینامیک عنوان */}
                <h2 className="text-3xl font-black text-[#1A1F2B] mb-2">
                    {isLoginMode ? 'Welcome Back' : 'Create Account'}
                </h2>
                <p className="text-sm text-gray-500 mb-8">
                    {isLoginMode ? 'Please enter your details to login.' : 'Please fill the details to register.'}
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* فیلد نام (فقط در حالت ثبت‌نام نشون داده میشه) */}
                    {!isLoginMode && (
                        <div>
                            <label className="block text-xs font-bold text-gray-700 mb-2 pl-1">Full Name</label>
                            <input
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="e.g. Steve Jobs"
                                className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-4 text-sm outline-none focus:border-[#1A1F2B] focus:ring-1 focus:ring-[#1A1F2B] transition-all"
                            />
                        </div>
                    )}

                    {/* فیلد ایمیل/شماره تلفن */}
                    <div>
                        <label className="block text-xs font-bold text-gray-700 mb-2 pl-1">Email or Phone</label>
                        <input
                            type="text"
                            required
                            value={contact}
                            onChange={(e) => setContact(e.target.value)}
                            placeholder="steve@example.com or +123456789"
                            className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-4 text-sm outline-none focus:border-[#1A1F2B] focus:ring-1 focus:ring-[#1A1F2B] transition-all"
                        />
                    </div>

                    {/* فیلد رمز عبور */}
                    <div>
                        <label className="block text-xs font-bold text-gray-700 mb-2 pl-1">Password</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-4 text-sm outline-none focus:border-[#1A1F2B] focus:ring-1 focus:ring-[#1A1F2B] transition-all"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#1A1F2B] text-white py-4 rounded-2xl font-bold text-sm shadow-[0_8px_20px_rgba(26,31,43,0.3)] hover:bg-black transition-all mt-6"
                    >
                        {isLoginMode ? 'Login' : 'Register'} & Continue
                    </button>
                </form>

                {/* دکمه سوییچ بین ثبت‌نام و ورود */}
                <div className="mt-6 text-center">
                    <button
                        type="button"
                        onClick={() => setIsLoginMode(!isLoginMode)}
                        className="text-sm font-medium text-gray-500 hover:text-[#1A1F2B] transition-colors"
                    >
                        {isLoginMode ? "Don't have an account? " : "Already have an account? "}
                        <span className="font-bold text-[#D4A373]">
                            {isLoginMode ? 'Register' : 'Login'}
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
}