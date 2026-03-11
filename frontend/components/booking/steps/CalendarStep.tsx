import BookingCalendar from "../BookingCalendar"

export default function CalendarStep({
                                         back,
                                         barberId,
                                         serviceId
                                     }:{
    back:()=>void
    barberId:number | null
    serviceId:string | null
}){

    if(!barberId || !serviceId){
        return <div>Missing booking data</div>
    }

    return(
        <div className="bg-[#F8F9FA] min-h-[700px] rounded-[2rem] p-6 flex flex-col">

            {/* دکمه برگشت شبیه به داشبورد */}
            <div className="flex justify-between items-center mb-6">
                <button
                    onClick={back}
                    className="text-gray-800 hover:text-black font-bold text-xl transition-colors"
                >
                    {'<'}
                </button>
            </div>

            <BookingCalendar selectedBarberId={barberId}
            serviceId={serviceId}/>

        </div>
    )
}