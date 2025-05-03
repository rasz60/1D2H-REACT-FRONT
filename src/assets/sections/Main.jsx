import { Routes, Route } from "react-router-dom";
import { useAuth } from "@context/AuthContext";
import Signup from "@compo/Signup";
import SetUser from "@compo/SetUser";

import About from "@compo/menu/about/About";
import DevLog from "@compo/menu/dlog/DevLog";
import {
  Box,
  Container,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
} from "@mui/material";
import { Edit } from "@mui/icons-material";

const Main = () => {
  const { RouteGuard } = useAuth();

  return (
    <main id="main" role="main">
      <Container maxWidth="lg">
        <Routes>
          {/*-- 메뉴 화면 --*/}
          <Route path="/about" element={<About />} />
          <Route path="/dlog/*" element={<DevLog />} />

          {/*-- 메뉴 외 화면 --*/}
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin" element={<RouteGuard type={2} />}>
            <Route path="/admin" element={<About />} />
          </Route>
          <Route path="/setUser" element={<RouteGuard type={1} />}>
            <Route path="/setUser" element={<SetUser />} />
          </Route>
        </Routes>
      </Container>
    </main>
  );
};

export default Main;
