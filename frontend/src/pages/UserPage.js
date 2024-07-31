import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserPage = () => {
    const [userImage, setUserImage] = useState(null);
    const [attendanceStatus, setAttendanceStatus] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Check user authentication or redirect
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        }
    }, [navigate]);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUserImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAttendance = async () => {
        if (userImage) {
            try {
                const response = await axios.post('http://localhost:5000/api/attendance', { image: userImage });
                setAttendanceStatus(response.data.message);
            } catch (error) {
                console.error('Error during attendance:', error);
                setAttendanceStatus('Failed to mark attendance.');
            }
        } else {
            setAttendanceStatus('Please upload your image first.');
        }
    };

    return (
        <div className="user-page">
            <h1>Face Recognition Attendance System</h1>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            <button onClick={handleAttendance}>Mark Attendance</button>
            {attendanceStatus && <p>{attendanceStatus}</p>}
            {userImage && <img src={userImage} alt="User" style={{ width: '200px', height: 'auto' }} />}
        </div>
    );
};

export default UserPage;

