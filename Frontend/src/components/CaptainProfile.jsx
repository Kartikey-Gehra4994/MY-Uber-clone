import React from "react";
import { FaUserCircle, FaHome, FaInfoCircle, FaStar, FaMapMarkerAlt, FaUserShield } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { GiSteeringWheel } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CaptainProfile = (props) => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/logout`, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.status === 200) {
                localStorage.removeItem('token');
                navigate('/captain-login');
            }
        } catch (error) {
            console.error('Logout error:', error);
            localStorage.removeItem('token');
            navigate('/captain-login');
        }
    };

    const goToHome = () => {
        props.setProfilePanel(false);
        props.setCaptainDetailsPanel(true);
    };

    const user = {
        name: "Captain Kartikey",
        email: "kartikey@example.com",
        role: "Professional Driver",
        phone: "+91 9876543210",
        rides: "1,248",
        rating: "4.9/5",
        city: "Meerut",
        license: "Verified"
    };

    return (
        <div className="bg-black/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-xl p-8 max-w-md w-full text-white">
            <div className="flex flex-col lg:flex-row items-center gap-8">
                {/* Profile Picture */}
                <img
                    src="kartik_1.jpg"
                    alt="Captain"
                    className="w-32 h-32 lg:w-40 lg:h-40 rounded-full object-cover border-4 border-green-400 shadow-lg"
                />

                {/* User Info */}
                <div className="text-center lg:text-left space-y-1">
                    <h2 className="text-3xl font-bold text-white">{user.name}</h2>
                    <p className="text-sm text-gray-300">{user.email}</p>
                    <p><span className="font-semibold">Role:</span> {user.role}</p>
                    <p><span className="font-semibold">Phone:</span> {user.phone}</p>
                </div>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-2 gap-4 mt-6 text-sm">
                <div className="flex items-center gap-2 bg-blue-100/10 p-4 rounded-xl">
                    <GiSteeringWheel className="text-blue-400 text-lg" />
                    <span><strong>Rides:</strong> {user.rides}</span>
                </div>
                <div className="flex items-center gap-2 bg-green-100/10 p-4 rounded-xl">
                    <FaStar className="text-green-400 text-lg" />
                    <span><strong>Rating:</strong> {user.rating}</span>
                </div>
                <div className="flex items-center gap-2 bg-purple-100/10 p-4 rounded-xl">
                    <FaMapMarkerAlt className="text-purple-400 text-lg" />
                    <span><strong>City:</strong> {user.city}</span>
                </div>
                <div className="flex items-center gap-2 bg-yellow-100/10 p-4 rounded-xl">
                    <FaUserShield className="text-yellow-400 text-lg" />
                    <span><strong>License:</strong> {user.license}</span>
                </div>
            </div>

            {/* Bottom Message */}
            <div className="mt-6 text-center text-sm italic text-white/80">
                "Your safety is my responsibility. Let's ride together!"
            </div>

            {/* Buttons */}
            <div className="mt-8 flex flex-col gap-3">
                <button
                    onClick={goToHome}
                    className="bg-white/20 hover:bg-white/30 text-white font-semibold px-6 py-3 rounded-full flex items-center justify-center gap-2 transition-all duration-300"
                >
                    <FaHome size={18} /> Home
                </button>

                <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-full flex items-center justify-center gap-2 transition-all duration-300"
                >
                    <FiLogOut size={18} /> Logout
                </button>
            </div>
        </div>
    );
};

export default CaptainProfile;
