import React, { useEffect, useState, useRef, useContext } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import { SocketContext } from '../context/SocketContext';
import { UserDataContext } from '../context/UserContext';

// Fix for default markers in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom icons for user and captain
const userIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const captainIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Component to update map bounds
const MapUpdater = ({ currentLocation, targetLocation, mapRef }) => {
  const map = useMap();

  useEffect(() => {
    if (mapRef) {
      mapRef.current = map;
    }

    if (currentLocation && targetLocation) {
      const bounds = L.latLngBounds([
        [currentLocation.lat, currentLocation.lng],
        [targetLocation.lat, targetLocation.lng],
      ]);
      map.fitBounds(bounds, { padding: [50, 50] });
    } else if (currentLocation) {
      map.setView([currentLocation.lat, currentLocation.lng], 15);
    }
  }, [currentLocation, targetLocation, map, mapRef]);

  return null;
};

const LiveTracking = ({ ride, userType = 'user' }) => {
  const { user } = useContext(UserDataContext);
  const { socket } = useContext(SocketContext);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [targetLocation, setTargetLocation] = useState(null);
  const [isTracking, setIsTracking] = useState(false);
  const [error, setError] = useState(null);
  const mapRef = useRef(null);
  const lastEmitTimeRef = useRef(0);
  const watchIdRef = useRef(null);

  const ORS_API_KEY = import.meta.env.VITE_ORS_API_KEY;

  // Start/Stop tracking functions
  const startTracking = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser');
      return;
    }

    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 30000
    };

    const watchId = navigator.geolocation.watchPosition(
      async (position) => {
        try {
          const { latitude, longitude, accuracy } = position.coords;
          const newLocation = { lat: latitude, lng: longitude, accuracy };
          setCurrentLocation(newLocation);
          setError(null);

          // Debounced socket emit - every 3 seconds
          const now = Date.now();
          if (!lastEmitTimeRef.current || now - lastEmitTimeRef.current > 3000) {
            if (socket && ride?._id) {
              socket.emit('update-location', {
                rideId: ride._id,
                userType: user?.role || userType,
                location: newLocation,
                userId: user?._id,
              });
              lastEmitTimeRef.current = now;
              console.log('Location update sent to server');
            }
          }

          // Reverse geocode using ORS
          if (ORS_API_KEY) {
            try {
              const response = await axios.get(
                `https://api.openrouteservice.org/geocode/reverse?api_key=${ORS_API_KEY}&point.lat=${latitude}&point.lon=${longitude}`
              );
              console.log('Current Address:', response.data?.features?.[0]?.properties?.label);
            } catch (err) {
              console.error('ORS Reverse Geocode Error:', err.message);
            }
          }
        } catch (err) {
          console.error('Error processing location:', err);
          setError('Error processing location data');
        }
      },
      (error) => {
        console.error('Geolocation Error:', error.message);
        setError(`Location error: ${error.message}`);
      },
      options
    );

    watchIdRef.current = watchId;
    setIsTracking(true);
  };

  const stopTracking = () => {
    if (watchIdRef.current) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
    
    setIsTracking(false);
  };

  // Get current location (user/captain)
  useEffect(() => {
    if (ride && ['accepted', 'ongoing'].includes(ride.status)) {
      startTracking();
    }

    return () => {
      stopTracking();
    };
  }, [ride?.status, user]);

  // Socket listener for other user's location
  useEffect(() => {
    if (!socket) return;

    const handleLocationUpdate = (data) => {
      console.log('Received location update:', data);
      // Only update if it's from a different user type
      if (data.userType !== (user?.role || userType) && data.rideId === ride?._id) {
        setTargetLocation(data.location);
      }
    };

    socket.on('location-updated', handleLocationUpdate);
    
    return () => {
      socket.off('location-updated', handleLocationUpdate);
    };
  }, [socket, user?.role, userType, ride?._id]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopTracking();
    };
  }, []);

  // Console logging effect that uses current location state
  useEffect(() => {
    let logInterval;
    
    if (isTracking) {
      // Set up interval for logging location name every 3 seconds
      logInterval = setInterval(async () => {
        if (currentLocation && ORS_API_KEY) {
          try {
            const response = await axios.get(
              `https://api.openrouteservice.org/geocode/reverse?api_key=${ORS_API_KEY}&point.lat=${currentLocation.lat}&point.lon=${currentLocation.lng}`
            );
            const locationName = response.data?.features?.[0]?.properties?.label || 'Location not found';
            console.log('📍 Current Location:', locationName);
          } catch (err) {
            console.log('📍 Current Location: Unable to get address');
            console.error('Geocoding error:', err.message);
          }
        } else if (currentLocation) {
          console.log('📍 Current Location: Coordinates available but no API key for address lookup');
        } else {
          console.log('⏳ Waiting for location data...');
        }
      }, 3000);
    }

    return () => {
      if (logInterval) {
        clearInterval(logInterval);
        console.log('🛑 Location name logging stopped');
      }
    };
  }, [isTracking, currentLocation, ORS_API_KEY]);

  return (
    <div className="w-full h-full relative">
      {/* Control Panel */}
      <div className="absolute top-4 left-60 z-[1000] bg-white/90 backdrop-blur-md rounded-lg p-3 shadow-lg">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${currentLocation ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
            <span className="text-sm font-medium">Your Location</span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${targetLocation ? 'bg-green-500' : 'bg-gray-300'}`}></div>
            <span className="text-sm font-medium">Other Location</span>
          </div>
          <button
            onClick={isTracking ? stopTracking : startTracking}
            className={`px-3 py-1 rounded text-sm font-medium ${
              isTracking 
                ? 'bg-red-500 hover:bg-red-600 text-white' 
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            {isTracking ? 'Stop Tracking' : 'Start Tracking'}
          </button>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="absolute bottom-4 left-4 right-4 z-[1000] bg-red-500/90 text-white p-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* Map Container */}
      <MapContainer
        center={currentLocation ? [currentLocation.lat, currentLocation.lng] : [28.6139, 77.2090]}
        zoom={13}
        style={{ width: '100%', height: '100%' }}
        className="rounded-lg"
      >
        <TileLayer 
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Map Updater Component */}
        <MapUpdater 
          currentLocation={currentLocation} 
          targetLocation={targetLocation} 
          mapRef={mapRef}
        />

        {/* Current User Location Marker */}
        {currentLocation && (
          <Marker 
            position={[currentLocation.lat, currentLocation.lng]} 
            icon={userType === 'captain' ? captainIcon : userIcon}
          />
        )}

        {/* Target Location Marker */}
        {targetLocation && (
          <Marker 
            position={[targetLocation.lat, targetLocation.lng]} 
            icon={userType === 'captain' ? userIcon : captainIcon}
          />
        )}
      </MapContainer>
    </div>
  );
};

export default LiveTracking;

