import React, { useRef, useState, useContext, useEffect } from 'react'
// import { Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { CaptainDataContext } from '../context/CaptainContext'
import { SocketContext } from '../context/SocketContext'
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
import CaptainDetails from '../components/CaptainDetails';


const CaptainHome = () => {
  const ridePopupPanelRef = useRef(null)
  const confirmRidePopupPanelRef = useRef(null)

  const [ridePopupPanel, setRidePopupPanel] = useState(false)
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false)
  const [ride, setRide] = useState(null)

  const { captain } = useContext(CaptainDataContext)
  const { socket } = useContext(SocketContext)

  useEffect(() => {
    if (captain) {
      socket.emit('join', { userId: captain._id, userType: 'captain' })
    }

    const updateLocation = () => {
      if (navigator.geolocation && captain) {
        navigator.geolocation.getCurrentPosition(position => {

          socket.emit('update-location-captain', {
            userId: captain._id,
            location: {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            }
          })
        })
      }
    }

    const locationInterval = setInterval(updateLocation, 10000)
    updateLocation()

    // return () => clearInterval(locationInterval)
  }, [])

  socket.on('new-ride', (data) => {
    console.log('New ride received:', data);
    setRide(data);
    setRidePopupPanel(true);
  })


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

    console.log("ride is confirmed");

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`, {
      rideId: ride._id,
      captain: captain._id
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
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

      </div>
      <div>
        <CaptainDetails />
      </div>

      <div ref={ridePopupPanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-black/20 backdrop-blur-md rounded-3xl px-4 py-6'>
        <RidePopup
          ride={ride}
          setRidePopupPanel={setRidePopupPanel}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          confirmRide={confirmRide}
        />
      </div>
      <div ref={confirmRidePopupPanelRef} className='fixed w-full h-screen z-10 bottom-0 translate-y-full bg-white px-4 py-6'>
        <ConfirmRidePopupPanel
          ride={ride}
       />
      </div>
    </div>
  )
}

export default CaptainHome