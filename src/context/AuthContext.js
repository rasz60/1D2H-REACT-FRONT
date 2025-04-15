import React, { createContext, useContext, useState, useEffect } from "react";
import { Route, Navigate, Outlet } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("1d2h-access-token");
    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);
    }
  }, []);

  // token 인증 실패 시, root path로 redirect 시키는 RouteGuard
  const RouteGuard = () => {
    const { isAuthenticated } = useAuth();

    if (isAuthenticated) {
      return <Outlet />;
    } else {
      alert("로그인이 필요합니다.");
      return <Navigate to="/" />;
    }
  };

  const tokenValid = async () => {
    // API 호출해서 token 검증 및 재발급 처리
  };

  // login 완료 후 처리
  const loginCallback = (token) => {
    localStorage.setItem("1d2h-access-token", token);
    setToken(token);
    setIsAuthenticated(true);
  };

  // logout 완료 후 처리
  const logoutCallback = () => {
    localStorage.removeItem("1d2h-access-token");
    setToken(null);
    setIsAuthenticated(false);
  };

  // login 여부 조회
  const getIsAuthentication = () => {
    return isAuthenticated;
  };

  // token 조회
  const getToken = () => {
    return token;
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        token,
        loginCallback,
        logoutCallback,
        getIsAuthentication,
        getToken,
        RouteGuard,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
