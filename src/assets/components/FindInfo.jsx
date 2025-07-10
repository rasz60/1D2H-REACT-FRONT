import { useState } from "react";

/*-- MUI --*/
import {
  Box,
  Grid2,
  FormControl,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Tabs,
  Tab,
} from "@mui/material";
import { AlternateEmail, Search } from "@mui/icons-material";

/*-- AXIOS --*/
import axiosInstance from "@utils/axiosInstance";

const FindInfo = () => {
  const [title, setTitle] = useState("아이디 찾기");
  const [selectedTab, setSelectedTab] = useState(0);
  const [findInfo, setFindInfo] = useState({
    userEmailId: "",
    userEmailDomain: "",
    userEmailDomainSelect: "",
    domainSelf: false,
    userId: "",
  });

  const handleTabClick = (event, newValue) => {
    setSelectedTab(newValue);
    console.log(newValue);
    if (newValue === 0) {
      setTitle("아이디 찾기");
    } else {
      setTitle("비밀번호 찾기");
    }
  };

  const emailDomainList = ["gmail.com", "naver.com", "hanmail.net"];

  const handleFindInfo = (event) => {
    let { name, value } = event.target;

    if (name === "userEmailDomainSelect") {
      setFindInfo((prev) => ({
        ...prev,
        [name]: value,
        userEmailDomain: value === "self" ? "" : value,
        domainSelf: value === "self",
      }));
    } else {
      setFindInfo((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSend = async () => {
    let callUrl = "";

    if (!findInfo.userEmailId || !findInfo.userEmailDomain) {
      alert("이메일 주소를 입력해주세요.");
      return;
    }

    if (selectedTab > 0 && !findInfo.userId) {
      alert("아이디를 입력해주세요.");
      return;
    }

    callUrl = selectedTab === 0 ? "auth/findId" : "auth/findPw";

    await axiosInstance
      .post(callUrl, findInfo)
      .then((res) => {
        alert(res.data);
      })
      .catch((err) => {
        alert("일시적 오류로 조회에 실패했습니다.");
        console.log(err);
      });
  };

  return (
    <Box id="find-info-box">
      <Grid2 container>
        <Grid2 size={12} sx={{ textAlign: "center" }}>
          <Tabs
            value={selectedTab}
            onChange={handleTabClick}
            variant="scrollable"
            scrollButtons={false}
            aria-label="scrollable prevent tabs example"
          >
            <Tab label="아이디 찾기" />
            <Tab label="비밀번호 찾기" />
          </Tabs>
        </Grid2>
      </Grid2>

      {/*-- id 찾기 --*/}
      <Box id="find-info-pw">
        <Grid2 container spacing={2}>
          <Grid2 size={12}>
            <h2>{title}</h2>
          </Grid2>

          <Grid2 container size={12} spacing={2}>
            {selectedTab === 1 && (
              <Grid2 size={12}>
                <FormControl fullWidth>
                  <TextField
                    required
                    label="아이디(ID)"
                    name="userId"
                    value={findInfo.userId}
                    onChange={(event) => handleFindInfo(event)}
                  ></TextField>
                </FormControl>
              </Grid2>
            )}

            <Grid2 size={4.5}>
              <FormControl fullWidth>
                <TextField
                  required
                  label="이메일 아이디(E-mail ID)"
                  name="userEmailId"
                  value={findInfo.userEmailId}
                  onChange={(event) => handleFindInfo(event)}
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
                  id="email-domain"
                  name="userEmailDomain"
                  label="이메일 주소(E-mail Domain)"
                  value={findInfo.userEmailDomain}
                  slotProps={{
                    input: {
                      readOnly: !findInfo.domainSelf,
                    },
                  }}
                  onChange={(event) => handleFindInfo(event)}
                ></TextField>
              </FormControl>
            </Grid2>
            <Grid2 size={3}>
              <FormControl fullWidth>
                <InputLabel required id="email-domain-label">
                  선택(Choose)
                </InputLabel>
                <Select
                  required
                  labelId="email-domain-label"
                  name="userEmailDomainSelect"
                  value={findInfo.userEmailDomainSelect}
                  label="선택(Choose)"
                  onChange={(event) => handleFindInfo(event)}
                >
                  <MenuItem value={""}>선택...</MenuItem>
                  {emailDomainList ? (
                    emailDomainList.map((domain) => (
                      <MenuItem value={domain}>{domain}</MenuItem>
                    ))
                  ) : (
                    <></>
                  )}
                  <MenuItem value={"self"}>직접입력</MenuItem>
                </Select>
              </FormControl>
            </Grid2>
          </Grid2>

          <Grid2 container size={12} spacing={2}>
            <Grid2 size={12} sx={{ textAlign: "right" }}>
              <Button
                variant="contained"
                startIcon={<Search />}
                onClick={handleSend}
                sx={{ ml: 1, mr: 1 }}
              >
                찾기
              </Button>
            </Grid2>
          </Grid2>
        </Grid2>
      </Box>
    </Box>
  );
};

export default FindInfo;
