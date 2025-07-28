import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserDataContext } from '../context/UserContext'
import axios from 'axios'

const Userlogin = () => {
  const [email, setemail] = useState('')
  const [password, setPassword] = useState('')
  const { user, setUser } = useContext(UserDataContext)
  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault()

    const userData = { email, password }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData)

    if (response.status === 200) {
      const data = response.data
      setUser(data.user)
      localStorage.setItem('token', data.token)
      navigate('/home')
    }

    setemail('')
    setPassword('')
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-white px-4 py-4">

      {/* Logo Box */}
      <div className="w-full max-w-sm rounded-bl-[100px] bg-black h-52 flex justify-center items-center">
        <img
          className="w-24 invert"
          src="https://freelogopng.com/images/all_img/1659761100uber-logo-png.png"
          alt="User Icon"
        />
      </div>

      {/* Login Form */}
      <div className="w-full px-4 mt-[-40px] flex flex-col justify-center">
        <form onSubmit={submitHandler} className="w-full max-w-md mx-auto">
          <h2 className="text-center text-2xl font-bold mb-8">Login</h2>

          <label className="block mb-2 font-semibold">E-mail</label>
          <input
            type="email"
            required
            placeholder="email@example.com"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            className="w-full px-4 py-2 mb-5 rounded border bg-blue-50 focus:outline-none"
          />

          <label className="block mb-2 font-semibold">Password</label>
          <input
            type="password"
            required
            placeholder="example.password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 mb-2 rounded border bg-blue-50 focus:outline-none"
          />

          <div className="text-right text-sm text-gray-500 mb-5">
            <span className="hover:underline cursor-pointer">Forget Password?</span>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white font-semibold py-2 rounded-lg hover:bg-gray-900 transition"
          >
            Login
          </button>

          <p className="text-center text-sm mt-4">
            Don't have any account?{' '}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Sign Up
            </Link>
          </p>
        </form>
      </div>

      {/* Footer */}
      <div className="w-full px-6 mt-10 mb-6 max-w-md mx-auto">
        <Link
          to="/captain-login"
          className="bg-gray-600 flex items-center justify-center text-white font-semibold rounded-lg px-4 py-2 w-full text-base transition-all"
        >
          Sign as Captain
        </Link>
      </div>
    </div>
  )
}

export default Userlogin
