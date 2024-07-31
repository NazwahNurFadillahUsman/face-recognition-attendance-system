import React, { useState } from 'react';
import './HomePage.css'; // Pastikan untuk membuat file CSS untuk styling

const HomePage = () => {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [imageSrc, setImageSrc] = useState('');

  const handleStartCamera = () => {
    setIsCameraActive(true);
    // Logika untuk mengaktifkan kamera akan ditambahkan di sini
  };

  const handleTakePicture = () => {
    // Logika untuk mengambil gambar dari kamera
    // Misalnya, menggunakan API MediaDevices.getUserMedia()
    // Setelah gambar diambil, set ke state imageSrc
    // setImageSrc(gambar);
  };

  const handleSubmit = () => {
    // Logika untuk mengirim gambar ke backend untuk diproses
    // Misalnya, menggunakan fetch atau axios
    // fetch('API_ENDPOINT', {
    //   method: 'POST',
    //   body: JSON.stringify({ image: imageSrc }),
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // })
    // .then(response => response.json())
    // .then(data => console.log(data));
  };

  return (
    <div className="homepage">
      <h1>Sistem Pengenalan Wajah untuk Absensi</h1>
      <div className="camera-container">
        {isCameraActive ? (
          <video autoPlay></video> // Ganti ini dengan elemen video yang menampilkan aliran kamera
        ) : (
          <p>Kamera belum aktif</p>
        )}
      </div>
      <button onClick={handleStartCamera}>Aktifkan Kamera</button>
      <button onClick={handleTakePicture}>Ambil Gambar</button>
      <button onClick={handleSubmit}>Kirim Gambar</button>
      {imageSrc && <img src={imageSrc} alt="Captured"

