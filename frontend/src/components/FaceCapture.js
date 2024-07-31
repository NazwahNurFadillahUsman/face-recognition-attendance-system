import React, { useRef, useEffect } from 'react';

const FaceCapture = () => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        // Menangkap video dari webcam
        navigator.mediaDevices.getUserMedia({ video: true })
            .then((stream) => {
                video.srcObject = stream;
                video.play();
            })
            .catch((err) => {
                console.error("Error accessing webcam: ", err);
            });

        const captureFace = () => {
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            // Lakukan pengolahan gambar dengan OpenCV di sini
            // Misalnya, deteksi wajah, simpan gambar, dll.
        };

        const interval = setInterval(captureFace, 1000); // Tangkap gambar setiap 1 detik

        return () => clearInterval(interval); // Bersihkan interval saat komponen di-unmount
    }, []);

    return (
        <div>
            <h1>Face Capture for Attendance System</h1>
            <video ref={videoRef} width="640" height="480" autoPlay></video>
            <canvas ref={canvasRef} width="640" height="480" style={{ display: 'none' }}></canvas>
        </div>
    );
};

export default FaceCapture;

