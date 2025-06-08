import React from 'react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

const Captainlogin = () => {
   const [email, setemail] = useState('')
    const [password, setPassword] = useState('')
    const [captainData, setcaptainData] = useState({})

    const submitHandler = (e)=>{
        e.preventDefault();
        setcaptainData({
            email: email,
            password: password,
        })

        setemail('');
        setPassword('');
    }

    return (
        <div className='px-5 py-3 h-screen flex flex-col justify-between'>

            <div>
                <img className='w-[80px] mb-2' src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="" />
                <form onSubmit={(e)=>submitHandler(e)}>
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