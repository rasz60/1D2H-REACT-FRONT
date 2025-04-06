import { useState } from "react";
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
const Signup = () => {
  const [isStepTwo, setIsStepTwo] = useState(false);
  const [userInfo, setUserInfo] = useState({
    userId: "",
    userPwd: "",
    userPwdChk: "",
    userEmailId: "",
    userEmailDomain: "",
    userEmailDomainSelect: "",
    userPhone: "",
    userBirth: "",
    userNation: "",
    userZipCode: "",
    userAddr: "",
    userAddrDesc: "",
    alarmYn: false,
    domainSelf: false,
  });

  const handleOpenStepTwo = () => {
    setIsStepTwo(true);
  };

  const handleUserEmailDomainSelect = (event) => {
    handleUserInfo(event);
    event.target.name = "userEmailDomain";
    handleUserInfo(event);
  };

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
    console.log(name, value);
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

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
        <Grid2 size={10.39}>
          <FormControl fullWidth>
            <TextField
              label="아이디(ID)"
              name="userId"
              value={userInfo.userId}
              onChange={handleUserInfo}
            ></TextField>
          </FormControl>
        </Grid2>
        <Grid2 size={1.5} sx={{ ml: 1 }}>
          <Button
            variant="contained"
            startIcon={<Check />}
            fullWidth
            sx={{ height: "100%" }}
          >
            중복확인
          </Button>
        </Grid2>

        {/*-- 비밀번호, 비밀번호 확인 --*/}
        <Grid2 size={12}>
          <FormControl fullWidth>
            <TextField
              label="비밀번호(Password)"
              name="userPwd"
              value={userInfo.userPwd}
              onChange={handleUserInfo}
            ></TextField>
          </FormControl>
        </Grid2>
        <Grid2 size={12}>
          <FormControl fullWidth>
            <TextField
              label="비밀번호 확인(Password Check)"
              name="userPwdChk"
              value={userInfo.userPwdChk}
              onChange={handleUserInfo}
            ></TextField>
          </FormControl>
        </Grid2>

        {/*-- 이메일 --*/}
        <Grid2 size={4.5}>
          <FormControl fullWidth>
            <TextField
              label="이메일 아이디(E-mail ID)"
              name="userEmailId"
              value={userInfo.userEmailId}
              onChange={handleUserInfo}
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
              value={userInfo.userEmailDomain}
              slotProps={{
                input: {
                  readOnly: userInfo.domainSelf,
                },
              }}
              onChange={handleUserInfo}
            ></TextField>
          </FormControl>
        </Grid2>
        <Grid2 size={2.89} sx={{ ml: 1 }}>
          <FormControl fullWidth>
            <InputLabel id="email-domain-label">선택(Choose)</InputLabel>
            <Select
              labelId="email-domain-label"
              name="userEmailDomainSelect"
              value={userInfo.userEmailDomainSelect}
              label="선택(Choose)"
              onChange={handleUserEmailDomainSelect}
            >
              <MenuItem value={""}>선택...</MenuItem>
              <MenuItem value={"gmail.com"}>구글(Google)</MenuItem>
              <MenuItem value={"naver.com"}>네이버(naver)</MenuItem>
              <MenuItem value={"hanmail.net"}>다음(Daum)</MenuItem>
              <MenuItem value={"self"}>직접입력</MenuItem>
            </Select>
          </FormControl>
        </Grid2>

        {/*-- 국가, 전화번호 --*/}
        <Grid2 size={12}>
          <FormControl fullWidth>
            <TextField
              label="핸드폰번호"
              name="userPhone"
              value={userInfo.userPhone}
              onChange={handleUserInfo}
            ></TextField>
          </FormControl>
        </Grid2>

        {/*-- 주소 --*/}
        <Grid2 size={2} sx={{ mr: 1 }}>
          <FormControl fullWidth>
            <TextField
              label="우편번호(Zip Code)"
              name="userZipCode"
              value={userInfo.userZipCode}
              onChange={handleUserInfo}
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
              value={userInfo.userAddr}
              onChange={handleUserInfo}
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
          >
            Find
          </Button>
        </Grid2>
        <Grid2 size={12}>
          <FormControl fullWidth>
            <TextField
              label="주소상세(Address Details)"
              name="userAddrDesc"
              value={userInfo.userAddrDesc}
              onChange={handleUserInfo}
            ></TextField>
          </FormControl>
        </Grid2>

        {/*-- 알람여부 --*/}
        <Grid2 size={12}>
          <FormControlLabel
            control={
              <Checkbox
                name="alarmYn"
                value={userInfo.alarmYn}
                onChange={handleUserInfo}
              />
            }
            label="devsixt에서 보내는 알림을 수신하는데 동의합니다. (메일, 문자)"
          />
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default Signup;
