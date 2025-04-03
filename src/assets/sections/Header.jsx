import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Grid2,
  IconButton,
  Avatar,
  Backdrop,
  Box,
  List,
  ListItem,
} from "@mui/material";
import { Menu, Login, AccountCircle } from "@mui/icons-material";

import SlideMenu from "../components/SlideMenu";
import LoginModal from "../components/LoginModal";
const Header = () => {
  const [isScroll, setIsScroll] = useState(false);
  const [isBackdrop, setIsBackdrop] = useState({
    open: false,
    menu: false,
    login: false,
  });

  const handleBackdrop = (type) => {
    let backdrop = {
      open: !isBackdrop.open,
      menu: type === "menu",
      login: type === "login",
    };
    setIsBackdrop(backdrop);
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
            <IconButton size="large">
              <AccountCircle />
            </IconButton>
            <IconButton size="large" onClick={() => handleBackdrop("login")}>
              <Login />
            </IconButton>
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
