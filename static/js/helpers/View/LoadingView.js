import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { SHOW_VIEW_CLEAN_STATE } from "../../store/ViewRequestLoad/types";
import { useNavigate } from "react-router";
import Notif from "../Alert/Notif";
import { SUBMIT_REQUEST_CLEAN_STATE } from "../../store/SubmitRequest/types";

export default function LoadingView(
  action,
  values = null,
  errorRedirect = null
) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const viewData = useSelector((state) => state.view);

  const submitData = useSelector((state) => state.submit);

  const [items, setItem] = useState({
    response: null,
    error: false,
    name: null,
  });

  useEffect(() => {
    if (!submitData.error) return;
    Notif({ success: false, response: submitData.response });
    dispatch({ type: SUBMIT_REQUEST_CLEAN_STATE });
  }, [submitData, dispatch]);

  useEffect(() => {
    if (items.response || items.error) return;
    dispatch(action(values));
  }, [items, dispatch, action, values]);

  useEffect(() => {
    if (!viewData.loaded) return;
    setItem({
      response: viewData.data,
      error: viewData.error,
      name: viewData.name,
    });
    dispatch({ type: SHOW_VIEW_CLEAN_STATE });
  }, [viewData, dispatch]);

  useEffect(() => {
    if (!errorRedirect || !items.error) return;
    navigate(errorRedirect, { replace: true });
  }, [items, errorRedirect, navigate]);

  const isLoaded = (viewName) =>
    typeof items.response === "object" &&
    items.response !== null &&
    items.name === viewName;

  return {
    items: items.response,
    error: items.error,
    name: items.name,
    isLoaded: isLoaded,
    setItems: setItem,
  };
}
