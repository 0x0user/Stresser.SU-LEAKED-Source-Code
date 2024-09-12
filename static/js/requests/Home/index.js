import {
  SHOW_VIEW_SUCCESS,
  SHOW_VIEW_FAILED,
} from "../../store/ViewRequestLoad/types";
import HttpService from "../../services/HttpService";

export const SHOW_HOME_VIEW = "SHOW_HOME_VIEW";

const ShowHomeAction = () => {
  return (dispatch) => {
    const http = new HttpService();
    http.sendRequest("home", "get").then((res) => {
      http.check(res, true)
        ? dispatch({
            type: SHOW_VIEW_SUCCESS,
            response: res,
            name: SHOW_HOME_VIEW,
          })
        : dispatch({ type: SHOW_VIEW_FAILED });
    });
  };
};

export default ShowHomeAction;
