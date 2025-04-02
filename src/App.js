import React from "react";
import { Container } from "@mui/material";
import Header from "./assets/sections/Header";
import Main from "./assets/sections/Main";
import "./assets/style/_common.scss";

function App() {
  return (
    <Container id="container" maxWidth="xxl">
      <Header />
      <Main />
    </Container>
  );
}

export default App;
