import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";

import "../styles/Layout.scss";

function CheckToken() {
  const token = useSelector(selectCurrentToken);
  const location = useLocation();

  return token ? (
    <Navigate to="/user" state={{ from: location }} replace />
  ) : (
    <Outlet />
  );
}

export default CheckToken;
