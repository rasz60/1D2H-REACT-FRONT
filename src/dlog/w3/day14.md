## Day14. Signup validation 구현 - 2

#### 1. 항목 검증

- emailId : 필수 값 검증
- emailDomain
  - 필수 값
  - 전체 검증 (회원 가입버튼 클릭 시)이 아닌 경우
    - select box에서 선택한 값이 '선택' 혹은 '직접 입력' 일 때는 필수 값 검증 pass
  - 영문대/소문자, 숫자 포함 가능, '.'이 1개 이상, 2개 이하
- userPhone : 숫자로만 입력, 11자리 입력

#### 2. 아이디 중복 검증

- /api/auth/idDupChk/${userId} 호출하여 처리
- 결과가 0개인 경우, userIdDupChk true로 변경
- userId가 변경되는 경우 userIdDupChk를 다시 false로 변경

#### 3. 주소 검색 API
