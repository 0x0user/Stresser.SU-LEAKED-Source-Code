import {
  GET_CHAT_TOKEN_SUCCESS,
  GET_CHAT_TOKEN_ERROR,
  CHAT_TOKEN_CLEAR_STATE,
} from "./types";

const initState = {
  loaded: false,
  response: null,
};

const ChatReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_CHAT_TOKEN_SUCCESS:
      return {
        ...state,
        loaded: true,
        response: action.response,
      };
    case GET_CHAT_TOKEN_ERROR:
      return {
        ...state,
        loaded: true,
        response: null,
      };
    case CHAT_TOKEN_CLEAR_STATE:
      return {
        ...state,
        loaded: false,
        response: null,
      };
    default:
      return state;
  }
};

export default ChatReducer;
