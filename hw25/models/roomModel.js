// models/roomModel.js
const pool = require('../config/database');

class RoomModel {
  async getRoomById(roomId) {
    try {
      const [rows] = await pool.execute(`
        SELECT * FROM rooms WHERE room_id = ?;
      `, [roomId]);
      return rows[0];
    } catch (error) {
      console.error('Error getting room by ID:', error);
      throw error;
    }
  }
}

module.exports = new RoomModel();