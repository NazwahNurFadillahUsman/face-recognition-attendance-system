const express = require('express');
const multer = require('multer');
const faceapi = require('face-api.js');
const canvas = require('canvas');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// Middleware for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage });

// Load models
const MODEL_URL = path.join(__dirname, '/models');
Promise.all([
  faceapi.nets.faceRecognitionNet.loadFromDisk(MODEL_URL),
  faceapi.nets.faceLandmark68Net.loadFromDisk(MODEL_URL),
  faceapi.nets.ssdMobilenetv1.loadFromDisk(MODEL_URL)
]).then(() => {
  console.log('Models loaded');
});

// Setup canvas for node
const { Canvas, Image, ImageData } = canvas;
faceapi.env.monkeyPatch({ Canvas, Image, ImageData });

app.post('/attendance', upload.single('image'), async (req, res) => {
  const image = await canvas.loadImage(req.file.path);
  const detections = await faceapi.detectAllFaces(image).withFaceLandmarks().withFaceDescriptors();

  // Simpan deteksi ke file atau database (di sini kita hanya mencetak hasilnya)
  console.log(detections);

  res.json(detections);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

