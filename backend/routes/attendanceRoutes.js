const express = require('express');
const router = express.Router();
const AttendanceController = require('../controllers/AttendanceController');

// Route untuk meng-upload gambar dan mencocokkannya dengan wajah
router.post('/upload', AttendanceController.uploadImage);

// Route untuk mengambil data absensi
router.get('/attendance', AttendanceController.getAttendanceRecords);

// Route untuk menghapus data absensi berdasarkan ID
router.delete('/attendance/:id', AttendanceController.deleteAttendanceRecord);

module.exports = router;

