// faceRoutes.js
const express = require('express');
const multer = require('multer');
const cv = require('opencv4nodejs');
const path = require('path');

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // Tempat menyimpan foto yang diunggah

// Endpoint untuk mengupload foto
router.post('/upload', upload.single('photo'), async (req, res) => {
    try {
        // Memastikan file ada
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded.' });
        }

        const imagePath = path.join(__dirname, '../', req.file.path);
        const image = await cv.imreadAsync(imagePath);

        // Proses pengenalan wajah di sini (contoh sederhana)
        const grayImage = image.bgrToGray();
        const faceClassifier = new cv.CascadeClassifier(cv.HAAR_FRONTALFACE_ALT2);
        const faces = faceClassifier.detectMultiScale(grayImage).objects;

        // Jika wajah terdeteksi
        if (faces.length > 0) {
            // Logika untuk absensi bisa ditambahkan di sini (misalnya menyimpan ke database)
            console.log(`Detected ${faces.length} face(s).`);
            return res.status(200).json({ message: 'Face detected.', faces });
        } else {
            return res.status(404).json({ message: 'No face detected.' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'An error occurred while processing the image.' });
    }
});

module.exports = router;

