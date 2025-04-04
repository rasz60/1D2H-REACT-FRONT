import React, { createContext, useContext, useState, useEffect } from "react";

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

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        token,
        loginCallback,
        logoutCallback,
        getIsAuthentication,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
