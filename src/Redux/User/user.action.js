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
  SAVE_POST_REQUEST,
  SAVE_POST_SUCCESS,
  SAVE_POST_FAILURE,
  FETCH_SAVED_POSTS_REQUEST,
  FETCH_SAVED_POSTS_SUCCESS,
  FETCH_SAVED_POSTS_FAILURE,
  FOLLOW_USER_REQUEST,
  FOLLOW_USER_SUCCESS,
  FOLLOW_USER_FAILURE,
  UNFOLLOW_USER_REQUEST,
  UNFOLLOW_USER_SUCCESS,
  UNFOLLOW_USER_FAILURE,
} from './user.types';
import { api, API_BASE_URL } from '../../config/api';


export const fetchUserProfileAction = (id) => async (dispatch) => {
  dispatch({ type: FETCH_USER_PROFILE_REQUEST });
  try {
    const response = await api.get(`/api/users/${id}`);
    dispatch({
      type: FETCH_USER_PROFILE_SUCCESS,
      payload: response.data,
    });
    console.log('other user profile ---', response.data);
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
    console.log('my profile ---', data);
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

export const savePostAction = (postId) => async (dispatch) => {
  dispatch({ type: SAVE_POST_REQUEST })
  try {
      const { data } = await api.post(`/api/users/save/${postId}`)
      dispatch({ type: SAVE_POST_SUCCESS, payload: data })
      console.log("handle save or unsave post ", data)
  } catch (error) {
      console.log("error ", error)
      dispatch({ type: SAVE_POST_FAILURE, payload: error })
  }
}

export const getSavedPostsAction = (userId) => async (dispatch) => {
  dispatch({ type: FETCH_SAVED_POSTS_REQUEST });
  try {
    const { data } = await api.get(`/api/users/save/${userId}`);

    dispatch({ type: FETCH_SAVED_POSTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_SAVED_POSTS_FAILURE,
      payload: error.response?.data || 'Failed to fetch saved posts',
    });
  }
};

export const followUserAction = (userId) => async (dispatch) => {
  dispatch({ type: FOLLOW_USER_REQUEST });
  try {
    const { data } = await api.post(`/api/users/follow/${userId}`);
    dispatch({ type: FOLLOW_USER_SUCCESS, payload: data });
    console.log("Followed user successfully:", data);
  } catch (error) {
    console.error("Error following user:", error);
    dispatch({
      type: FOLLOW_USER_FAILURE,
      payload: error.response?.data?.message || "Failed to follow user.",
    });
  }
};

export const unfollowUserAction = (userId) => async (dispatch) => {
  dispatch({ type: UNFOLLOW_USER_REQUEST });
  try {
    const { data } = await api.post(`/api/users/unfollow/${userId}`);
    dispatch({ type: UNFOLLOW_USER_SUCCESS, payload: data });
    console.log("Unfollowed user successfully:", data);
  } catch (error) {
    console.error("Error unfollowing user:", error);
    dispatch({
      type: UNFOLLOW_USER_FAILURE,
      payload: error.response?.data?.message || "Failed to unfollow user.",
    });
  }
};