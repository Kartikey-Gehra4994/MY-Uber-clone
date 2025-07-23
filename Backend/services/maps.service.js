const axios = require('axios');
const captainModel = require('../models/captain.model');

module.exports.getAddressCoordinate = async (address) => {
    const apiKey = process.env.ORS_API_KEY;
    const url = `https://api.openrouteservice.org/geocode/search?api_key=${apiKey}&text=${encodeURIComponent(address)}`;

    try {
        const response = await axios.get(url);
        if (response.data.features && response.data.features.length > 0) {
            const location = response.data.features[0].geometry.coordinates;
            return {
                lat: location[1],
                lng: location[0]
            };
        } else {
            throw new Error('Unable to fetch coordinates');
        }
    } catch (error) {
        console.error(error);
        throw new Error('Unable to fetch coordinates');
    }
};

module.exports.getDistanceTime = async (origin, destination) => {
    if (!origin || !destination) {
        throw new Error('Origin and destination are required');
    }

    const apiKey = process.env.ORS_API_KEY;

    try {
        const originCoords = await module.exports.getAddressCoordinate(origin);
        const destinationCoords = await module.exports.getAddressCoordinate(destination);

        const url = 'https://api.openrouteservice.org/v2/directions/driving-car/json';

        const headers = {
            'Authorization': apiKey,
            'Content-Type': 'application/json'
        };

        const body = {
            coordinates: [
                [originCoords.lng, originCoords.lat],
                [destinationCoords.lng, destinationCoords.lat]
            ]
        };

        console.log("Sending ORS POST:", body);

        const response = await axios.post(url, body, { headers });

        if (response.data.routes && response.data.routes.length > 0) {
            const route = response.data.routes[0];
            return {
                distance: {
                    text: `${(route.summary.distance / 1000).toFixed(2)} km`,
                    value: route.summary.distance
                },
                duration: {
                    text: `${Math.round(route.summary.duration / 60)} mins`,
                    value: route.summary.duration
                }
            };
        } else {
            console.error("ORS API returned no routes:", response.data);
            throw new Error('Unable to fetch distance and time');
        }

    } catch (error) {
        console.error("Fetch Error:", error.message || error);
        throw new Error('Unable to fetch distance and time');
    }
};

module.exports.getAutoCompleteSuggestions = async (input) => {
    if (!input) {
        throw new Error('Query is required');
    }

    const apiKey = process.env.ORS_API_KEY;
    const url = `https://api.openrouteservice.org/geocode/autocomplete?api_key=${apiKey}&text=${encodeURIComponent(input)}`;

    try {
        const response = await axios.get(url);
        if (response.data.features) {
            return response.data.features.map(feature => feature.properties.label).filter(Boolean);
        } else {
            throw new Error('Unable to fetch suggestions');
        }
    } catch (error) {
        console.error(error);
        throw new Error('Unable to fetch suggestions');
    }
};

module.exports.getCaptainInTheRadius = async (lat, lng, radius = 5000) => {

    const captains = await captainModel.find({
        location: {
            $geoWithin: {
                $centerSphere: [[lng, lat], radius / 6378.1] // radius in kilometers
            }
        }
    })

    return captains;
}