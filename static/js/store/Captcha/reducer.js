import {
  GET_CAPTCHA_LOADED,
  GET_CAPTCHA_WAITING,
  GET_CAPTCHA_ERROR,
} from "./types";

const initState = {
  status: false,
  image: null,
};

const CaptchaReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_CAPTCHA_LOADED:
      return {
        ...state,
        status: true,
        image: action.image,
      };
    case GET_CAPTCHA_WAITING:
      return {
        ...state,
        status: false,
        image: "captcha",
      };
    case GET_CAPTCHA_ERROR:
      return {
        ...state,
        status: false,
        image: "error.captcha",
      };
    default:
      return state;
  }
};

export default CaptchaReducer;
