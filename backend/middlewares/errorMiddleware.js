// errorMiddleware.js

// Middleware untuk menangani kesalahan
function errorMiddleware(err, req, res, next) {
  console.error(err.stack);

  // Tentukan status kode kesalahan
  const statusCode = err.statusCode || 500;

  // Tanggapan kesalahan umum
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
}

module.exports = errorMiddleware;

