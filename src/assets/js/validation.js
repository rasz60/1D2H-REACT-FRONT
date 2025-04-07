import { useState } from "react";

const Validation = () => {
  const [errors, setErrors] = useState({});

  /*-- validate --*/
  const validate = (name, value) => {
    /*-- chk ? '전체 검증' : '개별 검증' --*/
    let chk = name === "" || name === null;

    /*-- UserId --*/
    if (name === "userId" || chk) {
      validUserId(value);
    }

    /*-- UserPwd --*/
    if (name === "userPwd" || chk) {
      validUserPwd(value);
    }

    if (name === "userIdDupChk") {
      setErrors({
        ...errors,
        userIdDupChk: !value,
        userIdDupChkMsg: !value ? "아이디를 중복확인 해주세요." : "",
      });
    }
    return errors;
  };

  /*-- UserId --*/
  const validUserId = (value) => {
    let flag = false;
    let msg = "";
    let regExp = /^(?=.*[a-z])(?=.*[0-9])[a-z0-9_-]{6,20}$/;

    // Required
    if (!flag) flag = !value;
    if (flag) msg = "아이디는 필수 입력 값입니다.";
    console.log(flag, msg);

    // RegExp
    if (!flag) {
      flag = !regExp.test(value);
      if (flag)
        msg =
          "6~20자리의 영문소문자, 숫자 조합(-, _ 사용 가능)으로 입력해주세요.";
    }

    console.log(flag, msg);
    //Return
    setErrors({
      ...errors,
      userId: flag,
      userIdMsg: msg,
    });
  };

  /*-- UserPwd --*/
  const validUserPwd = (value) => {
    let flag = false;
    let msg = "";
    let regExp =
      /(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;

    //Required
    if (!flag) flag = !value;
    if (flag) msg = "비밀번호는 필수 입력 값입니다.";

    // RegExp
    if (!flag) {
      flag = !regExp.test(value);
      if (flag)
        msg =
          "8~16자리의 영문 소/대문자, 숫자, 특수문자($,`,~,!,@,$,!,%,*,#,^,?,&,,(,),-,_,=,+) 조합으로 입력해주세요.";
    }

    //Return
    setErrors({
      ...errors,
      userPwd: flag,
      userPwdMsg: msg,
    });
  };

  return { validate, errors };
};

export default Validation;
