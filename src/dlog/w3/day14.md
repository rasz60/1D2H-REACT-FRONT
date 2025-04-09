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

- Daum 주소 검색 API dependency 설치

```
npm i react-daum-postcode
```

- src/assets/components/common/AddrAPI.jsx 추가
- 페이지 호출 시 parameter로 callback 함수를 전달
  - setBackdrop : backdrop open 여부와 출력될 화면 처리
  - onSelect : 주소 검색 완료 시 값을 전달할 부모 창의 메서드
- Backdrop Component에 layout AddrAPI 추가
- setBackdrop 호출 시 layout을 'addrAPI'로 지정하면 주소 검색 API 출력

#### 4. Backdrop 모듈화

- Backdrop 호출 시 App.js에서부터 필요한 자식 창으로 계속 전달해야하는 이슈
- Backdrop 자체를 모듈화하여 필요한 페이지에 import해서 사용하는 것으로 변경
  - 화면 : src/assets/components/common/Backdrop.jsx
  - 함수 : src/assets/js/backdrop.js
- Backdrop.jsx의 BackdropWrapper를 사용하여 페이지 import
- backdrop.js의 isBackdrop, setIsBackdrop, setBackdrop 함수 활용 페이지 활성화
- (ISSUE\*) Header에서 열리는 menu, login 창과 다른 페이지에서 열리는 backdrop이 중복호출 가능해짐..

#### 5. 경로 설정

- import가 많아져 alias를 통해 경로 부여하도록 설정
- CRA (Create-React-App)으로 설치한 React 프로젝트는 jsonconfig.json을 사용해야 함 (vite로 마이그레이션.. 할까 생각 중)
- jsonconfig.json에 아래와 같이 경로와 alias 설정

```
/jsonconfig.json


{
  "compilerOptions": {
    "baseUrl": "src",
    "paths": {
      "@pub/*": ["../public/*"],
      "@src/*": ["./*"],
      "@style/*": ["assets/style/*"],
      "@js/*": ["assets/js/*"],
      "@compo/*": ["assets/components/*"],
      "@sections/*": ["assets/sections/*"],
      "@context/*": ["context/*"],
      "@utils/*": ["utils/*"]
    }
  },
  "include": ["src"]
}
```

- jsonconfig.json 파일만 추가해서 해결되지 않음.. dependency 추가

```
npm i react-app-rewired customize-cra
```

- config-overrides.js 추가 (\* jsonconfig.json 파일도 유지)

```
/config-overrides.js


const path = require("path");
const { override, addWebpackAlias } = require("customize-cra");

module.exports = override(
  addWebpackAlias({
    "@src": path.resolve(__dirname, "src"),
    "@style": path.resolve(__dirname, "src/assets/style"),
    "@js": path.resolve(__dirname, "src/assets/js"),
    "@compo": path.resolve(__dirname, "src/assets/components"),
    "@sections": path.resolve(__dirname, "src/assets/sections"),
    "@context": path.resolve(__dirname, "src/context"),
    "@utils": path.resolve(__dirname, "src/utils"),
  })
);

```

- npm start할 때, 경로 설정이 반영되도록 package.json 수정

```
/package.json


{
  .
  .
  .
  "scripts": {
    "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-app-rewired test",
    "eject": "react-app-rewired eject"
  },
  .
  .
  .
}

```
