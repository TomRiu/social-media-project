import { api } from "../../config/api"
import { CREATE_COMMENT_FAILURE, CREATE_COMMENT_REQUEST, CREATE_COMMENT_SUCCESS, LIKE_COMMENT_FAILURE, LIKE_COMMENT_REQUEST, LIKE_COMMENT_SUCCESS } from "./comment.actionType"

export const createCommentAction = (reqData) => async (dispatch) => {
    dispatch({ type: CREATE_COMMENT_REQUEST })
    try {
        const { data } = await api.post(`/api/comments/post/${reqData.postId}`, reqData.data)
        dispatch({ type: CREATE_COMMENT_SUCCESS, payload: data })
        console.log("created comment ", data)
    } catch (error) {
        console.log("error ", error)
        dispatch({ type: CREATE_COMMENT_FAILURE, payload: error })
    }
}

export const likeCommentAction = (commentId) => async (dispatch) => {
    dispatch({ type: LIKE_COMMENT_REQUEST })
    try {
        const { data } = await api.post(`/api/comments/like/${commentId}`)
        dispatch({ type: LIKE_COMMENT_SUCCESS, payload: data })
        console.log("liked comment ", data)
    } catch (error) {
        console.log("error ", error)
        dispatch({ type: LIKE_COMMENT_FAILURE, payload: error })
    }
}