'use client';

import Link from 'next/link';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
    // لیست منوها به زبان ایتالیایی
    const menuItems = [
        { name: 'Dashboard', icon: '🏠', path: '/admin' },
        { name: 'Appuntamenti', icon: '📅', path: '/admin/bookings' }, // نوبت‌ها
        { name: 'Clienti', icon: '👥', path: '/admin/customers' },      // مشتری‌ها
        { name: 'Servizi', icon: '✂️', path: '/admin/services' },       // خدمات
        { name: 'Staff', icon: '👤', path: '/admin/staff' },          // کارکنان
        { name: 'Statistiche', icon: '📊', path: '/admin/reports' },  // گزارشات
    ];

    return (
        <>
            {/* پس‌زمینه تاریک برای موبایل */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-[#1A1F2B]/60 backdrop-blur-sm z-40 md:hidden"
                    onClick={onClose}
                />
            )}

            {/* سایدبار اصلی */}
            <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#1A1F2B] text-white transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>

                {/* هدر سایدبار */}
                <div className="flex items-center justify-between p-6 border-b border-gray-800">
                    <h2 className="text-2xl font-black text-[#D4A373] tracking-tight">BarberAdmin</h2>
                    <button onClick={onClose} className="md:hidden text-gray-400 hover:text-white transition-colors">
                        ✕
                    </button>
                </div>

                {/* لینک‌های منو */}
                <nav className="p-4 space-y-2 mt-2">
                    {menuItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.path}
                            className="flex items-center gap-4 px-4 py-3.5 rounded-2xl text-gray-400 hover:bg-white/5 hover:text-[#D4A373] transition-all duration-300 group"
                        >
                            <span className="text-xl group-hover:scale-110 transition-transform">{item.icon}</span>
                            <span className="font-bold text-sm tracking-wide">{item.name}</span>
                        </Link>
                    ))}
                </nav>
            </div>
        </>
    );
}