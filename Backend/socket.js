const socketIo = require('socket.io');
const userModel = require('./models/user.models');
const captainModel = require('./models/captain.model');

let io;

function initializeSocket(server) {
    io = socketIo(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    io.on('connection', (socket) => {
        console.log(`A user connected: ${socket.id}`);

        socket.on('join', async (data) => {
            const { userId, userType } = data;

            if (userType === 'user') {
                await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
            } else if (userType === 'captain') {
                await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
            }
        });

        socket.on("update-location-captain", async (data) => {
            const { userId, location } = data;
          
            // Validate location data
            if (!location || typeof location.lat !== 'number' || typeof location.lng !== 'number') {
                console.error("Invalid location data:", location);
                return;
            }

            await captainModel.findByIdAndUpdate(userId, {
                location: {
                    lat: location.lat,
                    lng: location.lng
                }
            });
        });

        socket.on('disconnect', () => {
            console.log(`User disconnected: ${socket.id}`);
        });
    });

    return io;
}

function sendMessageToSocketId(socketId, messageObject) {
    
    console.log(`Sending message to socketId: ${socketId}`, messageObject);

    if (io) {
        io.to(socketId).emit(messageObject.event, messageObject.data);
    } else {
        console.error("Socket.io is not initialized.");
    }
}

module.exports = { initializeSocket, sendMessageToSocketId };
