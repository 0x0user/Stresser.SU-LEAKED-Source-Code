import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { WebRoutes } from "./routes";
import { store } from "./CreateStore";
import { Provider } from "react-redux";
import { InitCSRF } from "./helpers/Cookie/InitCSRF";
import LoadingBar from "react-redux-loading-bar";
import ChatSupport from "./views/Support/Livechat";
import { UserLocal } from "./helpers/UserLocal";

function App() {
  const user = UserLocal.getPayload();
  return (
    <div className="app">
      <Provider store={store}>
        <header>
          <LoadingBar
            updateTime={10}
            maxProgress={95}
            style={{
              backgroundColor: "#d3ce00",
              height: "2px",
              position: "inherit",
            }}
          />
        </header>
        <ToastContainer
          theme="dark"
          position="top-center"
          autoClose={5000}
          limit={5}
          pauseOnFocusLoss={false}
          pauseOnHover={false}
        />
        <InitCSRF />
        {user !== null && <ChatSupport />}
        <WebRoutes />
      </Provider>
    </div>
  );
}

export default App;
