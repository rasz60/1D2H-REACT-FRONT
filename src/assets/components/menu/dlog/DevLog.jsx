import {
  ArrowDownward,
  Bookmark,
  BookmarkBorder,
  ContentCopy,
  Favorite,
  FavoriteBorder,
  PlayCircle,
  PlayCircleOutline,
  StopCircle,
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
  Chip,
  Container,
  Grid2,
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
            className="dlog-pannel"
          >
            <AccordionSummary
              expandIcon={<ArrowDownward />}
              id={"pannel" + idx + "-header"}
              className="dlog-pannel-header"
              onClick={() => handleToggleGroup(idx)}
            >
              <Grid2 container className="dlog-pannel-header-row">
                <Grid2 size={1} className="dlog-pannel-header-text">
                  {group.progress === "LIVE" ? (
                    <PlayCircleOutline />
                  ) : (
                    <StopCircleOutlined />
                  )}
                </Grid2>
                <Grid2 size={8} className="dlog-pannel-header-text">
                  <Typography component="h4">{group.groupTitle}</Typography>
                </Grid2>
                <Grid2 size={1} className="dlog-pannel-header-text">
                  {group.progress === "LIVE" ? (
                    <FavoriteBorder />
                  ) : (
                    <Favorite />
                  )}
                </Grid2>
                <Grid2 size={1} className="dlog-pannel-header-text">
                  {group.progress === "LIVE" ? (
                    <BookmarkBorder />
                  ) : (
                    <Bookmark />
                  )}
                </Grid2>
                <Grid2 size={1} className="dlog-pannel-header-badge">
                  <Chip label={group.itemCnt} color="success" />
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
                                <CardMedia className="dlog-content-card-title">
                                  <p className="dlog-content-card-title-text">
                                    {item.itemTitle}
                                  </p>
                                </CardMedia>
                                <CardContent>1</CardContent>
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
