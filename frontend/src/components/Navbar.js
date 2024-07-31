// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Pastikan untuk menambahkan CSS untuk styling

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/">Absensi Wajah</Link>
            </div>
            <ul className="navbar-links">
                <li>
                    <Link to="/">Beranda</Link>
                </li>
                <li>
                    <Link to="/about">Tentang</Link>
                </li>
                <li>
                    <Link to="/features">Fitur</Link>
                </li>
                <li>
                    <Link to="/login">Login</Link>
                </li>
                <li>
                    <Link to="/register">Daftar</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;

