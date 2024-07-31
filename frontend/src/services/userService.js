// userService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users'; // Ganti dengan URL backend Anda

class UserService {
  // Fungsi untuk mendaftar pengguna baru
  async registerUser(userData) {
    try {
      const response = await axios.post(`${API_URL}/register`, userData);
      return response.data;
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  }

  // Fungsi untuk melakukan absensi
  async markAttendance(userId, imageData) {
    try {
      const response = await axios.post(`${API_URL}/attendance`, {
        userId,
        image: imageData,
      });
      return response.data;
    } catch (error) {
      console.error('Error marking attendance:', error);
      throw error;
    }
  }

  // Fungsi untuk mendapatkan daftar pengguna
  async getUsers() {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }
}

export default new UserService();

