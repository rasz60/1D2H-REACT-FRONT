import {
  Box,
  FormControl,
  Grid2,
  InputLabel,
  List,
  ListItemButton,
  ListItemText,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import axiosInstance from "@src/utils/axiosInstance";
import { useEffect, useState } from "react";

const MenuAdmin = () => {
  const [menuList, setMenuList] = useState(null);
  const [selected, setSelected] = useState(null);
  const [menuDetails, setMenuDetails] = useState({
    menuName: "",
    menuAuth: "",
    menuTarget: "",
    menuUrl: "",
    menuUseYn: "",
    menuIcon: "",
    menuRegDate: "",
    menuRegisterId: "",
    menuUpdateDate: "",
    menuUpdaterId: "",
    menuSortOrder: 0,
  });

  useEffect(() => {
    getMenuList();
  }, []);

  const getMenuList = () => {
    axiosInstance
      .get("/menu/getAllMenus")
      .then((res) => {
        setMenuList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleMenu = (idx) => {
    setSelected(idx);

    axiosInstance
      .get("/menu/getMenuDetails/" + menuList[idx].menuId)
      .then((res) => {
        setMenuDetails(res.data);
      })
      .catch((err) => {
        alert("실패.");
      });
  };

  const handleMenuInfo = (event) => {
    const { name, value } = event.target;

    setMenuDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Box>
      <Grid2 container spacing={1}>
        <Grid2 size={3} id="admin-menu-list">
          <List>
            {menuList ? (
              menuList.map((menu, idx) => (
                <ListItemButton
                  className={selected === idx ? "on" : "off"}
                  onClick={() => handleMenu(idx)}
                >
                  <ListItemText>{menu.menuName.toUpperCase()}</ListItemText>
                </ListItemButton>
              ))
            ) : (
              <></>
            )}
          </List>
        </Grid2>
        <Grid2 size={9} id="admin-menu-form">
          <Grid2 container spacing={1}>
            <Grid2 size={3} className="label">
              메뉴명
            </Grid2>
            <Grid2 size={9}>
              <FormControl fullWidth>
                <TextField
                  name="menuName"
                  type="text"
                  label="Menu Name"
                  variant="standard"
                  value={menuDetails.menuName}
                  onChange={handleMenuInfo}
                ></TextField>
              </FormControl>
            </Grid2>

            <Grid2 size={3} className="label">
              메뉴권한
            </Grid2>
            <Grid2 size={9}>
              <FormControl fullWidth>
                <InputLabel
                  required
                  id="menu-authority"
                  className="input-label"
                >
                  선택(Choose)
                </InputLabel>
                <Select
                  name="menuAuth"
                  labelId="menu-authority"
                  variant="standard"
                  value={menuDetails.menuAuth}
                  onChange={handleMenuInfo}
                >
                  <MenuItem value={""}>선택...</MenuItem>
                  <MenuItem value={"0"}>전체</MenuItem>
                  <MenuItem value={"1"}>회원</MenuItem>
                  <MenuItem value={"2"}>관리자</MenuItem>
                </Select>
              </FormControl>
            </Grid2>

            <Grid2 size={3} className="label">
              메뉴타겟
            </Grid2>
            <Grid2 size={9}>
              <FormControl fullWidth>
                <InputLabel required id="menu-target" className="input-label">
                  선택(Choose)
                </InputLabel>
                <Select
                  name="menuTarget"
                  labelId="menu-target"
                  variant="standard"
                  value={menuDetails.menuTarget}
                  onChange={handleMenuInfo}
                >
                  <MenuItem value={""}>선택...</MenuItem>
                  <MenuItem value={"_self"}>페이지 이동</MenuItem>
                  <MenuItem value={"_blank"}>새 탭</MenuItem>
                </Select>
              </FormControl>
            </Grid2>

            <Grid2 size={3} className="label">
              URL
            </Grid2>
            <Grid2 size={9}>
              <FormControl fullWidth>
                <TextField
                  name="menuUrl"
                  type="text"
                  label="Menu URL"
                  variant="standard"
                  value={menuDetails.menuUrl}
                  onChange={handleMenuInfo}
                ></TextField>
              </FormControl>
            </Grid2>

            <Grid2 size={3} className="label">
              사용여부
            </Grid2>
            <Grid2 size={9}>
              <FormControl fullWidth>
                <InputLabel required id="menu-use-yn" className="input-label">
                  선택(Choose)
                </InputLabel>
                <Select
                  name="menuUseYn"
                  labelId="menu-use-yn"
                  variant="standard"
                  value={menuDetails.menuUseYn}
                  onChange={handleMenuInfo}
                >
                  <MenuItem value={""}>선택...</MenuItem>
                  <MenuItem value={"Y"}>사용</MenuItem>
                  <MenuItem value={"N"}>미사용</MenuItem>
                </Select>
              </FormControl>
            </Grid2>

            <Grid2 size={3} className="label">
              아이콘
            </Grid2>
            <Grid2 size={9}>
              <FormControl fullWidth>
                <TextField type="search" autoComplete=""></TextField>
              </FormControl>
            </Grid2>
          </Grid2>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default MenuAdmin;
