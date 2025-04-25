import {
  ArrowDownward,
  Bookmark,
  List,
  Favorite,
  PlayCircleOutline,
  StopCircleOutlined,
  Visibility,
} from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Grid2,
  IconButton,
  Typography,
} from "@mui/material";
import axiosInstance from "@src/utils/axiosInstance";
import { useEffect, useState } from "react";

/*-- AuthContext --*/
import { useAuth } from "@context/AuthContext";

const DevLog = () => {
  const [groups, setGroups] = useState(null);
  const [toggleIdx, setToggleIdx] = useState(null);

  const { isAuthenticated } = useAuth();

  useEffect(() => {
    axiosInstance
      .get("/dlog/groupList")
      .then((res) => {
        setGroups(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleToggleGroup = (idx) => {
    setToggleIdx(toggleIdx === idx ? null : idx);
  };

  useEffect(() => {
    if (groups != null) {
      // item 리스트 전체 삭제
      groups.forEach((group) => {
        group.items = null;
      });

      // toggleIdx가 지정되었을 때
      if (toggleIdx != null) {
        // item 리스트 조회
        axiosInstance
          .get("/dlog/itemList/" + groups[toggleIdx].groupNo)
          .then((res) => {
            const newGroups = [...groups];
            newGroups[toggleIdx].items = res.data;
            setGroups(newGroups);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }, [toggleIdx]);

  const handleLikes = async (event, groupNo, itemNo) => {
    event.stopPropagation();

    if (!isAuthenticated) {
      alert("로그인이 필요합니다.");
      return;
    }

    // api 호출
    let res = await axiosInstance.post("/dlog/updateLikes", {
      groupNo: groupNo,
      itemNo: itemNo ? itemNo : null,
    });

    console.log(res);

    // 결과 세팅
    setGroups((prev) => {
      return prev.map((group) => {
        if (group.groupNo === groupNo) {
          if (itemNo) {
            const updateItem = group.items.map((item) => {
              if (item.itemNo === itemNo) {
                return {
                  ...item,
                  likeYn: !item.likeYn,
                  likeCnt: item.likeCnt + (!item.likeYn ? 1 : -1),
                };
              }
              return item;
            });
            return {
              ...group,
              items: updateItem,
            };
          } else {
            return {
              ...group,
              likeYn: !group.likeYn,
              likeCnt: group.likeCnt + (!group.likeYn ? 1 : -1),
            };
          }
        }
        return group;
      });
    });
  };

  const handleSubs = async (event, groupNo) => {
    event.stopPropagation();

    if (!isAuthenticated) {
      alert("로그인이 필요합니다.");
      return;
    }

    // api 호출

    // 결과 세팅
    setGroups((prev) => {
      return prev.map((group) => {
        if (group.groupNo === groupNo) {
          return {
            ...group,
            subsYn: !group.subsYn,
            subsCnt: group.subsCnt + (!group.subsYn ? 1 : -1),
          };
        }
        return group;
      });
    });
  };

  return (
    <Container maxWidth="lg">
      {groups != null ? (
        groups.map((group, idx) => (
          <Accordion
            expanded={toggleIdx === idx}
            id={"pannel" + idx}
            className={"dlog-pannel" + (toggleIdx === idx ? " expended" : "")}
          >
            <AccordionSummary
              expandIcon={<ArrowDownward />}
              id={"pannel" + idx + "-header"}
              className="dlog-pannel-header"
              onClick={() => handleToggleGroup(idx)}
            >
              <Grid2 container className="dlog-pannel-header-row">
                <Grid2 size={1} className="dlog-pannel-header-status">
                  {group.progress === "LIVE" ? (
                    <PlayCircleOutline color="info" />
                  ) : (
                    <StopCircleOutlined color="error" />
                  )}
                </Grid2>
                <Grid2 size={8} className="dlog-pannel-header-text">
                  <Typography component="span">{group.groupTitle}</Typography>
                </Grid2>
                <Grid2 size={1} className="dlog-pannel-header-likes">
                  <IconButton
                    onClick={(event) => handleLikes(event, group.groupNo)}
                  >
                    <Favorite color={group.likeYn ? "error" : ""} />
                  </IconButton>
                  {group.likeCnt}
                </Grid2>
                <Grid2 size={1} className="dlog-pannel-header-subs">
                  <IconButton
                    onClick={(event) => handleSubs(event, group.groupNo)}
                  >
                    <Bookmark color={group.subsYn ? "warning" : ""} />
                  </IconButton>
                  {group.subsCnt}
                </Grid2>
                <Grid2 size={1} className="dlog-pannel-header-items">
                  <List />
                  {group.itemCnt}
                </Grid2>
              </Grid2>
            </AccordionSummary>
            {group.items != null ? (
              <AccordionDetails className="dlog-pannel-content">
                <Box>
                  {Array.from({
                    length: Math.ceil(group.items.length / 3),
                  }).map((_, rowIndex) => (
                    <Grid2 container>
                      {group.items
                        .slice(rowIndex * 3, rowIndex * 3 + 3)
                        .map((item) => (
                          <Grid2 size={4} className="dlog-pannel-content-col">
                            <Card className="dlog-content-card">
                              <CardActionArea>
                                <CardMedia
                                  className="dlog-content-card-title"
                                  sx={{
                                    backgroundColor:
                                      "rgb(" +
                                      Math.floor(Math.random() * 256) +
                                      "," +
                                      Math.floor(Math.random() * 256) +
                                      "," +
                                      Math.floor(Math.random() * 256) +
                                      ", 0.04)",
                                  }}
                                >
                                  <p className="dlog-content-card-title-text">
                                    {item.itemTitle}
                                  </p>
                                </CardMedia>
                                <CardContent>
                                  <p className="group-title">
                                    {group.groupTitle} - #{item.itemSortNo}
                                  </p>
                                  <Grid2 container>
                                    <Grid2 size={12}></Grid2>
                                  </Grid2>
                                  <Grid2
                                    container
                                    className="dlog-content-card-content-status"
                                  >
                                    <Grid2 size={6}></Grid2>
                                    <Grid2 size={3} className="status-likes">
                                      <IconButton
                                        onClick={(event) =>
                                          handleLikes(
                                            event,
                                            group.groupNo,
                                            item.itemNo
                                          )
                                        }
                                      >
                                        <Favorite
                                          color={item.likeYn ? "error" : ""}
                                        />
                                      </IconButton>
                                      {item.likeCnt}
                                    </Grid2>
                                    <Grid2 size={3} className="status-views">
                                      <Visibility />
                                      {item.viewCnt}
                                    </Grid2>
                                  </Grid2>
                                </CardContent>
                              </CardActionArea>
                            </Card>
                          </Grid2>
                        ))}
                    </Grid2>
                  ))}
                </Box>
              </AccordionDetails>
            ) : (
              <></>
            )}
          </Accordion>
        ))
      ) : (
        <></>
      )}
    </Container>
  );
};

export default DevLog;
