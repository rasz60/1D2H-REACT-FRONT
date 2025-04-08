import { Backdrop, Box, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
import SlideMenu from "@compo/header/SlideMenu";
import LoginModal from "@compo/header/LoginModal";
import AddrAPI from "@compo/common/AddrAPI";

const BackdropWapper = ({ isBackdrop, setBackdrop, onAddrSelect }) => {
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
        {isBackdrop.layout === "addrAPI" && (
          <AddrAPI
            setBackdrop={setBackdrop}
            onSelect={(addr) => {
              onAddrSelect && onAddrSelect(addr);
            }}
          />
        )}
      </Box>
    </Backdrop>
  );
};

export default BackdropWapper;
