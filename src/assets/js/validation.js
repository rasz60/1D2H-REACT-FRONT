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

    /*-- UserPwdChk --*/
    if (name === "userPwdChk" || chk) {
      validUserPwdChk(userInfo);
    }

    /*-- 전체 검증 추가 --*/
    if (chk) {
      /*-- UserIdDupChk --*/
      if (!userInfo.userIdDupchk) {
        setErrors({
          userIdDupChk: true,
          userIdDupChkMsg: "아이디 중복을 확인해주세요.",
        });
      }
    }
  };

  /*-- UserId --*/
  const validUserId = (value) => {
    let flag = false;
    let msg = "";
    let regExp = /^(?=.*[a-z])(?=.*[0-9])[a-z0-9_-]{6,20}$/;

    // Required
    if (!flag) flag = !value;
    if (flag) msg = "아이디는 필수 입력 값입니다.";

    // RegExp
    if (!flag) {
      flag = !regExp.test(value);
      if (flag)
        msg =
          "6~20자리의 영문소문자, 숫자 조합(-, _ 사용 가능)으로 입력해주세요.";
    }

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

  /*-- UserPwdChk --*/
  const validUserPwdChk = (userInfo) => {
    let flag = false;
    let msg = "";

    //Required
    if (!flag) flag = !userInfo.userPwdChk;
    if (flag) msg = "비밀번호를 한 번 더 입력해주세요.";

    if (!flag) flag = userInfo.userPwd !== userInfo.userPwdChk;
    if (flag) msg = "비밀번호와 일치하지 않습니다.";
    setErrors({
      ...errors,
      userPwdChk: flag,
      userPwdChkMsg: msg,
    });
  };

  return { validate, errors };
};

export default Validation;
