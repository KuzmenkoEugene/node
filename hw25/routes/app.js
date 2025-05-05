const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

router.get('/available-rooms', bookingController.getAvailableRooms);

router.post('/guests', bookingController.addGuest);

router.post('/bookings', bookingController.createBooking);

router.get('/revenue/:year/:month', bookingController.getMonthlyRevenue);

module.exports = router;