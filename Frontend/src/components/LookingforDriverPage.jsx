import React, { useState } from 'react';
import {
  RiArrowDownWideLine,
  RiMapPinUserFill,
  RiMapPin2Fill,
  RiCurrencyLine,
} from 'react-icons/ri';
import { FaSpinner } from 'react-icons/fa';

const LookingforDriverPage = (props) => {
  const [loading, setLoading] = useState(false);

  const handleConfirm = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setConfirmRidePanel(false);
      // props.setVehicleFound(true);
      // props.createRide();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-gray-50 px-4 py-6 overflow-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-extrabold text-transparent bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text">
          Waiting for a Driver
        </h3>
      </div>

      {/* Car image */}
      <div className="flex justify-center py-32">
        <img
          className=" rounded-full object-cover "
          src="https://cdn.dribbble.com/userupload/29829703/file/original-5c2bd522e77d2abb93967f2741ab9b1d.gif"
          alt="please wait"
        />
      </div>

      {/* Info */}
      <div className="space-y-3">
        <div className="flex items-start gap-3 bg-gray-100 rounded-xl px-4 py-3 shadow-sm">
          <RiMapPinUserFill className="text-blue-600 text-xl mt-1" />
          <div>
            <h4 className="text-base font-semibold">562/11-A</h4>
            <p className="text-xs text-gray-500 -mt-1">Kankariya Talab, Ahmedabad</p>
          </div>
        </div>

        <div className="flex items-start gap-3 bg-gray-100 rounded-xl px-4 py-3 shadow-sm">
          <RiMapPin2Fill className="text-red-500 text-xl mt-1" />
          <div>
            <h4 className="text-base font-semibold">Plot 21, Sector 18</h4>
            <p className="text-xs text-gray-500 -mt-1">Noida, Uttar Pradesh</p>
          </div>
        </div>

        <div className="flex items-start gap-3 bg-gray-100 rounded-xl px-4 py-3 shadow-sm">
          <RiCurrencyLine className="text-green-600 text-xl mt-1" />
          <div>
            <h4 className="text-base font-semibold">₹193.20</h4>
            <p className="text-xs text-gray-500 -mt-1">Cash Payment</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LookingforDriverPage;
