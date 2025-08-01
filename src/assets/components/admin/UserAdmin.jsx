import { ArrowDropDown, ArrowDropUp, Search } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  Divider,
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
  /*-- useState --*/
  const [search, setSearch] = useState({
    type: "userId",
    keyword: "",
    signOut: false,
    sort: "ASC",
    sortColumn: "userMgmtNo",
  });
  const [render, setRender] = useState(false);
  const [valid, setValid] = useState({
    type: { flag: true, msg: "" },
    keyword: { flag: true, msg: "" },
  });
  const [searchResult, setSearchResult] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);

  /*-- handle methods --*/
  const handleSearchType = (newValue) => {
    setSearch((prev) => ({
      ...prev,
      type: newValue,
      keyword:
        newValue === "userRole" || prev.type === "userRole" ? "" : prev.keyword,
    }));
  };

  const handleSearchKeyword = (newValue) => {
    setSearch((prev) => ({
      ...prev,
      keyword: newValue,
    }));
  };

  const handleSearchSignOut = (newValue) => {
    setSearch((prev) => ({
      ...prev,
      signOut: newValue,
    }));
  };

  const handleSort = (value) => {
    if (searchResult.length > 0) {
      setSearch((prev) => ({
        ...prev,
        sort:
          prev.sortColumn !== value
            ? "ASC"
            : prev.sort === "DESC"
              ? "ASC"
              : "DESC",
        sortColumn:
          prev.sortColumn === value && prev.sort === "DESC"
            ? "userMgmtNo"
            : value,
      }));
    }
  };

  const handleSearch = async () => {
    let rst = validate();

    if (rst) {
      await axiosInstance
        .post("/auth/getUserInfo", search)
        .then((res) => {
          setSearchResult(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  /*-- validate methods --*/

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

  const handleChecked = (ev) => {
    setSelectedUser((prev) =>
      ev.target.checked
        ? [...prev, ev.target.value]
        : prev.filter((v) => v !== ev.target.value)
    );
  };

  const handleUserRole = async (role) => {
    let chk = await window.confirm(
      "선택한 회원의 역할을 " +
        (role === "Admin" ? "관리자" : "일반 유저") +
        "로 변경할까요?"
    );

    if (chk) {
      await axiosInstance
        .post("/auth/updateUserRole/" + role, JSON.stringify(selectedUser), {
          headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
          alert(res.data);
          handleSearch();
        })
        .catch((err) => console.log(err));
    }
  };

  const handleUserSignOut = async () => {
    let chk = await window.confirm(
      "선택한 회원의 계정을 강제로 탈퇴 처리할까요?"
    );

    if (chk) {
      await axiosInstance
        .post("/auth/adminUserSignOut", JSON.stringify(selectedUser), {
          headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
          alert(res.data);
          handleSearch();
        })
        .catch((err) => console.log(err));
    }
  };

  /*-- useEffect --*/
  useEffect(() => {
    if (searchResult.length > 0 && search.sortColumn !== "") {
      searchResult.sort((a, b) => {
        let A =
          search.sort === "ASC" ? a[search.sortColumn] : b[search.sortColumn];
        let B =
          search.sort === "ASC" ? b[search.sortColumn] : a[search.sortColumn];

        A = A === null ? "" : A;
        B = B === null ? "" : B;

        return A < B ? -1 : A > B ? 1 : 0;
      });
    }

    validate();

    if (!render) {
      setRender(true);
    }
  }, [search]);

  return (
    <Box id="auth-form">
      {/*-- Search Input --*/}
      <Grid2 container spacing={1}>
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
                <MenuItem value={"userId"}>계정(ID)</MenuItem>
                <MenuItem value={"userEmail"}>이메일</MenuItem>
                <MenuItem value={"userPhone"}>연락처</MenuItem>
                <MenuItem value={"userRole"}>역할</MenuItem>
              </Select>
              <FormHelperText>{valid.type.msg}</FormHelperText>
            </FormControl>
          </Grid2>
          <Grid2 size={6.4}>
            {search.type !== "userRole" ? (
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
                <InputLabel className="input-label">사용자역할</InputLabel>
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
          <Grid2 size={1.6}>
            <InputLabel className="input-label">
              <Checkbox
                size="xsmall"
                checked={search.signOut}
                onChange={(ev) => handleSearchSignOut(ev.target.checked)}
              />
              탈퇴회원 포함
            </InputLabel>
          </Grid2>
          <Grid2 size={2} id="search-btn-box" onClick={handleSearch}>
            <Search size="small" />
            &nbsp; 검색
          </Grid2>
        </Grid2>
      </Grid2>
      {/*-- result list --*/}
      <Box id="search-result-list">
        <Grid2 container spacing={1} id="search-result-top">
          <Grid2 size={2}>결과 {searchResult.length} 건</Grid2>
          <Grid2 size={6}></Grid2>
          <Grid2 size={4} id="search-result-funcBtn">
            {selectedUser.length > 0 ? (
              <>
                <Button
                  variant="contained"
                  size="small"
                  onClick={(ev) => handleUserRole("admin")}
                >
                  관리자로 변경
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  color="warning"
                  onClick={(ev) => handleUserRole("user")}
                >
                  일반유저로 변경
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  color="error"
                  onClick={handleUserSignOut}
                >
                  강제탈퇴
                </Button>
              </>
            ) : (
              <></>
            )}
          </Grid2>
        </Grid2>
        <Divider />
        <br />
        {searchResult.length > 0 ? (
          <Grid2 container spacing={1}>
            <Grid2 container size={12} className="search-result-header">
              <Grid2 size={0.5}></Grid2>
              <Grid2
                size={1}
                className="sort"
                onClick={(ev) => handleSort("userId")}
              >
                ID
                {search.sortColumn === "userId" ? (
                  search.sort === "ASC" ? (
                    <ArrowDropUp />
                  ) : (
                    <ArrowDropDown />
                  )
                ) : (
                  <></>
                )}
              </Grid2>
              <Grid2
                size={1}
                className="sort"
                onClick={(ev) => handleSort("userRole")}
              >
                역할
                {search.sortColumn === "userRole" ? (
                  search.sort === "ASC" ? (
                    <ArrowDropUp />
                  ) : (
                    <ArrowDropDown />
                  )
                ) : (
                  <></>
                )}
              </Grid2>
              <Grid2
                size={2}
                className="sort"
                onClick={(ev) => handleSort("userEmail")}
              >
                이메일
                {search.sortColumn === "userEmail" ? (
                  search.sort === "ASC" ? (
                    <ArrowDropUp />
                  ) : (
                    <ArrowDropDown />
                  )
                ) : (
                  <></>
                )}
              </Grid2>
              <Grid2
                size={1.5}
                className="sort"
                onClick={(ev) => handleSort("userPhone")}
              >
                연락처
                {search.sortColumn === "userPhone" ? (
                  search.sort === "ASC" ? (
                    <ArrowDropUp />
                  ) : (
                    <ArrowDropDown />
                  )
                ) : (
                  <></>
                )}
              </Grid2>
              <Grid2
                size={2}
                className="sort"
                onClick={(ev) => handleSort("signUpDate")}
              >
                가입일
                {search.sortColumn === "signUpDate" ? (
                  search.sort === "ASC" ? (
                    <ArrowDropUp />
                  ) : (
                    <ArrowDropDown />
                  )
                ) : (
                  <></>
                )}
              </Grid2>
              <Grid2
                size={2}
                className="sort"
                onClick={(ev) => handleSort("latestVisitDate")}
              >
                마지막방문일
                {search.sortColumn === "latestVisitDate" ? (
                  search.sort === "ASC" ? (
                    <ArrowDropUp />
                  ) : (
                    <ArrowDropDown />
                  )
                ) : (
                  <></>
                )}
              </Grid2>
              <Grid2 size={2}>탈퇴일자</Grid2>
            </Grid2>
            {searchResult.map((result) => (
              <Grid2
                container
                size={12}
                className={
                  "search-result-row so-" + result.userSignOutYn.toLowerCase()
                }
              >
                <Grid2 size={0.5}>
                  <Checkbox
                    name="targetUser"
                    size="xsmall"
                    value={result.userMgmtNo}
                    onChange={(ev) => handleChecked(ev)}
                  />
                </Grid2>
                <Grid2 size={1}>{result.userId}</Grid2>
                <Grid2 size={1}>{result.userRoleName}</Grid2>
                <Grid2 size={2}>{result.userEmail}</Grid2>
                <Grid2 size={1.5}>{result.userPhone}</Grid2>
                <Grid2 size={2}>{result.signUpDate}</Grid2>
                <Grid2 size={2}>{result.latestVisitDate}</Grid2>
                <Grid2 size={2}>{result.userExpiredDate}</Grid2>
              </Grid2>
            ))}
          </Grid2>
        ) : (
          <></>
        )}
      </Box>
    </Box>
  );
};

export default UserAdmin;
