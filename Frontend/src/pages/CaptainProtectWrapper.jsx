import React, { useContext, useEffect, useState } from 'react'
import { CaptainDataContext } from '../context/CaptainContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


const CaptainProtectWrapper = ({ children }) => {

    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const { setCaptain } = useContext(CaptainDataContext)
    const [isLoading, setisLoading] = useState(true)

    useEffect(() => {
        if (!token) {
            navigate('/captain-login')
        }
    }, [token, navigate])

    // axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
    //     headers: {
    //         Authorization: `Bearer ${token}`,
    //     }
    // }).then((response) => {
    //     if (response.status === 200) {
    //         console.log("Captain profile fetched successfully:", response.data);
    //         setCaptain(response.data)
    //         setisLoading(false)
    //     }
    // })
    // .catch((error) => {
    //     console.log("Error fetching captain profile:", error);
    //     localStorage.removeItem('token')
    //     navigate('/captain-login')
    // })

    // if (isLoading) {
    //     return <div>Loading...</div>

    // }


    return (
        <>
            {children}
        </>
    )
}

export default CaptainProtectWrapper
