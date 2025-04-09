## Day15. Signup validation 구현 - 3

#### 1. issue 수정

- Header에서 열리는 menu, login 창과 다른 페이지에서 열리는 backdrop이 중복호출 가능한 이슈
- Header에서 열리는 backdrop 이외에는 헤더까지 가려지도록 z-index 변경

#### 2. 항목 검증

- useEffect() 사용해서 signupInfo 객체에 변경이 생기면 validate() 호출하도록 설정
- id 중복 확인은 validate() 메서드에서 분리하여 가입하기 버튼 시에 체크
- 가입 버튼 클릭 시 id 중복 확인 API 호출
- id 중복이 아닐 때 전체 항목 검증, validate() 2번째 parameter가 true인 경우 전체 검증
