import { useEffect, useState } from "react";

/*-- MUI --*/
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
  IconButton,
} from "@mui/material";
import { AlternateEmail, Search, Refresh } from "@mui/icons-material";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

/*-- AXIOS --*/
import axiosInstance from "@utils/axiosInstance";

/*-- 주소검색 Backdrop --*/
import BackdropWrapper from "@compo/common/Backdrop";
import BackdropMethods from "@js/backdrop";

/*-- Validation --*/
import Validation from "../../js/validation";

/*-- AuthContext --*/
import { useAuth } from "@context/AuthContext";

const Signup = () => {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      window.location.href = "/";
    }
  }, []);

  const currentYear = dayjs();
  const { isBackdrop, setBackdrop } = BackdropMethods();
  const { validate, errors } = Validation();
  const [isStepTwo, setIsStepTwo] = useState(false);
  const [signupInfo, setSignupInfo] = useState({
    lastChng: "",
    signupUserId: "",
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

  /*-- 가입 유형 devsixt 신규 회원 가입 선택 시 --*/
  const handleOpenStepTwo = () => {
    setIsStepTwo(true); // form 오픈
  };

  /*-- signupInfo 변경 시 bind --*/
  const handleSignupInfo = (event) => {
    let { name, value, checked } = event.target;

    // emailDomain 변경 시
    if (name === "userEmailDomainSelect") {
      // 직접 입력인지 확인
      if (value === "self") {
        signupInfo.domainSelf = true;
      } else {
        signupInfo.domainSelf = false;
      }
    }

    // 변경 값 binding
    setSignupInfo({
      ...signupInfo,
      lastChng: name,
      [name]: name === "alarmYn" ? checked : value,
    });
  };

  /*-- signupInfo 변경이 생겼을 때 --*/
  useEffect(() => {
    // 검증 호출
    let flag = validate(signupInfo, "signup");
    // 전체 검증일 때
    if (signupInfo.lastChng === "all") {
      if (flag) handleSignup(); // 결과가 true일 때 handleSignup 실행
    }
    // 항목 검증일 때
    else {
      let event = null;
      // emailDomain 셀렉트 박스 선택 시
      if (signupInfo.lastChng === "userEmailDomainSelect") {
        // userEmailDomain input 값 binding 다시 호출할 event 객체 임의 생성
        event = {
          target: {
            name: "userEmailDomain",
            value: signupInfo.domainSelf
              ? ""
              : signupInfo.userEmailDomainSelect,
          },
        };
      }

      // binding 호출
      if (event != null) handleSignupInfo(event);
    }
  }, [signupInfo]);

  /*-- 주소 검색 화면 호출 --*/
  const handleAddrAPI = () => {
    setBackdrop({
      ...isBackdrop,
      type: true,
      layout: "addrAPI",
    });
  };

  /*-- 주소 검색 완료 시 callback --*/
  const onAddrSelect = (addr) => {
    if (addr.address && addr.zonecode) {
      setSignupInfo({
        ...signupInfo,
        userAddr: addr.address,
        userZipCode: addr.zonecode,
      });
    }
  };

  /*-- 가입하기 버튼 클릭 시 --*/
  const handleSignup = async () => {
    // 아이디 중복 체크
    let res = await axiosInstance.post("/auth/dupChk", {
      userId: signupInfo.signupUserId,
      userEmail: signupInfo.userEmailId + "@" + signupInfo.userEmailDomain,
      userPhone: signupInfo.userPhone,
      dupChkType: "signup",
    });

    // 아이디 중복일 때
    if (res.data.signupUserIdDupChk) {
      alert("이미 사용 중인 아이디 입니다.");
      return false;
    }

    // 이메일 중복일 때
    if (res.data.userEmailDupChk) {
      alert("이미 가입된 이메일 주소 입니다.");
      return false;
    }

    // 휴대폰번호 중복일 때
    if (res.data.userPhoneDupChk) {
      alert("이미 가입된 연락처 입니다.");
      return false;
    }

    let flag = await window.confirm("회원으로 가입할까요?");

    if (flag) {
      // 회원가입 API 호출
      await axiosInstance
        .post("/auth/signup", signupInfo)
        .then((res) => {
          alert(res.data);
          window.location.href = "/";
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    }
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
        <Grid2 size={12}>
          <FormControl fullWidth>
            <TextField
              required
              label="아이디(ID)"
              name="signupUserId"
              value={signupInfo.signupUserId}
              onChange={handleSignupInfo}
              error={errors.signupUserId}
              helperText={errors.signupUserIdMsg}
            ></TextField>
          </FormControl>
        </Grid2>

        {/*-- 비밀번호, 비밀번호 확인 --*/}
        <Grid2 size={12}>
          <FormControl fullWidth>
            <TextField
              required
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
              required
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
              required
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
              required
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
            <InputLabel required id="email-domain-label">
              선택(Choose)
            </InputLabel>
            <Select
              required
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
              required
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

        {/*-- 생년월일 --*/}
        <Grid2 size={0.5} sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            onClick={() =>
              setSignupInfo({
                ...signupInfo,
                lastChng: "userBirth",
                userBirth: "",
              })
            }
          >
            <Refresh />
          </IconButton>
        </Grid2>
        <Grid2 size={11.5}>
          <FormControl fullWidth>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="생년월일"
                name="userBirth"
                maxDate={currentYear}
                openTo="year"
                views={["year", "month", "day"]}
                format="YYYY/MM/DD"
                yearsOrder="desc"
                error={errors.userBirth}
                value={
                  signupInfo.userBirth
                    ? dayjs(signupInfo.userBirth, "YYYY/M/D")
                    : null
                }
                onChange={(newValue) =>
                  setSignupInfo({
                    ...signupInfo,
                    lastChng: "userBirth",
                    userBirth:
                      newValue === null
                        ? ""
                        : newValue.$y +
                          "/" +
                          (parseInt(newValue.$M) + 1) +
                          "/" +
                          newValue.$D,
                  })
                }
                slotProps={{
                  textField: {
                    readOnly: true,
                  },
                }}
              />
            </LocalizationProvider>
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
          <Button
            variant="contained"
            onClick={() => setSignupInfo({ ...signupInfo, lastChng: "all" })}
          >
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
