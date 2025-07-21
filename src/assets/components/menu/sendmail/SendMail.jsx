import { Send } from "@mui/icons-material";
import {
  Box,
  Button,
  Chip,
  FormControl,
  Grid2,
  TextField,
} from "@mui/material";
import { useAuth } from "@src/context/AuthContext";
import axiosInstance from "@src/utils/axiosInstance";
import { useEffect, useState } from "react";

const SendMail = () => {
  const { getIsAuthentication, getLoginUserId } = useAuth();
  const isAuthentication = getIsAuthentication();
  const [mailInfo, setMailInfo] = useState({
    toAddr: "1d2hadm@gmail.com",
    fromAddr: "",
    subject: "",
    contents: "",
    htmlContents: "",
  });

  useEffect(() => {
    if (isAuthentication) {
      let userId = getLoginUserId();

      axiosInstance
        .get("auth/getEmailAddr/" + userId)
        .then((res) => {
          setMailInfo((prev) => ({
            ...prev,
            fromAddr: res.data,
          }));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const handleChng = (event) => {
    let { name, value } = event.target;

    setMailInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const sendMail = async () => {
    console.log(mailInfo);
    let fromAddr = mailInfo.fromAddr;

    if (fromAddr) {
      if (!chkEmailAddr(fromAddr)) {
        alert("형식에 맞는 이메일 주소를 입력해주세요.");
        return false;
      }
    } else {
      alert("회신받을 메일 주소를 입력해주세요.");
      return false;
    }

    if (!mailInfo.subject) {
      alert("메일 제목을 입력해주세요.");
      return false;
    }

    if (!mailInfo.contents) {
      alert("메일로 전송할 내용을 입력해주세요.");
      return false;
    }

    // 메일 발송
    await axiosInstance.post("/contact/sendmail", mailInfo).then((res) => {
      alert(res.data);
    });
  };

  const chkEmailAddr = (emailAddr) => {
    let chk = false;
    if (emailAddr.includes("@")) {
      let emailArr = emailAddr.split("@");
      let emailDomain = "";
      if (emailArr.length === 2) {
        emailDomain = emailArr[1];
        if (emailDomain.includes(".") && emailDomain.split(".").length < 4) {
          chk = true;
        }
      }
    }
    return chk;
  };

  return (
    <Box sx={{ paddingTop: "2em" }}>
      <Grid2 container spacing={3}>
        <Grid2 size={3}>To.</Grid2>
        <Grid2 size={9}>
          <Chip
            variant="filled"
            label={"id2hAdmin <" + mailInfo.toAddr + ">"}
            color="primary"
          ></Chip>
        </Grid2>

        <Grid2 size={3}>From.</Grid2>
        <Grid2 size={9}>
          <FormControl fullWidth>
            <TextField
              type="email"
              name="fromAddr"
              value={mailInfo.fromAddr}
              variant="standard"
              onChange={handleChng}
              placeholder="회신받을 메일 주소를 입력해주세요. ;)"
            ></TextField>
          </FormControl>
        </Grid2>

        <Grid2 size={3}>Subject.</Grid2>
        <Grid2 size={9}>
          <FormControl fullWidth>
            <TextField
              type="email"
              name="subject"
              value={mailInfo.subject}
              variant="standard"
              onChange={handleChng}
              placeholder="메일 제목을 입력해주세요. ;)"
            ></TextField>
          </FormControl>
        </Grid2>

        <Grid2 size={12}>Contents</Grid2>
        <Grid2 size={12}>
          <FormControl fullWidth>
            <TextField
              name="contents"
              multiline
              rows={20}
              value={mailInfo.contents}
              onChange={handleChng}
              placeholder="메일로 전송할 내용을 입력해주세요. ;)"
            ></TextField>
          </FormControl>
        </Grid2>
        <Grid2 size={12} sx={{ display: "flex", justifyContent: "center" }}>
          <Button variant="contained" startIcon={<Send />} onClick={sendMail}>
            전송하기
          </Button>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default SendMail;
