const mongoose = require('mongoose');

// Membuat schema untuk User
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    faceData: {
        type: String, // Simpan data wajah dalam format yang sesuai (base64, URL, dll.)
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Membuat model User
const User = mongoose.model('User', userSchema);

module.exports = User;

