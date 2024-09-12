import {
  SHOW_NOTIF_SUCCESS,
  SHOW_NOTIF_FAILED,
} from "../../store/NotificationRequestLoad/types";
import HttpService from "../../services/HttpService";

const ShowUserAnsweredTicketAction = () => {
  return (dispatch) => {
    const http = new HttpService();
    http.sendRequest("showTicketAnswered", "get").then((res) =>
      http.check(res, true)
        ? dispatch({
            type: SHOW_NOTIF_SUCCESS,
            response: res,
            name: "support",
          })
        : dispatch({ type: SHOW_NOTIF_FAILED })
    );
  };
};

export default ShowUserAnsweredTicketAction;
