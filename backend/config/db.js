const mongoose = require('mongoose');

// Gantilah dengan URL koneksi MongoDB Anda
const mongoURI = 'mongodb://localhost:27017/attendance_system';

// Menghubungkan ke database MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

// Definisi skema untuk pengguna
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  faceId: {
    type: String,
    required: true,
    unique: true
  },
  attendance: [
    {
      date: {
        type: Date,
        default: Date.now
      },
      status: {
        type: String,
        enum: ['Present', 'Absent'],
        default: 'Present'
      }
    }
  ]
});

const User = mongoose.model('User', userSchema);

// Fungsi untuk menambahkan pengguna baru
const addUser = async (name, email, faceId) => {
  const newUser = new User({ name, email, faceId });
  try {
    const user = await newUser.save();
    console.log('User added:', user);
  } catch (error) {
    console.error('Error adding user:', error);
  }
};

// Fungsi untuk mendapatkan semua pengguna
const getUsers = async () => {
  try {
    const users = await User.find();
    console.log('All users:', users);
    return users;
  } catch (error) {
    console.error('Error getting users:', error);
  }
};

// Fungsi untuk menambahkan catatan absensi
const addAttendance = async (faceId, status) => {
  try {
    const user = await User.findOne({ faceId });
    if (user) {
      user.attendance.push({ status });
      await user.save();
      console.log('Attendance added:', user);
    } else {
      console.log('User not found');
    }
  } catch (error) {
    console.error('Error adding attendance:', error);
  }
};

// Fungsi untuk mendapatkan catatan absensi
const getAttendance = async (faceId) => {
  try {
    const user = await User.findOne({ faceId });
    if (user) {
      console.log('Attendance records for user:', user.attendance);
      return user.attendance;
    } else {
      console.log('User not found');
    }
  } catch (error) {
    console.error('Error getting attendance:', error);
  }
};

// Exporting the functions
module.exports = {
  addUser,
  getUsers,
  addAttendance,
  getAttendance
};

