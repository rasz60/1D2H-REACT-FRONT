import { Box, Chip, Grid2 } from "@mui/material";
import { Style, Dns } from "@mui/icons-material";
import { useState } from "react";

const About = () => {
  const [mainTags, setMainTags] = useState([]);

  return (
    <Box id="about-box">
      <h3 id="about-title">성장추구형 웹개발자 ! 😎</h3>
      <Grid2 container id="about-main-tags">
        <Grid2 size={0.4}>
          <Style />
        </Grid2>
        <Grid2>
          {mainTags.length > 0 ? (
            mainTags.map((tag) => <Chip icon={<Dns />} label="JAVA"></Chip>)
          ) : (
            <Chip
              className="about-main-tag-chips"
              icon={<Dns />}
              label="JAVA"
              size="small"
              color="info"
            ></Chip>
          )}
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default About;
