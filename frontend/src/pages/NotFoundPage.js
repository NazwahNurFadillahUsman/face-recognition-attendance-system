// NotFoundPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import './NotFoundPage.css'; // Pastikan untuk menambahkan styling sesuai kebutuhan

const NotFoundPage = () => {
    return (
        <div className="not-found">
            <h1>404 - Halaman Tidak Ditemukan</h1>
            <p>Maaf, halaman yang Anda cari tidak ditemukan.</p>
            <Link to="/" className="home-link">
                Kembali ke Beranda
            </Link>
        </div>
    );
};

export default NotFoundPage;

