import React from 'react';
import { RiMapPinUserFill, RiMapPin2Fill, RiCurrencyLine } from "react-icons/ri";

const RidePopUp = (props) => {
    const user = props.ride?.user.fullname;
    return (
        <div className="rounded-3xl w-[100%] text-gray-900">

            {/* Title */}
            <h3 className="text-2xl font-bold  text-gray-100 mb-4">New Ride Available!</h3>

            {/* Rider Info */}
            <div className="flex items-center justify-between  px-2 rounded-xl mb-5">
                <div className="flex items-center gap-3">
                    <img
                        className="h-12 w-12 rounded-full object-cover border-2 border-white"
                        src="https://i.pinimg.com/236x/af/26/28/af26280b0ca305be47df0b799ed1b12b.jpg"
                        alt=""
                    />
                    <h2 className="text-xl font-semibold text-white">
                        {props.ride?.user.fullname.firstname} {props.ride?.user.fullname.lastname}
                    </h2>
                </div>
                <h5 className="text-lg font-bold text-white">📍 2.2 KM</h5>
            </div>

            {/* Ride Details */}
            <div className="bg-black/60 backdrop-blur-md text-gray-400 rounded-xl overflow-hidden shadow-sm divide-y divide-gray-200">
                <div className="flex items-start gap-4 p-4">
                    <RiMapPinUserFill className="text-blue-600 text-xl" />
                    <div>
                        <h4 className="text-sm font-bold">Pickup</h4>
                        <p className="text-base text-gray-200">{props.ride?.pickup}</p>
                    </div>
                </div>

                <div className="flex items-start gap-4 p-4">
                    <RiMapPin2Fill className="text-red-500 text-xl" />
                    <div>
                        <h4 className="text-sm font-bold">Drop-off</h4>
                        <p className="text-base text-gray-200">{props.ride?.destination}</p>
                    </div>
                </div>

                <div className="flex items-start gap-4 p-4">
                    <RiCurrencyLine className="text-green-500 text-xl" />
                    <div>
                        <h4 className="text-sm font-bold">Fare</h4>
                        <p className="text-base text-gray-200">₹{props.ride?.fare}</p>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between mt-6">
                <button
                    onClick={() => props.setRidePopupPanel(false)}
                    className=" hover:bg-white/20 text-gray-100 font-semibold py-2 px-6 rounded-md transition w-[50vw]"
                >
                    Ignore
                </button>
                <button
                    onClick={() => { 
                        props.setConfirmRidePopupPanel(true);
                        props.setRidePopupPanel(false);
                        props.confirmRide();
                    }}
                    className="bg-white/20 backdrop-blur-md text-white font-semibold py-2 px-6 rounded-md transition w-[50vw]"
                >
                    Accept
                </button>
            </div>
        </div>
    );
};

export default RidePopUp;
