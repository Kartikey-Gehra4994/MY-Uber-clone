import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserDataContext } from '../context/UserContext.jsx'

const UserSignup = () => {
  const [email, setemail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setfirstName] = useState('')
  const [lastName, setlastName] = useState('')

  const navigate = useNavigate()
  const { setUser } = useContext(UserDataContext)

  const submitHandler = async (e) => {
    e.preventDefault()
    const newUser = {
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email,
      password,
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser)

    if (response.status === 201) {
      const data = response.data
      setUser(data.user)
      localStorage.setItem('token', data.token)
      navigate('/home')
    }

    setfirstName('')
    setlastName('')
    setemail('')
    setPassword('')
  }

  return (
    <div className="h-screen flex items-center justify-center bg-white px-4 py-4">
      <div className="w-full h-full">
        {/* Top Logo */}
        <div className="bg-black rounded-bl-[100px] h-52 flex justify-center items-center  mb-6">
          <img
            src="https://freelogopng.com/images/all_img/1659761100uber-logo-png.png"
            alt="Uber Logo"
            className="w-24 invert"
          />
        </div>

        <form onSubmit={submitHandler} className="bg-white rounded-xl p-4">
          <h2 className="text-2xl font-bold text-center mb-6">Create User Account</h2>

          <p className="font-semibold mb-2">Full Name</p>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              required
              value={firstName}
              onChange={(e) => setfirstName(e.target.value)}
              placeholder="First Name"
              className="w-1/2 p-3 text-sm rounded-md bg-blue-50 outline-none"
            />
            <input
              type="text"
              required
              value={lastName}
              onChange={(e) => setlastName(e.target.value)}
              placeholder="Last Name"
              className="w-1/2 p-3 text-sm rounded-md bg-blue-50 outline-none"
            />
          </div>

          <p className="font-semibold mb-2">E-mail</p>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setemail(e.target.value)}
            placeholder="Email"
            className="w-full p-3 mb-3 text-sm rounded-md bg-blue-50 outline-none"
          />

          <p className="font-semibold mb-2">Password</p>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-3 mb-6 text-sm rounded-md bg-blue-50 outline-none"
          />

          <button
            type="submit"
            className="w-full bg-black text-white font-semibold py-2 rounded-md hover:bg-gray-900"
          >
            Create Account
          </button>

          <p className="text-center text-sm mt-4">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 font-medium hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default UserSignup
