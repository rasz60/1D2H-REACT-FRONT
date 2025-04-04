## Day10. Login, Logout 구현

#### 1. Login 구현

- 로그인 모달에서 입력한 내용으로 검증 결과에 따른 후처리
- 로그인 성공 시
  - return된 token을 client localStorage에 저장
  - 페이지를 root 경로로 redirect

#### 2. Authentication 상태 관리 context 추가

- /src/context/AuthContext.js 추가
- 최초 로드 시 localStorage token 보유 여부로 token, isAuthentication 변수 값 설정
- loginCallback(), logoutCallback(), getIsAuthentication() 함수 제공
  - loginCallback : LoginModal에서 로그인 성공 시, 호출하여 token을 localstorage 저장, token, isAuthentication 변수 값 설정
  - logoutCallback : Header 로그아웃 버튼 클릭 시, confirm 창 true일 때 호출, token 삭제 및 token, isAuthentication 변수 값 변경
  - getIsAuthentication : isAuthentication 값을 리턴
- App.js 에서 import 후 provider 로 Router 감싸줌 (\* 이 부분 공부 필요..)
- Components 에서 AuthContext import하여 메서드 및 변수 사용
  - Header 에서 isAuthentication 변수 값에 따라 우측 '버튼' 영역에 노출되는 버튼 조정
  - Header 에서 로그아웃 confirm 창 true인 경우 logoutCallback 함수 호출
  - LoginModal 에서 로그인 성공 시 loginCallback 함수 호출

#### 3. Axios 전역 설정

- axios 객체 기본 설정 파일 추가 (/src/utils/axiosInstance.js)
- axios 호출 시 기본 URL 설정 (/api)
- inteceptor 활용하여 localStorage에 있는 token 값을 Http request Header에 추가
- 각 Components에서 axiosInstance 파일을 import하여 axios 호출

#### 4. Logout 구현

- isAuthentication 값이 true 일 때, 로그아웃 버튼 노출
- 버튼 클릭 시 confirm 창 호출하여 로그아웃 여부 재확인
- 로그아웃 시 logoutCallback() 호출하여 토큰 및 authContext 변수 값 변경
- '/'로 리다렉트 처리

#### 5. 자식 창 변수 전달 (props)

- 전체 화면에서 scroll 발생 시, 헤더 메뉴 배경색 삭제
- App.js에서 document.addEventListener("scroll") 로 스크롤 발생 시 이벤트 추가
- 이벤트 발생 시, isScroll 변수 값 변경
- Header Component에 props 값으로 isScroll 값 전달

```
.
.
.

const App = () => {
  const [isScroll, setIsScroll] = useState(
    document.scrollingElement.scrollTop > 0
  );

  const handleScroll = () => {
    setIsScroll(document.scrollingElement.scrollTop > 0);
  };

  document.addEventListener("scroll", handleScroll);

  return (
    <AuthProvider>
      <Router>
        <Container id="container" maxWidth="xxl">
          <Header isScroll={isScroll} /> <!-- props isScroll 추가 -->
          <Main />
        </Container>
      </Router>
    </AuthProvider>
  );
};

export default App;

```

- Header Component 선언 시 parameter 받아오게 설정

```
.
.
.

const Header = ({ isScroll }) => { // 변수로 isScroll 가져옴
  .
  .
  .
  return (
    <AppBar id="header-wrapper" position="static" color="secondary">
      <Toolbar id="header" className={isScroll ? "scrolled" : "notScrolled"}> <!-- isScroll 값에 따라 클래스명 부여 -->
.
.
.
```

#### 6. 테스트

- Login
  - 성공
    - localStorage token 값 생성
    - Root URL 페이지 Redirect
    - 유저 정보, 로그아웃 버튼 출력, 로그인 버튼 숨김
  - 실패
    - 오류 메시지 alert 출력
- Logout
  - confirm 창으로 로그아웃 여부 재확인
    - 확인 : localStorage token 삭제, RootURL 페이지 Redirect
    - 취소 : 사용 중인 화면으로 돌아감
- Axios

  - axiosInstance를 통해 API 호출 시, Authorization Bearer ${token} 헤더에 추가

- Scroll
  - 페이지 스크롤 발생 시 높이가 0보다 크면 배경색 없음, 0이면 배경색 부여
