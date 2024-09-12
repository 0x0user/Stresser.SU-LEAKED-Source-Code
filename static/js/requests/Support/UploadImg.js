import HttpService from "../../services/HttpService";
import {
  SUBMIT_REQUEST_FAILED,
  SUBMIT_REQUEST_SUCCESS,
} from "../../store/SubmitRequest/types";
import { showLoading, hideLoading } from "react-redux-loading-bar";

export const SUBMIT_UPLOAD_IMAGE = "SUBMIT_UPLOAD_IMAGE";

const UploadImageAction = (file) => {
  return (dispatch) => {
    const http = new HttpService();
    dispatch(showLoading());
    http.uploadFile(`support/upload`, file).then((res) => {
      http.check(res)
        ? dispatch({
            type: SUBMIT_REQUEST_SUCCESS,
            response: res,
            name: SUBMIT_UPLOAD_IMAGE,
          })
        : dispatch({ type: SUBMIT_REQUEST_FAILED });
      dispatch(hideLoading());
    });
  };
};

export default UploadImageAction;
