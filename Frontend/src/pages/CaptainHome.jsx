import React, { useRef, useState, useContext, useEffect } from 'react'
// import { Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
// import RidePopup from '../components/RidePopUp'
// import { CaptainDataContext } from '../context/CaptainContext'
// import { useSocket } from '../context/SocketContext'
import axios from 'axios'
// import LiveTracking from '../components/LiveTracking'

import {
  FaUserCircle,
  FaWallet,
  FaClock,
  FaTachometerAlt,
  FaCarSide
} from 'react-icons/fa';
import { BsPersonBadgeFill } from 'react-icons/bs';
import { PiClockCountdownBold } from "react-icons/pi";
import { SiSpeedtest } from "react-icons/si";
import { IoCarSportOutline } from "react-icons/io5";
import RidePopup from '../components/RidePopup';
import RideConfirmPopup from '../components/ConfirmRidePopupPanel';
import ConfirmRidePopupPanel from '../components/ConfirmRidePopupPanel';


const CaptainHome = () => {
  const ridePopupPanelRef = useRef(null)
  const confirmRidePopupPanelRef = useRef(null)

  const [ridePopupPanel, setRidePopupPanel] = useState(true)
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false)
  const [ride, setRide] = useState(null)

  // const { captain } = useContext(CaptainDataContext)
  // const { sendMessage, onMessage } = useSocket()

  // useEffect(() => {
  //   if (captain) {
  //     sendMessage('join', { userId: captain._id, userType: 'captain' })
  //   }
  // }, [captain])

  // useEffect(() => {
  //   const updateLocation = () => {
  //     if (navigator.geolocation && captain) {
  //       navigator.geolocation.getCurrentPosition(position => {
  //         sendMessage('update-location-captain', {
  //           userId: captain._id,
  //           location: {
  //             ltd: position.coords.latitude,
  //             lng: position.coords.longitude
  //           }
  //         })
  //       })
  //     }
  //   }

  //   const locationInterval = setInterval(updateLocation, 10000)
  //   updateLocation()

  //   return () => clearInterval(locationInterval)
  // }, [captain])

  useGSAP(() => {
    if (ridePopupPanel) {
      gsap.to(ridePopupPanelRef.current, {
        transform: 'translateY(0%)'
      })
    } else {
      gsap.to(ridePopupPanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [ridePopupPanel])

  useGSAP(() => {
    if (confirmRidePopupPanel) {
      gsap.to(confirmRidePopupPanelRef.current, {
        transform: 'translateY(0%)'
      })
    } else {
      gsap.to(confirmRidePopupPanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [confirmRidePopupPanel])

  const confirmRide = async () => {
    const token = localStorage.getItem('token')
    
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`, {
      rideId: ride._id
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    setRidePopupPanel(false)
    setConfirmRidePopupPanel(true)
    setRide(response.data)
  }

  // Socket listeners
  // useEffect(() => {
  //   onMessage('new_ride', (data) => {
  //     setRide(data)
  //     setRidePopupPanel(true)
  //   })
  // }, [])

  return (
    <div className='h-screen'>
      <div className='fixed top-0 flex items-center justify-between w-screen'>
        <img className='w-16 absolute left-5 top-5' src="https://freelogopng.com/images/all_img/1659768779uber-logo-white.png" alt="" />
      <img className='w-full h-[100vh] object-cover' src="https://i.pinimg.com/1200x/fb/14/3b/fb143b1e6aba0cd635591f661702fca4.jpg" alt="" />

        {/* <Link to='/captain-home' className='h-10 w-10 bg-white flex items-center justify-center rounded-full'>
          <i className="text-lg font-medium ri-logout-box-r-line"></i>
        </Link> */}
      </div>
      
      {/* <div className='h-3/5'>
        <LiveTracking />
      </div> */}

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
            <h4 className="text-xl font-bold">Kartikey Gehra</h4>
            <p className="text-sm text-blue-100 flex items-center gap-1">
              <FaUserCircle className="text-yellow-300" /> Active Driver
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


      <div ref={ridePopupPanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-black/20 backdrop-blur-md rounded-3xl px-4 py-6'>
        <RidePopup
          // ride={ride}
          setRidePopupPanel={setRidePopupPanel}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          // confirmRide={confirmRide}
        />
      </div>
      <div ref={confirmRidePopupPanelRef} className='fixed w-full h-screen z-10 bottom-0 translate-y-full bg-white px-4 py-6'>
        <ConfirmRidePopupPanel
          // setConfirmRidePopupPanel={setConfirmRidePopupPanel}
        />
      </div>
    </div>
  )
}

export default CaptainHome