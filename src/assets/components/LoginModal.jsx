import { useState } from "react";
import { Box, Button, FormControl, TextField } from "@mui/material";
import { VpnKey, PersonAdd } from "@mui/icons-material";
import axiosInstance from "../../utils/axiosInstance";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginModal = ({ setBackdrop }) => {
  const navigate = useNavigate();
  const { loginCallback } = useAuth();
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

    axiosInstance
      .post("auth/login", loginInfo)
      .then((res) => {
        loginCallback(res.data.token);
        window.location.href = "/";
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  const handleSignUp = () => {
    setBackdrop(false);
    navigate("/signup");
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
          sx={{ ml: 1, mr: 1 }}
        >
          Login
        </Button>

        <Button
          color="secondary"
          variant="outlined"
          startIcon={<PersonAdd />}
          onClick={handleSignUp}
          sx={{ ml: 1, mr: 1 }}
        >
          Sign Up
        </Button>
      </Box>
    </Box>
  );
};

export default LoginModal;
