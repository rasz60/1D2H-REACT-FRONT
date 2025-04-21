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

  useEffect(() => {
    axiosInstance
      .get("/dlog/groupList")
      .then((res) => {
        console.log(res.data);
        setGroups(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Container maxWidth="lg">
      <Accordion id="pannel1" className="dlog-pannel">
        <AccordionSummary
          expandIcon={<ArrowDownward />}
          id="panel1-header"
          className="dlog-pannel-header"
        >
          <Grid2 container className="dlog-pannel-header-row">
            <Grid2 size={11} className="dlog-pannel-header-text">
              <Typography>
                <h4>React</h4>
              </Typography>
            </Grid2>
            <Grid2 size={1} className="dlog-pannel-header-badge">
              <Chip label="123" color="success" />
            </Grid2>
          </Grid2>
        </AccordionSummary>
        <AccordionDetails className="dlog-pannel-content">
          <Box>
            <Grid2 container>
              <Grid2 size={4} className="dlog-pannel-content-col">
                <Card className="dlog-content-card">
                  <CardActionArea>
                    <CardMedia className="dlog-content-card-title">
                      <p className="dlog-content-card-title-text">REACT3</p>
                    </CardMedia>
                    <CardContent>1</CardContent>
                  </CardActionArea>
                </Card>
              </Grid2>
              <Grid2 size={4} className="dlog-pannel-content-col">
                <Card className="dlog-content-card">
                  <CardActionArea>
                    <CardMedia className="dlog-content-card-title">
                      <p className="dlog-content-card-title-text">REACT2</p>
                    </CardMedia>
                    <CardContent>2</CardContent>
                  </CardActionArea>
                </Card>
              </Grid2>
              <Grid2 size={4} className="dlog-pannel-content-col">
                <Card className="dlog-content-card">
                  <CardActionArea>
                    <CardMedia className="dlog-content-card-title">
                      <p className="dlog-content-card-title-text">REACT1</p>
                    </CardMedia>
                    <CardContent>
                      <Chip
                        className="dlog-cotent-card-lang"
                        size="small"
                        variant="outlined"
                        color="info"
                        label="JAVA"
                      ></Chip>
                      <Chip
                        className="dlog-cotent-card-lang"
                        size="small"
                        variant="outlined"
                        color="info"
                        label="Spring-Boot"
                      ></Chip>
                      <Chip
                        className="dlog-cotent-card-lang"
                        size="small"
                        variant="outlined"
                        color="info"
                        label="JPA"
                      ></Chip>
                      <Chip
                        className="dlog-cotent-card-lang"
                        size="small"
                        variant="outlined"
                        color="info"
                        label="PostgreSQL"
                      ></Chip>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid2>
            </Grid2>
          </Box>
        </AccordionDetails>
      </Accordion>
    </Container>
  );
};

export default DevLog;
