## Day12. 화면 구조 변경 및 Signup 화면 구현

#### 1. Backdrop 화면 공통화

- Header 메뉴, 로그인 버튼 클릭 시 오픈되는 backdrop component를 App.js 에 import하는 형식으로 변경
- 닫기 버튼 추가
- 각기 다른 component에서 필요 시 호출하도록 변경
- Header, Main component로 메서드 변수 전달, 필요한 컴포넌트로 전달하는 방식
- 공통 메서드로 분리하는 방식으로 변경할 예정

#### 2. Signup 화면 구현

- 화면 퍼블리싱 작성
- 소셜 로그인 버튼만 구현 (차후 구현 예정)
- 입력요소
  - 필수 : 아이디, 비밀번호, 이메일, 전화번호
  - 선택 : 국가, 주소, 알람여부
- 국가 코드 수집 필요, 카카오 주소 검색 API 필요
- Validation 구현 필요
