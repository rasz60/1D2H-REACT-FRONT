import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "@context/AuthContext";
import { ResponsiveProvider } from "@context/ResponsiveContext";
import {
  Box,
  Fab,
  SpeedDial,
  SpeedDialIcon,
  SpeedDialAction,
} from "@mui/material";
import Header from "@sections/Header";
import Main from "@sections/Main";
import Footer from "@sections/Footer";
import "@style/_common.scss";
import {
  ArrowUpward,
  Menu,
  Login,
  Logout,
  AccountCircle,
  Settings,
  Add,
} from "@mui/icons-material";
import { useAuth } from "@context/AuthContext";
import BackdropMethods from "@js/backdrop";
import BackdropWrapper from "@compo/common/Backdrop";
import { useNavigate } from "react-router-dom";
import axiosInstance from "@utils/axiosInstance";

const App = () => {
  const [isScroll, setIsScroll] = useState(
    document.scrollingElement.scrollTop > 0
  );

  const [sdOpen, setSdOpen] = useState(false);

  // 전역 백드롭 상태 (SpeedDial과 공유)
  const { isBackdrop, setBackdrop } = BackdropMethods();
  
  // 이전 백드랍 상태를 추적하기 위한 ref
  const prevBackdropRef = useRef({ open: false, layout: "" });

  useEffect(() => {
    const handleScroll = () => {
      setIsScroll(document.scrollingElement.scrollTop > 0);
    };

    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // 백드랍과 메뉴가 닫힐 때 현재 스크롤 상태를 확인하여 헤더 표시/숨김 처리
  useEffect(() => {
    // 메뉴 백드랍이 닫혔을 때 (이전에 열려있었고 지금 닫혔을 때)
    const prevBackdrop = prevBackdropRef.current;
    if (prevBackdrop.open && prevBackdrop.layout === "menu" && !isBackdrop.open) {
      // 현재 스크롤 위치를 확인하여 헤더 표시/숨김 결정
      const currentScrollTop = document.scrollingElement.scrollTop;
      setIsScroll(currentScrollTop > 0);
    }
    
    // 현재 상태를 이전 상태로 저장
    prevBackdropRef.current = {
      open: isBackdrop.open,
      layout: isBackdrop.layout || "",
    };
  }, [isBackdrop.open, isBackdrop.layout]);

  // 유틸 액션 생성 (SpeedDial 내부 전용 컴포넌트)
  const UtilitySpeedDial = ({ visible, onBackdrop }) => {
    const navigator = useNavigate();
    const { getIsAuthentication, getAuthLv, logoutCallback } = useAuth();

    const isAuthenticated = getIsAuthentication();
    const authLv = getAuthLv();

    const handleBackdrop = (layout) => {
      // 메뉴 버튼 클릭 시 Header를 표시하기 위해 isScroll을 false로 설정
      if (layout === "menu") {
        setIsScroll(false);
      }
      onBackdrop({ type: true, layout });
    };

    const handleLogout = async () => {
      if (window.confirm("로그아웃 할까요?")) {
        try {
          await axiosInstance.post("/auth/logout");
          logoutCallback();
        } catch (err) {
          alert(err.response?.data?.message || "로그아웃 실패");
        }
      }
    };

    const actions = [
      {
        icon: <Menu />,
        name: "메뉴",
        onClick: () => handleBackdrop("menu"),
      },
      ...(isAuthenticated
        ? [
            {
              icon: <Logout />,
              name: "로그아웃",
              onClick: () => handleLogout(),
            },
            {
              icon: <AccountCircle />,
              name: "계정설정",
              onClick: () => navigator("/setUser"),
            },
            ...(authLv > 2
              ? [
                  {
                    icon: <Settings />,
                    name: "관리자메뉴",
                    onClick: () => navigator("/admin"),
                  },
                ]
              : []),
          ]
        : [
            {
              icon: <Login />,
              name: "로그인",
              onClick: () => handleBackdrop("login"),
            },
          ]),
    ];

    if (!visible) return null;

    return (
      <Box
        sx={{
          transform: "translateZ(0px)",
          flexGrow: 1,
          position: "fixed",
          bottom: 90,
          right: 20,
        }}
      >
        <SpeedDial
          ariaLabel="speed-dial-menu"
          icon={<SpeedDialIcon icon={<Add />} openIcon={<Add />} />}
          onMouseEnter={() => setSdOpen(true)}
          onMouseLeave={() => setSdOpen(false)}
          onClose={() => setSdOpen(false)}
          onOpen={() => setSdOpen(true)}
          open={sdOpen}
          FabProps={{
            color: "primary",
            sx: {
              width: { xs: 44, sm: 48, md: 56 },
              height: { xs: 44, sm: 48, md: 56 },
            },
          }}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={action.onClick}
              FabProps={{ size: "small" }}
            />
          ))}
        </SpeedDial>
      </Box>
    );
  };

  return (
    <BrowserRouter>
      <ResponsiveProvider>
        <AuthProvider>
          <Header isScroll={isScroll && !(isBackdrop.open && isBackdrop.layout === "menu")} />
          <Main />
          <Footer />

          {/* 상단 메뉴가 사라졌을 때만 유틸 SpeedDial 표시 */}
          <UtilitySpeedDial visible={isScroll} onBackdrop={setBackdrop} />

          {/* 최상단 이동 버튼 - 작은 화면에서 크기 축소 */}
          <Box
            sx={{
              transform: "translateZ(0px)",
              flexGrow: 1,
              position: "fixed",
              bottom: 20,
              right: 20,
            }}
          >
            <Fab
              sx={{
                backgroundColor: "white",
                width: { xs: 44, sm: 48, md: 56 },
                height: { xs: 44, sm: 48, md: 56 },
              }}
              variant="circular"
              onClick={() =>
                window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
              }
            >
              <ArrowUpward />
            </Fab>
          </Box>

          {/* SpeedDial에서 여는 백드롭 렌더링 */}
          <BackdropWrapper isBackdrop={isBackdrop} setBackdrop={setBackdrop} />
        </AuthProvider>
      </ResponsiveProvider>
    </BrowserRouter>
  );
};

export default App;
