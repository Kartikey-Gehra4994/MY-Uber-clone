import React, { useState, useRef } from 'react'
import { FaSpinner } from 'react-icons/fa';
import { RiMapPinUserFill, RiArrowDownWideFill, RiCurrencyLine } from 'react-icons/ri'
import { useGSAP } from '@gsap/react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { useNavigate } from 'react-router-dom';
import { useEffect, useContext } from 'react';
import { SocketContext } from '../context/SocketContext';
import LiveTracking from '../components/LiveTracking';

import { toast } from 'react-toastify';

const Riding = () => {

    const [loading, setLoading] = useState(false);
    const [paymentpanel, setPaymentPanel] = useState(false);
    const location = useLocation();
    const { ride } = location.state || {};
    const navigate = useNavigate();
    const { socket } = useContext(SocketContext);

    const paymentRef = useRef(null)

    useEffect(() => {
        if (!socket) return; // Prevent crash if socket is null

        const handleRideEnded = () => {
            console.log('Ride ended, navigating to home');
            navigate('/home');
        };

        socket.on('ride-ended', handleRideEnded);

        return () => {
            socket.off('ride-ended', handleRideEnded);
        };
    }, [socket, navigate]);


    const handleConfirm = async () => {
        setLoading(true);

        try {
            const res = await fetch(`${import.meta.env.VITE_BASE_URL}/payment/create-order`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount: ride.fare, rideId: ride._id }),
            });

            const order = await res.json();

            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Use your Razorpay Key ID
                amount: order.amount,
                currency: order.currency,
                name: "Uber Clone",
                description: "Ride Payment",
                order_id: order.id,
                handler: async function (response) {
                    const verifyRes = await fetch(`${import.meta.env.VITE_BASE_URL}/payment/verify`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ ...response, rideId: ride._id }),
                    });

                    const data = await verifyRes.json();
                    if (data.success) {
                        // ✅ Show toast on success
                        toast.success("🎉 Payment successful!");
                        navigate("/home");
                    } else {
                        toast.error("❌ Payment verification failed");
                    }

                },
                prefill: {
                    name: "Kartik Gehra",
                    email: "kartik@example.com",
                    contact: "9999999999",
                },
                theme: { color: "#6366F1" },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (err) {
            toast.error("💥 Payment Error");
        }

        setLoading(false);
    };

    useGSAP(() => {
        if (paymentpanel) {
            gsap.to(paymentRef.current, {
                transform: 'translateY(0)'
            });
        } else {
            gsap.to(paymentRef.current, {
                transform: 'translateY(55%)'
            });
        }
    }, [paymentpanel]);

    return (<>
        <div className='relative'>
            <div className=' h-[100vh]  '>
                <LiveTracking />
            </div>
            <div ref={paymentRef} className='bg-white/10 backdrop-blur-md w-full px-6 absolute bottom-0 translate-y-[55%] z-[1000] rounded-2xl '>

                <div
                    onClick={() => setPaymentPanel(!paymentpanel)}
                    className='flex justify-center py-4 z-20 text-3xl text-gray-400'>
                    <RiArrowDownWideFill />
                </div>

                {/* Driver Info */}
                <div className="flex items-center justify-between gap-4 ">

                    <div className='flex '>
                        <img className="h-16 rounded-full mt-[10px] z-10" src="kartik_1.jpg" alt="Driver" />
                        <img
                            className="h-16 w-24 object-cover ml-[-20px] mt-[40px] "
                            src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398971/assets/29/fbb8b0-75b1-4e2a-8533-3a364e7042fa/original/UberSelect-White.png"
                            alt="Driver"
                        />
                    </div>
                    <div className="text-right">
                        <h2 className="text-lg font-medium">
                            {ride?.captain?.fullname?.firstname || 'Driver'} {ride?.captain?.fullname?.lastname || 'Name'}
                        </h2>
                        <p className="text-xl font-bold text-gray-700">
                            {ride?.captain?.vehicle?.plate || 'Loading...'}
                        </p>
                        <p className="text-base text-gray-700">
                            White Hyundai Verna
                        </p>
                    </div>
                </div>

                <div className="space-y-2 py-5">
                    <div className='bg-black/20 backdrop-blur-md space-y-4 pl-4 py-2 rounded-xl'>

                        <div className="flex gap-3 items-start">
                            <RiMapPinUserFill className="text-xl text-blue-600 mt-1" />
                            <div>
                                <p className="text-base text-gray-600">Current Location</p>
                                <h4 className="text-lg font-medium">{ride?.destination || 'Loading destination...'}</h4>
                            </div>
                        </div>

                    </div>

                    <div className="flex items-start gap-3 rounded-xl px-4 py-3">
                        <RiCurrencyLine className="text-green-600 text-xl mt-1" />
                        <div>
                            <p className="text-base text-gray-500 -mt-1">Cash Payment</p>
                            <h4 className="text-lg font-semibold text-green-600">₹.{ride?.fare || '0.00'}</h4>
                        </div>
                    </div>

                    <button
                        onClick={handleConfirm}
                        disabled={loading}
                        className={`w-full py-3 px-6 rounded-full border border-white/20 backdrop-blur-md shadow-lg relative text-white font-bold transition-all duration-300 flex justify-center items-center overflow-hidden ${loading ? 'bg-white/10 cursor-not-allowed' : 'bg-white/10 hover:bg-white/20'} `}
                    >
                        {/* Gradient Glow Background */}
                        <span className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 opacity-80 blur-lg"></span>

                        {/* Button Text and Spinner */}
                        <span className="relative z-10 flex items-center">
                            {loading && <FaSpinner className="animate-spin mr-2" />}
                            {loading ? 'Processing...' : 'Make Payment'}
                        </span>
                    </button>
                </div>
            </div>
        </div>
    </>)
}

export default Riding