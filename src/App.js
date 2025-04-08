import React from "react";
import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Container } from "@mui/material";
import Header from "@sections/Header";
import Main from "@sections/Main";
import "@style/_common.scss";

const App = () => {
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
          <Header isScroll={isScroll} />
          <Main />
        </Container>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
