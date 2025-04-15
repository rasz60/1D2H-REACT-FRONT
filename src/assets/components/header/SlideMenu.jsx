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
        console.log(err);
      });
  };

  const handleMoveMenu = () => {
    setBackdrop(false);
  };

  useEffect(() => {
    menuInfo();
  }, []);

  return (
    <Box id="slide-menu-box">
      <List id="slide-menu-list">
        {menu.length > 0 ? (
          menu.map((item) => (
            <ListItem
              component={Link}
              onClick={handleMoveMenu}
              to={item.menuUrl}
              className="slide-menu-item"
            >
              <Grid2 container className="slide-menu-item-row">
                <Grid2 size={2.5} className="slide-menu-item-col icon">
                  <IconButton>{getMuiIcon(item.menuIcon)}</IconButton>
                </Grid2>
                <Grid2 size={9.5} className="slide-menu-item-col name">
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
