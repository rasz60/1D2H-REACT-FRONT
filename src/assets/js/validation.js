import { useState } from "react";

const Validation = () => {
  const [errors, setErrors] = useState({});

  /*-- validate chk가 true일 때는 전체 항목 검증 --*/
  const validate = (userInfo, type) => {
    let name = userInfo.lastChng;
    let chk = name === "all";
    /*-- 각 validation 결과 --*/
    let flag = false;
    /*-- UserId --*/
    if (name === "signupUserId" || chk) {
      flag = validUserId(name, userInfo.signupUserId);
      if (chk) chk = !flag;
    }

    /*-- UserPwd --*/
    if ((name === "signupUserPwd" || chk) && type === "signup") {
      flag = validUserPwd(userInfo.signupUserPwd);

      if (userInfo.userPwdChk) {
        name = "userPwdChk";
      }

      if (chk) chk = !flag;
    }

    /*-- UserPwdChk --*/
    if ((name === "userPwdChk" || chk) && type === "signup") {
      flag = validUserPwdChk(userInfo);
      if (chk) chk = !flag;
    }

    /*-- NewUserPwd --*/
    if ((name === "newUserPwd" || chk) && type !== "signup") {
      flag = validNewUserPwd(userInfo.newUserPwd);

      if (userInfo.newUserPwdChk) {
        name = "newUserPwdChk";
      }
      if (chk) chk = !flag;
    }

    /*-- NewUserPwdChk --*/
    if ((name === "newUserPwdChk" || chk) && type !== "signup") {
      flag = validNewUserPwdChk(userInfo);
      if (chk) chk = !flag;
    }

    /*-- userEmailId --*/
    if (name === "userEmailId" || chk) {
      flag = validUserEmailId(userInfo.userEmailId);
      if (chk) chk = !flag;
    }

    /*-- userEmailDomain --*/
    if (name === "userEmailDomain" || chk) {
      flag = validUserEmailDomain(userInfo, chk);
      if (chk) chk = !flag;
    }

    /*-- userPhone --*/
    if (name === "userPhone" || chk) {
      flag = validUserPhone(userInfo.userPhone);
      if (chk) chk = !flag;
    }
    return !flag;
  };

  /*-- UserId --*/
  const validUserId = (name, value) => {
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
    setErrors((prev) => ({
      ...prev,
      [name]: flag,
      [name + "Msg"]: msg,
    }));

    return flag;
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
    setErrors((prev) => ({
      ...prev,
      signupUserPwd: flag,
      signupUserPwdMsg: msg,
    }));

    return flag;
  };

  /*-- UserPwdChk --*/
  const validUserPwdChk = (userInfo) => {
    let flag = false;
    let msg = "";

    //Required
    if (!flag) flag = !userInfo.userPwdChk;
    if (flag) msg = "비밀번호를 한 번 더 입력해주세요.";

    if (!flag) {
      flag = userInfo.signupUserPwd !== userInfo.userPwdChk;
      if (flag) msg = "비밀번호와 일치하지 않습니다.";
    }
    setErrors((prev) => ({
      ...prev,
      userPwdChk: flag,
      userPwdChkMsg: msg,
    }));

    return flag;
  };

  /*-- NewUserPwd --*/
  const validNewUserPwd = (value) => {
    let flag = false;
    let msg = "";
    let regExp =
      /(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;

    // RegExp
    if (value) {
      if (!flag) {
        flag = !regExp.test(value);
        if (flag)
          msg =
            "8~16자리의 영문 소/대문자, 숫자, 특수문자($,`,~,!,@,$,!,%,*,#,^,?,&,,(,),-,_,=,+) 조합으로 입력해주세요.";
      }
    }

    //Return
    setErrors((prev) => ({
      ...prev,
      newUserPwd: flag,
      newUserPwdMsg: msg,
    }));

    return flag;
  };

  /*-- NewUserPwdChk --*/
  const validNewUserPwdChk = (userInfo) => {
    let flag = false;
    let msg = "";

    //Required
    if (userInfo.newUserPwd) {
      if (!flag) {
        flag = !userInfo.newUserPwdChk;
        if (flag) msg = "비밀번호를 한 번 더 입력해주세요.";
      }

      if (!flag) {
        flag = userInfo.newUserPwd !== userInfo.newUserPwdChk;
        if (flag) msg = "비밀번호와 일치하지 않습니다.";
      }
    }

    setErrors((prev) => ({
      ...prev,
      newUserPwdChk: flag,
      newUserPwdChkMsg: msg,
    }));

    return flag;
  };

  /*-- UserEmailId --*/
  const validUserEmailId = (value) => {
    let flag = false;
    let msg = "";

    //Required
    if (!flag) flag = !value;
    if (flag) msg = "이메일 아이디를 입력해주세요.";

    setErrors((prev) => ({
      ...prev,
      userEmailId: flag,
      userEmailIdMsg: msg,
    }));

    return flag;
  };

  /*-- UserEmailDomain --*/
  const validUserEmailDomain = (userInfo, chk) => {
    let flag = false;
    let msg = "";
    let value = userInfo.userEmailDomain;
    let self = userInfo.domainSelf;
    let select = userInfo.userEmailDomainSelect;
    //Required
    if (!flag) flag = !value;
    if (flag) msg = "이메일 주소를 입력 혹은 선택해주세요.";

    // 전체 검증이 아니고, select와 input 모두 비어있는 경우는 무시
    if ((!chk && !value && !select) || (!value && self)) {
      flag = false;
      msg = "";
    }

    // 형식
    if (!flag && self) {
      flag = !/^[a-zA-Z0-9]+(\.[a-zA-Z0-9]+){0,2}$/.test(value);
      if (flag)
        msg =
          "이메일 주소 형식을 확인해주세요. (영문대/소문자, '.' 1~2개 포함)";
    }

    setErrors((prev) => ({
      ...prev,
      userEmailDomain: flag,
      userEmailDomainMsg: msg,
    }));

    return flag;
  };

  /*-- UserPhone --*/
  const validUserPhone = (value) => {
    let flag = false;
    let msg = "";

    //Required
    if (!flag) flag = !value;
    if (flag) msg = "핸드폰 번호를 입력해주세요.";

    // 형식
    if (!flag) {
      flag = !/^[0-9]{11}$/.test(value);
      if (flag) msg = "핸드폰 번호 형식을 확인해주세요. (숫자 11자리)";
    }

    setErrors((prev) => ({
      ...prev,
      userPhone: flag,
      userPhoneMsg: msg,
    }));

    return flag;
  };

  return { validate, errors };
};

export default Validation;
