import axios from "axios"
import { api, API_BASE_URL } from "../../config/api"
import { FORGOT_PASSWORD_FAILURE, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS, RESET_AUTH, RESET_PASSWORD_FAILURE, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS } from "./auth.actionType";

export const loginUserAction = (loginData) => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST })
    try {
        const { data } = await axios.post(`${API_BASE_URL}/auth/signin`, loginData.data)

        if (data.token) {
            localStorage.setItem('jwt', data.token);

        }

        dispatch({ type: LOGIN_SUCCESS, payload: data.token })
        console.log("login success ---", data);

    } catch (error) {
        console.log("-----", error)
        dispatch({ type: LOGIN_FAILURE, payload: error })
    }
}

export const registerUserAction = (registerData) => async (dispatch) => {
    dispatch({ type: REGISTER_REQUEST })
    try {
        const { data } = await axios.post(`${API_BASE_URL}/auth/signup`, registerData.data)

        if (data.token) {
            localStorage.setItem('jwt', data.token);
        }

        dispatch({ type: REGISTER_SUCCESS, payload: data.token })
        console.log("register success ---", data)

    } catch (error) {
        console.log("-----", error)
        dispatch({ type: REGISTER_FAILURE, payload: error })
    }
}

export const resetAuthAction = () => (dispatch) => {
    localStorage.removeItem('jwt');
    dispatch({ type: RESET_AUTH });
};

export const forgotPassword = (email) => async (dispatch) => {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/forgot-password`, { email });
        dispatch({
            type: FORGOT_PASSWORD_SUCCESS,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: FORGOT_PASSWORD_FAILURE,
            payload: error.response?.data || 'An error occurred.'
        });
    }
}

export const resetPassword = (token, newPassword) => async (dispatch) => {
    dispatch({ type: RESET_PASSWORD_REQUEST });
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/reset-password`, { token, newPassword });
        dispatch({
            type: RESET_PASSWORD_SUCCESS,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: RESET_PASSWORD_FAILURE,
            payload: error.response?.data || 'An error occurred.'
        });
    }
}