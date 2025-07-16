import React, { useEffect } from "react";
import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Box, Fab, SpeedDial, SpeedDialIcon } from "@mui/material";
import Header from "@sections/Header";
import Main from "@sections/Main";
import Footer from "@sections/Footer";
import "@style/_common.scss";
import { ArrowUpward, Edit } from "@mui/icons-material";

const App = () => {
  const [isScroll, setIsScroll] = useState(
    document.scrollingElement.scrollTop > 0
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScroll(document.scrollingElement.scrollTop > 0);
    };

    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  });

  return (
    <BrowserRouter>
      <AuthProvider>
        <Header isScroll={isScroll} />
        <Main />
        <Footer />
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
            ariaLabel="SpeedDial openIcon example"
            sx={{}}
            icon={<SpeedDialIcon openIcon={<Edit size="small" />} />}
          ></SpeedDial>
        </Box>
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
            sx={{ backgroundColor: "white" }}
            variant="circular"
            onClick={() =>
              window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
            }
          >
            <ArrowUpward />
          </Fab>
        </Box>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
