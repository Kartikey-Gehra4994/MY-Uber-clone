// import React from 'react'

// const ConfirmRide = (props) => {
//   return (
//     <div>
//         <h5 
//           className='p-1 text-center w-[93%] absolute top-0' 
//           onClick={() => {
//             props.setConfirmRidePanel(false)
//           }}
//         >
//           <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
//         </h5>
//         <h3 className='text-2xl font-semibold mb-5'>Confirm your Ride</h3>

//         <div className='flex gap-2 justify-between flex-col items-center'>
//             <img className='h-20' src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg" alt="" />
//             <div className='w-full mt-5'>
//                 <div className='flex items-center gap-5 p-3 border-b-2'>
//                     <i className="ri-map-pin-user-fill"></i>
//                     <div>
//                         <h3 className='text-lg font-medium'>562/11-A</h3>
//                         <p className='text-sm -mt-1 text-gray-600'>Kankariya Talab, Ahmedabad</p>
//                     </div>
//                 </div>
//                 <div className='flex items-center gap-5 p-3 border-b-2'>
//                     <i className="text-lg ri-map-pin-2-fill"></i>
//                     <div>
//                         <h3 className='text-lg font-medium'>562/11-A</h3>
//                         <p className='text-sm -mt-1 text-gray-600'>Kankariya Talab, Ahmedabad</p>
//                     </div>
//                 </div>
//                 <div className='flex items-center gap-5 p-3'>
//                     <i className="ri-currency-line"></i>
//                     <div>
//                         <h3 className='text-lg font-medium'>₹193.20</h3>
//                         <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
//                     </div>
//                 </div>
//             </div>
//             <button 
//             //   onClick={() => {
//             //     props.setVehicleFound(true)
//             //     props.setConfirmRidePanel(false)
//             //     props.createRide()
//             //   }}
//               className='w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg'
//             >
//               Confirm
//             </button>
//         </div>
//     </div>
//   )
// }

// export default ConfirmRide



// import React, { useState } from 'react';
// import { RiArrowDownWideLine, RiMapPinUserFill, RiMapPin2Fill, RiCurrencyLine } from 'react-icons/ri';
// import { FaSpinner } from 'react-icons/fa';

// const ConfirmRide = (props) => {
//   const [loading, setLoading] = useState(false);

//   const handleConfirm = () => {
//     setLoading(true);
//     setTimeout(() => {
//       setLoading(false);
//       props.setConfirmRidePanel(false);
//       // props.setVehicleFound(true);
//       // props.createRide();
//     }, 2000); // simulate 2 second loading
//   };

//   return (
//     <div className='flex justify-center items-center'>
//     <div className="px-4 py-6 rounded-2xl shadow-xl bg-white max-w-md mx-auto">
//       {/* Header */}
//       <h5
//         className="absolute top-2 right-4 text-gray-400 hover:text-black transition-all cursor-pointer"
//         onClick={() => props.setConfirmRidePanel(false)}
//       >
//         <RiArrowDownWideLine className="text-3xl" />
//       </h5>

//       <h3 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-indigo-500 to-purple-500 text-transparent bg-clip-text">
//         Confirm your Ride
//       </h3>

//       {/* Vehicle Image */}
//       <div className="flex justify-center mb-4">
//         <img
//           className="h-20 w-36 object-cover rounded-lg "
//           src="https://cdn.dribbble.com/userupload/42120930/file/original-51c86458333cd6b7993b601ff3a261da.gif"
//           alt="vehicle"
//         />
//       </div>

//       {/* Info Sections */}
//       <div className="space-y-4">
//         <div className="flex items-start gap-4 p-3 bg-gray-50 rounded-xl shadow-sm">
//           <RiMapPinUserFill className="text-xl text-blue-600 mt-1" />
//           <div>
//             <h4 className="text-lg font-semibold text-gray-900">562/11-A</h4>
//             <p className="text-sm text-gray-600 -mt-1">Kankariya Talab, Ahmedabad</p>
//           </div>
//         </div>

//         <div className="flex items-start gap-4 p-3 bg-gray-50 rounded-xl shadow-sm">
//           <RiMapPin2Fill className="text-xl text-red-500 mt-1" />
//           <div>
//             <h4 className="text-lg font-semibold text-gray-900">562/11-A</h4>
//             <p className="text-sm text-gray-600 -mt-1">Kankariya Talab, Ahmedabad</p>
//           </div>
//         </div>

//         <div className="flex items-start gap-4 p-3 bg-gray-50 rounded-xl shadow-sm">
//           <RiCurrencyLine className="text-xl text-green-600 mt-1" />
//           <div>
//             <h4 className="text-lg font-semibold text-gray-900">₹193.20</h4>
//             <p className="text-sm text-gray-600 -mt-1">Cash Payment</p>
//           </div>
//         </div>
//       </div>

//       {/* Confirm Button */}
//       <button
//         onClick={handleConfirm}
//         className={`w-full mt-6 bg-green-600 text-white font-bold py-3 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-green-700 ${
//           loading ? 'cursor-not-allowed opacity-70' : ''
//         }`}
//         disabled={loading}
//       >
//         {loading ? (
//           <FaSpinner className="animate-spin mr-2 text-white" />
//         ) : null}
//         {loading ? 'Processing...' : 'Confirm Ride'}
//       </button>
//     </div>
//     </div>
//   );
// };

// export default ConfirmRide;


import React, { useState } from 'react';
import {
  RiArrowDownWideLine,
  RiMapPinUserFill,
  RiMapPin2Fill,
  RiCurrencyLine,
} from 'react-icons/ri';
import { FaSpinner } from 'react-icons/fa';

const ConfirmRide = (props) => {
  const [loading, setLoading] = useState(false);

  const handleConfirm = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // setConfirmRidePanel(false);
      props.setWaitingDriver(true);
      // props.setVehicleFound(true);
      // props.createRide();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-white px-4 py-6 overflow-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-extrabold text-transparent bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text">
          Confirm your Ride
        </h3>
        <button onClick={() => props.setConfirmRidePanel(false)}>
          <RiArrowDownWideLine className="text-3xl text-gray-400 hover:text-black transition-all" />
        </button>
      </div>

      {/* Car image */}
      <div className="flex justify-center mb-5 mt-20">
        <img
          className=" rounded-xl object-cover "
          src="https://cdn.dribbble.com/userupload/42120930/file/original-51c86458333cd6b7993b601ff3a261da.gif"
          alt="Car"
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

      {/* Button */}
      <button
        onClick={handleConfirm}
        disabled={loading}
        className={`mt-6 w-full py-3 rounded-full font-bold text-white transition-all duration-300 flex justify-center items-center ${
          loading ? 'bg-green-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
        }`}
      >
        {loading && <FaSpinner className="animate-spin mr-2" />}
        {loading ? 'Processing...' : 'Confirm Ride'}
      </button>
    </div>
  );
};

export default ConfirmRide;
