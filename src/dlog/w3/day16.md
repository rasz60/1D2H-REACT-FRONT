## Day16. Signup 마무리

#### 1. 항목 검증

- userBirth 항목 추가, MUI DatePicker 추가

```
npm install @mui/x-date-pickers dayjs
```

- userBirth 값 변경 시, setSignupInfo 호출하여 lastChng, userBirth 값 변경을 일으켜 validate() 호출하도록 함
- 가입하기 버튼 클릭 시, setSignupInfo 호출하여 lastChng만 'all'로 변경해서 validate() 호출하도록 함
- validation.js 에서 lastChng가 'all' 일 때, 전체 항목 검증하도록 변경
- lastChng가 'all' 이고, validate() 결과가 true 일 때, handleSignup() 메서드 실행
- handleSignup 실행 시, /api/auth/dupChk 호출
- userId, userEmail, userPhone 3가지 항목 중복 체크

#### 2. Signup !!

- 모든 검증 완료 시 /api/auth/signup 호출
- 회원 가입 완료 시 root URL 로 redirect
