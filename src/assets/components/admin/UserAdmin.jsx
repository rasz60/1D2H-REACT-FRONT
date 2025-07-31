import { Search } from "@mui/icons-material";
import {
  Box,
  FormControl,
  FormHelperText,
  Grid2,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import axiosInstance from "@src/utils/axiosInstance";
import { useEffect, useState } from "react";

const UserAdmin = () => {
  const [search, setSearch] = useState({
    type: "ID",
    keyword: "",
  });

  const [render, setRender] = useState(false);

  const [valid, setValid] = useState({
    type: { flag: true, msg: "" },
    keyword: { flag: true, msg: "" },
  });

  const handleSearchType = (newValue) => {
    setSearch((prev) => ({
      ...prev,
      type: newValue,
      keyword: newValue === "ROLE" || prev.type === "ROLE" ? "" : prev.keyword,
    }));
  };

  const handleSearchKeyword = (newValue) => {
    setSearch((prev) => ({
      ...prev,
      keyword: newValue,
    }));
  };

  const validate = () => {
    let chk = true;
    let type = { type: { flag: true, msg: "" } };
    if (render && !search.type) {
      chk = false;
      type.type.flag = false;
      type.type.msg = "선택해주세요.";
    }

    let keyword = { keyword: { flag: true, msg: "" } };
    if (render && !search.keyword) {
      chk = false;
      keyword.keyword.flag = false;
      keyword.keyword.msg = "검색어를 입력해주세요.";
    }

    setValid(Object.assign(type, keyword));

    return chk;
  };

  useEffect(() => {
    validate();
    if (!render) {
      setRender(true);
    }
  }, [search]);

  const handleSearch = async () => {
    let rst = validate();

    if (rst) {
      await axiosInstance
        .get("/auth/getUserInfo/" + search.type + "/" + search.keyword)
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <Box id="auth-form">
      <Grid2 container spacing={1}>
        {/*-- Search Input --*/}
        <Grid2 container size={12} id="search-input-row">
          <Grid2 size={2}>
            <FormControl fullWidth error={!valid.type.flag}>
              <InputLabel id="menu-use-yn" className="input-label">
                유형
              </InputLabel>
              <Select
                variant="standard"
                value={search.type}
                onChange={(ev) => handleSearchType(ev.target.value)}
              >
                <MenuItem value={"ID"}>계정(ID)</MenuItem>
                <MenuItem value={"EMAIL"}>이메일</MenuItem>
                <MenuItem value={"PHONE"}>연락처</MenuItem>
                <MenuItem value={"ROLE"}>역할</MenuItem>
              </Select>
              <FormHelperText>{valid.type.msg}</FormHelperText>
            </FormControl>
          </Grid2>
          <Grid2 size={8}>
            {search.type !== "ROLE" ? (
              <FormControl fullWidth>
                <TextField
                  type="text"
                  variant="standard"
                  label="검색할 값을 입력해주세요."
                  value={search.keyword}
                  onChange={(ev) => handleSearchKeyword(ev.target.value)}
                  error={!valid.keyword.flag}
                  helperText={valid.keyword.msg}
                ></TextField>
              </FormControl>
            ) : (
              <FormControl fullWidth error={!valid.keyword.flag}>
                <InputLabel id="menu-use-yn" className="input-label">
                  사용자역할
                </InputLabel>
                <Select
                  variant="standard"
                  value={search.keyword}
                  onChange={(ev) => handleSearchKeyword(ev.target.value)}
                >
                  <MenuItem value={"ROLE_USER"}>일반유저</MenuItem>
                  <MenuItem value={"ROLE_ADMIN"}>관리자</MenuItem>
                </Select>
                <FormHelperText>{valid.keyword.msg}</FormHelperText>
              </FormControl>
            )}
          </Grid2>
          <Grid2 size={2} id="search-btn-box" onClick={handleSearch}>
            <Search size="small" />
            &nbsp; 검색
          </Grid2>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default UserAdmin;
