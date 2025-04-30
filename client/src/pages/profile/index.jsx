import { useAppStore } from '@/store'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IoArrowBack } from 'react-icons/io5'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { colors, getColor } from '@/lib/utils'
import { FaPlus, FaTrash } from 'react-icons/fa'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import apiClient from '@/lib/api-client'
import { ADD_PROFILE_IMAGE_ROUTE, HOST, REMOVE_PROFILE_IMAGE_ROUTE, UPDATE_PROFILE_ROUTE} from '@/utils/constants'

const profile = () => {
  const navigate = useNavigate()
  const { userInfo, setUserInfo } = useAppStore()
  const [firstname, setFirstname] = useState("")
  const [lastname, setLastname] = useState("")
  const [image, setImage] = useState(null)
  const [hovered, setHovered] = useState(false)
  const [selectedColor, setSelectedColor] = useState(0)
  const fileInputRef = useRef(null)

  useEffect(()=>{
      if(userInfo.profileSetup){
        setFirstname(userInfo.firstName)
        setLastname(userInfo.lastName)
        setImage(userInfo.color)
      }
      if(userInfo.image){
        setImage(`${HOST}/${userInfo.image}`)
      }
  },[userInfo])

  const validateProfile = () => {
    if(!firstname){
      toast.error("First name is required")
      return false
    }
    if(!lastname){
      toast.error("Last name is required")
      return false
    }
    return true;
  }

  const saveChanges = async () => {
    if(validateProfile()){
      try{
        const respone = await apiClient.post(UPDATE_PROFILE_ROUTE,{
          firstName: firstname,
          lastName: lastname,
          color: selectedColor,
          profileSetup: true
        },
          {withCredentials: true}
        );
        if(respone.status === 200 && respone.data){
           setUserInfo({...respone.data})
            toast.success("Profile updated successfully")
            navigate("/chat")
        }

      }catch (err) {
        console.error("Error Response:", err.response?.data || err.message);
      }
    }
  };

  const handleNavigate = ()=>{
    if(userInfo.profileSetup){
      navigate("/chat")
    }else{
      toast("please setup profile to continue")
    }
  };

  const handleFileInputClick = () => {
    fileInputRef.current.click()
  }
 
  const handleImageChange = async (event) => {
    const file = event.target.files[0]
    console.log({file})
    if(file){
      const formData = new FormData()
      formData.append('profile-image', file)
      const response = await apiClient.post(ADD_PROFILE_IMAGE_ROUTE,formData,{withCredentials: true});
      if(response.status === 200 && response.data.image){
        setUserInfo({...userInfo, image: response.data.image});
        toast.success("Image uploaded successfully")
      }
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      }
      reader.readAsDataURL(file);
    }
  }

  const handleDeleteImage = async () =>  {
     try{
      const respone = await apiClient.delete(REMOVE_PROFILE_IMAGE_ROUTE, {withCredentials: true});
      if(respone.status === 200){
        setUserInfo({...userInfo, image: null});
        toast.success("Image deleted successfully")
        setImage(null);
      }
     }catch(err){
        console.log(err)
     }
  }


  return (
    <div className='bg-[#1b1c24] h-[100vh] flex items-center justify-center flex-col gap-10'>
      <div className="flex flex-col gap-10 w-[80vw] md:w-max">
        <div 
         onClick={handleNavigate}
        >
          <IoArrowBack className='text-2xl lg:text-4xl text-white/90 cursor-pointer' />
        </div>
        <div className="grid grid-cols-2">
          <div className="h-full w-32 md:w-48 md:h-48 relative flex items-center justify-center"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <Avatar className='h-32 w-32 md:w-48 md:h-48 rounded-full overflow-hidden'>
              {
                image ? (<AvatarImage
                  src={image}
                  alt='profile'
                  className='object-cover h-full w-full bg-black'

                />) : (<div className={`uppercase h-32 w-32 md:w-48 md:h-48 text-5xl border-[2px] rounded-full flex items-center justify-center ${getColor(selectedColor)}`} >
                  {firstname ? firstname.split("").shift()
                    : userInfo.email.split("").shift()}
                </div>
                )}
            </Avatar>
            {
              hovered && (
              <div className='absolute inset-0 flex items-center justify-center bg-black/50 rounded-full '
              onClick={image ? handleDeleteImage : handleFileInputClick}
              >
                {
                  image ? <FaTrash className='text-white text-3xl cursor-pointer' /> : <FaPlus className='text-white text-3xl cursor-pointer' />
                }
              </div>
            )}
            <input type="file" 
            ref = {fileInputRef}
            onChange={handleImageChange}
            name='profile-image'
            accept='.png, .jpg, .jpeg, .webp, .svg'
            className='hidden'
            />

          </div>
          <div className="flex min-w-32 md:min-w-64 flex-col gap-5 text-white items-center justify-center">
            <div className="w-full">
              <input type="email" placeholder='Email' disabled value={userInfo.email} className='rounded-lg p-4 bg-[#2c2e3b] border-none'/>
            </div>
        
            <div className="w-full">
              <input type="text" placeholder='firstName' 
              onChange={(e) => setFirstname(e.target.value)}
               value={firstname} className='rounded-lg p-4 bg-[#2c2e3b] border-none'/>
            </div>

            <div className="w-full">
              <input type="email"
               placeholder='LastName' 
              onChange={(e) => setLastname(e.target.value)}
               value={lastname} className='rounded-lg p-4 bg-[#2c2e3b] border-none'/>
            </div>
             <div className="w-full flex gap-5">
               {
                colors.map((color, index) => (
                  <div key={index} className={`h-10 w-10 rounded-full ${color} cursor-pointer`} onClick={() => setSelectedColor(index)}>
                    {selectedColor === index && <div className='h-full w-full bg-white/50 rounded-full' />}
                  </div>
                ))
               }
             </div>
          </div>
        </div>
        <div className="w-full">
          <Button 
          className='w-full bg-[#ff006e] hover:bg-[#ff006e]/80 text-white font-semibold text-lg py-4 rounded-lg cursor-pointer trasition-all duration-200 ease-in-out'
          onClick={saveChanges}
          >Save Changes</Button>
        </div>
      </div>

    </div>
  )
}

export default profile
