import React, { useEffect } from "react";
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
        <Container id="container" maxWidth="xxl">
          <Header isScroll={isScroll} />
          <Main />
        </Container>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
