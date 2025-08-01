import React, { useState } from 'react';
import {
  RiMapPinUserFill,
  RiMapPin2Fill,
  RiCurrencyLine,
} from 'react-icons/ri';

const LookingforDriverPage = (props) => {
  const [loading, setLoading] = useState(false);

  return (
    <div className="fixed inset-0 z-50 bg-gray-50 px-4 py-6 overflow-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-extrabold text-transparent bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text">
          Waiting for a Driver
        </h3>
      </div>

      {/* Car image */}
      <div className="flex justify-center py-16">
        <img
          className=" rounded-full object-cover "
          src="https://cdn.dribbble.com/userupload/29829703/file/original-5c2bd522e77d2abb93967f2741ab9b1d.gif"
          alt="please wait"
        />
      </div>

      {/* Info */}
      <div className='absolute bottom-0 left-0 w-full px-6 py-10 '>
        <p className='font-bold text-lg'>⏳ Waiting for your driver...</p>
        <p className='pb-6 text-center text-gray-600 font-semibold'>Hang tight! Your ride will arrive shortly.</p>

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
      </div>
    </div>
  );
};

export default LookingforDriverPage;
