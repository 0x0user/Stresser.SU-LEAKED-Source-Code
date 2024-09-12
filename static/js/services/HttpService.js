import axios from "axios";
import { Encrypt } from "./JWE/HttpEncrypt";

const endpoint_path = "/request/";

const endpoint_url = `https://${window.location.hostname}${endpoint_path}`;

class HttpService {
  getHeader = (type = "application/json") => {
    return {
      "Content-Type": type,
      "Cache-Control": "no-cache",
      Pragma: "no-cache",
      Expires: 0,
      "X-Requested-With": "XMLHttpRequest",
    };
  };

  RequestOptions = async (method, items, encapsuleJWE) => {
    let requestOptions = {
      method: method,
      withCredentials: true,
      headers: this.getHeader(),
    };

    if (items !== null) {
      switch (encapsuleJWE) {
        case true:
          let encryptedJWE = await Encrypt(items);
          requestOptions = {
            ...requestOptions,
            data: {
              JWE: encryptedJWE,
            },
          };
          break;
        default:
          requestOptions = {
            ...requestOptions,
            data: JSON.stringify(items),
          };
          break;
      }
    }

    return requestOptions;
  };

  check = (response, required_success = false) => {
    try {
      var obj = JSON.parse(JSON.stringify(response));
      if (obj && typeof obj === "object") {
        if (required_success) {
          return obj.success;
        }
        return true;
      }
      throw new Error("Invalid Endpoint Response.");
    } catch (e) {
      return false;
    }
  };

  sendRequest = async (path, method, items = null, encapsuleJWE = true) => {
    try {
      const request = await this.RequestOptions(method, items, encapsuleJWE);
      const request_type = method === "get" ? "view/" : "action/";
      const response = await axios({
        baseURL: endpoint_url + request_type,
        url: path,
        responseType: "json",
        timeout: 15000,
        ...request,
      });
      return response.data;
    } catch (err) {
      if (err.response) return err.response.data;
      return null;
    }
  };

  uploadFile = async (path, file) => {
    try {
      let formData = new FormData();
      formData.append("file", file);
      const response = await axios.post(
        `${endpoint_url}action/${path}`,
        formData,
        {
          headers: this.getHeader("multipart/form-data"),
          withCredentials: true,
        }
      );
      return response.data;
    } catch (err) {
      if (err.response) return err.response.data;
      return null;
    }
  };
}

export default HttpService;
