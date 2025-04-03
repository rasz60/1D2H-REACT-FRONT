import { useState } from "react";
import { Box, Button, FormControl, TextField } from "@mui/material";
import { VpnKey } from "@mui/icons-material";
import axios from "axios";
const LoginModal = () => {
  const [loginInfo, setLoginInfo] = useState({ userId: "", userPwd: "" });
  const handleChng = (event) => {
    const { name, value } = event.target;

    setLoginInfo({
      ...loginInfo,
      [name]: value,
    });
  };
  const handleLogin = () => {
    if (loginInfo.userId.trim() === "") {
      alert("아이디를 입력해주세요.");
      return false;
    }

    if (loginInfo.userPwd.trim() === "") {
      alert("비밀번호를 입력해주세요.");
      return false;
    }

    axios
      .post("/api/auth/login", loginInfo)
      .then((res) => {})
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  return (
    <Box id="login-modal-box">
      <Box id="login-modal-input-box">
        <FormControl fullWidth sx={{ mt: 2, mb: 2 }}>
          <TextField
            type="text"
            name="userId"
            label="아이디(ID)"
            variant="filled"
            value={loginInfo.userId}
            onChange={handleChng}
          ></TextField>
        </FormControl>

        <FormControl fullWidth sx={{ mt: 2, mb: 2 }}>
          <TextField
            type="password"
            name="userPwd"
            label="비밀번호(Password)"
            variant="filled"
            value={loginInfo.userPwd}
            onChange={handleChng}
          ></TextField>
        </FormControl>
      </Box>
      <Box id="login-modal-button-box" sx={{ mt: 2, mb: 2 }}>
        <Button
          variant="contained"
          startIcon={<VpnKey />}
          onClick={handleLogin}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default LoginModal;
