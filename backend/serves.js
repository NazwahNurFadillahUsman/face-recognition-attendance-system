const express = require('express');
const multer = require('multer');
const faceapi = require('face-api.js');
const canvas = require('canvas');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Konfigurasi multer untuk menangani upload gambar
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Muat model face-api.js
async function loadModels() {
    const MODEL_URL = '/models'; // Anda perlu menempatkan model di folder ini
    await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
    await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
    await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
}

loadModels().then(() => {
    console.log('Model loaded');
});

// Endpoint untuk upload gambar
app.post('/upload', upload.single('image'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    const img = await canvas.loadImage(req.file.buffer);
    const detections = await faceapi.detectAllFaces(img).withFaceLandmarks().withFaceDescriptors();

    if (detections.length === 0) {
        return res.status(404).send('No faces detected.');
    }

    // Proses deteksi wajah dan simpan informasi absensi
    // Di sini Anda bisa menambahkan logika untuk menyimpan data ke database

    res.send('Face detected and attendance recorded.');
});

// Menyajikan file statis untuk model
app.use('/models', express.static('models'));

// Mulai server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

