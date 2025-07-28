import React, { useRef, useState } from 'react';
import { FaCommentDots, FaPhoneAlt, FaTrashAlt } from 'react-icons/fa';
import { RiMapPinUserFill, RiMapPin2Fill, RiCurrencyLine } from "react-icons/ri";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ConfirmRidePopupPanel = (props) => {

  const inputs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (value.length === 1 && index < inputs.length - 1) {
      inputs[index + 1].current.focus();
    }

    // Update OTP state
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  const handleBackspace = (e, index) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      inputs[index - 1].current.focus();
    }
  };

  const submitHandler = async () => {
    const otpValue = otp.join('');

    if (otpValue.length !== 6) {
      alert('Please enter a valid 6-digit OTP');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/start-ride`,
        {
          rideId: props.ride?._id,
          otp: otpValue
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      if (response.status === 200) {

        navigate('/Captain-riding', { state: { ride: props.ride } });

        if (props.onRideStarted) {
          props.onRideStarted(response.data);
        }
      }
    } catch (error) {
      console.error('Error starting ride:', error);
      if (error.response?.data?.error) {
        alert(error.response.data.error);
      } else {
        alert('Failed to start ride. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-3xl w-[100%] text-gray-900">

      {/* Title */}
      <h3 className="text-2xl font-bold  text-gray-800 mb-4">Ride Details</h3>

      {/* Rider Info */}
      <div className="flex items-center justify-between  px-2 rounded-xl mb-5">
        <div className="flex items-center gap-3">
          <img
            className="h-12 w-12 rounded-full object-cover border-2 border-white"
            src="https://pyxis.nymag.com/v1/imgs/709/49e/f9dc751d511c907f02808dad68cfea1341-13-billie-eilish.rsquare.w400.jpg"
            alt=""
          />
          <h2 className="text-xl font-semibold text-black">
            {props.ride?.user.fullname.firstname} {props.ride?.user.fullname.lastname}
          </h2>
        </div>
        <h5 className="text-lg font-bold text-black">📍 2.2 KM</h5>
      </div>

      {/* Ride Details */}
      <div className=" bg-gray-200 text-gray-800 rounded-xl overflow-hidden shadow-xl divide-y divide-gray-200">
        <div className="flex items-start gap-4 p-4">
          <RiMapPinUserFill className="text-blue-600 text-xl" />
          <div>
            <h4 className="text-sm font-bold">Pickup</h4>
            <p className="text-base text-gray-700">{props.ride?.pickup}</p>
          </div>
        </div>

        <div className="flex items-start gap-4 p-4">
          <RiMapPin2Fill className="text-red-500 text-xl" />
          <div>
            <h4 className="text-sm font-bold">Drop-off</h4>
            <p className="text-base text-gray-700">{props.ride?.destination}</p>
          </div>
        </div>

      </div>

      <div className=" rounded-xl py-8 px-4 w-full max-w-sm mx-auto">
        {/* Fare Summary */}
        <div className="mb-5 mt-4">
          <h4 className="text-xs font-semibold text-gray-500 mb-2">TRIP FARE</h4>
          <div className="flex justify-between text-base font-medium mb-1">
            <span>Apple Pay</span>
            <span>₹.15.00</span>
          </div>
          <div className="flex justify-between text-base font-medium mb-1">
            <span>Discount</span>
            <span>₹.10.00</span>
          </div>
          <div className="flex justify-between text-base font-bold">
            <span>Paid amount</span>
            <span>₹.{props.ride?.fare}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center gap-2 mt-14">
          {/* Call Button */}
          <button className="flex-1 flex flex-col items-center justify-center bg-green-100 hover:bg-green-200 text-green-700 font-medium py-2 rounded-lg transition">
            <FaPhoneAlt className="text-xl mb-1" />
            <span className="text-sm">Call</span>
          </button>

          {/* Message Button */}
          <button className="flex-1 flex flex-col items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition">
            <FaCommentDots className="text-xl mb-1" />
            <span className="text-sm">Message</span>
          </button>

          {/* Cancel Button */}
          <button className="flex-1 flex flex-col items-center justify-center bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 rounded-lg transition">
            <FaTrashAlt className="text-xl mb-1" />
            <span className="text-sm">Cancel</span>
          </button>
        </div>
      </div>

      <div className="w-full max-w-sm mx-auto p-4 bg-white rounded-xl shadow-md">
        <h2 className="text-center text-lg font-semibold mb-4">Enter OTP</h2>
        <div className="flex justify-between gap-2">
          {inputs.map((ref, index) => (
            <input
              key={index}
              ref={ref}
              type="text"
              maxLength={1}
              value={otp[index]}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleBackspace(e, index)}
              className="w-10 h-12 text-center text-xl text-green-600 font-bold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ))}
        </div>
        <p className="text-center text-sm text-gray-500 mt-3">
          We’ve sent a 6-digit code to user
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex text-center mt-6">
        <button
          onClick={submitHandler}
          disabled={isSubmitting}
          className="bg-black/20 backdrop-blur-md text-black font-semibold py-2 px-6 rounded-md transition w-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Starting Ride...' : 'Go to Pickup'}
        </button>
      </div>
    </div>
  );
};

export default ConfirmRidePopupPanel;
