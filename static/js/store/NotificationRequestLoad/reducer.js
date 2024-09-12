import {
  SHOW_NOTIF_CLEAN_STATE,
  SHOW_NOTIF_FAILED,
  SHOW_NOTIF_SUCCESS,
} from "./types";

const initState = {
  data: null,
  name: null,
  loaded: false,
};

const NotificationRequestLoadReducer = (state = initState, action) => {
  switch (action.type) {
    case SHOW_NOTIF_SUCCESS:
      return {
        ...state,
        data: action.response,
        name: action.name,
        loaded: true,
      };
    case SHOW_NOTIF_FAILED:
      return {
        ...state,
        data: null,
        name: null,
        loaded: true,
      };
    case SHOW_NOTIF_CLEAN_STATE:
      return {
        ...state,
        data: null,
        name: null,
        loaded: false,
      };
    default:
      return state;
  }
};

export default NotificationRequestLoadReducer;
