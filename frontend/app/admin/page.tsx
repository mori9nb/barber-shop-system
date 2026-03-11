import StatCard from '@/components/admin/StatCard';
import RecentBookings from '@/components/admin/RecentBookings'; // 👈 اینو اضافه کن
import ServiceChart from '@/components/admin/ServiceChart';

export default function AdminDashboard() {
    return (
        <div className="space-y-8 animate-fade-in pb-10">

            {/* هدر صفحه (خوش‌آمدگویی) */}
            <div>
                <h1 className="text-3xl font-black text-[#1A1F2B] tracking-tight">Persia Tech</h1>
                <p className="text-gray-500 font-medium mt-1">Benvenuto nel pannello, ecco il riassunto di oggi.</p>
            </div>

            {/* گریدِ کارت‌های آماری (ریسپانسیو: موبایل ۱ ستون، تبلت ۲ تا، پی‌سی ۴ تا) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                <StatCard
                    title="Appuntamenti Oggi"
                    value="12"
                    icon="📅"
                    colorClass="bg-blue-50 text-blue-600 border border-blue-100"
                />

                <StatCard
                    title="Nuovi Clienti"
                    value="8"
                    icon="👥"
                    colorClass="bg-purple-50 text-purple-600 border border-purple-100"
                />

                <StatCard
                    title="Servizi Completati"
                    value="32"
                    icon="✂️"
                    colorClass="bg-orange-50 text-orange-600 border border-orange-100"
                />

                <StatCard
                    title="Incasso Odierno"
                    value="€ 450"
                    icon="💰"
                    colorClass="bg-green-50 text-green-600 border border-green-100"
                />

            </div>

            {/* بخش پایینی که قراره جدول و نمودار بیاد */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">

                {/* 👈 جایگاه جدول نوبت‌ها آپدیت شد */}
                <div className="lg:col-span-2 bg-white rounded-[1.5rem] p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-black text-[#1A1F2B] tracking-tight">Prossimi Appuntamenti</h3>
                        <button className="text-sm font-bold text-[#D4A373] hover:text-[#b88c5f] transition-colors">
                            Vedi Tutti →
                        </button>
                    </div>

                    {/* اینجا کامپوننتی که ساختیم رو رندر می‌کنیم */}
                    <RecentBookings />
                </div>

                {/* جایگاه نمودار یا نظرات */}
                <div className="bg-white rounded-[1.5rem] p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 min-h-[400px] flex flex-col">
                    <h3 className="text-xl font-black text-[#1A1F2B] mb-2 tracking-tight">Statistiche Servizi</h3>
                    <p className="text-xs font-bold text-gray-400 mb-6 uppercase tracking-wider">Distribuzione (توزیع خدمات)</p>

                    {/* اینجا نمودار رو صدا می‌زنیم */}
                    <div className="flex-1 flex items-center justify-center">
                        <ServiceChart />
                    </div>
                </div>

            </div>

        </div>
    );
}