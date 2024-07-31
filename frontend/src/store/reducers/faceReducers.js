// faceReducers.js
const initialState = {
    faces: [],
    loading: false,
    error: null,
};

// Action Types
const ADD_FACE = 'ADD_FACE';
const REMOVE_FACE = 'REMOVE_FACE';
const SET_LOADING = 'SET_LOADING';
const SET_ERROR = 'SET_ERROR';

// Reducer Function
const faceReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_FACE:
            return {
                ...state,
                faces: [...state.faces, action.payload],
            };
        case REMOVE_FACE:
            return {
                ...state,
                faces: state.faces.filter(face => face.id !== action.payload.id),
            };
        case SET_LOADING:
            return {
                ...state,
                loading: action.payload,
            };
        case SET_ERROR:
            return {
                ...state,
                error: action.payload,
            };
        default:
            return state;
    }
};

// Action Creators
export const addFace = (face) => ({
    type: ADD_FACE,
    payload: face,
});

export const removeFace = (id) => ({
    type: REMOVE_FACE,
    payload: { id },
});

export const setLoading = (isLoading) => ({
    type: SET_LOADING,
    payload: isLoading,
});

export const setError = (error) => ({
    type: SET_ERROR,
    payload: error,
});

// Export the reducer
export default faceReducer;

