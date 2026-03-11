import React from 'react';

// چند تا دیتای تستی برای نمایش ظاهر جدول
const mockBookings = [
    { id: 1, customer: 'Marco Rossi', service: 'Taglio Capelli', date: 'Oggi', time: '10:00' },
    { id: 2, customer: 'Luca Bianchi', service: 'Regolazione Barba', date: 'Oggi', time: '12:30' },
    { id: 3, customer: 'Giovanni Verdi', service: 'Colore e Taglio', date: 'Oggi', time: '14:00' },
    { id: 4, customer: 'Andrea Romano', service: 'Taglio Bambino', date: 'Domani', time: '09:00' },
];

export default function RecentBookings() {
    return (
        // این div باعث میشه تو گوشی جدول بتونه به چپ و راست اسکرول بشه و صفحه رو خراب نکنه
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">

                {/* هدر جدول */}
                <thead>
                <tr className="border-b-2 border-gray-100 text-xs uppercase tracking-widest text-gray-400">
                    <th className="pb-4 font-black">Cliente</th>
                    <th className="pb-4 font-black">Servizio</th>
                    <th className="pb-4 font-black">Orario</th>
                    <th className="pb-4 font-black text-right">Azioni</th>
                </tr>
                </thead>

                {/* بدنه جدول (لیست نوبت‌ها) */}
                <tbody className="divide-y divide-gray-50">
                {mockBookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-gray-50/50 transition-colors group">

                        {/* ستون اول: اسم مشتری + آواتار دایره‌ای */}
                        <td className="py-4">
                            <div className="flex items-center gap-4">
                                <div className="w-11 h-11 rounded-2xl bg-[#F8F9FA] flex items-center justify-center text-[#1A1F2B] font-black border border-gray-100 shadow-sm group-hover:bg-white transition-colors">
                                    {/* گرفتن حرف اول اسم و فامیل برای آواتار */}
                                    {booking.customer.split(' ').map(n => n[0]).join('')}
                                </div>
                                <span className="font-bold text-[#1A1F2B] text-sm">{booking.customer}</span>
                            </div>
                        </td>

                        {/* ستون دوم: نوع خدمت */}
                        <td className="py-4 text-sm font-bold text-gray-500">{booking.service}</td>

                        {/* ستون سوم: ساعت و تاریخ */}
                        <td className="py-4">
                            <div className="flex flex-col">
                                <span className="text-sm font-black text-[#1A1F2B]">{booking.time}</span>
                                <span className="text-xs font-bold text-gray-400 mt-0.5">{booking.date}</span>
                            </div>
                        </td>

                        {/* ستون چهارم: دکمه‌های عملیات (جایگزین وضعیت) */}
                        <td className="py-4 text-right">
                            <div className="flex items-center justify-end gap-2">

                                {/* ۱. دکمه لغو (Annulla) - قرمز */}
                                <button
                                    title="Annulla appuntamento (لغو نوبت)"
                                    className="flex items-center gap-1.5 px-3 py-2 bg-red-50 text-red-600 rounded-xl text-xs font-bold hover:bg-red-500 hover:text-white transition-all duration-300 shadow-sm hover:-translate-y-0.5"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path>
                                    </svg>
                                    Annulla
                                </button>

                                {/* دکمه "مشتری نیومد" */}
                                <button
                                    title="Il cliente non si è presentato (مشتری نیامد)"
                                    className="flex items-center gap-1.5 px-3 py-2 bg-orange-50 text-red-600 rounded-xl text-xs font-bold hover:bg-red-500 hover:text-white transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path>
                                    </svg>
                                    Assente
                                </button>

                                {/* دکمه "انجام شد" */}
                                <button
                                    title="Servizio completato (انجام شد)"
                                    className="flex items-center gap-1.5 px-3 py-2 bg-green-50 text-green-600 rounded-xl text-xs font-bold hover:bg-green-500 hover:text-white transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    Fatto!
                                </button>

                            </div>
                        </td>

                    </tr>
                ))}
                </tbody>

            </table>
        </div>
    );
}