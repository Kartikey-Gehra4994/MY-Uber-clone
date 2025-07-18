import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const CaptainSignup = () => {

    const navigate = useNavigate()

    const [email, setemail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setfirstName] = useState('')
    const [lastName, setlastName] = useState('')

    const [vehicleColor, setVehicleColor] = useState('');
    const [vehiclePlate, setVehiclePlate] = useState('');
    const [vehicleCapacity, setVehicleCapacity] = useState('');
    const [vehicleType, setVehicleType] = useState('');

    const { captain, setCaptain } = React.useContext(CaptainDataContext)

    const submitHandler = async (e) => {
        e.preventDefault()
        const captainData = {
            fullname: {
                firstname: firstName,
                lastname: lastName,
            },
            email: email,
            password: password,
            vehicle: {
                color: vehicleColor,
                plate: vehiclePlate,
                capacity: Number(vehicleCapacity),
                vehicleType: vehicleType
            }
        }
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData);

            if (response.status === 201) {
                const data = response.data;
                setCaptain(data.captain);
                localStorage.setItem('token', data.token);
                navigate('/captain-home');
            }
        } catch (err) {
            console.error("❌ Signup error:", err.response?.data || err.message);
            alert(err.response?.data?.message || "Something went wrong");
        }

        setfirstName('');
        setlastName('');
        setemail('');
        setPassword('');
        setVehicleColor('');
        setVehiclePlate('');
        setVehicleCapacity('');
        setVehicleType('');
    }

    // useEffect(() => {
    //   console.log("Ok",userData);

    // }, [userData])

    return (
        <div className='px-5 py-3 h-screen flex flex-col justify-between'>

            <div>
                <img className='w-[80px] mb-2' src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="" />
                <form onSubmit={(e) => submitHandler(e)}>
                    <h3 className='text-lg font-medium mb-2'>What's our Captain's Name</h3>
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

                    <h3 className='text-lg font-medium mb-2'>What's our Captain's email</h3>
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

                    <h3 className='text-lg font-medium mb-2'>Vehicle Information</h3>
                    <div className='flex gap-2 mb-5'>
                        <input
                            className='bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base'
                            required
                            type='text'
                            placeholder='Vehicle Color'
                            value={vehicleColor}
                            onChange={(e) => setVehicleColor(e.target.value)}
                        />
                        <input
                            className='bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base'
                            required
                            type='text'
                            placeholder='Vehicle Plate'
                            value={vehiclePlate}
                            onChange={(e) => setVehiclePlate(e.target.value)}
                        />
                    </div>
                    <div className='flex gap-2 mb-5'>
                        <input
                            className='bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base'
                            required
                            type='number'
                            min='1'
                            placeholder='Vehicle Capacity'
                            value={vehicleCapacity}
                            onChange={(e) => setVehicleCapacity(e.target.value)}
                        />
                        <select
                            className='bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base'
                            required
                            value={vehicleType}
                            onChange={(e) => setVehicleType(e.target.value)}
                        >
                            <option value='' disabled>Select Vehicle Type</option>
                            <option value='car'>Car</option>
                            <option value='auto'>Auto</option>
                            <option value='motorcycle'>Motorcycle</option>
                        </select>
                    </div>

                    <button className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base'>Create Captain account</button>
                    <p className='text-center'>Already have an account <Link to='/captain-login' className='text-blue-600'>Login Here</Link></p>
                </form>
            </div>
            <p className='text-sm py-5 text-gray-500 leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy Policy</span> and <span className='underline'>Terms of Service apply</span>.</p>
        </div>
    )
}

export default CaptainSignup