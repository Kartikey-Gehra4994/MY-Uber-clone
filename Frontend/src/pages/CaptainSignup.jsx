import React, { useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { CaptainDataContext } from '../context/CaptainContext'

const CaptainSignup = () => {
    const navigate = useNavigate()
    const { setCaptain } = useContext(CaptainDataContext)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [vehicleColor, setVehicleColor] = useState('')
    const [vehiclePlate, setVehiclePlate] = useState('')
    const [vehicleCapacity, setVehicleCapacity] = useState('')
    const [vehicleType, setVehicleType] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        const captainData = {
            fullname: { firstname: firstName, lastname: lastName },
            email,
            password,
            vehicle: {
                color: vehicleColor,
                plate: vehiclePlate,
                capacity: Number(vehicleCapacity),
                vehicleType,
            },
        }

        try {
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData)
            if (res.status === 201) {
                const data = res.data
                setCaptain(data.captain)
                localStorage.setItem('token', data.token)
                navigate('/captain-home')
            }
        } catch (err) {
            alert(err.response?.data?.message || 'Signup failed')
        }
    }

    return (
        <div className="flex flex-col items-center justify-between min-h-screen px-4 py-4 bg-white">
            {/* Header */}
            {/* Black top section with icon */}
            <div className="w-full max-w-sm rounded-bl-[100px] bg-black h-52 flex justify-center items-center">
                <img
                    className="w-24"
                    src="https://freelogopng.com/images/all_img/1659761425uber-driver-logo-png.png"
                    alt="User Icon"
                />
            </div>

            {/* Signup Form */}
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md bg-white flex flex-col gap-4 text-sm px-4 pb-16 mt-[-40px]"
            >
                <h2 className="text-2xl font-bold text-center mb-2">Create Captain Account</h2>

                <h3 className="text-sm font-medium mt-2">Captain Info</h3>
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full p-2 border rounded bg-[#eef3ff]"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full p-2 border rounded bg-[#eef3ff]"
                        required
                    />
                </div>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="p-2 border rounded bg-[#eef3ff]"
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="p-2 border rounded bg-[#eef3ff]"
                    required
                />

                <h3 className="text-sm font-medium mt-2">Vehicle Info</h3>
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Color"
                        value={vehicleColor}
                        onChange={(e) => setVehicleColor(e.target.value)}
                        className="w-full p-2 border rounded bg-[#eef3ff]"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Plate Number"
                        value={vehiclePlate}
                        onChange={(e) => setVehiclePlate(e.target.value)}
                        className="w-full p-2 border rounded bg-[#eef3ff]"
                        required
                    />
                </div>

                <div className="flex gap-2">
                    <input
                        type="number"
                        placeholder="Capacity"
                        min="1"
                        value={vehicleCapacity}
                        onChange={(e) => setVehicleCapacity(e.target.value)}
                        className="w-full p-2 border rounded bg-[#eef3ff]"
                        required
                    />
                    <select
                        value={vehicleType}
                        onChange={(e) => setVehicleType(e.target.value)}
                        className="w-full p-2 border rounded bg-[#eef3ff]"
                        required
                    >
                        <option value="" disabled>Select Vehicle Type</option>
                        <option value="car">Car</option>
                        <option value="auto">Auto</option>
                        <option value="motorcycle">Motorcycle</option>
                    </select>
                </div>

                <button
                    type="submit"
                    className="bg-black text-white font-semibold rounded-lg px-4 py-2 w-full text-base transition-all mt-4 hover:opacity-90"
                >
                    Create Account
                </button>

                <p className="text-center text-sm">
                    Already have an account?{' '}
                    <Link to="/captain-login" className="text-blue-600 font-medium">
                        Login
                    </Link>
                </p>
            </form>
        </div>
    )
}

export default CaptainSignup
