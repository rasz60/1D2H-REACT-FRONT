import { Link } from "react-router-dom";
import { Grid2, Box, List, ListItem } from "@mui/material";

const SlideMenu = () => {
  return (
    <Box id="slide-menu-box">
      <List id="slide-menu-list">
        <ListItem component={Link} to="/test" className="slide-menu-item">
          <Grid2 container className="slide-menu-item-row">
            <Grid2 size={1} className="slide-menu-item-col icon">
              123
            </Grid2>
            <Grid2 size={11} className="slide-menu-item-col name">
              123
            </Grid2>
          </Grid2>
        </ListItem>
      </List>
    </Box>
  );
};

export default SlideMenu;
