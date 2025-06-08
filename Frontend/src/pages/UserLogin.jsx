import React from 'react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

const Userlogin = () => {

    const [email, setemail] = useState('')
    const [password, setPassword] = useState('')
    const [userData, setuserData] = useState({})

    const submitHandler = (e) => {
        e.preventDefault();
        setuserData({
            email: email,
            password: password,
        })

        setemail('');
        setPassword('');
    }

    return (
        <div className='p-7 h-screen flex flex-col justify-between'>

            <div>
                <img className='w-16 mb-10' src="https://freelogopng.com/images/all_img/1659761100uber-logo-png.png" alt="" />
                <form onSubmit={(e) => submitHandler(e)}>
                    <h3 className='text-lg font-medium mb-2'>what's your email</h3>
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
                    <p className='text-center'>New here? <Link to='/signup' className='text-blue-600'>Create new Account</Link></p>
                </form>
                <p className='text-sm py-5 text-gray-500 leading-tight'>By proceeding, you consent to receiving calls, WhatsApp or SMS/RCS messages, including by automated means, from Uber and its affiliates to the number provided.</p>
            </div>
            <div>
                <Link to='/captain-login' className='bg-green-600 flex items-center justify-center text-white font-semibold mb-2 rounded px-4 py-2 w-full text-lg placeholder:text-base'>Sign as Captain</Link>
            <p className='text-sm pt-5 text-gray-500 leading-tight'>This site is protected by reCAPTCHA and the <span className='underline text-black'>Google Privacy Policy</span> and <span className='underline text-black'>Terms of Service apply</span>.</p>
            </div>
        </div>
    )
}

export default Userlogin