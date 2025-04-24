# DAY23. DevLog API 구현

#### 1. DevLog 화면 출력

- 각 DevLogGroup 클릭 시 toggleIdx 값을 변경
  - 현재 선택한 index 값과 toggleIdx가 같으면 null, 아니면 현재 선택한 index 값으로 설정
  - Accordion component에서 toggleIdx 와 해당 index가 같으면 expended 되도록 설정
-
- toggleIdx 변경 시

  - 모든 group의 item 리스트를 초기화
  - toggleIdx가 null이 아닐 때, 해당하는 index group의 groupNo를 parameter로 /api/dlog/itemList 호출
  - 조회 결과를 해당 index의 items 에 binding

- toggleIdx에 해당하는 Accordion component가 expended되고 하위에 items가 출력
- 한 row에 3개씩 출력하도록 설정

```
DevLog.jsx


import { ArrowDownward } from "@mui/icons-material";
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
                <Grid2 size={11} className="dlog-pannel-header-text">
                  <Typography component="h4">{group.groupTitle}</Typography>
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
```
