import React, { useRef, useEffect } from 'react';

const CapturePage = () => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    
    useEffect(() => {
        const startVideo = async () => {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            videoRef.current.srcObject = stream;
        };

        startVideo();

        return () => {
            const stream = videoRef.current.srcObject;
            if (stream) {
                const tracks = stream.getTracks();
                tracks.forEach(track => track.stop());
            }
        };
    }, []);

    const captureImage = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        
        // Di sini Anda dapat mengirim gambar ke server untuk diproses lebih lanjut
        const imageDataUrl = canvas.toDataURL();
        console.log(imageDataUrl); // Gambar dalam format base64
    };

    return (
        <div>
            <h1>Capture Face for Attendance</h1>
            <video ref={videoRef} autoPlay style={{ width: '100%' }}></video>
            <button onClick={captureImage}>Capture</button>
            <canvas ref={canvasRef} style={{ display: 'none' }} width={640} height={480}></canvas>
        </div>
    );
};

export default CapturePage;

