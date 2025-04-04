import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Grid2,
  IconButton,
  Avatar,
  Backdrop,
} from "@mui/material";
import { Menu, Login, Logout, AccountCircle } from "@mui/icons-material";

import SlideMenu from "../components/SlideMenu";
import LoginModal from "../components/LoginModal";

import { useAuth } from "../../context/AuthContext";

const Header = ({ isScroll }) => {
  const [isBackdrop, setIsBackdrop] = useState({
    open: false,
    menu: false,
    login: false,
  });

  const { getIsAuthentication, logoutCallback } = useAuth();
  const isAuthentication = getIsAuthentication();
  const handleBackdrop = (type) => {
    let backdrop = {
      open: !isBackdrop.open,
      menu: type === "menu",
      login: type === "login",
    };
    setIsBackdrop(backdrop);
  };

  const handleLogout = () => {
    if (window.confirm("로그아웃 할까요?")) {
      logoutCallback();
      window.location.href = "/";
    }
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
              component={Link}
              to="/"
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
      <Backdrop id="header-backdrop" open={isBackdrop.open}>
        {isBackdrop.menu && <SlideMenu />}
        {isBackdrop.login && <LoginModal />}
      </Backdrop>
    </AppBar>
  );
};

export default Header;
