# Sistem Pengenalan Wajah untuk Absensi Menggunakan Computer Vision

Proyek ini bertujuan untuk mengembangkan sistem absensi otomatis menggunakan teknologi pengenalan wajah. Sistem ini memanfaatkan computer vision untuk mendeteksi dan mengenali wajah karyawan dan mencatat kehadiran mereka secara otomatis.

## Fitur

- **Pengenalan Wajah**: Menggunakan model deep learning untuk mendeteksi dan mengenali wajah karyawan.
- **Absensi Otomatis**: Mencatat waktu kedatangan dan kepulangan karyawan secara otomatis.
- **Database Karyawan**: Menyimpan informasi karyawan termasuk foto wajah untuk proses pelatihan model.
- **Laporan Kehadiran**: Menghasilkan laporan kehadiran harian, mingguan, dan bulanan.

## Teknologi yang Digunakan

- Python
- OpenCV
- dlib
- Face_recognition library
- SQLite (atau database lain yang diinginkan)
- Flask (opsional, untuk antarmuka web)

## Instalasi

1. **Clone repository ini**:

    ```bash
    git clone https://github.com/username/repo-name.git
    cd repo-name
    ```

2. **Buat environment virtual dan aktifkan**:

    ```bash
    python -m venv env
    source env/bin/activate  # untuk Linux/macOS
    .\env\Scripts\activate   # untuk Windows
    ```

3. **Instal dependensi**:

    ```bash
    pip install -r requirements.txt
    ```

4. **Persiapkan database**:

    ```bash
    python setup_database.py
    ```

5. **Jalankan aplikasi**:

    ```bash
    python main.py
    ```

## Penggunaan

1. **Menambahkan Karyawan**: Tambahkan data karyawan termasuk foto wajah mereka ke dalam database.
2. **Mulai Pengenalan Wajah**: Jalankan aplikasi dan arahkan kamera ke wajah karyawan untuk mencatat kehadiran mereka.
3. **Lihat Laporan**: Lihat laporan kehadiran melalui antarmuka yang disediakan atau akses langsung ke database.

## Struktur Proyek

```plaintext
.
├── README.md
├── requirements.txt
├── main.py
├── setup_database.py
├── models
│   ├── face_recognition_model.dat
│   └── ...
├── static
│   ├── css
│   ├── js
│   └── images
├── templates
│   ├── index.html
│   └── ...
├── data
│   ├── employees.db
│   └── ...
└── utils
    ├── face_recognition.py
    └── ...
