## Day8. 기본 화면 구성 (Main, Header, Login)

#### 1. Header 퍼블리싱 & script 작업

- 상단 고정 메뉴 3분할로 좌측 '메뉴', 가운데 '로고', 우측 '버튼'으로 구성
- scroll이 일어나면 메뉴 배경색 transparents, 메뉴 상단 고정
- 메뉴
  - 클릭 시 하위로 상세 메뉴 출력 (MUI Backdrop 사용 다른 화면 클릭 방지)
- 로고
  - 마우스 오버 시 이미지 확대, 클릭 시 홈으로 이동 (Link = '/')
- 버튼
  - 로그인되지 않았을 때 : 로그인 버튼만 노출
  - 로그인 완료되었을 때 : 로그인 유저 정보 상세, 로그아웃 버튼 노출
  - 로그인 버튼 클릭 시 모달 창 호출

#### 2. 상세 메뉴 화면

- 메뉴 버튼 클릭 시 상세 메뉴 화면 출력
- MUI BackDrop Component 활용 클릭 방지
- 메뉴 클릭 시 react-router-dom.Link component 활용 router 링크 이동
