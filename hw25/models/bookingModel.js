// models/bookingModel.js
const pool = require("../config/database");

class BookingModel {
  async findAvailableRooms(date) {
    try {
      const [rows] = await pool.execute(
        `
       SELECT r.id, r.number, r.type, r.price_per_night
        FROM rooms r
        LEFT JOIN bookings b ON r.id = b.room_id AND ? BETWEEN b.check_in AND b.check_out
        WHERE b.id IS NULL;
      `,
        [date]
      );
      return rows;
    } catch (error) {
      console.error("Error finding available rooms:", error);
      throw error;
    }
  }

  async createBooking(guestId, roomId, checkInDate, checkOutDate) {
    try {
      const [result] = await pool.execute(
        `
        INSERT INTO bookings (guest_id, room_id, check_in, check_out)
        VALUES (?, ?, ?, ?);
      `,
        [guestId, roomId, checkInDate, checkOutDate]
      );
      return result.insertId;
    } catch (error) {
      console.error("Error creating booking:", error);
      throw error;
    }
  }

  async calculateMonthlyRevenue(year, month) {
    try {
      const [rows] = await pool.execute(
        `
        SELECT SUM(DATEDIFF(check_out, check_in) * r.price_per_night) AS total_revenue
        FROM bookings b
        JOIN rooms r ON b.room_id = r.id
        WHERE YEAR(b.check_in) = ? AND MONTH(b.check_in) = ?;
      `,
        [year, month]
      );
      return rows[0].total_revenue || 0;
    } catch (error) {
      console.error("Error calculating monthly revenue:", error);
      throw error;
    }
  }
}

module.exports = new BookingModel();