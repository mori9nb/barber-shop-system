export default function StepProgress({step}:{step:number}){

    const steps = ["Start","Barber","Service","Time"]

    return(

        <div className="flex justify-between px-6 py-4 border-b">

            {steps.map((s,i)=>(

                <div key={i} className="flex flex-col items-center flex-1">

                    <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs
${i <= step ? "bg-black text-white" : "bg-gray-200"}
`}
                    >
                        {i+1}
                    </div>

                    <span className="text-[10px] mt-1 text-gray-500">
{s}
</span>

                </div>

            ))}

        </div>

    )

}