import Notif from "../../helpers/Alert/Notif";
import {
  SUBMIT_REQUEST_CLEAN_STATE,
  SUBMIT_REQUEST_FAILED,
  SUBMIT_REQUEST_SUCCESS,
} from "./types";

const initState = {
  submitted: false,
  error: false,
  response: null,
  name: null,
};

const SubmitRequestReducer = (state = initState, action) => {
  switch (action.type) {
    case SUBMIT_REQUEST_SUCCESS:
      return {
        ...state,
        submitted: true,
        error: false,
        response: action.response,
        name: action.name ?? null,
      };
    case SUBMIT_REQUEST_FAILED:
      return {
        ...state,
        submitted: false,
        error: true,
        response: "An error has occurred, please retry.",
        name: null,
      };
    case SUBMIT_REQUEST_CLEAN_STATE:
      return {
        ...state,
        submitted: false,
        error: false,
        response: null,
        name: null,
      };
    default:
      return state;
  }
};

export default SubmitRequestReducer;
