import React from 'react';
import {
    RiMapPinUserFill,
    RiMapPin2Fill,
    RiCurrencyLine,
    RiSendPlaneFill,
    RiShieldCheckLine,
    RiArrowDownWideFill
} from 'react-icons/ri';
import { FaPhoneAlt, FaSlideshare } from 'react-icons/fa';

const WaitingForDriver = (props) => {
    return (
        <div className=' w-full h-[80vh] rounded-2xl '>

            <div className="flex justify-between items-center pt-4 pb-6">
                <h3 className="text-xl font-extrabold  text-transparent bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text">
                    Driver Details
                </h3>
                <div>
                    <RiArrowDownWideFill className="text-2xl text-gray-500" />
                </div>
            </div>

            {/* Driver Info */}
            <div className="flex items-center justify-between gap-4 mt-10 mb-10">

                <div className='flex '>
                    <img className="h-14 rounded-full mt-[10px] z-10" src="kartik_1.jpg" alt="Driver" />
                    <img
                        className="h-16 w-24 object-cover ml-[-20px] mt-[40px] "
                        src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg"
                        alt="Driver"
                    />
                </div>
                <div className="text-right">
                    <h2 className="text-xl font-semibold">{props.ride?.captain.fullname.firstname} {props.ride?.captain.fullname.lastname}</h2>
                    <p className="text-base text-gray-500">White Suzuki Alto</p>
                    <p className="text-2xl font-bold text-gray-700">{props.ride?.captain.vehicle.plate}</p>
                    <p className="text-base text-green-600 font-bold">OTP: {props.ride?.otp}</p>
                </div>
            </div>

            {/* Message Box */}
            <div className="flex items-center bg-gray-100 rounded-full px-3 py-2 mb-5">
                <input
                    type="text"
                    placeholder="Send a message..."
                    className="bg-transparent w-full outline-none text-lg"
                />
                <RiSendPlaneFill className="text-gray-500 text-lg" />
            </div>

            {/* Ride Details */}
            <div className="space-y-8 py-5">
                <div className="flex gap-3 items-start">
                    <RiMapPinUserFill className="text-xl text-blue-600 mt-1" />
                    <div>
                        <p className="text-base text-gray-400">Pickup</p>
                        <h4 className="text-lg font-medium">{props.ride?.pickup}</h4>

                    </div>
                </div>

                <div className="flex gap-3 items-start">
                    <RiMapPin2Fill className="text-xl text-red-600 mt-1" />
                    <div>
                        <p className="text-base text-gray-400">Destination</p>
                        <h4 className="text-lg font-medium">{props.ride?.destination}</h4>

                    </div>
                </div>

                <div className="flex gap-3 items-start">
                    <RiCurrencyLine className="text-xl text-green-600 mt-1" />
                    <div>
                        <p className="text-base text-gray-400">Fare</p>
                        <h4 className="text-lg font-medium">₹.{props.ride?.fare}</h4>
                        <p className="text-sm text-gray-500">Cash Cash</p>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-around mt-6">
                <div className='w-25 flex flex-col items-center'>
                    <button className="bg-gray-200 p-4 rounded-full hover:bg-gray-200">
                        <RiShieldCheckLine className="text-3xl text-blue-600" />
                    </button>
                    <p className="text-lg text-center text-gray-800 font-semibold">Safety</p>
                </div>
                <div className='w-25 flex flex-col items-center'>
                    <button className="bg-gray-200 p-4 rounded-full hover:bg-gray-200">
                        <FaSlideshare className="text-3xl text-blue-600" />
                    </button>
                    <p className="text-lg text-center text-gray-800 font-semibold">Share my trip</p>
                </div>
                <div className='w-25 flex flex-col items-center'>
                    <button className="bg-gray-200 p-4 rounded-full hover:bg-gray-200">
                        <FaPhoneAlt className="text-3xl text-blue-600" />
                    </button>
                    <p className="text-lg text-center text-gray-800 font-semibold">Call driver</p>
                </div>
            </div>
        </div>
    );
};

export default WaitingForDriver;
