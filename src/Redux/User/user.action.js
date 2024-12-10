// src/Redux/User/user.action.js

import axios from 'axios';
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
import { api, API_BASE_URL } from '../../config/api';


export const fetchUserProfileAction = (id) => async (dispatch) => {
  dispatch({ type: FETCH_USER_PROFILE_REQUEST });
  try {
    const response = await axios.get(`/api/users/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
    });
    dispatch({
      type: FETCH_USER_PROFILE_SUCCESS,
      payload: response.data,
    });
    console.log('user profile ---', response.data);
  } catch (error) {
    dispatch({
      type: FETCH_USER_PROFILE_FAILURE,
      payload: error.response?.data?.message || 'Failed to fetch user profile.',
    });
  }
};

export const getProfileAction = (jwt) => async (dispatch) => {
  dispatch({ type: GET_PROFILE_REQUEST });
  try {
    const { data } = await axios.get(`${API_BASE_URL}/api/users/profile`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    dispatch({ type: GET_PROFILE_SUCCESS, payload: data });
    console.log('profile ---', data);
  } catch (error) {
    console.log('-----', error);
    dispatch({ type: GET_PROFILE_FAILURE, payload: error.message });
  }
};

export const updateProfileAction = (reqData) => async (dispatch) => {
  dispatch({ type: UPDATE_PROFILE_REQUEST });
  try {
    const jwt = localStorage.getItem('jwt'); // Ensure JWT is retrieved correctly
    const { data } = await axios.put(`${API_BASE_URL}/api/users`, reqData, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data });
    console.log('update profile ---', data);
  } catch (error) {
    console.log('-----', error);
    dispatch({ type: UPDATE_PROFILE_FAILURE, payload: error.message });
  }
};

export const searchUser = (query) => async (dispatch) => {
  dispatch({ type: SEARCH_USER_REQUEST });
  try {
    const jwt = localStorage.getItem('jwt'); // Ensure JWT is retrieved correctly
    const { data } = await axios.get(`${API_BASE_URL}/api/users/search?query=${query}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    dispatch({ type: SEARCH_USER_SUCCESS, payload: data });
    console.log('search user ---', data);
  } catch (error) {
    console.log('-----', error);
    dispatch({ type: SEARCH_USER_FAILURE, payload: error.message });
  }
};


// export const getProfileAction = (jwt) => async (dispatch) => {
//     dispatch({ type: GET_PROFILE_REQUEST })
//     try {
//         const { data } = await axios.get(`${API_BASE_URL}/api/users/profile`, {
//             headers: {
//                 "Authorization": `Bearer ${jwt}`
//             }
//         })


//         dispatch({ type: GET_PROFILE_SUCCESS, payload: data })
//         console.log("profile ---", data)

//     } catch (error) {
//         console.log("-----", error)
//         dispatch({ type: GET_PROFILE_FAILURE, payload: error })
//     }
// }

// export const updateProfileAction = (reqData) => async (dispatch) => {
//     dispatch({ type: UPDATE_PROFILE_REQUEST })
//     try {
//         const { data } = await api.put(`${API_BASE_URL}/api/users`, reqData)


//         dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data })
//         console.log("update profile ---", data)

//     } catch (error) {
//         console.log("-----", error)
//         dispatch({ type: UPDATE_PROFILE_FAILURE, payload: error })
//     }
// }

// export const searchUser = (query) => async (dispatch) => {
//     dispatch({ type: SEARCH_USER_REQUEST })
//     try {
//         const { data } = await api.get(`/api/users/search?query=${query}`)
//         dispatch({ type: SEARCH_USER_SUCCESS, payload: data })
//         console.log("search user ---", data)

//     } catch (error) {
//         console.log("-----", error)
//         dispatch({ type: SEARCH_USER_FAILURE, payload: error })
//     }
// }