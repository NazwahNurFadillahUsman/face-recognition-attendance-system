const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Ganti dengan model User yang sesuai
const Attendance = require('../models/Attendance'); // Ganti dengan model Attendance yang sesuai
const { recognizeFace } = require('../services/faceRecognition'); // Import fungsi pengenalan wajah

// Route untuk melakukan absensi
router.post('/attendance', async (req, res) => {
    const { image } = req.body; // Ambil gambar dari request body

    try {
        // Panggil fungsi pengenalan wajah
        const userId = await recognizeFace(image);

        if (userId) {
            // Jika wajah dikenali, catat absensi
            const attendance = new Attendance({
                userId,
                date: new Date(),
            });

            await attendance.save();
            return res.status(200).json({ message: 'Absensi berhasil dicatat', userId });
        } else {
            return res.status(404).json({ message: 'Wajah tidak dikenali' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Terjadi kesalahan pada server' });
    }
});

// Route untuk mendapatkan data absensi
router.get('/attendance/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const attendanceRecords = await Attendance.find({ userId });
        return res.status(200).json(attendanceRecords);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Terjadi kesalahan pada server' });
    }
});

// Route untuk mendaftarkan pengguna baru
router.post('/register', async (req, res) => {
    const { name, image } = req.body;

    try {
        const user = new User({ name, image });
        await user.save();
        return res.status(201).json({ message: 'Pengguna berhasil terdaftar', user });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Terjadi kesalahan pada server' });
    }
});

module.exports = router;

