import { Routes, Route } from "react-router-dom";
import { useAuth } from "@context/AuthContext";
import FrontDoor from "@compo/FrontDoor";
import Signup from "@compo/Signup";
import SetUser from "@compo/SetUser";
import FindInfo from "@compo/FindInfo";

import About from "@compo/menu/about/About";
import DevLog from "@compo/menu/dlog/DevLog";
import { Container } from "@mui/material";

const Main = () => {
  const { RouteGuard } = useAuth();

  return (
    <main id="main" role="main">
      <Container maxWidth="lg">
        <Routes>
          {/*-- 메뉴 화면 --*/}
          <Route path="/" element={<FrontDoor />} />
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
          <Route path="/findInfo" element={<FindInfo />} />
        </Routes>
      </Container>
    </main>
  );
};

export default Main;
