# DAY19. Refresh Token 추가 & 권한 확인 구현

#### 1. Router 변환 시마다 token 검증

```
AuthContext.js


import axiosInstance from "@src/utils/axiosInstance";
import React, { createContext, useContext, useState, useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [authLv, setAuthLv] = useState(null);
  const location = useLocation();

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
      } else {
        setIsAuthenticated(false);
        setAuthLv(1);
      }
    } catch (err) {
      setIsAuthenticated(false);
      setAuthLv(1);
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
  };

  // logout 완료 후 처리
  const logoutCallback = () => {
    localStorage.removeItem("1d2h-access-token");
    setIsAuthenticated(false);
    setAuthLv(1);
  };

  // login 여부 조회
  const getIsAuthentication = () => {
    return isAuthenticated;
  };

  // Role 조회
  const getAuthLv = () => {
    return authLv;
  };

  // token 인증 실패 시, root path로 redirect 시키는 RouteGuard
  const RouteGuard = ({ type }) => {
    const { isAuthenticated, authLv } = useAuth();
    let msg = "";
    if (isAuthenticated != null && authLv != null) {
      if (isAuthenticated) {
        return <Outlet />;
      }
      msg = "로그인이 필요합니다.";

      if (!msg) {
        if (authLv > type) {
          return <Outlet />;
        }
        msg = "권한이 없는 페이지입니다.";
      }
      alert(msg);
      return <Navigate to="/" />;
    }
  };
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        authLv,
        loginCallback,
        logoutCallback,
        getIsAuthentication,
        getAuthLv,
        RouteGuard,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

```

① authLv 추가 관리

- /api/auth/login, /api/auth/check 결과로 return되는 authLv을 state로 저장
- 해당 authLv로 메뉴, Route 접근 권한 확인
- loginCallback, logoutCallback, RouteGuard에서 authLv 설정 로직 추가

② /api/auth/check API 호출 로직 추가

- 최초 접근 시와 Router 변화 시 /api/auth/check API 호출
- access token을 검증 후 다시 localstorage에 저장함
- 유효하지 않을 때는 root path로 redirect

③ RouteGuard 오류 수정

- URL로 RouteGuard 페이지 접근 시, isAuthenticated, authLv 이 설정되지 않은 채로 먼저 접근됨
- 그 다음 Router 변화가 감지되어 다시 RouteGuard 로직 수행
- isAuthenticated, authLv 초기 값을 null로 설정하고 null일 때는 로직 수행하지 않도록 변경

#### 2. RouteGuard 관련 변경

- AuthContext에서 설정한 RouteGuard가 App.js에서 BrowserRoutes 밖에 선언되어 Routes hook 밖에 Route를 쓸 수 없다는 오류 발생
- BrowserRouter 위치 변경

```
App.js

.
.
.
  return (
    <BrowserRouter>
      <AuthProvider>
        <Container id="container" maxWidth="xxl">
          <Header isScroll={isScroll} />
          <Main />
        </Container>
      </AuthProvider>
    </BrowserRouter>
  );
};
.
.
.
```
