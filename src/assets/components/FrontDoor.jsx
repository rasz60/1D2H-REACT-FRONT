import { Box, Grid2, Button } from "@mui/material";
import Icon from "@mdi/react";
import getIcon from "@js/menuIcon.js";

const FrontDoor = () => {
  const { getMdiIcon } = getIcon();

  return (
    <Box>
      <Grid2 container>
        <Grid2 size={12}>
          <h2 className="front-door-title">
            <Icon path={getMdiIcon("a")} size={1.5} />
            <Icon path={getMdiIcon("b")} size={1.5} />
            <Icon path={getMdiIcon("o")} size={1.5} />
            <Icon path={getMdiIcon("u")} size={1.5} />
            <Icon path={getMdiIcon("t")} size={1.5} />
            &nbsp;&nbsp;
            <Icon path={getMdiIcon("m")} size={1.5} />
            <Icon path={getMdiIcon("e")} size={1.5} />
            &nbsp;&nbsp;?
          </h2>
          <Button>123</Button>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default FrontDoor;
