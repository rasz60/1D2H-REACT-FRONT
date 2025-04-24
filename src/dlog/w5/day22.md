# DAY22. DevLog Entity 설계

#### 1. DevLog 화면 구현

- Main.jsx DevLog Router 추가
- DevLog.jsx 퍼블리싱 화면 구현
  - Accordion Component 활용 시리즈 리스트 출력
  - 클릭 시 상세 게시물 리스트 출력

#### 2. 오류 수정

- 권한이 필요한 화면에서 로그아웃 시, 로그인이 필요합니다 팝업 호출되는 이슈
- AuthContext에 logout state 추가
- logoutCallback() 함수에서 setLogout(true)로 변경
- useEffect 활용하여 logout 변경 감지하여 true 일 때, 500ms 후 false로 바꾸도록 구현
- 권한이 필요한 화면에 사용하는 RouteGuard에서 logout 이 true 일 때는 /api/auth/check 호출 하지 않도록 수정

```
AuthContext.js

.
.
.
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
.
.
.
  // token 인증 실패 시, root path로 redirect 시키는 RouteGuard
  const RouteGuard = ({ type }) => {
    const { isAuthenticated, authLv, logout } = useAuth();
    let msg = "";
    if (logout || location.pathname === "/") {
      return;
    }

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
.
.
.
```
