const express = require('express');
const router = express.Router();
const User = require('../models/User');
const faceapi = require('face-api.js');
const canvas = require('canvas');
const fs = require('fs');

// Load model wajah
async function loadModels() {
    await faceapi.nets.tinyFaceDetector.loadFromDisk('./weights/');
    await faceapi.nets.faceLandmark68Net.loadFromDisk('./weights/');
    await faceapi.nets.faceRecognitionNet.loadFromDisk('./weights/');
}

loadModels();

router.post('/attendance', async (req, res) => {
    const { imagePath } = req.body;

    // Load gambar
    const img = await canvas.loadImage(imagePath);
    const detections = await faceapi.detectAllFaces(img).withFaceLandmarks().withFaceDescriptors();

    if (detections.length > 0) {
        // Simpan atau update data absensi
        const user = new User({
            name: 'Nama Pengguna',
            attendanceDate: new Date(),
            imagePath: imagePath
        });

        await user.save();
        res.status(200).send('Absensi berhasil dicatat');
    } else {
        res.status(400).send('Wajah tidak terdeteksi');
    }
});

module.exports = router;

