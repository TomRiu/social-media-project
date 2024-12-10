// src/Redux/User/user.reducer.js

import {
    GET_PROFILE_REQUEST,
    GET_PROFILE_SUCCESS,
    GET_PROFILE_FAILURE,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAILURE,
    SEARCH_USER_REQUEST,
    SEARCH_USER_SUCCESS,
    SEARCH_USER_FAILURE,
    FETCH_USER_PROFILE_REQUEST,
    FETCH_USER_PROFILE_SUCCESS,
    FETCH_USER_PROFILE_FAILURE,
} from './user.types';

const initialState = {
    profile: {
        loading: false,
        data: null,
        error: null,
    },
    search: {
        loading: false,
        results: [],
        error: null,
    },
    // Add other user-related state slices if necessary
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        // Get Profile
        case GET_PROFILE_REQUEST:
            return {
                ...state,
                profile: {
                    ...state.profile,
                    loading: true,
                    error: null,
                },
            };
        case GET_PROFILE_SUCCESS:
            return {
                ...state,
                profile: {
                    loading: false,
                    data: action.payload,
                    error: null,
                },
            };
        case GET_PROFILE_FAILURE:
            return {
                ...state,
                profile: {
                    loading: false,
                    data: null,
                    error: action.payload,
                },
            };

        // Update Profile
        case UPDATE_PROFILE_REQUEST:
            return {
                ...state,
                profile: {
                    ...state.profile,
                    loading: true,
                    error: null,
                },
            };
        case UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                profile: {
                    loading: false,
                    data: action.payload,
                    error: null,
                },
            };
        case UPDATE_PROFILE_FAILURE:
            return {
                ...state,
                profile: {
                    loading: false,
                    data: null,
                    error: action.payload,
                },
            };

        // Search User
        case SEARCH_USER_REQUEST:
            return {
                ...state,
                search: {
                    loading: true,
                    results: [],
                    error: null,
                },
            };
        case SEARCH_USER_SUCCESS:
            return {
                ...state,
                search: {
                    loading: false,
                    results: action.payload,
                    error: null,
                },
            };
        case SEARCH_USER_FAILURE:
            return {
                ...state,
                search: {
                    loading: false,
                    results: [],
                    error: action.payload,
                },
            };

        case FETCH_USER_PROFILE_REQUEST:
            return {
                ...state,
                profile: {
                    ...state.profile,
                    loading: true,
                    error: null,
                }
            };
        case FETCH_USER_PROFILE_SUCCESS:
            return {
                ...state,
                profile: {
                    loading: false,
                    data: action.payload,
                    error: null,
                }
            };
        case FETCH_USER_PROFILE_FAILURE:
            return {
                ...state,
                profile: {
                    loading: false,
                    data: null,
                    error: action.payload,
                }
            };

        // Default
        default:
            return state;
    }
};
