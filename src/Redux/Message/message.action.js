import { api } from "../../config/api"
import * as actionType from "./message.actionType"


export const createMessage = (reqData) => async (dispatch) => {
    dispatch({ type: actionType.CREATE_MESSAGE_REQUEST })
    try {
        const { data } = await api.post(`/api/messages/chat/${reqData.message.chatId}`, reqData.message);

        reqData.sendMessageToServer(data);

        dispatch({ type: actionType.CREATE_MESSAGE_SUCCESS, payload: data })
        console.log("created message ", data);
    } catch (error) {
        console.log("error creating message ", error)
        dispatch({ type: actionType.CREATE_MESSAGE_FAILURE, payload: error })
    }
}

export const createChat = (reqData) => async (dispatch) => {
    dispatch({ type: actionType.CREATE_CHAT_REQUEST })
    try {
        const { data } = await api.post(`/api/chats`, reqData);
        dispatch({ type: actionType.CREATE_CHAT_SUCCESS, payload: data })
        console.log("created chat ", data);
    } catch (error) {
        console.log("error creating chat ", error)
        dispatch({ type: actionType.CREATE_CHAT_FAILURE, payload: error })
    }
}

export const getAllChats = () => async (dispatch) => {
    dispatch({ type: actionType.GET_ALL_CHAT_REQUEST })
    try {
        const { data } = await api.get(`/api/chats`);
        dispatch({ type: actionType.GET_ALL_CHAT_SUCCESS, payload: data })
        console.log("get chat ", data);
    } catch (error) {
        console.log("error creating chat ", error)
        dispatch({ type: actionType.GET_ALL_CHAT_FAILURE, payload: error })
    }
}