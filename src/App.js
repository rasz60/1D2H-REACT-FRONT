import React from "react";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Container } from "@mui/material";
import Header from "./assets/sections/Header";
import Main from "./assets/sections/Main";
import "./assets/style/_common.scss";

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
      <Router>
        <Container id="container" maxWidth="xxl">
          <Header isScroll={isScroll} />
          <Main />
        </Container>
      </Router>
    </AuthProvider>
  );
};

export default App;
