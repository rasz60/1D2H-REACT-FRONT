import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";

// token 인증 실패 시, root path로 redirect 시키는 RouteGuard
const RouteGuard = ({ type }) => {
  const { isAuthenticated, authLv, logout } = useAuth();
  let msg = "";
  let location = useLocation();
  if (logout || location.pathname === "/") {
    return;
  }

  if (isAuthenticated != null && authLv != null) {
    if (isAuthenticated) {
      return <Outlet />;
    }
    msg = "로그인이 필요합니다.";

    if (authLv > type) {
      return <Outlet />;
    }
    msg = "권한이 없는 페이지입니다.";

    alert(msg);
    return <Navigate to="/" />;
  }
};

export default RouteGuard;
