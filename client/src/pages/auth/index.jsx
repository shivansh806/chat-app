import React, { useState } from 'react'
import Victory from '../../assets/victory.svg'
import background from '../../assets/back.png'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import apiClient from '@/lib/api-client'
import { LOGIN_ROUTE, SIGNUP_ROUTE } from '@/utils/constants'
import { useNavigate } from 'react-router-dom'
import { useAppStore } from '@/store'

const auth = () => {
  
  const navigate = useNavigate()
  const {setUserInfo} = useAppStore()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmpassword, setConfirmpassword] = useState("")

  const validateSignup = ()=>{
    if(!email.length){
      toast.error("Email is required")
      return false
    }
    if(!password.length){
      toast.error("Password is required")
      return false
    }
    if(password !== confirmpassword){
      toast.error("Passwords do not match")
      return false
    }
    return true
  }

  const validateLogin = ()=>{
    if(!email.length){
      toast.error("Email is required")
      return false
    }
    if(!password.length){
      toast.error("Password is required")
      return false
    }
    return true
  }

  const handleLogin = async (e) => {
    // Handle login logic here
    e.preventDefault()
    if (validateLogin()) {
      try {
        const res = await apiClient.post(LOGIN_ROUTE, { email, password }, { withCredentials: true });
        console.log(res.data);
  
        if (res.data.user.id) {
          setUserInfo(res.data.user)
          if (res.data.user.profileSetup) {
            navigate("/chat");
          } else {
            navigate("/profile");
          }
        }
      } catch (error) {
        console.error("Login failed:", error);
      }
    }
  };

  const handleSignup = async () => {
    // Handle signup logic here
    if (validateSignup()) {
      try {
        const res = await apiClient.post(SIGNUP_ROUTE, { email, password }, { withCredentials: true });
  
        if (res.status === 201) {
          setUserInfo(res.data.user)
          navigate("/profile");
        }
      } catch (error) {
        console.error("Signup failed:", error);
      }
    }
  };


  return (
    <div className='h-[100vh] w-[100vw] flex items-center justify-center'>
      <div className='h-[95vh] w-[95vw] bg-white border-2 border-white text-opacity-90 shadow-2xl md:w-[90vw] lg:w-[70vw] xl:w-[60vw] rounded-3xl grid xl:grid-cols-2'>
        <div className="flex flex-col items-center gap-10 justify-center ">
          <div className="flex items-center justify-center flex-col ">
            <div className="flex items-center justify-center">
              <h1 className='text-5xl font-bold md:text-4xl'>Welcome</h1>
              <img src={Victory} alt="victory emoji" className='h-[80px]'/>
            </div>
            <p className='font-medium text-center'>
              Fill in the details to get started with the best chat app!
            </p>
          </div>
           <div className="flex items-center justify-center w-full">
            <Tabs className='w-3/4' defaultValue='login'>
              <TabsList className='bg-transparent rounded-none w-full flex justify-between'>
                <TabsTrigger value = 'login'
                className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300"
                >Login</TabsTrigger>
                <TabsTrigger value = 'signup'
                className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300"
                >Signup</TabsTrigger>
              </TabsList>
              <TabsContent className='flex flex-col gap-5 mt-10' value='login'>

                <Input type="email" placeholder='Email' className='rounded-full p-6' value={email} onChange={(e) => setEmail(e.target.value)} />

                <Input type="password" placeholder='Password' className='rounded-full p-6' value={password} onChange={(e) => setPassword(e.target.value)} />
                <Button className="rounded-full p-6 cursor-pointer" onClick={(e)=>{
                  handleLogin(e)
                }}>Login</Button>
              </TabsContent>
              <TabsContent className='flex flex-col gap-5 mt-10' value='signup'>

              <Input type="email" placeholder='Email' className='rounded-full p-6' value={email} onChange={(e) => setEmail(e.target.value)} />

              <Input type="password" placeholder='Password' className='rounded-full p-6' value={password} onChange={(e) => setPassword(e.target.value)} />

              <Input type="password" placeholder='Confirm Password' className='rounded-full p-6' value={confirmpassword} onChange={(e) => setConfirmpassword(e.target.value)} />

              <Button className="rounded-full p-6 cursor-pointer" onClick={handleSignup}>Signup</Button>

              </TabsContent>
            </Tabs>
           </div>
        </div>
        <div className="hidden xl:flex justify-center items-center">
          <img src={background} alt="background login" className='h-[300px]' />
        </div>


      </div>
      
    </div>
  )
}

export default auth
