import { Box, Grid2, Button, Tooltip } from "@mui/material";
import Icon from "@mdi/react";
import getIcon from "@js/menuIcon.js";
import {
  Favorite,
  FavoriteBorderOutlined,
  FormatListBulleted,
  Search,
  TurnedIn,
  TurnedInNot,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axiosInstance from "@src/utils/axiosInstance";
import { useState, useEffect } from "react";
import { useResponsive } from "@context/ResponsiveContext";
import SlideAboutMe from "./frontDoor/SlideAboutMe";
import FixedAboutMe from "./frontDoor/FixedAboutMe";

const FrontDoor = () => {
  const { getMdiIcon } = getIcon();
  const [groups, setGroups] = useState([]);
  const navigate = useNavigate();
  const { cwidth } = useResponsive();
  const [vmode, setVmode] = useState({
    size: "L",
    row1_title: "about me",
    row2_title: "devlog",
    titleSize: 1.5,
    row1ColWidth: 4,
    row1SubTitleWidth: 3,
    row1SubContentWidth: 9,
  });

  useEffect(() => {
    if (cwidth >= 1280) {
      setVmode((prev) => ({
        ...prev,
        size: "L",
        titleSize: 1.5,
        row1ColWidth: 4,
        row1SubTitleWidth: 3,
        row1SubContentWidth: 9,
      }));
    } else {
      setVmode((prev) => ({
        ...prev,
        size: cwidth < 1280 && cwidth >= 800 ? "M" : "S",
        row1_title: cwidth < 1280 && cwidth >= 800 ? "about me" : "about",
        titleSize: 1.2,
        row1ColWidth: 12,
        row1SubTitleWidth: 12,
        row1SubContentWidth: 12,
      }));
    }
  }, [cwidth]);

  useEffect(() => {
    getGroups();
  }, []);

  const getGroups = () => {
    axiosInstance
      .get("/dlog/groupList")
      .then((res) => {
        setGroups(res.data.filter((group, idx) => idx < 3));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const generateIconText = (keyword, size) => {
    return keyword
      .split("")
      .map((char, idx) => (
        <Icon
          path={getMdiIcon(char)}
          size={size}
          color="primary"
          key={"Char_" + idx}
        />
      ));
  };

  const handleSeeMore = (nav) => {
    navigate(nav);
  };

  const handleDlogGroup = (groupNo) => {
    navigate("/dlog?groupNo=" + groupNo);
  };

  return (
    <Box>
      <Grid2 container>
        <Grid2 size={11}>
          {/*-- FRONT DOOR::1st ROW-aboutMe::TITLE --*/}
          <h2 className="front-door-title">
            {generateIconText(vmode.row1_title, vmode.titleSize)}❓
          </h2>
        </Grid2>
        <Grid2 size={1} className="front-door-btn-more">
          <Button onClick={() => handleSeeMore("/about")} size="small">
            {vmode.size === "S" ? (
              <Search />
            ) : (
              <span>
                more&nbsp;&nbsp;
                <Search />
              </span>
            )}
          </Button>
        </Grid2>

        {/*-- FRONT DOOR::1st ROW-aboutMe::CONTENT --*/}
        {vmode.size === "L" ? (
          <FixedAboutMe vmode={vmode} />
        ) : (
          <SlideAboutMe vmode={vmode} />
        )}

        {/*-- FRONT DOOR::2nd ROW-devLog::TITLE--*/}
        <Grid2 size={11}>
          {/*-- FRONT DOOR::1st ROW-aboutMe::TITLE --*/}
          <h2 className="front-door-title">
            {generateIconText(vmode.row2_title, vmode.titleSize)}❗
          </h2>
        </Grid2>
        <Grid2 size={1} className="front-door-btn-more">
          <Button onClick={() => handleSeeMore("/dlog")} size="small">
            more&nbsp;&nbsp;{<Search />}
          </Button>
        </Grid2>

        {/*-- FRONT DOOR::2nd ROW-devLog::CONTENT--*/}
        <Grid2 size={12}>
          <Grid2 container className="front-door-contents" spacing={1}>
            {groups ? (
              groups.map((group) => (
                <Grid2
                  container
                  size={12}
                  className="front-door-contents-col dlog-row"
                  onClick={() => handleDlogGroup(group.groupNo)}
                >
                  <Grid2
                    size={vmode.size === "L" ? 9 : 12}
                    className="dlog-col title"
                  >
                    {cwidth >= 1280 ? (
                      <Tooltip title={`#${group.groupNo}. ${group.groupTitle}`} arrow placement="bottom">
                        <h4>#{group.groupNo + ". " + group.groupTitle}</h4>
                      </Tooltip>
                    ) : (
                      <h4>#{group.groupNo + ". " + group.groupTitle}</h4>
                    )}
                  </Grid2>
                  <Grid2 size={vmode.size === "L" ? 1 : 4} className="dlog-col">
                    {group.likeYn ? <Favorite /> : <FavoriteBorderOutlined />}
                    &nbsp;
                    {group.likeCnt}
                  </Grid2>
                  <Grid2 size={vmode.size === "L" ? 1 : 4} className="dlog-col">
                    {group.subsYn ? <TurnedIn /> : <TurnedInNot />}
                    &nbsp;
                    {group.subsCnt}
                  </Grid2>
                  <Grid2 size={vmode.size === "L" ? 1 : 4} className="dlog-col">
                    <FormatListBulleted />
                    &nbsp;
                    {group.itemCnt}
                  </Grid2>
                </Grid2>
              ))
            ) : (
              <></>
            )}
          </Grid2>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default FrontDoor;
