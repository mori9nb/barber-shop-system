import { Scissors, User, Sparkles } from "lucide-react"

export default function ServiceStep({
                                        next,
                                        back,
                                        setService
                                    }:{
    next:()=>void
    back:()=>void
    setService:(id:string)=>void
}){

    return(

        <div className="p-6">
            <div className="mb-6">

                <div className="flex justify-between items-center">

                    <div>
                        <p className="text-gray-500 text-sm">Hello!</p>

                        <h1 className="text-2xl font-bold">
                            Steve
                        </h1>
                    </div>

                    <img
                        src="https://i.pravatar.cc/100"
                        className="w-10 h-10 rounded-full"
                    />

                </div>

                <input
                    type="text"
                    placeholder="What are you looking for?"
                    className="mt-4 w-full bg-gray-100 rounded-xl px-4 py-3 text-sm"
                />

            </div>

            <h2 className="text-xl font-bold mb-4">
                Choose Service
            </h2>

            <div className="grid grid-cols-3 gap-4">

                <button
                    onClick={() => {
                        setService("haircut")
                        next()
                    }}
                    className="flex flex-col items-center bg-gray-100 rounded-xl p-4 hover:bg-gray-200 transition"
                >

                    <Scissors size={28}/>

                    <span className="text-xs mt-2">
Haircut
</span>

                </button>

                <button
                    onClick={() => {
                        setService("beard")
                        next()
                    }}
                    className="flex flex-col items-center bg-gray-100 rounded-xl p-4 hover:bg-gray-200 transition"
                >

                    <User size={28}/>

                    <span className="text-xs mt-2">
Beard
</span>

                </button>

                <button
                    onClick={() => {
                        setService("facial")
                        next()
                    }}
                    className="flex flex-col items-center bg-gray-100 rounded-xl p-4 hover:bg-gray-200 transition"
                >

                    <Sparkles size={28}/>

                    <span className="text-xs mt-2">
Facial
</span>

                </button>

            </div>

        </div>

    )
}