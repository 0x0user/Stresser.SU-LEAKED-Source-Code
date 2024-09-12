import {
  GET_CSRF_TOKEN_SUCCESS,
  GET_CSRF_TOKEN_ERROR,
} from "../../../store/CSRF/types";
import HttpService from "../../../services/HttpService";

const CSRFTokenAction = () => {
  return (dispatch) => {
    const http = new HttpService();
    http.sendRequest("getCSRFToken", "get").then((res) => {
      http.check(res, true)
        ? dispatch({ type: GET_CSRF_TOKEN_SUCCESS })
        : dispatch({ type: GET_CSRF_TOKEN_ERROR });
    });
  };
};

export default CSRFTokenAction;
