import {
  ArrowDownward,
  Bookmark,
  BookmarkBorder,
  List,
  Favorite,
  FavoriteBorder,
  PlayCircleOutline,
  StopCircleOutlined,
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

const DevLog = () => {
  const [groups, setGroups] = useState(null);
  const [toggleIdx, setToggleIdx] = useState(null);

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
                  {group.likeYn ? (
                    <IconButton>
                      <Favorite color="error" />
                    </IconButton>
                  ) : (
                    <IconButton>
                      <FavoriteBorder />
                    </IconButton>
                  )}
                  {group.likeCnt}
                </Grid2>
                <Grid2 size={1} className="dlog-pannel-header-subs">
                  {group.subsYn ? (
                    <IconButton>
                      <Bookmark color="warning" />
                    </IconButton>
                  ) : (
                    <IconButton>
                      <BookmarkBorder />
                    </IconButton>
                  )}
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
                                  <Grid2 container>
                                    {group.groupTitle} - #{item.itemSortNo}
                                  </Grid2>
                                  <Grid2 container>사용언어</Grid2>
                                  <Grid2 container>좋아요, 조회수</Grid2>
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
