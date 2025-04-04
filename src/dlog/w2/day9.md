## Day9. Header 작업

#### 1. Menu, Login 버튼 클릭 시

- Menu, Login 버튼 클릭 시 마다 Backdrop toggle ( isBackdrop.open = !isBackdrop.open )
- Backdrop 위 클릭한 버튼에 따른 화면 출력
  - Menu 클릭 시 SlideMenu 화면 출력 ( isBackdrop.menu = type === 'menu' )
  - Login 클릭 시 LoginModal 화면 출력 ( isBackdrop.login = type === 'login' )

#### 2. Login Modal 화면 작업

- ID, PW, Login 버튼으로 구성
- ID, PW 클릭 시 LoginInfo 객체로 binding ( useState 활용 )
- ID, PW 미입력 시 alert 메시지 출력

#### 3. Login API 호출

- api 호출 시 요청을 보낼 proxy 설정

###### package.json

```
.
.
.
"proxy": "http://localhost:8079"
.
.
.
```

- LoginModal 창에서 로그인 버튼 클릭 시 /api/auth/login 호출
- 로그인 완료되어 token return 시 동작 구현 필요

#### 4. Login 테스트

- ID, PW 미입력 시 : alert 출력, 정상
- 존재하지 않는 ID 입력 시 : 403, 정상
- 잘못된 PW 입력 시 : 403, 정상
- 정상 ID, PW 입력 시 : 200, 정상
