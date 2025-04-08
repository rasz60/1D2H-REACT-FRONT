## Day13. Signup validation 구현 - 1

#### 1. validation 구조

- TextField 값이 변경될 때, UserInfo를 변경하는 handleUserInfo 메서드에서 setUserInfo가 완료되면 userEffect를 통해 validate 메서드 실행
- Validation.js 파일에 구현된 메서드를 통해 errors 라는 객체를 결과로 리턴
  - useState로 상태가 변경되는 errors 객체를 실시간으로 변경되는 정보를 받을 수 있도록 import한 Validation에서 errors를 객체 그대로 리턴하도록 하고, errors를 그대로 사용함
- lastChng 변수에 마지막 변경된 항목의 name을 저장하고 해당 값을 검증함
- 최종 회원 가입 클릭 시에는 lastChng를 비워 전체 검증

```
validation.js

import { useState } from "react";

const Validation = () => {
  const [errors, setErrors] = useState({});

  /*-- validate --*/
  const validate = (userInfo) => {
    let name = userInfo.lastChng;
    /*-- chk ? '전체 검증' : '개별 검증' --*/
    let chk = name === "";

    /*-- UserId --*/
    if (name === "userId" || chk) {
      validUserId(userInfo.userId);
    }

    /*-- UserPwd --*/
    if (name === "userPwd" || chk) {
      validUserPwd(userInfo.userPwd);

      if (userInfo.userPwdChk) {
        name = "userPwdChk";
      }
    }

  .
  .
  .

  return { validate, errors }; {/*-- errors 객체 그대로 리턴 --*/}
};

export default Validation;

```

```
Signup.jsx
.
.

import Validation from "../js/validation";

const Signup = () => {
  const { validate, errors } = Validation();
  .
  .
  .
  const handleUserInfo = (event) => {
    let { name, value } = event.target;

    if (name === "userEmailDomain") {
      if (value === "self") {
        userInfo.domainSelf = false;
        value = "";
      } else {
        userInfo.domainSelf = true;
      }
    }

    setUserInfo({
      ...userInfo,
      lastChng: name,
      [name]: value,
    });
  };

  useEffect(() => {
    validate(userInfo);
  }, [userInfo]);

  return (
    <Box id="signup-wrapper">
      .
      .
      .

      {/*-- 아이디 --*/}
      <Grid2
        container
        fullwidth
        id="step-2"
        className={isStepTwo ? "open" : "close"}
      >
        <Grid2 size={10.39}>
          <FormControl fullWidth>
            <TextField
              label="아이디(ID)"
              name="userId"
              value={userInfo.userId}
              onChange={handleUserInfo}
              error={errors.userId}         {/*-- errors 객체 변수 사용 --*/}
              helperText={errors.userIdMsg} {/*-- errors 객체 변수 사용 --*/}
            ></TextField>
          </FormControl>
        </Grid2>
.
.
.

```

#### 2. 항목 검증

- userId : 필수 값, 영문소문자/숫자 조합 필수, 특수문자 \_,- 만 허용
- userPwd : 필수 값, 영문대문자/소문자/숫자/특수문자 조함, 특수문자 $,`,~,!,@,$,!,%,\*,#,^,?,&,,(,),-,\_,=,+ 만 허용
- userPwdChk : 필수 값, userPwd와 같은지 체크
