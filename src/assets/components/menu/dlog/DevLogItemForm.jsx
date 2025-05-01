import { ControlPoint, List, Save } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Chip,
  FormControl,
  Grid2,
  IconButton,
  MenuItem,
  Select,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import axiosInstance from "@src/utils/axiosInstance";
import MDEditor from "@uiw/react-md-editor";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DevLogLangAddPopup from "./DevLogLangAddPopup";

const DevLogItemView = () => {
  const location = useLocation();
  const navigator = useNavigate();
  const [focused, setFocused] = useState(false);
  const [mode, setMode] = useState("e");
  const [groups, setGroups] = useState([]);
  const [toggleLang, setToggleLang] = useState(false);
  const [item, setItem] = useState({
    groupNo: 0,
    itemTitle: "",
    itemContents: "",
    itemLangs: [],
  });
  const [langs, setLangs] = useState(null);

  useEffect(() => {
    getGroups();
  }, []);

  useEffect(() => {
    if (location.pathname !== "/dlog/item/form") {
      let pathArr = location.pathname.split("/");
      let groupNo = pathArr[pathArr.length - 2];
      let itemNo = pathArr[pathArr.length - 1];
      getItem(groupNo, itemNo);
    }
  }, [groups]);

  const getGroups = async () => {
    await axiosInstance
      .get("/dlog/groupList")
      .then((res) => {
        setGroups(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getItem = async (groupNo, itemNo) => {
    let res = await axiosInstance.get(
      "/dlog/itemDetails/" + groupNo + "/" + itemNo
    );

    if (!res.status === 200) {
      alert("일시적인 오류로 조회에 실패했습니다.", function () {
        navigator("/dlog/list");
      });
    } else {
      setItem(res.data);
      setLangs(res.data.itemLangs);
    }
  };
  const onClickSave = async () => {
    if (!item.itemTitle) {
      alert("제목을 입력해주세요.");
      return;
    }

    if (!item.groupNo) {
      alert("그룹을 선택해주세요.");
      return;
    }

    if (!item.itemContents) {
      alert("내용을 입력해주세요.");
      return;
    }

    let res = await window.confirm("작성된 저장할까요?");

    if (res) {
      await axiosInstance
        .post("dlog/itemSave", item)
        .then((res) => {
          if (res.status === 200) {
            alert("저장이 완료되었습니다.");
            navigator("/dlog/list");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const onClickList = async () => {
    let res = await window.confirm(
      "작성된 내용을 저장하지 않고 목록으로 돌아갈까요?"
    );

    if (res) navigator("/dlog/list");
  };

  const handleGroupNo = (event) => {
    setItem({
      ...item,
      groupNo: event.target.value,
    });
  };

  const handleItemTitle = (event) => {
    setItem({
      ...item,
      itemTitle: event.target.value,
    });
  };

  const handleLangDelete = (langName) => {
    setLangs(langs.filter((lang) => lang.langName !== langName));
  };

  const handleEditor = (event) => {
    setItem({
      ...item,
      itemContents: event.target.value,
    });
  };

  const setLangDialog = (lang) => {
    setLangs((prev) => {
      let isDup = false;
      if (prev != null) {
        isDup = prev.some((prevLang) => prevLang.langId === lang.langId);
      } else {
        return [lang];
      }
      if (!isDup) {
        prev.push(lang);
        return prev;
      }

      return prev;
    });
    setToggleLang(false);
  };

  useEffect(() => {
    setItem({
      ...item,
      itemLangs: langs,
    });
  }, [langs]);

  return (
    <Box id="item-box">
      <Box id="item-header">
        <Box id="form-btn-box">
          <Button
            variant="contained"
            sx={{
              backgroundColor: "primary",
            }}
            size="small"
            startIcon={<Save />}
            onClick={onClickSave}
          >
            저장
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "grey",
            }}
            size="small"
            startIcon={<List />}
            onClick={onClickList}
          >
            목록
          </Button>
        </Box>

        <FormControl fullWidth className="item-form-control">
          <Grid2 container>
            <Grid2 size={2} className="item-form-label">
              제목 (Title)
            </Grid2>
            <Grid2 size={10}>
              <TextField
                sx={{ margin: 0 }}
                fullWidth
                type="text"
                variant="standard"
                value={item.itemTitle}
                onChange={(event) => handleItemTitle(event)}
              ></TextField>
            </Grid2>
          </Grid2>
        </FormControl>

        <FormControl fullWidth className="item-form-control">
          <Grid2 container>
            <Grid2 size={2} className="item-form-label">
              그룹 (Group)
            </Grid2>
            <Grid2 size={10}>
              <Select
                fullWidth
                required
                name="itemGroupInfo"
                value={item.groupNo}
                onChange={(event) => handleGroupNo(event)}
              >
                <MenuItem value={""}>선택...</MenuItem>
                {groups ? (
                  groups.map((group) => (
                    <MenuItem value={group.groupNo}>
                      {"#" + group.groupNo + ". " + group.groupTitle}
                    </MenuItem>
                  ))
                ) : (
                  <></>
                )}
              </Select>
            </Grid2>
          </Grid2>
        </FormControl>

        <FormControl fullWidth className="item-form-control">
          <Grid2 container>
            <Grid2 size={2} className="item-form-label">
              사용언어 (Language)
              <IconButton
                size="small"
                id="lang-add-button"
                color="primary"
                onClick={() => setToggleLang(!toggleLang)}
              >
                <ControlPoint />
              </IconButton>
              <DevLogLangAddPopup
                toggleLang={toggleLang}
                setToggleLang={setToggleLang}
                setLangDialog={setLangDialog}
              />
            </Grid2>
            <Grid2 size={10}>
              <Box id="item-langs">
                {langs ? (
                  langs.map((lang) => (
                    <Chip
                      avatar={
                        <Avatar
                          className="lang-chip-avatar"
                          sx={{
                            backgroundColor: lang.langTypeColor,
                          }}
                        >
                          {lang.langType.substring(0, 1)}
                        </Avatar>
                      }
                      className="lang-chip"
                      label={lang.langName}
                      variant="outlined"
                      onDelete={() => handleLangDelete(lang.langName)}
                    ></Chip>
                  ))
                ) : (
                  <></>
                )}
              </Box>
            </Grid2>
          </Grid2>
        </FormControl>

        <hr />
      </Box>
      <Box id="item-contents-button">
        <ButtonGroup
          disableElevation
          size="small"
          aria-label="Disabled button group"
        >
          <Button
            variant={mode === "e" ? "contained" : "outlined"}
            value="e"
            onClick={() => setMode("e")}
          >
            Edit
          </Button>
          <Button
            variant={mode === "v" ? "contained" : "outlined"}
            value="v"
            onClick={() => setMode("v")}
          >
            View
          </Button>
        </ButtonGroup>
      </Box>
      <Box id="item-contents">
        <Box
          id="item-contents-wrapper"
          className={focused ? "focused " + mode : mode}
        >
          {mode === "e" ? (
            <TextareaAutosize
              id="item-contents-editor"
              value={item.itemContents}
              onChange={handleEditor}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
            ></TextareaAutosize>
          ) : (
            <MDEditor value={item.itemContents} preview="preview"></MDEditor>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default DevLogItemView;
