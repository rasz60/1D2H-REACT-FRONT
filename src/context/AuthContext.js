import axiosInstance from "@src/utils/axiosInstance";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [authLv, setAuthLv] = useState(null);
  const [loginUserId, setLoginUserId] = useState(null);
  const navigator = useNavigate();
  const location = useLocation();
  const [logout, setLogout] = useState(false);

  // 최초 접근 시 token 체크
  useEffect(() => {
    tokenValid();
  }, []);

  // token 인증
  const tokenValid = async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      const token = res.data.token;
      localStorage.removeItem("1d2h-access-token");
      if (token) {
        localStorage.setItem("1d2h-access-token", token);
        setIsAuthenticated(true);
        setAuthLv(res.data.auth);
        setLoginUserId(res.data.userId);
      } else {
        setIsAuthenticated(false);
        setAuthLv(1);
        setLoginUserId(null);
      }
    } catch (err) {
      setIsAuthenticated(false);
      setAuthLv(1);
      setLoginUserId(null);
    }
  };

  // Router 변경 감지
  useEffect(() => {
    tokenValid();
  }, [location]);

  // login 완료 후 처리
  const loginCallback = (res) => {
    localStorage.setItem("1d2h-access-token", res.token);
    setIsAuthenticated(true);
    setAuthLv(res.auth);
    setLoginUserId(res.userId);
  };

  // logout 완료 후 처리
  const logoutCallback = () => {
    setLogout(true);
    localStorage.removeItem("1d2h-access-token");
    setIsAuthenticated(false);
    setAuthLv(1);
    setLoginUserId(null);
    navigator("/");
  };

  useEffect(() => {
    if (logout) {
      // 한 번 리디렉션 후 플래그 초기화
      setTimeout(() => setLogout(false), 500); // 혹은 바로 false로 바꿔도 OK
    }
  }, [logout]);

  // login 여부 조회
  const getIsAuthentication = () => {
    return isAuthenticated;
  };

  // Role 조회
  const getAuthLv = () => {
    return authLv;
  };

  // userId 조회
  const getLoginUserId = () => {
    return loginUserId;
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        authLv,
        logout,
        loginCallback,
        logoutCallback,
        getIsAuthentication,
        getAuthLv,
        getLoginUserId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
