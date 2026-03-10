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

        <div className="max-w-md mx-auto p-6">

            <button onClick={back} className="mb-4">
                ← Back
            </button>

            <BookingCalendar selectedBarberId={barberId}/>

        </div>

    )
}