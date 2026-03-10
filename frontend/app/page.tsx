'use client'

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

import WelcomeStep from "@/components/booking/steps/WelcomeStep"
import LoginStep from "@/components/booking/steps/LoginStep"
import DashboardStep from "@/components/booking/steps/DashboardStep"
import BarberStep from "@/components/booking/steps/BarberStep"

export default function Home() {
    const [step, setStep] = useState(0)

    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [authMode, setAuthMode] = useState<'login' | 'register'>('register')
    const [userName, setUserName] = useState<string>('')

    // استیت‌های موقت برای وقتی که تو صفحه انتخاب آرایشگر هستیم
    const [selectedService, setSelectedService] = useState<string | null>(null)
    const [selectedBarber, setSelectedBarber] = useState<number | null>(null)

    // 👈 استیت جدید: لیست تمام رزروهای قطعی شده کاربر (سبد خرید)
    const [bookings, setBookings] = useState<{serviceId: string, barberId: number, date: string, time: string}[]>([])

    const next = () => setStep(step + 1)
    const back = () => setStep(step - 1)

    const handleWelcomeAction = (mode: 'login' | 'register') => {
        if (isAuthenticated) {
            setStep(2)
        } else {
            setAuthMode(mode)
            setStep(1)
        }
    }

    const handleLoginSuccess = (name: string) => {
        setUserName(name || 'User')
        setIsAuthenticated(true)
        setStep(2)
    }

    // 👈 تابع کنسل کردن حالا فقط همون سرویسی که می‌خوایم رو پاک می‌کنه
    const handleCancelBooking = (serviceIdToCancel: string) => {
        setBookings(prev => prev.filter(b => b.serviceId !== serviceIdToCancel))
    }

    // ۱. این تابع رو زیر بقیه توابع (حدود خط ۳۶) اضافه کن:
    const handleLogout = () => {
        setIsAuthenticated(false);
        setUserName('');
        setBookings([]); // سبد خرید رو خالی می‌کنیم
        setStep(0); // پرت میشه تو صفحه Welcome
    }

    const variants = {
        enter: { x: 300, opacity: 0 },
        center: { x: 0, opacity: 1 },
        exit: { x: -300, opacity: 0 }
    }

    return (
        <main className="min-h-screen bg-[#CF8F69] flex items-center justify-center p-4">
            <div className="w-[360px] bg-white rounded-[2rem] shadow-2xl overflow-hidden relative min-h-[700px]">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={step}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.35 }}
                        className="h-full"
                    >
                        {step === 0 && <WelcomeStep onAction={handleWelcomeAction} />}

                        {step === 1 && (
                            <LoginStep onLogin={handleLoginSuccess} back={() => setStep(0)} initialMode={authMode} />
                        )}

                        {step === 2 && (
                            <DashboardStep
                                next={next}
                                back={back}
                                setService={setSelectedService}
                                userName={userName}
                                bookings={bookings}
                                onCancelBooking={handleCancelBooking}
                                onLogout={handleLogout} // 👈 این خط اضافه شد
                            />
                        )}

                        {step === 3 && (
                            <BarberStep
                                back={back}
                                setBarber={setSelectedBarber}
                                selectedService={selectedService}
                                onBookingComplete={(date, time) => {
                                    // 👈 رزرو جدید رو به لیست اضافه می‌کنیم
                                    if (selectedService && selectedBarber) {
                                        setBookings(prev => [...prev, { serviceId: selectedService, barberId: selectedBarber, date, time }]);
                                    }
                                    setStep(2); // برمی‌گردیم داشبورد
                                }}
                            />
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </main>
    )
}