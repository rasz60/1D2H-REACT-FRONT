# DAY20. 회원 정보 수정 & 탈퇴 구현

#### 1. SetUser Component 구현

- SetUser Component 생성 후 Main에 authLv = 1의 RouteGuard 추가
- 최초 Password를 입력하여 2차 검증 실행
- 2차 검증 성공 시, 현재 가입된 회원 정보를 출력
- 수정 발생 시, 회원 가입과 동일한 Validation 수행
  - newUserPwd, newUserPwdChk validation 추가하여 별도 수행 (필수 값 여부 생략)
- validation 성공 시, 중복 체크 수행 (/api/auth/dupchk)
- 중복 체크 성공 시, 회원 정보 수정 api 호출 (/api/auth/setUser)
- 회원 정보 수정 완료 후, 메인 페이지 이동
