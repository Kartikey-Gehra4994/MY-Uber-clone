import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Userlogin from './pages/Userlogin'
import UserSignup from './pages/UserSignup'
import CaptainSignup from './pages/CaptainSignup'
import Captainlogin from './pages/Captainlogin'
import { UserDataContext } from './context/UserContext'

const App = () => {

  const ans = useContext(UserDataContext)
  // console.log(ans);
  

  return (
    <div className=''>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Userlogin/>} />
        <Route path='/signup' element={<UserSignup/>} />
        <Route path='/captain-login' element={<Captainlogin/>} />
        <Route path='/captain-signup' element={<CaptainSignup/>} />
      </Routes>
    </div>
  )
}

export default App