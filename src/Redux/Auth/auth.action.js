import axios from "axios"
import { api, API_BASE_URL } from "../../config/api"
import { FORGOT_PASSWORD_FAILURE, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, GET_PROFILE_FAILURE, GET_PROFILE_REQUEST, GET_PROFILE_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS, RESET_AUTH, RESET_PASSWORD_FAILURE, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, SEARCH_USER_FAILURE, SEARCH_USER_REQUEST, SEARCH_USER_SUCCESS, UPDATE_PROFILE_FAILURE, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS } from "./auth.actionType";

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

export const getProfileAction = (jwt) => async (dispatch) => {
    dispatch({ type: GET_PROFILE_REQUEST })
    try {
        const { data } = await axios.get(`${API_BASE_URL}/api/users/profile`, {
            headers: {
                "Authorization": `Bearer ${jwt}`
            }
        })


        dispatch({ type: GET_PROFILE_SUCCESS, payload: data })
        console.log("profile ---", data)

    } catch (error) {
        console.log("-----", error)
        dispatch({ type: GET_PROFILE_FAILURE, payload: error })
    }
}

export const updateProfileAction = (reqData) => async (dispatch) => {
    dispatch({ type: UPDATE_PROFILE_REQUEST })
    try {
        const { data } = await api.put(`${API_BASE_URL}/api/users`, reqData)


        dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data })
        console.log("update profile ---", data)

    } catch (error) {
        console.log("-----", error)
        dispatch({ type: UPDATE_PROFILE_FAILURE, payload: error })
    }
}

export const searchUser = (query) => async (dispatch) => {
    dispatch({ type: SEARCH_USER_REQUEST })
    try {
        const { data } = await api.get(`/api/users/search?query=${query}`)
        dispatch({ type: SEARCH_USER_SUCCESS, payload: data })
        console.log("search user ---", data)

    } catch (error) {
        console.log("-----", error)
        dispatch({ type: SEARCH_USER_FAILURE, payload: error })
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
            payload: response.data.message
        });
    } catch (error) {
        dispatch({
            type: FORGOT_PASSWORD_FAILURE,
            payload: error.response?.data?.message || 'An error occurred.'
        });
    }
}

export const resetPassword = (token, newPassword) => async (dispatch) => {
    dispatch({ type: RESET_PASSWORD_REQUEST });
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/reset-password`, { token, newPassword });
        dispatch({
            type: RESET_PASSWORD_SUCCESS,
            payload: response.data.message
        });
    } catch (error) {
        dispatch({
            type: RESET_PASSWORD_FAILURE,
            payload: error.response?.data?.message || 'An error occurred.'
        });
    }
}