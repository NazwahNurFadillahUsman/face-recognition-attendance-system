// userActions.js
import axios from 'axios';

// URL API untuk backend
const API_URL = 'http://localhost:5000/api/users'; // Ganti dengan URL backend yang sesuai

// Fungsi untuk login pengguna
export const loginUser = (username, password) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(`${API_URL}/login`, {
                username,
                password,
            });
            dispatch({ type: 'LOGIN_SUCCESS', payload: response.data });
        } catch (error) {
            dispatch({ type: 'LOGIN_FAILURE', payload: error.message });
        }
    };
};

// Fungsi untuk logout pengguna
export const logoutUser = () => {
    return (dispatch) => {
        dispatch({ type: 'LOGOUT' });
    };
};

// Fungsi untuk mengambil data pengguna
export const fetchUserData = (userId) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${API_URL}/${userId}`);
            dispatch({ type: 'FETCH_USER_DATA_SUCCESS', payload: response.data });
        } catch (error) {
            dispatch({ type: 'FETCH_USER_DATA_FAILURE', payload: error.message });
        }
    };
};

// Fungsi untuk mendaftar pengguna baru
export const registerUser = (userData) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(`${API_URL}/register`, userData);
            dispatch({ type: 'REGISTER_SUCCESS', payload: response.data });
        } catch (error) {
            dispatch({ type: 'REGISTER_FAILURE', payload: error.message });
        }
    };
};

