import {
  SUBMIT_REQUEST_SUCCESS,
  SUBMIT_REQUEST_FAILED,
} from "../../store/SubmitRequest/types";
import HttpService from "../../services/HttpService";
import { showLoading, hideLoading } from "react-redux-loading-bar";

export const LOGOUT_ACTION = "LOGOUT_ACTION";

const LogoutAction = () => {
  return (dispatch) => {
    dispatch(showLoading());
    const http = new HttpService();
    http.sendRequest("auth/logout", "post").then((res) => {
      http.check(res)
        ? dispatch({
            type: SUBMIT_REQUEST_SUCCESS,
            response: res,
            name: LOGOUT_ACTION,
          })
        : dispatch({ type: SUBMIT_REQUEST_FAILED });
      dispatch(hideLoading());
    });
  };
};

export default LogoutAction;
