const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/api/attendance', (req, res) => {
    const faces = req.body.faces;

    // Proses pengenalan wajah di sini
    // Misalnya, kita akan membandingkan wajah yang terdeteksi dengan database wajah yang telah disimpan

    // Contoh sederhana:
    const recognized = faces.length > 0; // Ganti dengan logika pengenalan wajah sebenarnya

    if (recognized) {
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

