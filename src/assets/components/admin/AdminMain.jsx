import { AssignmentInd, ListTwoTone } from "@mui/icons-material";
import {
  Box,
  Grid2,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useState } from "react";
import MenuAdmin from "./MenuAdmin";
import AuthAdmin from "./AuthAdmin";

const AdminMain = () => {
  const [selected, setSelected] = useState(null);

  const handleForm = (type) => {
    setSelected(type);
  };

  return (
    <Box id="admin">
      <Grid2 container id="admin-row" spacing={1}>
        <Grid2 size={2}>
          <List id="admin-list">
            <ListItemButton
              className={selected === "menu" ? "on" : "off"}
              onClick={() => handleForm("menu")}
            >
              <ListItemIcon>
                <ListTwoTone />
              </ListItemIcon>
              <ListItemText>Menu</ListItemText>
            </ListItemButton>
            <ListItemButton
              className={selected === "menu" ? "off" : "on"}
              onClick={() => handleForm("auth")}
            >
              <ListItemIcon>
                <AssignmentInd />
              </ListItemIcon>
              <ListItemText>Auth</ListItemText>
            </ListItemButton>
          </List>
        </Grid2>
        <Grid2 size={10}>
          <Box id="admin-form">
            {selected === null ? (
              <></>
            ) : selected === "menu" ? (
              <MenuAdmin></MenuAdmin>
            ) : (
              <AuthAdmin></AuthAdmin>
            )}
          </Box>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default AdminMain;
