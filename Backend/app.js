const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
const connectTodb = require('./db/db');
const userRoutes = require('./routes/user.routes');
const captainRoutes = require('./routes/captain.routes');
const mapsRoutes = require('./routes/maps.routes');
const rideRoutes = require('./routes/ride.routes');
const paymentRoutes = require('./routes/paymentRoutes');

connectTodb();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('Welcome to the Uber Clone API!');
});

app.use('/users', userRoutes);

app.use('/captains', captainRoutes);

app.use('/maps', mapsRoutes);

app.use('/rides', rideRoutes);

app.use('/payment', paymentRoutes);

module.exports = app;