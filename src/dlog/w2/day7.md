## Day7. React 프로젝트 설정

#### 1. React 프로젝트 생성

- React 프로젝트 생성

```
npx create-react-app ${path}
```

- 필요 라이브러리 설치

```

npm i @mui/icons-material @mui/material @mui/styled-engine-sc --no-fund // google meterials-ui
npm i axios --no-fund // API 호출
npm i eslint eslint-config-prettier eslint-plugin-prettier --no-fund // code formatter
npm i prettier --no-fund // code formatter

```

#### 2. login API 호출 테스트

- App.js 테스트 코드 작성, 페이지 로드 시 /api/auth/login 호출
  - login 성공 시 : access token 리턴
  - login 실패 시 : 403, 아이디/패스워드 오류 리턴
