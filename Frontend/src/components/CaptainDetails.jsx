import React from 'react'
import { BsPersonBadgeFill } from 'react-icons/bs'
import { FaUserCircle, FaWallet } from 'react-icons/fa'
import { IoCarSportOutline } from 'react-icons/io5'
import { PiClockCountdownBold } from 'react-icons/pi'
import { SiSpeedtest } from 'react-icons/si'

import { useContext, useEffect } from 'react'
import { CaptainDataContext } from '../context/CaptainContext'


const CaptainDetails = () => {
  const { captain } = useContext(CaptainDataContext)

  return (
    <>
      <div className="h-72 py-6 px-4 fixed bottom-0 w-full bg-black/20 backdrop-blur-md text-white shadow-2xl rounded-t-3xl z-10 font-[Inter]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              className="h-14 w-14 rounded-full object-cover border-2 border-white shadow-lg"
              src="kartik_1.jpg"
              alt="Profile"
            />
            <BsPersonBadgeFill className="absolute -bottom-1 -right-1 text-white bg-blue-600 rounded-full p-1 text-xs shadow-md" />
          </div>
          <div>
            <h4 className="text-xl font-bold capitalize">
              {captain?.fullname?.firstname} {captain?.fullname?.lastname }
            </h4>
            <p className="text-sm text-blue-100 flex items-center gap-1">
              <FaUserCircle className="text-yellow-300" /> 
              {captain?.status === 'active' ? 'Active Driver' : 
               captain?.status === 'inactive' ? 'Inactive Driver' : 
               'Status Unknown'}
            </p>
          </div>
        </div>

        <div className="text-right">
          <h4 className="text-2xl font-extrabold text-yellow-300 flex items-center gap-2">
            <FaWallet className="text-white" /> ₹295.20
          </h4>
          <p className="text-sm text-blue-100">Earned Today</p>
        </div>
      </div>

      <div className="flex justify-between items-center mt-10  bg-black/20 backdrop-blur-md text-gray-50 rounded-2xl shadow-lg px-6 py-5">
        <div className="text-center hover:scale-105 transition-transform duration-300">
          <PiClockCountdownBold className="text-4xl text-blue-400 mb-1 mx-auto" />
          <h5 className="text-xl font-semibold">10.2</h5>
          <p className="text-sm text-gray-300">Hours Online</p>
        </div>
        <div className="text-center hover:scale-105 transition-transform duration-300">
          <SiSpeedtest className="text-4xl text-blue-400 mb-1 mx-auto" />
          <h5 className="text-xl font-semibold">45 km/h</h5>
          <p className="text-sm text-gray-300">Avg Speed</p>
        </div>
        <div className="text-center hover:scale-105 transition-transform duration-300">
          <IoCarSportOutline className="text-4xl text-blue-400 mb-1 mx-auto" />
          <h5 className="text-xl font-semibold">24</h5>
          <p className="text-sm text-gray-300">Total Rides</p>
        </div>
      </div>
    </div>
    </>
  )
}

export default CaptainDetails