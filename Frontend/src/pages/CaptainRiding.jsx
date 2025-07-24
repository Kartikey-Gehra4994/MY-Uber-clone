import React, { useState, useRef } from 'react'
import { FaCommentDots, FaPhoneAlt, FaSpinner, FaTrashAlt } from 'react-icons/fa';
import { RiMapPinUserFill, RiMapPin2Fill, RiArrowDownWideFill, RiCurrencyLine } from 'react-icons/ri'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LiveTracking from '../components/LiveTracking';

const CaptainRiding = () => {
    const [paymentpanel, setPaymentPanel] = useState(false);
    const location = useLocation();
    const rideData = location.state?.ride;
    const navigate = useNavigate();

    const paymentRef = useRef(null)

    async function endRide() {

        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/end-ride`, {

                rideId: rideData?._id
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.status === 200) {
                setPaymentPanel(false);
                navigate('/captain-home');
            }
        } catch (error) {
            console.error('Error ending ride:', error);
            alert('Failed to end ride. Please try again.');
        }

    }

    useGSAP(() => {
        if (paymentpanel) {
            gsap.to(paymentRef.current, {
                transform: 'translateY(0)'
            });
        } else {
            gsap.to(paymentRef.current, {
                transform: 'translateY(75%)'
            });
        }
    }, [paymentpanel]);

    return (<>
        <div className='relative'>
            <div className=' h-[100vh]  '>
                <LiveTracking />
            </div>
            <div ref={paymentRef} className='bg-white/10 backdrop-blur-md w-full h-screen px-6 absolute bottom-0 translate-y-full rounded-2xl z-[1000] flex flex-col justify-center items-center'>

                <div
                    onClick={() => setPaymentPanel(!paymentpanel)}
                    className='flex justify-center pb-8 z-20 text-3xl text-gray-400 w-full'>
                    <RiArrowDownWideFill />
                </div>

                <div className="rounded-3xl w-[100%] text-gray-900">

                    {/* Title */}
                    <h3 className="text-2xl font-bold  text-gray-800 mb-4">Complete Your Ride</h3>

                    {/* Rider Info */}
                    <div className="flex items-center justify-between  px-2 rounded-xl mb-5">
                        <div className="flex items-center gap-3">
                            <img
                                className="h-12 w-12 rounded-full object-cover border-2 border-white"
                                src="https://i.pinimg.com/236x/af/26/28/af26280b0ca305be47df0b799ed1b12b.jpg"
                                alt=""
                            />
                            <h2 className="text-xl font-semibold text-black">
                                {rideData?.user.fullname.firstname} {rideData?.user.fullname.lastname}
                            </h2>
                        </div>
                        <h5 className="text-lg font-bold text-black">📍 4.2 KM Away</h5>
                    </div>

                    {/* Ride Details */}
                    <div className=" bg-gray-200 text-gray-800 rounded-xl overflow-hidden shadow-xl divide-y divide-gray-200">
                        <div className="flex items-start gap-4 p-4">
                            <RiMapPinUserFill className="text-blue-600 text-xl" />
                            <div>
                                <h4 className="text-sm font-bold">Pickup</h4>
                                <p className="text-base text-gray-700">{rideData?.pickup}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 p-4">
                            <RiMapPin2Fill className="text-red-500 text-xl" />
                            <div>
                                <h4 className="text-sm font-bold">Drop-off</h4>
                                <p className="text-base text-gray-700">{rideData?.destination}</p>
                            </div>
                        </div>

                    </div>

                    <div className='px-4 pt-3'>
                        <span className='text-sm font-bold'>Noted</span>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse accusantium doloremque!</p>
                    </div>

                    <div className=" rounded-xl py-8 px-4 w-full max-w-sm mx-auto">
                        {/* Fare Summary */}
                        <div className="mb-5">
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
                                <span>₹.{rideData?.fare}</span>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-between items-center gap-2">
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

                    {/* Action Buttons */}
                    <div className="flex text-center mb-6">
                        <button onClick={endRide} className="bg-black/20 backdrop-blur-md text-black font-semibold py-2 px-6 rounded-md transition w-full"
                        >
                            Finish Ride
                        </button>
                    </div>
                </div>

            </div>
        </div>
    </>)
}

export default CaptainRiding