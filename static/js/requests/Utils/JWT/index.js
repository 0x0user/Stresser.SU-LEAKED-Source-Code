import {
  JWT_REFRESH_SUCCESS,
  JWT_REFRESH_ERROR,
} from "../../../store/JWT/types";
import HttpService from "../../../services/HttpService";
import { UserLocal } from "../../../helpers/UserLocal";

const RefreshJWTAction = () => {
  return (dispatch) => {
    const http = new HttpService();
    http.sendRequest("auth/refresh", "post").then((res) => {
      if (http.check(res, true)) {
        UserLocal.define(res.response);
        dispatch({ type: JWT_REFRESH_SUCCESS });
      } else {
        dispatch({ type: JWT_REFRESH_ERROR });
      }
    });
  };
};

export default RefreshJWTAction;
