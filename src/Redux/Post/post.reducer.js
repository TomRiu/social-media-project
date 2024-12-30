import { CREATE_COMMENT_FAILURE, CREATE_COMMENT_REQUEST, CREATE_COMMENT_SUCCESS, LIKE_COMMENT_FAILURE, LIKE_COMMENT_REQUEST, LIKE_COMMENT_SUCCESS } from "../Comment/comment.actionType"
import { CREATE_POST_FAILURE, CREATE_POST_REQUEST, CREATE_POST_SUCCESS, GET_ALL_POST_FAILURE, GET_ALL_POST_REQUEST, GET_ALL_POST_SUCCESS, GET_USERS_POST_FAILURE, GET_USERS_POST_REQUEST, GET_USERS_POST_SUCCESS, LIKE_POST_FAILURE, LIKE_POST_REQUEST, LIKE_POST_SUCCESS, REPOST_FAILURE, REPOST_REQUEST, REPOST_SUCCESS } from "./post.actionType"

const initialState = {
    post: null,
    loading: false,
    error: null,
    posts: [],
    userPosts: [],
    like: null,
    comments: [],
    newComment: null,
    success: false,
}

export const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_POST_REQUEST:
        case GET_ALL_POST_REQUEST:
        case GET_USERS_POST_REQUEST:
        case LIKE_POST_REQUEST:
        case CREATE_COMMENT_REQUEST:
        case LIKE_COMMENT_REQUEST:
        case REPOST_REQUEST:
            return {
                ...state,
                error: null,
                loading: true
            }

        case CREATE_POST_SUCCESS:
            return {
                ...state,
                post: action.payload,
                posts: [action.payload, ...state.posts],
                loading: false,
                error: null
            }

        case GET_ALL_POST_SUCCESS:
            return {
                ...state,
                posts: action.payload,
                comments: action.payload.comments,
                loading: false,
                error: null
            }

        case GET_USERS_POST_SUCCESS:
            return {
                ...state,
                userPosts: action.payload,
                loading: false,
                error: null,
            };

        case LIKE_POST_SUCCESS:
            return {
                ...state,
                like: action.payload,
                posts: state.posts.map((item) => item.id === action.payload.id ? action.payload : item),
                userPosts: state.userPosts.map((item) =>
                    item.id === action.payload.id ? action.payload : item
                ),
                loading: false,
                error: null
            }

        case CREATE_COMMENT_SUCCESS:
            return {
                ...state,
                newComment: action.payload,
                loading: false,
                error: null
            }

        case LIKE_COMMENT_SUCCESS:
            return {

            }

        case REPOST_SUCCESS:
            return {
                ...state,
                loading: false,
                posts: [action.payload, ...state.posts],
                error: null,
                success: true,
            };

        case CREATE_POST_FAILURE:
        case GET_ALL_POST_FAILURE:
        case GET_USERS_POST_FAILURE:
        case LIKE_POST_FAILURE:
        case CREATE_COMMENT_FAILURE:
        case LIKE_COMMENT_FAILURE:
        case REPOST_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false
            }

        default:
            return state;
    }
}