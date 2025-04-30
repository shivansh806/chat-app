import React from 'react'
import ProfileInfo from './components/profile-info'


const contactsContainer = () => {
  return (
    <div className='relative md:w-[35vw] lg:w-[30vw] xl:w-[20vw] bg-[#1b1c24] border-r-2 border-[#2f303b] w-full'>
       <div className="pt-3 px-9 pb-3 flex items-center justify-between border-b-2 border-[#2f303b]">
          <h1>Chat-App</h1>
       </div>
       <div className="my-5">
         <div className="flex items-center justify-between pr-10">
             <Title title = "Direct Messages" />
         </div>
       </div>
       <div className="my-5">
         <div className="flex items-center justify-between pr-10">
             <Title title = "Channels" />
         </div>
       </div>
       <ProfileInfo />
    </div>
  )
}

export default contactsContainer


const Title = ({title}) => {
    return <h6 className='uppercase tracking-widest text-neutral-400 pl-10 font-md text-opacity-90 text-sm'>{title}</h6>
}
