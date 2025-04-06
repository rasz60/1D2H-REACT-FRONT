import React from "react";
import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Container } from "@mui/material";
import Header from "./assets/sections/Header";
import Main from "./assets/sections/Main";
import BackdropWrapper from "./assets/components/common/Backdrop";
import "./assets/style/_common.scss";

const App = () => {
  const [isBackdrop, setIsBackdrop] = useState({
    open: false,
    type: "menu",
  });

  const setBackdrop = (type, layout) => {
    setIsBackdrop({
      ...isBackdrop,
      open: type ? !isBackdrop.open : false,
      layout: type ? layout : "",
    });
  };

  const [isScroll, setIsScroll] = useState(
    document.scrollingElement.scrollTop > 0
  );

  const handleScroll = () => {
    setIsScroll(document.scrollingElement.scrollTop > 0);
  };

  document.addEventListener("scroll", handleScroll);

  return (
    <AuthProvider>
      <BrowserRouter>
        <Container id="container" maxWidth="xxl">
          <BackdropWrapper isBackdrop={isBackdrop} setBackdrop={setBackdrop} />
          <Header isScroll={isScroll} setBackdrop={setBackdrop} />
          <Main />
        </Container>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
