const User = require('../models/userModel');
const cv = require('opencv4nodejs');

exports.registerUser = async (req, res) => {
  try {
    const { name, image } = req.body;

    // Decode the base64 image
    const buffer = Buffer.from(image, 'base64');
    const mat = cv.imdecode(buffer);

    // Detect face and compute face encoding
    const faceDetector = new cv.CascadeClassifier(cv.HAAR_FRONTALFACE_ALT2);
    const faceRects = faceDetector.detectMultiScale(mat).objects;

    if (!faceRects.length) {
      return res.status(400).json({ error: 'No face detected' });
    }

    const face = mat.getRegion(faceRects[0]);
    const faceEncoding = await getFaceEncoding(face);

    const user = new User({ name, faceEncoding });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.recognizeUser = async (req, res) => {
  try {
    const { image } = req.body;

    // Decode the base64 image
    const buffer = Buffer.from(image, 'base64');
    const mat = cv.imdecode(buffer);

    // Detect face and compute face encoding
    const faceDetector = new cv.CascadeClassifier(cv.HAAR_FRONTALFACE_ALT2);
    const faceRects = faceDetector.detectMultiScale(mat).objects;

    if (!faceRects.length) {
      return res.status(400).json({ error: 'No face detected' });
    }

    const face = mat.getRegion(faceRects[0]);
    const faceEncoding = await getFaceEncoding(face);

    // Find user with matching face encoding
    const users = await User.find();
    for (const user of users) {
      if (compareEncodings(user.faceEncoding, faceEncoding)) {
        return res.status(200).json({ message: 'User recognized', user });
      }
    }

    res.status(404).json({ error: 'User not recognized' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Function to get face encoding (dummy implementation)
async function getFaceEncoding(face) {
  // Implement your face encoding logic here
  return [/* face encoding array */];
}

// Function to compare face encodings (dummy implementation)
function compareEncodings(encoding1, encoding2) {
  // Implement your face encoding comparison logic here
  return true;
}

