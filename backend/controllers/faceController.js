const cv = require('opencv4nodejs');
const path = require('path');
const fs = require('fs');
// Fungsi untuk membaca gambar dan mengenali wajah
const recognizeFace = async (imagePath) => {
const classifier = new cv.CascadeClassifier(cv.HAAR_FRONTALFACE_ALT2);
const image = await cv.imreadAsync(imagePath);
const grayImage = await image.bgrToGrayAsync();
const { objects: faces } = await classifier.detectMultiScaleAsync(grayImage);

return faces;
};

// Fungsi untuk menangani upload gambar dan memproses pengenalan wajah
const processAttendance = async (req, res) => {
try {
const imagePath = req.file.path;
const faces = await recognizeFace(imagePath);
  if (faces.length === 0) {
  return res.status(400).json({ message: 'No faces detected' });
}

// Logika untuk menyimpan absensi
// Contoh: Simpan ke database atau file log

return res.status(200).json({ message: 'Attendance recorded', faces });
} catch (error) {
console.error(error);
return res.status(500).json({ message: 'Internal server error' });
} finally {
// Hapus file gambar setelah diproses
if (req.file && req.file.path) {
fs.unlinkSync(req.file.path);
}
}
};

module.exports = {
processAttendance,
};
