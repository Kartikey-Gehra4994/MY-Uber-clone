import React from "react";
import { FaUserCircle, FaHome, FaInfoCircle } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserProfile = (props) => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/logout`, {}, {
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
            // Even if the API call fails, remove token and redirect
            localStorage.removeItem('token');
            navigate('/login');
        }
    };

    const goToHome = () => {
      props.setUserProfilePanel(false);
      props.setAddressPanel(true);
    };

    const goToAbout = () => {
        navigate("/about");
    };

    const user = {
        name: "Kartikey Gehra",
        email: "kartikey@example.com",
        role: "MERN Stack Developer",
        phone: "+91 9876543210",
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="bg-black/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-xl p-8 max-w-md w-full text-white">
                <div className="flex flex-col items-center gap-4">
                    <img src="kartik_1.jpg" alt="profile" className="w-20 h-20 rounded-full" />
                    <h1 className="text-2xl font-bold">{user.name}</h1>
                    <p className="text-sm text-white/80">{user.email}</p>

                    <div className="w-full border-t border-white/30 mt-4 pt-4 space-y-2 text-left text-white">
                        <p><span className="font-semibold">Role:</span> {user.role}</p>
                        <p><span className="font-semibold">Phone:</span> {user.phone}</p>
                    </div>

                    <div className="mt-6 flex flex-col w-full gap-3">
                        <button
                            onClick={goToHome}
                            className="bg-white/20 hover:bg-white/30 text-white font-semibold px-6 py-3 rounded-full flex items-center justify-center gap-2 transition-all duration-300"
                        >
                            <FaHome size={18} />
                            Home
                        </button>
                        <button
                            onClick={goToAbout}
                            className="bg-white/20 hover:bg-white/30 text-white font-semibold px-6 py-3 rounded-full flex items-center justify-center gap-2 transition-all duration-300"
                        >
                            <FaInfoCircle size={18} />
                            About
                        </button>
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-full flex items-center justify-center gap-2 transition-all duration-300"
                        >
                            <FiLogOut size={18} />
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
