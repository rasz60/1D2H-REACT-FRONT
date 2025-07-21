import { Routes, Route } from "react-router-dom";
import RouteGuard from "@context/RouteGuard";
import FrontDoor from "@compo/FrontDoor";
import Signup from "@src/assets/components/header/Signup";
import SetUser from "@src/assets/components/header/SetUser";
import FindInfo from "@src/assets/components/header/FindInfo";

import About from "@compo/menu/about/About";
import DevLog from "@compo/menu/dlog/DevLog";
import { Container } from "@mui/material";
import SendMail from "../components/menu/sendmail/SendMail";
import React from "react";
import AdminMain from "../components/admin/AdminMain";

const Main = () => {
  return (
    <main id="main" role="main">
      <Container maxWidth="lg">
        <Routes>
          {/*-- 메뉴 화면 --*/}
          <Route path="/" element={<FrontDoor />} />
          <Route path="/about" element={<About />} />
          <Route path="/dlog/*" element={<DevLog />} />
          <Route path="/sendmail/*" element={<SendMail />} />

          {/*-- 메뉴 외 화면 --*/}
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin" element={<RouteGuard type={2} />}>
            <Route path="/admin" element={<AdminMain />} />
          </Route>
          <Route path="/setUser" element={<RouteGuard type={1} />}>
            <Route path="/setUser" element={<SetUser />} />
          </Route>
          <Route path="/findInfo" element={<FindInfo />} />
        </Routes>
      </Container>
    </main>
  );
};

export default Main;
