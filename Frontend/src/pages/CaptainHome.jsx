import React, { useRef, useState, useContext, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { CaptainDataContext } from '../context/CaptainContext'
import { SocketContext } from '../context/SocketContext'
import axios from 'axios'
import RidePopup from '../components/RidePopup';
import ConfirmRidePopupPanel from '../components/ConfirmRidePopupPanel';
import CaptainDetails from '../components/CaptainDetails';
import { useNavigate } from 'react-router-dom'
import CaptainProfile from '../components/CaptainProfile'

const CaptainHome = () => {
  const ridePopupPanelRef = useRef(null)
  const confirmRidePopupPanelRef = useRef(null)
  const captainDetailsPanelRef = useRef(null)
  const ProfilePanelRef = useRef(null)

  const [ridePopupPanel, setRidePopupPanel] = useState(false)
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false)
  const [ride, setRide] = useState(null)
  const [captainDetailsPanel, setCaptainDetailsPanel] = useState(true)
  const [ProfilePanel, setProfilePanel] = useState(false)

  const { captain } = useContext(CaptainDataContext)
  const { socket } = useContext(SocketContext)

  const navigate = useNavigate()

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

  }, [])

  socket.on('new-ride', (data) => {
    console.log('New ride received:', data);
    setRide(data);
    setRidePopupPanel(true);
  })

  const showProfilePanel = () => {
    setCaptainDetailsPanel(false);
    setProfilePanel(true);
  }

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

  useGSAP(() => {
    if (captainDetailsPanel) {
      gsap.to(captainDetailsPanelRef.current, {
        transform: 'translateX(0%)',

      })
    } else {
      gsap.to(captainDetailsPanelRef.current, {
        transform: 'translateX(-100%)',

      })
    }
  }, [captainDetailsPanel])

  useGSAP(() => {
    if (ProfilePanel) {
      gsap.to(ProfilePanelRef.current, {
        transform: 'translateX(0%)',
        opacity: 1
      })
    } else {
      gsap.to(ProfilePanelRef.current, {
        transform: 'translateX(100%)',
        opacity: 0
      })
    }
  }, [ProfilePanel])

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

  return (
    <div className='h-screen'>
      <div className='fixed top-0 flex items-center justify-between w-screen'>
        <img className='w-16 absolute left-5 top-5' src="https://freelogopng.com/images/all_img/1659768779uber-logo-white.png" alt="" />
        <div onClick={showProfilePanel} className='absolute right-5 top-5'>
          <img className='w-10 rounded-full border-2 border-green-400' src="kartik_1.jpg" alt="" />
        </div>
        <img className='w-full h-[100vh] object-cover' src="https://i.pinimg.com/1200x/fb/14/3b/fb143b1e6aba0cd635591f661702fca4.jpg" alt="" />

      </div>

      <div ref={ProfilePanelRef} className='fixed w-full h-screen translate-x-full opacity-0 bg-black/50 backdrop-blur-lg text-white shadow-2xl z-20 px-4 flex items-center justify-center'>
        <CaptainProfile
          setProfilePanel={setProfilePanel}
          setCaptainDetailsPanel={setCaptainDetailsPanel}
        />
      </div>

      <div ref={captainDetailsPanelRef} className='h-72 py-6 px-4 fixed bottom-0 w-full bg-black/20 backdrop-blur-md text-white shadow-2xl rounded-t-3xl z-10 font-[Inter]'>
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