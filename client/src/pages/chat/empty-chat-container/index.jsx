import { animationDefaultOptions } from '@/lib/utils'
import React from 'react'
import Lottie from 'react-lottie'

const emptyChatContainer = () => {
  return (
    <div className='flex-1 md:bg-[#1b1c24] md:flex flex-col justify-center items-center hidden duration-1000 transition-all'>
     <Lottie
        isClickToPauseDisabled={true}
        height={200}
        width={200}
        options={animationDefaultOptions}
      />
      <div className="text-opacity-80 text-white flex flex-col gap-5 items-center mt-10 lg:text-4xl text-3xl transition-all duration-300 text-center ">
        <div className="poppins-medium">
            Hi <span className='text-purple-500'>!</span> Welcome to
            <span className='text-purple-500'> Chat </span> App
            <span className='text-purple-500'>.</span>
        </div>

      </div>
    </div>
  )
}

export default emptyChatContainer
