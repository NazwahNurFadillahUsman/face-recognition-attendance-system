// attendanceService.js
const cv = require('opencv4nodejs'); // Pastikan Anda menginstal opencv4nodejs
const fs = require('fs');
const path = require('path');

// Lokasi direktori untuk menyimpan gambar wajah
const attendanceDir = path.join(__dirname, 'attendance');

// Memastikan direktori ada
if (!fs.existsSync(attendanceDir)) {
  fs.mkdirSync(attendanceDir);
}

// Fungsi untuk menangkap gambar dari webcam
const captureImage = (userId) => {
  return new Promise((resolve, reject) => {
    const wCap = new cv.VideoCapture(0); // Menggunakan webcam default
    const frame = wCap.read();
    const image = frame.bgrToGray(); // Mengonversi ke grayscale

    // Simpan gambar wajah
    const imagePath = path.join(attendanceDir, `${userId}-${Date.now()}.jpg`);
    cv.imwrite(imagePath, image);
    
    resolve(imagePath);
  });
};

// Fungsi untuk mendeteksi wajah
const detectFace = (imagePath) => {
  return new Promise((resolve, reject) => {
    const image = cv.imread(imagePath);
    const grayImage = image.bgrToGray();
    const classifier = new cv.CascadeClassifier(cv.HAAR_FRONTALFACE_ALT2);
    
    const faces = classifier.detectMultiScale(grayImage).objects;
    
    if (!faces.length) {
      return reject(new Error('Tidak ada wajah terdeteksi'));
    }
    
    resolve(faces);
  });
};

// Fungsi untuk mencatat absensi
const markAttendance = async (userId) => {
  try {
    const imagePath = await captureImage(userId);
    const faces = await detectFace(imagePath);
    
    // Di sini Anda bisa menyimpan data absensi ke database
    console.log(`Absensi dicatat untuk user ID: ${userId}, Gambar: ${imagePath}`);
    
  } catch (error) {
    console.error('Kesalahan saat mencatat absensi:', error.message);
  }
};

// Ekspor fungsi untuk digunakan di tempat lain
module.exports = {
  markAttendance,
};

