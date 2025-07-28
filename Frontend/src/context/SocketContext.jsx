import React, { createContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

export const SocketContext = createContext();

const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        // Initialize socket connection
        const socketInstance = io(import.meta.env.VITE_BASE_URL || 'http://localhost:3000', {
            withCredentials: false,
            transports: ['websocket', 'polling']
        });

        // Connection event handlers
        socketInstance.on('connect', () => {
            console.log('✅ Connected to server with socket ID:', socketInstance.id);
            setIsConnected(true);
        });

        socketInstance.on('disconnect', (reason) => {
            console.log('❌ Disconnected from server. Reason:', reason);
            setIsConnected(false);
        });

        setSocket(socketInstance);
    }, []);

    return (
        <SocketContext.Provider value={{ socket }} >
            {children}
        </SocketContext.Provider>
    );
};

export default SocketProvider;
