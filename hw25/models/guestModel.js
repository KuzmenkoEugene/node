// models/guestModel.js
const pool = require('../config/database');

class GuestModel {
  async addGuest(name, email, phone) {
    try {
      const [result] = await pool.execute(`
        INSERT INTO guests (name, email, phone)
        VALUES (?, ?, ?);
      `, [name, email, phone]);
      return result.insertId;
    } catch (error) {
      console.error('Error adding guest:', error);
      throw error;
    }
  }
}

module.exports = new GuestModel();