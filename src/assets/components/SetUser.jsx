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
import { AlternateEmail, Search, Refresh, Check } from "@mui/icons-material";
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
import Validation from "../js/validation";

/*-- AuthContext --*/
import { useAuth } from "@context/AuthContext";

const SetUser = () => {
  const { isAuthenticated, getLoginUserId } = useAuth();
  const loginUserId = getLoginUserId();
  const currentYear = dayjs();
  const { isBackdrop, setBackdrop } = BackdropMethods();
  const { validate, errors } = Validation();
  const [isStepTwo, setIsStepTwo] = useState(false);
  const [chkPwd, setChkPwd] = useState({
    chkUserPwd: "",
    chkUserPwdErr: false,
    chkUserPwdErrMsg: "",
  });
  const [setUserInfo, setSetUserInfo] = useState({
    lastChng: "",
    userMgmtNo: "",
    userId: "",
    newUserPwd: "",
    newUserPwdChk: "",
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

  useEffect(() => {
    if (!isAuthenticated) {
      window.location.href = "/";
    }
    setSetUserInfo({
      ...setUserInfo,
      userId: loginUserId,
    });
  }, []);

  const handleChkPwd = (event) => {
    const { value } = event.target;

    setChkPwd({
      ...chkPwd,
      chkUserPwd: value,
      chkUserPwdErr: value ? false : true,
      chkUserPwdErrMsg: value ? "" : "비밀번호를 입력해주세요.",
    });
  };

  /*-- 가입 유형 devsixt 신규 회원 가입 선택 시 --*/
  const handleOpenStepTwo = async () => {
    if (!chkPwd.chkUserPwd) {
      return;
    }

    await axiosInstance
      .post("/auth/infoChk", {
        userId: setUserInfo.userId,
        userPwd: chkPwd.chkUserPwd,
      })
      .then((res) => {
        res.data.userEmailDomainSelect = res.data.userEmailDomain;
        setSetUserInfo(res.data);
        setIsStepTwo(true); // form 오픈
      })
      .catch((err) => {
        setChkPwd({
          ...chkPwd,
          chkUserPwdErr: true,
          chkUserPwdErrMsg: err.response.data.message,
        });
      });
  };

  /*-- setUserInfo 변경 시 bind --*/
  const handleSetUserInfo = (event) => {
    let { name, value, checked } = event.target;

    // emailDomain 변경 시
    if (name === "userEmailDomainSelect") {
      // 직접 입력인지 확인
      if (value === "self") {
        setUserInfo.domainSelf = true;
      } else {
        setUserInfo.domainSelf = false;
      }
    }

    if (name === "newUserPwdChk") {
      if (!setUserInfo.newUserPwd) {
        value = "";
      }
    }

    // 변경 값 binding
    setSetUserInfo({
      ...setUserInfo,
      lastChng: name,
      [name]: name === "alarmYn" ? checked : value,
    });
  };

  /*-- setUserInfo 변경이 생겼을 때 --*/
  useEffect(() => {
    // 검증 호출
    let flag = validate(setUserInfo);
    // 전체 검증일 때
    if (setUserInfo.lastChng === "all") {
      if (flag) handleSetUser(); // 결과가 true일 때 handleSetUser 실행
    }
    // 항목 검증일 때
    else {
      let event = null;
      // emailDomain 셀렉트 박스 선택 시
      if (setUserInfo.lastChng === "userEmailDomainSelect") {
        // userEmailDomain input 값 binding 다시 호출할 event 객체 임의 생성
        event = {
          target: {
            name: "userEmailDomain",
            value: setUserInfo.domainSelf
              ? ""
              : setUserInfo.userEmailDomainSelect,
          },
        };
      }

      // binding 호출
      if (event != null) handleSetUserInfo(event);
    }
  }, [setUserInfo]);

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
      setSetUserInfo({
        ...setUserInfo,
        userAddr: addr.address,
        userZipCode: addr.zonecode,
      });
    }
  };

  /*-- 가입하기 버튼 클릭 시 --*/
  const handleSetUser = async () => {
    // 아이디 중복 체크
    let res = await axiosInstance.post("/auth/dupChk", {
      userId: setUserInfo.userId,
      userEmail: setUserInfo.userEmailId + "@" + setUserInfo.userEmailDomain,
      userPhone: setUserInfo.userPhone,
      dupChkType: "setUser",
    });

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

    let flag = await window.confirm("회원 정보를 수정할까요?");

    if (flag) {
      // 회원가입 API 호출
      await axiosInstance
        .post("/auth/setUser", setUserInfo)
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
    <Box id="set-user-wrapper">
      <Grid2 container id="step-1" className={isStepTwo ? "close" : "open"}>
        <Grid2 size={12}>
          <p>가입 정보 변경을 위해 비밀번호를 한 번 더 인증해주세요.</p>
        </Grid2>
        <Grid2 size={10.4}>
          <FormControl fullWidth>
            <TextField
              required
              type="password"
              label="비밀번호(Password)"
              name="chkUserPwd"
              value={chkPwd.chkUserPwd}
              onChange={handleChkPwd}
              error={chkPwd.chkUserPwdErr}
              helperText={chkPwd.chkUserPwdErrMsg}
            ></TextField>
          </FormControl>
        </Grid2>
        <Grid2 size={1.5} sx={{ ml: 1 }}>
          <Button
            variant="contained"
            startIcon={<Check />}
            fullWidth
            sx={{ height: "100%" }}
            onClick={handleOpenStepTwo}
          >
            Check
          </Button>
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
              name="userId"
              value={setUserInfo.userId}
              readOnly
            ></TextField>
          </FormControl>
        </Grid2>

        {/*-- 비밀번호, 비밀번호 확인 --*/}
        <Grid2 size={12}>
          <FormControl fullWidth>
            <TextField
              required
              type="password"
              label="새 비밀번호(New Password)"
              name="newUserPwd"
              value={setUserInfo.newUserPwd}
              onChange={handleSetUserInfo}
              error={errors.newUserPwd}
              helperText={errors.newUserPwdMsg}
            ></TextField>
          </FormControl>
        </Grid2>
        <Grid2 size={12}>
          <FormControl fullWidth>
            <TextField
              required
              type="password"
              label="새 비밀번호 확인(New Password Check)"
              name="newUserPwdChk"
              value={setUserInfo.newUserPwdChk}
              onChange={handleSetUserInfo}
              error={errors.newUserPwdChk}
              helperText={errors.newUserPwdChkMsg}
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
              value={setUserInfo.userEmailId}
              onChange={handleSetUserInfo}
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
              value={setUserInfo.userEmailDomain}
              slotProps={{
                input: {
                  readOnly: !setUserInfo.domainSelf,
                },
              }}
              onChange={handleSetUserInfo}
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
              value={setUserInfo.userEmailDomainSelect}
              label="선택(Choose)"
              onChange={handleSetUserInfo}
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
              value={setUserInfo.userPhone}
              onChange={handleSetUserInfo}
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
              value={setUserInfo.userZipCode}
              onChange={handleSetUserInfo}
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
              value={setUserInfo.userAddr}
              onChange={handleSetUserInfo}
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
              value={setUserInfo.userAddrDesc}
              onChange={handleSetUserInfo}
            ></TextField>
          </FormControl>
        </Grid2>

        {/*-- 생년월일 --*/}
        <Grid2 size={0.5} sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            onClick={() =>
              setSetUserInfo({
                ...setUserInfo,
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
                  setUserInfo.userBirth
                    ? dayjs(setUserInfo.userBirth, "YYYY/M/D")
                    : null
                }
                onChange={(newValue) =>
                  setSetUserInfo({
                    ...setUserInfo,
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
                value="Y"
                checked={setUserInfo.alarmYn}
                onChange={handleSetUserInfo}
              />
            }
            label="devsixt에서 보내는 알림을 수신하는데 동의합니다. (메일, 문자)"
          />
        </Grid2>

        {/*-- 버튼 --*/}
        <Grid2 size={12} sx={{ display: "flex", justifyContent: "end" }}>
          <Button
            variant="contained"
            onClick={() => setSetUserInfo({ ...setUserInfo, lastChng: "all" })}
          >
            수정하기
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

export default SetUser;
