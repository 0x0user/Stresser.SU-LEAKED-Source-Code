import axios from "axios";
import Toast from "../helpers/Alert/Toast";
import RefreshJWTAction from "../requests/Utils/JWT";
import { JWT_LOGOUT } from "../store/JWT/types";
import i18n from "../i18n";

export const RequestInterceptor = (store) =>
  axios.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

export const ResponseInterceptor = (store) => {
  return axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      const originalRequest = error.config;
      switch (true) {
        case error.response !== undefined:
          const statusCode = error.response.status;
          const response = error.response.data.response;
          const state = store.getState();
          switch (statusCode) {
            case 401:
			  if (originalRequest.url === "showTicketAnswered") {
                return Promise.reject(error);
              }
              if (
                response !== "Expired token" ||
                originalRequest.url === "auth/logout" ||
                originalRequest.url === "auth/refresh" ||
                state.jwt.expired
              ) {
                error.response.data = null;
                store.dispatch({ type: JWT_LOGOUT });
                return Promise.reject(error);
              }
              if (!originalRequest._jwt) store.dispatch(RefreshJWTAction());
              originalRequest._jwt = true;
              break;
            case 403:
              if (response !== "INVALID_HEADERS") return Promise.reject(error);
              if (!originalRequest.baseURL.includes("view/")) {
                error.response.data = null;
                Toast(i18n.t("error.csrf"), "error");
                return Promise.reject(error);
              }
              if (originalRequest._csrf) return Promise.reject(error);
              originalRequest._csrf = true;
              break;
            default:
              return Promise.reject(error);
          }
          return new Promise((resolve, reject) => {
            axios
              .request(originalRequest)
              .then((response) => {
                return resolve(response);
              })
              .catch((error) => {
                return reject(error);
              });
          });
        default:
          Toast(error.code + ": " + error.message, "error");
          console.log(error);
          return Promise.reject(error);
      }
    }
  );
};
