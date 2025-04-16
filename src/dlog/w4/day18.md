# DAY18. Refresh Token 추가 구현

#### 1. Axios Response Interceptor 추가

- Axios Response Interceptor 추가
  - Axios Response에 'new-access-token'이 포함되어 있으면, localStorage에 저장하도록 로직 추가
  - 401 error 발생 시, alert 띄우고 root path로 redirect

```
axiosInstance.js

.
.
.
axiosInstance.interceptors.response.use(
  (response) => {
    const newAccessToken =
      response.headers["new-access-token"] || response.data.newAccessToken;
    if (newAccessToken) {
      localStorage.setItem("1d2h-access-token", newAccessToken);
    }

    return response; /* return해주지 않으면 실제 axios 호출한 component에서 response를 처리할 수 없음 */
  },
  (error) => {
    if (error.response.data.status === 401)
      alert(
        "로그인 유지 시간이 만료되었습니다. 다시 로그인해주세요.",
        function () {
          window.location.href = "/";
        }
      );

    return error;
  }
);
.
.
.
```

#### 2. 인증이 필요한 Route 처리

- Router 이동 시 인증이 필요한 페이지 접근 시 token validation 추가
- AuthContext.js 내에 RouteGuard 구현

```
.
.
.

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
.
.
.

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
```

- Main.jsx에서 React Route를 사용하여 화면 전환 시 인증 필요 화면인 경우, RouteGuard를 import해서 아래처럼 사용
  - 권한 체크가 완료되면 RouteGuard가 Outlet 훅으로 return
    - 그 안에 Route 페이지가 출력됨
  - 권한 체크 실패 시, Navigate가 return
    - alert로 안내메시지 출력 후 root 페이지로 이동

```
import { Routes, Route } from "react-router-dom";
import { useAuth } from "@context/AuthContext";
import Signup from "@compo/Signup";
import About from "@compo/about/about";
import SendMail from "@compo/about/sendmail";

const Main = () => {
  const { RouteGuard } = useAuth();

  return (
    <main id="main" role="main">
      <Routes>
        {/*-- 권한이 필요 없을 때, 일반 Route 사용 --*/}
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />

        {/*-- 권한이 필요한 페이지일 때, RouteGuard 사용 --*/}
        <Route path="/sendmail" element={<RouteGuard />}>
          <Route path="/sendmail" element={<SendMail />}/>
        </Route>
      </Routes>
    </main>
  );
};

export default Main;

```
