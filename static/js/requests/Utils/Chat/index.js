import {
  GET_CHAT_TOKEN_ERROR,
  GET_CHAT_TOKEN_SUCCESS,
} from "../../../store/Chat/types";
import HttpService from "../../../services/HttpService";

const ChatTokenAction = () => {
  return (dispatch) => {
    const http = new HttpService();
    http.sendRequest(`getChatToken`, "get").then((res) => {
      http.check(res, true)
        ? dispatch({ type: GET_CHAT_TOKEN_SUCCESS, response: res })
        : dispatch({ type: GET_CHAT_TOKEN_ERROR });
    });
  };
};

export default ChatTokenAction;
