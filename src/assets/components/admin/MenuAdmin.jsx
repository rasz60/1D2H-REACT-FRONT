import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  Grid2,
  IconButton,
  InputLabel,
  List,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import axiosInstance from "@src/utils/axiosInstance";
import { useEffect, useState } from "react";
import iconNames from "@src/assets/mui_icon_list.json";
import getIcon from "@js/menuIcon.js";
import Icon from "@mdi/react";
import LazyIcon from "./IconPreview";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import clsx from "clsx"; // 또는 classnames
import { Add, IosShare, PlusOne } from "@mui/icons-material";

const MenuAdmin = () => {
  const [reordered, setReordered] = useState(false);
  const [menuList, setMenuList] = useState(null);
  const [selected, setSelected] = useState(null);
  const { getMdiIcon } = getIcon();
  const [menuValidate, setMenuValidate] = useState({
    menuIcon: {
      flag: true,
      msg: "",
    },
    menuName: {
      flag: true,
      msg: "",
    },
    menuAuth: {
      flag: true,
      msg: "",
    },
    menuTarget: {
      flag: true,
      msg: "",
    },
    menuUrl: {
      flag: true,
      msg: "",
    },
    menuUseYn: {
      flag: true,
      msg: "",
    },
  });
  const [menuDetails, setMenuDetails] = useState({
    menuId: 0,
    menuName: "",
    menuAuth: "",
    menuTarget: "",
    menuUrl: "",
    menuUseYn: "",
    menuIcon: "",
    regDate: "",
    registerId: "",
    registerNo: 0,
    updateDate: "",
    updaterId: "",
    updaterNo: 0,
    menuSortOrder: 0,
  });

  const resetDetails = () => {
    setMenuDetails({
      menuId: 0,
      menuName: "",
      menuAuth: "",
      menuTarget: "",
      menuUrl: "",
      menuUseYn: "",
      menuIcon: "",
      regDate: "",
      registerId: "",
      registerNo: 0,
      updateDate: "",
      updaterId: "",
      updaterNo: 0,
      menuSortOrder: 0,
    });

    setMenuValidate({
      menuIcon: {
        flag: true,
        msg: "",
      },
      menuName: {
        flag: true,
        msg: "",
      },
      menuAuth: {
        flag: true,
        msg: "",
      },
      menuTarget: {
        flag: true,
        msg: "",
      },
      menuUrl: {
        flag: true,
        msg: "",
      },
      menuUseYn: {
        flag: true,
        msg: "",
      },
    });
  };

  const SortableItem = ({ id, onClick, isSelected }) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({ id });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      padding: "12px 16px",
      position: "relative",
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      margin: "4px 0",
      backgroundColor: isDragging ? "aliceblue" : "white",
      cursor: "pointer",
      zIndex: isDragging ? 1 : 0,
    };

    const className = clsx("sortable-item", {
      on: isSelected, // 선택된 요소만 클래스 추가
    });

    return (
      <div
        ref={setNodeRef}
        style={style}
        className={className}
        onClick={() => onClick(id.menuId)}
      >
        <div
          {...attributes}
          {...listeners}
          style={{
            padding: "4px",
            cursor: "grab",
          }}
        >
          ⠿
        </div>
        <div style={{ flex: 1 }}>{id.menuName.toUpperCase()}</div>
      </div>
    );
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  const handleDragEnd = async (event) => {
    const { active, over } = event;
    let chk = reordered;
    if (!chk) {
      chk = await window.confirm(
        "메뉴 순서 변경은 실제 메뉴에 실시간으로 반영됩니다.\n순서를 변경할까요?"
      );
    }

    setReordered(chk);

    if (chk) {
      if (active.id !== over?.id) {
        const oldIndex = menuList.findIndex(
          (m) => m.menuId === active.id.menuId
        );
        const newIndex = menuList.findIndex((m) => m.menuId === over.id.menuId);

        const reorderedArr = arrayMove(menuList, oldIndex, newIndex).map(
          (item, idx) => ({
            ...item,
            menuSortOrder: idx + 1, // 순서를 다시 지정
          })
        );
        setMenuList(reorderedArr);
        menuReordered(reorderedArr);
      }
    }
  };

  useEffect(() => {
    getMenuList();
  }, []);

  useEffect(() => {
    if (selected != null) {
      for (let i = 0; i < menuList.length; i++) {
        if (menuList[i].menuId === menuDetails.menuId) {
          setSelected(i);
          break;
        }
      }
    }
  }, [menuList]);

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

  const handleMenu = (menuId) => {
    for (let i = 0; i < menuList.length; i++) {
      if (menuList[i].menuId === menuId) {
        setSelected(i);
        break;
      }
    }

    resetDetails();

    axiosInstance
      .get("/menu/getMenuDetails/" + menuId)
      .then((res) => {
        setMenuDetails(res.data);
      })
      .catch((err) => {
        alert("실패.");
      });
  };

  const handleMenuInfo = (event, selected) => {
    let { name, value } = event.target;

    if (!name && !value) {
      name = "menuIcon";
      value = selected.value;
    }

    if (name === "menuName" && value) {
      let flag = true;
      let msg = "";
      if (value.length > 15) {
        flag = false;
        msg = "메뉴 이름은 15자를 초과할 수 없습니다.";
        setMenuValidate((prev) => ({
          ...prev,
          menuName: {
            flag: flag,
            msg: msg,
          },
        }));
        return;
      }

      let regExp = /^[a-zA-Z ]+$/;
      if (!regExp.test(value)) {
        flag = false;
        msg = "메뉴 이름은 영어로만 입력해주세요.";
        setMenuValidate((prev) => ({
          ...prev,
          menuName: {
            flag: flag,
            msg: msg,
          },
        }));
        return;
      }

      setMenuValidate((prev) => ({
        ...prev,
        menuName: {
          flag: flag,
          msg: msg,
        },
      }));
    }

    if (name === "menuUrl" && value) {
      let flag = true;
      let msg = "";

      let regExp = /^[a-zA-z0-9/]+$/;
      if (!regExp.test(value)) {
        flag = false;
        msg = "URL은 영어, 숫자로만 입력해주세요.";
        setMenuValidate((prev) => ({
          ...prev,
          menuUrl: {
            flag: flag,
            msg: msg,
          },
        }));
        return;
      }

      setMenuValidate((prev) => ({
        ...prev,
        menuUrl: {
          flag: flag,
          msg: msg,
        },
      }));
    }

    setMenuDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const menuReordered = async (reorderedArr) => {
    await axiosInstance
      .post("/menu/menuReordered", reorderedArr)
      .then((res) => {
        getMenuList();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const muiIconView = () => {
    window.open("https://mui.com/material-ui/material-icons/", "_blank");
  };

  const handleMenuDetails = () => {
    let chk = validation();

    if (chk) {
      axiosInstance
        .post("/menu/updateMenuInfo", menuDetails)
        .then((res) => {
          alert(res.data);
          setSelected(null);
          resetDetails();
          getMenuList();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const validation = () => {
    let chk = true;
    let validate = {};

    let menuIcon = { menuIcon: { flag: true, msg: "" } };
    if (!menuDetails.menuIcon) {
      chk = false;
      menuIcon.menuIcon.flag = chk;
      menuIcon.menuIcon.msg = "아이콘은 필수 항목입니다.";
    }

    let menuName = { menuName: { flag: true, msg: "" } };
    if (!menuDetails.menuName) {
      chk = false;
      menuName.menuName.flag = chk;
      menuName.menuName.msg = "메뉴 명은 필수 항목입니다.";
    }

    let menuAuth = { menuAuth: { flag: true, msg: "" } };
    if (!menuDetails.menuAuth === "") {
      chk = false;
      menuAuth.menuAuth.flag = chk;
      menuAuth.menuAuth.msg = "접근 권한은 필수 항목입니다.";
    }

    let menuTarget = { menuTarget: { flag: true, msg: "" } };
    if (!menuDetails.menuTarget === "") {
      chk = false;
      menuTarget.menuTarget.flag = chk;
      menuTarget.menuTarget.msg = "메뉴 타겟은 필수 항목입니다.";
    }

    let menuUrl = { menuUrl: { flag: true, msg: "" } };
    if (!menuDetails.menuUrl) {
      chk = false;
      menuUrl.menuUrl.flag = chk;
      menuUrl.menuUrl.msg = "URL은 필수 항목입니다.";
    }

    let menuUseYn = { menuUseYn: { flag: true, msg: "" } };
    if (!menuDetails.menuUseYn === "") {
      chk = false;
      menuUseYn.menuUseYn.flag = chk;
      menuUseYn.menuUseYn.msg = "사용 여부는 필수 항목입니다.";
    }

    validate = Object.assign(
      menuName,
      menuAuth,
      menuTarget,
      menuUrl,
      menuUseYn
    );
    setMenuValidate(validate);
    console.log(validate);
    return chk;
  };

  const setRegMenuForm = () => {
    setSelected(-1);
    resetDetails();
  };

  return (
    <Box>
      <Grid2 container spacing={1}>
        <Grid2 size={3} id="admin-menu-list">
          <Box id="add-btn-box">
            <IconButton
              id="add-btn"
              color="primary"
              title="메뉴 등록하기"
              onClick={setRegMenuForm}
            >
              <Add />
            </IconButton>
          </Box>
          <List>
            {menuList ? (
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={menuList}
                  strategy={verticalListSortingStrategy}
                >
                  {menuList.map((item, idx) => (
                    <SortableItem
                      key={item.menuId}
                      id={item}
                      onClick={(menuId) => handleMenu(menuId)}
                      isSelected={idx === selected}
                    />
                  ))}
                </SortableContext>
              </DndContext>
            ) : (
              <></>
            )}
          </List>
        </Grid2>
        <Grid2 size={9} id="admin-menu-form">
          {selected != null ? (
            <Grid2 container spacing={1}>
              <Grid2 size={12}>
                <Box id="preview">
                  <Box className="preview-row" spacing={2}>
                    <span className="preview-col icon">
                      {menuDetails.menuIcon ? (
                        <IconButton>
                          <LazyIcon iconName={menuDetails.menuIcon} />
                        </IconButton>
                      ) : (
                        <></>
                      )}
                    </span>
                    <span className="preview-col name">
                      {menuDetails.menuName.split("").map((char) => (
                        <Icon path={getMdiIcon(char)} size={1} />
                      ))}
                    </span>
                  </Box>
                </Box>
              </Grid2>

              <Grid2 size={3} className="label">
                아이콘
                <IconButton
                  id="mui-icons-view"
                  title="MUI 아이콘 전체 보기"
                  onClick={muiIconView}
                >
                  <IosShare color="primary" />
                </IconButton>
              </Grid2>
              <Grid2 size={9}>
                <FormControl fullWidth>
                  <Autocomplete
                    name="menuIcon"
                    options={iconNames}
                    filterOptions={(options, { inputValue }) => {
                      return options
                        .filter((option) =>
                          option.label
                            .toLowerCase()
                            .includes(inputValue.toLowerCase())
                        )
                        .slice(0, 50); // 🔥 최대 50개만 렌더링
                    }}
                    renderInput={(params) => (
                      <TextField {...params} label="Icons" variant="standard" />
                    )}
                    onChange={handleMenuInfo}
                    value={menuDetails.menuIcon}
                    required
                  ></Autocomplete>
                </FormControl>
              </Grid2>

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
                    error={!menuValidate.menuName.flag}
                    helperText={menuValidate.menuName.msg}
                  ></TextField>
                </FormControl>
              </Grid2>

              <Grid2 size={3} className="label">
                접근권한
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

              <Grid2 size={12} id="btn-row">
                <Button
                  size="small"
                  variant="contained"
                  onClick={handleMenuDetails}
                >
                  저장하기
                </Button>
              </Grid2>
            </Grid2>
          ) : (
            <></>
          )}
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default MenuAdmin;
