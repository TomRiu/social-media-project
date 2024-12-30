import * as actionType from './message.actionType'

const initialState = {
    messages: [],
    chats: [],
    loading: false,
    error: null,
    message: null,
}

export const messageReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.CREATE_CHAT_REQUEST:
        case actionType.CREATE_MESSAGE_REQUEST:
        case actionType.GET_ALL_CHAT_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            }


        case actionType.CREATE_MESSAGE_SUCCESS:
            return {
                ...state,
                message: action.payload,
                loading: false,
                error: null
            }

        case actionType.CREATE_CHAT_SUCCESS:
            return {
                ...state,
                chats: [action.payload, ...state.chats],
                loading: false,
                error: null
            }

        case actionType.GET_ALL_CHAT_SUCCESS:
            return {
                ...state,
                chats: action.payload,
                loading: false,
                error: null
            }

        case actionType.CREATE_MESSAGE_FAILURE:
        case actionType.CREATE_CHAT_FAILURE:
        case actionType.GET_ALL_CHAT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        default:
            return state;
    }
}