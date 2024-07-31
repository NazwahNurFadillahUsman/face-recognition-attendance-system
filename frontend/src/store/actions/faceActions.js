// faceActions.js

import * as faceapi from 'face-api.js';

// Load the models
async function loadModels() {
    const MODEL_URL = '/models'; // Ganti dengan path ke folder model Anda
    await faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL);
    await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
    await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
}

// Detect faces in the video stream
async function detectFaces(videoElement) {
    const detections = await faceapi.detectAllFaces(videoElement).withFaceLandmarks().withFaceDescriptors();
    return detections;
}

// Draw results on canvas
function drawResults(detections, canvas) {
    faceapi.draw.drawDetections(canvas, detections);
    faceapi.draw.drawFaceLandmarks(canvas, detections);
}

// Start the video stream
async function startVideo() {
    const videoElement = document.getElementById('video');
    const stream = await navigator.mediaDevices.getUserMedia({ video: {} });
    videoElement.srcObject = stream;

    videoElement.play();
    videoElement.onloadedmetadata = async () => {
        const canvas = faceapi.createCanvasFromMedia(videoElement);
        document.body.append(canvas);
        faceapi.matchDimensions(canvas, { width: videoElement.width, height: videoElement.height });

        setInterval(async () => {
            const detections = await detectFaces(videoElement);
            const resizedDetections = faceapi.resizeResults(detections, { width: videoElement.width, height: videoElement.height });
            canvas.clearRect(0, 0, canvas.width, canvas.height);
            drawResults(resizedDetections, canvas);
        }, 100);
    };
}

// Initialize the application
async function init() {
    await loadModels();
    await startVideo();
}

init();

