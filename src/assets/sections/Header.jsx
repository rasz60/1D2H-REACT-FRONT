import { useEffect, useState } from "react";
import { AppBar, Toolbar, Grid2, IconButton, Avatar } from "@mui/material";
import { Menu, Login, AccountCircle } from "@mui/icons-material";
const Header = () => {
  const [isScroll, setIsScroll] = useState(
    document.scrollingElement.scrollTop > 0
  );

  return (
    <AppBar id="header-wrapper" position="static" color="secondary">
      <Toolbar id="header" className={isScroll ? "scrolled" : "notScrolled"}>
        <Grid2
          container
          id="header-menu"
          className={isScroll ? "scrolled" : "notScrolled"}
        >
          <Grid2 size={4} id="col-menu">
            <IconButton size="large">
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
    </AppBar>
  );
};

export default Header;
