import React from 'react'
import { RiArrowDownWideFill } from 'react-icons/ri'

const VehiclePanel = (props) => {
    return (
        <div className='py-6 '>
            {/* Close Arrow */}
            <div
                className='flex justify-center mb-2 cursor-pointer'
                onClick={() => props.setVehiclePanel(false)}
            >
                <i className="text-3xl text-gray-300 hover:text-gray-600 transition ri-arrow-down-wide-line"></i>
            </div>

            {/* Panel Title */}
            <div className='flex justify-between'>
                <h3 className='text-2xl font-bold mb-6 w-fit text-gray-800'>Choose a Vehicle</h3>
                <div
                    onClick={() => props.setVehiclePanelOpen(false)} >
                    <RiArrowDownWideFill className="text-2xl text-gray-500" />
                </div>
            </div>

            {/* Vehicle Option 1 */}
            <div
                onClick={() => {
                    props.setConfirmRidePanel(true)
                    // props.setVehiclePanel(false)
                }}
                className='flex justify-between p-4 mb-4 rounded-xl shadow-md hover:shadow-2xl border border-gray-200 cursor-pointer transition duration-300 bg-gray-50'
            >
                <div className='flex items-center justify-between'>
                    <img className='h-12 w-16 object-cover rounded' src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg" alt="UberGo" />
                    <div className='ml-3 flex-1'>
                        <h4 className='font-semibold text-base text-gray-800'>UberGo <span className='ml-1 text-sm text-gray-500'><i className="ri-user-3-fill"></i> 4</span></h4>
                        <p className='text-sm text-gray-500'>2 mins away</p>
                        <p className='text-xs text-gray-400'>Affordable, compact rides</p>
                    </div>
                </div>
                <h2 className='text-lg font-bold text-gray-800'>₹193.20</h2>
            </div>

            {/* Vehicle Option 2 */}
            <div
                onClick={() => {
                    props.setConfirmRidePanel(true)
                    // props.setVehiclePanel(false)
                }}
                className='flex justify-between p-4 mb-4 rounded-xl shadow-md hover:shadow-2xl border border-gray-200 cursor-pointer transition duration-300 bg-gray-50'
            >
                <div className='flex items-center justify-between'>
                    <img className='h-12 w-16 object-cover rounded' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_638,w_956/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png" alt="Moto" />
                    <div className='ml-3 flex-1'>
                        <h4 className='font-semibold text-base text-gray-800'>Moto <span className='ml-1 text-sm text-gray-500'><i className="ri-user-3-fill"></i> 1</span></h4>
                        <p className='text-sm text-gray-500'>3 mins away</p>
                        <p className='text-xs text-gray-400'>Affordable motorcycle rides</p>
                    </div>
                </div>
                <h2 className='text-lg font-bold text-gray-800'>₹65</h2>
            </div>

            {/* Vehicle Option 3 */}
            <div
                onClick={() => {
                    props.setConfirmRidePanel(true)
                    // props.setVehiclePanel(false)
                }}
                className='flex justify-between p-4 mb-4 rounded-xl shadow-md hover:shadow-2xl border border-gray-200 cursor-pointer transition duration-300 bg-gray-50'
            >
                <div className='flex items-center justify-between'>
                    <img className='h-12 w-16 object-cover rounded' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png" alt="UberAuto" />
                    <div className='ml-3 flex-1'>
                        <h4 className='font-semibold text-base text-gray-800'>UberAuto <span className='ml-1 text-sm text-gray-500'><i className="ri-user-3-fill"></i> 3</span></h4>
                        <p className='text-sm text-gray-500'>3 mins away</p>
                        <p className='text-xs text-gray-400'>Affordable auto rides</p>
                    </div>
                </div>
                <h2 className='text-lg font-bold text-gray-800'>₹118.68</h2>
            </div>
        </div>
    )
}

export default VehiclePanel;
