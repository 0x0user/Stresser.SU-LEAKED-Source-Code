import Toast from "./Toast";

const Notif = (res) => {
  let type = res.success ? "success" : "error";
  typeof res.response === "string"
    ? Toast(res.response, type)
    : Object.keys(res.response).map((keys, index) => {
        let messages = res.response[keys];
        type = res.success & (index === 0) ? "warning" : "error";
        typeof messages === "string"
          ? Toast(Object.values(messages), type)
          : Object.keys(messages).map((keys) => Toast(Object.values(messages[keys]), type));
      });
};

export default Notif;
