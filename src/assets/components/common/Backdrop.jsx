import { Backdrop, Box, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
import SlideMenu from "@compo/header/SlideMenu";
import LoginModal from "@compo/header/LoginModal";
import AddrAPI from "@compo/common/AddrAPI";

const BackdropWapper = ({ isBackdrop, setBackdrop, onAddrSelect }) => {
  const handleBackdropClick = (e) => {
    // 백드랍 영역 클릭 시 (모달 컨텐츠 영역이 아닌 경우)
    // e.target === e.currentTarget은 백드랍 자체를 클릭했을 때만 true
    if (e.target === e.currentTarget || e.target.id === "backdrop") {
      // 로그인 모달의 경우 백드랍 클릭 시 닫기
      if (isBackdrop.layout === "login") {
        setBackdrop(false);
      }
    }
  };

  const handleContentClick = (e) => {
    // 모달 컨텐츠 영역 클릭은 전파 중지하여 백드랍 클릭 이벤트가 발생하지 않도록 함
    e.stopPropagation();
  };

  return (
    <Backdrop
      id="backdrop"
      open={isBackdrop.open}
      className={isBackdrop.fullH ? "full" : "default"}
      onClick={handleBackdropClick}
    >
      <Box id="backdrop-content" onClick={handleContentClick}>
        {isBackdrop.layout !== "menu" && (
          <Box id="backdrop-close">
            <IconButton size="large" onClick={() => setBackdrop(false)}>
              <Close />
            </IconButton>
          </Box>
        )}
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
