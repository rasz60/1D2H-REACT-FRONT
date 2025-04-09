import { useEffect, useState } from "react";
import {
  Box,
  Grid2,
  Avatar,
  FormControl,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Button,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { AlternateEmail, Search, Check } from "@mui/icons-material";
import axiosInstance from "@utils/axiosInstance";
import Validation from "../js/validation";

import BackdropWrapper from "@compo/common/Backdrop";
import BackdropMethods from "@js/backdrop";

const Signup = () => {
  const { isBackdrop, setBackdrop } = BackdropMethods();
  const { validate, errors } = Validation();
  const [isStepTwo, setIsStepTwo] = useState(false);
  const [signupInfo, setSignupInfo] = useState({
    lastChng: "",
    signupUserId: "",
    userIdDupChk: false,
    signupUserPwd: "",
    userPwdChk: "",
    userEmailId: "",
    userEmailDomain: "",
    userEmailDomainSelect: "",
    domainSelf: false,
    userPhone: "",
    userBirth: "",
    userNation: "",
    userZipCode: "",
    userAddr: "",
    userAddrDesc: "",
    alarmYn: false,
  });

  const handleOpenStepTwo = () => {
    setIsStepTwo(true);
  };

  const handleSignupInfo = (event) => {
    let { name, value } = event.target;
    if (name === "userEmailDomainSelect") {
      if (value === "self") {
        signupInfo.domainSelf = true;
      } else {
        signupInfo.domainSelf = false;
      }
    }
    setSignupInfo({
      ...signupInfo,
      lastChng: name,
      [name]: value,
    });
  };

  useEffect(() => {
    validate(signupInfo);
    let event = null;

    if (signupInfo.lastChng === "signupUserId") {
      event = {
        target: {
          name: "userIdDupChk",
          value: false,
        },
      };
    }

    if (signupInfo.lastChng === "userEmailDomainSelect") {
      event = {
        target: {
          name: "userEmailDomain",
          value: signupInfo.domainSelf ? "" : signupInfo.userEmailDomainSelect,
        },
      };
    }

    if (event != null) handleSignupInfo(event);
  }, [signupInfo]);

  const handleAddrAPI = () => {
    setBackdrop({
      ...isBackdrop,
      type: true,
      layout: "addrAPI",
    });
  };

  const onAddrSelect = (addr) => {
    if (addr.address && addr.zonecode) {
      setSignupInfo({
        ...signupInfo,
        userAddr: addr.address,
        userZipCode: addr.zonecode,
      });
    }
  };

  const handleSignup = () => {
    if (signupInfo.lastChng === "all") {
      let flag = validate(signupInfo);

      if (flag) {
        window.confirm("회원으로 가입할까요?", function () {
          //API
        });
      }
    } else {
      setSignupInfo({
        ...signupInfo,
        lastChng: "all",
      });
    }
  };

  useEffect(() => {}, [errors]);

  return (
    <Box id="signup-wrapper">
      <Grid2 container id="step-1">
        <Grid2 size={2.8}>
          <Grid2
            container
            id="step-1-devsixt"
            className="step-1-button"
            onClick={handleOpenStepTwo}
          >
            <Grid2 size={2.5}>
              <Avatar src="https://avatars.githubusercontent.com/u/96821067?v=4" />
            </Grid2>
            <Grid2 size={9.5}>devsixt 신규 회원 가입</Grid2>
          </Grid2>
        </Grid2>
        <Grid2 size={2.8}>
          <Grid2 container id="step-1-social-google" className="step-1-button">
            <Grid2 size={2.5}>
              <Avatar src="/img/google-logo.png" />
            </Grid2>
            <Grid2 size={9.5}>Google 계정 연동</Grid2>
          </Grid2>
        </Grid2>
        <Grid2 size={2.8}>
          <Grid2 container id="step-1-social-naver" className="step-1-button">
            <Grid2 size={2.5}>
              <Avatar src="/img/naver-logo.png" />
            </Grid2>
            <Grid2 size={9.5}>Naver 계정 연동</Grid2>
          </Grid2>
        </Grid2>
        <Grid2 size={2.8}>
          <Grid2 container id="step-1-social-kakao" className="step-1-button">
            <Grid2 size={2.5}>
              <Avatar src="/img/kakao-logo.png" />
            </Grid2>
            <Grid2 size={9.5}>Kakao 계정 연동</Grid2>
          </Grid2>
        </Grid2>
      </Grid2>

      {/*-- 아이디 --*/}
      <Grid2
        container
        fullwidth
        id="step-2"
        className={isStepTwo ? "open" : "close"}
      >
        <Grid2 size={12}>
          <FormControl fullWidth>
            <TextField
              label="아이디(ID)"
              name="signupUserId"
              value={signupInfo.signupUserId}
              onChange={handleSignupInfo}
              error={
                errors.signupUserId ? errors.signupUserId : errors.userIdDupchk
              }
              helperText={
                errors.signupUserIdMsg
                  ? errors.signupUserIdMsg
                  : errors.userIdDupchkMsg
              }
            ></TextField>
          </FormControl>
        </Grid2>

        {/*-- 비밀번호, 비밀번호 확인 --*/}
        <Grid2 size={12}>
          <FormControl fullWidth>
            <TextField
              type="password"
              label="비밀번호(Password)"
              name="signupUserPwd"
              value={signupInfo.signupUserPwd}
              onChange={handleSignupInfo}
              error={errors.signupUserPwd}
              helperText={errors.signupUserPwdMsg}
            ></TextField>
          </FormControl>
        </Grid2>
        <Grid2 size={12}>
          <FormControl fullWidth>
            <TextField
              type="password"
              label="비밀번호 확인(Password Check)"
              name="userPwdChk"
              value={signupInfo.userPwdChk}
              onChange={handleSignupInfo}
              error={errors.userPwdChk}
              helperText={errors.userPwdChkMsg}
            ></TextField>
          </FormControl>
        </Grid2>

        {/*-- 이메일 --*/}
        <Grid2 size={4.5}>
          <FormControl fullWidth>
            <TextField
              label="이메일 아이디(E-mail ID)"
              name="userEmailId"
              value={signupInfo.userEmailId}
              onChange={handleSignupInfo}
              error={errors.userEmailId}
              helperText={errors.userEmailIdMsg}
            ></TextField>
          </FormControl>
        </Grid2>
        <Grid2
          size={0.5}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <AlternateEmail />
        </Grid2>
        <Grid2 size={4}>
          <FormControl fullWidth>
            <TextField
              name="userEmailDomain"
              label="이메일 주소(E-mail Domain)"
              value={signupInfo.userEmailDomain}
              slotProps={{
                input: {
                  readOnly: !signupInfo.domainSelf,
                },
              }}
              onChange={handleSignupInfo}
              error={errors.userEmailDomain}
              helperText={errors.userEmailDomainMsg}
            ></TextField>
          </FormControl>
        </Grid2>
        <Grid2 size={2.89} sx={{ ml: 1 }}>
          <FormControl fullWidth>
            <InputLabel id="email-domain-label">선택(Choose)</InputLabel>
            <Select
              labelId="email-domain-label"
              name="userEmailDomainSelect"
              value={signupInfo.userEmailDomainSelect}
              label="선택(Choose)"
              onChange={handleSignupInfo}
            >
              <MenuItem value={""}>선택...</MenuItem>
              <MenuItem value={"gmail.com"}>구글(Google)</MenuItem>
              <MenuItem value={"naver.com"}>네이버(naver)</MenuItem>
              <MenuItem value={"hanmail.net"}>다음(Daum)</MenuItem>
              <MenuItem value={"self"}>직접입력</MenuItem>
            </Select>
          </FormControl>
        </Grid2>

        {/*-- 전화번호 --*/}
        <Grid2 size={12}>
          <FormControl fullWidth>
            <TextField
              type="text"
              label="핸드폰번호"
              name="userPhone"
              value={signupInfo.userPhone}
              onChange={handleSignupInfo}
              error={errors.userPhone}
              helperText={errors.userPhoneMsg}
            ></TextField>
          </FormControl>
        </Grid2>

        {/*-- 주소 --*/}
        <Grid2 size={2} sx={{ mr: 1 }}>
          <FormControl fullWidth>
            <TextField
              label="우편번호(Zip Code)"
              name="userZipCode"
              value={signupInfo.userZipCode}
              onChange={handleSignupInfo}
              slotProps={{
                input: {
                  readOnly: true,
                },
              }}
            ></TextField>
          </FormControl>
        </Grid2>
        <Grid2 size={8.29}>
          <FormControl fullWidth>
            <TextField
              label="주소(Address)"
              name="userAddr"
              value={signupInfo.userAddr}
              onChange={handleSignupInfo}
              slotProps={{
                input: {
                  readOnly: true,
                },
              }}
            ></TextField>
          </FormControl>
        </Grid2>
        <Grid2 size={1.5} sx={{ ml: 1 }}>
          <Button
            variant="contained"
            startIcon={<Search />}
            fullWidth
            sx={{ height: "100%" }}
            onClick={handleAddrAPI}
          >
            Find
          </Button>
        </Grid2>
        <Grid2 size={12}>
          <FormControl fullWidth>
            <TextField
              label="주소상세(Address Details)"
              name="userAddrDesc"
              value={signupInfo.userAddrDesc}
              onChange={handleSignupInfo}
            ></TextField>
          </FormControl>
        </Grid2>

        {/*-- 알람여부 --*/}
        <Grid2 size={12}>
          <FormControlLabel
            control={
              <Checkbox
                name="alarmYn"
                value={signupInfo.alarmYn}
                onChange={handleSignupInfo}
              />
            }
            label="devsixt에서 보내는 알림을 수신하는데 동의합니다. (메일, 문자)"
          />
        </Grid2>

        {/*-- 버튼 --*/}
        <Grid2 size={12} sx={{ display: "flex", justifyContent: "end" }}>
          <Button variant="contained" onClick={handleSignup}>
            가입하기
          </Button>
        </Grid2>
      </Grid2>
      <BackdropWrapper
        isBackdrop={isBackdrop}
        setBackdrop={setBackdrop}
        onAddrSelect={onAddrSelect}
      />
    </Box>
  );
};

export default Signup;
