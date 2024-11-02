import React from 'react'
import { FaLocationArrow } from "react-icons/fa6";
function LandingPage() {
  return (
    <div className='w-full h-screen bg-zinc-900 pt-2'>
     <div className="textstructure mt-40 px-20">
        <div className="masker ">
            <h1 className='font-serif leading-none text-8xl tracking-tighter font-medium'>
                Join the Revolution:</h1>
        </div>
        <div className="masker ">
            <h1 className='font-serif leading-none text-8xl tracking-tighter font-medium'>
            Learn, Create</h1>
        </div>
        <div className="masker ">
            <h1 className='font-serif leading-none text-8xl tracking-tighter font-medium'>
            And Certify</h1>
        </div>
        </div> 
        <div className="border-t-[1px] border-zinc-800 mt-31 flex justify-between items-center py-6 px-20  ">
        {["For Educators","For Students and Professionals"].map((item, index) =><p className='text-md font-light tracking-tight leading-none'>{item}</p>)}
        <div className="start flex items-center gap-2">
            <div className="px-4 py-2 border-[2px] border-zinc-500 font-light text-md capitalize rounded-full ">Let's begin</div>
            <div className='w-7 h-7 px-1 py-1 border-[2px] border-zinc-500  rounded-full'>
                <FaLocationArrow />
            </div>
        </div>
        </div>
    </div>
  )
}

export default LandingPage
