// attendanceActions.js

import { createAction } from '@reduxjs/toolkit';

// Action Types
export const SET_ATTENDANCE = 'SET_ATTENDANCE';
export const FETCH_ATTENDANCE_SUCCESS = 'FETCH_ATTENDANCE_SUCCESS';
export const FETCH_ATTENDANCE_ERROR = 'FETCH_ATTENDANCE_ERROR';

// Action Creators
export const setAttendance = createAction(SET_ATTENDANCE);
export const fetchAttendanceSuccess = createAction(FETCH_ATTENDANCE_SUCCESS);
export const fetchAttendanceError = createAction(FETCH_ATTENDANCE_ERROR);

// Async Action to fetch attendance data
export const fetchAttendance = () => {
  return async (dispatch) => {
    try {
      const response = await fetch('/api/attendance'); // Endpoint untuk mendapatkan data absensi
      const data = await response.json();

      dispatch(fetchAttendanceSuccess(data));
    } catch (error) {
      dispatch(fetchAttendanceError(error));
      console.error('Error fetching attendance:', error);
    }
  };
};

// Action to mark attendance using facial recognition
export const markAttendance = (userId) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`/api/attendance/mark/${userId}`, {
        method: 'POST',
      });
      
      if (response.ok) {
        const data = await response.json();
        dispatch(setAttendance(data));
      } else {
        throw new Error('Failed to mark attendance');
      }
    } catch (error) {
      console.error('Error marking attendance:', error);
    }
  };
};

