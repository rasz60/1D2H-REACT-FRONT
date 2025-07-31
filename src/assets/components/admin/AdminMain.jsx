import { Box, Divider, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import MenuAdmin from "./MenuAdmin";
import UserAdmin from "./UserAdmin";

const AdminMain = () => {
  const [selected, setSelected] = useState(0);
  const handleForm = (event, value) => {
    setSelected(value);
  };

  return (
    <Box id="admin">
      <Tabs
        value={selected}
        onChange={handleForm}
        variant="scrollable"
        scrollButtons="auto"
      >
        <Tab label="메뉴관리" />
        <Tab label="회원관리" />
      </Tabs>

      <Divider />

      <Box id="admin-form">
        {selected === null ? (
          <></>
        ) : selected === 0 ? (
          <MenuAdmin></MenuAdmin>
        ) : (
          <UserAdmin></UserAdmin>
        )}
      </Box>
    </Box>
  );
};

export default AdminMain;
