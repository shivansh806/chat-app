import { useAppStore } from '@/store'
import React, { use, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import ContactsContainer from './contacts-container'
import EmptyChatContainer from './empty-chat-container'
import ChatContainer from './chat-container'

const chat = () => {

  const {userInfo, selectedChatType} = useAppStore()
  const navigate = useNavigate()
  useEffect(()=>{
    if(!userInfo.profileSetup){
      toast("please setup profile to continue")
      navigate("/profile")
    }
  },[userInfo, navigate])

  return (
    <div className='flex h-[100vh] text-white overflow-hidden'> 
      <ContactsContainer />
      {
        selectedChatType === undefined ? <EmptyChatContainer /> : <ChatContainer />
      }
    </div>
  )
}

export default chat
