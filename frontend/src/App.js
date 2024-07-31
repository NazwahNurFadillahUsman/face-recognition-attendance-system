import React, { useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';
import Webcam from 'react-webcam';

const App = () => {
  const webcamRef = useRef(null);
  const [modelsLoaded, setModelsLoaded] = useState(false);

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = process.env.PUBLIC_URL + '/models';
      await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
      await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
      await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
      setModelsLoaded(true);
    };

    loadModels();
  }, []);

  const handleVideoOnPlay = async () => {
    const video = webcamRef.current.video;
    const displaySize = { width: video.width, height: video.height };
    faceapi.matchDimensions(video, displaySize);

    setInterval(async () => {
      const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceDescriptors();
      const resizedDetections = faceapi.resizeResults(detections, displaySize);

      const canvas = faceapi.createCanvasFromMedia(video);
      document.body.append(canvas);
      faceapi.draw.drawDetections(canvas, resizedDetections);
      faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
    }, 100);
  };

  return (
    <div className="App">
      <h1>Face Recognition Attendance System</h1>
      {modelsLoaded ? (
        <Webcam
          ref={webcamRef}
          audio={false}
          width={640}
          height={480}
          onUserMedia={handleVideoOnPlay}
        />
      ) : (
        <p>Loading models...</p>
      )}
    </div>
  );
};

export default App;

