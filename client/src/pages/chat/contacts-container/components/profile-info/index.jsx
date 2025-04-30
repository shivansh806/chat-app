import apiClient from '@/lib/api-client'
import { getColor } from '@/lib/utils'
import { useAppStore } from '@/store'
import { HOST, LOGOUT_ROUTE } from '@/utils/constants'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@radix-ui/react-tooltip'
import React from 'react'
import { FiEdit2 } from 'react-icons/fi'
import {IoPowerSharp} from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'

const ProfileInfo = () => {
  const { userInfo, setUserInfo } = useAppStore()
  console.log({ userInfo })
  const navigate = useNavigate()

  const logout = async () => {
       try{
        const respone = await apiClient.post(LOGOUT_ROUTE, {}, { withCredentials: true })
        if (respone.status === 200) {
          navigate("/auth")
          setUserInfo(null)
        }
       }catch(err){
        console.log(err)
       }
  }

  return (
    <div className='absolute bottom-0 h-16 flex items-center justify-between px-10 w-full bg-[#2a2b33]'>
      <div className="flex gap-3 items-center justify-center ">
        <div className='w-12 h-12 relative'>
          <Avatar className='h-12 w-12 rounded-full overflow-hidden'>
            {
              userInfo.image ? (
                <AvatarImage
                  src={`${HOST}/${userInfo.image}`}
                  alt='profile'
                  className='object-cover h-full w-full bg-black'

                />) :
                (<div className={`uppercase h-12 w-12  text-lg border-[2px] rounded-full flex items-center justify-center ${getColor(userInfo.color)}`} >
                  {userInfo.firstname ? userInfo.firstname.split("").shift()
                    : userInfo.email.split("").shift()}
                </div>
                )}
          </Avatar>
        </div>
        <div>
          {
            userInfo.firstName && userInfo.lastName ? `${userInfo.firstName} ${userInfo.lastName}` : ""
          }
        </div>
      </div>
      <div className="flex gap-5">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <FiEdit2 className="text-purple-500 text-xl font-medium" 
              onClick={()=> navigate("/profile")}
              />
            </TooltipTrigger>
            <TooltipContent className='bg-[#1c1b1e] border-none text-white p-2 rounded-md'>
              <p>Edit Profile</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <IoPowerSharp className="text-red-500 text-xl font-medium" 
              onClick={logout}
              />
            </TooltipTrigger>
            <TooltipContent className='bg-[#1c1b1e] border-none text-white p-2 rounded-md'>
              <p>Log out</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

    </div>
  )
}

export default ProfileInfo
