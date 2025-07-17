/*-- Router-Link --*/
import { Link } from "react-router-dom";

/*-- MUI --*/
import { Grid2, Box, List, ListItem, IconButton } from "@mui/material";

/*-- axios --*/
import axiosInstance from "@utils/axiosInstance";

/*-- MDI --*/
import Icon from "@mdi/react";
import getIcon from "@js/menuIcon.js";
import { useState, useEffect } from "react";

const SlideMenu = ({ isBackdrop, setBackdrop }) => {
  const [menu, setMenu] = useState([]);
  const { getMdiIcon, getMuiIcon } = getIcon();
  const menuInfo = async () => {
    await axiosInstance
      .get("/menu/getMenus")
      .then((res) => {
        setMenu(res.data);
      })
      .catch((err) => {
        setBackdrop(false);
      });
  };

  const handleMoveMenu = () => {
    setBackdrop(false);
  };

  useEffect(() => {
    menuInfo();
  }, []);

  const handleClick = (e) => {
    if (e.target.id === "slide-menu-box") {
      setBackdrop(false);
    }
  };

  return (
    <Box id="slide-menu-box" onClick={handleClick}>
      <List id="slide-menu-list">
        {menu ? (
          menu.map((item) => (
            <ListItem
              key={item.menuName}
              component={Link}
              onClick={handleMoveMenu}
              to={item.menuUrl}
              className="slide-menu-item"
              target={item.menuTarget}
            >
              <Grid2 container className="slide-menu-item-row">
                <Grid2 size={1} className="slide-menu-item-col icon">
                  <IconButton>{getMuiIcon(item.menuIcon)}</IconButton>
                </Grid2>
                <Grid2 size={11} className="slide-menu-item-col name">
                  <span>
                    {item.menuName.split("").map((char) => (
                      <Icon path={getMdiIcon(char)} size={1} />
                    ))}
                  </span>
                </Grid2>
              </Grid2>
            </ListItem>
          ))
        ) : (
          <></>
        )}
      </List>
    </Box>
  );
};

export default SlideMenu;
