import { AppBar, Toolbar, Grid2, IconButton, Avatar } from "@mui/material";
import {
  Menu,
  Login,
  Logout,
  AccountCircle,
  Settings,
} from "@mui/icons-material";
import BackdropWrapper from "@compo/common/Backdrop";
import BackdropMethods from "@js/backdrop";
import axiosInstance from "@utils/axiosInstance";

import { useAuth } from "@context/AuthContext";
import { useNavigate } from "react-router-dom";

const Header = ({ isScroll }) => {
  const navigator = useNavigate();
  const { isBackdrop, setBackdrop } = BackdropMethods();
  const { getIsAuthentication, getAuthLv, logoutCallback } = useAuth();
  const isAuthentication = getIsAuthentication();
  const authLv = getAuthLv();

  const handleBackdrop = (layout) => {
    setBackdrop({
      ...isBackdrop,
      type: isBackdrop.layout === layout ? !isBackdrop.open : true,
      layout: layout,
    });
  };

  const handleMoveHome = () => {
    window.location.href = "/";
  };

  const handleLogout = () => {
    if (window.confirm("로그아웃 할까요?")) {
      axiosInstance
        .post("/auth/logout")
        .then(() => {
          logoutCallback();
          window.location.href = "/";
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    }
  };

  const handleAdmin = () => {
    navigator("/admin");
  };

  return (
    <AppBar id="header-wrapper" position="static" color="secondary">
      <Toolbar id="header" className={isScroll ? "scrolled" : "notScrolled"}>
        <Grid2
          container
          id="header-menu"
          className={isScroll ? "scrolled" : "notScrolled"}
        >
          <Grid2 size={4} id="col-menu">
            <IconButton size="large" onClick={() => handleBackdrop("menu")}>
              <Menu />
            </IconButton>
          </Grid2>
          <Grid2 size={4} id="col-logo">
            <Avatar
              onClick={handleMoveHome}
              id="logo"
              alt="devsixt"
              src="https://avatars.githubusercontent.com/u/96821067?v=4"
            />
          </Grid2>
          <Grid2 size={4} id="col-button">
            {isAuthentication && (
              <IconButton size="large">
                <AccountCircle />
              </IconButton>
            )}
            {isAuthentication && authLv > 2 && (
              <IconButton size="large" onClick={handleAdmin}>
                <Settings />
              </IconButton>
            )}
            {isAuthentication && (
              <IconButton size="large" onClick={handleLogout}>
                <Logout />
              </IconButton>
            )}
            {!isAuthentication && (
              <IconButton size="large" onClick={() => handleBackdrop("login")}>
                <Login />
              </IconButton>
            )}
          </Grid2>
        </Grid2>
      </Toolbar>
      <BackdropWrapper isBackdrop={isBackdrop} setBackdrop={setBackdrop} />
    </AppBar>
  );
};

export default Header;
