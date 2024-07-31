const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const captureButton = document.getElementById('capture');
const resultDiv = document.getElementById('result');

navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
        video.srcObject = stream;
    })
    .catch(error => {
        console.error('Error accessing webcam:', error);
    });

captureButton.addEventListener('click', () => {
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = canvas.toDataURL('image/png').split(',')[1];

    fetch('/detect', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ image: imageData })
    })
    .then(response => response.json())
    .then(data => {
        if (data.face_found) {
            resultDiv.textContent = 'Face detected!';
        } else {
            resultDiv.textContent = 'No face detected.';
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

