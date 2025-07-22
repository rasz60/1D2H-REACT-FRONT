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
const MenuAdmin = () => {
  const [menuList, setMenuList] = useState(null);
  const [selected, setSelected] = useState(null);
  const { getMdiIcon } = getIcon();
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
      <div ref={setNodeRef} style={style} className={className}>
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
        <div onClick={() => onClick(id.menuId)} style={{ flex: 1 }}>
          {id.menuName.toUpperCase()}
        </div>
      </div>
    );
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = menuList.findIndex((m) => m.menuId === active.id.menuId);
      const newIndex = menuList.findIndex((m) => m.menuId === over.id.menuId);

      const reordered = arrayMove(menuList, oldIndex, newIndex).map(
        (item, idx) => ({
          ...item,
          menuSortOrder: idx + 1, // 순서를 다시 지정
        })
      );

      setMenuList(reordered);
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

    if (selected) {
      name = "menuIcon";
      value = selected.value;
    }

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
          <Grid2 container spacing={1}>
            <Grid2 size={12}>
              <Box id="preview">
                <Grid2 container className="preview-row" spacing={2}>
                  <Grid2 size={1} className="preview-col icon">
                    <IconButton>
                      {menuDetails.menuIcon ? (
                        <LazyIcon iconName={menuDetails.menuIcon} />
                      ) : (
                        <></>
                      )}
                    </IconButton>
                  </Grid2>
                  <Grid2 size={11} className="preview-col name">
                    <span>
                      {menuDetails.menuName.split("").map((char) => (
                        <Icon path={getMdiIcon(char)} size={1} />
                      ))}
                    </span>
                  </Grid2>
                </Grid2>
              </Box>
            </Grid2>

            <Grid2 size={3} className="label">
              아이콘
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

            <Grid2 size={12} id="btn-row">
              <Button size="small" variant="contained">
                저장하기
              </Button>
            </Grid2>
          </Grid2>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default MenuAdmin;
