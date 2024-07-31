// attendanceReducer.js

const initialState = {
    attendanceList: [],
    loading: false,
    error: null,
};

const attendanceReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_ATTENDANCE_REQUEST':
            return {
                ...state,
                loading: true,
                error: null,
            };
        case 'FETCH_ATTENDANCE_SUCCESS':
            return {
                ...state,
                loading: false,
                attendanceList: action.payload,
            };
        case 'FETCH_ATTENDANCE_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case 'ADD_ATTENDANCE':
            return {
                ...state,
                attendanceList: [...state.attendanceList, action.payload],
            };
        case 'REMOVE_ATTENDANCE':
            return {
                ...state,
                attendanceList: state.attendanceList.filter(attendance => attendance.id !== action.payload.id),
            };
        default:
            return state;
    }
};

export default attendanceReducer;

