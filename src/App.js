import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container } from "@mui/material";
import Header from "./assets/sections/Header";
import Main from "./assets/sections/Main";
import "./assets/style/_common.scss";

function App() {
  return (
    <Router>
      <Container id="container" maxWidth="xxl">
        <Header />
        <Main />
      </Container>
    </Router>
  );
}

export default App;
