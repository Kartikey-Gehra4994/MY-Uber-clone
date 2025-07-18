import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CaptainDataContext } from '../context/CaptainContext'

const Captainlogin = () => {
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
        <div className='px-5 py-3 h-screen flex flex-col justify-between'>

            <div>
                <img className='w-[80px] mb-2' src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="" />
                <form onSubmit={(e) => submitHandler(e)}>
                    <h3 className='text-lg font-medium mb-2'>what's our Captain's email</h3>
                    <input
                        className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
                        required
                        type="email"
                        value={email}
                        onChange={(e) => setemail(e.target.value)}
                        placeholder='email@example.com' />

                    <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
                    <input
                        className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
                        required
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='example.password' />
                    <button className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base'>Login</button>
                    <p className='text-center'>Join a fleet <Link to='/captain-signup' className='text-blue-600'>Register as a Captain</Link></p>
                </form>
            </div>

            <div>
                <Link to='/login' className='bg-blue-600 flex items-center justify-center text-white font-semibold mb-5 rounded px-4 py-2 w-full text-lg placeholder:text-base'>Sign as User</Link>
            </div>
        </div>
    )
}

export default Captainlogin