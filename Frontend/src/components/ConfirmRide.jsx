import React, { useState } from 'react';
import {
  RiArrowDownWideLine,
  RiMapPinUserFill,
  RiMapPin2Fill,
  RiCurrencyLine,
} from 'react-icons/ri';
import { FaSpinner } from 'react-icons/fa';

const ConfirmRide = (props) => {
  const [loading, setLoading] = useState(false);

  const handleConfirm = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      props.setWaitingDriver(true);
      props.createRide();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-white px-4 py-6 overflow-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-extrabold text-transparent bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text">
          Confirm your Ride
        </h3>
        <button onClick={() => props.setConfirmRidePanel(false)}>
          <RiArrowDownWideLine className="text-3xl text-gray-400 hover:text-black transition-all" />
        </button>
      </div>

      {/* Car image */}
      <div className="flex justify-center mt-">
        <img
          className=" rounded-xl object-cover "
          src="https://cdn.dribbble.com/userupload/42120930/file/original-51c86458333cd6b7993b601ff3a261da.gif"
          alt="Car"
        />
      </div>


      {/* Info */}
      <div className='absolute bottom-0 left-0 w-full p-6'>
        <p className='font-bold text-lg'>📍 You're almost there!</p>
        <p className='pb-6 text-gray-600 font-semibold'>Confirm your ride now to let the driver know you're ready to go.</p>

        <div className="space-y-3">
          <div className="flex items-start gap-3 bg-gray-100 rounded-xl px-4 py-3 shadow-sm">
            <RiMapPinUserFill className="text-blue-600 text-xl mt-1" />
            <div>
              <h4 className="text-base font-semibold">562/11-A</h4>
              <p className="text-lg text-gray-700 -mt-1">{props.pickup}</p>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-gray-100 rounded-xl px-4 py-3 shadow-sm">
            <RiMapPin2Fill className="text-red-500 text-xl mt-1" />
            <div>
              <h4 className="text-base font-semibold">Plot 21, Sector 18</h4>
              <p className="text-lg text-gray-700 -mt-1">{props.destination}</p>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-gray-100 rounded-xl px-4 py-3 shadow-sm">
            <RiCurrencyLine className="text-green-600 text-xl mt-1" />
            <div>
              <h4 className="text-base font-semibold">₹.{props.fare[props.vehicleType]}</h4>
              <p className="text-lg text-gray-700 -mt-1">Cash Payment</p>
            </div>
          </div>
        </div>

        {/* Button */}
        <button
          onClick={handleConfirm}
          disabled={loading}
          className={`mt-6 w-full py-3 rounded-full font-bold text-white transition-all duration-300 flex justify-center items-center ${loading ? 'bg-green-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
            }`}
        >
          {loading && <FaSpinner className="animate-spin mr-2" />}
          {loading ? 'Processing...' : 'Confirm Ride'}
        </button>
      </div>
    </div>
  );
};

export default ConfirmRide;
