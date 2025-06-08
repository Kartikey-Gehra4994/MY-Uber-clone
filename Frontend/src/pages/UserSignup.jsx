import React from 'react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

const UserSignup = () => {

    const [email, setemail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setfirstName] = useState('')
    const [lastName, setlastName] = useState('')
    const [userData, setuserData] = useState({})

    const submitHandler = (e) => {
        e.preventDefault()
        setuserData({
            fullName: {
                firstName: firstName,
                lastName: lastName,
            },
            email: email,
            password: password,
        })

        console.log(userData);
        
        setfirstName('');
        setlastName('');
        setemail('');
        setPassword('');
    }

    // useEffect(() => {
    //   console.log("Ok",userData);
      
    // }, [userData])
    
    return (
        <div className='p-7 h-screen flex flex-col justify-between'>

            <div>
                <img className='w-16 mb-10' src="https://freelogopng.com/images/all_img/1659761100uber-logo-png.png" alt="" />
                <form onSubmit={(e) => submitHandler(e)}>
                    <h3 className='text-lg font-medium mb-2'>What's your Full Name</h3>
                    <div className='flex gap-2 mb-5'>
                        <input
                            className='bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base'
                            required
                            type='text'
                            placeholder='firstname'
                            value={firstName}
                            onChange={(e) => setfirstName(e.target.value)}
                        />
                        <input
                            className='bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base'
                            required
                            type='text'
                            placeholder='lastname'
                            value={lastName}
                            onChange={(e) => setlastName(e.target.value)}
                        />
                    </div>

                    <h3 className='text-lg font-medium mb-2'>What's your email</h3>
                    <input
                        className='bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
                        required
                        type='email'
                        value={email}
                        onChange={(e) => setemail(e.target.value)}
                    />

                    <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
                    <input
                        required
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
                    />
                    <button className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base'>Login</button>
                    <p className='text-center'>Alredy have an account <Link to='/login' className='text-blue-600'>Login Here</Link></p>
                </form>

                <p className='text-sm py-5 text-gray-500 leading-tight'>By proceeding, you consent to receiving calls, WhatsApp or SMS/RCS messages, including by automated means, from Uber and its affiliates to the number provided.</p>
            </div>
               <p className='text-sm py-5 text-gray-500 leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy Policy</span> and <span className='underline'>Terms of Service apply</span>.</p>
        </div>
    )
}

export default UserSignup