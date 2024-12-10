import { error } from "ajv/dist/vocabularies/applicator/dependencies";
import { FORGOT_PASSWORD_FAILURE, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, GET_PROFILE_FAILURE, GET_PROFILE_REQUEST, GET_PROFILE_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS, RESET_AUTH, RESET_PASSWORD_FAILURE, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, SEARCH_USER_FAILURE, SEARCH_USER_REQUEST, SEARCH_USER_SUCCESS, UPDATE_PROFILE_FAILURE, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS } from "./auth.actionType";
import { searchUser } from "./auth.action";

const initialState = {
    jwt: null,
    error: null,
    loading: false,
    user: null,
    searchUser: [],
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
        case REGISTER_REQUEST:
        case GET_PROFILE_REQUEST:
        case UPDATE_PROFILE_REQUEST:
        case SEARCH_USER_REQUEST:
            return { ...state, loading: true, error: null }

        case GET_PROFILE_SUCCESS:
        case UPDATE_PROFILE_SUCCESS:
            return { ...state, user: action.payload, error: null, loading: false }

        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            return { ...state, jwt: action.payload, loading: false, error: null }

        case SEARCH_USER_SUCCESS:
            return {
                ...state,
                searchUser: action.payload,
                loading: false,
                error: null
            }

        case LOGIN_FAILURE:
        case REGISTER_FAILURE:
        case GET_PROFILE_FAILURE:
        case UPDATE_PROFILE_FAILURE:
        case SEARCH_USER_FAILURE:
            return { ...state, loading: false, error: action.payload }

        case RESET_AUTH:
            return initialState;

        case FORGOT_PASSWORD_REQUEST:
        case RESET_PASSWORD_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                message: null
            }

        case FORGOT_PASSWORD_SUCCESS:
        case RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.payload
            }

        case FORGOT_PASSWORD_FAILURE:
        case RESET_PASSWORD_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        default:
            return state;
    }
}