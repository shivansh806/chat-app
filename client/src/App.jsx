import React, { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Auth from './pages/auth'
import Chat from './pages/chat'
import Profile from './pages/profile'
import { useAppStore } from './store'
import apiClient from './lib/api-client'
import { GET_USER_INFO } from './utils/constants'


const PrivateRoute = ({children}) =>{
  const {userInfo} = useAppStore()
  const isAuth = !!userInfo
  return isAuth ? children : <Navigate to="/auth" />
}

const AuthRoute = ({children}) =>{
  const {userInfo} = useAppStore()
  const isAuth = !!userInfo
  return isAuth ? <Navigate to="/chat" /> : children
}

const App = () => {
  const { userInfo, setUserInfo } = useAppStore(); // Correct function name
  console.log({ userInfo }); // Debug log
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await apiClient.get(GET_USER_INFO, { withCredentials: true });
        if (response.status === 200 && response.data.id) {
          setUserInfo(response.data); // Update userInfo in the store
        } else {
          setUserInfo(undefined);
        }
        console.log({ response });
      } catch (err) {
        setUserInfo(undefined);
      } finally {
        setLoading(false);
      }
    };

    if (!userInfo) {
      getUserData();
    } else {
      setLoading(false);
    }
  }, [userInfo, setUserInfo]);

  if (loading) {
    return <div>Loading....</div>;
  }

  return (
    <div>
       <Routes>
          <Route path="/auth" 
          element={<AuthRoute>
            <Auth />
          </AuthRoute>} /> 
          <Route path="/chat" element={<PrivateRoute><Chat /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="*" element={<Navigate to={<Auth />} />} />
       </Routes>
    </div>
  )
}

export default App
