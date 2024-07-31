const path = require('path');
const fs = require('fs');
const multer = require('multer');
const faceapi = require('face-api.js');
const canvas = require('canvas');

// Konfigurasi Multer untuk mengunggah gambar
const upload = multer({ dest: 'uploads/' });

// Inisialisasi face-api.js dengan canvas
const { Canvas, Image, ImageData } = canvas;
faceapi.env.monkeyPatch({ Canvas, Image, ImageData });

// Muat model face-api.js
const loadModels = async () => {
  const modelPath = path.join(__dirname, '../models');
  await faceapi.nets.ssdMobilenetv1.loadFromDisk(modelPath);
  await faceapi.nets.faceLandmark68Net.loadFromDisk(modelPath);
  await faceapi.nets.faceRecognitionNet.loadFromDisk(modelPath);
};

// Kontroller untuk mencocokkan wajah dengan database pengguna
const recognizeFace = async (req, res) => {
  try {
    const image = await canvas.loadImage(req.file.path);
    const detections = await faceapi.detectAllFaces(image).withFaceLandmarks().withFaceDescriptors();

    // Contoh: Cocokkan dengan wajah yang ada di database
    const labeledFaceDescriptors = await loadLabeledImages();
    const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6);
    const results = detections.map(d => faceMatcher.findBestMatch(d.descriptor));

    // Hapus file yang diunggah setelah diproses
    fs.unlinkSync(req.file.path);

    res.json({ results });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fungsi untuk memuat gambar berlabel dari database
const loadLabeledImages = async () => {
  const labels = ['User1', 'User2']; // Contoh nama pengguna
  return Promise.all(
    labels.map(async label => {
      const descriptions = [];
      for (let i = 1; i <= 2; i++) { // Asumsikan ada 2 gambar per pengguna
        const img = await canvas.loadImage(path.join(__dirname, `../data/${label}/${i}.jpg`));
        const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();
        descriptions.push(detections.descriptor);
      }
      return new faceapi.LabeledFaceDescriptors(label, descriptions);
    })
  );
};

module.exports = {
  upload,
  recognizeFace,
  loadModels
};

