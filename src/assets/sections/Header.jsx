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
const Header = () => {
  const [isScroll, setIsScroll] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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
            <IconButton size="large" onClick={handleMenu}>
              <Menu />
            </IconButton>
          </Grid2>
          <Grid2 size={4} id="col-logo">
            <Avatar
              id="logo"
              alt="devsixt"
              src="https://avatars.githubusercontent.com/u/96821067?v=4"
            />
          </Grid2>
          <Grid2 size={4} id="col-button">
            <IconButton size="large">
              <AccountCircle />
            </IconButton>
            <IconButton size="large">
              <Login />
            </IconButton>
          </Grid2>
        </Grid2>
      </Toolbar>
      <Backdrop id="slide-menu-backdrop" open={isMenuOpen} onClick={handleMenu}>
        <Box id="slide-menu-box">
          <List id="slide-menu-list">
            <ListItem component={Link} to="/test" className="slide-menu-item">
              <Grid2 container className="slide-menu-item-row">
                <Grid2 size={1} className="slide-menu-item-col icon">
                  123
                </Grid2>
                <Grid2 size={11} className="slide-menu-item-col name">
                  123
                </Grid2>
              </Grid2>
            </ListItem>
          </List>
        </Box>
      </Backdrop>
    </AppBar>
  );
};

export default Header;
