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

    /*-- userEmailId --*/
    if (name === "userEmailId" || chk) {
      validUserEmailId(userInfo.userEmailId);
    }

    /*-- userEmailDomain --*/
    if (name === "userEmailDomain" || chk) {
      validUserEmailDomain(userInfo, chk);
    }

    /*-- userPhone --*/
    if (name === "userPhone" || chk) {
      validUserPhone(userInfo.userPhone);
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

    if (!flag) {
      flag = userInfo.userPwd !== userInfo.userPwdChk;
      if (flag) msg = "비밀번호와 일치하지 않습니다.";
    }
    setErrors({
      ...errors,
      userPwdChk: flag,
      userPwdChkMsg: msg,
    });
  };

  /*-- UserEmailId --*/
  const validUserEmailId = (value) => {
    let flag = false;
    let msg = "";

    //Required
    if (!flag) flag = !value;
    if (flag) msg = "이메일 아이디를 입력해주세요.";

    setErrors({
      ...errors,
      userEmailId: flag,
      userEmailIdMsg: msg,
    });
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
      flag = /^[a-zA-Z0-9]+(\.[a-zA-Z0-9]+){1,2}$/.test(value);
      if (flag)
        msg =
          "이메일 주소 형식을 확인해주세요. (영문대/소문자, '.' 1~2개 포함)";
    }

    setErrors({
      ...errors,
      userEmailDomain: flag,
      userEmailDomainMsg: msg,
    });
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
      flag = !/[0-9]{11}$/.test(value);
      if (flag) msg = "핸드폰 번호 형식을 확인해주세요. (숫자 11자리)";
    }

    setErrors({
      ...errors,
      userPhone: flag,
      userPhoneMsg: msg,
    });
  };

  return { validate, errors };
};

export default Validation;
