import React from "react";
import { FaHome, FaStar, FaMapMarkerAlt, FaShieldAlt } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { MdCardMembership } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserProfileAbout = (props) => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/logout`, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.status === 200) {
                localStorage.removeItem('token');
                navigate('/login');
            }
        } catch (error) {
            console.error('Logout error:', error);
            localStorage.removeItem('token');
            navigate('/login');
        }
    };

    const goToHome = () => {
        props.setUserProfilePanel(false);
        props.setAddressPanel(true);
    };

    const user = {
        name: "User Billy",
        email: "billy.user@example.com",
        phone: "+91 9876543210",
        role: "Verified Rider",
        rides: "542",
        membership: "Premium",
        city: "Meerut",
        safety: "Enabled"
    };

    return (
        <div className="bg-black/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl p-8 w-full max-w-2xl text-white">
            <div className="flex flex-col lg:flex-row items-center gap-8">
                {/* Profile Picture */}
                <img
                    src="https://pyxis.nymag.com/v1/imgs/709/49e/f9dc751d511c907f02808dad68cfea1341-13-billie-eilish.rsquare.w400.jpg"
                    alt="User"
                    className="w-32 h-32 lg:w-40 lg:h-40 rounded-full object-cover border-4 border-pink-400 shadow-lg"
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
                <div className="flex items-center gap-2 bg-pink-100/10 p-4 rounded-xl">
                    <FaStar className="text-pink-400 text-lg" />
                    <span><strong>Rides:</strong> {user.rides}</span>
                </div>
                <div className="flex items-center gap-2 bg-green-100/10 p-4 rounded-xl">
                    <MdCardMembership className="text-green-400 text-xl" />
                    <span><strong>Membership:</strong> {user.membership}</span>
                </div>
                <div className="flex items-center gap-2 bg-purple-100/10 p-4 rounded-xl">
                    <FaMapMarkerAlt className="text-purple-400 text-lg" />
                    <span><strong>City:</strong> {user.city}</span>
                </div>
                <div className="flex items-center gap-2 bg-yellow-100/10 p-4 rounded-xl">
                    <FaShieldAlt className="text-yellow-400 text-lg" />
                    <span><strong>Safety:</strong> {user.safety}</span>
                </div>
            </div>

            {/* Bottom Message */}
            <div className="mt-6 text-center text-sm italic text-white/80">
                "We ride with care and safety. Thank you for choosing us!"
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

export default UserProfileAbout;
