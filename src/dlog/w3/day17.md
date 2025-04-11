## Day17. 메뉴 구현

#### 1. Signup 마지막 처리

- MUI Datepicker로 선택한 userBirth 값을 'yyyy/M/d' 형태로 변환하여 저장
- DatePicker로 달력에서 선택만 가능하고 직접 입력 불가능하게 막음, userBirth 검증 삭제, 초기화 버튼 추가
- 알람 여부(alramYn) checkbox에 값을 value로 저장하는 부분을 event.target.checked 값으로 저장하도록 변경

#### 2. Menu 조회

- @compo/header/SlideMenu.jsx 호출 시, 메뉴 조회 API 호출 (/api/menu/getMenus)
- 조회 결과를 menu에 binding
- 메뉴에 표시될 icon을 가져오는 js 파일 추가

```
import {
  mdiAlphaA,
  .
  .
  .
  mdiAlphaZ,
} from "@mdi/js";
import {
  PersonSearch,
  LogoDev,
  PsychologyAltOutlined,
  GitHub,
  SendOutlined,
} from "@mui/icons-material";

const iconMap = {
  a: mdiAlphaA,
  .
  .
  .
  z: mdiAlphaZ,
  PersonSearch: <PersonSearch />,
  LogDev: <LogoDev />,
  PsychologyAltOutlined: <PsychologyAltOutlined />,
  GitHub: <GitHub />,
  SendOutlined: <SendOutlined />,
};

const getMdiIcon = (param) => {
  return iconMap[param?.toLowerCase?.()];
};

const getMuiIcon = (param) => {
  return iconMap[param];
};

export default () => ({
  getMdiIcon,
  getMuiIcon,
});

```

- icon 조회하는 메서드 import 및 menu에 binding된 값으로 화면 출력력

```
/*-- MDI --*/
import Icon from "@mdi/react";
import getIcon from "@js/menuIcon.js";
import { useState, useEffect } from "react";

const SlideMenu = () => {
    const { getMdiIcon, getMuiIcon } = getIcon(); // 아이콘 조회 메서드
    .
    .
    .
        {menu.length > 0 ? (
            menu.map((item) => (
            <ListItem
                component={Link}
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
    .
    .
    .

```
