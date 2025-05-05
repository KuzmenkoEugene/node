// controllers/bookingController.js
const bookingModel = require('../models/bookingModel');
const guestModel = require('../models/guestModel');
const roomModel = require('../models/roomModel');

class BookingController {
  async getAvailableRooms(req, res) {
    const { date } = req.query;
    try {
      const availableRooms = await bookingModel.findAvailableRooms(date);
      res.json(availableRooms);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch available rooms' });
    }
  }

  async addGuest(req, res) {
    const { name, email, phone } = req.body;
    try {
      const guestId = await guestModel.addGuest(name, email, phone);
      res.status(201).json({ message: 'Guest added successfully', guestId });
    } catch (error) {
      res.status(500).json({ error: 'Failed to add guest' });
    }
  }

  async createBooking(req, res) {
    const { guestId, roomId, checkInDate, checkOutDate } = req.body;
    try {
      const bookingId = await bookingModel.createBooking(guestId, roomId, checkInDate, checkOutDate);
      res.status(201).json({ message: 'Booking created successfully', bookingId });
    } catch (error) {
      res.status(500).json({ error: 'Failed to create booking' });
    }
  }

  async getMonthlyRevenue(req, res) {
    const { year, month } = req.params;
    try {
      const revenue = await bookingModel.calculateMonthlyRevenue(parseInt(year), parseInt(month));
      res.json({ revenue });
    } catch (error) {
      res.status(500).json({ error: 'Failed to calculate monthly revenue' });
    }
  }
}

module.exports = new BookingController();