// images.js
const fs = require('fs');
const path = require('path');

const imagesDirectory = path.join(__dirname, 'images'); // Folder gambar
let images = [];

// Fungsi untuk memuat gambar
function loadImages() {
    try {
        // Membaca semua file dalam folder gambar
        const files = fs.readdirSync(imagesDirectory);
        images = files.map(file => {
            return {
                name: file,
                path: path.join(imagesDirectory, file),
            };
        });
    } catch (error) {
        console.error('Error loading images:', error);
    }
}

// Fungsi untuk mendapatkan semua gambar
function getImages() {
    return images;
}

// Inisialisasi
loadImages();

module.exports = {
    getImages,
};

