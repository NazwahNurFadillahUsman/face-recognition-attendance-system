import React, { useRef, useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import './AttendancePage.css'; // Jangan lupa untuk menambahkan CSS jika diperlukan

const AttendancePage = () => {
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [attendanceData, setAttendanceData] = useState([]);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
    // Kirim gambar ke server untuk diproses dengan model pengenalan wajah
    processImage(imageSrc);
  }, [webcamRef]);

  const processImage = async (imageSrc) => {
    try {
      const response = await fetch('YOUR_API_ENDPOINT', {
        method: 'POST',
        body: JSON.stringify({ image: imageSrc }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (data.success) {
        // Update data kehadiran jika pengenalan wajah berhasil
        setAttendanceData(prevData => [...prevData, data.attendanceRecord]);
      } else {
        alert('Pengenalan wajah gagal. Coba lagi.');
      }
    } catch (error) {
      console.error('Error processing image:', error);
    }
  };

  return (
    <div className="attendance-page">
      <h1>Halaman Absensi</h1>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={720}
        height={480}
      />
      <button onClick={capture}>Ambil Gambar</button>
      {capturedImage && (
        <div>
          <h2>Gambar yang Diambil:</h2>
          <img src={capturedImage} alt="Captured" />
        </div>
      )}
      <div>
        <h2>Data Kehadiran:</h2>
        <ul>
          {attendanceData.map((record, index) => (
            <li key={index}>{record.name} - {record.timestamp}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AttendancePage;

