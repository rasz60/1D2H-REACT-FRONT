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

import LazyIcon from "@compo/common/IconPreview";

const SlideMenu = ({ isBackdrop, setBackdrop }) => {
  const [menu, setMenu] = useState([]);
  const { getMdiIcon } = getIcon();
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
            <ListItem className="slide-menu-item">
              <Link
                key={item.menuName}
                to={item.menuUrl}
                onClick={handleMoveMenu}
                target={item.menuTarget}
              >
                <IconButton>
                  <LazyIcon iconName={item.menuIcon} />
                </IconButton>
                <span>
                  {item.menuName.split("").map((char) => (
                    <Icon path={getMdiIcon(char)} size={1} />
                  ))}
                </span>
              </Link>
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
