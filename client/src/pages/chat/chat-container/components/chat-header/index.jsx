import React from 'react'
import {RiCloseFill} from 'react-icons/ri'

const chatHeader = () => {
  return (
    <div className='h-[10vh] border-b-2 border-[#2f303b] flex items-center justify-between px-20 '>
       <div className="flex gap-5 items-center">
         <div className="flex gap-3 items-center justify-center">
         </div>
         <div className="flex items-center gap-5 jsutify-center">
          <button className='text-neutral-400 focus:border-none focus:outline-none focus:text-white transition-all duration-300'>
              <RiCloseFill className='text-3xl' />
          </button>
         </div>
       </div>
    
    </div>
  )
}

export default chatHeader
