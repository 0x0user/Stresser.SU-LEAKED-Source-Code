import CaptchaReducer from "./Captcha/reducer";
import CSRFReducer from "./CSRF/reducer";
import RefreshJWTReducer from "./JWT/reducer";
import ViewRequestLoadReducer from "./ViewRequestLoad/reducer";
import { loadingBarReducer } from "react-redux-loading-bar";
import SubmitRequestReducer from "./SubmitRequest/reducer";
import ModalRequestLoadReducer from "./ModalRequestLoad/reducer";
import ChatReducer from "./Chat/reducer";
import NotificationRequestLoadReducer from "./NotificationRequestLoad/reducer";

export const RootReducer = () => ({
  loadingBar: loadingBarReducer,

  submit: SubmitRequestReducer,

  captcha: CaptchaReducer,

  csrf: CSRFReducer,

  chat: ChatReducer,

  jwt: RefreshJWTReducer,

  view: ViewRequestLoadReducer,

  modal: ModalRequestLoadReducer,

  notif: NotificationRequestLoadReducer,
});
