import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CaptainDataContext } from '../context/CaptainContext'

const CaptainLogin = () => {
    const [email, setemail] = useState('')
    const [password, setPassword] = useState('')

    const { captain, setCaptain } = useContext(CaptainDataContext)
    const navigate = useNavigate()

    const submitHandler = async (e) => {
        e.preventDefault();

        const captainData = {
            email: email,
            password: password
        }

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captainData)

        if (response.status === 200) {
            const data = response.data;
            setCaptain(data.captain)
            localStorage.setItem('token', data.token)
            navigate('/captain-home')
        }

        setemail('');
        setPassword('');
    }

    return (
        <div className="min-h-screen bg-white flex flex-col justify-between items-center px-4 py-4">

            {/* Black top section with icon */}
            <div className="w-full max-w-sm rounded-bl-[100px] bg-black h-52 flex justify-center items-center">
                <img
                    className="w-24"
                    src="https://freelogopng.com/images/all_img/1659761425uber-driver-logo-png.png"
                    alt="User Icon"
                />
            </div>

            {/* Form section */}
            <div className="w-full max-w-sm -mt-8">
                <h3 className="text-2xl font-bold text-center mb-10">Captain Login</h3>
                <form onSubmit={submitHandler} className="bg-white p-4 rounded-xl">

                    <label className="text-sm font-medium mb-1 block">E-mail</label>
                    <input
                        className="bg-gray-100 mb-5 rounded-lg px-4 py-2 border border-gray-300 w-full text-base placeholder:text-sm"
                        required
                        type="email"
                        value={email}
                        onChange={(e) => setemail(e.target.value)}
                        placeholder="Hello@dream.com"
                    />

                    <label className="text-sm font-medium mb-1 block">Password</label>
                    <input
                        className="bg-gray-100 mb-1 rounded-lg px-4 py-2 border border-gray-300 w-full text-base placeholder:text-sm"
                        required
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="********"
                    />
                    <p className="text-xs text-right text-gray-500 mb-5 cursor-pointer hover:underline">
                        Forget Password?
                    </p>

                    <button className="bg-black text-white font-semibold rounded-lg px-4 py-2 w-full text-base transition-all hover:opacity-90">
                        Login
                    </button>

                    <p className="text-center text-sm mt-4">
                        Don’t have any account?{' '}
                        <Link to="/captain-signup" className="text-blue-600 font-semibold hover:underline">
                            Sign Up
                        </Link>
                    </p>
                </form>
            </div>

            {/* Sign as User button */}
            <div className="w-full flex justify-center mb-4">
                <Link
                    to="/login"
                    className="bg-gray-600 flex items-center justify-center text-white font-semibold rounded-lg px-6 py-2 w-[90%] text-base transition-all"
                >
                    Sign as User
                </Link>
            </div>
        </div>
    );
}

export default CaptainLogin