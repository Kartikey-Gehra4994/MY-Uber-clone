import React, { useEffect, useRef, useState, useContext } from 'react'
import axios from 'axios';
import { FaDotCircle, FaSquare } from 'react-icons/fa';
import { RiArrowDownWideFill } from "react-icons/ri";
import { GiSteeringWheel } from "react-icons/gi";
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { FaMapLocationDot } from "react-icons/fa6";
import LocationSearchPanel from '../components/LocationSearchPannel';
import VehiclePanel from '../components/VehiclePanel';
import ConfirmRide from '../components/ConfirmRide';
import LookingforDriverPage from '../components/LookingforDriverPage';
import WaitingForDriver from '../components/WaitingForDriver';
import Riding from './Riding';
import { SocketContext } from '../context/SocketContext';
import { UserDataContext } from '../context/UserContext';
import { Socket } from 'socket.io-client';

const Home = () => {

  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [activeField, setActiveField] = useState(null);
  const [debounceTimer, setDebounceTimer] = useState(null);

  const [panelOpen, setPanelOpen] = useState(false);
  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false);
  const [confirmRidePanelOpen, setConfirmRidePanelOpen] = useState(false);
  const [waitingDriver, setWaitingDriver] = useState(false);
  const [driverDetails, setDriverDetails] = useState(false);
  const [riding, setRiding] = useState(false);

  const [fare, setfare] = useState({})
  const [vehicleType, setVehicleType] = useState(null)

  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const waitingDriverRef = useRef(null);
  const driverDetailsRef = useRef(null);
  const ridingRef = useRef(null);

  const { socket } = useContext(SocketContext);

  const { user } = useContext(UserDataContext);

 useEffect(() => {
  console.log("🎯 Home - User data:", user);
  socket.emit("join", { userId: user?._id, userType: 'user' });
 }, [user]);


  // Cleanup debounce timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
    };
  }, [debounceTimer]);

  const submitHandler = (e) => {
    e.preventDefault();
  }

  // Function to fetch suggestions from backend with debounce
  const fetchSuggestions = async (input) => {
    if (input.length > 2) {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL || 'http://localhost:4000'}/maps/get-suggestions?input=${encodeURIComponent(input)}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          }
        );
        setSuggestions(response.data || []);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
    }
  };

  // Debounced version of fetchSuggestions
  const debouncedFetchSuggestions = (input) => {
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    const timer = setTimeout(() => {
      fetchSuggestions(input);
    }, 300); // 300ms delay

    setDebounceTimer(timer);
  };

  // Handle pickup input change
  const handlePickupChange = (e) => {
    const value = e.target.value;
    setPickup(value);
    setActiveField('pickup');
    debouncedFetchSuggestions(value);
  };

  // Handle destination input change
  const handleDestinationChange = (e) => {
    const value = e.target.value;
    setDestination(value);
    setActiveField('destination');
    debouncedFetchSuggestions(value);
  };

  async function findtrip() {
    setPanelOpen(false);
    setVehiclePanelOpen(true);

    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
      params: { pickup, destination },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    setfare(response.data);
  }

  async function createRide() {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`, {
      pickup,
      destination,
      vehicleType
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    console.log("Ride created:", response.data);

  }

  useGSAP(function () {
    if (panelOpen) {
      gsap.to(panelRef.current, { height: "565px", opacity: 1 });
      gsap.to(panelCloseRef.current, { opacity: 1 });
    } else {
      gsap.to(panelRef.current, { height: "0px", opacity: 0 });
      gsap.to(panelCloseRef.current, { opacity: 0 });
    }
  }, [panelOpen]);

  useGSAP(function () {
    if (vehiclePanelOpen) {
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(0)'
      });
    } else {
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(100%)'
      });
    }
  }, [vehiclePanelOpen]);

  useGSAP(function () {
    if (confirmRidePanelOpen) {
      gsap.to(confirmRidePanelRef.current, {
        transform: 'translateY(0)',
        opacity: 1
      });
    } else {
      gsap.to(confirmRidePanelRef.current, {
        transform: 'translateY(100%)',
        opacity: 0
      });
    }
  }, [confirmRidePanelOpen]);

  useGSAP(function () {
    if (waitingDriver) {
      gsap.to(waitingDriverRef.current, {
        transform: 'translateY(0)'
      });
    } else {
      gsap.to(waitingDriverRef.current, {
        transform: 'translateY(100%)'
      });
    }
  }, [waitingDriver]);

  useGSAP(function () {
    if (driverDetails) {
      gsap.to(driverDetailsRef.current, {
        transform: 'translateY(0)'
      });
    } else {
      gsap.to(driverDetailsRef.current, {
        transform: 'translateY(100%)'
      });
    }
  }, [driverDetails]);

  useGSAP(function () {
    if (riding) {
      gsap.to(ridingRef.current, {
        transform: 'translateY(0)'
      });
    } else {
      gsap.to(ridingRef.current, {
        transform: 'translateY(100%)'
      });
    }
  }, [riding]);

  return (
    <div className='h-screen relative overflow-hidden'>
      <img className='w-16 absolute left-5 top-5' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
      <img className='w-full h-[80vh] object-cover' src="https://i.pinimg.com/736x/fe/92/0d/fe920d9bafa13170e5bcca919ec10efd.jpg" alt="" />

      <div className="w-full px-6 pt-8 pb-3 bg-white shadow-lg z-20 absolute bottom-0 left-0 right-0 max-w-md mx-auto">
        <div className=''>
          {/* Title */}
          <div className="flex items-center justify-between mb-4">

            <div className='flex items-center gap-2'>
              <FaMapLocationDot className="text-xl text-gray-700" />
              <h2 className="text-lg font-bold text-gray-900">Find a Trip</h2>
            </div>
            <div
              ref={panelCloseRef}
              onClick={() => setPanelOpen(false)} >
              <RiArrowDownWideFill className="text-2xl text-gray-500" />
            </div>

          </div>
          <div className="relative">
            <div className="absolute left-[10px] top-6 bottom-6 w-0.5 bg-gray-300 z-0"></div>

            <form onSubmit={(e) => {
              submitHandler(e);
            }} className="flex flex-col gap-4">
              <div className="relative mb-3 pl-6">
                <FaDotCircle className="absolute left-0 top-1/2 -translate-y-1/2 text-sm text-black z-10" />
                <input
                  onClick={() => {
                    setPanelOpen(true);
                    setActiveField('pickup');
                  }}
                  value={pickup}
                  onChange={handlePickupChange}
                  type="text"
                  placeholder="Add a pick-up location"
                  className="bg-gray-100 placeholder-gray-500 px-4 py-2 rounded-md w-full outline-none"
                />
              </div>

              {/* Destination input */}
              <div className="relative pl-6">
                <FaSquare className="absolute left-0 top-1/2 -translate-y-1/2 text-xs text-black z-10" />
                <input
                  onClick={() => {
                    setPanelOpen(true);
                    setActiveField('destination');
                  }}
                  value={destination}
                  onChange={handleDestinationChange}
                  type="text"
                  placeholder="Enter your destination"
                  className="bg-gray-100 placeholder-gray-500 px-4 py-2 rounded-md w-full outline-none"
                />
              </div>
            </form>
          </div>

          {/* Request Ride Button */}
          <button
            onClick={() => findtrip()}
            className="bg-black text-white w-full py-3 mt-6 rounded-full flex items-center justify-center gap-2 font-semibold text-sm">
            <GiSteeringWheel className="text-white text-lg" />
            Request Ride
          </button>
        </div>
        <div ref={panelRef} className='h-0 mt-6'>
          <LocationSearchPanel
            suggestions={suggestions}
            setPanelOpen={setPanelOpen}
            setVehiclePanelOpen={setVehiclePanelOpen}
            setPickup={setPickup}
            setDestination={setDestination}
            activeField={activeField}
          />
        </div>
      </div>
      <div ref={vehiclePanelRef} className='fixed z-20 bottom-0 bg-white w-full px-6 translate-y-full rounded-2xl '>
        <VehiclePanel
          selectVehicleType={setVehicleType}
          fare={fare}
          setConfirmRidePanel={setConfirmRidePanelOpen}
          setVehiclePanelOpen={setVehiclePanelOpen}
        />
      </div>
      <div ref={confirmRidePanelRef} className='fixed z-20 bottom-0 bg-white w-full h-screen opacity-0 px-6 translate-y-full rounded-2xl '>
        <ConfirmRide
          vehicleType={vehicleType}
          fare={fare}
          pickup={pickup}
          destination={destination}
          createRide={createRide}
          setConfirmRidePanel={setConfirmRidePanelOpen}
          setWaitingDriver={setWaitingDriver}
        />
      </div>
      <div ref={waitingDriverRef} className='fixed z-20 bottom-0 bg-white w-full h-screen px-6 translate-y-full '>
        <LookingforDriverPage
          pickup={pickup}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
        />
      </div>
      <div ref={driverDetailsRef} className='fixed z-20 bottom-0 bg-white w-full h-screen px-6 translate-y-full '>
        <WaitingForDriver />
      </div>
      <div ref={ridingRef} className='fixed z-20 bottom-0 bg-white w-full h-screen translate-y-full'>
        <Riding />
      </div>
    </div>
  )
}

export default Home