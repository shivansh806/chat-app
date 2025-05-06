import { getColor } from '@/lib/utils';
import { useAppStore } from '@/store'
import { HOST } from '@/utils/constants';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import React from 'react'
import { RiCloseFill } from 'react-icons/ri'

const chatHeader = () => {
  const { closeChat, selectedChatData, selectedChatType} = useAppStore();
  return (
    <div className='h-[10vh] border-b-2 border-[#2f303b] flex items-center justify-between px-20 '>
      <div className="flex gap-5 items-center justify-between w-full">
        <div className="flex gap-3 items-center justify-center">
          <div className="w-12 h-12 relative">
            <Avatar className="h-12 w-12 rounded-full overflow-hidden">
              {selectedChatData.image ? (
                <AvatarImage
                  src={`${HOST}/${selectedChatData.image}`}
                  alt="profile"
                  className="object-cover w-full h-full bg-black rounded-full"
                />
              ) : (
                <div
                  className={`uppercase h-12 w-12 text-lg border-[1px] flex items-center justify-center rounded-full ${getColor(
                    selectedChatData.color
                  )}`}
                >
                  {selectedChatData.firstName
                    ? selectedChatData.firstName.split("")[0]
                    : selectedChatData.email.split("")[0]}
                </div>
              )}
            </Avatar>
          </div>
           <div>
             {
              selectedChatType === 'contact' && selectedChatData.firstName ?
              `${selectedChatData.firstName} ${selectedChatData.lastName}` : selectedChatData.email
             }
           </div>
        </div>
        <div className="flex items-center gap-5 jsutify-center">
          <button className='text-neutral-400 focus:border-none focus:outline-none focus:text-white transition-all duration-300'
            onClick={closeChat}
          >
            <RiCloseFill className='text-3xl' />
          </button>
        </div>
      </div>

    </div>
  )
}

export default chatHeader
