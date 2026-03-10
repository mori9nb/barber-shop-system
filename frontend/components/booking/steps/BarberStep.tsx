// components/booking/steps/BarberStep.tsx
import { useState } from "react"
import BarberList from "../BarberList"
import BookingBottomSheet from "../BookingBottomSheet"

export default function BarberStep({ back, setBarber, selectedService, onBookingComplete }: {
    back: () => void
    setBarber: (id: number) => void
    selectedService: string | null // 👈 سرویس رو دریافت کردیم
    onBookingComplete: (date: string, time: string) => void
}) {
    const [selected, setSelected] = useState<number | null>(null)
    const [isSheetOpen, setIsSheetOpen] = useState(false)

    return (
        <div className="bg-[#F8F9FA] min-h-[700px] rounded-[2rem] p-6 flex flex-col relative overflow-hidden">
            <div className="flex items-center mb-8">
                <button onClick={back} className="text-gray-800 hover:text-black font-bold text-xl">{'<'}</button>
            </div>

            <div className="mb-6">
                <h2 className="text-2xl font-black text-[#1A1F2B] tracking-tight">Select Barber</h2>
                <p className="text-sm text-gray-500 mt-1 font-medium">Choose your preferred barber for the service.</p>
            </div>

            <div className="flex-1 overflow-y-auto scrollbar-hide -mx-2 px-2 pb-4">
                <BarberList
                    serviceId={selectedService} // 👈 دادیمش به لیست تا بر اساسش فیلتر کنه
                    selectedBarberId={selected}
                    onSelect={(id) => {
                        if (id !== null) {
                            setSelected(id)
                            setBarber(id)
                            setIsSheetOpen(true)
                        }
                    }}
                />
            </div>

            <BookingBottomSheet
                isOpen={isSheetOpen}
                onClose={() => setIsSheetOpen(false)}
                barberId={selected}
                serviceId={selectedService} // 👈 دادیمش به تقویم
                onConfirm={(date, time) => {
                    setIsSheetOpen(false);
                    onBookingComplete(date, time);
                }}
            />
        </div>
    )
}