let define = (payload) => {
  localStorage.setItem("user", JSON.stringify(payload));
};

let getPayload = () => {
  let data = localStorage.getItem("user");
  try {
    let parsed = JSON.parse(data);
    return parsed;
  } catch (e) {
    logout();
    return null;
  }
};

let get = (path) => {
  let data = getPayload();
    return !data
    ? null
    : path.split(".").reduce(function (prev, curr) {
        return prev ? prev[curr] : null;
      }, data || self);
};

let logout = () => {
  localStorage.clear();
};

export const UserLocal = {
  define,
  get,
  getPayload,
  logout,
};
