import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className=''>
        <div className='bg-cover bg-center bg-[url(https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_1152,w_1152/v1683919251/assets/42/a29147-e043-42f9-8544-ecfffe0532e9/original/travel-ilustra.png)] h-screen w-full pt-8 flex justify-between flex-col'>
           <img className='w-16 ml-8' src="https://freelogopng.com/images/all_img/1659761100uber-logo-png.png" alt="" />
            <div className='bg-white pb-7 py-4 px-4'>
                <h2 className='text-3xl font-bold'>Get Started with Uber</h2>
                <Link to='/login' className='flex items-center justify-center w-full bg-black text-white py-3 rounded mt-5'>Continue</Link>
            </div>
        </div>
    </div>
  )
}

export default Home