import { motion } from 'framer-motion'
import React from 'react'

function Featured() {
    
  return (
    <div className='w-full py-20 '>
        <div className='w-full px-20 border-b-[1px] border-zinc-700 pb-20 '>
            <h1 className='text-7xl font-serif  tracking-tight'>Featured Courses</h1>
            
            
        </div>

        <div className='px-20'>
        <div className="cards w-full flex gap-10 mt-10">
                <div className="cardcontainer relative w-1/2 h-[75vh] rounded-xl  ">
                <div className="text-center mb-2 text-med font-light text-white-700">
                         Buisness Analytics
                     </div>
                     <h1 className='absolute left-full -translate-x-1/2 top-1/2 -translate-y-1/2  z-[9] text-5xl text-[#CDEA68] leading-none tracking-tighter font-serif'>Analytics</h1>
                <div className=" card  w-full h-full rounded-xl overflow-hidden ">
                <h1 className='absolute left-full -translate-x-1/2 top-1/2 -translate-y-1/2  z-[9] text-5xl text-[#CDEA68] leading-none tracking-tighter font-serif'>
                         {"Analytics".split('').map((item, index) => 
                             <span key={index}>{item}</span>
                                 )}</h1>
                    <img className='w-full h-full bg-cover ' src='https://ochi.design/wp-content/uploads/2023/08/Frame-3875-1326x1101.jpg'/>
                </div>
                </div>
                <div className="cardcontainer relative w-1/2 h-[75vh] rounded-xl  ">
                <div className="text-center mb-2 text-med font-light text-white-700">
                         App Development 
                     </div>
                    

                <div className=" card  w-full h-full rounded-xl  overflow-hidden">
                <h1 className='absolute right-full translate-x-1/2 top-1/2 -translate-y-1/2  z-[9] text-5xl text-[#CDEA68] leading-none tracking-tighter font-serif'>
                
                     {"AppDev".split('').map((item, index) => 
                             <span key={index}>{item}</span>
                                 )}
                </h1>
                <img className='w-full h-full bg-cover ' src='https://ochi.design/wp-content/uploads/2023/10/Fyde_Illustration_Crypto_2-1326x1101.png'/>
                </div>
                </div>
               


            </div>
            <br></br>
            <br></br>
            <div className="cards w-full flex gap-10 mt-10">
            {/* Duplicate of First Card */}
            <div className="cardcontainer relative w-1/2 h-[75vh] rounded-xl">
                <div className="text-center mb-2 text-med font-light text-white-700">
                    Communication 
                </div>
                <h1 className='absolute left-full -translate-x-1/2 top-1/2 -translate-y-1/2 z-[9] text-5xl text-[#CDEA68] leading-none tracking-tighter font-serif'>
                    {"Communication".split('').map((item, index) => (
                        <span key={index}>{item}</span>
                    ))}
                </h1>
                <div className="card w-full h-full rounded-xl overflow-hidden">
                    <img className='w-full h-full bg-cover' src='https://ochi.design/wp-content/uploads/2022/12/PB-Front-4-1326x1101.png' />
                </div>
            </div>

            {/* Duplicate of Second Card */}
            <div className="cardcontainer relative w-1/2 h-[75vh] rounded-xl">
                <div className="text-center mb-2 text-med font-light text-white-700">
                    Cloud Computing
                </div>
                <h1 className='absolute right-full translate-x-1/2 top-1/2 -translate-y-1/2 z-[9] text-5xl text-[#CDEA68] leading-none tracking-tighter font-serif'>
                    {"Cloud".split('').map((item, index) => (
                        <span key={index}>{item}</span>
                    ))}
                </h1>
                <div className="card w-full h-full rounded-xl overflow-hidden">
                    <img className='w-full h-full bg-cover' src='https://ochi.design/wp-content/uploads/2024/08/CS_Website_1-1326x1101.png' />
                </div>
            </div>
        </div>

        </div>
      
    </div>
  )
}

export default Featured
