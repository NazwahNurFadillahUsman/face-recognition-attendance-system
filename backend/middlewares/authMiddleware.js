// authMiddleware.js

const jwt = require('jsonwebtoken');
const secretKey = 'your_secret_key'; // Gantilah dengan kunci rahasia yang sesuai

// Middleware untuk memverifikasi token
function authMiddleware(req, res, next) {
    // Ambil token dari header permintaan
    const token = req.header('Authorization');

    // Jika token tidak ada, kembalikan respon error
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        // Verifikasi token
        const decoded = jwt.verify(token, secretKey);
        // Simpan user yang sudah terverifikasi ke dalam request
        req.user = decoded;
        next(); // Lanjutkan ke middleware berikutnya atau route handler
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
}

module.exports = authMiddleware;

