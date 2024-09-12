import { UserLocal } from "./../UserLocal";
import { useDispatch, useSelector } from "react-redux";
import { JWT_CLEAN_STATE } from "../../store/JWT/types";
import { useEffect } from "react";

const AuthGuard = (props) => {
  const user = UserLocal.getPayload();
  const authRequired = props.login ?? false;
  const expired = useSelector((state) => state.jwt.expired);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!expired) return;
    dispatch({ type: JWT_CLEAN_STATE });
  }, [dispatch, expired]);

  switch (true) {
    case (authRequired && user === null) || (authRequired && expired):
      UserLocal.logout();
      window.location.replace("/login");
      return;

    case !authRequired && user !== null:
      window.location.replace("/home");
      return;

    default:
      return props.children;
  }
}

export default AuthGuard;