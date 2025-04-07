import { Backdrop, Box, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
import SlideMenu from "../header/SlideMenu";
import LoginModal from "../header/LoginModal";

const BackdropWapper = ({ isBackdrop, setBackdrop }) => {
  return (
    <Backdrop id="backdrop" open={isBackdrop.open}>
      <Box id="backdrop-content">
        <Box id="backdrop-close">
          <IconButton size="large" onClick={() => setBackdrop(false)}>
            <Close />
          </IconButton>
        </Box>
        {isBackdrop.layout === "menu" && (
          <SlideMenu setBackdrop={setBackdrop} />
        )}
        {isBackdrop.layout === "login" && (
          <LoginModal setBackdrop={setBackdrop} />
        )}
      </Box>
    </Backdrop>
  );
};

export default BackdropWapper;
