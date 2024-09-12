import thunk from "redux-thunk";
import { RequestInterceptor, ResponseInterceptor } from "./services/HttpInterceptor";
import { RootReducer } from "./store/RootReducer";
import { configureStore } from "@reduxjs/toolkit";
import { loadingBarMiddleware } from "react-redux-loading-bar"

const preloadedState = {};

export const store = configureStore({
    middleware: [thunk, loadingBarMiddleware()],
    reducer: RootReducer(),
    preloadedState
})

RequestInterceptor(store);
ResponseInterceptor(store);